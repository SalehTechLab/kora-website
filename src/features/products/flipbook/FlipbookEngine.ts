import * as THREE from "three";
import gsap from "gsap";
import type { PageSource } from "./pdfSource";

/*
 * A page-turning book in three.js.
 *
 * Every leaf is a strip of quads hinged at the spine. Turning bends the strip
 * (the free edge trails the lift) and the same angles drive per-vertex light, so
 * the paper reads as paper without a shader. Page images are drawn lazily from
 * the PDF and only a window around the reader stays in GPU memory.
 */

const H = 2; // page height in world units
const SEGMENTS = 28; // quads across a leaf
const FOV = 26;
const CURL = 0.95; // radians the free edge lags behind the spine while turning
const TEXTURE_WINDOW = 2; // leaves kept textured either side of the reader
const BOARD_MARGIN = 0.03;
const BOARD_DEPTH = 0.03;

export type BookState = {
  /** Leaves turned onto the left-hand stack */
  turned: number;
  /** Page (0-based) the reader is looking at; matters in single-page mode */
  view: number;
  /** One page on screen (narrow viewports) instead of a spread */
  single: boolean;
  count: number;
};

type Options = {
  container: HTMLElement;
  source: PageSource;
  reduceMotion: boolean;
  colors: { paper: string; board: string; shadow: string };
  onState: (state: BookState) => void;
  /** The first page has been drawn, so the book can be shown */
  onReady: () => void;
  /** A leaf starts travelling: duration in seconds. Drives the sound. */
  onTurn: (duration: number, forward: boolean) => void;
};

type Leaf = {
  index: number;
  /** 0 = flat on the right stack, 1 = flat on the left stack */
  t: number;
  drawnT: number;
  group: THREE.Group;
  front: THREE.Mesh;
  back: THREE.Mesh;
  frontMat: THREE.MeshBasicMaterial;
  backMat: THREE.MeshBasicMaterial;
  position: THREE.BufferAttribute;
  frontColor: THREE.BufferAttribute;
  backColor: THREE.BufferAttribute;
  tween?: gsap.core.Tween;
};

type Gesture = {
  x: number;
  y: number;
  moved: boolean;
  leaf: Leaf | null;
  dir: 1 | -1;
  startT: number;
  committed: boolean;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smoothstep = (a: number, b: number, v: number) => {
  const x = clamp((v - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};

// Light comes from above-left, so a standing page catches or loses it
const LIGHT_X = -0.42;
const LIGHT_Z = 0.91;

export class FlipbookEngine {
  private o: Options;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
  private root = new THREE.Group();
  private book = new THREE.Group();
  private leaves: Leaf[] = [];
  private boardL = new THREE.Group();
  private boardR = new THREE.Group();
  private shadow: THREE.Mesh;

  private W: number;
  private n: number;
  private gap: number;

  private turned = 0;
  private view = 0;
  private single = false;
  private sideX = { v: 0 };
  private intro = { v: 0 };

  private width = 1;
  private height = 1;
  private dist = 6;
  private camX = 0;
  private camY = 0;
  private parX = 0;
  private parY = 0;
  private texWidth = 1024;

  private textures = new Map<number, { texture: THREE.CanvasTexture; canvas: HTMLCanvasElement }>();
  private loading = new Set<number>();
  private raf = 0;
  private disposed = false;
  private ready = false;
  private gesture: Gesture | null = null;
  private resizeObserver: ResizeObserver;

  constructor(options: Options) {
    this.o = options;
    const { container, source, colors } = options;
    this.n = source.count / 2;
    this.W = H * source.aspect;
    this.gap = Math.min(0.004, 0.08 / this.n);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    const el = this.renderer.domElement;
    el.className = "block size-full touch-none";
    container.appendChild(el);

    this.scene.add(this.root);
    this.root.add(this.book);
    this.buildBoards(colors.board);
    this.shadow = this.buildShadow(colors.shadow);
    this.buildLeaves(colors.paper);

    el.addEventListener("pointerdown", this.onDown);
    el.addEventListener("pointermove", this.onMove);
    el.addEventListener("pointerup", this.onUp);
    el.addEventListener("pointercancel", this.onCancel);
    el.addEventListener("pointerleave", this.onLeave);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();

    if (options.reduceMotion) {
      this.intro.v = 1;
    } else {
      gsap.to(this.intro, {
        v: 1,
        duration: 1.3,
        ease: "expo.out",
        onUpdate: () => this.invalidate(),
      });
    }
    this.emit();
    this.refreshTextures();
    this.invalidate();
  }

  /* ── Scene construction ─────────────────────────────────────────────── */

  private buildBoards(color: string) {
    const w = this.W + BOARD_MARGIN * 1.5;
    const h = H + BOARD_MARGIN * 2;
    const geometry = new THREE.BoxGeometry(w, h, BOARD_DEPTH);
    geometry.translate(w / 2 - BOARD_MARGIN * 0.5, 0, 0); // spine edge sits just past x = 0
    const material = new THREE.MeshBasicMaterial({ color, toneMapped: false });
    const z = -(this.n - 1) * this.gap - 0.004 - BOARD_DEPTH / 2;
    for (const board of [this.boardR, this.boardL]) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z;
      board.add(mesh);
      this.book.add(board);
    }
    this.boardL.scale.x = 0; // mirrored by negative scale once the cover opens
  }

  private buildShadow(color: string) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.18, size / 2, size / 2, size / 2);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(this.W * 2.5, H * 1.5),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false }),
    );
    mesh.position.z = -(this.n - 1) * this.gap - BOARD_DEPTH - 0.06;
    this.book.add(mesh);
    return mesh;
  }

  private buildLeaves(paper: string) {
    const S = SEGMENTS;
    const verts = (S + 1) * 2;
    const indices: number[] = [];
    for (let i = 0; i < S; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }

    for (let index = 0; index < this.n; index++) {
      const position = new THREE.BufferAttribute(new Float32Array(verts * 3), 3);
      const frontUv = new Float32Array(verts * 2);
      const backUv = new Float32Array(verts * 2);
      for (let i = 0; i <= S; i++) {
        const u = i / S;
        for (let row = 0; row < 2; row++) {
          const v = row === 0 ? 1 : 0;
          const k = (i * 2 + row) * 2;
          frontUv[k] = u;
          frontUv[k + 1] = v;
          backUv[k] = 1 - u; // the reverse side is read from the other face
          backUv[k + 1] = v;
        }
      }
      const frontColor = new THREE.BufferAttribute(new Float32Array(verts * 3), 3);
      const backColor = new THREE.BufferAttribute(new Float32Array(verts * 3), 3);

      const frontGeo = new THREE.BufferGeometry();
      frontGeo.setAttribute("position", position);
      frontGeo.setAttribute("uv", new THREE.BufferAttribute(frontUv, 2));
      frontGeo.setAttribute("color", frontColor);
      frontGeo.setIndex(indices);
      const backGeo = new THREE.BufferGeometry();
      backGeo.setAttribute("position", position); // shared: one bend feeds both faces
      backGeo.setAttribute("uv", new THREE.BufferAttribute(backUv, 2));
      backGeo.setAttribute("color", backColor);
      backGeo.setIndex(indices);

      const frontMat = new THREE.MeshBasicMaterial({ color: paper, vertexColors: true, side: THREE.FrontSide, toneMapped: false });
      const backMat = new THREE.MeshBasicMaterial({ color: paper, vertexColors: true, side: THREE.BackSide, toneMapped: false });
      const front = new THREE.Mesh(frontGeo, frontMat);
      const back = new THREE.Mesh(backGeo, backMat);
      front.frustumCulled = back.frustumCulled = false; // bounds change every frame

      const group = new THREE.Group();
      group.add(front, back);
      this.book.add(group);

      const leaf: Leaf = {
        index,
        t: 0,
        drawnT: -1,
        group,
        front,
        back,
        frontMat,
        backMat,
        position,
        frontColor,
        backColor,
      };
      this.leaves.push(leaf);
      this.bend(leaf);
    }
  }

  /* ── Geometry per frame ─────────────────────────────────────────────── */

  private bend(leaf: Leaf) {
    const S = SEGMENTS;
    const theta = leaf.t * Math.PI;
    const lag = this.o.reduceMotion ? 0 : Math.sin(theta) * CURL;
    const zRest = THREE.MathUtils.lerp(-leaf.index * this.gap, -(this.n - 1 - leaf.index) * this.gap, leaf.t);
    const dx = this.W / S;
    const pos = leaf.position.array as Float32Array;
    const fc = leaf.frontColor.array as Float32Array;
    const bc = leaf.backColor.array as Float32Array;

    let x = 0;
    let z = 0;
    for (let i = 0; i <= S; i++) {
      if (i > 0) {
        const a = theta - lag * ((i - 0.5) / S);
        x += dx * Math.cos(a);
        z += dx * Math.sin(a);
      }
      const angle = theta - lag * (i / S);
      const facing = (-Math.sin(angle) * LIGHT_X + Math.cos(angle) * LIGHT_Z) / LIGHT_Z;
      const gutter = 0.78 + 0.22 * smoothstep(0, 0.22, i / S);
      const f = (0.56 + 0.44 * clamp(facing, 0, 1.04)) * gutter;
      const b = (0.56 + 0.44 * clamp(-facing, 0, 1.04)) * gutter;

      for (let row = 0; row < 2; row++) {
        const k = (i * 2 + row) * 3;
        pos[k] = x;
        pos[k + 1] = row === 0 ? H / 2 : -H / 2;
        pos[k + 2] = z + zRest;
        fc[k] = fc[k + 1] = fc[k + 2] = f;
        bc[k] = bc[k + 1] = bc[k + 2] = b;
      }
    }
    leaf.position.needsUpdate = true;
    leaf.frontColor.needsUpdate = true;
    leaf.backColor.needsUpdate = true;
    leaf.drawnT = leaf.t;
  }

  /* ── Frame loop (renders only while something moves) ────────────────── */

  invalidate() {
    if (!this.raf && !this.disposed) this.raf = requestAnimationFrame(this.frame);
  }

  private frame = () => {
    this.raf = 0;
    if (this.disposed) return;
    const moving = this.step();
    this.renderer.render(this.scene, this.camera);
    if (moving) this.invalidate();
  };

  private step() {
    for (const leaf of this.leaves) {
      if (leaf.drawnT !== leaf.t) this.bend(leaf);
      // Pages buried in a stack can't be seen; skip drawing them
      const rest = leaf.t === 0 ? leaf.index > this.turned + 1 : leaf.t === 1 ? leaf.index < this.turned - 2 : false;
      leaf.group.visible = !rest;
    }

    // The closed book sits centred: slide it as the cover opens / the back closes
    const first = this.leaves[0].t;
    const last = this.leaves[this.n - 1].t;
    const shift = (-this.W / 2) * (1 - first) + (this.W / 2) * last;
    this.book.position.x = shift;

    const leftCover = clamp(first * 2.5, 0, 1);
    const rightCover = clamp((1 - last) * 2.5, 0, 1);
    this.boardR.scale.x = Math.max(rightCover, 0.0001);
    this.boardL.scale.x = -Math.max(leftCover, 0.0001);
    this.shadow.scale.x = Math.max((leftCover + rightCover) / 2, 0.35);
    this.shadow.position.x = ((rightCover - leftCover) * this.W) / 2;

    // Intro: the book settles in from a slight tilt
    const k = this.intro.v;
    this.root.scale.setScalar(0.86 + 0.14 * k);
    this.root.rotation.y = (1 - k) * -0.35;
    this.root.rotation.x = (1 - k) * 0.12;

    // Camera follows the page in focus; a touch of pointer parallax adds depth
    const focus = this.single ? shift + this.sideX.v : 0;
    const tx = focus + this.parX * 0.16;
    const ty = this.parY * 0.12;
    const dx = tx - this.camX;
    const dy = ty - this.camY;
    this.camX += dx * 0.12;
    this.camY += dy * 0.12;
    this.camera.position.set(this.camX, this.camY, this.dist);
    this.camera.lookAt(focus, 0, 0);

    const settled = Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005;
    const turning = this.leaves.some((l) => l.t > 0 && l.t < 1);
    return !settled || turning || this.intro.v < 1 || !!this.gesture;
  }

  /* ── Sizing ─────────────────────────────────────────────────────────── */

  private resize() {
    const { clientWidth: w, clientHeight: h } = this.o.container;
    if (!w || !h) return;
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    const wasSingle = this.single;
    this.single = w / h < 1.05;
    const tv = Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
    const th = tv * (w / h);
    const needW = (this.single ? this.W : this.W * 2) * 1.08;
    const needH = H * 1.18;
    this.dist = Math.max(needW / 2 / th, needH / 2 / tv);

    const dpr = this.renderer.getPixelRatio();
    const pagePx = (h / (2 * this.dist * tv)) * this.W * dpr;
    this.texWidth = Math.round(clamp(pagePx * 1.6, 1024, this.single ? 1600 : 1500));

    if (this.single !== wasSingle) {
      this.view = this.turned === 0 ? 0 : this.turned * 2 - 1;
      this.sideX.v = this.sideFor(this.view);
      this.emit();
    } else if (this.single) {
      this.sideX.v = this.sideFor(this.view);
    }
    this.invalidate();
  }

  private sideFor(view: number) {
    return view % 2 === 1 ? -this.W / 2 : this.W / 2;
  }

  private get pxPerUnit() {
    const worldH = 2 * this.dist * Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
    return this.height / worldH;
  }

  /* ── Navigation ─────────────────────────────────────────────────────── */

  next() {
    this.move(1);
  }
  prev() {
    this.move(-1);
  }

  /** Jump to the first / last spread, turning each leaf in a quick cascade */
  goTo(turned: number) {
    const target = clamp(turned, 0, this.n);
    const dir = target > this.turned ? 1 : -1;
    let delay = 0;
    while (this.turned !== target) {
      const index = dir > 0 ? this.turned : this.turned - 1;
      this.turned += dir;
      this.turnLeaf(this.leaves[index], dir > 0, delay);
      delay += 0.09;
    }
    this.view = this.turned === 0 ? 0 : this.turned * 2 - 1;
    this.afterChange();
  }

  private move(dir: 1 | -1) {
    if (!this.single) {
      if (dir > 0 && this.turned < this.n) {
        this.turnLeaf(this.leaves[this.turned], true);
        this.turned += 1;
      } else if (dir < 0 && this.turned > 0) {
        this.turned -= 1;
        this.turnLeaf(this.leaves[this.turned], false);
      } else return;
      this.view = this.turned === 0 ? 0 : this.turned * 2 - 1;
    } else {
      const next = clamp(this.view + dir, 0, this.o.source.count - 1);
      if (next === this.view) return;
      const nextTurned = Math.ceil(next / 2);
      if (nextTurned > this.turned) {
        this.turnLeaf(this.leaves[this.turned], true);
        this.turned = nextTurned;
      } else if (nextTurned < this.turned) {
        this.turned = nextTurned;
        this.turnLeaf(this.leaves[this.turned], false);
      }
      this.view = next;
    }
    this.afterChange();
  }

  private afterChange() {
    if (this.single) {
      gsap.to(this.sideX, {
        v: this.sideFor(this.view),
        duration: this.o.reduceMotion ? 0.2 : 0.7,
        ease: "power3.out",
        onUpdate: () => this.invalidate(),
      });
    }
    this.emit();
    this.refreshTextures();
    this.invalidate();
  }

  private turnLeaf(leaf: Leaf, forward: boolean, delay = 0) {
    leaf.tween?.kill();
    const remaining = forward ? 1 - leaf.t : leaf.t;
    const duration = this.o.reduceMotion ? 0.35 : clamp(0.5 + remaining * 0.75, 0.45, 1.25);
    if (delay > 0) gsap.delayedCall(delay, () => this.o.onTurn(duration, forward));
    else this.o.onTurn(duration, forward);
    leaf.tween = gsap.to(leaf, {
      t: forward ? 1 : 0,
      duration,
      delay,
      ease: this.o.reduceMotion ? "power1.out" : "power2.inOut",
      onUpdate: () => this.invalidate(),
    });
  }

  private emit() {
    this.o.onState({ turned: this.turned, view: this.view, single: this.single, count: this.o.source.count });
  }

  /* ── Textures: draw the pages near the reader, free the rest ────────── */

  private refreshTextures() {
    const lo = Math.max(0, this.turned - 1 - TEXTURE_WINDOW);
    const hi = Math.min(this.n - 1, this.turned + TEXTURE_WINDOW);
    const wanted: number[] = [];
    // Nearest first: the visible spread, then outward
    for (let d = 0; d <= TEXTURE_WINDOW + 1; d++) {
      for (const leaf of [this.turned - 1 - d, this.turned + d]) {
        if (leaf >= lo && leaf <= hi) wanted.push(leaf * 2, leaf * 2 + 1);
      }
    }
    const keep = new Set(wanted);
    for (const [page, entry] of this.textures) {
      if (!keep.has(page)) {
        this.setMap(page, null);
        entry.texture.dispose();
        entry.canvas.width = entry.canvas.height = 0;
        this.textures.delete(page);
      }
    }
    for (const page of wanted) {
      if (this.textures.has(page) || this.loading.has(page)) continue;
      this.loading.add(page);
      void this.o.source.render(page, this.texWidth).then((canvas) => {
        this.loading.delete(page);
        if (!canvas || this.disposed) return;
        if (!this.isWanted(page)) {
          canvas.width = canvas.height = 0;
          return;
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
        this.textures.set(page, { texture, canvas });
        this.setMap(page, texture);
        this.invalidate();
        if (!this.ready && this.textures.has(0)) {
          this.ready = true;
          this.o.onReady();
        }
      });
    }
  }

  private isWanted(page: number) {
    const leaf = page >> 1;
    return leaf >= this.turned - 1 - TEXTURE_WINDOW && leaf <= this.turned + TEXTURE_WINDOW;
  }

  private setMap(page: number, texture: THREE.Texture | null) {
    const leaf = this.leaves[page >> 1];
    if (!leaf) return;
    const material = page % 2 === 0 ? leaf.frontMat : leaf.backMat;
    material.map = texture;
    material.color.set(texture ? "#ffffff" : this.o.colors.paper);
    material.needsUpdate = true;
  }

  /* ── Pointer: click a half to turn, drag a leaf to bend it by hand ──── */

  private onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    this.renderer.domElement.setPointerCapture(e.pointerId);
    this.gesture = { x: e.clientX, y: e.clientY, moved: false, leaf: null, dir: 1, startT: 0, committed: false };
    this.invalidate();
  };

  private onMove = (e: PointerEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.parX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    this.parY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (this.o.reduceMotion) this.parX = this.parY = 0;

    const g = this.gesture;
    if (!g) {
      this.invalidate();
      return;
    }
    const dx = e.clientX - g.x;
    if (!g.moved && Math.hypot(dx, e.clientY - g.y) > 6) {
      g.moved = true;
      if (!this.single) this.beginDrag(g, dx);
    }
    if (g.moved && g.leaf) {
      const span = this.W * this.pxPerUnit * 0.85;
      g.leaf.tween?.kill();
      g.leaf.t = clamp(g.startT - dx / span, 0, 1);
    }
    this.invalidate();
  };

  private beginDrag(g: Gesture, dx: number) {
    const dir: 1 | -1 = dx < 0 ? 1 : -1;
    const index = dir > 0 ? this.turned : this.turned - 1;
    const leaf = this.leaves[index];
    if (!leaf) return;
    g.dir = dir;
    g.leaf = leaf;
    g.startT = leaf.t;
  }

  private onUp = (e: PointerEvent) => {
    const g = this.gesture;
    this.gesture = null;
    if (!g) return;
    const dx = e.clientX - g.x;

    if (!g.moved) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.move(e.clientX < rect.left + rect.width / 2 ? -1 : 1);
    } else if (this.single) {
      if (Math.abs(dx) > 40) this.move(dx < 0 ? 1 : -1);
    } else if (g.leaf) {
      const leaf = g.leaf;
      const past = g.dir > 0 ? leaf.t > 0.3 : leaf.t < 0.7;
      if (past) {
        this.turned += g.dir;
        this.view = this.turned === 0 ? 0 : this.turned * 2 - 1;
        this.turnLeaf(leaf, g.dir > 0);
        this.afterChange();
      } else {
        leaf.tween = gsap.to(leaf, {
          t: g.startT,
          duration: 0.4,
          ease: "power2.out",
          onUpdate: () => this.invalidate(),
        });
      }
    }
    this.invalidate();
  };

  private onCancel = () => {
    const g = this.gesture;
    this.gesture = null;
    if (g?.leaf) {
      const leaf = g.leaf;
      leaf.tween = gsap.to(leaf, { t: g.startT, duration: 0.3, onUpdate: () => this.invalidate() });
    }
    this.invalidate();
  };

  private onLeave = () => {
    this.parX = this.parY = 0;
    this.invalidate();
  };

  /* ── Teardown ───────────────────────────────────────────────────────── */

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    const el = this.renderer.domElement;
    el.removeEventListener("pointerdown", this.onDown);
    el.removeEventListener("pointermove", this.onMove);
    el.removeEventListener("pointerup", this.onUp);
    el.removeEventListener("pointercancel", this.onCancel);
    el.removeEventListener("pointerleave", this.onLeave);
    gsap.killTweensOf(this.intro);
    gsap.killTweensOf(this.sideX);
    for (const leaf of this.leaves) {
      leaf.tween?.kill();
      leaf.front.geometry.dispose();
      leaf.back.geometry.dispose();
      leaf.frontMat.dispose();
      leaf.backMat.dispose();
    }
    for (const { texture, canvas } of this.textures.values()) {
      texture.dispose();
      canvas.width = canvas.height = 0;
    }
    this.textures.clear();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mat = obj.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    el.remove();
  }
}

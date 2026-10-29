/**
 * Page-turn sound, synthesised with Web Audio so there is no audio asset to
 * ship or license: a band-passed noise "swish" that sweeps upward as the leaf
 * lifts, then a soft low-passed thump as it lands.
 */
export class PageSound {
  private ctx: AudioContext | null = null;
  private noise: AudioBuffer | null = null;
  muted: boolean;

  constructor(muted: boolean) {
    this.muted = muted;
  }

  private context() {
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      const length = this.ctx.sampleRate; // one second of white noise, reused
      this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    }
    return this.ctx;
  }

  /** Call from a user gesture so browsers allow playback */
  unlock() {
    const ctx = this.context();
    if (ctx?.state === "suspended") void ctx.resume();
  }

  /** @param duration seconds the leaf takes to travel, so sound and motion stay in step */
  turn(duration: number, forward = true) {
    if (this.muted) return;
    const ctx = this.context();
    if (!ctx || !this.noise) return;
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    const jitter = 0.9 + Math.random() * 0.2; // no two turns sound identical

    // The swish
    const swish = ctx.createBufferSource();
    swish.buffer = this.noise;
    swish.playbackRate.value = jitter;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.9;
    const lo = forward ? 700 : 1500;
    const hi = forward ? 3200 : 900;
    band.frequency.setValueAtTime(lo * jitter, now);
    band.frequency.exponentialRampToValueAtTime(hi * jitter, now + duration * 0.8);
    const swishGain = ctx.createGain();
    swishGain.gain.setValueAtTime(0.0001, now);
    swishGain.gain.exponentialRampToValueAtTime(0.5, now + duration * 0.28);
    swishGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.95);
    swish.connect(band).connect(swishGain).connect(ctx.destination);
    swish.start(now, Math.random() * 0.4);
    swish.stop(now + duration);

    // The landing
    const land = now + duration * 0.86;
    const thump = ctx.createBufferSource();
    thump.buffer = this.noise;
    const low = ctx.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 520;
    const thumpGain = ctx.createGain();
    thumpGain.gain.setValueAtTime(0.0001, land);
    thumpGain.gain.exponentialRampToValueAtTime(0.55, land + 0.012);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, land + 0.14);
    thump.connect(low).connect(thumpGain).connect(ctx.destination);
    thump.start(land, Math.random() * 0.4);
    thump.stop(land + 0.16);
  }

  destroy() {
    void this.ctx?.close();
    this.ctx = null;
  }
}

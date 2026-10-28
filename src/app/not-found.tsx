import type { Metadata } from "next";
import NotFoundHero from "@/features/not-found/NotFoundHero";

export const metadata: Metadata = {
  title: "Page not found",
  // Explicit so it replaces the root "index" instead of emitting "noindex,index"
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  description: "This page isn't on our network. Re-route to services, products, logistics or talk to our team.",
};

export default function NotFound() {
  return <NotFoundHero />;
}

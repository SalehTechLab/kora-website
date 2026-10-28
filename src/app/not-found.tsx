import type { Metadata } from "next";
import NotFoundHero from "@/features/not-found/NotFoundHero";

export const metadata: Metadata = {
  title: "Page not found | Kora Traders",
  description: "This page isn't on our network. Re-route to services, products, logistics or talk to our team.",
};

export default function NotFound() {
  return <NotFoundHero />;
}

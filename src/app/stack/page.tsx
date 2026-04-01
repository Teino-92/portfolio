import type { Metadata } from "next";
import StackClient from "@/components/stack/StackClient";

export const metadata: Metadata = {
  title: "Stack — Matteo Garbugli",
  description:
    "Frontend, Backend, Web3, IA — les outils que j'utilise au quotidien et la maîtrise derrière chacun.",
};

export default function StackPage() {
  return <StackClient />;
}

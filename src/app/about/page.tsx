import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutPersonal from "@/components/about/AboutPersonal";
import AboutSkills from "@/components/about/AboutSkills";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "À propos — Matteo Garbugli",
  description:
    "Milan, la Grèce, la Norvège, Punta Cana, Paris. Dix ans d'opérations, un bootcamp, et maintenant je construis. Le parcours de Matteo Garbugli.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutPersonal />
      <AboutSkills />
      <AboutCTA />
    </main>
  );
}

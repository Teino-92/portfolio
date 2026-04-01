import type { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "Projets — Matteo Garbugli",
  description:
    "Découvrez les projets Web3, SaaS et produit construits par Matteo Garbugli — avec les décisions techniques et les résultats concrets.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}

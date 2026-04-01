import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact — Matteo Garbugli",
  description:
    "Un projet à construire ? Une mission freelance ? Démarrons une conversation.",
};

export default function ContactPage() {
  return <ContactClient />;
}

import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LangProvider } from "@/lib/i18n/context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

const SITE_URL = "https://matteogarbugli.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Développeur Web Freelance Suresnes (92) — Matteo Garbugli",
    template: "%s | Matteo Garbugli — Développeur Web Suresnes",
  },
  description:
    "Développeur web freelance à Suresnes (92). Création de sites, SaaS et applications Web3. Interventions Paris, La Défense, Puteaux, Hauts-de-Seine.",
  keywords: [
    "développeur web Suresnes",
    "développeur freelance Suresnes",
    "création site web Suresnes",
    "développeur Hauts-de-Seine",
    "développeur 92",
    "freelance Paris",
    "développeur SaaS",
    "développeur Web3",
    "Next.js",
    "Rails",
    "Solidity",
  ],
  authors: [{ name: "Matteo Garbugli", url: SITE_URL }],
  creator: "Matteo Garbugli",
  publisher: "Matteo Garbugli",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Développeur Web Freelance Suresnes (92) — Matteo Garbugli",
    description:
      "Développeur full-stack basé à Suresnes. Sites web, SaaS, Web3. Missions Paris et Hauts-de-Seine.",
    url: SITE_URL,
    type: "website",
    locale: "fr_FR",
    siteName: "Matteo Garbugli",
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Web Freelance Suresnes (92) — Matteo Garbugli",
    description:
      "Développeur full-stack basé à Suresnes. Sites web, SaaS, Web3. Missions Paris et Hauts-de-Seine.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <body>
        <LocalBusinessSchema />
        <LangProvider>
          <SmoothScrollProvider>
            <Header />
            <div style={{ paddingTop: "64px" }}>
              {children}
            </div>
            <Footer />
          </SmoothScrollProvider>
        </LangProvider>
      </body>
    </html>
  );
}

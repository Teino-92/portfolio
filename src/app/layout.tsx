import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Portfolio — Développeur Web & SaaS",
  description:
    "Développeur full-stack spécialisé Web & SaaS. Rails, Next.js, Solidity. Disponible pour missions freelance.",
  keywords: ["développeur", "web", "saas", "freelance", "rails", "nextjs", "solidity"],
  authors: [{ name: "MG" }],
  openGraph: {
    title: "Portfolio — Développeur Web & SaaS",
    description:
      "Développeur full-stack spécialisé Web & SaaS. Rails, Next.js, Solidity.",
    type: "website",
    locale: "fr_FR",
    siteName: "Portfolio MG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Développeur Web & SaaS",
    description:
      "Développeur full-stack spécialisé Web & SaaS. Rails, Next.js, Solidity.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SmoothScrollProvider>
          <Header />
          <div style={{ paddingTop: "64px" }}>
            {children}
          </div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

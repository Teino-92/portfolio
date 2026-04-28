import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://matteogarbugli.com";
const PAGE_URL = `${SITE_URL}/developpeur-suresnes`;

export const metadata: Metadata = {
  title: "Développeur Web Freelance à Suresnes (92) — Sites, SaaS, Web3",
  description:
    "Développeur web freelance basé à Suresnes (Hauts-de-Seine). Création de sites internet, SaaS et applications Web3 pour TPE, PME et startups. Interventions Paris, La Défense, Puteaux.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Développeur Web Freelance à Suresnes (92) — Matteo Garbugli",
    description:
      "Création de sites, SaaS et applications Web3 à Suresnes et dans tout le 92. Devis sous 48h.",
    url: PAGE_URL,
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
};

const services = [
  {
    title: "Création de site internet",
    desc: "Sites vitrine, e-commerce et plateformes sur mesure. Next.js, performance Lighthouse 95+, SEO intégré dès la conception.",
  },
  {
    title: "Développement SaaS",
    desc: "Applications métier B2B de bout en bout : authentification, paiements, dashboards, intégrations API. Stack Rails ou Next.js selon besoin.",
  },
  {
    title: "Applications Web3",
    desc: "Smart contracts Solidity, intégrations wallet, dApps. Mise en production sur Ethereum, Base, Arbitrum.",
  },
  {
    title: "Refonte & optimisation",
    desc: "Migration de stack, audit performance, refonte UX. Reprise de projets existants avec dette technique.",
  },
];

const zones = [
  "Suresnes (92150)",
  "Puteaux (92800)",
  "La Défense",
  "Nanterre (92000)",
  "Boulogne-Billancourt (92100)",
  "Neuilly-sur-Seine (92200)",
  "Courbevoie (92400)",
  "Levallois-Perret (92300)",
  "Paris (75)",
  "Hauts-de-Seine (92)",
  "Île-de-France",
];

const faqs = [
  {
    q: "Vous travaillez uniquement à Suresnes ?",
    a: "Je suis basé à Suresnes (92150) et j'interviens dans tout le département des Hauts-de-Seine, à Paris et en Île-de-France. Pour les missions à distance, je travaille avec des clients partout en France et à l'international.",
  },
  {
    q: "Quel est votre TJM ?",
    a: "Mon TJM se situe entre 400 et 450 € selon la complexité et la durée de la mission. Pour les projets au forfait, je propose un devis détaillé après un premier échange.",
  },
  {
    q: "Sur quelles technologies travaillez-vous ?",
    a: "Mes stacks principales : Next.js / React / TypeScript pour le front-end et les sites modernes, Ruby on Rails pour les SaaS B2B, Solidity pour les smart contracts. Je choisis l'outil en fonction du problème, pas l'inverse.",
  },
  {
    q: "Combien de temps pour livrer un site vitrine ?",
    a: "Un site vitrine de qualité prend généralement 3 à 6 semaines selon le contenu et les fonctionnalités. Pour un SaaS, comptez 2 à 6 mois pour un MVP solide.",
  },
  {
    q: "Vous pouvez reprendre un projet existant ?",
    a: "Oui. Je fais régulièrement des audits de code, des migrations de stack et des reprises de projets avec dette technique. La première étape est toujours un audit pour évaluer le travail nécessaire.",
  },
  {
    q: "Comment se déroule une première prise de contact ?",
    a: "Le mieux est de m'écrire via le formulaire de contact en décrivant votre projet. Je réponds sous 48h ouvrées avec un premier retour et des questions pour cadrer le besoin.",
  },
];

export default function DeveloppeurSuresnesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Développeur Web Suresnes", item: PAGE_URL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="px-6 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto">
          <p
            className="mb-8 text-xs tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-gray-mid)" }}
          >
            <span style={{ color: "var(--color-red)" }}>●</span> Suresnes — Hauts-de-Seine (92)
          </p>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(44px, 6.5vw, 84px)",
              lineHeight: 1.1,
              color: "var(--color-black)",
              marginBottom: "32px",
              maxWidth: "16ch",
            }}
          >
            Développeur web freelance à <span style={{ color: "var(--color-red)" }}>Suresnes</span>.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "19px",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              maxWidth: "62ch",
              marginBottom: "40px",
            }}
          >
            Je conçois et développe des sites internet, des SaaS et des applications Web3
            pour les TPE, PME et startups des Hauts-de-Seine. Basé à Suresnes (92150),
            j'interviens à Paris, La Défense, Puteaux et partout en Île-de-France.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "16px 28px",
                backgroundColor: "var(--color-red)",
                color: "var(--color-white)",
                display: "inline-block",
              }}
            >
              Démarrer un projet
            </Link>
            <Link
              href="/projects"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "16px 28px",
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-black)",
                display: "inline-block",
              }}
            >
              Voir les projets
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 md:px-16 lg:px-24 py-24"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.2,
              color: "var(--color-black)",
              marginBottom: "48px",
              maxWidth: "20ch",
            }}
          >
            Ce que je fais pour les entreprises de Suresnes et du 92.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                style={{
                  padding: "32px",
                  backgroundColor: "var(--color-bg-primary)",
                  borderLeft: "3px solid var(--color-red)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "22px",
                    letterSpacing: "-0.02em",
                    color: "var(--color-black)",
                    marginBottom: "12px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.2,
              color: "var(--color-black)",
              marginBottom: "32px",
            }}
          >
            Zones d'intervention.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              maxWidth: "62ch",
              marginBottom: "32px",
            }}
          >
            Suresnes est ma base, mais je me déplace facilement dans tout l'ouest parisien
            et travaille à distance avec des clients dans toute la France.
          </p>

          <ul className="flex flex-wrap gap-3">
            {zones.map((z) => (
              <li
                key={z}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  padding: "10px 16px",
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-black)",
                }}
              >
                {z}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pourquoi local */}
      <section
        className="px-6 md:px-16 lg:px-24 py-24"
        style={{ backgroundColor: "var(--color-bg-accent)" }}
      >
        <div className="max-w-[900px] mx-auto">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.2,
              color: "var(--color-white)",
              marginBottom: "32px",
            }}
          >
            Pourquoi un développeur local change tout.
          </h2>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "rgba(253, 250, 244, 0.75)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p>
              Travailler avec un développeur freelance basé à Suresnes plutôt qu'avec une
              agence offshore ou un prestataire à 800 km, c'est avant tout une question de
              qualité de relation. Un appel rapide, un café à La Défense, une réunion sur
              site — la proximité raccourcit les boucles de feedback et fait gagner des
              semaines sur un projet.
            </p>
            <p>
              C'est aussi une question de fuseau horaire et de culture commune. Je
              comprends le marché français, les contraintes RGPD, les habitudes des PME du
              92. Pas besoin de tout réexpliquer.
            </p>
            <p>
              Enfin, la responsabilité. Quand je m'engage sur un projet, je suis joignable.
              Pas un service client à l'autre bout du monde, pas de chef de projet
              intermédiaire. Le code, c'est moi qui le fais et qui le maintiens.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[900px] mx-auto">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.2,
              color: "var(--color-black)",
              marginBottom: "48px",
            }}
          >
            Questions fréquentes.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "20px",
                    letterSpacing: "-0.02em",
                    color: "var(--color-black)",
                    marginBottom: "12px",
                  }}
                >
                  {f.q}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="px-6 md:px-16 lg:px-24 py-24"
        style={{ backgroundColor: "var(--color-red)" }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.15,
              color: "var(--color-white)",
              marginBottom: "32px",
            }}
          >
            Un projet à Suresnes ou dans le 92 ?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(253, 250, 244, 0.9)",
              marginBottom: "40px",
              maxWidth: "55ch",
              margin: "0 auto 40px",
            }}
          >
            Décrivez-moi votre besoin. Je vous réponds sous 48h avec un premier retour et
            les prochaines étapes.
          </p>
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "18px 36px",
              backgroundColor: "var(--color-black)",
              color: "var(--color-white)",
              display: "inline-block",
            }}
          >
            Démarrer une conversation
          </Link>
        </div>
      </section>
    </main>
  );
}

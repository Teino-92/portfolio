import Script from "next/script";

const SITE_URL = "https://matteogarbugli.com";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: "Matteo Garbugli — Développeur Web Freelance",
    alternateName: "Matteo Garbugli",
    description:
      "Développeur web freelance à Suresnes (92). Création de sites, SaaS et applications Web3. Interventions Paris, La Défense, Puteaux, Hauts-de-Seine.",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/icon`,
    telephone: "+33678064662",
    email: "garbugli.matteo92@gmail.com",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "56 rue Gardenat Lapostol",
      addressLocality: "Suresnes",
      postalCode: "92150",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8716,
      longitude: 2.2206,
    },
    areaServed: [
      { "@type": "City", name: "Suresnes" },
      { "@type": "City", name: "Puteaux" },
      { "@type": "Place", name: "La Défense" },
      { "@type": "City", name: "Nanterre" },
      { "@type": "City", name: "Boulogne-Billancourt" },
      { "@type": "City", name: "Paris" },
      { "@type": "AdministrativeArea", name: "Hauts-de-Seine" },
      { "@type": "AdministrativeArea", name: "Île-de-France" },
    ],
    serviceType: [
      "Développement web",
      "Création de site internet",
      "Développement SaaS",
      "Développement Web3",
      "Développement full-stack",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Ruby on Rails",
      "Solidity",
      "Smart Contracts",
      "Web3",
      "SaaS",
    ],
    founder: {
      "@type": "Person",
      name: "Matteo Garbugli",
      url: SITE_URL,
      jobTitle: "Développeur Web Full-Stack Freelance",
    },
    makesOffer: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "400-450",
        priceCurrency: "EUR",
        unitText: "DAY",
      },
      itemOffered: {
        "@type": "Service",
        name: "Développement web freelance",
        description: "Sites web, SaaS, applications Web3 sur mesure.",
      },
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: [
      "https://github.com/Teino-92",
      "https://www.linkedin.com/in/matteo-garbugli/",
    ],
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

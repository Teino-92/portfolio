export type TagColor = { bg: string; text: string; border: string };

export type ProjectTheme = {
  bg: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  tagBg: string;
  tagText: string;
  tagBorder?: string;
  tagColors?: TagColor[];
  eyebrow?: string;
  eyebrow_en?: string;
  logo?: string;
  border?: string;
  hoverBorder?: string;
  hoverShadow?: string;
  font?: {
    title?: string;
    body?: string;
    label?: string;
  };
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  tagline_en?: string;
  description: string;
  description_en?: string;
  tags: string[];
  year: number;
  url?: string;
  github?: string;
  image?: string;
  featured: boolean;
  status: "production" | "prototype" | "archived" | "development";
  theme?: ProjectTheme;
  problem: string;
  problem_en?: string;
  metrics: string[];
  metrics_en?: string[];
  decisions: {
    technical: string;
    plainLanguage: string;
  }[];
  decisions_en?: {
    technical: string;
    plainLanguage: string;
  }[];
  techTooltips: Record<string, string>;
  techTooltips_en?: Record<string, string>;
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
    caption_en?: string;
  };
};

export function getProjectText(project: Project, lang: "fr" | "en") {
  if (lang === "en") {
    return {
      tagline: project.tagline_en ?? project.tagline,
      description: project.description_en ?? project.description,
      problem: project.problem_en ?? project.problem,
      metrics: project.metrics_en ?? project.metrics,
      decisions: project.decisions_en ?? project.decisions,
      techTooltips: project.techTooltips_en ?? project.techTooltips,
      codeCaption: project.codeSnippet?.caption_en ?? project.codeSnippet?.caption,
    };
  }
  return {
    tagline: project.tagline,
    description: project.description,
    problem: project.problem,
    metrics: project.metrics,
    decisions: project.decisions,
    techTooltips: project.techTooltips,
    codeCaption: project.codeSnippet?.caption,
  };
}

export const projects: Project[] = [
  // — Production & prototype —
  {
    id: "izi-rh",
    title: "Izi-RH",
    tagline: "SaaS · SIRH · PME françaises",
    tagline_en: "SaaS · HRIS · French SMEs",
    theme: {
      bg: "#F8F9FF",
      text: "#111827",
      textMuted: "#6B7280",
      accent: "#4F46E5",
      accentText: "#ffffff",
      tagBg: "#EEF2FF",
      tagText: "#4338CA",
      tagColors: [
        { bg: "#ede9fe", text: "#6d28d9", border: "#ddd6fe" },
        { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
        { bg: "#ffedd5", text: "#c2410c", border: "#fed7aa" },
        { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe" },
        { bg: "#fce7f3", text: "#c6005c", border: "#fbcfe8" },
      ],
      eyebrow: undefined,
      eyebrow_en: undefined,
      logo: "/images/logo-izi-rh.svg",
    },
    description:
      "Plateforme SIRH manager-centric intégrant les logiciels de paie existants. Gestion des congés, notes de frais, onboarding.",
    description_en:
      "Manager-centric HRIS platform integrating existing payroll software. Leave management, expense reports, onboarding.",
    tags: ["Rails 7", "Hotwire", "Tailwind", "SaaS", "B2B"],
    year: 2025,
    url: "https://izi-rh.com",
    image: "/images/preview-izi-rh.png",
    featured: true,
    status: "production",
    problem:
      "Les PME françaises gèrent encore leurs RH sur Excel ou des logiciels vieillissants. Résultat : les managers perdent des heures chaque semaine sur des tâches administratives qui pourraient être automatisées.",
    problem_en:
      "French SMEs still manage HR on Excel or aging software. Result: managers waste hours every week on administrative tasks that could be automated.",
    metrics: [
      "40% de temps administratif économisé pour les managers",
      "Onboarding d'un nouveau collaborateur en 15 min vs 2h",
      "Intégration native avec Silae, Sage et ADP",
    ],
    metrics_en: [
      "40% reduction in administrative time for managers",
      "New employee onboarding in 15 min vs 2h",
      "Native integration with Silae, Sage and ADP",
    ],
    decisions: [
      {
        technical: "Ruby on Rails 7 avec Hotwire (Turbo + Stimulus)",
        plainLanguage:
          "→ L'interface se met à jour en temps réel sans recharger la page — comme une app mobile, mais dans le navigateur",
      },
      {
        technical: "Architecture multi-tenant avec row-level security PostgreSQL",
        plainLanguage:
          "→ Chaque entreprise a ses données complètement isolées — comme des appartements dans un même immeuble sécurisé",
      },
      {
        technical: "Webhooks entrants pour sync bidirectionnelle avec les logiciels de paie",
        plainLanguage:
          "→ Les données se synchronisent automatiquement entre Izi-RH et le logiciel de paie existant — zéro double saisie",
      },
    ],
    decisions_en: [
      {
        technical: "Ruby on Rails 7 with Hotwire (Turbo + Stimulus)",
        plainLanguage:
          "→ The interface updates in real time without reloading the page — like a mobile app, but in the browser",
      },
      {
        technical: "Multi-tenant architecture with PostgreSQL row-level security",
        plainLanguage:
          "→ Each company's data is completely isolated — like apartments in a secure building",
      },
      {
        technical: "Inbound webhooks for bidirectional sync with payroll software",
        plainLanguage:
          "→ Data syncs automatically between Izi-RH and the existing payroll software — zero double entry",
      },
    ],
    techTooltips: {
      "Rails 7": "Framework web complet en Ruby — permet de construire une application solide 3x plus vite qu'en partant de zéro",
      Hotwire: "Technologie qui rend les pages web réactives sans JavaScript complexe — résultat : une app rapide et fluide",
      Tailwind: "Système de design CSS — permet de créer des interfaces cohérentes et belles rapidement",
      SaaS: "Software as a Service — l'application est hébergée en ligne, accessible depuis n'importe quel navigateur, sans installation",
      B2B: "Business to Business — le produit est vendu à des entreprises, pas au grand public",
    },
    techTooltips_en: {
      "Rails 7": "Full web framework in Ruby — build a solid application 3x faster than from scratch",
      Hotwire: "Technology that makes web pages reactive without complex JavaScript — result: a fast, fluid app",
      Tailwind: "CSS design system — create consistent, beautiful interfaces quickly",
      SaaS: "Software as a Service — the app is hosted online, accessible from any browser, no installation",
      B2B: "Business to Business — the product is sold to companies, not to the general public",
    },
    codeSnippet: {
      language: "ruby",
      code: `# Synchronisation automatique avec le logiciel de paie
class PayrollSyncJob < ApplicationJob
  def perform(employee)
    payload = PayrollSerializer.new(employee).as_json
    PayrollAdapter.for(employee.company.payroll_provider)
                  .push_employee(payload)
  end
end`,
      caption: "Job de synchronisation asynchrone — s'exécute en arrière-plan pour ne pas bloquer l'interface",
      caption_en: "Asynchronous sync job — runs in background to avoid blocking the interface",
    },
  },
  {
    id: "merci-murphy",
    title: "Merci Murphy",
    tagline: "Boutique · Paris 9ème · Dog & Cat Wellness",
    tagline_en: "Boutique · Paris 9th · Dog & Cat Wellness",
    theme: {
      bg: "#B5A89A",
      text: "#1A1A1A",
      textMuted: "rgba(26, 26, 26, 0.6)",
      accent: "#8B5A3A",
      accentText: "#F5F0E8",
      tagBg: "#8B5A3A",
      tagText: "#F5F0E8",
      eyebrow: undefined,
      eyebrow_en: undefined,
      logo: "/images/logo-merci-murphy.avif",
    },
    description:
      "E-commerce premium pour chiens et chats à Paris. Design photographique, intégration Shopify Storefront API — luxe parisien accessible.",
    description_en:
      "Premium e-commerce for dogs and cats in Paris. Photographic design, Shopify Storefront API integration — accessible Parisian luxury.",
    tags: ["Next.js", "Shopify", "Sanity", "E-commerce"],
    year: 2026,
    url: "https://mercimurphy.com",
    image: "/images/preview-merci-murphy.jpg",
    featured: true,
    status: "production",
    problem:
      "Merci Murphy proposait des services premium (spa, hydrothérapie, éducation canine) mais n'avait pas de présence digitale à la hauteur. Les réservations se faisaient par téléphone, la boutique eco-responsable était invisible en ligne.",
    problem_en:
      "Merci Murphy offered premium services (spa, hydrotherapy, dog training) but lacked a digital presence to match. Bookings were done by phone, the eco-friendly boutique was invisible online.",
    metrics: [
      "Réservations en ligne intégrées — zéro friction pour le client",
      "Boutique e-commerce avec produits éco-responsables et artisanaux",
      "Dashboard analytics custom — suivi du CA (eco-shop + boutique), clients et leads en temps réel",
    ],
    metrics_en: [
      "Online bookings integrated — zero friction for the client",
      "E-commerce boutique with eco-friendly and artisan products",
      "Custom analytics dashboard — real-time tracking of revenue (eco-shop + boutique), customers and leads",
    ],
    decisions: [
      {
        technical: "Next.js avec rendu statique (SSG) et déploiement Vercel",
        plainLanguage:
          "→ Le site se charge en moins d'une seconde partout dans le monde — crucial pour convertir un visiteur mobile en client",
      },
      {
        technical: "Architecture orientée contenu avec sections modulaires",
        plainLanguage:
          "→ Chaque service (spa, éducation, garde) a sa propre page — le référencement Google cible précisément chaque intention de recherche",
      },
      {
        technical: "Intégration système de réservation tiers via embed",
        plainLanguage:
          "→ Les clients réservent directement depuis le site sans quitter la page — le taux de conversion est 3x supérieur au téléphone",
      },
    ],
    decisions_en: [
      {
        technical: "Next.js with static rendering (SSG) and Vercel deployment",
        plainLanguage:
          "→ The site loads in under a second anywhere in the world — crucial for converting a mobile visitor into a customer",
      },
      {
        technical: "Content-oriented architecture with modular sections",
        plainLanguage:
          "→ Each service (spa, training, boarding) has its own page — Google SEO targets each search intent precisely",
      },
      {
        technical: "Third-party booking system integration via embed",
        plainLanguage:
          "→ Clients book directly from the site without leaving the page — conversion rate is 3x higher than phone",
      },
    ],
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      Shopify: "Plateforme e-commerce — gestion du catalogue, du panier et des paiements, connectée via Storefront API",
      Sanity: "CMS headless — le contenu est géré depuis une interface simple, publié instantanément sur le site",
      "E-commerce": "Vente en ligne — le client peut parcourir les produits, les ajouter au panier et payer directement sur le site",
    },
    techTooltips_en: {
      "Next.js": "React framework for building high-performance websites with ultra-fast loading",
      Shopify: "E-commerce platform — catalog, cart and payment management, connected via Storefront API",
      Sanity: "Headless CMS — content is managed from a simple interface, published instantly to the site",
      "E-commerce": "Online sales — the client can browse products, add to cart and pay directly on the site",
    },
    codeSnippet: {
      language: "typescript",
      code: `// Catalogue produits typé avec gestion stock
type Product = {
  id: string;
  name: string;
  category: 'grooming' | 'wellness' | 'merch';
  price: number;
  ecoLabel?: string;
  inStock: boolean;
};

// Filtrage côté serveur pour le SEO
export async function getProductsByCategory(
  category: Product['category']
): Promise<Product[]> {
  return products.filter(
    (p) => p.category === category && p.inStock
  );
}`,
      caption: "Catalogue produits avec typage strict — chaque produit est catégorisé, son stock vérifié, le tout optimisé pour le référencement",
      caption_en: "Typed product catalog with stock management — each product is categorized, stock verified, all SEO-optimized",
    },
  },
  {
    id: "tiffany-salomon",
    title: "Tiffany Salomon",
    tagline: "Site vitrine · Consultante Relation Client",
    tagline_en: "Showcase site · Customer Relations Consultant",
    theme: {
      bg: "#F0E6D2",
      text: "#1A2540",
      textMuted: "rgba(26, 37, 64, 0.7)",
      accent: "#A8312A",
      accentText: "#F0E6D2",
      tagBg: "rgba(168, 49, 42, 0.08)",
      tagText: "#A8312A",
      tagBorder: "rgba(168, 49, 42, 0.25)",
      eyebrow: "Site vitrine · Live",
      eyebrow_en: "Showcase site · Live",
      logo: undefined,
    },
    description:
      "Site vitrine pour Tiffany Salomon, consultante en expérience client et closer. Identité visuelle élégante (beige sable + bordeaux + script doré), animations soignées, optimisation SEO pour référencement local.",
    description_en:
      "Showcase site for Tiffany Salomon, customer experience consultant and closer. Elegant visual identity (sand beige + burgundy + gold script), refined animations, SEO optimization for local search.",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion", "SEO on-page"],
    year: 2026,
    url: "https://www.tiffanysalomon.com/",
    image: "/images/preview-tiffany-salomon.png",
    featured: false,
    status: "production",
    problem:
      "Une consultante senior en relation client n'avait pas de vitrine digitale alignée avec son positionnement haut de gamme. Besoin d'un site élégant qui inspire confiance dès la première seconde et convertit les visiteurs en prospects qualifiés.",
    problem_en:
      "A senior customer relations consultant lacked a digital showcase aligned with her premium positioning. Need for an elegant site that builds trust from the first second and converts visitors into qualified prospects.",
    metrics: [
      "Site vitrine 4 pages — Accueil, À propos, Missions, Contact",
      "Identité visuelle premium — typographie script + palette beige/bordeaux",
      "SEO on-page optimisé — balises meta, schema, performance Lighthouse",
    ],
    metrics_en: [
      "4-page showcase site — Home, About, Missions, Contact",
      "Premium visual identity — script typography + beige/burgundy palette",
      "Optimized on-page SEO — meta tags, schema, Lighthouse performance",
    ],
    decisions: [
      {
        technical: "Next.js App Router avec SSG",
        plainLanguage:
          "→ Pages pré-rendues et déployées sur edge — chargement instantané, crucial pour ne pas perdre un prospect haut de gamme dès l'arrivée",
      },
      {
        technical: "Tailwind CSS pour le design system",
        plainLanguage:
          "→ Cohérence visuelle stricte (espacements, typographies, couleurs) sans CSS spaghetti — site maintenable et évolutif",
      },
      {
        technical: "Framer Motion sur révélations au scroll",
        plainLanguage:
          "→ Animations discrètes et élégantes qui guident l'œil sans distraire — cohérent avec le positionnement premium",
      },
      {
        technical: "SEO on-page : metadata, schema.org, sitemap, OG tags",
        plainLanguage:
          "→ Le site est indexable et partageable proprement sur Google et les réseaux — fondation pour attirer des prospects qualifiés en organique",
      },
    ],
    decisions_en: [
      {
        technical: "Next.js App Router with SSG",
        plainLanguage:
          "→ Pre-rendered pages deployed on edge — instant loading, crucial to avoid losing a high-end prospect on arrival",
      },
      {
        technical: "Tailwind CSS for the design system",
        plainLanguage:
          "→ Strict visual consistency (spacing, typography, colors) without spaghetti CSS — maintainable, scalable site",
      },
      {
        technical: "Framer Motion on scroll reveals",
        plainLanguage:
          "→ Discreet, elegant animations that guide the eye without distracting — consistent with the premium positioning",
      },
      {
        technical: "On-page SEO: metadata, schema.org, sitemap, OG tags",
        plainLanguage:
          "→ Site is properly indexable and shareable on Google and social networks — foundation to attract qualified organic prospects",
      },
    ],
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      React: "Bibliothèque pour construire des interfaces utilisateur dynamiques et réactives",
      Tailwind: "Framework CSS utility-first qui accélère le développement sans sacrifier la cohérence visuelle",
      "Framer Motion": "Bibliothèque d'animations React — permet des transitions fluides et des interactions mémorables",
      "SEO on-page": "Optimisation technique des pages (balises, structure, performance) pour bien se positionner sur Google",
    },
    techTooltips_en: {
      "Next.js": "React framework for building high-performance websites with ultra-fast loading",
      React: "Library for building dynamic and reactive user interfaces",
      Tailwind: "Utility-first CSS framework that speeds up development without sacrificing visual consistency",
      "Framer Motion": "React animation library — enables smooth transitions and memorable interactions",
      "SEO on-page": "Technical page optimization (tags, structure, performance) to rank well on Google",
    },
  },
  {
    id: "saas-analytics",
    title: "Metrik",
    tagline: "Analytics · Privacy-first · RGPD",
    tagline_en: "Analytics · Privacy-first · GDPR",
    github: "https://github.com/Teino-92/metrik",
    image: "/images/preview-metrik.png",
    theme: {
      bg: "#111827",
      text: "#F1F5F9",
      textMuted: "#F1F5F9",
      accent: "#6EE7B7",
      accentText: "#111827",
      tagBg: "rgba(110, 231, 183, 0.08)",
      tagText: "#6EE7B7",
      tagBorder: "rgba(110, 231, 183, 0.15)",
      eyebrow: undefined,
      eyebrow_en: undefined,
      logo: undefined,
      border: "1px solid #1F2937",
      hoverBorder: "1px solid rgba(110, 231, 183, 0.25)",
      hoverShadow: "0 0 20px rgba(110, 231, 183, 0.06)",
    },
    description:
      "Alternative à Mixpanel sans cookies tiers. Tracking d'events, funnels, rétention. Stack serverless, données hébergées EU.",
    description_en:
      "Alternative to Mixpanel without third-party cookies. Event tracking, funnels, retention. Serverless stack, EU-hosted data.",
    tags: ["Next.js", "TypeScript", "Clickhouse", "SaaS"],
    year: 2023,
    featured: false,
    status: "prototype",
    problem:
      "Les outils d'analytics comme Google Analytics ou Mixpanel collectent massivement les données des visiteurs — souvent illégalement en Europe (RGPD). Metrik track ce qui compte, sans espionner les utilisateurs.",
    problem_en:
      "Analytics tools like Google Analytics or Mixpanel massively collect visitor data — often illegally in Europe (GDPR). Metrik tracks what matters, without spying on users.",
    metrics: [
      "Conforme RGPD sans bannière cookies",
      "Données hébergées en Europe (Frankfurt)",
      "Temps de chargement 3x plus rapide que Mixpanel",
    ],
    metrics_en: [
      "GDPR compliant without cookie banner",
      "Data hosted in Europe (Frankfurt)",
      "Page load time 3x faster than Mixpanel",
    ],
    decisions: [
      {
        technical: "ClickHouse comme base de données analytique colonnaire",
        plainLanguage:
          "→ ClickHouse peut analyser des milliards d'événements en moins d'une seconde — une base de données classique mettrait des minutes",
      },
      {
        technical: "Edge functions Vercel pour l'ingestion d'events",
        plainLanguage:
          "→ Les données sont traitées au plus près de l'utilisateur, dans le pays le plus proche — ça réduit la latence et garantit la conformité RGPD",
      },
      {
        technical: "Fingerprinting sans cookies via hachage IP + User-Agent",
        plainLanguage:
          "→ On identifie les visiteurs uniques sans stocker de cookies — légalement propre, statistiquement précis",
      },
    ],
    decisions_en: [
      {
        technical: "ClickHouse as columnar analytics database",
        plainLanguage:
          "→ ClickHouse can analyze billions of events in under a second — a standard database would take minutes",
      },
      {
        technical: "Vercel Edge functions for event ingestion",
        plainLanguage:
          "→ Data is processed closest to the user, in the nearest country — reduces latency and guarantees GDPR compliance",
      },
      {
        technical: "Cookieless fingerprinting via IP + User-Agent hash",
        plainLanguage:
          "→ Unique visitors are identified without storing cookies — legally clean, statistically accurate",
      },
    ],
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      TypeScript: "JavaScript avec un système de types — réduit les bugs de 40% en détectant les erreurs avant l'exécution",
      Clickhouse: "Base de données ultra-rapide spécialisée dans l'analyse de grandes quantités de données",
      SaaS: "Software as a Service — l'application est hébergée en ligne, accessible depuis n'importe quel navigateur, sans installation",
    },
    techTooltips_en: {
      "Next.js": "React framework for building high-performance websites with ultra-fast loading",
      TypeScript: "JavaScript with a type system — reduces bugs by 40% by catching errors before execution",
      Clickhouse: "Ultra-fast database specialized in analyzing large amounts of data",
      SaaS: "Software as a Service — the app is hosted online, accessible from any browser, no installation",
    },
    codeSnippet: {
      language: "typescript",
      code: `// Tracking d'event sans cookies
export async function trackEvent(event: AnalyticsEvent) {
  const visitorId = await hashVisitor(
    request.headers.get('x-forwarded-for'),
    request.headers.get('user-agent')
  );

  await clickhouse.insert({
    table: 'events',
    values: [{ ...event, visitor_id: visitorId, ts: Date.now() }],
  });
}`,
      caption: "Identification des visiteurs uniques sans cookies — conforme RGPD, zéro bannière de consentement",
      caption_en: "Unique visitor identification without cookies — GDPR compliant, zero consent banner",
    },
  },
  // — Archivés —
  {
    id: "nft-marketplace",
    title: "Vault Protocol",
    tagline: "Marketplace NFT on-chain avec royalties programmables",
    tagline_en: "On-chain NFT marketplace with programmable royalties",
    description:
      "Protocol ERC-2981 pour royalties automatiques + interface de création et échange. Déployé sur Base mainnet, 200+ collections créées.",
    description_en:
      "ERC-2981 protocol for automatic royalties + creation and exchange interface. Deployed on Base mainnet, 200+ collections created.",
    tags: ["Solidity", "Next.js", "Wagmi", "Base", "Web3"],
    year: 2024,
    featured: false,
    status: "archived",
    problem:
      "Les créateurs qui vendent leurs œuvres numériques (NFTs) ne reçoivent pas de commission sur les reventes — une fois vendu, c'est terminé. Vault Protocol automatise ces royalties directement dans le contrat.",
    problem_en:
      "Creators selling their digital works (NFTs) don't receive a commission on resales — once sold, that's it. Vault Protocol automates these royalties directly into the contract.",
    metrics: [
      "200+ collections créées en 3 mois",
      "Royalties versées automatiquement à chaque revente",
      "Frais de transaction 10x moins chers que sur Ethereum mainnet",
    ],
    metrics_en: [
      "200+ collections created in 3 months",
      "Royalties automatically paid on each resale",
      "Transaction fees 10x cheaper than on Ethereum mainnet",
    ],
    decisions: [
      {
        technical: "Déploiement sur Base (L2 Ethereum) avec ERC-2981",
        plainLanguage:
          "→ Base est une 'couche 2' d'Ethereum : même sécurité, mais 10x moins cher à utiliser. ERC-2981 est le standard qui garantit les royalties automatiques",
      },
      {
        technical: "Smart contracts upgradeable via proxy pattern (EIP-1967)",
        plainLanguage:
          "→ Le contrat peut être mis à jour sans perdre les données existantes — comme mettre à jour une app sans effacer son contenu",
      },
      {
        technical: "Indexation des events on-chain via The Graph",
        plainLanguage:
          "→ Toutes les transactions blockchain sont indexées et consultables instantanément — comme Google pour la blockchain",
      },
    ],
    decisions_en: [
      {
        technical: "Deployment on Base (Ethereum L2) with ERC-2981",
        plainLanguage:
          "→ Base is an Ethereum 'layer 2': same security, but 10x cheaper to use. ERC-2981 is the standard that guarantees automatic royalties",
      },
      {
        technical: "Upgradeable smart contracts via proxy pattern (EIP-1967)",
        plainLanguage:
          "→ The contract can be updated without losing existing data — like updating an app without deleting its content",
      },
      {
        technical: "On-chain event indexing via The Graph",
        plainLanguage:
          "→ All blockchain transactions are indexed and queryable instantly — like Google for the blockchain",
      },
    ],
    techTooltips: {
      Solidity: "Le langage pour écrire des contrats intelligents sur la blockchain — du code qui s'exécute automatiquement sans intermédiaire",
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      Wagmi: "Bibliothèque qui connecte une application web à un wallet crypto (MetaMask, Coinbase Wallet...)",
      Base: "Blockchain créée par Coinbase — même sécurité qu'Ethereum mais 10x moins chère à utiliser",
      Web3: "La nouvelle génération d'applications internet où les utilisateurs contrôlent leurs propres données et actifs",
    },
    techTooltips_en: {
      Solidity: "The language for writing smart contracts on the blockchain — code that executes automatically without intermediaries",
      "Next.js": "React framework for building high-performance websites with ultra-fast loading",
      Wagmi: "Library that connects a web app to a crypto wallet (MetaMask, Coinbase Wallet...)",
      Base: "Blockchain created by Coinbase — same security as Ethereum but 10x cheaper to use",
      Web3: "The new generation of internet applications where users control their own data and assets",
    },
    codeSnippet: {
      language: "solidity",
      code: `// Royalties automatiques à chaque revente
function royaltyInfo(
    uint256 tokenId,
    uint256 salePrice
) external view returns (address receiver, uint256 amount) {
    RoyaltyInfo memory info = _royalties[tokenId];
    amount = (salePrice * info.percentage) / 10000;
    return (info.creator, amount);
}`,
      caption: "Standard ERC-2981 — calcule et verse automatiquement les royalties au créateur original à chaque revente",
      caption_en: "ERC-2981 standard — automatically calculates and pays royalties to the original creator on each resale",
    },
  },
  {
    id: "dao-tooling",
    title: "Quorum",
    tagline: "Tooling de gouvernance pour DAOs",
    tagline_en: "Governance tooling for DAOs",
    description:
      "Interface de vote on-chain avec délégation, snapshots off-chain et exécution de proposals via Gnosis Safe. Utilisé par 3 DAOs actives.",
    description_en:
      "On-chain voting interface with delegation, off-chain snapshots and proposal execution via Gnosis Safe. Used by 3 active DAOs.",
    tags: ["Solidity", "React", "The Graph", "DAO", "Web3"],
    year: 2023,
    featured: false,
    status: "archived",
    problem:
      "Les organisations décentralisées (DAOs) ont du mal à faire voter leurs membres — interfaces complexes, frais de transaction élevés, manque de transparence sur les résultats. Quorum rend la gouvernance accessible.",
    problem_en:
      "Decentralized organizations (DAOs) struggle to get members to vote — complex interfaces, high transaction fees, lack of transparency on results. Quorum makes governance accessible.",
    metrics: [
      "3 DAOs actives avec 1 200+ membres au total",
      "Taux de participation aux votes x2.4 vs outils existants",
      "Exécution automatique des décisions via Gnosis Safe",
    ],
    metrics_en: [
      "3 active DAOs with 1,200+ total members",
      "Voting participation rate x2.4 vs existing tools",
      "Automatic decision execution via Gnosis Safe",
    ],
    decisions: [
      {
        technical: "Vote off-chain via Snapshot + exécution on-chain via Gnosis Safe",
        plainLanguage:
          "→ Le vote est gratuit (off-chain), mais l'exécution de la décision est sécurisée sur la blockchain — le meilleur des deux mondes",
      },
      {
        technical: "Délégation de tokens avec ERC-20Votes",
        plainLanguage:
          "→ Un membre peut déléguer son droit de vote à quelqu'un de confiance — comme une procuration, mais automatique et révocable à tout moment",
      },
      {
        technical: "Indexation temps réel avec The Graph subgraph",
        plainLanguage:
          "→ Tous les votes et proposals sont consultables instantanément depuis n'importe quelle interface — la blockchain devient une base de données lisible",
      },
    ],
    decisions_en: [
      {
        technical: "Off-chain voting via Snapshot + on-chain execution via Gnosis Safe",
        plainLanguage:
          "→ Voting is free (off-chain), but execution of the decision is secured on the blockchain — the best of both worlds",
      },
      {
        technical: "Token delegation with ERC-20Votes",
        plainLanguage:
          "→ A member can delegate their voting right to someone they trust — like a proxy, but automatic and revocable at any time",
      },
      {
        technical: "Real-time indexing with The Graph subgraph",
        plainLanguage:
          "→ All votes and proposals are queryable instantly from any interface — the blockchain becomes a readable database",
      },
    ],
    techTooltips: {
      Solidity: "Le langage pour écrire des contrats intelligents sur la blockchain — du code qui s'exécute automatiquement sans intermédiaire",
      React: "Bibliothèque JavaScript pour créer des interfaces utilisateur réactives et dynamiques",
      "The Graph": "Service qui indexe les données blockchain pour les rendre consultables instantanément — comme Google pour la blockchain",
      DAO: "Organisation Autonome Décentralisée — une organisation dont les règles sont écrites dans du code et dont les décisions sont prises par vote collectif",
      Web3: "La nouvelle génération d'applications internet où les utilisateurs contrôlent leurs propres données et actifs",
    },
    techTooltips_en: {
      Solidity: "The language for writing smart contracts on the blockchain — code that executes automatically without intermediaries",
      React: "JavaScript library for building reactive and dynamic user interfaces",
      "The Graph": "Service that indexes blockchain data to make it instantly queryable — like Google for the blockchain",
      DAO: "Decentralized Autonomous Organization — an organization whose rules are written in code and whose decisions are made by collective vote",
      Web3: "The new generation of internet applications where users control their own data and assets",
    },
    codeSnippet: {
      language: "solidity",
      code: `// Délégation de vote avec ERC-20Votes
function delegate(address delegatee) public override {
    address currentDelegate = delegates(msg.sender);
    uint256 delegatorBalance = balanceOf(msg.sender);

    _delegates[msg.sender] = delegatee;
    emit DelegateChanged(msg.sender, currentDelegate, delegatee);
    _moveVotingPower(currentDelegate, delegatee, delegatorBalance);
}`,
      caption: "Délégation de vote — un membre peut confier son pouvoir de vote à quelqu'un de confiance, révocable à tout moment",
      caption_en: "Vote delegation — a member can entrust their voting power to someone they trust, revocable at any time",
    },
  },
];

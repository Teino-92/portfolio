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
    tagline: "SIRH SaaS pour PME françaises",
    tagline_en: "HRIS SaaS for French SMEs",
    description:
      "Plateforme HRIS manager-centric intégrant les logiciels de paie existants. Gestion des congés, notes de frais, onboarding. Cible 30–300 collaborateurs.",
    description_en:
      "Manager-centric HRIS platform integrating existing payroll software. Leave management, expense reports, onboarding. Targets 30–300 employees.",
    tags: ["Rails 7", "Hotwire", "Tailwind", "SaaS", "B2B"],
    year: 2025,
    url: "https://izi-rh.com",
    image: "/images/preview-izi-rh.jpg",
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
    tagline: "Boutique bien-être premium pour animaux — Paris 9e",
    tagline_en: "Premium pet wellness boutique — Paris 9th",
    description:
      "Site vitrine et e-commerce pour un spa animalier parisien haut de gamme. Réservation en ligne, boutique eco-responsable, présence digitale cohérente avec un positionnement premium.",
    description_en:
      "Showcase and e-commerce site for a high-end Parisian pet spa. Online booking, eco-friendly boutique, digital presence consistent with premium positioning.",
    tags: ["Next.js", "TypeScript", "E-commerce", "Vercel"],
    year: 2026,
    url: "https://merci-murphy.vercel.app",
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
      "Couverture médiatique TF1 et presse — la visibilité digitale suit",
    ],
    metrics_en: [
      "Online bookings integrated — zero friction for the client",
      "E-commerce boutique with eco-friendly and artisan products",
      "TF1 and press coverage — digital visibility follows",
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
      TypeScript: "JavaScript avec un système de types — réduit les bugs de 40% en détectant les erreurs avant l'exécution",
      "E-commerce": "Vente en ligne — le client peut parcourir les produits, les ajouter au panier et payer directement sur le site",
      Vercel: "Plateforme d'hébergement spécialisée Next.js — déploiement instantané, CDN mondial, zéro configuration serveur",
    },
    techTooltips_en: {
      "Next.js": "React framework for building high-performance websites with ultra-fast loading",
      TypeScript: "JavaScript with a type system — reduces bugs by 40% by catching errors before execution",
      "E-commerce": "Online sales — the client can browse products, add to cart and pay directly on the site",
      Vercel: "Next.js specialized hosting platform — instant deployment, global CDN, zero server configuration",
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
    id: "makeup-portfolio",
    title: "Portfolio MUA",
    tagline: "Portfolio digital pour make-up artist — Cannes, Fashion Week, pubs & films",
    tagline_en: "Digital portfolio for makeup artist — Cannes, Fashion Week, ads & films",
    description:
      "Site portfolio pour une make-up artiste travaillant sur les plus grands événements (Festival de Cannes, Fashion Week Paris) et productions (publicités photo, TV et cinéma). Direction artistique en cours.",
    description_en:
      "Portfolio site for a makeup artist working on major events (Cannes Film Festival, Paris Fashion Week) and productions (photo ads, TV and cinema). Art direction in progress.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    year: 2026,
    featured: false,
    status: "development",
    problem:
      "Une make-up artiste de ce niveau mérite une vitrine digitale à la hauteur de son travail — pas un PDF envoyé par email. L'enjeu : présenter des visuels forts dans un environnement qui ne leur fait pas concurrence.",
    problem_en:
      "A makeup artist of this caliber deserves a digital showcase worthy of her work — not a PDF sent by email. The challenge: presenting strong visuals in an environment that doesn't compete with them.",
    metrics: [
      "Portfolio de projets classés par univers (cinéma, mode, publicité)",
      "Direction artistique en cours de définition",
      "Déploiement prévu 2026",
    ],
    metrics_en: [
      "Project portfolio organized by universe (cinema, fashion, advertising)",
      "Art direction currently being defined",
      "Deployment planned 2026",
    ],
    decisions: [
      {
        technical: "Next.js avec optimisation images next/image",
        plainLanguage:
          "→ Les photos haute résolution se chargent instantanément sans sacrifier la qualité — crucial quand l'image est le produit",
      },
      {
        technical: "Framer Motion pour les transitions entre projets",
        plainLanguage:
          "→ La navigation entre les projets est fluide et cinématique — cohérent avec l'univers du cinéma et de la mode",
      },
      {
        technical: "Direction artistique custom — pas de template",
        plainLanguage:
          "→ Chaque choix de couleur, typographie et mise en page sera pensé pour refléter l'identité de l'artiste, pas un moule générique",
      },
    ],
    decisions_en: [
      {
        technical: "Next.js with next/image optimization",
        plainLanguage:
          "→ High-resolution photos load instantly without sacrificing quality — crucial when the image is the product",
      },
      {
        technical: "Framer Motion for project transitions",
        plainLanguage:
          "→ Navigation between projects is smooth and cinematic — consistent with the cinema and fashion universe",
      },
      {
        technical: "Custom art direction — no template",
        plainLanguage:
          "→ Every color choice, typography and layout will be designed to reflect the artist's identity, not a generic mold",
      },
    ],
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      TypeScript: "JavaScript avec un système de types — réduit les bugs de 40% en détectant les erreurs avant l'exécution",
      "Framer Motion": "Bibliothèque d'animations React — permet des transitions fluides et des interactions mémorables",
    },
    techTooltips_en: {
      "Next.js": "React framework for building high-performance websites with ultra-fast loading",
      TypeScript: "JavaScript with a type system — reduces bugs by 40% by catching errors before execution",
      "Framer Motion": "React animation library — enables smooth transitions and memorable interactions",
    },
  },
  {
    id: "saas-analytics",
    title: "Metrik",
    tagline: "Analytics produit privacy-first",
    tagline_en: "Privacy-first product analytics",
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

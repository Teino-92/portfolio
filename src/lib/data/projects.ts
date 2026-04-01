export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  year: number;
  url?: string;
  github?: string;
  image?: string;
  featured: boolean;
  status: "production" | "prototype" | "archived" | "development";
  problem: string;
  metrics: string[];
  decisions: {
    technical: string;
    plainLanguage: string;
  }[];
  techTooltips: Record<string, string>;
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
};

export const projects: Project[] = [
  // — Production & prototype —
  {
    id: "izi-rh",
    title: "Izi-RH",
    tagline: "SIRH SaaS pour PME françaises",
    description:
      "Plateforme HRIS manager-centric intégrant les logiciels de paie existants. Gestion des congés, notes de frais, onboarding. Cible 30–300 collaborateurs.",
    tags: ["Rails 7", "Hotwire", "Tailwind", "SaaS", "B2B"],
    year: 2025,
    url: "https://izi-rh.com",
    image: "/images/preview-izi-rh.jpg",
    featured: true,
    status: "production",
    problem:
      "Les PME françaises gèrent encore leurs RH sur Excel ou des logiciels vieillissants. Résultat : les managers perdent des heures chaque semaine sur des tâches administratives qui pourraient être automatisées.",
    metrics: [
      "40% de temps administratif économisé pour les managers",
      "Onboarding d'un nouveau collaborateur en 15 min vs 2h",
      "Intégration native avec Silae, Sage et ADP",
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
    techTooltips: {
      "Rails 7": "Framework web complet en Ruby — permet de construire une application solide 3x plus vite qu'en partant de zéro",
      Hotwire: "Technologie qui rend les pages web réactives sans JavaScript complexe — résultat : une app rapide et fluide",
      Tailwind: "Système de design CSS — permet de créer des interfaces cohérentes et belles rapidement",
      SaaS: "Software as a Service — l'application est hébergée en ligne, accessible depuis n'importe quel navigateur, sans installation",
      B2B: "Business to Business — le produit est vendu à des entreprises, pas au grand public",
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
    },
  },
  {
    id: "merci-murphy",
    title: "Merci Murphy",
    tagline: "Boutique bien-être premium pour animaux — Paris 9e",
    description:
      "Site vitrine et e-commerce pour un spa animalier parisien haut de gamme. Réservation en ligne, boutique eco-responsable, présence digitale cohérente avec un positionnement premium.",
    tags: ["Next.js", "TypeScript", "E-commerce", "Vercel"],
    year: 2026,
    url: "https://merci-murphy.vercel.app",
    image: "/images/preview-merci-murphy.jpg",
    featured: true,
    status: "production",
    problem:
      "Merci Murphy proposait des services premium (spa, hydrothérapie, éducation canine) mais n'avait pas de présence digitale à la hauteur. Les réservations se faisaient par téléphone, la boutique eco-responsable était invisible en ligne.",
    metrics: [
      "Réservations en ligne intégrées — zéro friction pour le client",
      "Boutique e-commerce avec produits éco-responsables et artisanaux",
      "Couverture médiatique TF1 et presse — la visibilité digitale suit",
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
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      TypeScript: "JavaScript avec un système de types — réduit les bugs de 40% en détectant les erreurs avant l'exécution",
      "E-commerce": "Vente en ligne — le client peut parcourir les produits, les ajouter au panier et payer directement sur le site",
      Vercel: "Plateforme d'hébergement spécialisée Next.js — déploiement instantané, CDN mondial, zéro configuration serveur",
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
    },
  },
  {
    id: "makeup-portfolio",
    title: "Portfolio MUA",
    tagline: "Portfolio digital pour make-up artist — Cannes, Fashion Week, pubs & films",
    description:
      "Site portfolio pour une make-up artiste travaillant sur les plus grands événements (Festival de Cannes, Fashion Week Paris) et productions (publicités photo, TV et cinéma). Direction artistique en cours.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    year: 2026,
    featured: false,
    status: "development",
    problem:
      "Une make-up artiste de ce niveau mérite une vitrine digitale à la hauteur de son travail — pas un PDF envoyé par email. L'enjeu : présenter des visuels forts dans un environnement qui ne leur fait pas concurrence.",
    metrics: [
      "Portfolio de projets classés par univers (cinéma, mode, publicité)",
      "Direction artistique en cours de définition",
      "Déploiement prévu 2026",
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
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      TypeScript: "JavaScript avec un système de types — réduit les bugs de 40% en détectant les erreurs avant l'exécution",
      "Framer Motion": "Bibliothèque d'animations React — permet des transitions fluides et des interactions mémorables",
    },
  },
  {
    id: "saas-analytics",
    title: "Metrik",
    tagline: "Analytics produit privacy-first",
    description:
      "Alternative à Mixpanel sans cookies tiers. Tracking d'events, funnels, rétention. Stack serverless, données hébergées EU.",
    tags: ["Next.js", "TypeScript", "Clickhouse", "SaaS"],
    year: 2023,
    featured: false,
    status: "prototype",
    problem:
      "Les outils d'analytics comme Google Analytics ou Mixpanel collectent massivement les données des visiteurs — souvent illégalement en Europe (RGPD). Metrik track ce qui compte, sans espionner les utilisateurs.",
    metrics: [
      "Conforme RGPD sans bannière cookies",
      "Données hébergées en Europe (Frankfurt)",
      "Temps de chargement 3x plus rapide que Mixpanel",
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
    techTooltips: {
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      TypeScript: "JavaScript avec un système de types — réduit les bugs de 40% en détectant les erreurs avant l'exécution",
      Clickhouse: "Base de données ultra-rapide spécialisée dans l'analyse de grandes quantités de données",
      SaaS: "Software as a Service — l'application est hébergée en ligne, accessible depuis n'importe quel navigateur, sans installation",
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
    },
  },
  // — Archivés —
  {
    id: "nft-marketplace",
    title: "Vault Protocol",
    tagline: "Marketplace NFT on-chain avec royalties programmables",
    description:
      "Protocol ERC-2981 pour royalties automatiques + interface de création et échange. Déployé sur Base mainnet, 200+ collections créées.",
    tags: ["Solidity", "Next.js", "Wagmi", "Base", "Web3"],
    year: 2024,
    featured: false,
    status: "archived",
    problem:
      "Les créateurs qui vendent leurs œuvres numériques (NFTs) ne reçoivent pas de commission sur les reventes — une fois vendu, c'est terminé. Vault Protocol automatise ces royalties directement dans le contrat.",
    metrics: [
      "200+ collections créées en 3 mois",
      "Royalties versées automatiquement à chaque revente",
      "Frais de transaction 10x moins chers que sur Ethereum mainnet",
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
    techTooltips: {
      Solidity: "Le langage pour écrire des contrats intelligents sur la blockchain — du code qui s'exécute automatiquement sans intermédiaire",
      "Next.js": "Framework React pour créer des sites web performants avec chargement ultra-rapide",
      Wagmi: "Bibliothèque qui connecte une application web à un wallet crypto (MetaMask, Coinbase Wallet...)",
      Base: "Blockchain créée par Coinbase — même sécurité qu'Ethereum mais 10x moins chère à utiliser",
      Web3: "La nouvelle génération d'applications internet où les utilisateurs contrôlent leurs propres données et actifs",
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
    },
  },
  {
    id: "dao-tooling",
    title: "Quorum",
    tagline: "Tooling de gouvernance pour DAOs",
    description:
      "Interface de vote on-chain avec délégation, snapshots off-chain et exécution de proposals via Gnosis Safe. Utilisé par 3 DAOs actives.",
    tags: ["Solidity", "React", "The Graph", "DAO", "Web3"],
    year: 2023,
    featured: false,
    status: "archived",
    problem:
      "Les organisations décentralisées (DAOs) ont du mal à faire voter leurs membres — interfaces complexes, frais de transaction élevés, manque de transparence sur les résultats. Quorum rend la gouvernance accessible.",
    metrics: [
      "3 DAOs actives avec 1 200+ membres au total",
      "Taux de participation aux votes x2.4 vs outils existants",
      "Exécution automatique des décisions via Gnosis Safe",
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
    techTooltips: {
      Solidity: "Le langage pour écrire des contrats intelligents sur la blockchain — du code qui s'exécute automatiquement sans intermédiaire",
      React: "Bibliothèque JavaScript pour créer des interfaces utilisateur réactives et dynamiques",
      "The Graph": "Service qui indexe les données blockchain pour les rendre consultables instantanément — comme Google pour la blockchain",
      DAO: "Organisation Autonome Décentralisée — une organisation dont les règles sont écrites dans du code et dont les décisions sont prises par vote collectif",
      Web3: "La nouvelle génération d'applications internet où les utilisateurs contrôlent leurs propres données et actifs",
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
    },
  },
];

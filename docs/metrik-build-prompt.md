# Metrik — Build Prompt

> Utilise ce prompt dans une nouvelle session Claude Code pour construire le repo GitHub de Metrik.
> L'objectif : un codebase réaliste, propre, avec de vrais commits — pas un template vide.

---

## Contexte du projet

**Metrik** est une alternative privacy-first à Mixpanel/Google Analytics.
- Pas de cookies tiers
- Conformité RGPD native — zéro bannière de consentement
- Données hébergées en Europe
- Stack serverless, ultra-rapide

**Positionnement** : outil SaaS B2B ciblant les équipes produit qui veulent tracker leurs users sans les espionner.

---

## Prompt à utiliser

```
Build a realistic GitHub repository for "Metrik" — a privacy-first product analytics SaaS (Mixpanel alternative, GDPR-compliant, no cookies).

## Stack
- Next.js 14 App Router
- TypeScript (strict)
- Tailwind CSS
- ClickHouse (via @clickhouse/client) for event storage
- Vercel Edge Functions for event ingestion
- Prisma + PostgreSQL for user/project management
- NextAuth.js for authentication

## What to build

### 1. Project structure
```
metrik/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Overview dashboard
│   │   │   ├── events/page.tsx        # Event explorer
│   │   │   └── funnels/page.tsx       # Funnel analysis
│   │   └── api/
│   │       ├── track/route.ts         # Edge function — event ingestion
│   │       ├── events/route.ts        # Query events from ClickHouse
│   │       └── auth/[...nextauth]/route.ts
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── EventsTable.tsx
│   │   │   ├── FunnelChart.tsx
│   │   │   └── RetentionGrid.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Chart.tsx
│   └── lib/
│       ├── clickhouse.ts              # ClickHouse client + query helpers
│       ├── fingerprint.ts            # Cookieless visitor identification
│       └── analytics.ts              # Event type definitions
├── prisma/
│   └── schema.prisma
└── README.md
```

### 2. Core files to implement with real logic

**`src/app/api/track/route.ts`** — Edge function
- Accept POST with `{ event, projectId, properties }`
- Generate cookieless visitorId via hash of (IP + User-Agent + date)
- Insert into ClickHouse `events` table
- Return 200 with no body (pixel-style)
- Handle CORS for cross-origin tracking

**`src/lib/fingerprint.ts`**
- `hashVisitor(ip: string, userAgent: string): Promise<string>`
- Use Web Crypto API (SHA-256)
- Salt with date (daily rotation for privacy)

**`src/lib/clickhouse.ts`**
- ClickHouse client setup
- `insertEvent(event: AnalyticsEvent): Promise<void>`
- `queryEvents(projectId: string, from: Date, to: Date): Promise<AnalyticsEvent[]>`
- `queryFunnel(projectId: string, steps: string[]): Promise<FunnelStep[]>`
- `queryRetention(projectId: string): Promise<RetentionData[]>`

**`src/app/(dashboard)/page.tsx`**
- Real dashboard UI with:
  - Unique visitors (last 30d)
  - Top pages
  - Events over time (simple line chart with Recharts)
  - Recent events table

**`prisma/schema.prisma`**
- User model
- Project model (name, publicKey for tracking, ownerId)
- Relation User → Projects

### 3. README.md
Write a real README with:
- What Metrik is (1 paragraph)
- Why privacy-first (GDPR angle)
- Tech stack table
- Getting started (env vars, DB setup, run locally)
- How tracking works (cookieless fingerprinting explained simply)
- Self-hosting section (Vercel + ClickHouse Cloud)

### 4. Commit style
Make logical commits as if this were a real project:
- `init: Next.js 14 + TypeScript + Tailwind`
- `feat: ClickHouse client and event schema`
- `feat: cookieless fingerprinting via SHA-256`
- `feat: /api/track edge function with CORS`
- `feat: dashboard overview page`
- `feat: funnel analysis query + UI`
- `docs: README with self-hosting guide`

## Constraints
- TypeScript strict — no `any`
- All comments in English
- Real implementation, not mocks — the ClickHouse queries should actually work
- The fingerprinting must be genuinely GDPR-compliant (no PII stored)
- UI should look like a real SaaS dashboard — dark sidebar, metric cards, clean tables

## Output
A complete, pushable GitHub repository. Every file should look like it was written by a developer who actually built and shipped this product.
```

---

## Notes pour la session

- Une fois le repo généré, initialise git et pousse sur GitHub
- Le lien GitHub sera ajouté dans `src/lib/data/projects.ts` → champ `github` du projet `saas-analytics`
- Pas besoin de déploiement live — GitHub suffit pour montrer le code
- Le projet reste en statut `prototype` dans le portfolio

---

## Champ à mettre à jour après la session

```ts
// src/lib/data/projects.ts — projet "saas-analytics"
github: "https://github.com/Teino-92/metrik", // à adapter selon ton username GitHub
```

# CLAUDE.md — Portfolio Web3 Personnel

> Ce fichier est le contrat de développement de ce projet.
> Claude doit le lire **en intégralité** avant toute action.

---

## 🎯 Vision du projet

Portfolio web personnel à destination d'investisseurs, partenaires techniques et recruteurs dans l'écosystème Web3 / SaaS. Le site doit communiquer à la fois une maîtrise technique sérieuse et une sensibilité produit/design distincte.

**Ton visuel** : Warm Brutalist — béton doux, typographie musclée, accents vifs. Pas de dark mode crypto générique. Pas de gradients violets. Ce portfolio doit ressembler à du travail humain, pas à un template IA.

---

## 🎨 Design System

### Palette de couleurs

```css
:root {
  /* Backgrounds */
  --color-bg-primary:   #F5F0E8;   /* Beige sable — fond principal */
  --color-bg-secondary: #EDE8DE;   /* Beige foncé — cards, sections */
  --color-bg-accent:    #1A1A18;   /* Presque noir — contraste fort */

  /* Accents principaux */
  --color-red:          #D63C2A;   /* Rouge tomate vif */
  --color-red-dark:     #A82D1E;   /* Rouge foncé — hover */
  --color-yellow:       #F2A622;   /* Jaune safran */
  --color-yellow-light: #FCD36A;   /* Jaune clair — highlights */

  /* Neutres */
  --color-black:        #1A1A18;
  --color-gray-dark:    #3D3C38;
  --color-gray-mid:     #7A7870;
  --color-gray-light:   #C8C4BA;
  --color-white:        #FDFAF4;

  /* Sémantiques */
  --color-text-primary:   var(--color-black);
  --color-text-secondary: var(--color-gray-dark);
  --color-text-muted:     var(--color-gray-mid);
  --color-border:         rgba(26, 26, 24, 0.12);
  --color-border-strong:  rgba(26, 26, 24, 0.25);
}
```

### Règles d'usage couleur

- **Fond principal** → `--color-bg-primary` (jamais blanc pur)
- **Cards et surfaces** → `--color-bg-secondary`
- **CTA principaux** → `--color-red` avec hover `--color-red-dark`
- **Highlights & tags** → `--color-yellow` sur fond sombre OU `--color-yellow-light`
- **Texte sur fond clair** → `--color-black` ou `--color-gray-dark`
- **Jamais** de purple, bleu cyan ou gradient arc-en-ciel

### Typographie

```css
/* Import dans layout.tsx ou globals.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;       /* Titres hero — 700/800, caractère fort */
  --font-serif:   'DM Serif Display', serif; /* Titres secondaires — élégance légère */
  --font-mono:    'IBM Plex Mono', monospace;/* Code, labels techniques, tags */
  --font-body:    system-ui, sans-serif;     /* Corps de texte */
}
```

**Règles typographiques :**
- Hero H1 → `Syne 800`, min 72px, lettre-espacement `-0.03em`
- Section H2 → `DM Serif Display`, 48px, italic possible
- Labels / tags → `IBM Plex Mono 500`, uppercase, 11–13px
- Body → system-ui 16–18px, line-height 1.65
- **Jamais Inter, Roboto, ou Arial**

---

## ⚙️ Stack Technique

### Core

| Techno | Version | Rôle |
|--------|---------|------|
| **Next.js** | 14 (App Router) | Framework principal |
| **TypeScript** | 5.x | Typage strict — toujours |
| **Tailwind CSS** | 3.x | Styling utilitaire |

### Animations & Interactions

| Techno | Usage | Exemple concret |
|--------|-------|-----------------|
| **Framer Motion** | Animations React, transitions pages | Cards de projets qui s'ouvrent avec `layoutId`, sections qui révèlent au scroll via `useInView` |
| **GSAP + ScrollTrigger** | Effets de scroll avancés, parallax | Texte Hero qui se "scrub" en entrant dans le viewport, sections pinned |
| **Lenis** | Smooth scroll | Donne le feeling fluide d'un site d'agence premium |
| **React Three Fiber (R3F)** | Élément 3D ambient | Globe particules ou champ de points bruité en arrière-plan du Hero |
| **drei** | Helpers R3F | `OrbitControls`, `Points`, `Sparkles` |

### Setup

```bash
npm install framer-motion gsap @studio-freight/lenis @react-three/fiber @react-three/drei three
npm install -D @types/three
```

### Priorité d'usage

```
Transitions de page / layout  → Framer Motion
Scroll cinématique             → GSAP ScrollTrigger
Smooth scroll global           → Lenis
Élément 3D (Hero uniquement)   → R3F + drei
Micro-interactions             → Framer Motion variants
```

---

## 🏗️ Architecture du projet

```
src/
├── app/
│   ├── layout.tsx          # Providers : Lenis, ThemeProvider
│   ├── page.tsx            # Page principale (toutes les sections)
│   └── globals.css         # Variables CSS, reset, fonts
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Nav sticky avec scroll indicator
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx        # Intro animée + canvas 3D
│   │   ├── Projects.tsx    # Grille de cards
│   │   ├── Stack.tsx       # Skills / technologies
│   │   ├── About.tsx       # Bio
│   │   └── Contact.tsx     # Formulaire ou liens directs
│   ├── ui/
│   │   ├── ProjectCard.tsx # Card individuelle avec animation
│   │   ├── Tag.tsx         # Label techno (IBM Plex Mono)
│   │   ├── Button.tsx      # CTA rouge
│   │   └── AnimatedText.tsx# Reveal de texte lettre par lettre
│   └── three/
│       └── ParticleGlobe.tsx # Canvas R3F isolé
├── lib/
│   ├── animations.ts       # Variants Framer Motion réutilisables
│   └── data/
│       └── projects.ts     # Contenu des projets (typed)
└── types/
    └── index.ts
```

---

## 📐 Sections — Spécifications

### 1. Hero

**Objectif** : Première impression mémorable en < 3 secondes.

- Fond : `--color-bg-primary` (beige)
- Canvas R3F en position `absolute`, derrière le contenu
  - Option A : globe de particules lent, rotation douce
  - Option B : champ de points 3D qui réagit à la position du curseur (via `useFrame` + `raycaster`)
- Texte : `Syne 800` très grand, reveal staggeré avec Framer Motion
- Sous-titre : `IBM Plex Mono`, 1–2 lignes, couleur `--color-gray-mid`
- CTA : bouton rouge plein + lien "voir les projets" en outline
- Scroll indicator animé (flèche ou barre qui pulse)

```tsx
// Exemple : variants stagger pour le Hero
export const heroVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}
```

### 2. Projets (Cards)

**Objectif** : Présenter 3–6 projets avec context rapide et accès au détail.

- Layout : grille asymétrique (1 grande card + 2 petites, ou masonry)
- Chaque card :
  - Image/screenshot ou visuel abstrait généré
  - Titre `DM Serif Display`
  - Tags technologies → `IBM Plex Mono` uppercase, fond `--color-yellow` ou `--color-bg-accent`
  - Description courte
  - Lien → hover avec underline animé rouge
- Animation :
  - Framer Motion `layoutId` pour expansion de card
  - `useInView` pour reveal au scroll avec stagger
  - Hover : légère élévation + shift de couleur sur le bord gauche (border-left red)

### 3. Stack / Skills

**Objectif** : Montrer la maîtrise technique sans être un listing.

- Format : grille de logos + labels, ou sections par domaine (Frontend, Backend, Web3, AI)
- Indicateurs visuels : barres animées, ou tags groupés par catégorie
- Animation GSAP : reveal horizontal au scroll (chaque item slide depuis la gauche avec `from { x: -40, opacity: 0 }`)
- Couleur d'accent : point rouge `●` devant les technos "core"

### 4. À propos / Bio

**Objectif** : Contexte humain, pas un CV.

- Layout : colonne large texte + photo ou visuel gauche
- Typographie mixte : `DM Serif Display` pour les phrases clés, body pour le reste
- 1–2 stats clés mises en avant (`Syne 800` très grand, ex : "3 SaaS built", "5 yrs")
- Fond alterné : `--color-bg-accent` (noir) avec texte blanc → rupture visuelle forte

### 5. Contact

**Objectif** : Conversion simple, pas de formulaire complexe.

- Email + liens sociaux (GitHub, LinkedIn, Farcaster/ENS si pertinent)
- Optionnel : formulaire minimaliste (name, email, message)
- CTA principal : bouton rouge `"Démarrer une conversation"`
- Fond : `--color-red` comme couleur de section → seule section en couleur vive pleine largeur

---

## 🎬 Conventions d'animation

### Règles globales

1. **Performance first** : uniquement `transform` et `opacity` — jamais animer `width`, `height`, ou `margin`
2. **Durées** : 0.4–0.8s pour les reveals, 0.15–0.25s pour les micro-interactions hover
3. **Easing par défaut** : `[0.25, 0.46, 0.45, 0.94]` (ease-out custom, pas de `linear`)
4. **Reduced motion** : toujours envelopper dans `useReducedMotion()` de Framer Motion
5. **GSAP ScrollTrigger** : `scrub: 1` pour les effets parallax, `start: "top 80%"` pour les reveals

### Variants réutilisables

```ts
// lib/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

export const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
```

### Lenis — Setup global

```tsx
// app/layout.tsx
"use client"
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

---

## 🌐 Élément 3D — Globe de particules

```tsx
// components/three/ParticleGlobe.tsx
"use client"
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Globe() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pts = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pts[i * 3]     = Math.sin(phi) * Math.cos(theta) * 2.2
      pts[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 2.2
      pts[i * 3 + 2] = Math.cos(phi) * 2.2
    }
    return pts
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        color="#D63C2A"    /* --color-red */
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </Points>
  )
}

export default function ParticleGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <Globe />
    </Canvas>
  )
}
```

**Intégration dans Hero.tsx :**
```tsx
import dynamic from 'next/dynamic'
const ParticleGlobe = dynamic(() => import('@/components/three/ParticleGlobe'), { ssr: false })

// Dans le JSX :
<section className="relative h-screen overflow-hidden bg-[var(--color-bg-primary)]">
  <ParticleGlobe />
  <div className="relative z-10 ...">
    {/* Contenu texte */}
  </div>
</section>
```

> **Important** : Toujours `dynamic` avec `ssr: false` pour les composants Three.js.

---

## 📦 Données — Structure des projets

```ts
// lib/data/projects.ts
export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  tags: string[]
  year: number
  url?: string
  github?: string
  image?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'izi-rh',
    title: 'Izi-RH',
    tagline: 'SIRH SaaS pour PME françaises',
    description: 'Plateforme HRIS manager-centric intégrant les logiciels de paie existants. Cible 30–300 collaborateurs.',
    tags: ['Rails 7', 'Hotwire', 'Tailwind', 'SaaS', 'B2B'],
    year: 2024,
    featured: true,
  },
  // ... autres projets
]
```

---

## ✅ Checklist avant chaque composant

- [ ] Les couleurs viennent des variables CSS — pas de valeurs hardcodées
- [ ] Les fonts correspondent aux règles typographiques
- [ ] Les animations utilisent uniquement `transform` et `opacity`
- [ ] `useReducedMotion()` est pris en compte
- [ ] Les imports Three.js/R3F sont en `dynamic` avec `ssr: false`
- [ ] TypeScript strict — pas de `any`
- [ ] Les textes sont en français sauf les labels techniques

---

## 🚫 Interdits

- Gradients violets ou blue-cyan "crypto générique"
- Fond noir total sur toute la page (autorisé uniquement pour une section)
- Police Inter, Roboto, ou Arial
- Animations sur `width`, `height`, `top`, `left`, `margin`
- Composants Three.js rendus en SSR
- Texte blanc sur fond beige (contraste insuffisant)
- Cards sans état hover défini

---

*Document vivant — mettre à jour si la stack ou la direction visuelle évolue.*

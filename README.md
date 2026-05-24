<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />

<br /><br />

# 🎓 CollegeCompass

### India's most intelligent college discovery and decision platform.

**Search · Compare · Discover · Decide — smarter.**

[🌐 Live Demo](https://college-compass-sampratigaurav.vercel.app) · [🐛 Report Bug](https://github.com/sampratigaurav/CollegeCompass/issues) · [✨ Request Feature](https://github.com/sampratigaurav/CollegeCompass/issues)

</div>

---

## ✨ What is CollegeCompass?

CollegeCompass is a **production-grade, full-stack college intelligence platform** built for Indian students navigating one of the most high-stakes decisions of their lives — choosing the right college.

It replaces static brochure websites with a **live, data-driven, personalized experience** — giving every student a platform that adapts to their preferences, explains its reasoning, and makes the financial and academic trade-offs crystal clear.

> Built with real NIRF rankings, actual placement data, AI-powered insights, and a behavioral memory system that learns from every interaction.

---

## 🗺️ Feature Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CollegeCompass                               │
├──────────────────┬──────────────────┬──────────────────────────────┤
│   DISCOVERY      │   INTELLIGENCE   │        PERSONALIZATION       │
│                  │                  │                              │
│  • College List  │  • Discover      │  • Adaptive Homepage         │
│  • Smart Search  │    Engine        │  • Recent History            │
│  • Stream Filter │  • Compare       │  • Saved Colleges            │
│  • Detail Pages  │    Insights      │  • Saved Comparisons         │
│                  │  • Fit Analysis  │  • Inferred Preferences      │
│                  │  • Rank          │  • Stream Memory             │
│                  │    Predictor     │                              │
├──────────────────┴──────────────────┴──────────────────────────────┤
│                  FINANCIAL INTELLIGENCE                             │
│          Investment Outlook · Scenario Analysis · ROI Scoring      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Features

### 🔍 Smart Discovery & Search
- **Global Tokenized Search** — Acronym-aware autocomplete (`IIT → Indian Institute of Technology`) with instant suggestions mapped to names, locations, and slugs.
- **Advanced College Explorer** — Filterable by state, city, type (Public/Private), fees, NIRF rank, placements, and **Academic Stream**.
- **Stream Filter System** — Pill-selector for Engineering, Medical, Management, Law, Science, and Arts — applied platform-wide across Search, Explore, and Discover.

### 🧭 Discover Engine
The most powerful feature. Instead of a generic search, the Discover Engine is a **real-time, preference-weighted scoring system**.

```
User selects:
  Stream → Engineering
  Budget → ₹2L/yr max
  Priority → Placements (High), Startup Culture (Medium)

Engine computes:
  IIT Bombay     ████████████████░░  Match Score: 94
  BITS Pilani    ████████████████░░  Match Score: 91
  NIT Surathkal  ████████████░░░░░░  Match Score: 78
  ...
```

- Additive scoring with priority weights
- Hard budget/stream constraint penalties
- Live narrative explanations per match
- Popular path presets (e.g., "High ROI Public Institutions")

### 🆚 Intelligent Compare
Side-by-side comparison of 2–3 colleges with a **dual-layer intelligence system**:

**Layer 1 — Instant Deterministic Chips:**
```
 Placements | IIT Bombay · 92% placed
 Avg Salary | IIT Bombay · ₹28.5 LPA
 Affordability | IIT Delhi · from ₹0.8L/yr
 NIRF Rank | IIT Madras · #1
```

**Layer 2 — Narrative Analysis (auto-fetched):**
> *"IIT Bombay offers stronger placement outcomes and higher average salaries relative to its peers. IIT Delhi, while slightly lower on placement percentages, provides a more accessible fee structure..."*

- Winner-highlighted comparison matrix (NIRF, Rating, Fees, Salary, Placement)
- Shareable comparison URLs
- Save/bookmark comparison sessions via localStorage

### 📊 Investment Outlook (Cost vs Outcome)
A contextual financial analysis module embedded directly into every College Detail page.

```
Investment Outlook                           [ Accessible ✓ ]
────────────────────────────────────────────────────────────
0y ──────────────────── ~2.3y ─────────────────────── 10y+
                            ▲ Estimated Payback

☐ Include Education Loan

Payback Scenarios:
  Conservative   ₹12.0L     ~4.2y
  Average        ₹18.5L   ● ~2.3y
  Optimistic     ₹25.0L     ~1.7y

Analysis: Strong outlook due to high placement averages
relative to moderate tuition costs.
────────────────────────────────────────────────────────────
⚠ Estimates are heuristic. Career outcomes vary.
```

### 🤖 Contextual Insights Engine
Not a chatbot. A **silent analytical layer** that surfaces intelligence at exactly the right moments.

| Surface | Trigger | Output |
|---------|---------|--------|
| Discover card | Click "Fit Analysis" | 2-sentence personalized match explanation |
| Compare page | Auto on load | Comparative narrative + dimension chips |

Powered by `Gemini 2.5 Flash` with:
- Strictly typed action-based prompts (no open chat)
- Server-side in-memory caching
- Deterministic fallbacks (zero failed states)
- Analytically toned, 2–3 sentence outputs

### 🎯 Rank Predictor
Students input their JEE / NEET rank and get a list of colleges they are likely to qualify for, based on historical cutoff data stored per college.

### 🧠 Personalized Dashboard
The homepage adapts to every user based on their behavior — all stored in `localStorage`, no auth required.

```
Welcome back 👋
─────────────────────────────────────────
Recently Viewed:  IIT Bombay  BITS Pilani
Saved Colleges:   IIT Delhi

Based on your searches → Engineering · Placements
Suggested:  NIT Surathkal  IIIT Hyderabad  DTU

Upcoming Deadlines for JEE:
  ⏰ JEE Advanced registration closes in 4 days
─────────────────────────────────────────
```

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx                  # Adaptive Homepage
│   ├── colleges/
│   │   ├── page.tsx              # College Explorer (SSG)
│   │   └── [id]/page.tsx         # College Detail (SSR)
│   ├── compare/page.tsx          # Intelligent Compare (SSG)
│   ├── discover/page.tsx         # Discover Engine (SSG)
│   ├── predictor/page.tsx        # Rank Predictor (SSG)
│   └── api/
│       ├── colleges/             # List + Detail endpoints
│       ├── compare/              # Compare data fetcher
│       ├── discover/             # Live scoring engine
│       ├── insights/             # Contextual AI actions
│       ├── predict/              # Rank prediction logic
│       ├── search/               # Autocomplete suggestions
│       └── cron/sync-exams/      # Automated exam date sync
│
├── components/
│   ├── college/                  # InvestmentOutlook
│   ├── colleges/                 # Cards, Detail, Skeleton
│   ├── compare/                  # CompareClient
│   ├── discover/                 # DiscoverClient
│   ├── home/                     # HomePageClientView
│   ├── predictor/                # PredictorClient
│   └── shared/                   # FallbackImage, EmptyState
│
├── hooks/
│   └── useUserMemory.ts          # localStorage behavioral memory
│
└── lib/
    ├── taxonomy.ts               # Stream definitions + icons
    ├── validations.ts            # Zod schemas
    └── prisma.ts                 # DB client
```

---

## 🗄️ Database Schema

```
College ──< Course   (1 college → many courses)
College ──< Review   (1 college → many synthetic reviews)
Exam               (independent — synced by cron)
```

**College model key fields:**

| Field | Type | Purpose |
|-------|------|---------|
| `slug` | `String @unique` | URL-safe identifier |
| `streams` | `String[]` | Multi-stream classification |
| `tags` | `String[]` | Searchable keyword tags |
| `best_for` | `String[]` | Strength descriptors |
| `ai_summary` | `Text` | Gemini-generated summary |
| `exam` | `String[]` | Accepted entrance exams |
| `nirf_rank` | `Int?` | Official NIRF ranking |
| `avg_salary` | `Int?` | Average placement salary |

**Indexes:** `state`, `city`, `nirf_rank`, `rating`, `fees_min`, `placement_percentage`, `slug`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2 (App Router + Turbopack) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **ORM** | Prisma 7.x |
| **Database** | PostgreSQL via Neon Serverless |
| **AI** | Google Gemini 2.5 Flash (`@google/genai`) |
| **Deployment** | Vercel (Edge-ready) |
| **Auth/State** | None — localStorage-first personalization |
| **Validation** | Zod |
| **Icons** | Lucide React |

---

## ⚙️ Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/sampratigaurav/CollegeCompass.git
cd CollegeCompass
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
```

```env
# Required
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
GEMINI_API_KEY="your-gemini-api-key"

# Optional (for data enrichment pipeline)
PEXELS_API_KEY="your-pexels-key"
GOOGLE_SEARCH_API_KEY="your-google-key"
GOOGLE_SEARCH_CX="your-search-cx"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# Push schema to Neon PostgreSQL
npm run db:push

# Seed with 100+ enriched college records
npm run db:seed
```

### 4. Run Dev Server
```bash
npm run dev
# → http://localhost:3000
```

---

## 🚢 Deployment (Vercel + Neon)

```bash
# 1. Push to GitHub
git push origin main

# 2. Import project on Vercel
# 3. Add environment variables in Vercel dashboard
# 4. Deploy — Vercel auto-runs: npx prisma generate && next build
```

**Required Vercel Environment Variables:**
```
DATABASE_URL
GEMINI_API_KEY
NEXT_PUBLIC_APP_URL
```

---

## 📜 NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server |
| `build` | `next build` | Production build |
| `db:push` | `prisma db push` | Sync schema to DB |
| `db:seed` | `ts-node prisma/seed.ts` | Seed database |
| `db:studio` | `prisma studio` | Open Prisma Studio |
| `db:generate` | `prisma generate` | Regenerate Prisma client |

---

## 🧠 Personalization Architecture

CollegeCompass uses a **100% client-side, localStorage-first memory system** — no accounts, no auth, no cloud sync required.

```
useUserMemory() hook tracks:
  ├── recentColleges[]       → Recently viewed
  ├── savedColleges[]        → User shortlist
  ├── savedComparisons[]     → Saved compare sessions
  ├── recentSearches[]       → Search history
  ├── preferredExams[]       → Inferred from activity
  ├── inferredStream         → Inferred from viewed colleges
  └── activityLog[]          → Full interaction timeline
```

This powers the adaptive homepage, personalized suggestions, and user-contextualized AI insights — all with zero backend infrastructure.

---

## 🤖 Insights API

`POST /api/insights`

```typescript
// Explain why a specific college matches user preferences
{
  action: "EXPLAIN_FIT",
  payload: { college: CollegeMatch },
  userContext: { priorities: string[], stream: string }
}

// Generate comparative trade-off narrative
{
  action: "COMPARE_TRADEOFFS",
  payload: { colleges: CollegeDetail[] }
}
```

**Design Principles:**
- ✅ Strictly typed actions — no open prompt injection
- ✅ Server-side response caching (in-memory Map)
- ✅ Analytical tone enforced via prompt engineering
- ✅ Deterministic fallbacks — zero empty/error states
- ✅ Temperature: `0.2` — keeps outputs consistent

---

## 🗂️ Academic Streams

| Stream | Icon | Colleges |
|--------|------|---------|
| Engineering | ⚙️ | IITs, NITs, IIITs, BITS |
| Medical | 🏥 | AIIMS, MAMC |
| Management | 💼 | IIMs |
| Law | ⚖️ | NLUs |
| Science | 🔬 | IISc, TIFR |
| Arts | 🎨 | JNU, DU |

---

## 📄 License

MIT License — open for personal and educational use.

---

<div align="center">

Built with ❤️ for Indian students navigating one of the most important decisions of their lives.

**[⭐ Star this repo](https://github.com/sampratigaurav/CollegeCompass)** if it helped you!

</div>

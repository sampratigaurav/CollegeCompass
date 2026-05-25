<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/NextAuth.js-Security-blueviolet?style=for-the-badge&logo=nextauth&logoColor=white" />
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

> Built with real NIRF rankings, actual placement data, AI-powered insights, a robust authentication system, and a deeply personalized workspace.

---

## 🗺️ Feature Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CollegeCompass                               │
├──────────────────┬──────────────────┬──────────────────────────────┤
│   DISCOVERY      │   INTELLIGENCE   │        WORKSPACE (Auth)      │
│                  │                  │                              │
│  • College List  │  • Discover      │  • Authenticated Users       │
│  • Smart Search  │    Engine        │  • Cloud-synced Shortlists   │
│  • Stream Filter │  • Compare       │  • Saved Comparisons         │
│  • Detail Pages  │    Insights      │  • Tracked Exam Deadlines    │
│  • Course Cutoffs│  • Rank          │  • Verified Student Reviews  │
│                  │    Predictor     │                              │
├──────────────────┴──────────────────┴──────────────────────────────┤
│                  FINANCIAL INTELLIGENCE                             │
│          Investment Outlook · Scenario Analysis · ROI Scoring      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Features

### 🔐 Authenticated Workspace
A fully secure, database-backed user environment powered by **NextAuth.js**.
- **Cloud Shortlists**: Save colleges and access them from any device.
- **Exam Tracking**: Monitor personalized entrance exam schedules.
- **Active Comparisons**: Save and resume deep-dive comparison sessions.
- **Verified Reviews**: Post and manage reviews tied directly to your profile.

### 🔍 Smart Discovery & Search
- **Global Tokenized Search** — Acronym-aware autocomplete (`IIT → Indian Institute of Technology`) with instant suggestions.
- **Advanced College Explorer** — Filterable by state, city, type (Public/Private), fees, NIRF rank, placements, and **Academic Stream**.
- **Stream Filter System** — Pill-selector for Engineering, Medical, Management, Law, Science, and Arts.

### 🧭 AI Discover Engine
The most powerful feature. Instead of a generic search, the Discover Engine is a **real-time, preference-weighted scoring system**.

```
User selects:
  Stream → Engineering
  Budget → ₹2L/yr max
  Priority → Placements (High), Startup Culture (Medium)

Engine computes:
  IIT Bombay     ████████████████░░  Match Score: 94
  BITS Pilani    ████████████████░░  Match Score: 91
```
- Additive scoring with priority weights
- Hard budget/stream constraint penalties
- Live narrative explanations per match

### 🆚 Intelligent Compare
Side-by-side comparison of 2–3 colleges with a **dual-layer intelligence system**:
- **Layer 1:** Instant deterministic chips comparing Placements, Salaries, and Affordability.
- **Layer 2:** Narrative Analysis powered by AI. (*"IIT Bombay offers stronger placement outcomes, while IIT Delhi provides a more accessible fee structure..."*)

### 🎯 Data-Driven Rank Predictor & Cutoffs
Students input their JEE / NEET rank, category, and state quota to get a list of colleges they are likely to qualify for, based on **historical cutoff data** stored per college and course.

### 📅 Live Exam Deadline Tracking
An integrated tracking system for entrance exams (JEE Main, NEET, BITSAT, etc.) with real-time event updates, countdowns to deadlines, and automated syncing.

### 📊 Investment Outlook (Cost vs Outcome)
A contextual financial analysis module embedded directly into every College Detail page providing estimated payback scenarios based on tuition costs vs. average placements.

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx                  # Adaptive Homepage
│   ├── colleges/                 # College Explorer & Detail Pages
│   ├── compare/                  # Intelligent Compare Engine
│   ├── discover/                 # AI-Powered Matchmaking
│   ├── predictor/                # Rank Predictor
│   ├── workspace/                # Authenticated User Dashboard
│   └── api/
│       ├── auth/                 # NextAuth integrations
│       ├── shortlist/            # DB-backed shortlisting
│       ├── reviews/              # Verified reviews API
│       ├── insights/             # Contextual AI actions
│       └── predict/              # Rank prediction logic
│
├── components/
│   ├── auth/                     # Auth Modals & Buttons
│   ├── college/                  # InvestmentOutlook, Charts
│   ├── workspace/                # Dashboard Components
│   └── shared/                   # UI primitives
│
├── hooks/                        # Custom React hooks (Zustand, SWR)
└── lib/                          # Utils, Zod schemas, Prisma client
```

---

## 🗄️ Database Schema

Powered by **Prisma ORM** on a **Neon Serverless PostgreSQL** database.

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ Shortlist : manages
    User ||--o{ TrackedExam : follows
    User ||--o{ Review : writes

    College ||--o{ Course : offers
    College ||--o{ Review : receives
    Course ||--o{ Cutoff : has

    Exam ||--o{ ExamEvent : contains
    Exam ||--o{ TrackedExam : tracked_by
```

**Key Models:**
- `User`, `Account`, `Session`: NextAuth security models.
- `College`, `Course`, `Cutoff`: Core academic and institutional data.
- `Review`: Student feedback tied to `User` and `College`.
- `Exam`, `ExamEvent`: Schedules, registrations, and application deadlines.
- `Shortlist`, `TrackedExam`: User-specific workspace relations.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2 (App Router + Turbopack) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **ORM** | Prisma 7.x |
| **Database** | PostgreSQL via Neon Serverless |
| **Authentication**| NextAuth.js (v4) + Prisma Adapter |
| **AI Insights** | Google Gemini 2.5 Flash (`@google/genai`) |
| **State Mgmt** | Zustand (Global Modals) |
| **Validation** | Zod |

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
# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-strong-secret-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# External Integrations
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Database Setup & Seeding
```bash
# Push schema to PostgreSQL
npm run db:push

# Run the lightning-fast seed script to populate Colleges, Courses, Reviews & Exams
npx tsx scripts/fast-seed.ts
npx tsx scripts/seed-exams.ts
```

### 4. Run Dev Server
```bash
npm run dev
# → http://localhost:3000
```

---

## 🤖 Insights API

Powered by **Gemini 2.5 Flash** with strictly typed actions, server-side caching, and deterministic fallbacks.

```typescript
// Explain why a specific college matches user preferences
POST /api/insights
{
  "action": "EXPLAIN_FIT",
  "payload": { "college": CollegeMatch },
  "userContext": { "priorities": ["Placements"], "stream": "Engineering" }
}
```

---

## 📄 License

MIT License — open for personal and educational use.

---

<div align="center">

Built with ❤️ for Indian students navigating one of the most important decisions of their lives.

**[⭐ Star this repo](https://github.com/sampratigaurav/CollegeCompass)** if it helped you!

</div>

# CollegeCompass 🎓

**India's most developer-friendly college discovery and comparison platform.**

Built as a production-grade MVP using Next.js 16, TypeScript, Prisma, and PostgreSQL. Covers **100+ top Indian colleges** fully enriched with real NIRF rankings, premium imagery, AI-generated summaries, and placement data.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **College Listing** | Searchable, filterable, sortable list of 100+ colleges with pagination. |
| **College Detail** | Full SSR detail page with AI summaries, placement stats, and dynamically loaded premium images. |
| **Compare Colleges** | Side-by-side comparison matrix with winner highlighting and shareable URLs. |
| **Global Smart Search** | Tokenized acronym-friendly autocomplete search dropdown mapping names, locations, and slugs. |
| **Institution Spotlight** | Dynamic homepage showcase of top-ranked colleges featuring high-quality photography and AI intelligence. |
| **Automated Data Pipeline** | Multi-source programmatic enrichment fetching official websites, images, and generating summaries via Gemini AI, Wikipedia, Pexels, and Google Custom Search. |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion
- **ORM**: Prisma v7
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel + Neon PostgreSQL
- **Data Pipeline**: Gemini 1.5 Pro, Pexels API, Google Custom Search API, Wikipedia API

---

## 📁 Architecture & Pipelines

### Data Enrichment Pipeline
The data architecture has been upgraded from hardcoded files to a fully automated pipeline:
1. `data/colleges.raw.json`: Base 100+ college records.
2. **Enrichment Script (`scripts/enrich-colleges.ts`)**: Iterates through raw data, safely fetches from multiple fallback sources with concurrency limits and retries, generates AI summaries, and scores image quality.
3. `data/colleges.enriched.json`: The final production-ready JSON seeded directly into PostgreSQL.
4. **Resilience**: Features automatic fallbacks (e.g., animated gradient UI components `FallbackImage.tsx` if an image is missing) and intelligent domain trust scoring to avoid scraping junk data.

---

## 🗄️ Database Schema

```text
College ──< Course   (one college → many courses)
College ──< Review   (one college → many reviews)
```

**College fields**: id, name, slug, location, state, city, fees_min, fees_max, rating, nirf_rank, placement_percentage, avg_salary, description, image_url, type, exam[], min_rank, max_rank, accreditation, **ai_summary**, **image_source**, **domain_trust**, **image_score**, **verification_priority**, **enriched_at**

**Indexes**: state, city, nirf_rank, rating, fees_min, placement_percentage, slug

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd CollegeCompass
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://user:pass@host/db?uselibpqcompat=true&sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GEMINI_API_KEY="your-key"
PEXELS_API_KEY="your-key"
GOOGLE_SEARCH_API_KEY="your-key"
GOOGLE_SEARCH_CX="your-cx"
```

### 3. Set Up Database
```bash
# Push schema to database
npm run db:push

# Seed with the enriched 100+ college dataset
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
# → http://localhost:3000
```

---

## 🚢 Deployment (Vercel + Neon)

1. Push your code to GitHub.
2. Import the repository on [vercel.com](https://vercel.com).
3. Add environment variables in the Vercel dashboard.
4. Set build command: `npx prisma generate && next build`.
5. Deploy!

> **Note**: A strict type declaration for `probe-image-size` is included to ensure flawless Vercel production builds.

---

## 🌱 Dataset
The dataset now includes **100+ real Indian colleges** spanning IITs, NITs, IIITs, Top Private Engineering Institutes (BITS, VIT, SRM, Manipal), IIMs, Medical Colleges (AIIMS), Law Schools (NLSIU), and more.

All data is deeply enriched with high-resolution photography, accurate median salary brackets, official website URLs, and comprehensive AI-generated summaries capturing the essence of each institution.

---

## 🔒 Security & Optimization
- **Search Robustness**: Advanced tokenized search logic matches complex inputs like "iit madras" directly to canonical slugs (`iit-madras`) and names without strict substring constraints.
- **Resilience**: Animated gradient fallbacks ensure premium UI aesthetics even if third-party image sources fail or return 404s.
- **Database Safety**: Uses `uselibpqcompat=true&sslmode=require` for secure, warning-free connections to Neon Postgres.

---

## 📝 License
MIT — Built as a production-grade full-stack engineering project demonstrating scalable data pipelines and premium UI design.

# CollegeCompass 🎓

**India's most developer-friendly college discovery and comparison platform.**

Built as a production-grade MVP using Next.js 15, TypeScript, Prisma, and PostgreSQL. Covers 25+ top Indian colleges with real NIRF 2023 data.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **College Listing** | Searchable, filterable, sortable list of 25+ colleges with pagination |
| **College Detail** | Full SSR detail page with tabs for Overview, Courses, Placements, Reviews |
| **Compare Colleges** | Side-by-side comparison table with winner highlighting, shareable URLs |
| **Admission Predictor** | Enter exam + rank → get High/Medium/Low admission chance predictions |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **ORM**: Prisma v7
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel + Neon PostgreSQL
- **Validation**: Zod (all API routes)

---

## 📁 Project Structure

```
college-platform/
├── prisma/
│   ├── schema.prisma        # DB schema (College, Course, Review)
│   └── seed.ts              # Seed script with 25+ real Indian colleges
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── colleges/    # GET /api/colleges + GET /api/colleges/:id
│   │   │   ├── compare/     # POST /api/compare
│   │   │   └── predict/     # POST /api/predict
│   │   ├── colleges/        # Listing + [id] detail pages
│   │   ├── compare/         # Compare page
│   │   └── predictor/       # Predictor page
│   ├── components/
│   │   ├── colleges/        # CollegeCard, CollegesClient, Skeleton, etc.
│   │   ├── compare/         # CompareClient (URL-based state)
│   │   ├── predictor/       # PredictorClient
│   │   ├── layout/          # Navbar, Footer
│   │   └── shared/          # EmptyState, ErrorState, Pagination
│   ├── lib/
│   │   ├── db.ts            # Prisma client singleton
│   │   ├── validations.ts   # Zod schemas
│   │   ├── api-response.ts  # Standardized API responses
│   │   └── rate-limit.ts    # IP-based rate limiter
│   ├── hooks/
│   │   └── useDebounce.ts   # Debounce hook for search
│   └── types/index.ts       # Shared TypeScript types
```

---

## 🗄️ Database Schema

```
College ──< Course   (one college → many courses)
College ──< Review   (one college → many reviews)
```

**College fields**: id, name, slug, location, state, city, fees_min, fees_max, rating, nirf_rank, placement_percentage, avg_salary, description, image_url, type, exam[], min_rank, max_rank, accreditation

**Indexes**: state, city, nirf_rank, rating, fees_min, placement_percentage, slug

---

## 📡 API Reference

### `GET /api/colleges`
Returns paginated college list.

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Full-text search (name, city, state, courses) |
| `state` | string | Filter by state |
| `exam` | string | Filter by entrance exam |
| `type` | enum | GOVERNMENT / PRIVATE / DEEMED / AUTONOMOUS |
| `sort` | enum | nirf_rank / rating / fees_min / placement_percentage / name |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 12, max: 50) |

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": { "page": 1, "limit": 12, "total": 25, "totalPages": 3 }
}
```

### `GET /api/colleges/:id`
Returns full college detail with courses and reviews. Accepts either `id` (cuid) or `slug`.

### `POST /api/compare`
```json
// Request
{ "ids": ["iit-bombay", "iit-delhi", "bits-pilani"] }

// Response
{ "success": true, "data": [...] }
```
Rate limited: 30 requests/minute per IP.

### `POST /api/predict`
```json
// Request
{ "exam": "JEE Main", "rank": 5000 }

// Response
{
  "success": true,
  "data": {
    "results": [
      { ...college, "chance": "High" | "Medium" | "Low" }
    ],
    "meta": { "totalMatches": 8, "highChance": 3, "mediumChance": 4, "lowChance": 1 }
  }
}
```
Rate limited: 15 requests/minute per IP.

**Chance calculation:**
- Rank ≤ minRank + 20% of range → **High**
- Rank ≤ minRank + 60% of range → **Medium**
- Rank ≤ maxRank → **Low**

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd college-platform
npm install
```

### 2. Create Neon Database
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 3. Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local and set DATABASE_URL
```

```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set Up Database
```bash
# Push schema to database
npm run db:push

# Seed with 25+ real Indian colleges
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
# → http://localhost:3000
```

---

## 🚢 Deployment (Vercel + Neon)

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` — your Neon connection string
   - `NEXT_PUBLIC_APP_URL` — your Vercel deployment URL
4. Set build command: `npx prisma generate && next build`
5. Deploy!

> **Tip**: Use Neon's "Connection Pooling" URL for the `DATABASE_URL` in production for better serverless performance.

---

## 🌱 Dataset

The seed data includes **25+ real Indian colleges** across:
- **IITs**: Bombay, Delhi, Madras, Kharagpur, Kanpur
- **NITs**: Trichy, Surathkal, Warangal
- **IIITs**: Hyderabad
- **Private (Engineering)**: BITS Pilani/Goa, VIT Vellore, SRM, Manipal, RVCE, PSG, DTU, COEP, Thapar, Jadavpur, Anna University, BMSCE, PES, Amity, Symbiosis
- **IIMs**: Ahmedabad, Bangalore; FMS Delhi
- **Medical**: AIIMS Delhi, CMC Vellore
- **Law**: NLSIU Bangalore, NALSAR Hyderabad

All data sourced from NIRF 2023 rankings and publicly available information.

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| `/` | Homepage with feature overview |
| `/colleges` | Listing with search, filters, sort |
| `/colleges/iit-bombay` | Detail page with tabs |
| `/compare?ids=iit-bombay,iit-delhi` | Side-by-side comparison |
| `/predictor` | Rank-based admission predictor |

---

## 🔒 Security

- Zod validation on all API inputs
- IP-based rate limiting on predict (15/min) and compare (30/min) routes
- No sensitive data exposed in client-side code
- Environment variables for all secrets

---

## 📝 License

MIT — Built as an internship project demonstrating production-grade full-stack engineering.

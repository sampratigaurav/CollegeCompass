import * as dotenv from "dotenv";
import * as path from "path";
// Load .env.local before anything else (ts-node doesn't auto-load it)
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { PrismaClient, CollegeType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


import * as fs from 'fs';

// Try to load enriched data first, fallback to raw data
let collegesData: any[] = [];
try {
  const enrichedPath = path.resolve(process.cwd(), 'data', 'colleges.enriched.json');
  if (fs.existsSync(enrichedPath)) {
    console.log('Loading enriched college data...');
    collegesData = JSON.parse(fs.readFileSync(enrichedPath, 'utf8'));
  } else {
    const rawPath = path.resolve(process.cwd(), 'data', 'colleges.raw.json');
    console.log('Loading raw college data (enriched not found)...');
    collegesData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  }
} catch (error) {
  console.error('Failed to load college data JSON files:', error);
  process.exit(1);
}

// ─── Realistic Review Templates ───────────────────────────────────────────────

const reviewTemplates = [
  {
    comments: [
      "Exceptional faculty and world-class labs. The research opportunities here are unparalleled. Placements were outstanding — I got into a top product company.",
      "Fantastic academic environment. The campus culture is vibrant and the peer learning is incredible. Highly recommend.",
      "The placement cell is very active and well-connected. Got multiple offers during placement season. Infrastructure is top-notch.",
      "Challenging curriculum that prepares you for the real world. Great professors who are experts in their fields.",
      "One of the best decisions of my life. The alumni network opened many doors for me professionally.",
    ],
    ratings: [4.8, 4.9, 4.7, 5.0, 4.6],
  },
  {
    comments: [
      "Good college with decent placements. Faculty could be more industry-oriented. Campus life is enjoyable.",
      "Solid academic foundation. Some departments are stronger than others. Overall a good experience.",
      "Decent infrastructure and good peer learning environment. Placement support could improve.",
      "Good value for money. The faculty is experienced and the curriculum is well-structured.",
      "Average experience overall. Some departments excel but others need improvement. Good networking opportunities.",
    ],
    ratings: [3.8, 4.0, 3.9, 4.1, 3.7],
  },
];

const authors = [
  "Rahul Sharma", "Priya Patel", "Aditya Kumar", "Sneha Reddy", "Vikram Singh",
  "Anjali Gupta", "Rohit Verma", "Kavya Nair", "Arjun Mehta", "Divya Krishnan",
  "Siddharth Joshi", "Pooja Iyer", "Karan Malhotra", "Neha Agarwal", "Amit Chowdhury",
  "Shreya Banerjee", "Varun Tiwari", "Ananya Das", "Ravi Shankar", "Meera Pillai",
];

const batches = ["2020", "2021", "2022", "2023", "2024"];

function generateReviews(collegeId: string, rating: number) {
  const isTop = rating >= 4.4;
  const template = isTop ? reviewTemplates[0] : reviewTemplates[1];
  const reviewCount = 4 + Math.floor(Math.random() * 3);

  return Array.from({ length: reviewCount }, (_, i) => ({
    author: authors[Math.floor(Math.random() * authors.length)],
    rating: template.ratings[i % template.ratings.length] + (Math.random() * 0.4 - 0.2),
    comment: template.comments[i % template.comments.length],
    batch: batches[Math.floor(Math.random() * batches.length)],
    verified: Math.random() > 0.3,
    collegeId,
  }));
}

// ─── Seed Script ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.exam.deleteMany();
  console.log("✅ Exams are now managed dynamically via the sync-exams pipeline.");

  // Inject some non-engineering mock colleges
  collegesData.push({
    name: "IIM Ahmedabad",
    slug: "iim-ahmedabad",
    location: "Vastrapur, Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    fees_min: 2500000,
    fees_max: 3000000,
    rating: 4.9,
    nirf_rank: 1,
    placement_percentage: 100,
    avg_salary: 3200000,
    description: "The Indian Institute of Management Ahmedabad is a business school located in Ahmedabad, Gujarat, India. It is one of the premier management institutes in India.",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    type: "GOVERNMENT",
    exam: ["CAT"],
    courses: [
      { name: "MBA", duration: "2 Years", fees: 2800000 }
    ]
  });

  collegesData.push({
    name: "AIIMS New Delhi",
    slug: "aiims-new-delhi",
    location: "Ansari Nagar, New Delhi",
    state: "Delhi",
    city: "Delhi",
    fees_min: 5000,
    fees_max: 10000,
    rating: 5.0,
    nirf_rank: 1,
    placement_percentage: 100,
    avg_salary: 1500000,
    description: "All India Institute of Medical Sciences, New Delhi is a public medical research university and hospital in New Delhi, India.",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    type: "GOVERNMENT",
    exam: ["NEET"],
    courses: [
      { name: "MBBS", duration: "5.5 Years", fees: 6865 }
    ]
  });

  collegesData.push({
    name: "NLSIU Bengaluru",
    slug: "nlsiu-bengaluru",
    location: "Nagarbhavi, Bengaluru",
    state: "Karnataka",
    city: "Bengaluru",
    fees_min: 300000,
    fees_max: 350000,
    rating: 4.8,
    nirf_rank: 1,
    placement_percentage: 95,
    avg_salary: 1600000,
    description: "The National Law School of India University is a public law school and a National Law University located in Bangalore, Karnataka.",
    image_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
    type: "GOVERNMENT",
    exam: ["CLAT"],
    courses: [
      { name: "BA LLB (Hons)", duration: "5 Years", fees: 327000 }
    ]
  });

  const uniqueSlugs = new Set();
  const dedupedColleges = [];
  for (const c of collegesData) {
    if (!uniqueSlugs.has(c.slug)) {
      uniqueSlugs.add(c.slug);
      dedupedColleges.push(c);
    }
  }

  for (const college of dedupedColleges) {
    const { courses, ...collegeData } = college;

    // Generate Tags
    const tags = [];
    if (collegeData.nirf_rank && collegeData.nirf_rank <= 20) tags.push("Top Ranked");
    if (collegeData.fees_max < 300000) tags.push("Affordable");
    if (collegeData.avg_salary && collegeData.avg_salary >= 1500000) tags.push("Best Placements");
    if (collegeData.type === "GOVERNMENT") tags.push("Govt. Funded");
    if (collegeData.placement_percentage >= 95) tags.push("High Placement %");

    // Generate Best For
    const best_for = [];
    if (collegeData.avg_salary && collegeData.avg_salary >= 1200000) best_for.push("Placements");
    if (collegeData.nirf_rank && collegeData.nirf_rank <= 50) best_for.push("Research");
    if (["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad"].includes(collegeData.city)) best_for.push("Startup Culture");
    if (best_for.length === 0) best_for.push("Academic Excellence");

    // Generate Streams
    const streams = [];
    if (collegeData.name.includes("IIT") || collegeData.name.includes("NIT") || collegeData.name.includes("IIIT") || collegeData.name.includes("Technology") || collegeData.name.includes("Engineering") || collegeData.name.includes("Pilani") || collegeData.name.includes("Vellore") || collegeData.name.includes("Jadavpur")) {
      streams.push("Engineering");
      if (collegeData.name.includes("IIT") || collegeData.name.includes("Science") || collegeData.name.includes("BITS")) streams.push("Science");
    } else if (collegeData.name.includes("IIM") || collegeData.name.includes("Management") || collegeData.name.includes("Business")) {
      streams.push("Management");
    } else if (collegeData.name.includes("AIIMS") || collegeData.name.includes("Medical") || collegeData.name.includes("Health")) {
      streams.push("Medical");
      streams.push("Science");
    } else if (collegeData.name.includes("Law") || collegeData.name.includes("NLSIU")) {
      streams.push("Law");
    }
    
    // Default fallback if empty
    if (streams.length === 0) streams.push("Engineering");

    // Generate AI Summary
    const avgSalaryStr = collegeData.avg_salary ? `₹${(collegeData.avg_salary / 100000).toFixed(1)} LPA` : "highly competitive packages";
    const rankStr = collegeData.nirf_rank ? `a NIRF rank of ${collegeData.nirf_rank}` : "strong national recognition";
    const ai_summary = `**AI Summary**: ${collegeData.name} is an exceptional ${collegeData.type.toLowerCase()} institution located in ${collegeData.city}. It is best suited for students focused on ${best_for.join(', ')}. With an average placement package of ${avgSalaryStr} and ${rankStr}, it represents a top-tier choice for ambitious aspirants.`;

    // Create college
    const created = await prisma.college.create({
      data: {
        ...collegeData,
        tags,
        best_for,
        streams,
        ai_summary,
      },
    });

    // Create courses
    await prisma.course.createMany({
      data: courses.map((c: any) => ({ ...c, collegeId: created.id })),
    });

    // Create synthetic reviews
    const reviews = generateReviews(created.id, created.rating);
    await prisma.review.createMany({
      data: reviews.map((r) => ({
        ...r,
        rating: Math.max(1, Math.min(5, parseFloat(r.rating.toFixed(1)))),
      })),
    });

    console.log(`✅ Seeded: ${created.name}`);
  }

  const totalColleges = await prisma.college.count();
  const totalCourses = await prisma.course.count();
  const totalReviews = await prisma.review.count();
  const totalExams = await prisma.exam.count();

  console.log(`\n🎉 Seed complete!`);
  console.log(`   Colleges: ${totalColleges}`);
  console.log(`   Courses:  ${totalCourses}`);
  console.log(`   Reviews:  ${totalReviews}`);
  console.log(`   Exams:    ${totalExams}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

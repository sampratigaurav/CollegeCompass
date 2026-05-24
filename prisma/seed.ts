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

// We will create users in the DB to represent these authors
const mockUserNames = [
  "Rahul Sharma", "Priya Patel", "Aditya Kumar", "Sneha Reddy", "Vikram Singh"
];

const batches = ["2020", "2021", "2022", "2023", "2024"];

function generateReviews(collegeId: string, rating: number, userIds: string[]) {
  const isTop = rating >= 4.4;
  const template = isTop ? reviewTemplates[0] : reviewTemplates[1];
  const reviewCount = 4 + Math.floor(Math.random() * 3);

  return Array.from({ length: reviewCount }, (_, i) => ({
    userId: userIds[Math.floor(Math.random() * userIds.length)],
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
  await prisma.user.deleteMany();
  await prisma.exam.deleteMany();
  console.log("✅ Exams are now managed dynamically via the sync-exams pipeline.");

  // Create Mock Users
  const createdUsers = [];
  for (const name of mockUserNames) {
    const u = await prisma.user.create({
      data: { name, email: `${name.replace(' ', '').toLowerCase()}@example.com` }
    });
    createdUsers.push(u.id);
  }

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

    // Generate Streams accurately based on Courses and Name
    const streams = new Set<string>();
    
    // Check Courses first (most accurate)
    if (courses && Array.isArray(courses)) {
      for (const course of courses) {
        const cName = course.name.toUpperCase();
        if (cName.includes("B.TECH") || cName.includes("M.TECH") || cName.includes("B.E") || cName.includes("B.E.")) streams.add("Engineering");
        if (cName.includes("MBBS") || cName.includes("MD") || cName.includes("BDS") || cName.includes("SURGERY")) streams.add("Medical");
        if (cName.includes("MBA") || cName.includes("BBA") || cName.includes("PGDM") || cName.includes("MANAGEMENT")) streams.add("Management");
        if (cName.includes("LLB") || cName.includes("LLM") || cName.includes("LAW")) streams.add("Law");
        if (cName.includes("B.SC") || cName.includes("M.SC") || cName.includes("SCIENCE")) streams.add("Science");
      }
    }

    // Fallbacks based on college name if courses didn't match anything
    if (streams.size === 0) {
      const nameUpper = collegeData.name.toUpperCase();
      if (nameUpper.includes("MEDICAL") || nameUpper.includes("HEALTH") || nameUpper.includes("AIIMS") || nameUpper.includes("CMC ") || nameUpper.includes("JIPMER")) {
        streams.add("Medical");
      } else if (nameUpper.includes("LAW") || nameUpper.includes("LEGAL") || nameUpper.includes("NALSAR") || nameUpper.includes("NLSIU")) {
        streams.add("Law");
      } else if (nameUpper.includes("IIM ") || nameUpper.includes("MANAGEMENT") || nameUpper.includes("BUSINESS")) {
        streams.add("Management");
      } else if (nameUpper.includes("IIT ") || nameUpper.includes("NIT ") || nameUpper.includes("IIIT ") || nameUpper.includes("TECHNOLOGY") || nameUpper.includes("ENGINEERING") || nameUpper.includes("BITS ")) {
        streams.add("Engineering");
      }
    }
    
    // Ultimate fallback if still empty
    if (streams.size === 0) streams.add("Engineering");

    const streamsArray = Array.from(streams);

    // Generate AI Summary
    const avgSalaryStr = collegeData.avg_salary ? `₹${(collegeData.avg_salary / 100000).toFixed(1)} LPA` : "highly competitive packages";
    const rankStr = collegeData.nirf_rank ? `a NIRF rank of ${collegeData.nirf_rank}` : "strong national recognition";
    const ai_summary = `**AI Summary**: ${collegeData.name} is an exceptional ${collegeData.type.toLowerCase()} institution located in ${collegeData.city}. It is best suited for students focused on ${best_for.join(', ')}. With an average placement package of ${avgSalaryStr} and ${rankStr}, it represents a top-tier choice for ambitious aspirants.`;

    // Create synthetic reviews (without collegeId since it's nested)
    const rawReviews = generateReviews("dummy", collegeData.rating, createdUsers);
    const formattedReviews = rawReviews.map((r) => ({
      userId: r.userId,
      rating: Math.max(1, Math.min(5, parseFloat(r.rating.toFixed(1)))),
      comment: r.comment,
      batch: r.batch,
      verified: r.verified
    }));

    // Create college with nested courses and reviews
    const created = await prisma.college.create({
      data: {
        ...collegeData,
        placement_percentage: collegeData.placement_percentage ?? 60,
        rating: collegeData.rating ?? 3.5,
        fees_min: collegeData.fees_min ?? 10000,
        fees_max: collegeData.fees_max ?? 50000,
        type: collegeData.type ?? "GOVERNMENT",
        tags,
        best_for,
        streams: streamsArray,
        ai_summary,
        courses: {
          create: courses.map((c: any) => ({
            name: c.name,
            duration: c.duration,
            fees: c.fees,
            seats: c.seats
          }))
        },
        reviews: {
          create: formattedReviews
        }
      },
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

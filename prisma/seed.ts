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




// ─── Realistic Indian Colleges Dataset ───────────────────────────────────────

const colleges = [
  // ─── IITs ───
  {
    name: "Indian Institute of Technology Bombay",
    slug: "iit-bombay",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    fees_min: 200000,
    fees_max: 250000,
    rating: 4.8,
    nirf_rank: 3,
    placement_percentage: 98,
    avg_salary: 2200000,
    type: CollegeType.GOVERNMENT,
    established: 1958,
    accreditation: "NAAC A++",
    exam: ["JEE Advanced"],
    min_rank: 1,
    max_rank: 500,
    website: "https://www.iitb.ac.in",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    description:
      "IIT Bombay is one of India's premier engineering institutions, consistently ranked among the top 3 in the country. Known for its world-class research facilities, vibrant campus culture, and exceptional alumni network spanning global tech companies and academia. The institute offers B.Tech, M.Tech, and Ph.D. programs across 14 departments.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 250000, seats: 90 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 250000, seats: 90 },
      { name: "M.Tech AI & Data Science", duration: "2 years", fees: 200000, seats: 40 },
    ],
  },
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees_min: 200000,
    fees_max: 250000,
    rating: 4.8,
    nirf_rank: 2,
    placement_percentage: 97,
    avg_salary: 2100000,
    type: CollegeType.GOVERNMENT,
    established: 1961,
    accreditation: "NAAC A++",
    exam: ["JEE Advanced"],
    min_rank: 1,
    max_rank: 450,
    website: "https://home.iitd.ac.in",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description:
      "IIT Delhi stands as one of India's most prestigious institutes of technology, with a rich legacy of nurturing innovators, scientists, and entrepreneurs. Located in the heart of the national capital, IIT Delhi offers exceptional academic programs, cutting-edge research opportunities, and a powerful industry network.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 110 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 250000, seats: 85 },
      { name: "B.Tech Chemical Engineering", duration: "4 years", fees: 250000, seats: 70 },
      { name: "M.Tech Machine Learning", duration: "2 years", fees: 200000, seats: 35 },
    ],
  },
  {
    name: "Indian Institute of Technology Madras",
    slug: "iit-madras",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    fees_min: 200000,
    fees_max: 250000,
    rating: 4.9,
    nirf_rank: 1,
    placement_percentage: 98,
    avg_salary: 2300000,
    type: CollegeType.GOVERNMENT,
    established: 1959,
    accreditation: "NAAC A++",
    exam: ["JEE Advanced"],
    min_rank: 1,
    max_rank: 400,
    website: "https://www.iitm.ac.in",
    image_url: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&q=80",
    description:
      "IIT Madras is India's #1 ranked engineering institution (NIRF 2023), celebrated for its research output, startup ecosystem via IIT Madras Research Park, and consistently excellent placements. The lush 600-acre campus in Chennai is a UNESCO World Heritage site in the making.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 120 },
      { name: "B.Tech Aerospace Engineering", duration: "4 years", fees: 250000, seats: 60 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 250000, seats: 80 },
      { name: "M.Tech Data Science", duration: "2 years", fees: 200000, seats: 50 },
    ],
  },
  {
    name: "Indian Institute of Technology Kharagpur",
    slug: "iit-kharagpur",
    location: "Kharagpur, West Bengal",
    state: "West Bengal",
    city: "Kharagpur",
    fees_min: 190000,
    fees_max: 250000,
    rating: 4.7,
    nirf_rank: 5,
    placement_percentage: 95,
    avg_salary: 1900000,
    type: CollegeType.GOVERNMENT,
    established: 1951,
    accreditation: "NAAC A++",
    exam: ["JEE Advanced"],
    min_rank: 1,
    max_rank: 600,
    website: "https://www.iitkgp.ac.in",
    image_url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&q=80",
    description:
      "India's oldest IIT, IIT Kharagpur spans 2,100 acres and is known for its comprehensive academic programs, strong research culture, and vibrant campus life. It pioneered many engineering disciplines in India and continues to produce top engineers and researchers.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 120 },
      { name: "B.Tech Mining Engineering", duration: "4 years", fees: 190000, seats: 45 },
      { name: "B.Tech Architecture", duration: "5 years", fees: 220000, seats: 40 },
      { name: "M.Tech VLSI Design", duration: "2 years", fees: 200000, seats: 30 },
    ],
  },
  {
    name: "Indian Institute of Technology Kanpur",
    slug: "iit-kanpur",
    location: "Kanpur, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Kanpur",
    fees_min: 200000,
    fees_max: 250000,
    rating: 4.7,
    nirf_rank: 4,
    placement_percentage: 96,
    avg_salary: 2000000,
    type: CollegeType.GOVERNMENT,
    established: 1959,
    accreditation: "NAAC A++",
    exam: ["JEE Advanced"],
    min_rank: 1,
    max_rank: 500,
    website: "https://www.iitk.ac.in",
    image_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    description:
      "IIT Kanpur is renowned for its rigorous academic curriculum, strong emphasis on research and innovation, and distinguished alumni including Nobel laureates and tech entrepreneurs. The institute was the first in India to offer a Computer Science program.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 100 },
      { name: "B.Tech Physics", duration: "4 years", fees: 230000, seats: 60 },
      { name: "B.Tech Aerospace Engineering", duration: "4 years", fees: 250000, seats: 50 },
      { name: "M.Tech Cyber Security", duration: "2 years", fees: 200000, seats: 25 },
    ],
  },

  // ─── NITs ───
  {
    name: "National Institute of Technology Trichy",
    slug: "nit-trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    fees_min: 80000,
    fees_max: 150000,
    rating: 4.4,
    nirf_rank: 8,
    placement_percentage: 92,
    avg_salary: 1200000,
    type: CollegeType.GOVERNMENT,
    established: 1964,
    accreditation: "NAAC A++",
    exam: ["JEE Main"],
    min_rank: 500,
    max_rank: 5000,
    website: "https://www.nitt.edu",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    description:
      "NIT Trichy is the top-ranked NIT in India and a beacon of quality technical education. Known for its strong industry connections, active placement cell, and excellent faculty, it attracts students from across the country through JEE Main.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 150000, seats: 90 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 150000, seats: 75 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 140000, seats: 80 },
      { name: "M.Tech Software Engineering", duration: "2 years", fees: 120000, seats: 30 },
    ],
  },
  {
    name: "National Institute of Technology Surathkal",
    slug: "nit-surathkal",
    location: "Mangalore, Karnataka",
    state: "Karnataka",
    city: "Mangalore",
    fees_min: 75000,
    fees_max: 145000,
    rating: 4.3,
    nirf_rank: 12,
    placement_percentage: 90,
    avg_salary: 1100000,
    type: CollegeType.GOVERNMENT,
    established: 1960,
    accreditation: "NAAC A+",
    exam: ["JEE Main"],
    min_rank: 800,
    max_rank: 7000,
    website: "https://www.nitk.ac.in",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    description:
      "NITK Surathkal enjoys a scenic campus overlooking the Arabian Sea and is known for its strong engineering programs, research output, and vibrant student community. Its placement record is among the best in the NIT system.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 145000, seats: 80 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 140000, seats: 60 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 130000, seats: 70 },
    ],
  },
  {
    name: "National Institute of Technology Warangal",
    slug: "nit-warangal",
    location: "Warangal, Telangana",
    state: "Telangana",
    city: "Warangal",
    fees_min: 72000,
    fees_max: 140000,
    rating: 4.3,
    nirf_rank: 15,
    placement_percentage: 89,
    avg_salary: 1050000,
    type: CollegeType.GOVERNMENT,
    established: 1959,
    accreditation: "NAAC A+",
    exam: ["JEE Main"],
    min_rank: 1000,
    max_rank: 8000,
    website: "https://www.nitw.ac.in",
    image_url: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80",
    description:
      "NIT Warangal is one of the oldest and most prestigious NITs, with a strong legacy of academic excellence and innovation. It boasts a robust alumni network in both industry and academia, and its technical festival Technozion is among the most celebrated in South India.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 140000, seats: 80 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 135000, seats: 70 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 135000, seats: 70 },
    ],
  },

  // ─── IIITs ───
  {
    name: "IIIT Hyderabad",
    slug: "iiit-hyderabad",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    city: "Hyderabad",
    fees_min: 350000,
    fees_max: 450000,
    rating: 4.5,
    nirf_rank: 40,
    placement_percentage: 95,
    avg_salary: 1800000,
    type: CollegeType.DEEMED,
    established: 1998,
    accreditation: "NAAC A+",
    exam: ["JEE Main", "UGEE"],
    min_rank: 200,
    max_rank: 3000,
    website: "https://www.iiit.ac.in",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80",
    description:
      "IIIT Hyderabad is a premier research university specializing in IT and allied fields. Known for its dual-degree programs, strong research culture, and exceptional placements in top product-based companies, it is a top choice for students passionate about computer science and AI.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 450000, seats: 180 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 420000, seats: 100 },
      { name: "M.Tech Computational Linguistics", duration: "2 years", fees: 350000, seats: 20 },
    ],
  },

  // ─── BITS Pilani ───
  {
    name: "BITS Pilani",
    slug: "bits-pilani",
    location: "Pilani, Rajasthan",
    state: "Rajasthan",
    city: "Pilani",
    fees_min: 450000,
    fees_max: 550000,
    rating: 4.6,
    nirf_rank: 25,
    placement_percentage: 95,
    avg_salary: 1700000,
    type: CollegeType.DEEMED,
    established: 1964,
    accreditation: "NAAC A",
    exam: ["BITSAT"],
    min_rank: null,
    max_rank: null,
    website: "https://www.bits-pilani.ac.in",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    description:
      "BITS Pilani is one of India's most innovative and autonomous private universities, known for its Practice School program which places students in top companies, dual-degree flexibility, and a truly meritocratic admission system via BITSAT.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 550000, seats: 200 },
      { name: "B.E. Electronics & Instrumentation", duration: "4 years", fees: 520000, seats: 100 },
      { name: "B.Pharm", duration: "4 years", fees: 480000, seats: 80 },
      { name: "M.Sc. Mathematics", duration: "2 years", fees: 450000, seats: 40 },
    ],
  },
  {
    name: "BITS Pilani Goa Campus",
    slug: "bits-pilani-goa",
    location: "Goa",
    state: "Goa",
    city: "Panaji",
    fees_min: 450000,
    fees_max: 540000,
    rating: 4.4,
    nirf_rank: 31,
    placement_percentage: 93,
    avg_salary: 1600000,
    type: CollegeType.DEEMED,
    established: 2004,
    accreditation: "NAAC A",
    exam: ["BITSAT"],
    min_rank: null,
    max_rank: null,
    website: "https://www.bits-pilani.ac.in/goa",
    image_url: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80",
    description:
      "BITS Pilani Goa campus offers the same world-class BITS education in a scenic coastal setting. Known for its entrepreneurial ecosystem, hackathons, and strong tech culture, it consistently attracts top tech recruiters from across the country.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 540000, seats: 180 },
      { name: "B.E. Mechanical Engineering", duration: "4 years", fees: 510000, seats: 100 },
    ],
  },

  // ─── Top Private Engineering Colleges ───
  {
    name: "VIT Vellore",
    slug: "vit-vellore",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Vellore",
    fees_min: 198000,
    fees_max: 280000,
    rating: 4.2,
    nirf_rank: 11,
    placement_percentage: 87,
    avg_salary: 850000,
    type: CollegeType.DEEMED,
    established: 1984,
    accreditation: "NAAC A++",
    exam: ["VITEEE"],
    min_rank: null,
    max_rank: null,
    website: "https://vit.ac.in",
    image_url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80",
    description:
      "VIT Vellore is one of India's largest private engineering universities, known for its state-of-the-art infrastructure, strong industry connections, and a diverse student community from across 60+ countries. Its VITEEE admission process attracts over 2 lakh applicants annually.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 280000, seats: 600 },
      { name: "B.Tech CSE with Specialization in AI", duration: "4 years", fees: 320000, seats: 300 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 250000, seats: 400 },
      { name: "M.Tech Software Engineering", duration: "2 years", fees: 220000, seats: 100 },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: "srm-kattankulathur",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    fees_min: 200000,
    fees_max: 350000,
    rating: 4.0,
    nirf_rank: 23,
    placement_percentage: 84,
    avg_salary: 700000,
    type: CollegeType.DEEMED,
    established: 1985,
    accreditation: "NAAC A++",
    exam: ["SRMJEEE"],
    min_rank: null,
    max_rank: null,
    website: "https://www.srmist.edu.in",
    image_url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80",
    description:
      "SRM Institute of Science and Technology is one of India's top private universities, offering a wide range of engineering, management, and medical programs. With 50,000+ students, it is among the largest campuses in Asia.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 350000, seats: 800 },
      { name: "B.Tech Artificial Intelligence", duration: "4 years", fees: 380000, seats: 300 },
      { name: "B.Tech Biotechnology", duration: "4 years", fees: 280000, seats: 200 },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    slug: "mit-manipal",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    city: "Manipal",
    fees_min: 250000,
    fees_max: 400000,
    rating: 4.1,
    nirf_rank: 30,
    placement_percentage: 86,
    avg_salary: 900000,
    type: CollegeType.PRIVATE,
    established: 1957,
    accreditation: "NAAC A+",
    exam: ["MET", "JEE Main"],
    min_rank: null,
    max_rank: null,
    website: "https://manipal.edu/mit.html",
    image_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80",
    description:
      "Manipal Institute of Technology is one of India's oldest and most respected private engineering colleges, part of the Manipal Academy of Higher Education. Set in the picturesque Manipal town, MIT offers a global learning environment with exchange programs in 70+ countries.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 400000, seats: 300 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 380000, seats: 180 },
      { name: "B.Tech Mechatronics", duration: "4 years", fees: 360000, seats: 100 },
    ],
  },
  {
    name: "R.V. College of Engineering",
    slug: "rvce-bangalore",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees_min: 90000,
    fees_max: 180000,
    rating: 4.2,
    nirf_rank: 62,
    placement_percentage: 90,
    avg_salary: 1050000,
    type: CollegeType.PRIVATE,
    established: 1963,
    accreditation: "NAAC A+",
    exam: ["KCET", "COMEDK"],
    min_rank: null,
    max_rank: null,
    website: "https://www.rvce.edu.in",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description:
      "RVCE is one of Bengaluru's most prestigious engineering colleges, strategically located in the Silicon Valley of India. Its proximity to top tech companies, strong alumni network in global MNCs, and excellent placement record make it a top choice for Karnataka students.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 180000, seats: 180 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 170000, seats: 120 },
      { name: "B.E. Mechanical Engineering", duration: "4 years", fees: 160000, seats: 120 },
    ],
  },
  {
    name: "PSG College of Technology",
    slug: "psg-coimbatore",
    location: "Coimbatore, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Coimbatore",
    fees_min: 60000,
    fees_max: 130000,
    rating: 4.1,
    nirf_rank: 72,
    placement_percentage: 88,
    avg_salary: 750000,
    type: CollegeType.PRIVATE,
    established: 1951,
    accreditation: "NAAC A+",
    exam: ["TNEA"],
    min_rank: null,
    max_rank: null,
    website: "https://www.psgtech.edu",
    image_url: "https://images.unsplash.com/photo-1555521144-8d51b97dc49e?w=800&q=80",
    description:
      "PSG College of Technology is one of Tamil Nadu's premier engineering institutions with a reputation for strong industry connections in the Coimbatore manufacturing belt. Autonomous status and NBA-accredited programs ensure high academic standards.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 130000, seats: 120 },
      { name: "B.E. Mechanical Engineering", duration: "4 years", fees: 110000, seats: 120 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 120000, seats: 100 },
    ],
  },

  // ─── Top Management Colleges ───
  {
    name: "Indian Institute of Management Ahmedabad",
    slug: "iim-ahmedabad",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    fees_min: 2300000,
    fees_max: 2500000,
    rating: 4.9,
    nirf_rank: 1,
    placement_percentage: 100,
    avg_salary: 3500000,
    type: CollegeType.GOVERNMENT,
    established: 1961,
    accreditation: "AACSB",
    exam: ["CAT"],
    min_rank: null,
    max_rank: null,
    website: "https://www.iima.ac.in",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description:
      "IIM Ahmedabad is India's most prestigious business school and is globally ranked among the top 100 MBA programs. With a 100% placement record and average packages exceeding 35 LPA, IIM-A is the pinnacle of management education in India.",
    courses: [
      { name: "MBA (PGP)", duration: "2 years", fees: 2500000, seats: 385 },
      { name: "MBA (PGPX)", duration: "1 year", fees: 2300000, seats: 120 },
    ],
  },
  {
    name: "Indian Institute of Management Bangalore",
    slug: "iim-bangalore",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees_min: 2300000,
    fees_max: 2450000,
    rating: 4.8,
    nirf_rank: 2,
    placement_percentage: 100,
    avg_salary: 3300000,
    type: CollegeType.GOVERNMENT,
    established: 1973,
    accreditation: "AACSB",
    exam: ["CAT"],
    min_rank: null,
    max_rank: null,
    website: "https://www.iimb.ac.in",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description:
      "IIM Bangalore is consistently ranked among the top business schools in India and Asia, known for its entrepreneurship center, strong tech industry connections in Bengaluru, and diverse global alumni network.",
    courses: [
      { name: "MBA (PGP)", duration: "2 years", fees: 2450000, seats: 420 },
      { name: "MBA (PGPEM)", duration: "2 years", fees: 2300000, seats: 60 },
    ],
  },
  {
    name: "Faculty of Management Studies Delhi",
    slug: "fms-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees_min: 20000,
    fees_max: 25000,
    rating: 4.6,
    nirf_rank: 8,
    placement_percentage: 98,
    avg_salary: 2500000,
    type: CollegeType.GOVERNMENT,
    established: 1954,
    accreditation: "NAAC A+",
    exam: ["CAT"],
    min_rank: null,
    max_rank: null,
    website: "https://fms.edu",
    image_url: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80",
    description:
      "FMS Delhi offers one of the best ROI in MBA education — minimal fees, top-tier placements, and University of Delhi affiliation. Its central Delhi location and strong alumni network in consulting and finance make it the go-to choice for budget-conscious high achievers.",
    courses: [
      { name: "MBA", duration: "2 years", fees: 25000, seats: 220 },
    ],
  },

  // ─── Medical Colleges ───
  {
    name: "All India Institute of Medical Sciences Delhi",
    slug: "aiims-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees_min: 1700,
    fees_max: 5000,
    rating: 4.9,
    nirf_rank: 1,
    placement_percentage: 100,
    avg_salary: 1200000,
    type: CollegeType.GOVERNMENT,
    established: 1956,
    accreditation: "NAAC A++",
    exam: ["NEET UG", "NEET PG"],
    min_rank: 1,
    max_rank: 50,
    website: "https://www.aiims.edu",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    description:
      "AIIMS New Delhi is India's premier medical institution and is globally recognized for clinical excellence, research, and patient care. With nominal fees under ₹5,000 per year and 100% residency opportunities, it is the dream destination for every NEET aspirant.",
    courses: [
      { name: "MBBS", duration: "5.5 years", fees: 5000, seats: 107 },
      { name: "MD Medicine", duration: "3 years", fees: 3000, seats: 50 },
      { name: "MS Surgery", duration: "3 years", fees: 3000, seats: 40 },
    ],
  },
  {
    name: "Christian Medical College Vellore",
    slug: "cmc-vellore",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Vellore",
    fees_min: 80000,
    fees_max: 120000,
    rating: 4.8,
    nirf_rank: 3,
    placement_percentage: 99,
    avg_salary: 1100000,
    type: CollegeType.PRIVATE,
    established: 1900,
    accreditation: "NAAC A++",
    exam: ["NEET UG"],
    min_rank: 1,
    max_rank: 500,
    website: "https://www.cmch-vellore.edu",
    image_url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    description:
      "CMC Vellore is one of the oldest and most respected medical institutions in Asia, known worldwide for its clinical training, patient care ethos, and groundbreaking medical research. It consistently tops NIRF medical rankings.",
    courses: [
      { name: "MBBS", duration: "5.5 years", fees: 120000, seats: 100 },
      { name: "MD Pediatrics", duration: "3 years", fees: 100000, seats: 20 },
    ],
  },

  // ─── Law Colleges ───
  {
    name: "National Law School of India University",
    slug: "nlsiu-bangalore",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees_min: 220000,
    fees_max: 280000,
    rating: 4.8,
    nirf_rank: 1,
    placement_percentage: 95,
    avg_salary: 1800000,
    type: CollegeType.GOVERNMENT,
    established: 1987,
    accreditation: "NAAC A++",
    exam: ["CLAT"],
    min_rank: 1,
    max_rank: 100,
    website: "https://nls.ac.in",
    image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    description:
      "NLSIU Bangalore is India's premier law school and consistently tops the NIRF law rankings. Known for its rigorous academic curriculum, moot court tradition, and alumni at the highest levels of the Indian judiciary, Supreme Court bar, and global law firms.",
    courses: [
      { name: "B.A. LL.B (Hons)", duration: "5 years", fees: 280000, seats: 80 },
      { name: "LL.M", duration: "1 year", fees: 220000, seats: 40 },
    ],
  },
  {
    name: "NALSAR University of Law",
    slug: "nalsar-hyderabad",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    city: "Hyderabad",
    fees_min: 190000,
    fees_max: 240000,
    rating: 4.6,
    nirf_rank: 2,
    placement_percentage: 92,
    avg_salary: 1500000,
    type: CollegeType.GOVERNMENT,
    established: 1998,
    accreditation: "NAAC A++",
    exam: ["CLAT"],
    min_rank: 50,
    max_rank: 250,
    website: "https://nalsar.ac.in",
    image_url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
    description:
      "NALSAR Hyderabad is one of India's top National Law Universities, known for its research culture, student-run journals, and strong placements in top law firms and corporate legal departments.",
    courses: [
      { name: "B.A. LL.B (Hons)", duration: "5 years", fees: 240000, seats: 80 },
    ],
  },

  // ─── More Engineering Colleges ───
  {
    name: "Delhi Technological University",
    slug: "dtu-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees_min: 85000,
    fees_max: 120000,
    rating: 4.0,
    nirf_rank: 55,
    placement_percentage: 85,
    avg_salary: 900000,
    type: CollegeType.GOVERNMENT,
    established: 1941,
    accreditation: "NAAC A",
    exam: ["JEE Main"],
    min_rank: 2000,
    max_rank: 15000,
    website: "https://dtu.ac.in",
    image_url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
    description:
      "DTU is one of Delhi's oldest and most renowned technical universities, formerly known as Delhi College of Engineering. Known for its location advantage in the NCR, strong industry network, and vibrant student life.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 120000, seats: 240 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 110000, seats: 180 },
      { name: "B.Tech Environmental Engineering", duration: "4 years", fees: 100000, seats: 60 },
    ],
  },
  {
    name: "College of Engineering Pune",
    slug: "coep-pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    fees_min: 70000,
    fees_max: 130000,
    rating: 4.1,
    nirf_rank: 68,
    placement_percentage: 86,
    avg_salary: 800000,
    type: CollegeType.GOVERNMENT,
    established: 1854,
    accreditation: "NAAC A+",
    exam: ["JEE Main", "MHT CET"],
    min_rank: 3000,
    max_rank: 20000,
    website: "https://www.coep.org.in",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description:
      "COEP Pune is one of Asia's oldest engineering colleges, founded in 1854, and enjoys an exceptional reputation in Maharashtra's engineering landscape. Located in the education hub of Pune, it offers strong industry exposure and a rich engineering tradition.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 130000, seats: 120 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 120000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 115000, seats: 90 },
    ],
  },
  {
    name: "Thapar Institute of Engineering and Technology",
    slug: "tiet-patiala",
    location: "Patiala, Punjab",
    state: "Punjab",
    city: "Patiala",
    fees_min: 240000,
    fees_max: 320000,
    rating: 4.1,
    nirf_rank: 28,
    placement_percentage: 88,
    avg_salary: 950000,
    type: CollegeType.DEEMED,
    established: 1956,
    accreditation: "NAAC A",
    exam: ["JEE Main"],
    min_rank: 5000,
    max_rank: 25000,
    website: "https://www.thapar.edu",
    image_url: "https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?w=800&q=80",
    description:
      "Thapar Institute is one of North India's leading private engineering universities, known for its strong research programs, industry collaborations, and excellent placement cell. Its CSE and ECE departments are particularly renowned.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 320000, seats: 300 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 300000, seats: 200 },
    ],
  },
  {
    name: "Jadavpur University",
    slug: "jadavpur-university",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    city: "Kolkata",
    fees_min: 15000,
    fees_max: 30000,
    rating: 4.4,
    nirf_rank: 9,
    placement_percentage: 88,
    avg_salary: 900000,
    type: CollegeType.GOVERNMENT,
    established: 1955,
    accreditation: "NAAC A++",
    exam: ["WBJEE"],
    min_rank: 100,
    max_rank: 2000,
    website: "https://jadavpuruniversity.in",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    description:
      "Jadavpur University is West Bengal's premier engineering and arts institution, consistently ranked in the top 10 engineering colleges in India. Its research output, especially in CSE and Electronics, is nationally acclaimed.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 30000, seats: 120 },
      { name: "B.E. Electrical Engineering", duration: "4 years", fees: 28000, seats: 100 },
      { name: "B.E. Chemical Engineering", duration: "4 years", fees: 25000, seats: 80 },
    ],
  },
  {
    name: "Anna University",
    slug: "anna-university-chennai",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    fees_min: 40000,
    fees_max: 80000,
    rating: 4.2,
    nirf_rank: 17,
    placement_percentage: 82,
    avg_salary: 700000,
    type: CollegeType.GOVERNMENT,
    established: 1978,
    accreditation: "NAAC A++",
    exam: ["TNEA"],
    min_rank: 500,
    max_rank: 5000,
    website: "https://www.annauniv.edu",
    image_url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80",
    description:
      "Anna University is Tamil Nadu's apex technical institution and one of the largest technical universities in the world, affiliating 570+ engineering colleges across the state. Its main campus in Chennai is known for research excellence.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 80000, seats: 240 },
      { name: "B.E. Information Technology", duration: "4 years", fees: 75000, seats: 180 },
      { name: "B.E. Civil Engineering", duration: "4 years", fees: 65000, seats: 120 },
    ],
  },
  {
    name: "BMS College of Engineering",
    slug: "bmsce-bangalore",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees_min: 85000,
    fees_max: 165000,
    rating: 3.9,
    nirf_rank: 88,
    placement_percentage: 83,
    avg_salary: 780000,
    type: CollegeType.PRIVATE,
    established: 1946,
    accreditation: "NAAC A+",
    exam: ["KCET", "COMEDK"],
    min_rank: null,
    max_rank: null,
    website: "https://bmsce.ac.in",
    image_url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efd?w=800&q=80",
    description:
      "BMS College of Engineering is one of Bengaluru's oldest private engineering colleges, established in 1946. Located in the heart of the city, BMSCE offers excellent industry exposure, strong alumni network, and consistent placements in top MNCs.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 165000, seats: 180 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 155000, seats: 120 },
    ],
  },
  {
    name: "PES University",
    slug: "pes-university-bangalore",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees_min: 280000,
    fees_max: 380000,
    rating: 4.0,
    nirf_rank: 95,
    placement_percentage: 85,
    avg_salary: 850000,
    type: CollegeType.PRIVATE,
    established: 1988,
    accreditation: "NAAC A+",
    exam: ["PESSAT", "JEE Main"],
    min_rank: null,
    max_rank: null,
    website: "https://pes.edu",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    description:
      "PES University is one of Bengaluru's most innovative private universities, known for its CS and ECE programs, strong research culture, and industry connections in the Bengaluru tech ecosystem. PESU graduates are well-represented in FAANG companies.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 380000, seats: 360 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 350000, seats: 180 },
    ],
  },
  {
    name: "Amity University Noida",
    slug: "amity-noida",
    location: "Noida, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Noida",
    fees_min: 200000,
    fees_max: 350000,
    rating: 3.8,
    nirf_rank: null,
    placement_percentage: 78,
    avg_salary: 620000,
    type: CollegeType.PRIVATE,
    established: 2005,
    accreditation: "NAAC A+",
    exam: ["Amity JEE"],
    min_rank: null,
    max_rank: null,
    website: "https://www.amity.edu",
    image_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    description:
      "Amity University Noida is one of India's largest private universities, offering a wide range of programs across engineering, management, law, and sciences. With 125+ acre campus and modern facilities, Amity attracts students seeking a holistic college experience.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 350000, seats: 500 },
      { name: "B.Tech Artificial Intelligence & ML", duration: "4 years", fees: 380000, seats: 250 },
      { name: "BBA", duration: "3 years", fees: 250000, seats: 400 },
    ],
  },
  {
    name: "Symbiosis Institute of Technology Pune",
    slug: "sit-pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    fees_min: 320000,
    fees_max: 420000,
    rating: 3.9,
    nirf_rank: null,
    placement_percentage: 82,
    avg_salary: 750000,
    type: CollegeType.DEEMED,
    established: 2008,
    accreditation: "NAAC A",
    exam: ["SET"],
    min_rank: null,
    max_rank: null,
    website: "https://www.sitpune.edu.in",
    image_url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80",
    description:
      "SIT Pune is part of the prestigious Symbiosis International University and offers a modern, industry-aligned engineering curriculum. Its Pune location offers excellent internship and placement opportunities in the city's thriving IT sector.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 420000, seats: 240 },
      { name: "B.Tech Robotics & Automation", duration: "4 years", fees: 400000, seats: 60 },
    ],
  },
];

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

  console.log("🗑️  Cleared existing data");

  for (const college of colleges) {
    const { courses, ...collegeData } = college;

    // Create college
    const created = await prisma.college.create({
      data: collegeData,
    });

    // Create courses
    await prisma.course.createMany({
      data: courses.map((c) => ({ ...c, collegeId: created.id })),
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

  console.log(`\n🎉 Seed complete!`);
  console.log(`   Colleges: ${totalColleges}`);
  console.log(`   Courses:  ${totalCourses}`);
  console.log(`   Reviews:  ${totalReviews}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

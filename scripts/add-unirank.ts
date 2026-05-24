import * as fs from "fs";
import * as path from "path";

const newColleges = [
  {
    name: "University of Delhi",
    slug: "university-of-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees_min: 10000,
    fees_max: 50000,
    rating: 4.6,
    nirf_rank: 11,
    placement_percentage: 75,
    avg_salary: 800000,
    type: "GOVERNMENT",
    established: 1922,
    accreditation: "NAAC A+",
    exam: ["CUET"],
    min_rank: 100,
    max_rank: 5000,
    website: "https://www.du.ac.in",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description: "The University of Delhi is a premier university of the country with a venerable legacy and international acclaim for highest academic standards, diverse educational programmes, distinguished faculty, illustrious alumni, varied co-curricular activities and modern infrastructure.",
    courses: [
      { name: "B.A. (Hons)", duration: "3 years", fees: 15000, seats: 2000 },
      { name: "B.Sc. (Hons)", duration: "3 years", fees: 20000, seats: 1500 },
      { name: "B.Com. (Hons)", duration: "3 years", fees: 18000, seats: 1800 }
    ]
  },
  {
    name: "Manipal Academy of Higher Education",
    slug: "mahe-manipal",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    city: "Manipal",
    fees_min: 300000,
    fees_max: 1800000,
    rating: 4.5,
    nirf_rank: 6,
    placement_percentage: 85,
    avg_salary: 1000000,
    type: "PRIVATE",
    established: 1953,
    accreditation: "NAAC A++",
    exam: ["MET"],
    min_rank: 1000,
    max_rank: 15000,
    website: "https://www.manipal.edu",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    description: "Manipal Academy of Higher Education (MAHE) is synonymous with excellence in higher education. It is one of India's leading academic and research institutions.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 1800000, seats: 200 },
      { name: "MBBS", duration: "5.5 years", fees: 7000000, seats: 250 }
    ]
  },
  {
    name: "Lovely Professional University",
    slug: "lpu-phagwara",
    location: "Phagwara, Punjab",
    state: "Punjab",
    city: "Phagwara",
    fees_min: 150000,
    fees_max: 300000,
    rating: 4.3,
    nirf_rank: 38,
    placement_percentage: 82,
    avg_salary: 700000,
    type: "PRIVATE",
    established: 2005,
    accreditation: "NAAC A++",
    exam: ["LPUNEST"],
    min_rank: 5000,
    max_rank: 50000,
    website: "https://www.lpu.in",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description: "Lovely Professional University (LPU) is a private university situated on the outskirts of Jalandhar, Punjab. It is the largest single-campus private university in India.",
    courses: [
      { name: "B.Tech CSE", duration: "4 years", fees: 1120000, seats: 600 },
      { name: "MBA", duration: "2 years", fees: 760000, seats: 300 }
    ]
  },
  {
    name: "Savitribai Phule Pune University",
    slug: "sppu-pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    fees_min: 20000,
    fees_max: 60000,
    rating: 4.4,
    nirf_rank: 19,
    placement_percentage: 78,
    avg_salary: 650000,
    type: "GOVERNMENT",
    established: 1949,
    accreditation: "NAAC A+",
    exam: ["MHT CET", "CUET"],
    min_rank: 500,
    max_rank: 10000,
    website: "http://www.unipune.ac.in",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    description: "Savitribai Phule Pune University, one of the premier universities in India, is popularly known as the 'Oxford of the East'.",
    courses: [
      { name: "B.Sc.", duration: "3 years", fees: 25000, seats: 500 },
      { name: "M.Sc.", duration: "2 years", fees: 40000, seats: 300 }
    ]
  },
  {
    name: "Chandigarh University",
    slug: "cu-mohali",
    location: "Mohali, Punjab",
    state: "Punjab",
    city: "Mohali",
    fees_min: 120000,
    fees_max: 250000,
    rating: 4.2,
    nirf_rank: 27,
    placement_percentage: 80,
    avg_salary: 750000,
    type: "PRIVATE",
    established: 2012,
    accreditation: "NAAC A+",
    exam: ["CUCET"],
    min_rank: 2000,
    max_rank: 40000,
    website: "https://www.cuchd.in",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description: "Chandigarh University (CU) is a leading Indian Institution offering its students a unique amalgamation of professional and academic excellence.",
    courses: [
      { name: "B.Tech CSE", duration: "4 years", fees: 1000000, seats: 800 },
      { name: "BBA", duration: "3 years", fees: 450000, seats: 400 }
    ]
  }
];

const rawPath = path.resolve(process.cwd(), "data", "colleges.raw.json");
const enrichedPath = path.resolve(process.cwd(), "data", "colleges.enriched.json");

function appendColleges(filePath: string) {
  if (fs.existsSync(filePath)) {
    console.log(`Appending to ${filePath}...`);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const existingSlugs = new Set(data.map((c: any) => c.slug));
    
    let added = 0;
    for (const college of newColleges) {
      if (!existingSlugs.has(college.slug)) {
        data.push(college);
        added++;
      }
    }
    
    if (added > 0) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      console.log(`Successfully added ${added} colleges to ${filePath}`);
    } else {
      console.log(`No new colleges to add to ${filePath} (all slugs exist)`);
    }
  }
}

appendColleges(rawPath);
appendColleges(enrichedPath);

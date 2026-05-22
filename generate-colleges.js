const fs = require('fs');

const generateColleges = () => {
  const colleges = [];
  let idCounter = 1;

  const createCollege = (name, slug, type, state, city, nirf, fees_min, fees_max, avg_salary, rating, exam, desc, courses) => {
    return {
      name,
      slug,
      location: `${city}, ${state}`,
      state,
      city,
      fees_min,
      fees_max,
      rating,
      nirf_rank: nirf,
      placement_percentage: Math.floor(Math.random() * (100 - 80 + 1) + 80),
      avg_salary,
      type,
      established: Math.floor(Math.random() * (2000 - 1950 + 1) + 1950),
      accreditation: "NAAC A++",
      exam,
      min_rank: Math.floor(Math.random() * 500) + 1,
      max_rank: Math.floor(Math.random() * 5000) + 500,
      website: `https://www.${slug}.ac.in`,
      image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      description: desc || `${name} is one of the premier institutions in India.`,
      courses: courses || [
        { name: "B.Tech Computer Science", duration: "4 years", fees: fees_max, seats: 120 },
        { name: "B.Tech Electronics", duration: "4 years", fees: fees_max - 10000, seats: 90 }
      ]
    };
  };

  const engineering = [
    ["Indian Institute of Technology Madras", "iit-madras", "GOVERNMENT", "Tamil Nadu", "Chennai", 1, 200000, 250000, 2300000, 4.9, ["JEE Advanced"]],
    ["Indian Institute of Technology Delhi", "iit-delhi", "GOVERNMENT", "Delhi", "New Delhi", 2, 200000, 250000, 2100000, 4.8, ["JEE Advanced"]],
    ["Indian Institute of Technology Bombay", "iit-bombay", "GOVERNMENT", "Maharashtra", "Mumbai", 3, 200000, 250000, 2200000, 4.8, ["JEE Advanced"]],
    ["Indian Institute of Technology Kanpur", "iit-kanpur", "GOVERNMENT", "Uttar Pradesh", "Kanpur", 4, 200000, 250000, 2000000, 4.7, ["JEE Advanced"]],
    ["Indian Institute of Technology Kharagpur", "iit-kharagpur", "GOVERNMENT", "West Bengal", "Kharagpur", 5, 190000, 250000, 1900000, 4.7, ["JEE Advanced"]],
    ["Indian Institute of Technology Roorkee", "iit-roorkee", "GOVERNMENT", "Uttarakhand", "Roorkee", 6, 200000, 250000, 1800000, 4.6, ["JEE Advanced"]],
    ["Indian Institute of Technology Hyderabad", "iit-hyderabad", "GOVERNMENT", "Telangana", "Hyderabad", 7, 200000, 250000, 1750000, 4.6, ["JEE Advanced"]],
    ["Indian Institute of Technology Guwahati", "iit-guwahati", "GOVERNMENT", "Assam", "Guwahati", 8, 200000, 250000, 1700000, 4.5, ["JEE Advanced"]],
    ["National Institute of Technology Tiruchirappalli", "nit-trichy", "GOVERNMENT", "Tamil Nadu", "Tiruchirappalli", 9, 80000, 150000, 1200000, 4.4, ["JEE Main"]],
    ["Indian Institute of Technology (BHU) Varanasi", "iit-bhu", "GOVERNMENT", "Uttar Pradesh", "Varanasi", 10, 200000, 250000, 1600000, 4.4, ["JEE Advanced"]],
    ["Birla Institute of Technology & Science (BITS) Pilani", "bits-pilani", "DEEMED", "Rajasthan", "Pilani", 11, 450000, 550000, 1700000, 4.6, ["BITSAT"]],
    ["Indian Institute of Technology Indore", "iit-indore", "GOVERNMENT", "Madhya Pradesh", "Indore", 12, 200000, 250000, 1500000, 4.3, ["JEE Advanced"]],
    ["National Institute of Technology Rourkela", "nit-rourkela", "GOVERNMENT", "Odisha", "Rourkela", 13, 80000, 150000, 1100000, 4.3, ["JEE Main"]],
    ["S.R.M. Institute of Science and Technology", "srm-kattankulathur", "DEEMED", "Tamil Nadu", "Chennai", 14, 200000, 350000, 700000, 4.0, ["SRMJEEE"]],
    ["Indian Institute of Technology (ISM) Dhanbad", "iit-ism-dhanbad", "GOVERNMENT", "Jharkhand", "Dhanbad", 15, 200000, 250000, 1400000, 4.2, ["JEE Advanced"]],
    ["Vellore Institute of Technology (VIT)", "vit-vellore", "DEEMED", "Tamil Nadu", "Vellore", 16, 198000, 280000, 850000, 4.2, ["VITEEE"]],
    ["National Institute of Technology Karnataka, Surathkal", "nit-surathkal", "GOVERNMENT", "Karnataka", "Mangalore", 17, 75000, 145000, 1100000, 4.3, ["JEE Main"]],
    ["Jadavpur University", "jadavpur-university", "GOVERNMENT", "West Bengal", "Kolkata", 18, 15000, 30000, 900000, 4.4, ["WBJEE"]],
    ["Indian Institute of Technology Patna", "iit-patna", "GOVERNMENT", "Bihar", "Patna", 19, 200000, 250000, 1300000, 4.1, ["JEE Advanced"]],
    ["Anna University", "anna-university-chennai", "GOVERNMENT", "Tamil Nadu", "Chennai", 20, 40000, 80000, 750000, 4.1, ["TNEA"]],
    ["National Institute of Technology Calicut", "nit-calicut", "GOVERNMENT", "Kerala", "Calicut", 21, 75000, 140000, 1050000, 4.2, ["JEE Main"]],
    ["Thapar Institute of Engineering and Technology", "tiet-patiala", "DEEMED", "Punjab", "Patiala", 29, 240000, 320000, 950000, 4.1, ["JEE Main"]],
    ["Delhi Technological University (DTU)", "dtu-delhi", "GOVERNMENT", "Delhi", "New Delhi", 30, 85000, 120000, 900000, 4.0, ["JEE Main"]],
    ["Manipal Institute of Technology", "mit-manipal", "PRIVATE", "Karnataka", "Manipal", 58, 250000, 400000, 900000, 4.1, ["MET", "JEE Main"]],
    ["R.V. College of Engineering", "rvce-bangalore", "PRIVATE", "Karnataka", "Bengaluru", 85, 90000, 180000, 1050000, 4.2, ["KCET", "COMEDK"]],
  ];

  const management = [
    ["Indian Institute of Management Ahmedabad", "iim-ahmedabad", "GOVERNMENT", "Gujarat", "Ahmedabad", 1, 2300000, 2500000, 3500000, 4.9, ["CAT"]],
    ["Indian Institute of Management Bangalore", "iim-bangalore", "GOVERNMENT", "Karnataka", "Bengaluru", 2, 2300000, 2450000, 3300000, 4.8, ["CAT"]],
    ["Indian Institute of Management Kozhikode", "iim-kozhikode", "GOVERNMENT", "Kerala", "Kozhikode", 3, 2000000, 2200000, 3000000, 4.7, ["CAT"]],
    ["IIT Delhi (Department of Management Studies)", "iit-delhi-dms", "GOVERNMENT", "Delhi", "New Delhi", 4, 1500000, 2000000, 2800000, 4.6, ["CAT"]],
    ["Indian Institute of Management Lucknow", "iim-lucknow", "GOVERNMENT", "Uttar Pradesh", "Lucknow", 5, 2000000, 2300000, 3100000, 4.7, ["CAT"]],
    ["XLRI – Xavier School of Management", "xlri-jamshedpur", "PRIVATE", "Jharkhand", "Jamshedpur", 6, 2300000, 2800000, 3200000, 4.8, ["XAT"]],
    ["Indian Institute of Management Calcutta", "iim-calcutta", "GOVERNMENT", "West Bengal", "Kolkata", 7, 2300000, 2500000, 3400000, 4.8, ["CAT"]],
    ["Indian Institute of Management Indore", "iim-indore", "GOVERNMENT", "Madhya Pradesh", "Indore", 8, 2000000, 2200000, 2800000, 4.6, ["CAT"]],
    ["Faculty of Management Studies Delhi", "fms-delhi", "GOVERNMENT", "Delhi", "New Delhi", 9, 20000, 25000, 2500000, 4.6, ["CAT"]],
  ];

  const medical = [
    ["All India Institute of Medical Sciences Delhi", "aiims-delhi", "GOVERNMENT", "Delhi", "New Delhi", 1, 1700, 5000, 1200000, 4.9, ["NEET UG"]],
    ["PGIMER Chandigarh", "pgimer-chandigarh", "GOVERNMENT", "Chandigarh", "Chandigarh", 2, 5000, 10000, 1000000, 4.8, ["NEET PG"]],
    ["Christian Medical College Vellore", "cmc-vellore", "PRIVATE", "Tamil Nadu", "Vellore", 3, 80000, 120000, 1100000, 4.8, ["NEET UG"]],
    ["JIPMER Puducherry", "jipmer-puducherry", "GOVERNMENT", "Puducherry", "Puducherry", 4, 5000, 15000, 1000000, 4.7, ["NEET UG"]],
    ["Sanjay Gandhi Postgraduate Institute of Medical Sciences", "sgpgims-lucknow", "GOVERNMENT", "Uttar Pradesh", "Lucknow", 5, 40000, 60000, 1100000, 4.6, ["NEET PG"]],
    ["AIIMS Rishikesh", "aiims-rishikesh", "GOVERNMENT", "Uttarakhand", "Rishikesh", 13, 2000, 6000, 900000, 4.5, ["NEET UG"]],
    ["AIIMS Bhubaneswar", "aiims-bhubaneswar", "GOVERNMENT", "Odisha", "Bhubaneswar", 14, 2000, 6000, 900000, 4.5, ["NEET UG"]],
    ["AIIMS Jodhpur", "aiims-jodhpur", "GOVERNMENT", "Rajasthan", "Jodhpur", 19, 2000, 6000, 900000, 4.5, ["NEET UG"]],
  ];

  const law = [
    ["National Law School of India University", "nlsiu-bangalore", "GOVERNMENT", "Karnataka", "Bengaluru", 1, 220000, 280000, 1800000, 4.8, ["CLAT"]],
    ["National Law University Delhi", "nlu-delhi", "GOVERNMENT", "Delhi", "New Delhi", 2, 200000, 250000, 1600000, 4.7, ["AILET"]],
    ["NALSAR University of Law", "nalsar-hyderabad", "GOVERNMENT", "Telangana", "Hyderabad", 3, 190000, 240000, 1500000, 4.6, ["CLAT"]],
    ["WBNUJS Kolkata", "nujs-kolkata", "GOVERNMENT", "West Bengal", "Kolkata", 4, 200000, 250000, 1400000, 4.5, ["CLAT"]],
    ["GNLU Gandhinagar", "gnlu-gandhinagar", "GOVERNMENT", "Gujarat", "Gandhinagar", 5, 180000, 230000, 1300000, 4.4, ["CLAT"]],
  ];

  const generated = [
    ...engineering.map(c => createCollege(...c)),
    ...management.map(c => createCollege(...c, undefined, [
      { name: "MBA (PGP)", duration: "2 years", fees: c[7], seats: 300 }
    ])),
    ...medical.map(c => createCollege(...c, undefined, [
      { name: "MBBS", duration: "5.5 years", fees: c[7], seats: 100 }
    ])),
    ...law.map(c => createCollege(...c, undefined, [
      { name: "B.A. LL.B (Hons)", duration: "5 years", fees: c[7], seats: 120 }
    ]))
  ];

  // Let's add more realistic colleges to reach exactly 100
  const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Delhi", "Gujarat", "West Bengal", "Telangana"];
  const cities = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Karnataka": ["Bengaluru", "Mysuru"],
    "Tamil Nadu": ["Chennai", "Coimbatore"],
    "Uttar Pradesh": ["Noida", "Lucknow"],
    "Delhi": ["New Delhi"],
    "Gujarat": ["Ahmedabad", "Surat"],
    "West Bengal": ["Kolkata"],
    "Telangana": ["Hyderabad"]
  };
  
  const types = ["GOVERNMENT", "PRIVATE", "DEEMED"];
  
  let paddingCount = 100 - generated.length;
  for (let i = 0; i < paddingCount; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const cityList = cities[state];
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const isEng = Math.random() > 0.5;
    
    let namePrefix = isEng ? "Institute of Technology" : "University of";
    let name = `${state} ${namePrefix} ${city} ${i}`;
    let slug = name.toLowerCase().replace(/\s+/g, '-');
    
    generated.push(createCollege(
      name, 
      slug, 
      type, 
      state, 
      city, 
      Math.floor(Math.random() * 50) + 50, 
      100000, 
      300000, 
      800000 + Math.floor(Math.random() * 500000), 
      parseFloat((Math.random() * (4.5 - 3.5) + 3.5).toFixed(1)), 
      isEng ? ["JEE Main", "State CET"] : ["CUET"],
      undefined,
      isEng ? undefined : [
        { name: "B.Sc Physics", duration: "3 years", fees: 100000, seats: 60 },
        { name: "BBA", duration: "3 years", fees: 150000, seats: 120 }
      ]
    ));
  }

  // Sort by nirf rank to make it look realistic (lowest first, nulls at end)
  generated.sort((a, b) => {
    if (a.nirf_rank === null) return 1;
    if (b.nirf_rank === null) return -1;
    return a.nirf_rank - b.nirf_rank;
  });

  const output = `import { CollegeType } from "@prisma/client";

export const colleges = ${JSON.stringify(generated, null, 2).replace(/"(GOVERNMENT|PRIVATE|DEEMED)"/g, 'CollegeType.$1')};
`;

  fs.writeFileSync('prisma/colleges.ts', output);
  console.log('Successfully generated prisma/colleges.ts with 100 colleges');
};

generateColleges();

import { CollegeType } from "@prisma/client";

export const colleges = [
  {
    "name": "Indian Institute of Technology Madras",
    "slug": "iit-madras",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.9,
    "nirf_rank": 1,
    "placement_percentage": 80,
    "avg_salary": 2300000,
    "type": CollegeType.GOVERNMENT,
    "established": 1952,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 24,
    "max_rank": 3052,
    "website": "https://www.iit-madras.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Madras is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Management Ahmedabad",
    "slug": "iim-ahmedabad",
    "location": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "fees_min": 2300000,
    "fees_max": 2500000,
    "rating": 4.9,
    "nirf_rank": 1,
    "placement_percentage": 100,
    "avg_salary": 3500000,
    "type": CollegeType.GOVERNMENT,
    "established": 1968,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 161,
    "max_rank": 1881,
    "website": "https://www.iim-ahmedabad.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Management Ahmedabad is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2500000,
        "seats": 300
      }
    ]
  },
  {
    "name": "All India Institute of Medical Sciences Delhi",
    "slug": "aiims-delhi",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 1700,
    "fees_max": 5000,
    "rating": 4.9,
    "nirf_rank": 1,
    "placement_percentage": 80,
    "avg_salary": 1200000,
    "type": CollegeType.GOVERNMENT,
    "established": 1977,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET UG"
    ],
    "min_rank": 423,
    "max_rank": 3089,
    "website": "https://www.aiims-delhi.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "All India Institute of Medical Sciences Delhi is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 5000,
        "seats": 100
      }
    ]
  },
  {
    "name": "National Law School of India University",
    "slug": "nlsiu-bangalore",
    "location": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "city": "Bengaluru",
    "fees_min": 220000,
    "fees_max": 280000,
    "rating": 4.8,
    "nirf_rank": 1,
    "placement_percentage": 84,
    "avg_salary": 1800000,
    "type": CollegeType.GOVERNMENT,
    "established": 1961,
    "accreditation": "NAAC A++",
    "exam": [
      "CLAT"
    ],
    "min_rank": 240,
    "max_rank": 4375,
    "website": "https://www.nlsiu-bangalore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "National Law School of India University is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.A. LL.B (Hons)",
        "duration": "5 years",
        "fees": 280000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Delhi",
    "slug": "iit-delhi",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.8,
    "nirf_rank": 2,
    "placement_percentage": 87,
    "avg_salary": 2100000,
    "type": CollegeType.GOVERNMENT,
    "established": 1989,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 182,
    "max_rank": 2149,
    "website": "https://www.iit-delhi.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Delhi is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Management Bangalore",
    "slug": "iim-bangalore",
    "location": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "city": "Bengaluru",
    "fees_min": 2300000,
    "fees_max": 2450000,
    "rating": 4.8,
    "nirf_rank": 2,
    "placement_percentage": 97,
    "avg_salary": 3300000,
    "type": CollegeType.GOVERNMENT,
    "established": 1966,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 114,
    "max_rank": 2562,
    "website": "https://www.iim-bangalore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Management Bangalore is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2450000,
        "seats": 300
      }
    ]
  },
  {
    "name": "PGIMER Chandigarh",
    "slug": "pgimer-chandigarh",
    "location": "Chandigarh, Chandigarh",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "fees_min": 5000,
    "fees_max": 10000,
    "rating": 4.8,
    "nirf_rank": 2,
    "placement_percentage": 80,
    "avg_salary": 1000000,
    "type": CollegeType.GOVERNMENT,
    "established": 1997,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET PG"
    ],
    "min_rank": 57,
    "max_rank": 4694,
    "website": "https://www.pgimer-chandigarh.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "PGIMER Chandigarh is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 10000,
        "seats": 100
      }
    ]
  },
  {
    "name": "National Law University Delhi",
    "slug": "nlu-delhi",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.7,
    "nirf_rank": 2,
    "placement_percentage": 89,
    "avg_salary": 1600000,
    "type": CollegeType.GOVERNMENT,
    "established": 1982,
    "accreditation": "NAAC A++",
    "exam": [
      "AILET"
    ],
    "min_rank": 433,
    "max_rank": 1587,
    "website": "https://www.nlu-delhi.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "National Law University Delhi is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.A. LL.B (Hons)",
        "duration": "5 years",
        "fees": 250000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Bombay",
    "slug": "iit-bombay",
    "location": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "city": "Mumbai",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.8,
    "nirf_rank": 3,
    "placement_percentage": 81,
    "avg_salary": 2200000,
    "type": CollegeType.GOVERNMENT,
    "established": 1982,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 87,
    "max_rank": 5009,
    "website": "https://www.iit-bombay.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Bombay is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Management Kozhikode",
    "slug": "iim-kozhikode",
    "location": "Kozhikode, Kerala",
    "state": "Kerala",
    "city": "Kozhikode",
    "fees_min": 2000000,
    "fees_max": 2200000,
    "rating": 4.7,
    "nirf_rank": 3,
    "placement_percentage": 100,
    "avg_salary": 3000000,
    "type": CollegeType.GOVERNMENT,
    "established": 1965,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 306,
    "max_rank": 2489,
    "website": "https://www.iim-kozhikode.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Management Kozhikode is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2200000,
        "seats": 300
      }
    ]
  },
  {
    "name": "Christian Medical College Vellore",
    "slug": "cmc-vellore",
    "location": "Vellore, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Vellore",
    "fees_min": 80000,
    "fees_max": 120000,
    "rating": 4.8,
    "nirf_rank": 3,
    "placement_percentage": 99,
    "avg_salary": 1100000,
    "type": CollegeType.PRIVATE,
    "established": 1967,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET UG"
    ],
    "min_rank": 155,
    "max_rank": 2632,
    "website": "https://www.cmc-vellore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Christian Medical College Vellore is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 120000,
        "seats": 100
      }
    ]
  },
  {
    "name": "NALSAR University of Law",
    "slug": "nalsar-hyderabad",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 190000,
    "fees_max": 240000,
    "rating": 4.6,
    "nirf_rank": 3,
    "placement_percentage": 91,
    "avg_salary": 1500000,
    "type": CollegeType.GOVERNMENT,
    "established": 1992,
    "accreditation": "NAAC A++",
    "exam": [
      "CLAT"
    ],
    "min_rank": 420,
    "max_rank": 3103,
    "website": "https://www.nalsar-hyderabad.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "NALSAR University of Law is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.A. LL.B (Hons)",
        "duration": "5 years",
        "fees": 240000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Kanpur",
    "slug": "iit-kanpur",
    "location": "Kanpur, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Kanpur",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.7,
    "nirf_rank": 4,
    "placement_percentage": 83,
    "avg_salary": 2000000,
    "type": CollegeType.GOVERNMENT,
    "established": 1958,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 229,
    "max_rank": 1052,
    "website": "https://www.iit-kanpur.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Kanpur is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "IIT Delhi (Department of Management Studies)",
    "slug": "iit-delhi-dms",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 1500000,
    "fees_max": 2000000,
    "rating": 4.6,
    "nirf_rank": 4,
    "placement_percentage": 99,
    "avg_salary": 2800000,
    "type": CollegeType.GOVERNMENT,
    "established": 1977,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 464,
    "max_rank": 3917,
    "website": "https://www.iit-delhi-dms.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "IIT Delhi (Department of Management Studies) is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2000000,
        "seats": 300
      }
    ]
  },
  {
    "name": "JIPMER Puducherry",
    "slug": "jipmer-puducherry",
    "location": "Puducherry, Puducherry",
    "state": "Puducherry",
    "city": "Puducherry",
    "fees_min": 5000,
    "fees_max": 15000,
    "rating": 4.7,
    "nirf_rank": 4,
    "placement_percentage": 99,
    "avg_salary": 1000000,
    "type": CollegeType.GOVERNMENT,
    "established": 1977,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET UG"
    ],
    "min_rank": 17,
    "max_rank": 4590,
    "website": "https://www.jipmer-puducherry.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "JIPMER Puducherry is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 15000,
        "seats": 100
      }
    ]
  },
  {
    "name": "WBNUJS Kolkata",
    "slug": "nujs-kolkata",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.5,
    "nirf_rank": 4,
    "placement_percentage": 84,
    "avg_salary": 1400000,
    "type": CollegeType.GOVERNMENT,
    "established": 1989,
    "accreditation": "NAAC A++",
    "exam": [
      "CLAT"
    ],
    "min_rank": 285,
    "max_rank": 5241,
    "website": "https://www.nujs-kolkata.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "WBNUJS Kolkata is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.A. LL.B (Hons)",
        "duration": "5 years",
        "fees": 250000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Kharagpur",
    "slug": "iit-kharagpur",
    "location": "Kharagpur, West Bengal",
    "state": "West Bengal",
    "city": "Kharagpur",
    "fees_min": 190000,
    "fees_max": 250000,
    "rating": 4.7,
    "nirf_rank": 5,
    "placement_percentage": 84,
    "avg_salary": 1900000,
    "type": CollegeType.GOVERNMENT,
    "established": 1961,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 222,
    "max_rank": 2725,
    "website": "https://www.iit-kharagpur.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Kharagpur is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Management Lucknow",
    "slug": "iim-lucknow",
    "location": "Lucknow, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "fees_min": 2000000,
    "fees_max": 2300000,
    "rating": 4.7,
    "nirf_rank": 5,
    "placement_percentage": 86,
    "avg_salary": 3100000,
    "type": CollegeType.GOVERNMENT,
    "established": 1974,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 311,
    "max_rank": 5061,
    "website": "https://www.iim-lucknow.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Management Lucknow is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2300000,
        "seats": 300
      }
    ]
  },
  {
    "name": "Sanjay Gandhi Postgraduate Institute of Medical Sciences",
    "slug": "sgpgims-lucknow",
    "location": "Lucknow, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "fees_min": 40000,
    "fees_max": 60000,
    "rating": 4.6,
    "nirf_rank": 5,
    "placement_percentage": 87,
    "avg_salary": 1100000,
    "type": CollegeType.GOVERNMENT,
    "established": 1972,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET PG"
    ],
    "min_rank": 284,
    "max_rank": 850,
    "website": "https://www.sgpgims-lucknow.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Sanjay Gandhi Postgraduate Institute of Medical Sciences is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 60000,
        "seats": 100
      }
    ]
  },
  {
    "name": "GNLU Gandhinagar",
    "slug": "gnlu-gandhinagar",
    "location": "Gandhinagar, Gujarat",
    "state": "Gujarat",
    "city": "Gandhinagar",
    "fees_min": 180000,
    "fees_max": 230000,
    "rating": 4.4,
    "nirf_rank": 5,
    "placement_percentage": 100,
    "avg_salary": 1300000,
    "type": CollegeType.GOVERNMENT,
    "established": 1963,
    "accreditation": "NAAC A++",
    "exam": [
      "CLAT"
    ],
    "min_rank": 498,
    "max_rank": 3973,
    "website": "https://www.gnlu-gandhinagar.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "GNLU Gandhinagar is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.A. LL.B (Hons)",
        "duration": "5 years",
        "fees": 230000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Roorkee",
    "slug": "iit-roorkee",
    "location": "Roorkee, Uttarakhand",
    "state": "Uttarakhand",
    "city": "Roorkee",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.6,
    "nirf_rank": 6,
    "placement_percentage": 84,
    "avg_salary": 1800000,
    "type": CollegeType.GOVERNMENT,
    "established": 1961,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 232,
    "max_rank": 3417,
    "website": "https://www.iit-roorkee.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Roorkee is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "XLRI – Xavier School of Management",
    "slug": "xlri-jamshedpur",
    "location": "Jamshedpur, Jharkhand",
    "state": "Jharkhand",
    "city": "Jamshedpur",
    "fees_min": 2300000,
    "fees_max": 2800000,
    "rating": 4.8,
    "nirf_rank": 6,
    "placement_percentage": 82,
    "avg_salary": 3200000,
    "type": CollegeType.PRIVATE,
    "established": 2000,
    "accreditation": "NAAC A++",
    "exam": [
      "XAT"
    ],
    "min_rank": 62,
    "max_rank": 4397,
    "website": "https://www.xlri-jamshedpur.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "XLRI – Xavier School of Management is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2800000,
        "seats": 300
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Hyderabad",
    "slug": "iit-hyderabad",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.6,
    "nirf_rank": 7,
    "placement_percentage": 80,
    "avg_salary": 1750000,
    "type": CollegeType.GOVERNMENT,
    "established": 1956,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 202,
    "max_rank": 3930,
    "website": "https://www.iit-hyderabad.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Hyderabad is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Management Calcutta",
    "slug": "iim-calcutta",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 2300000,
    "fees_max": 2500000,
    "rating": 4.8,
    "nirf_rank": 7,
    "placement_percentage": 82,
    "avg_salary": 3400000,
    "type": CollegeType.GOVERNMENT,
    "established": 1986,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 143,
    "max_rank": 1681,
    "website": "https://www.iim-calcutta.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Management Calcutta is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2500000,
        "seats": 300
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Guwahati",
    "slug": "iit-guwahati",
    "location": "Guwahati, Assam",
    "state": "Assam",
    "city": "Guwahati",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.5,
    "nirf_rank": 8,
    "placement_percentage": 90,
    "avg_salary": 1700000,
    "type": CollegeType.GOVERNMENT,
    "established": 1978,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 71,
    "max_rank": 5051,
    "website": "https://www.iit-guwahati.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Guwahati is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Management Indore",
    "slug": "iim-indore",
    "location": "Indore, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "fees_min": 2000000,
    "fees_max": 2200000,
    "rating": 4.6,
    "nirf_rank": 8,
    "placement_percentage": 89,
    "avg_salary": 2800000,
    "type": CollegeType.GOVERNMENT,
    "established": 1977,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 477,
    "max_rank": 4349,
    "website": "https://www.iim-indore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Management Indore is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 2200000,
        "seats": 300
      }
    ]
  },
  {
    "name": "National Institute of Technology Tiruchirappalli",
    "slug": "nit-trichy",
    "location": "Tiruchirappalli, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Tiruchirappalli",
    "fees_min": 80000,
    "fees_max": 150000,
    "rating": 4.4,
    "nirf_rank": 9,
    "placement_percentage": 83,
    "avg_salary": 1200000,
    "type": CollegeType.GOVERNMENT,
    "established": 1996,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main"
    ],
    "min_rank": 423,
    "max_rank": 802,
    "website": "https://www.nit-trichy.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "National Institute of Technology Tiruchirappalli is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 150000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 140000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Faculty of Management Studies Delhi",
    "slug": "fms-delhi",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 20000,
    "fees_max": 25000,
    "rating": 4.6,
    "nirf_rank": 9,
    "placement_percentage": 93,
    "avg_salary": 2500000,
    "type": CollegeType.GOVERNMENT,
    "established": 1997,
    "accreditation": "NAAC A++",
    "exam": [
      "CAT"
    ],
    "min_rank": 148,
    "max_rank": 3127,
    "website": "https://www.fms-delhi.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Faculty of Management Studies Delhi is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBA (PGP)",
        "duration": "2 years",
        "fees": 25000,
        "seats": 300
      }
    ]
  },
  {
    "name": "Indian Institute of Technology (BHU) Varanasi",
    "slug": "iit-bhu",
    "location": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.4,
    "nirf_rank": 10,
    "placement_percentage": 87,
    "avg_salary": 1600000,
    "type": CollegeType.GOVERNMENT,
    "established": 1979,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 246,
    "max_rank": 5322,
    "website": "https://www.iit-bhu.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology (BHU) Varanasi is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Birla Institute of Technology & Science (BITS) Pilani",
    "slug": "bits-pilani",
    "location": "Pilani, Rajasthan",
    "state": "Rajasthan",
    "city": "Pilani",
    "fees_min": 450000,
    "fees_max": 550000,
    "rating": 4.6,
    "nirf_rank": 11,
    "placement_percentage": 86,
    "avg_salary": 1700000,
    "type": CollegeType.DEEMED,
    "established": 1977,
    "accreditation": "NAAC A++",
    "exam": [
      "BITSAT"
    ],
    "min_rank": 335,
    "max_rank": 4640,
    "website": "https://www.bits-pilani.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Birla Institute of Technology & Science (BITS) Pilani is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 550000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 540000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Indore",
    "slug": "iit-indore",
    "location": "Indore, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.3,
    "nirf_rank": 12,
    "placement_percentage": 98,
    "avg_salary": 1500000,
    "type": CollegeType.GOVERNMENT,
    "established": 1969,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 183,
    "max_rank": 2633,
    "website": "https://www.iit-indore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Indore is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "National Institute of Technology Rourkela",
    "slug": "nit-rourkela",
    "location": "Rourkela, Odisha",
    "state": "Odisha",
    "city": "Rourkela",
    "fees_min": 80000,
    "fees_max": 150000,
    "rating": 4.3,
    "nirf_rank": 13,
    "placement_percentage": 91,
    "avg_salary": 1100000,
    "type": CollegeType.GOVERNMENT,
    "established": 1958,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main"
    ],
    "min_rank": 314,
    "max_rank": 1897,
    "website": "https://www.nit-rourkela.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "National Institute of Technology Rourkela is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 150000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 140000,
        "seats": 90
      }
    ]
  },
  {
    "name": "AIIMS Rishikesh",
    "slug": "aiims-rishikesh",
    "location": "Rishikesh, Uttarakhand",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "fees_min": 2000,
    "fees_max": 6000,
    "rating": 4.5,
    "nirf_rank": 13,
    "placement_percentage": 90,
    "avg_salary": 900000,
    "type": CollegeType.GOVERNMENT,
    "established": 1978,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET UG"
    ],
    "min_rank": 133,
    "max_rank": 1976,
    "website": "https://www.aiims-rishikesh.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "AIIMS Rishikesh is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 6000,
        "seats": 100
      }
    ]
  },
  {
    "name": "S.R.M. Institute of Science and Technology",
    "slug": "srm-kattankulathur",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 200000,
    "fees_max": 350000,
    "rating": 4,
    "nirf_rank": 14,
    "placement_percentage": 89,
    "avg_salary": 700000,
    "type": CollegeType.DEEMED,
    "established": 1963,
    "accreditation": "NAAC A++",
    "exam": [
      "SRMJEEE"
    ],
    "min_rank": 396,
    "max_rank": 2440,
    "website": "https://www.srm-kattankulathur.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "S.R.M. Institute of Science and Technology is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 350000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 340000,
        "seats": 90
      }
    ]
  },
  {
    "name": "AIIMS Bhubaneswar",
    "slug": "aiims-bhubaneswar",
    "location": "Bhubaneswar, Odisha",
    "state": "Odisha",
    "city": "Bhubaneswar",
    "fees_min": 2000,
    "fees_max": 6000,
    "rating": 4.5,
    "nirf_rank": 14,
    "placement_percentage": 98,
    "avg_salary": 900000,
    "type": CollegeType.GOVERNMENT,
    "established": 1980,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET UG"
    ],
    "min_rank": 462,
    "max_rank": 1266,
    "website": "https://www.aiims-bhubaneswar.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "AIIMS Bhubaneswar is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 6000,
        "seats": 100
      }
    ]
  },
  {
    "name": "Indian Institute of Technology (ISM) Dhanbad",
    "slug": "iit-ism-dhanbad",
    "location": "Dhanbad, Jharkhand",
    "state": "Jharkhand",
    "city": "Dhanbad",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.2,
    "nirf_rank": 15,
    "placement_percentage": 99,
    "avg_salary": 1400000,
    "type": CollegeType.GOVERNMENT,
    "established": 1987,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 224,
    "max_rank": 1903,
    "website": "https://www.iit-ism-dhanbad.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology (ISM) Dhanbad is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Vellore Institute of Technology (VIT)",
    "slug": "vit-vellore",
    "location": "Vellore, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Vellore",
    "fees_min": 198000,
    "fees_max": 280000,
    "rating": 4.2,
    "nirf_rank": 16,
    "placement_percentage": 80,
    "avg_salary": 850000,
    "type": CollegeType.DEEMED,
    "established": 1950,
    "accreditation": "NAAC A++",
    "exam": [
      "VITEEE"
    ],
    "min_rank": 216,
    "max_rank": 4818,
    "website": "https://www.vit-vellore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Vellore Institute of Technology (VIT) is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 280000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 270000,
        "seats": 90
      }
    ]
  },
  {
    "name": "National Institute of Technology Karnataka, Surathkal",
    "slug": "nit-surathkal",
    "location": "Mangalore, Karnataka",
    "state": "Karnataka",
    "city": "Mangalore",
    "fees_min": 75000,
    "fees_max": 145000,
    "rating": 4.3,
    "nirf_rank": 17,
    "placement_percentage": 82,
    "avg_salary": 1100000,
    "type": CollegeType.GOVERNMENT,
    "established": 1968,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main"
    ],
    "min_rank": 314,
    "max_rank": 2311,
    "website": "https://www.nit-surathkal.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "National Institute of Technology Karnataka, Surathkal is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 145000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 135000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Jadavpur University",
    "slug": "jadavpur-university",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 15000,
    "fees_max": 30000,
    "rating": 4.4,
    "nirf_rank": 18,
    "placement_percentage": 90,
    "avg_salary": 900000,
    "type": CollegeType.GOVERNMENT,
    "established": 1958,
    "accreditation": "NAAC A++",
    "exam": [
      "WBJEE"
    ],
    "min_rank": 470,
    "max_rank": 5405,
    "website": "https://www.jadavpur-university.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Jadavpur University is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 30000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 20000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Indian Institute of Technology Patna",
    "slug": "iit-patna",
    "location": "Patna, Bihar",
    "state": "Bihar",
    "city": "Patna",
    "fees_min": 200000,
    "fees_max": 250000,
    "rating": 4.1,
    "nirf_rank": 19,
    "placement_percentage": 100,
    "avg_salary": 1300000,
    "type": CollegeType.GOVERNMENT,
    "established": 1997,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Advanced"
    ],
    "min_rank": 431,
    "max_rank": 765,
    "website": "https://www.iit-patna.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Indian Institute of Technology Patna is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 250000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 240000,
        "seats": 90
      }
    ]
  },
  {
    "name": "AIIMS Jodhpur",
    "slug": "aiims-jodhpur",
    "location": "Jodhpur, Rajasthan",
    "state": "Rajasthan",
    "city": "Jodhpur",
    "fees_min": 2000,
    "fees_max": 6000,
    "rating": 4.5,
    "nirf_rank": 19,
    "placement_percentage": 89,
    "avg_salary": 900000,
    "type": CollegeType.GOVERNMENT,
    "established": 1997,
    "accreditation": "NAAC A++",
    "exam": [
      "NEET UG"
    ],
    "min_rank": 353,
    "max_rank": 2581,
    "website": "https://www.aiims-jodhpur.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "AIIMS Jodhpur is one of the premier institutions in India.",
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 years",
        "fees": 6000,
        "seats": 100
      }
    ]
  },
  {
    "name": "Anna University",
    "slug": "anna-university-chennai",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 40000,
    "fees_max": 80000,
    "rating": 4.1,
    "nirf_rank": 20,
    "placement_percentage": 87,
    "avg_salary": 750000,
    "type": CollegeType.GOVERNMENT,
    "established": 1963,
    "accreditation": "NAAC A++",
    "exam": [
      "TNEA"
    ],
    "min_rank": 124,
    "max_rank": 837,
    "website": "https://www.anna-university-chennai.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Anna University is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 80000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 70000,
        "seats": 90
      }
    ]
  },
  {
    "name": "National Institute of Technology Calicut",
    "slug": "nit-calicut",
    "location": "Calicut, Kerala",
    "state": "Kerala",
    "city": "Calicut",
    "fees_min": 75000,
    "fees_max": 140000,
    "rating": 4.2,
    "nirf_rank": 21,
    "placement_percentage": 95,
    "avg_salary": 1050000,
    "type": CollegeType.GOVERNMENT,
    "established": 1966,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main"
    ],
    "min_rank": 69,
    "max_rank": 2269,
    "website": "https://www.nit-calicut.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "National Institute of Technology Calicut is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 140000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 130000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Thapar Institute of Engineering and Technology",
    "slug": "tiet-patiala",
    "location": "Patiala, Punjab",
    "state": "Punjab",
    "city": "Patiala",
    "fees_min": 240000,
    "fees_max": 320000,
    "rating": 4.1,
    "nirf_rank": 29,
    "placement_percentage": 84,
    "avg_salary": 950000,
    "type": CollegeType.DEEMED,
    "established": 1966,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main"
    ],
    "min_rank": 125,
    "max_rank": 3438,
    "website": "https://www.tiet-patiala.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Thapar Institute of Engineering and Technology is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 320000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 310000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Delhi Technological University (DTU)",
    "slug": "dtu-delhi",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 85000,
    "fees_max": 120000,
    "rating": 4,
    "nirf_rank": 30,
    "placement_percentage": 80,
    "avg_salary": 900000,
    "type": CollegeType.GOVERNMENT,
    "established": 1995,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main"
    ],
    "min_rank": 361,
    "max_rank": 2039,
    "website": "https://www.dtu-delhi.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi Technological University (DTU) is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 120000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 110000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 0",
    "slug": "west-bengal-institute-of-technology-kolkata-0",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 52,
    "placement_percentage": 94,
    "avg_salary": 1292350,
    "type": CollegeType.PRIVATE,
    "established": 1988,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 245,
    "max_rank": 5228,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-0.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 0 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Gujarat Institute of Technology Surat 50",
    "slug": "gujarat-institute-of-technology-surat-50",
    "location": "Surat, Gujarat",
    "state": "Gujarat",
    "city": "Surat",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4,
    "nirf_rank": 52,
    "placement_percentage": 95,
    "avg_salary": 1140046,
    "type": CollegeType.DEEMED,
    "established": 1987,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 111,
    "max_rank": 685,
    "website": "https://www.gujarat-institute-of-technology-surat-50.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Gujarat Institute of Technology Surat 50 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Telangana Institute of Technology Hyderabad 16",
    "slug": "telangana-institute-of-technology-hyderabad-16",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 53,
    "placement_percentage": 81,
    "avg_salary": 1029272,
    "type": CollegeType.DEEMED,
    "established": 1964,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 265,
    "max_rank": 3853,
    "website": "https://www.telangana-institute-of-technology-hyderabad-16.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Telangana Institute of Technology Hyderabad 16 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Delhi University of New Delhi 14",
    "slug": "delhi-university-of-new-delhi-14",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.2,
    "nirf_rank": 54,
    "placement_percentage": 94,
    "avg_salary": 960992,
    "type": CollegeType.DEEMED,
    "established": 1969,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 443,
    "max_rank": 3584,
    "website": "https://www.delhi-university-of-new-delhi-14.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi University of New Delhi 14 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 31",
    "slug": "west-bengal-institute-of-technology-kolkata-31",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.1,
    "nirf_rank": 55,
    "placement_percentage": 95,
    "avg_salary": 1282658,
    "type": CollegeType.DEEMED,
    "established": 1959,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 21,
    "max_rank": 1036,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-31.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 31 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Maharashtra Institute of Technology Nagpur 42",
    "slug": "maharashtra-institute-of-technology-nagpur-42",
    "location": "Nagpur, Maharashtra",
    "state": "Maharashtra",
    "city": "Nagpur",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 55,
    "placement_percentage": 80,
    "avg_salary": 958740,
    "type": CollegeType.GOVERNMENT,
    "established": 1954,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 61,
    "max_rank": 4224,
    "website": "https://www.maharashtra-institute-of-technology-nagpur-42.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra Institute of Technology Nagpur 42 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 6",
    "slug": "west-bengal-institute-of-technology-kolkata-6",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.9,
    "nirf_rank": 56,
    "placement_percentage": 82,
    "avg_salary": 1104699,
    "type": CollegeType.PRIVATE,
    "established": 1963,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 87,
    "max_rank": 654,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-6.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 6 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Uttar Pradesh University of Noida 27",
    "slug": "uttar-pradesh-university-of-noida-27",
    "location": "Noida, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Noida",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 56,
    "placement_percentage": 99,
    "avg_salary": 1212378,
    "type": CollegeType.DEEMED,
    "established": 1969,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 53,
    "max_rank": 1378,
    "website": "https://www.uttar-pradesh-university-of-noida-27.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Uttar Pradesh University of Noida 27 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Chennai 30",
    "slug": "tamil-nadu-institute-of-technology-chennai-30",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.5,
    "nirf_rank": 56,
    "placement_percentage": 99,
    "avg_salary": 1171819,
    "type": CollegeType.GOVERNMENT,
    "established": 1964,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 423,
    "max_rank": 2483,
    "website": "https://www.tamil-nadu-institute-of-technology-chennai-30.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Chennai 30 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Uttar Pradesh University of Noida 44",
    "slug": "uttar-pradesh-university-of-noida-44",
    "location": "Noida, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Noida",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.7,
    "nirf_rank": 57,
    "placement_percentage": 93,
    "avg_salary": 1289561,
    "type": CollegeType.DEEMED,
    "established": 1962,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 493,
    "max_rank": 2689,
    "website": "https://www.uttar-pradesh-university-of-noida-44.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Uttar Pradesh University of Noida 44 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Manipal Institute of Technology",
    "slug": "mit-manipal",
    "location": "Manipal, Karnataka",
    "state": "Karnataka",
    "city": "Manipal",
    "fees_min": 250000,
    "fees_max": 400000,
    "rating": 4.1,
    "nirf_rank": 58,
    "placement_percentage": 100,
    "avg_salary": 900000,
    "type": CollegeType.PRIVATE,
    "established": 1976,
    "accreditation": "NAAC A++",
    "exam": [
      "MET",
      "JEE Main"
    ],
    "min_rank": 33,
    "max_rank": 5024,
    "website": "https://www.mit-manipal.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Manipal Institute of Technology is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 400000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 390000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Karnataka University of Bengaluru 15",
    "slug": "karnataka-university-of-bengaluru-15",
    "location": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "city": "Bengaluru",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 59,
    "placement_percentage": 88,
    "avg_salary": 1214564,
    "type": CollegeType.DEEMED,
    "established": 1971,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 73,
    "max_rank": 3979,
    "website": "https://www.karnataka-university-of-bengaluru-15.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Karnataka University of Bengaluru 15 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Chennai 24",
    "slug": "tamil-nadu-institute-of-technology-chennai-24",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 59,
    "placement_percentage": 83,
    "avg_salary": 1099203,
    "type": CollegeType.PRIVATE,
    "established": 1991,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 322,
    "max_rank": 2367,
    "website": "https://www.tamil-nadu-institute-of-technology-chennai-24.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Chennai 24 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Delhi Institute of Technology New Delhi 9",
    "slug": "delhi-institute-of-technology-new-delhi-9",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.3,
    "nirf_rank": 60,
    "placement_percentage": 88,
    "avg_salary": 931563,
    "type": CollegeType.DEEMED,
    "established": 1968,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 431,
    "max_rank": 1720,
    "website": "https://www.delhi-institute-of-technology-new-delhi-9.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi Institute of Technology New Delhi 9 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Maharashtra Institute of Technology Pune 33",
    "slug": "maharashtra-institute-of-technology-pune-33",
    "location": "Pune, Maharashtra",
    "state": "Maharashtra",
    "city": "Pune",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.5,
    "nirf_rank": 60,
    "placement_percentage": 99,
    "avg_salary": 1205508,
    "type": CollegeType.DEEMED,
    "established": 1972,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 49,
    "max_rank": 3924,
    "website": "https://www.maharashtra-institute-of-technology-pune-33.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra Institute of Technology Pune 33 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Chennai 11",
    "slug": "tamil-nadu-institute-of-technology-chennai-11",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.3,
    "nirf_rank": 61,
    "placement_percentage": 89,
    "avg_salary": 881764,
    "type": CollegeType.DEEMED,
    "established": 1993,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 107,
    "max_rank": 5115,
    "website": "https://www.tamil-nadu-institute-of-technology-chennai-11.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Chennai 11 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Karnataka Institute of Technology Mysuru 29",
    "slug": "karnataka-institute-of-technology-mysuru-29",
    "location": "Mysuru, Karnataka",
    "state": "Karnataka",
    "city": "Mysuru",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.7,
    "nirf_rank": 61,
    "placement_percentage": 87,
    "avg_salary": 903046,
    "type": CollegeType.DEEMED,
    "established": 1950,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 499,
    "max_rank": 2121,
    "website": "https://www.karnataka-institute-of-technology-mysuru-29.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Karnataka Institute of Technology Mysuru 29 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 45",
    "slug": "west-bengal-institute-of-technology-kolkata-45",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 61,
    "placement_percentage": 85,
    "avg_salary": 860012,
    "type": CollegeType.DEEMED,
    "established": 1973,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 253,
    "max_rank": 3183,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-45.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 45 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 48",
    "slug": "west-bengal-institute-of-technology-kolkata-48",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 61,
    "placement_percentage": 90,
    "avg_salary": 974458,
    "type": CollegeType.PRIVATE,
    "established": 1988,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 265,
    "max_rank": 4036,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-48.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 48 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Maharashtra Institute of Technology Mumbai 17",
    "slug": "maharashtra-institute-of-technology-mumbai-17",
    "location": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "city": "Mumbai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 62,
    "placement_percentage": 96,
    "avg_salary": 960341,
    "type": CollegeType.DEEMED,
    "established": 1957,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 144,
    "max_rank": 1295,
    "website": "https://www.maharashtra-institute-of-technology-mumbai-17.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra Institute of Technology Mumbai 17 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Delhi Institute of Technology New Delhi 46",
    "slug": "delhi-institute-of-technology-new-delhi-46",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 64,
    "placement_percentage": 93,
    "avg_salary": 1133518,
    "type": CollegeType.GOVERNMENT,
    "established": 1966,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 158,
    "max_rank": 4057,
    "website": "https://www.delhi-institute-of-technology-new-delhi-46.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi Institute of Technology New Delhi 46 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Gujarat University of Ahmedabad 38",
    "slug": "gujarat-university-of-ahmedabad-38",
    "location": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.4,
    "nirf_rank": 65,
    "placement_percentage": 100,
    "avg_salary": 843722,
    "type": CollegeType.GOVERNMENT,
    "established": 1980,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 493,
    "max_rank": 5069,
    "website": "https://www.gujarat-university-of-ahmedabad-38.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Gujarat University of Ahmedabad 38 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Delhi Institute of Technology New Delhi 18",
    "slug": "delhi-institute-of-technology-new-delhi-18",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 66,
    "placement_percentage": 92,
    "avg_salary": 1166716,
    "type": CollegeType.PRIVATE,
    "established": 1965,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 375,
    "max_rank": 1965,
    "website": "https://www.delhi-institute-of-technology-new-delhi-18.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi Institute of Technology New Delhi 18 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Maharashtra Institute of Technology Mumbai 8",
    "slug": "maharashtra-institute-of-technology-mumbai-8",
    "location": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "city": "Mumbai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.9,
    "nirf_rank": 73,
    "placement_percentage": 100,
    "avg_salary": 936587,
    "type": CollegeType.PRIVATE,
    "established": 1980,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 498,
    "max_rank": 1901,
    "website": "https://www.maharashtra-institute-of-technology-mumbai-8.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra Institute of Technology Mumbai 8 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Coimbatore 36",
    "slug": "tamil-nadu-institute-of-technology-coimbatore-36",
    "location": "Coimbatore, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4,
    "nirf_rank": 75,
    "placement_percentage": 83,
    "avg_salary": 909713,
    "type": CollegeType.GOVERNMENT,
    "established": 1961,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 340,
    "max_rank": 2372,
    "website": "https://www.tamil-nadu-institute-of-technology-coimbatore-36.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Coimbatore 36 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Chennai 4",
    "slug": "tamil-nadu-institute-of-technology-chennai-4",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4,
    "nirf_rank": 76,
    "placement_percentage": 87,
    "avg_salary": 966275,
    "type": CollegeType.GOVERNMENT,
    "established": 1958,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 204,
    "max_rank": 4751,
    "website": "https://www.tamil-nadu-institute-of-technology-chennai-4.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Chennai 4 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Delhi University of New Delhi 5",
    "slug": "delhi-university-of-new-delhi-5",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.7,
    "nirf_rank": 77,
    "placement_percentage": 86,
    "avg_salary": 809640,
    "type": CollegeType.PRIVATE,
    "established": 1952,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 95,
    "max_rank": 4996,
    "website": "https://www.delhi-university-of-new-delhi-5.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi University of New Delhi 5 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Karnataka Institute of Technology Mysuru 7",
    "slug": "karnataka-institute-of-technology-mysuru-7",
    "location": "Mysuru, Karnataka",
    "state": "Karnataka",
    "city": "Mysuru",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.1,
    "nirf_rank": 77,
    "placement_percentage": 81,
    "avg_salary": 1202424,
    "type": CollegeType.GOVERNMENT,
    "established": 1977,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 244,
    "max_rank": 980,
    "website": "https://www.karnataka-institute-of-technology-mysuru-7.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Karnataka Institute of Technology Mysuru 7 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Telangana University of Hyderabad 47",
    "slug": "telangana-university-of-hyderabad-47",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.3,
    "nirf_rank": 77,
    "placement_percentage": 82,
    "avg_salary": 1239118,
    "type": CollegeType.DEEMED,
    "established": 1975,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 409,
    "max_rank": 3138,
    "website": "https://www.telangana-university-of-hyderabad-47.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Telangana University of Hyderabad 47 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Maharashtra Institute of Technology Mumbai 34",
    "slug": "maharashtra-institute-of-technology-mumbai-34",
    "location": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "city": "Mumbai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.2,
    "nirf_rank": 78,
    "placement_percentage": 82,
    "avg_salary": 829571,
    "type": CollegeType.DEEMED,
    "established": 1974,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 456,
    "max_rank": 1951,
    "website": "https://www.maharashtra-institute-of-technology-mumbai-34.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra Institute of Technology Mumbai 34 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Telangana Institute of Technology Hyderabad 39",
    "slug": "telangana-institute-of-technology-hyderabad-39",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 79,
    "placement_percentage": 88,
    "avg_salary": 1002410,
    "type": CollegeType.PRIVATE,
    "established": 1972,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 147,
    "max_rank": 1201,
    "website": "https://www.telangana-institute-of-technology-hyderabad-39.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Telangana Institute of Technology Hyderabad 39 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Maharashtra University of Mumbai 35",
    "slug": "maharashtra-university-of-mumbai-35",
    "location": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "city": "Mumbai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.1,
    "nirf_rank": 80,
    "placement_percentage": 85,
    "avg_salary": 1150061,
    "type": CollegeType.DEEMED,
    "established": 1960,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 455,
    "max_rank": 4432,
    "website": "https://www.maharashtra-university-of-mumbai-35.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra University of Mumbai 35 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Coimbatore 19",
    "slug": "tamil-nadu-institute-of-technology-coimbatore-19",
    "location": "Coimbatore, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.2,
    "nirf_rank": 81,
    "placement_percentage": 94,
    "avg_salary": 878207,
    "type": CollegeType.GOVERNMENT,
    "established": 1981,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 186,
    "max_rank": 4560,
    "website": "https://www.tamil-nadu-institute-of-technology-coimbatore-19.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Coimbatore 19 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 25",
    "slug": "west-bengal-institute-of-technology-kolkata-25",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.4,
    "nirf_rank": 82,
    "placement_percentage": 89,
    "avg_salary": 993632,
    "type": CollegeType.DEEMED,
    "established": 1991,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 349,
    "max_rank": 3676,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-25.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 25 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Telangana University of Hyderabad 32",
    "slug": "telangana-university-of-hyderabad-32",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4,
    "nirf_rank": 83,
    "placement_percentage": 88,
    "avg_salary": 1205946,
    "type": CollegeType.PRIVATE,
    "established": 1975,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 184,
    "max_rank": 4593,
    "website": "https://www.telangana-university-of-hyderabad-32.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Telangana University of Hyderabad 32 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Uttar Pradesh Institute of Technology Noida 49",
    "slug": "uttar-pradesh-institute-of-technology-noida-49",
    "location": "Noida, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Noida",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.5,
    "nirf_rank": 83,
    "placement_percentage": 80,
    "avg_salary": 1052818,
    "type": CollegeType.PRIVATE,
    "established": 1958,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 24,
    "max_rank": 4892,
    "website": "https://www.uttar-pradesh-institute-of-technology-noida-49.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Uttar Pradesh Institute of Technology Noida 49 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "R.V. College of Engineering",
    "slug": "rvce-bangalore",
    "location": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "city": "Bengaluru",
    "fees_min": 90000,
    "fees_max": 180000,
    "rating": 4.2,
    "nirf_rank": 85,
    "placement_percentage": 97,
    "avg_salary": 1050000,
    "type": CollegeType.PRIVATE,
    "established": 1954,
    "accreditation": "NAAC A++",
    "exam": [
      "KCET",
      "COMEDK"
    ],
    "min_rank": 327,
    "max_rank": 2929,
    "website": "https://www.rvce-bangalore.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "R.V. College of Engineering is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 180000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 170000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal Institute of Technology Kolkata 21",
    "slug": "west-bengal-institute-of-technology-kolkata-21",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.7,
    "nirf_rank": 85,
    "placement_percentage": 99,
    "avg_salary": 965626,
    "type": CollegeType.PRIVATE,
    "established": 1972,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 249,
    "max_rank": 3594,
    "website": "https://www.west-bengal-institute-of-technology-kolkata-21.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal Institute of Technology Kolkata 21 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Gujarat Institute of Technology Surat 37",
    "slug": "gujarat-institute-of-technology-surat-37",
    "location": "Surat, Gujarat",
    "state": "Gujarat",
    "city": "Surat",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.3,
    "nirf_rank": 85,
    "placement_percentage": 85,
    "avg_salary": 1083376,
    "type": CollegeType.DEEMED,
    "established": 1975,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 483,
    "max_rank": 2336,
    "website": "https://www.gujarat-institute-of-technology-surat-37.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Gujarat Institute of Technology Surat 37 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Chennai 23",
    "slug": "tamil-nadu-institute-of-technology-chennai-23",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 88,
    "placement_percentage": 83,
    "avg_salary": 1145351,
    "type": CollegeType.DEEMED,
    "established": 2000,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 66,
    "max_rank": 524,
    "website": "https://www.tamil-nadu-institute-of-technology-chennai-23.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Chennai 23 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Coimbatore 28",
    "slug": "tamil-nadu-institute-of-technology-coimbatore-28",
    "location": "Coimbatore, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.1,
    "nirf_rank": 88,
    "placement_percentage": 94,
    "avg_salary": 1271627,
    "type": CollegeType.GOVERNMENT,
    "established": 1962,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 271,
    "max_rank": 2049,
    "website": "https://www.tamil-nadu-institute-of-technology-coimbatore-28.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Coimbatore 28 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Uttar Pradesh University of Lucknow 3",
    "slug": "uttar-pradesh-university-of-lucknow-3",
    "location": "Lucknow, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.2,
    "nirf_rank": 89,
    "placement_percentage": 90,
    "avg_salary": 812417,
    "type": CollegeType.DEEMED,
    "established": 1974,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 425,
    "max_rank": 1420,
    "website": "https://www.uttar-pradesh-university-of-lucknow-3.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Uttar Pradesh University of Lucknow 3 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Gujarat Institute of Technology Ahmedabad 12",
    "slug": "gujarat-institute-of-technology-ahmedabad-12",
    "location": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.2,
    "nirf_rank": 89,
    "placement_percentage": 94,
    "avg_salary": 1287419,
    "type": CollegeType.GOVERNMENT,
    "established": 1963,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 334,
    "max_rank": 792,
    "website": "https://www.gujarat-institute-of-technology-ahmedabad-12.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Gujarat Institute of Technology Ahmedabad 12 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Gujarat Institute of Technology Surat 13",
    "slug": "gujarat-institute-of-technology-surat-13",
    "location": "Surat, Gujarat",
    "state": "Gujarat",
    "city": "Surat",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.2,
    "nirf_rank": 90,
    "placement_percentage": 81,
    "avg_salary": 1144007,
    "type": CollegeType.GOVERNMENT,
    "established": 1981,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 155,
    "max_rank": 3024,
    "website": "https://www.gujarat-institute-of-technology-surat-13.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Gujarat Institute of Technology Surat 13 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Maharashtra Institute of Technology Nagpur 20",
    "slug": "maharashtra-institute-of-technology-nagpur-20",
    "location": "Nagpur, Maharashtra",
    "state": "Maharashtra",
    "city": "Nagpur",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4,
    "nirf_rank": 90,
    "placement_percentage": 98,
    "avg_salary": 897596,
    "type": CollegeType.GOVERNMENT,
    "established": 1950,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 153,
    "max_rank": 4822,
    "website": "https://www.maharashtra-institute-of-technology-nagpur-20.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Maharashtra Institute of Technology Nagpur 20 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "West Bengal University of Kolkata 10",
    "slug": "west-bengal-university-of-kolkata-10",
    "location": "Kolkata, West Bengal",
    "state": "West Bengal",
    "city": "Kolkata",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.9,
    "nirf_rank": 91,
    "placement_percentage": 84,
    "avg_salary": 1289010,
    "type": CollegeType.GOVERNMENT,
    "established": 1966,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 242,
    "max_rank": 3864,
    "website": "https://www.west-bengal-university-of-kolkata-10.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "West Bengal University of Kolkata 10 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Delhi Institute of Technology New Delhi 51",
    "slug": "delhi-institute-of-technology-new-delhi-51",
    "location": "New Delhi, Delhi",
    "state": "Delhi",
    "city": "New Delhi",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.8,
    "nirf_rank": 92,
    "placement_percentage": 99,
    "avg_salary": 966908,
    "type": CollegeType.GOVERNMENT,
    "established": 1950,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 100,
    "max_rank": 3325,
    "website": "https://www.delhi-institute-of-technology-new-delhi-51.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Delhi Institute of Technology New Delhi 51 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Karnataka University of Mysuru 43",
    "slug": "karnataka-university-of-mysuru-43",
    "location": "Mysuru, Karnataka",
    "state": "Karnataka",
    "city": "Mysuru",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 93,
    "placement_percentage": 87,
    "avg_salary": 907318,
    "type": CollegeType.GOVERNMENT,
    "established": 1976,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 200,
    "max_rank": 3058,
    "website": "https://www.karnataka-university-of-mysuru-43.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Karnataka University of Mysuru 43 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Coimbatore 40",
    "slug": "tamil-nadu-institute-of-technology-coimbatore-40",
    "location": "Coimbatore, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.3,
    "nirf_rank": 94,
    "placement_percentage": 88,
    "avg_salary": 942709,
    "type": CollegeType.GOVERNMENT,
    "established": 1979,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 80,
    "max_rank": 1278,
    "website": "https://www.tamil-nadu-institute-of-technology-coimbatore-40.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Coimbatore 40 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Karnataka University of Mysuru 2",
    "slug": "karnataka-university-of-mysuru-2",
    "location": "Mysuru, Karnataka",
    "state": "Karnataka",
    "city": "Mysuru",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 95,
    "placement_percentage": 93,
    "avg_salary": 1054949,
    "type": CollegeType.PRIVATE,
    "established": 1970,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 304,
    "max_rank": 2789,
    "website": "https://www.karnataka-university-of-mysuru-2.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Karnataka University of Mysuru 2 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Tamil Nadu University of Chennai 52",
    "slug": "tamil-nadu-university-of-chennai-52",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.9,
    "nirf_rank": 95,
    "placement_percentage": 90,
    "avg_salary": 840915,
    "type": CollegeType.DEEMED,
    "established": 1967,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 214,
    "max_rank": 4507,
    "website": "https://www.tamil-nadu-university-of-chennai-52.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu University of Chennai 52 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Telangana Institute of Technology Hyderabad 26",
    "slug": "telangana-institute-of-technology-hyderabad-26",
    "location": "Hyderabad, Telangana",
    "state": "Telangana",
    "city": "Hyderabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.7,
    "nirf_rank": 97,
    "placement_percentage": 83,
    "avg_salary": 1258280,
    "type": CollegeType.PRIVATE,
    "established": 1993,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 263,
    "max_rank": 5499,
    "website": "https://www.telangana-institute-of-technology-hyderabad-26.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Telangana Institute of Technology Hyderabad 26 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Tamil Nadu University of Chennai 41",
    "slug": "tamil-nadu-university-of-chennai-41",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 4.5,
    "nirf_rank": 97,
    "placement_percentage": 100,
    "avg_salary": 1208988,
    "type": CollegeType.GOVERNMENT,
    "established": 1998,
    "accreditation": "NAAC A++",
    "exam": [
      "CUET"
    ],
    "min_rank": 476,
    "max_rank": 834,
    "website": "https://www.tamil-nadu-university-of-chennai-41.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu University of Chennai 41 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Sc Physics",
        "duration": "3 years",
        "fees": 100000,
        "seats": 60
      },
      {
        "name": "BBA",
        "duration": "3 years",
        "fees": 150000,
        "seats": 120
      }
    ]
  },
  {
    "name": "Tamil Nadu Institute of Technology Chennai 1",
    "slug": "tamil-nadu-institute-of-technology-chennai-1",
    "location": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.6,
    "nirf_rank": 98,
    "placement_percentage": 84,
    "avg_salary": 1249075,
    "type": CollegeType.PRIVATE,
    "established": 1979,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 206,
    "max_rank": 1542,
    "website": "https://www.tamil-nadu-institute-of-technology-chennai-1.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Tamil Nadu Institute of Technology Chennai 1 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  },
  {
    "name": "Gujarat Institute of Technology Ahmedabad 22",
    "slug": "gujarat-institute-of-technology-ahmedabad-22",
    "location": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "fees_min": 100000,
    "fees_max": 300000,
    "rating": 3.9,
    "nirf_rank": 98,
    "placement_percentage": 90,
    "avg_salary": 1037685,
    "type": CollegeType.PRIVATE,
    "established": 1981,
    "accreditation": "NAAC A++",
    "exam": [
      "JEE Main",
      "State CET"
    ],
    "min_rank": 298,
    "max_rank": 1620,
    "website": "https://www.gujarat-institute-of-technology-ahmedabad-22.ac.in",
    "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "description": "Gujarat Institute of Technology Ahmedabad 22 is one of the premier institutions in India.",
    "courses": [
      {
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "fees": 300000,
        "seats": 120
      },
      {
        "name": "B.Tech Electronics",
        "duration": "4 years",
        "fees": 290000,
        "seats": 90
      }
    ]
  }
];

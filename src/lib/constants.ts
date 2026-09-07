export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  iconName: string;
  features: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Founder {
  name: string;
  role: string;
  credentials: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  responsibilities: string[];
  specializations: string[];
}

export interface WorkshopPlan {
  id: string;
  title: string;
  audience: "School" | "College";
  duration: string;
  tagline: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export const SITE_CONFIG = {
  name: "AVP FutureTech",
  tagline: "Learn. Innovate. Transform.",
  heroHeading: "Empowering Rural Minds with Tomorrow's Technology",
  heroSubheadline:
    "Bringing world-class AI, IoT, Robotics, Automation, and STEM education to school students (Grades 1–10) and college learners in rural India — bridging the opportunity gap with hands-on, metro-level exposure.",
  mission:
    "To create a powerful learning platform that identifies and nurtures rural talent through early exposure to AI, IoT, Robotics, STEM and Automation — guiding students to explore, research and innovate using practical, real-world learning.",
  vision:
    "A future where every student from rural India has equal access to futuristic technology education as students in metro cities — not by comparison, but by building equal-footing opportunities, taking rural communities to global levels through education, research and innovation.",
  contact: {
    address: "Nirmiti Lakshminarayan Tower, Kudal, Sindhudurg, Maharashtra – 416520",
    phoneNumbers: ["+91 7517238914", "+91 7744001079"],
    email: "contact@avpfuturetech.com",
    website: "www.avpfuturetech.com",
    googleMapsQuery: "Nirmiti+Lakshminarayan+Tower+Kudal+Sindhudurg+Maharashtra",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/avpfuturetech",
    instagram: "https://www.instagram.com/avpfuturetech",
    facebook: "https://www.facebook.com/avpfuturetech",
    youtube: "https://www.youtube.com/@avpfuturetech",
  },
  logos: {
    color: "/logos/logo.png",
    white: "/logos/white-logo.png",
  },
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Company", href: "/our-company" },
  { label: "Workshops", href: "/workshops" },
  { label: "Internships", href: "/internships" },
  { label: "Gallery", href: "/gallery" },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "school",
    title: "School Solution",
    subtitle: "Grades 1–10 STEM & AI Ecosystem",
    description:
      "Smart school lab setup, comprehensive curriculum aligned with NEP 2020 / CBSE / ATL AIM guidelines, and engaging hands-on workshops for Grades 1–10.",
    href: "/school",
    iconName: "GraduationCap",
    features: [
      "100% Practical Activity-Based Curriculum",
      "Full Alignment with NEP 2020 & ATL AIM",
      "Custom Robotics & Electronics Lab Setup",
      "Grade-Specific Learning Roadmaps (1–10)",
      "Teacher Empowerment & Annual Mentorship",
    ],
  },
  {
    id: "college",
    title: "College Solution",
    subtitle: "Advanced Industry-Aligned Tech",
    description:
      "Advanced tech exposure, industry-aligned real-world projects, and skill-building programs for engineering and science undergraduates.",
    href: "/college",
    iconName: "Cpu",
    features: [
      "Microcontroller & Embedded Systems (ESP32 / ARM)",
      "Applied IoT, Cloud Telemetry & Smart Automation",
      "Machine Learning Edge Inference & Computer Vision",
      "Mini-Hackathons & Capstone Project Guidance",
      "Industry-Recognized Technical Certification",
    ],
  },
  {
    id: "internship",
    title: "Internship Program",
    subtitle: "Real-World Project Internships",
    description:
      "Project-based internships in AI, IoT, and Robotics giving students direct exposure to industry workflows, hardware fabrication, and software logic.",
    href: "/internship",
    iconName: "Rocket",
    features: [
      "Production-Grade Hardware & Code Development",
      "1-on-1 Mentorship from Core R&D Engineers",
      "Build Tangible Portfolio Capstone Projects",
      "Verifiable Completion & Excellence Certificates",
      "Fast-Track Interview Prep for Tech Roles",
    ],
  },
  {
    id: "kits",
    title: "Robotics Kits",
    subtitle: "Student-Friendly Hardware Kits",
    description:
      "High-quality, durable Robotics & IoT kits supply tailored for students and school labs to build functional prototypes with ease and safety.",
    href: "/kits",
    iconName: "Boxes",
    features: [
      "Modular Plug-and-Play Sensor & Actuator Packs",
      "Solderless, Safe Design for Young Innovators",
      "Detailed Step-by-Step Project Guides & Schematics",
      "Includes Chassis, Wheels, Controllers & Cables",
      "Compatible with Block-Coding and Python/C++",
    ],
  },
];

export const RECENT_NEWS: NewsItem[] = [
  {
    id: "sindhudurg-partnership",
    title: "AVP FutureTech Partners with Sindhudurg Schools to Launch AI & STEM Labs",
    date: "August 2026",
    category: "Partnerships",
    excerpt:
      "Expanding rural reach: Over 12 schools in Konkan have initiated student-centered STEM labs equipped with hands-on robotics and sensor modules.",
    image: "/images/stem_lab_setup.jpg",
    href: "/school",
  },
  {
    id: "workshop-enrollment",
    title: "New 3-Day Robotics & AI Innovation Workshop Open for Institutional Batches",
    date: "August 2026",
    category: "Workshops",
    excerpt:
      "An intensive experiential workshop series featuring autonomous line-followers, obstacle sensors, and smart IoT telemetry for students.",
    image: "/images/robotics_workshop_students.jpg",
    href: "/workshops",
  },
  {
    id: "student-exhibition",
    title: "Rural Student Innovators Showcase Smart City IoT Prototypes at Regional Expo",
    date: "July 2026",
    category: "Student Showcase",
    excerpt:
      "Young creators trained under AVP FutureTech demonstrated smart agricultural sensors and automated streetlights to wide administrative acclaim.",
    image: "/images/school_event_exhibition.jpg",
    href: "/gallery",
  },
  {
    id: "stem-kits-launch",
    title: "Custom High-Grade Robotics & IoT Learning Kits Made Available for Rural Schools",
    date: "July 2026",
    category: "Hardware Innovation",
    excerpt:
      "Engineered locally to withstand classroom handling while enabling 30+ experiential experiments from basic electronics to connected IoT.",
    image: "/images/ai_waste_classifier.jpg",
    href: "/kits",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Who are AVP FutureTech's programs designed for?",
    answer:
      "Our core school programs are specially designed for school students from Grades 1 through 10, with graded curricula suitable for each age band (Junior, Middle, and Senior levels). Additionally, we offer advanced workshop and project internship tracks specifically formulated for college students in polytechnic, engineering, and computer science streams.",
  },
  {
    question: "What workshop durations and pricing tiers are offered?",
    answer:
      "For schools, we offer two popular tiers: a 2-Day Workshop ('Deeper learning. More builds.') at ₹299 per student, and a 3-Day Workshop ('Build. Innovate. Showcase.') at ₹399 per student. For colleges, we offer a 2-Day intensive workshop at ₹499 per student and a comprehensive 3-Day workshop at ₹599 per student. All sessions include hands-on hardware usage and official certificates.",
  },
  {
    question: "How does the curriculum align with NEP 2020, CBSE, and Atal Tinkering Labs (ATL)?",
    answer:
      "Our curriculum is fully aligned with the National Education Policy (NEP 2020) mandates for experiential coding and STEM skills, as well as CBSE skill subject guidelines and the Atal Innovation Mission (AIM) ATL benchmarks. We prioritize 100% practical, project-based activity learning where students solve real-world problems.",
  },
  {
    question: "How can our school partner with AVP FutureTech?",
    answer:
      "We follow a collaborative 4-step approach: 1) We understand your school's unique academic goals and infrastructure; 2) We conduct an on-site survey and readiness analysis; 3) We design a customized STEM/Robotics implementation plan; and 4) We implement the lab, deliver student workshops, train teachers, and provide year-round technical support.",
  },
  {
    question: "Can our school get assistance in securing government grants or setting up an ATL lab?",
    answer:
      "Yes! AVP FutureTech assists eligible schools with complete advisory, documentation guidance, grant paperwork, and compliance for Atal Tinkering Labs (ATL) under NITI Aayog as well as state and CSR-supported educational innovation funds.",
  },
  {
    question: "How can students or institutions acquire AVP FutureTech Robotics & IoT Kits?",
    answer:
      "Institutions and individual students can order kits directly through our website or by contacting our team. We supply both beginner-friendly plug-and-play kits for schools and advanced programmable IoT kits for college capstones, backed by component warranties and video tutorials.",
  },
  {
    question: "How do we contact support or schedule a free demo session?",
    answer:
      "You can submit an inquiry via our contact form, send an email to contact@avpfuturetech.com, or call our founders directly at +91 7517238914 or +91 7744001079. We will gladly arrange an on-campus demonstration or virtual discovery call.",
  },
];

export const FOUNDERS: Founder[] = [
  {
    name: "Avishkar Kamble",
    role: "Co-Founder",
    credentials: "AI & ML Graduate | MBA in Data Science & Business Analytics",
    phone: "+91 7517238914",
    email: "avishkar@avpfuturetech.com",
    image: "/images/avishkar_kamble.jpg",
    bio: "Passionate about democratizing futuristic technology education in rural communities, Avishkar blends machine learning expertise with strategic educational administration to build impactful, scalable STEM curricula and institutional alliances.",
    responsibilities: [
      "Curriculum Design & Content Strategy",
      "Government Schemes & Grants Advisory",
      "Administration & Institutional Operations",
      "School Partnerships & Strategic Relations",
      "Project Design & Impact Implementation",
    ],
    specializations: [
      "AI/ML Education & Curriculum Development",
      "Data-Driven Program Planning",
      "Educational Policy & Grant Advisory",
      "Academic Operations & Compliance",
    ],
  },
  {
    name: "Vaishnav Kubade",
    role: "Co-Founder",
    credentials: "AI & ML Graduate",
    phone: "+91 7744001079",
    email: "vaishnav@avpfuturetech.com",
    image: "/images/vaishnav_kubade.jpg",
    bio: "Driving the technology core of AVP FutureTech, Vaishnav spearheads hardware-software synergy, student kit prototyping, robotics architecture, and technical workshops that transform complex robotics into intuitive, hands-on learning.",
    responsibilities: [
      "Technical Leadership & Systems Architecture",
      "Research & Development (R&D)",
      "Hardware Product & Prototype Development",
      "Sales & Marketing Strategy",
      "Technology Integration & Lab Support",
    ],
    specializations: [
      "AI, IoT & Robotics Technologies",
      "System Architecture & Development",
      "R&D and Rapid Prototyping",
      "Automation & Smart Embedded Solutions",
      "Market Research & Technical Strategy",
    ],
  },
  {
    name: "Prathmesh Narvekar",
    role: "Co-Founder",
    credentials: "Computer Engineering Graduate",
    phone: "+91 7744001079",
    email: "prathmesh@avpfuturetech.com",
    image: "/images/prathmesh_narvekar.jpg",
    bio: "A dedicated computer engineer and educator, Prathmesh focuses on interactive training delivery, student engagement, school relations, and empowering every child with the confidence to code and build functional innovations.",
    responsibilities: [
      "Interactive Content Delivery & Training",
      "Client Handling & School Support",
      "Relationship Management & Community Outreach",
      "Business Development & Regional Expansion",
      "Program Coordination & Live Execution",
    ],
    specializations: [
      "EdTech Training & Content Delivery",
      "Communication & Client Relations",
      "Business Growth & Outreach Strategy",
      "Student Engagement & Youth Mentorship",
      "Program Management & Event Execution",
    ],
  },
];

export const WORKSHOPS_DATA: {
  school: WorkshopPlan[];
  college: WorkshopPlan[];
} = {
  school: [
    {
      id: "school-2day",
      title: "2-Day School Workshop",
      audience: "School",
      duration: "2 Days (8 Hours Total)",
      tagline: "Deeper learning. More builds.",
      price: "₹299",
      priceUnit: "per student",
      description:
        "An intensive, hands-on introduction to sensor science, robotics mechanisms, and algorithmic problem-solving for Grades 1–10.",
      features: [
        "Hands-on robotics hardware & sensor interfacing",
        "Building 2+ working electronic and robotic prototypes",
        "Introduction to computational thinking & block coding",
        "Printed student activity workbook & project schematics",
        "Verified Certificate of Participation for every student",
        "Dedicated mentor support per student group",
      ],
      highlight: false,
    },
    {
      id: "school-3day",
      title: "3-Day School Workshop",
      audience: "School",
      duration: "3 Days (12 Hours Total)",
      tagline: "Build. Innovate. Showcase.",
      price: "₹399",
      priceUnit: "per student",
      description:
        "Our flagship immersive workshop culminating in an interactive robotics exhibition and mini-hackathon showcase.",
      features: [
        "Everything in the 2-Day workshop plus autonomous systems",
        "Obstacle-avoidance, light-seeking, or smart IoT model build",
        "Team-based Mini Innovation Hackathon on Day 3",
        "Campus-wide Student Project Exhibition & Live Demo",
        "Medals & Certificates of Merit for winning projects",
        "Take-home digital resource kit & project blueprints",
      ],
      highlight: true,
    },
  ],
  college: [
    {
      id: "college-2day",
      title: "2-Day College Bootcamp",
      audience: "College",
      duration: "2 Days (12 Hours Total)",
      tagline: "Hardware Interfacing & Telemetry",
      price: "₹499",
      priceUnit: "per student",
      description:
        "Bridging theoretical engineering with practical microcontrollers, real sensor telemetry, and cloud dashboard integration.",
      features: [
        "Programming ESP32 & Arduino microcontrollers in C++/Python",
        "Cloud MQTT / HTTP telemetry & real-time sensor dashboards",
        "Interfacing motor drivers, ultrasonic, temperature & PIR sensors",
        "Comprehensive code repositories and circuit schematics",
        "Official Certificate of Technical Completion",
        "Direct eligibility for AVP FutureTech Internship interviews",
      ],
      highlight: false,
    },
    {
      id: "college-3day",
      title: "3-Day College Flagship",
      audience: "College",
      duration: "3 Days (18 Hours Total)",
      tagline: "Applied AI, Computer Vision & Smart IoT",
      price: "₹599",
      priceUnit: "per student",
      description:
        "Advanced hands-on workshop focused on real-world edge AI, computer vision classifiers, and smart automated robotics.",
      features: [
        "Everything in 2-Day Bootcamp plus Edge AI & Computer Vision",
        "Object detection & camera stream processing for smart robotics",
        "End-to-end smart automation prototype deployment",
        "Mini Capstone competition evaluated by technical founders",
        "Excellence Certificate & recommendation letter for top teams",
        "Direct fast-track entry into our Research & Dev Internship",
      ],
      highlight: true,
    },
  ],
};

export const OTHER_SCHOOL_SOLUTIONS = [
  {
    title: "Smart School Lab Setup",
    badge: "Turnkey Infrastructure",
    description:
      "End-to-end modern lab design featuring dedicated electronics workstations, safety grounding, component storage, robotics tables, and 3D design tools.",
    icon: "Layers",
    benefits: [
      "Custom layout design tailored to classroom dimensions",
      "Durable, student-safe electrical and mechanical benches",
      "Essential testing tools, soldering stations & component racks",
      "Year-round hardware warranty and spare parts support",
    ],
  },
  {
    title: "Support in Securing Government Grants & Labs",
    badge: "Grants & ATL Advisory",
    description:
      "Comprehensive advisory and paperwork assistance for schools seeking Atal Tinkering Lab (ATL) grants under NITI Aayog or State Innovation Funds.",
    icon: "FileCheck",
    benefits: [
      "School eligibility evaluation & compliance audit",
      "Detailed proposal drafting and documentation assistance",
      "Guidance through portal submissions and equipment lists",
      "Post-grant lab execution and compliance reporting",
    ],
  },
  {
    title: "Robotics & IoT Kits Supply",
    badge: "Institutional Hardware",
    description:
      "Reliable, bulk supply of high-grade student-friendly hardware kits, sensors, motors, and microcontrollers engineered for heavy classroom usage.",
    icon: "PackageCheck",
    benefits: [
      "Classroom packs optimized for 2–3 students per bench",
      "Plug-and-play modular design to prevent component damage",
      "Accompanying bilingual laboratory manuals (English & Marathi)",
      "Rapid replacements for consumable and wear-and-tear items",
    ],
  },
];

export const GALLERY_ITEMS = [
  {
    id: "gallery-1",
    title: "Experiential Robotics Workshop",
    category: "Workshops",
    description: "Students building and wiring autonomous sensor-based vehicles.",
    image: "/images/hero_robotics_ai.jpg",
  },
  {
    id: "gallery-2",
    title: "Assembling Robotic Chassis",
    category: "Workshops",
    description: "Young innovators learning mechanical assembly and gear ratios.",
    image: "/images/robotics_workshop_students.jpg",
  },
  {
    id: "gallery-3",
    title: "Modern Rural STEM Lab Setup",
    category: "Smart Labs",
    description: "Dedicated electronics and IoT workstation setup in Sindhudurg.",
    image: "/images/stem_lab_setup.jpg",
  },
  {
    id: "gallery-4",
    title: "School Innovation Showcase & Expo",
    category: "Exhibitions",
    description: "Students demonstrating functional smart prototypes to visitors and parents.",
    image: "/images/school_event_exhibition.jpg",
  },
  {
    id: "gallery-5",
    title: "Smart IoT Street Light Prototype",
    category: "Student Projects",
    description: "Energy-efficient automated lighting system built by school students.",
    image: "/images/smart_street_light_iot.jpg",
  },
  {
    id: "gallery-6",
    title: "AI Smart Waste Classifier Demo",
    category: "Student Projects",
    description: "AI camera-based waste segregation model built using edge computer vision.",
    image: "/images/ai_waste_classifier.jpg",
  },
  {
    id: "gallery-7",
    title: "Block Coding & Sensor Programming",
    category: "Workshops",
    description: "Grades 5–8 students writing their first sensor response algorithms.",
    image: "/images/ai_coding_kids.jpg",
  },
  {
    id: "gallery-8",
    title: "AVP FutureTech Hands-on Learning Tour",
    category: "Exhibitions",
    description: "Connecting rural talent with futuristic technology education across regions.",
    image: "/images/workshop-banner.png",
  },
];

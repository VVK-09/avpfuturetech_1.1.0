import { NextResponse } from "next/server";

export interface TechFact {
  id: string;
  category: "ai" | "robotics" | "iot" | "computing" | "space" | "quantum";
  categoryLabel: string;
  title: string;
  fact: string;
  stemImpact: string;
  yearOrMetric?: string;
  source: string;
  interactiveChallenge?: string;
}

export const TECH_FACTS: TechFact[] = [
  {
    id: "tf-1",
    category: "iot",
    categoryLabel: "IoT & Microcontrollers",
    title: "More Power than Apollo 11",
    fact: "The tiny $4 ESP32 microcontroller that rural school students use in our IoT labs has over 200 times more computing power and 1,000 times more RAM than the Apollo 11 computer that landed humans on the Moon in 1969.",
    stemImpact: "Micro-computing is now democratized — rural learners can build satellite-grade sensor networks right in their classrooms.",
    yearOrMetric: "240 MHz Dual-Core vs 2.048 MHz",
    source: "NASA & Espressif Systems Archives",
    interactiveChallenge: "How many sensor signals can one ESP32 process simultaneously? (Over 30 GPIO channels!)",
  },
  {
    id: "tf-2",
    category: "ai",
    categoryLabel: "Artificial Intelligence",
    title: "The Birth of the Word 'Algorithm'",
    fact: "The word 'algorithm' stems from the 9th-century mathematician Muhammad ibn Musa al-Khwarizmi, whose pioneering algebra texts laid the foundations for modern computer science and neural network training mathematics.",
    stemImpact: "Algorithms aren't just modern software — they are timeless problem-solving frameworks taught from Grade 1 onwards.",
    yearOrMetric: "Circa 825 AD",
    source: "Computer History Museum",
    interactiveChallenge: "Can you name 3 algorithms you use daily? (Sorting playlists, GPS navigation, and web search!)",
  },
  {
    id: "tf-3",
    category: "robotics",
    categoryLabel: "Robotics & Automation",
    title: "Origin of the Word 'Robot'",
    fact: "The word 'Robot' was introduced in 1920 by Czech playwright Karel Čapek in his science-fiction play 'R.U.R.', derived from the Slavic word 'robota' meaning 'forced labor or drudgery'. Today, robots liberate humans from dangerous tasks.",
    stemImpact: "Robotics shifts from science-fiction to practical rural automation: agricultural weeding, smart irrigation, and automated surveillance.",
    yearOrMetric: "1920",
    source: "Oxford English Dictionary",
    interactiveChallenge: "What is the 3-law rule of robotics introduced by Isaac Asimov in 1942?",
  },
  {
    id: "tf-4",
    category: "computing",
    categoryLabel: "Computer Science",
    title: "The First Real Computer Bug Was a Moth",
    fact: "On September 9, 1947, computer pioneer Grace Hopper and her team found an actual moth trapped between relays in the Harvard Mark II computer. They taped it in their logbook with the entry: 'First actual case of bug being found.'",
    stemImpact: "Debugging is the most vital skill in coding — transforming unexpected errors into scientific discoveries.",
    yearOrMetric: "1947",
    source: "Smithsonian National Museum of American History",
    interactiveChallenge: "Why do programmers call code fixes 'patches'? (Early computers used physical paper tape patches!)",
  },
  {
    id: "tf-5",
    category: "ai",
    categoryLabel: "Neural Networks",
    title: "100 Trillion Synaptic Connections",
    fact: "The human brain contains roughly 86 billion neurons and 100 trillion synaptic connections, consuming only ~20 watts of power — less than a dim lightbulb. State-of-the-art AI networks like Transformers are designed to emulate this deep associative capability.",
    stemImpact: "Neuromorphic and Edge AI chips let low-power robotics make instant autonomous decisions without cloud latency.",
    yearOrMetric: "~20 Watts Power",
    source: "MIT Technology Review & Nature Neuroscience",
    interactiveChallenge: "How much power does a supercomputer AI cluster consume compared to the human brain? (Millions of watts!)",
  },
  {
    id: "tf-6",
    category: "iot",
    categoryLabel: "Smart Sensors & IoT",
    title: "15 Billion Connected Devices Worldwide",
    fact: "Over 15.1 billion active IoT devices currently monitor soil moisture, factory lines, weather patterns, and urban grids globally. By 2030, estimates predict over 30 billion interconnected smart nodes.",
    stemImpact: "Students learning sensor interfacing today will architect tomorrow's smart agricultural ecosystems across Maharashtra & India.",
    yearOrMetric: "15.1+ Billion Nodes",
    source: "IoT Analytics Global Report",
    interactiveChallenge: "What wireless protocol sends IoT sensor data across 10 km on battery power? (LoRaWAN!)",
  },
  {
    id: "tf-7",
    category: "computing",
    categoryLabel: "Silicon & Hardware",
    title: "19 Billion Transistors on a Fingernail",
    fact: "Modern 3-nanometer silicon chips can pack over 19 billion transistors into an area smaller than a postage stamp. A single transistor switch in these chips is merely a dozen silicon atoms wide.",
    stemImpact: "Understanding how semiconductors process logic gates empowers young minds to move from consumers of tech to chip designers.",
    yearOrMetric: "3 Nanometer Fabrication",
    source: "IEEE Spectrum",
    interactiveChallenge: "What famous law predicted that transistor density would double roughly every 2 years? (Moore's Law!)",
  },
  {
    id: "tf-8",
    category: "space",
    categoryLabel: "Space & Robotics",
    title: "Perseverance Rover: Edge AI on Mars",
    fact: "NASA's Perseverance Mars Rover uses AutoNav (autonomous hazard detection with computer vision) to drive up to 200 meters per sol across rugged Martian terrain without waiting for radio signals from Earth, which take 5 to 20 minutes.",
    stemImpact: "Autonomous line and obstacle tracking in school robotics is the exact foundation for planetary exploration rovers.",
    yearOrMetric: "225M km from Earth",
    source: "NASA Jet Propulsion Laboratory (JPL)",
    interactiveChallenge: "Why can't engineers joystick-drive Mars rovers in real time? (Speed of light signal delay!)",
  },
  {
    id: "tf-9",
    category: "quantum",
    categoryLabel: "Quantum Computing",
    title: "Superposition: Computing in Parallel Realities",
    fact: "Unlike classical computer bits that must be strictly 0 or 1, quantum qubits can exist in a superposition of both states simultaneously. A 300-qubit quantum processor could represent more numbers simultaneously than there are atoms in the observable universe.",
    stemImpact: "Quantum logic teaches students probabilistic thinking, cryptography, and complex molecule simulation.",
    yearOrMetric: "2^300 States",
    source: "IBM Quantum & Nature Physics",
    interactiveChallenge: "What quantum phenomenon did Einstein famously call 'spooky action at a distance'? (Quantum Entanglement!)",
  },
  {
    id: "tf-10",
    category: "robotics",
    categoryLabel: "Robotics & Vision",
    title: "60 Frames Per Second: Machine Vision",
    fact: "Open-source Computer Vision algorithms like YOLO (You Only Look Once) can detect, classify, and track 80+ distinct physical objects in video streams in under 15 milliseconds on edge hardware.",
    stemImpact: "In our hands-on workshops, rural students train custom vision models to detect crop diseases and sort recyclables.",
    yearOrMetric: "< 15 ms Latency",
    source: "OpenCV.org & Ultralytics Research",
    interactiveChallenge: "How do self-driving cars calculate distance using two camera sensors? (Stereoscopic parallax depth!)",
  },
  {
    id: "tf-11",
    category: "computing",
    categoryLabel: "Programming Languages",
    title: "Python Named After Monty Python",
    fact: "Python creator Guido van Rossum named the language in 1989 after the British comedy troupe 'Monty Python's Flying Circus' because he wanted the language to be fun, accessible, and readable rather than painfully formal.",
    stemImpact: "Python's English-like syntax enables school students as young as Grade 5 to code robotics, games, and neural networks effortlessly.",
    yearOrMetric: "Created 1989",
    source: "Python Software Foundation",
    interactiveChallenge: "What is the standard name for Python's package index where 500,000+ open-source libraries live? (PyPI!)",
  },
  {
    id: "tf-12",
    category: "iot",
    categoryLabel: "Environmental Sensors",
    title: "Barometric Pressure Can Predict Weather 12 Hours Ahead",
    fact: "A sudden drop of just 3 to 4 millibars (hPa) in barometric pressure over a 3-hour span signals an approaching low-pressure storm front. Digital sensors like the BMP280 can detect pressure changes as tiny as 0.01 hPa — equivalent to lifting the sensor by 10 centimeters!",
    stemImpact: "Rural students build automated weather stations that alert local farmers before unseasonal rainfall occurs.",
    yearOrMetric: "±0.01 hPa Precision",
    source: "World Meteorological Organization",
    interactiveChallenge: "What unit of pressure equals 100 Pascals? (1 Hectopascal or 1 Millibar!)",
  }
];

export interface TechNewsItem {
  id: string;
  title: string;
  url?: string;
  source: string;
  category: string;
  timeAgo: string;
  points?: number;
}

const FALLBACK_TECH_NEWS: TechNewsItem[] = [
  {
    id: "tn-1",
    title: "Next-Gen Edge AI: 3nm Neuromorphic Chips Enable Real-Time Vision on Sub-5W Drones",
    source: "IEEE Spectrum",
    category: "AI & Hardware",
    timeAgo: "1h ago",
    url: "https://spectrum.ieee.org"
  },
  {
    id: "tn-2",
    title: "Open-Source RISC-V Architecture Surges Past 10 Billion Embedded Cores Worldwide",
    source: "RISC-V International",
    category: "Semiconductors",
    timeAgo: "2h ago",
    url: "https://riscv.org"
  },
  {
    id: "tn-3",
    title: "Autonomous RAG Agents & Local LLMs Transform Enterprise Engineering Workflows",
    source: "Hacker News",
    category: "Software Engineering",
    timeAgo: "3h ago",
    url: "https://news.ycombinator.com"
  },
  {
    id: "tn-4",
    title: "Quantum Supercomputing: 1,000-Qubit Processor Simulates Complex Molecule Bonding",
    source: "Nature Physics",
    category: "Quantum",
    timeAgo: "4h ago",
    url: "https://nature.com"
  },
  {
    id: "tn-5",
    title: "WebAssembly 3.0 Finalized: Ultra-Low Latency C++ and Rust Execution in All Browsers",
    source: "W3C Standards",
    category: "Web Tech",
    timeAgo: "5h ago",
    url: "https://webassembly.org"
  },
  {
    id: "tn-6",
    title: "ISRO & Space Agencies Deploy Edge AI for Real-Time Satellite Earth Observation",
    source: "ISRO News",
    category: "Space & AI",
    timeAgo: "6h ago",
    url: "https://isro.gov.in"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const random = searchParams.get("random");
  const fetchNews = searchParams.get("news") !== "false";

  let filtered = TECH_FACTS;
  if (category && category !== "all") {
    filtered = TECH_FACTS.filter((f) => f.category === category);
    if (filtered.length === 0) filtered = TECH_FACTS;
  }

  // Live Tech News from Free Public API (HackerNews / Dev.to)
  let liveNews: TechNewsItem[] = FALLBACK_TECH_NEWS;
  if (fetchNews) {
    try {
      // Fetch top tech stories from Hacker News official free JSON API (5 stories) with 2.5s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const topStoriesRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
        signal: controller.signal,
        next: { revalidate: 300 } // cache for 5 minutes
      });

      if (topStoriesRes.ok) {
        const storyIds: number[] = await topStoriesRes.json();
        const top5Ids = (storyIds || []).slice(0, 5);

        const storyPromises = top5Ids.map(async (id) => {
          const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
            signal: controller.signal,
            next: { revalidate: 300 }
          });
          if (itemRes.ok) {
            return itemRes.json();
          }
          return null;
        });

        const fetchedStories = await Promise.all(storyPromises);
        clearTimeout(timeoutId);

        const parsedNews: TechNewsItem[] = fetchedStories
          .filter((s) => s && s.title)
          .map((s) => {
            const timeDiffHours = Math.max(1, Math.floor((Date.now() / 1000 - s.time) / 3600));
            return {
              id: `hn-${s.id}`,
              title: s.title,
              url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
              source: "Hacker News",
              category: s.score > 200 ? "Trending" : "Tech News",
              timeAgo: `${timeDiffHours}h ago`,
              points: s.score || 0
            };
          });

        if (parsedNews.length > 0) {
          liveNews = parsedNews;
        }
      } else {
        clearTimeout(timeoutId);
      }
    } catch {
      // Use FALLBACK_TECH_NEWS seamlessly if network is slow/offline
      liveNews = FALLBACK_TECH_NEWS;
    }
  }

  // Also try to optionally pull a fresh random general fact from open API for live variability
  let externalFact: string | null = null;
  if (random === "true") {
    try {
      const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en", {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.text) {
          externalFact = data.text;
        }
      }
    } catch {
      // Gracefully fall back
    }
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const selectedFact = filtered[randomIndex];

  return NextResponse.json({
    fact: selectedFact,
    allFacts: TECH_FACTS,
    news: liveNews,
    totalCount: filtered.length,
    allCategories: [
      { id: "all", label: "All Topics" },
      { id: "ai", label: "AI & ML" },
      { id: "robotics", label: "Robotics" },
      { id: "iot", label: "IoT & Sensors" },
      { id: "computing", label: "Code & Silicon" },
      { id: "space", label: "Space & Auto" },
      { id: "quantum", label: "Quantum" },
    ],
    externalFact,
  });
}

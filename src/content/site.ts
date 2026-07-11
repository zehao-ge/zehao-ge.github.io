export type NavItem = { label: string; href: string };
export type LinkItem = { label: string; href: string; todo?: string };
export type EntityLink = { label: string; href: string; todo?: string };
export type NewsItem = { date: string; text: string };
export type WorkImage = {
  path: string;
  publicPath: string;
  alt: string;
  width: number;
  height: number;
  recommendedSize: string;
  source: string;
};
export type WorkItem = {
  number: string;
  title: string;
  year: string;
  context: string;
  status?: string;
  description: string;
  images: readonly WorkImage[];
  imageCaption?: string;
  links: readonly LinkItem[];
};
export type WorkGroup = { heading: string; items: readonly WorkItem[] };
export type ExperienceItem = {
  organization: string;
  role: string;
  dates: string;
  summary?: string;
  bullets: readonly string[];
  more?: readonly string[];
};
export type EducationItem = {
  institution: string;
  degree: string;
  dates: string;
  detail?: string;
};
export type SkillGroup = { label: string; items: readonly string[] };

const workImage = (
  path: string,
  alt: string,
  source: string,
  recommendedSize = "1120 × 630",
): WorkImage => ({
  path: `/media/work/${path}`,
  publicPath: `public/media/work/${path}`,
  alt,
  width: recommendedSize === "560 × 315" ? 560 : 1120,
  height: recommendedSize === "560 × 315" ? 315 : 630,
  recommendedSize,
  source,
});

export const site = {
  identity: {
    name: "Ge Zehao",
    displayName: "Ge Zehao 「葛泽豪」",
    title: "Ge Zehao — Embodied AI & Robot Learning",
    description:
      "Ge Zehao builds interfaces for robot teleoperation, embodied AI, and production cockpits, and will join UW Robotics in fall 2026.",
    canonical: "https://example.com/TODO-replace-canonical-production-URL",
    email: "thehowge88@gmail.com",
    affiliation: "Tsinghua University Future Laboratory",
    alumniOf: "South China University of Technology",
    degree: "Bachelor's degree in Product Design",
    incomingInstitution: "University of Washington",
    incomingProgram: "M.S. in Technology Innovation (Robotics)",
    lastModified: "2026-07-12",
  },
  ui: {
    skip: "Skip to content",
    primaryNavigation: "Primary navigation",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    lightMode: "Use light mode",
    darkMode: "Use dark mode",
    toggleTheme: "Toggle color theme",
    themeGlyphLight: "◐",
    themeGlyphDark: "☀",
    cv: "CV",
    showMore: "Show more ›",
    showLess: "Show less",
    copyEmail: "Copy email address",
    copied: "Copied",
    linkSeparator: "|",
    imagePlaceholder: "Image pending",
    portraitPlaceholder: "TODO: add portrait.webp",
    conceptCaption: "Concept visualization",
    xiaomiCaption: "Image: Xiaomi",
    projectPage: "Project page ›",
    officialPage: "Official page ›",
    todoLink: "TODO: add link",
    todoMarker: "TODO",
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Publications", href: "#publications" },
    { label: "Experience", href: "#experience" },
    { label: "Awards", href: "#awards" },
    { label: "Contact", href: "#contact" },
  ] satisfies readonly NavItem[],
  entities: [
    { label: "M.S. in Technology Innovation (Robotics)", href: "", todo: "TODO: verify https://gix.uw.edu" },
    { label: "South China University of Technology", href: "", todo: "TODO: add SCUT URL" },
    { label: "Tsinghua University", href: "", todo: "TODO: add Tsinghua University URL" },
    { label: "Future Laboratory", href: "", todo: "TODO: add Future Laboratory URL" },
    { label: "University of Washington", href: "https://www.washington.edu" },
    { label: "Zhejiang University", href: "", todo: "TODO: add Zhejiang University URL" },
    { label: "Xiaomi Skynomad", href: "https://www.xiaomiev.com/skynomad" },
    { label: "Xiaomi EV", href: "https://www.xiaomiev.com" },
    { label: "Midea Group", href: "", todo: "TODO: add Midea Group URL" },
    { label: "Siemens China", href: "", todo: "TODO: add Siemens China URL" },
    { label: "iF Design Award", href: "", todo: "TODO: add iF Design Award URL" },
    { label: "SO-ARM 101", href: "", todo: "TODO: add SO-ARM 101 URL" },
    { label: "OpenArm", href: "", todo: "TODO: add OpenArm URL" },
    { label: "LeRobot", href: "", todo: "TODO: add LeRobot URL" },
    { label: "SCUT", href: "", todo: "TODO: add SCUT URL" },
  ] satisfies readonly EntityLink[],
  header: {
    portrait: {
      path: "/media/portrait.webp",
      publicPath: "public/media/portrait.webp",
      alt: "Portrait of Ge Zehao",
      width: 400,
      height: 400,
      recommendedSize: "400 × 400",
      source: "new photo (owner)",
    },
    heading: "Ge Zehao 「葛泽豪」",
    bio:
      "For four years I have been building new ways for people to control machines — sEMG input bands, spatial interfaces, steering wheels and cockpit systems for production cars. Now I build them for robots. I am a research assistant at the Future Laboratory, Tsinghua University, where I design foot-operated locomotion interfaces for omnidirectional mobile bases: when both hands are occupied teleoperating dual arms, how should the operator drive the robot's body? I study how interface design shapes demonstration quality — and the policies learned from it. Before research, I spent two years at Xiaomi EV engineering cockpit human–machine interfaces. I received my Bachelor's degree in Product Design from South China University of Technology. In fall 2026 I will join the M.S. in Technology Innovation (Robotics) program at the University of Washington.",
    interests: "Embodied AI · Robot Learning · Human–Robot Interaction · Mobile Manipulation",
    links: [
      { label: "CV", href: "/cv/GeZehao_CV.pdf" },
      { label: "Email", href: "mailto:thehowge88@gmail.com" },
      { label: "Google Scholar", href: "", todo: "TODO: add Google Scholar URL" },
      { label: "GitHub", href: "", todo: "TODO: add GitHub URL" },
      { label: "LinkedIn", href: "", todo: "TODO: add LinkedIn URL" },
      { label: "Design Portfolio", href: "https://gezehao.webflow.io/" },
    ] satisfies readonly LinkItem[],
  },
  news: {
    heading: "News",
    items: [
      { date: "2026", text: "Admitted to the M.S. in Technology Innovation (Robotics), University of Washington. TODO: exact month" },
      { date: "06/2026", text: "Joined the Future Laboratory at Tsinghua University as a research assistant in embodied AI and human–robot interaction." },
      { date: "06/2026", text: "Completed two years at Xiaomi EV; cockpit HMI shipped on the Skynomad and YU7 platforms." },
      { date: "04/2025", text: "Paper on AI-driven manufacturing systems published in Frontiers in Artificial Intelligence and Applications (EI Compendex)." },
      { date: "2025", text: "Excellent Graduation Thesis, university level, SCUT." },
      { date: "2024", text: "iF Design Award, Top 300 worldwide." },
    ] satisfies readonly NewsItem[],
    // add entries as work progresses.
  },
  work: {
    heading: "Selected Work",
    framing: "One question, many machines: how should a person tell a machine what to do?",
    groups: [
      {
        heading: "Interfaces",
        items: [
          {
            number: "1",
            title: "Foot-Operated Locomotion Interface for Whole-Body Teleoperation",
            year: "2026",
            context: "Research",
            status: "In development — physical prototype expected Sept 2026",
            description:
              "A foot-operated interface for omnidirectional mobile bases — foot-to-robot motion mapping, shared control, velocity control, haptic feedback — so an operator can drive the robot continuously while both hands run dual-arm teleoperation. I study its effect on teleoperation fluency, operational safety, and demonstration quality.",
            images: [
              workImage("foot-interface-1.webp", "Foot-operated locomotion interface concept visualization", "owner's desktop: ~/Desktop/GPT images/Frame 4.png"),
              workImage("foot-interface-2.webp", "Foot-operated locomotion interface concept detail", "owner's desktop: ~/Desktop/GPT images/Frame 5.png", "560 × 315"),
              workImage("foot-interface-3.webp", "Foot-operated locomotion interface concept detail", "owner's desktop: ~/Desktop/GPT images/Frame 6.png", "560 × 315"),
            ],
            imageCaption: "Concept visualization",
            links: [],
            // replace with prototype photos in Sept 2026, then remove caption.
          },
          {
            number: "2",
            title: "Folding Steering Wheel for Autonomous Driving — Xiaomi EV",
            year: "2024–2026",
            context: "Industry",
            status: "Research project",
            description:
              "A folding steering wheel and input-system study for high-autonomy driving: when the car drives itself, what happens to the driver's controls? Explored stowable input geometry and mode-transition interaction for a future vehicle platform.",
            images: [workImage("folding-wheel.webp", "Folding steering wheel project", "old site /untitled/xiaomi-sw")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/xiaomi-sw" }],
          },
          {
            number: "3",
            title: "Neuroware — sEMG Spatial Interaction Input Device",
            year: "2024",
            context: "Independent",
            description:
              "A wearable input device using surface electromyography to turn forearm muscle activity into a control signal for spatial interaction — sensing, hardware, and interaction mapping designed end to end.",
            images: [workImage("neuroware.webp", "Neuroware sEMG spatial interaction input device", "old site /untitled/neuroware")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/neuroware" }],
          },
          {
            number: "4",
            title: "Neuro UI — Spatial Interaction Interface System",
            year: "2024",
            context: "Independent",
            description: "The software counterpart to Neuroware: an interface system for controller-free spatial interaction.",
            images: [workImage("neuro-ui.webp", "Neuro UI spatial interaction interface system", "old site /untitled/neuro-ui")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/neuro-ui" }],
          },
          {
            number: "5",
            title: "Spatial Interaction Input for 3D Transportation Systems",
            year: "2024–2025",
            context: "Academic",
            status: "Capstone",
            description:
              "A capstone on spatial-computing input interfaces for 3D transportation scenarios — how operators express intent in volumetric space.",
            images: [workImage("spatial-capstone.webp", "Spatial interaction input capstone", "owner (no public page)")],
            links: [],
          },
        ],
      },
      {
        heading: "Robots & AI",
        items: [
          {
            number: "6",
            title: "End-to-End Imitation Learning on Real Hardware",
            year: "2026",
            context: "Research",
            status: "Built",
            description:
              "A complete pipeline on SO-ARM 101, OpenArm, a mecanum-wheel mobile base, and LeRobot: calibration, leader–follower teleoperation, demonstration collection, ACT policy training, real-robot evaluation.",
            images: [workImage("pipeline.webp", "End-to-end imitation learning hardware pipeline", "new photo of rig (owner)")],
            links: [],
          },
          {
            number: "7",
            title: "Generative AI for Industrial Design — Xiaomi",
            year: "2024–2025",
            context: "Industry",
            description:
              "Data curation and classification for an industrial-design foundation model, with foundational study of CNNs and Transformers.",
            images: [workImage("xiaomi-ai.webp", "Generative AI for industrial design project", "old site /untitled/xiaomi-ai")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/xiaomi-ai" }],
          },
          {
            number: "8",
            title: "Seb — Modular Robotic Vacuum Cleaner",
            year: "2023",
            context: "Independent",
            description: "A modular robotic vacuum system designed around reconfigurable functional units.",
            images: [workImage("seb.webp", "Seb modular robotic vacuum cleaner", "old site /untitled/seb")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/seb" }],
          },
        ],
      },
      {
        heading: "Products & Engineering",
        items: [
          {
            number: "9",
            title: "Skynomad Smart Cockpit — Xiaomi EV",
            year: "2025–2026",
            context: "Industry",
            status: "Shipped",
            description:
              "Smart-cockpit engineering for the Xiaomi Skynomad, released 2026 — translating styling and HMI concepts into mass-producible, human-centered structures.",
            images: [workImage("skynomad.webp", "Xiaomi Skynomad smart cockpit", "xiaomiev.com/skynomad (credit Image: Xiaomi)")],
            imageCaption: "Image: Xiaomi",
            links: [{ label: "Official page ›", href: "https://www.xiaomiev.com/skynomad" }],
          },
          {
            number: "10",
            title: "HyperVision Panoramic Display — Xiaomi YU7",
            year: "2025",
            context: "Industry",
            status: "Shipped",
            description:
              "Collaborated with engineering teams and suppliers to bring the HyperVision panoramic cockpit display into mass production.",
            images: [workImage("yu7-hypervision.webp", "Xiaomi YU7 HyperVision panoramic display", "Xiaomi official (credit)")],
            imageCaption: "Image: Xiaomi",
            links: [{ label: "Official page ›", href: "", todo: "TODO: add Xiaomi YU7 official page" }],
          },
          {
            number: "11",
            title: "Functional Air Duct System — Xiaomi SU7 Ultra",
            year: "2025",
            context: "Industry",
            status: "Shipped",
            description: "Engineering delivery of the functional front air-duct system on the SU7 Ultra.",
            images: [workImage("su7-duct.webp", "Xiaomi SU7 Ultra functional front air-duct system", "Xiaomi official (credit)")],
            imageCaption: "Image: Xiaomi",
            links: [{ label: "Official page ›", href: "", todo: "TODO: add Xiaomi SU7 Ultra official page" }],
          },
          {
            number: "12",
            title: "1㎡ Integrated Cooking Center — Midea",
            year: "2024",
            context: "Sponsored",
            description:
              "An integrated cooking appliance with pure-electric internal circulation for Gen-Z users, developed with Midea Group; led user research, structure, and appearance design; reached market.",
            images: [workImage("midea.webp", "Midea integrated cooking center", "old site /untitled/midea")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/midea" }],
          },
          {
            number: "13",
            title: "Parageta — Parametric Structural Optimization in Footwear",
            year: "2023",
            context: "Independent",
            description:
              "Parametric footwear as a structural-optimization study in Fusion 360 generative design, grounded in East Asian formal language.",
            images: [workImage("parageta.webp", "Parageta parametric footwear study", "old site /untitled/parageta")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/parageta" }],
          },
          {
            number: "14",
            title: "AGILE CHARGE — Mobile Charging Infrastructure",
            year: "2024",
            context: "Independent",
            description:
              "An autonomous charging vehicle proposed as mobile charging infrastructure; UNESCO SDG certification (09).",
            images: [workImage("agile-charge.webp", "AGILE CHARGE mobile charging infrastructure", "old site /untitled/agile-charge")],
            links: [{ label: "Project page ›", href: "https://gezehao.webflow.io/untitled/agile-charge" }],
          },
        ],
      },
    ] satisfies readonly WorkGroup[],
    portfolio: {
      label: "Full design portfolio ›",
      href: "https://gezehao.webflow.io/",
      caption: "More projects — product design, spatial computing, and interaction research.",
    },
  },
  publications: {
    heading: "Publications",
    article: {
      title: "Application and Challenges of Artificial Intelligence-Driven Manufacturing Systems in Production Line Automation",
      author: "Ge Zehao",
      authorNote: "(independent author)",
      venue: "Frontiers in Artificial Intelligence and Applications (FAIA), Vol. 405, 2025 — EI Compendex indexed",
      datePublished: "2025-04",
      links: [
        { label: "pdf", href: "", todo: "TODO: add publication PDF URL" },
        { label: "publisher", href: "", todo: "TODO: add publication publisher URL" },
      ],
    },
    patent: {
      label: "Patent",
      title: "Anti-collision device for drone flight — utility model, first inventor.",
    },
    // robotics work to be added on submission.
  },
  experience: {
    heading: "Experience",
    items: [
      {
        organization: "Tsinghua University, Future Laboratory",
        role: "Research Assistant, Embodied AI & HRI",
        dates: "Jun 2026 – Sept 2026 (expected)",
        bullets: [
          "Investigating locomotion intent expression in dual-arm teleoperation: how non-hand interaction modalities influence teleoperation fluency, operational safety, demonstration quality, and downstream policy learning.",
          "Designing and prototyping a foot-operated omnidirectional locomotion interface for whole-body teleoperation.",
          "Built an end-to-end robot imitation learning pipeline: calibration → leader–follower teleoperation → demonstration collection → ACT policy training → real-robot evaluation.",
          "Goal: a working physical prototype of the foot-operated locomotion interface by September 2026.",
        ],
      },
      {
        organization: "Xiaomi EV, Shanghai HQ",
        role: "Industrial Design Intern → Studio Engineer Intern → Studio Engineer (full-time from Jul 2025)",
        dates: "Oct 2024 – Jun 2026",
        summary:
          "Led and contributed to cockpit development across two vehicle programs — the Skynomad smart cockpit (shipped 2026) and the Mann (Xiaomi YU9) platform, spanning instrument panel & CCB, console, seats, and roof & pillars — resolving ~2,500 engineering issues and translating styling and HMI concepts into mass-producible, human-centered structures.",
        bullets: [
          "Smart-cockpit engineering for the Xiaomi Skynomad, shipped 2026.",
          "Led end-to-end engineering of the YU9 instrument panel system — ergonomic layout and interaction mapping for the panoramic HUD and center display.",
          "Owned the studio's AI, HCI, and coding work; co-developed a multimodal-LLM-driven vehicle styling complexity evaluation system with Zhejiang University.",
        ],
        more: [
          "Shipped the Lemans (Xiaomi YU7) HyperVision Panoramic Display System into production; benchmarked cockpit HMI of the BMW X5, Mercedes-Benz S-Class, and NIO ET9.",
          "Engineering delivery of the functional front air-duct system on the SU7 Ultra; cockpit audio and front-cabin benchmarking for the Modena (SU7) platform.",
          "CNSL: owned the X/Z dimension chain for upper-console hand-reach space and side-panel part breakdown (788 issues resolved).",
          "Seats: PLP layout, massage system integration, front/rear airbag packaging, headrest RNC layout (685 issues closed).",
          "Roof & pillars: independently led design-to-engineering delivery, including A/B/C-pillar interaction buttons and ambient lighting logic.",
          "Data curation for an industrial-design foundation model; initial study of CNNs and Transformers.",
        ],
        // TODO(owner): verify the division of work between Skynomad and YU9, and that naming the YU9 program publicly is acceptable.
      },
      {
        organization: "Midea Group, Shunde HQ",
        role: "Team Lead & Product Manager, School–Enterprise Program",
        dates: "Mar 2024 – Sep 2024",
        bullets: [
          "Co-developed an integrated cooking center with pure-electric internal circulation for Gen-Z users; coordinated design, engineering, marketing, and operations; the product reached market.",
        ],
      },
      {
        organization: "Siemens China",
        role: "Industrial Design Intern",
        dates: "Jun 2022 – Sep 2022",
        bullets: [
          "Trained on Siemens electrical control technology and the S7-1500 PLC; studied the design of household electrical control circuits and automatic control.",
        ],
      },
    ] satisfies readonly ExperienceItem[],
  },
  education: {
    heading: "Education",
    items: [
      {
        institution: "University of Washington",
        degree: "M.S. in Technology Innovation (Robotics)",
        dates: "Incoming, Fall 2026",
      },
      {
        institution: "South China University of Technology (SCUT)",
        degree: "Bachelor's degree in Product Design",
        dates: "Sep 2021 – Jul 2025",
        detail: "GPA 3.77 / 4.0 (87.19 / 100) · Excellent Graduation Thesis (university level)",
      },
    ] satisfies readonly EducationItem[],
  },
  awards: {
    heading: "Honors & awards",
    items: [
      ["Excellent Graduation Thesis (University Level), SCUT", "2025"],
      ["New York Product Design Awards, Silver", "2025"],
      ["TITAN Innovation Awards, Gold & Silver", "2025"],
      ["iF Design Award, Top 300 worldwide", "2024"],
      ["International Design Awards, Gold & Silver", "2024"],
      ["New York Product Design Awards, Gold", "2024"],
      ["TITAN Innovation Awards, Silver", "2024"],
      ["Midea Group University–Enterprise Cooperation Competition, Gold", "2024"],
    ] as const,
  },
  skills: {
    heading: "Skills",
    groups: [
      { label: "Robotics & embodied AI", items: ["LeRobot", "ACT", "Teleoperation", "Mobile manipulation", "Robot calibration"] },
      { label: "Machine learning", items: ["PyTorch", "Transformers", "CNNs / RNNs", "Data analysis"] },
      { label: "Programming", items: ["Python", "C", "JavaScript", "Ubuntu", "Git"] },
      { label: "Vehicle engineering", items: ["Cockpit engineering", "HMI", "Packaging", "Ergonomics", "Feasibility analysis"] },
      { label: "CAD & prototyping", items: ["SolidWorks", "CATIA", "3DE", "Rhino (Grasshopper)", "Unity"] },
      { label: "Certificates", items: ["IBM Data Science", "Google IT Automation with Python", "Siemens Applied CFD"] },
    ] satisfies readonly SkillGroup[],
  },
  contact: {
    heading: "Get in touch",
    lede: "Open to research collaborations and graduate opportunities in embodied AI and human–robot interaction.",
    profiles: [
      { label: "GitHub", href: "", todo: "TODO: add GitHub URL" },
      { label: "Google Scholar", href: "", todo: "TODO: add Google Scholar URL" },
      { label: "LinkedIn", href: "", todo: "TODO: add LinkedIn URL" },
    ] satisfies readonly LinkItem[],
    footer: "© 2026 Ge Zehao · Last updated July 2026",
  },
  todos: [
    "TODO: add exact month for the 2026 University of Washington admission news item",
    "TODO: verify the M.S. in Technology Innovation (Robotics) URL: https://gix.uw.edu",
    "TODO: add Future Laboratory URL",
    "TODO: add Tsinghua University URL",
    "TODO: add SCUT URL",
    "TODO: add Zhejiang University URL",
    "TODO: add Midea Group URL",
    "TODO: add Siemens China URL",
    "TODO: add LeRobot URL",
    "TODO: add SO-ARM 101 URL",
    "TODO: add OpenArm URL",
    "TODO: add iF Design Award URL",
    "TODO: add publication PDF URL",
    "TODO: add publication publisher URL",
    "TODO: add GitHub URL",
    "TODO: add Google Scholar URL",
    "TODO: add LinkedIn URL",
    "TODO: add Xiaomi YU7 official page",
    "TODO: add Xiaomi SU7 Ultra official page",
    "TODO(owner): verify the division of work between Skynomad and YU9, and that naming the YU9 program publicly is acceptable",
    "TODO: replace public/cv/GeZehao_CV.pdf with a public CV that omits date of birth and phone number and states the degree exactly as Bachelor's degree in Product Design",
    "TODO: replace canonical production URL",
  ],
} as const;

export type SiteContent = typeof site;

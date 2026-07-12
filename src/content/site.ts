export type NavItem = { label: string; href: string };
export type ContactIconName = "email" | "cv" | "scholar" | "github" | "linkedin";
export type LinkItem = { label: string; href: string; todo?: string; icon?: ContactIconName };
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
export type WorkDetailImage = {
  path: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  attribution?: string;
};
export type WorkDetailFact = {
  label: string;
  value: string;
};
export type WorkDetailVideo = {
  embedUrl: string;
  title: string;
  linkLabel: string;
  linkHref: string;
};
export type WorkDetail = {
  body?: readonly string[];
  facts?: readonly WorkDetailFact[];
  images: readonly WorkDetailImage[];
  video?: WorkDetailVideo;
  relatedLinks?: readonly LinkItem[];
  externalLinks?: readonly LinkItem[];
  todo?: string;
  status?: string;
};
export type WorkItem = {
  slug: string;
  number: string;
  title: string;
  year: string;
  context: string;
  status?: string;
  description: string;
  image: WorkImage;
  imageCaption?: string;
  detail: WorkDetail;
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
): WorkImage => ({
  path: `/media/work/${path}`,
  publicPath: `public/media/work/${path}`,
  alt,
  width: 1120,
  height: 630,
  recommendedSize: "1120 × 630",
  source,
});

const detailImage = (
  slug: string,
  file: string,
  alt: string,
  caption: string,
  width = 1600,
  height = 600,
  attribution?: string,
): WorkDetailImage => ({
  path: `/media/work/${slug}/${file}.webp`,
  alt,
  width,
  height,
  caption,
  attribution,
});

const detailInPreparation = "Detail page in preparation.";

export const site = {
  identity: {
    name: "Zehao Ge",
    navWordmark: "Zehao Ge",
    preferredName: "Kai Ge",
    givenName: "Zehao",
    familyName: "Ge",
    chineseName: "葛泽昊",
    displayName: "Zehao (Kai) Ge 「葛泽昊」",
    title: "Zehao (Kai) Ge — Embodied AI & Robot Learning",
    description:
      "Zehao Ge builds interfaces for robot teleoperation, embodied AI, and production cockpits, and will join UW Robotics in fall 2026.",
    canonical: "https://zehao-ge.github.io",
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
    menuOpen: "Open menu",
    menuClose: "Close menu",
    lightMode: "Use light mode",
    darkMode: "Use dark mode",
    toggleTheme: "Toggle color theme",
    connect: "Connect",
    getInTouch: "Get in touch",
    home: "Home",
    homeHref: "/#top",
    nameToggleToChinese: "Show Chinese name",
    nameToggleToEnglish: "Show English name",
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
    detail: {
      backToWork: "← Work",
      workHref: "/#work",
      viewProject: "View project ›",
      factsHeading: "Project facts",
      galleryHeading: "Project gallery",
      externalLinksHeading: "External links",
      projectNavigation: "Project navigation",
      previousProject: "Previous project",
      nextProject: "Next project",
      titleSeparator: " — ",
    },
  },
  navigation: [
    { label: "Work", href: "/#work" },
    { label: "Publications", href: "/#publications" },
    { label: "Experience", href: "/#experience" },
    { label: "Awards", href: "/#awards" },
  ] satisfies readonly NavItem[],
  entities: [
    { label: "M.S. in Technology Innovation (Robotics)", href: "https://gix.uw.edu/graduate/msti/robotics-track" },
    { label: "South China University of Technology", href: "https://www.scut.edu.cn/en/main.htm" },
    { label: "Tsinghua University", href: "https://www.tsinghua.edu.cn/en/" },
    { label: "Future Laboratory", href: "https://thfl.tsinghua.edu.cn/en/" },
    { label: "University of Washington", href: "https://www.washington.edu" },
    { label: "Zhejiang University", href: "https://www.zju.edu.cn/english/" },
    { label: "Xiaomi Skynomad", href: "https://www.xiaomiev.com/skynomad" },
    { label: "Xiaomi EV", href: "https://www.xiaomiev.com/" },
    { label: "Midea Group", href: "https://www.midea.com.cn/en" },
    { label: "Siemens China", href: "https://www.siemens.com/en-us/company/" },
    { label: "iF Design Award", href: "https://ifdesign.com/en" },
    { label: "New York Product Design Awards", href: "https://nydesignawards.com/" },
    { label: "TITAN Innovation Awards", href: "https://titaninnovationawards.com/" },
    { label: "International Design Awards", href: "https://www.idesignawards.com/" },
    { label: "SO-ARM 101", href: "https://github.com/TheRobotStudio/SO-ARM100" },
    { label: "OpenArm", href: "https://openarm.dev/" },
    { label: "LeRobot", href: "https://github.com/huggingface/lerobot" },
    { label: "SCUT", href: "https://www.scut.edu.cn/en/main.htm" },
  ] satisfies readonly EntityLink[],
  header: {
    portrait: {
      path: "/media/portrait.webp",
      publicPath: "public/media/portrait.webp",
      alt: "Portrait of Zehao Ge",
      width: 400,
      height: 400,
      recommendedSize: "400 × 400",
      source: "owner-supplied photo: ~/Desktop/personal/d8d7a0edfdab8a9ba60dd85e03750d3e.jpg",
    },
    heading: "Zehao (Kai) Ge",
    bio: [
      "I go by Kai. I am a research assistant at the Future Laboratory, Tsinghua University, working on embodied AI and human–robot interaction.",
      "Before research, I spent two years at Xiaomi EV engineering cockpit human–machine interfaces, shipping HMI on the SU7, YU7, and Skynomad platforms.",
      "I received my bachelor's degree in Product Design from South China University of Technology. In fall 2026 I will join the M.S. in Technology Innovation (Robotics) at the University of Washington.",
    ],
    statements: [
      {
        label: "Through-line:",
        text: "For four years I have been building new ways for people to control machines — sEMG input bands, spatial interfaces, steering wheels and cockpit systems for production cars. Now I build them for robots.",
      },
      {
        label: "Research Interest:",
        text: "Embodied AI, robot learning, human–robot interaction, mobile manipulation.",
      },
    ],
    links: [
      { label: "Email", href: "mailto:thehowge88@gmail.com", icon: "email" },
      { label: "Scholar", href: "https://scholar.google.com/citations?user=RiJNvesAAAAJ", icon: "scholar" },
      { label: "GitHub", href: "https://github.com/zehao-ge", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/zehao-ge-7a7a88296/", icon: "linkedin" },
    ] satisfies readonly LinkItem[],
  },
  news: {
    heading: "News",
    items: [
      { date: "2026", text: "Admitted to the M.S. in Technology Innovation (Robotics), University of Washington. Starting September 2026." },
      { date: "06/2026", text: "Joined the Future Laboratory at Tsinghua University as a research assistant in embodied AI and human–robot interaction." },
      { date: "06/2026", text: "Completed two years at Xiaomi EV; cockpit HMI shipped on the SU7, YU7, and Skynomad platforms." },
      { date: "04/2025", text: "Paper on AI-driven intelligent manufacturing systems published in Frontiers in Artificial Intelligence and Applications (EI Compendex)." },
      { date: "2025", text: "Excellent Graduation Thesis, university level, SCUT." },
      { date: "2024", text: "iF Design Award, Top 300 worldwide." },
    ] satisfies readonly NewsItem[],
    // add entries as work progresses.
  },
  work: {
    heading: "Selected Work",
    framing: "Interfaces are downstream of architecture. I work from the bottom up.",
    groups: [
      {
        heading: "Interfaces",
        items: [
          {
            slug: "foot-interface",
            number: "1",
            title: "Foot-Operated Locomotion Interface for Whole-Body Teleoperation",
            year: "2026",
            context: "Research",
            status: "In development — physical prototype expected Sept 2026",
            description:
              "A foot-operated interface for omnidirectional mobile bases — foot-to-robot motion mapping, shared control, velocity control, haptic feedback — so an operator can drive the robot continuously while both hands run dual-arm teleoperation. I study its effect on teleoperation fluency, operational safety, and demonstration quality.",
            image: workImage("foot-interface.webp", "Foot-operated locomotion interface concept visualization", "owner's desktop: ~/Desktop/GPT images/Frame 3.png"),
            imageCaption: "Concept visualization",
            detail: {
              images: [
                detailImage("foot-interface", "01", "Concept visualization of a foot-operated interface controlling a mobile dual-arm robot", "Concept visualization", 1600, 901),
                detailImage("foot-interface", "02", "Concept visualization of foot and arm interfaces controlling a humanoid robot", "Concept visualization", 1600, 901),
                detailImage("foot-interface", "03", "Concept visualization showing the degree-of-freedom mapping for the foot interface", "Concept visualization", 1600, 900),
              ],
            },
            // replace with prototype photos in Sept 2026, then remove caption.
          },
          {
            slug: "folding-wheel",
            number: "2",
            title: "Folding Steering Wheel for Autonomous Driving — Xiaomi EV",
            year: "2024–2026",
            context: "Industry",
            status: "Research project",
            description:
              "A folding steering wheel and input-system study for high-autonomy driving: when the car drives itself, what happens to the driver's controls? Explored stowable input geometry and mode-transition interaction for a future vehicle platform.",
            image: workImage("folding-wheel.webp", "Folding steering wheel concept shown from front and three-quarter views", "owner-supplied image: ~/Desktop/Frame 121.png"),
            detail: {
              images: [],
              status: detailInPreparation,
            },
          },
          {
            slug: "neuroware",
            number: "3",
            title: "Neuroware — sEMG Spatial Interaction Input Device",
            year: "2024",
            context: "Independent",
            description:
              "A wearable input device using surface electromyography to turn forearm muscle activity into a control signal for spatial interaction — sensing, hardware, and interaction mapping designed end to end.",
            image: workImage("neuroware.webp", "Neuroware sEMG spatial interaction input device", "portfolio listing thumbnail /untitled/neuroware"),
            detail: {
              body: ["Neuroware is a sEMG-based spatial interaction input device."],
              facts: [
                { label: "Role", value: "Personal project" },
                { label: "Tools", value: "Unity · Arduino · ESP8266 · sEMG sensors" },
              ],
              images: [
                detailImage("neuroware", "01", "Neuroware project overview and research framing", "Project overview, trend research and dilemma definition"),
                detailImage("neuroware", "02", "Neuroware technology analysis and comparable controller deconstruction", "Technology analysis and comparable-product deconstruction"),
                detailImage("neuroware", "03", "Neuroware engineering principle, functional prototype and motion-data experiments", "Engineering principle, functional prototype and motion-data experiments"),
                detailImage("neuroware", "04", "Neuroware Unity tests for spatial rotation, location and pinch detection", "Unity tests: spatial rotation, spatial location and pinch detection"),
                detailImage("neuroware", "05", "Neuroware prototype development and final product output", "Prototype development and product output"),
                detailImage("neuroware", "06", "Neuroware 3D printing process and exploded assembly", "3D printing process and exploded view"),
                detailImage("neuroware", "07", "Neuroware pressure, sculpting and virtual-object interaction scenarios", "Usage scenarios: pressure, sculpting and virtual-object interaction"),
                detailImage("neuroware", "08", "Neuroware compatibility studies and future interaction scenario", "Compatibility studies and future interaction scenario"),
              ],
            },
          },
          {
            slug: "neuro-ui",
            number: "4",
            title: "Neuro UI — Spatial Interaction Interface System",
            year: "2024",
            context: "Independent",
            description: "The software counterpart to Neuroware: an interface system for controller-free spatial interaction.",
            image: workImage("neuro-ui.webp", "Neuro UI spatial interaction interface system", "portfolio listing thumbnail /untitled/neuro-ui"),
            detail: {
              body: ["Neuro UI is a tactile spatial interaction user interface system based on Neuroware."],
              images: [
                detailImage("neuro-ui", "01", "Neuro UI concept and graphical user interface research", "Interface concept and graphical user-interface research"),
                detailImage("neuro-ui", "02", "Neuro UI spatial interface elements and interaction model", "Interfacial elements: desktop, dock, virtual hand and AI loop"),
                detailImage("neuro-ui", "03", "Neuro UI spatial navigation and object interaction demonstrations", "Spatial navigation and object-interaction demonstrations"),
              ],
            },
          },
          {
            slug: "spatial-capstone",
            number: "5",
            title: "Spatial Interaction Input for 3D Transportation Systems",
            year: "2024–2025",
            context: "Academic",
            status: "Capstone",
            description:
              "A capstone on spatial-computing input interfaces for 3D transportation scenarios — how operators express intent in volumetric space.",
            image: workImage("spatial-capstone.webp", "Spatial computing in a 3D transportation system", "portfolio listing thumbnail; listing card href is #"),
            detail: {
              body: ["A concept project on spatial-computing input interfaces for 3D transportation systems."],
              images: [],
              relatedLinks: [{ label: "Related work: Neuroware — sEMG Spatial Interaction Input Device ›", href: "/work/neuroware" }],
            },
          },
        ],
      },
      {
        heading: "Robots & AI",
        items: [
          {
            slug: "pipeline",
            number: "6",
            title: "End-to-End Imitation Learning on Real Hardware",
            year: "2026",
            context: "Research",
            status: "Built",
            description:
              "A complete pipeline on SO-ARM 101, OpenArm, a mecanum-wheel mobile base, and LeRobot: calibration, leader–follower teleoperation, demonstration collection, ACT policy training, real-robot evaluation.",
            image: workImage("pipeline.webp", "End-to-end imitation learning hardware pipeline", "~/Desktop/Tsinghua/270059ea35579b4d5a2e0f0913366631.jpg"),
            detail: {
              images: [],
              status: detailInPreparation,
            },
          },
          {
            slug: "xiaomi-ai",
            number: "7",
            title: "Generative AI for Industrial Design — Xiaomi",
            year: "2024–2025",
            context: "Industry",
            description:
              "Data curation and classification for an industrial-design foundation model, with foundational study of CNNs and Transformers.",
            image: workImage("xiaomi-ai.webp", "Generative AI for industrial design project", "portfolio listing thumbnail /untitled/xiaomi-ai"),
            detail: {
              body: [
                "During my internship at Xiaomi Automotive, I also contributed to the development of a generative visual model for internal use by the industrial design department.",
                "My responsibilities included: 1. Data preparation (collecting, organizing, labeling, and cleaning image datasets), data augmentation, and splitting data for training. 2. Collaborating with the software engineering team to select the generative model architecture (VAE), conducting initial training, fine-tuning, and optimizing loss functions. 3. Subjectively evaluating the novelty and practicality of designs as a designer, and developing an automatic scoring system based on factors such as aerodynamics and production costs.",
              ],
              images: [
                detailImage("xiaomi-ai", "01", "Front and rear three-quarter vehicle styling outputs from the Xiaomi generative AI project", "Vehicle styling outputs", 1600, 623),
              ],
            },
          },
          {
            slug: "seb",
            number: "8",
            title: "Seb — Modular Robotic Vacuum Cleaner",
            year: "2023",
            context: "Independent",
            description: "A modular robotic vacuum system designed around reconfigurable functional units.",
            image: workImage("seb.webp", "Seb modular robotic vacuum cleaner", "portfolio listing thumbnail /untitled/seb"),
            detail: {
              images: [
                detailImage("seb", "01", "Seb modular robotic vacuum cleaner project overview", "Project overview and product concept", 1007, 712),
                detailImage("seb", "02", "Seb modular robotic vacuum cleaner final renderings", "Final product renderings", 1007, 712),
                detailImage("seb", "03", "Seb robotic vacuum prototype teardown and development", "Prototype teardown and development", 927, 458),
                detailImage("seb", "04", "Seb robotic vacuum internal structure and modular assembly", "Internal structures and modular assembly", 1007, 713),
              ],
            },
          },
        ],
      },
      {
        heading: "Products & Engineering",
        items: [
          {
            slug: "skynomad",
            number: "9",
            title: "Skynomad Smart Cockpit — Xiaomi EV",
            year: "2025–2026",
            context: "Industry",
            status: "Shipped",
            description:
              "Smart-cockpit engineering for the Xiaomi Skynomad, released 2026 — translating styling and HMI concepts into mass-producible, human-centered structures.",
            image: workImage("skynomad.webp", "Xiaomi Skynomad cockpit interior", "~/Desktop/personal/website/78ceda912861c5263ab8a3bb08188de4.jpg (credit Image: Xiaomi)"),
            imageCaption: "Image: Xiaomi",
            detail: {
              images: [],
              video: {
                embedUrl: "https://www.youtube-nocookie.com/embed/95y0YSBQsz4",
                title: "Skynomad smart cockpit video",
                linkLabel: "Watch on YouTube ›",
                linkHref: "https://www.youtube.com/shorts/95y0YSBQsz4",
              },
            },
          },
          {
            slug: "yu7-hypervision",
            number: "10",
            title: "HyperVision Panoramic Display — Xiaomi YU7",
            year: "2025",
            context: "Industry",
            status: "Shipped",
            description:
              "Collaborated with engineering teams and suppliers to bring the HyperVision panoramic cockpit display into mass production.",
            image: workImage("yu7-hypervision.webp", "Xiaomi YU7 HyperVision panoramic display", "~/Desktop/personal/website/512707016_1185639896941152_6825790499007650197_n.jpg (credit Image: Xiaomi)"),
            imageCaption: "Image: Xiaomi",
            detail: {
              images: [
                detailImage("yu7-hypervision", "01", "Xiaomi HyperVision panoramic display across the YU7 cockpit", "Image: Xiaomi", 1270, 540),
                detailImage("yu7-hypervision", "02", "Xiaomi HyperVision panoramic display information-module layouts", "Image: Xiaomi", 1270, 540),
              ],
              video: {
                embedUrl: "https://www.youtube-nocookie.com/embed/lFuceWZUOp4",
                title: "Xiaomi YU7 HyperVision panoramic display video",
                linkLabel: "Watch on YouTube ›",
                linkHref: "https://www.youtube.com/watch?v=lFuceWZUOp4",
              },
            },
          },
          {
            slug: "su7-duct",
            number: "11",
            title: "Functional Air Duct System — Xiaomi SU7 Ultra",
            year: "2025",
            context: "Industry",
            status: "Shipped",
            description: "Engineering delivery of the functional front air-duct system on the SU7 Ultra.",
            image: workImage("su7-duct.webp", "Xiaomi SU7 Ultra functional front air-duct system", "~/Desktop/personal/website/xiaomi-su7-ultra-prototype_100937238.jpg (credit Image: Xiaomi)"),
            imageCaption: "Image: Xiaomi — SU7 Ultra. I engineered the functional front air-duct system.",
            detail: {
              images: [],
              status: detailInPreparation,
            },
          },
          {
            slug: "midea",
            number: "12",
            title: "1㎡ Integrated Cooking Center — Midea",
            year: "2024",
            context: "Sponsored",
            description:
              "An integrated cooking appliance with pure-electric internal circulation for Gen-Z users, developed with Midea Group; led user research, structure, and appearance design; reached market.",
            image: workImage("midea.webp", "Midea integrated cooking center", "portfolio listing thumbnail /untitled/midea"),
            detail: {
              body: ["A brief record of this 7-month project. The project ranked in the top 3 among 10 groups."],
              facts: [
                { label: "Role", value: "Leadership & Project Management · Business Strategy" },
                { label: "Team", value: "10-person team" },
                { label: "Duration", value: "7 months" },
                { label: "Collaborators", value: "Midea Group" },
              ],
              images: [
                detailImage("midea", "01", "Midea integrated cooking center project overview and timeline", "Project overview and timeline"),
                detailImage("midea", "02", "Midea integrated cooking center market research and Gen Z cooking behavior", "Market research and Gen Z cooking behavior"),
                detailImage("midea", "03", "Midea cooking center co-creation, workflow and ergonomics", "Living-environment co-creation, workflow and ergonomics"),
                detailImage("midea", "04", "Midea cooking center internal structure, fluid simulation and functional model", "Internal structure, fluid simulation and functional model"),
                detailImage("midea", "05", "Midea integrated cooking center final output and product details", "Final output and product details"),
              ],
            },
          },
          {
            slug: "parageta",
            number: "13",
            title: "Parageta — Parametric Structural Optimization in Footwear",
            year: "2023",
            context: "Independent",
            description:
              "Parametric footwear as a structural-optimization study in Fusion 360 generative design, grounded in East Asian formal language.",
            image: workImage("parageta.webp", "Parageta parametric footwear study", "portfolio listing thumbnail /untitled/parageta"),
            detail: {
              body: ["Parameterized Footwear Based on Oriental Culture."],
              facts: [
                { label: "Role", value: "Personal project" },
                { label: "Tools", value: "Grasshopper · Fusion 360" },
              ],
              images: [
                detailImage("parageta", "01", "Parageta proposal, market research and brand research", "Proposal, market research and brand research"),
                detailImage("parageta", "02", "Parageta footwear deconstruction and formal reconstruction", "Modern footwear deconstruction and formal reconstruction"),
                detailImage("parageta", "03", "Parageta component deduction and physical prototype", "Component deduction and physical prototype"),
                detailImage("parageta", "04", "Parageta Grasshopper parameterization and Fusion 360 generation", "Grasshopper parameterization and Fusion 360 generation"),
                detailImage("parageta", "05", "Parageta final footwear design output", "Final design output"),
                detailImage("parageta", "06", "Parageta modeling, exploded view and project review", "Modeling, exploded view and project review"),
              ],
            },
          },
          {
            slug: "agile-charge",
            number: "14",
            title: "AGILE CHARGE — Mobile Charging Infrastructure",
            year: "2024",
            context: "Independent",
            description:
              "An autonomous charging vehicle proposed as mobile charging infrastructure; UNESCO SDG certification (09).",
            image: workImage("agile-charge.webp", "AGILE CHARGE mobile charging infrastructure", "portfolio listing thumbnail /untitled/agile-charge"),
            detail: {
              body: ["Flexible EV Charging Infrastructure Service System."],
              facts: [{ label: "Role", value: "Personal project" }],
              images: [
                detailImage("agile-charge", "01", "AGILE CHARGE system overview", "System overview"),
                detailImage("agile-charge", "02", "AGILE CHARGE context, field research and regional analysis", "Context, field research and regional analysis"),
                detailImage("agile-charge", "03", "AGILE CHARGE pain-point deduction, technology research and stakeholder map", "Pain-point deduction, technology research and stakeholders"),
                detailImage("agile-charge", "04", "AGILE CHARGE ideation, touchpoint evaluation and service-region segmentation", "Ideation, touchpoint evaluation and service-region segmentation"),
                detailImage("agile-charge", "05", "AGILE CHARGE product layout and internal structure", "Product layout and inner-structure analysis"),
                detailImage("agile-charge", "06", "AGILE CHARGE product output and charging workflow", "Product output and charging workflow"),
                detailImage("agile-charge", "07", "AGILE CHARGE service blueprint and ecosystem scenario", "Service blueprint and ecosystem scenario"),
              ],
            },
          },
        ],
      },
    ] satisfies readonly WorkGroup[],
  },
  publications: {
    heading: "Publications",
    article: {
      title: "Applications and Challenges of Artificial Intelligence-Driven Intelligent Manufacturing Systems in Production Line Automation",
      author: "Zehao Ge",
      authorNote: "Sole author, South China University of Technology.",
      venue: "Design Studies and Intelligence Engineering: Proceedings of DSIE 2024, Hangzhou, China, December 2024. Frontiers in Artificial Intelligence and Applications, Vol. 405. IOS Press, 2025.",
      publicationMeta: "Published April 1, 2025 · DOI: 10.3233/FAIA250343",
      datePublished: "2025-04-01",
      doi: "10.3233/FAIA250343",
      summary: "Proposes an architecture for AI-driven intelligent manufacturing spanning data acquisition, intelligent perception, task scheduling, and decision support. In deployment on an automated production line, hourly output increased by 20 units and equipment utilization by 6%.",
      links: [
        { label: "PDF", href: "https://journals.sagepub.com/doi/pdf/10.3233/FAIA250343?download=true" },
        { label: "Publisher", href: "https://journals.sagepub.com/doi/10.3233/FAIA250343" },
        { label: "DOI", href: "https://doi.org/10.3233/FAIA250343" },
      ],
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
        dates: "Sep 2026 – Mar 2028",
        detail: "IELTS 7.0 · GRE 326 (V156 / Q170 / W3.5)",
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
      {
        label: "Certificates",
        items: [
          "IBM — Data Science (Professional Certificate) · 2025",
          "IBM — Product Manager (Professional Certificate) · 2024",
          "Google — IT Automation with Python (Professional Certificate) · 2024",
          "UNESCO — United Nations Sustainable Development Goals Certificate · 2024",
          "Wharton, University of Pennsylvania — Entrepreneurship (Specialization Certificate) · 2024",
          "Siemens — Applied Computational Fluid Dynamics (Course Certificate) · 2024",
        ],
      },
    ] satisfies readonly SkillGroup[],
  },
  contact: {
    heading: "Connect",
    metaTitle: "Connect — Zehao (Kai) Ge",
    metaDescription: "Contact Zehao Ge about research collaborations and graduate opportunities in embodied AI and human–robot interaction.",
    lede: "Open to research collaborations and graduate opportunities in embodied AI and human–robot interaction.",
    profiles: [
      { label: "CV", href: "/cv/GeZehao_CV.pdf", icon: "cv" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=RiJNvesAAAAJ", icon: "scholar" },
      { label: "GitHub", href: "https://github.com/zehao-ge", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/zehao-ge-7a7a88296/", icon: "linkedin" },
    ] satisfies readonly LinkItem[],
    footer: "© 2026 Zehao Ge · Last updated July 2026",
  },
  todos: [
    "TODO(owner): verify the division of work between Skynomad and YU9, and that naming the YU9 program publicly is acceptable",
    "TODO: replace public/cv/GeZehao_CV.pdf with a public CV that omits date of birth and phone number and states the degree exactly as Bachelor's degree in Product Design",
  ],
} as const;

export const workItems: readonly WorkItem[] = site.work.groups.reduce<WorkItem[]>((items, group) => {
  items.push(...group.items);
  return items;
}, []);

export type SiteContent = typeof site;

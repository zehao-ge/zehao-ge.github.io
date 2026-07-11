export type NavItem = { label: string; href: string };
export type ResearchItem = { number: string; title: string; body: string };
export type ExperienceItem = {
  organization: string;
  role: string;
  dates: string;
  summary?: string;
  bullets: readonly string[];
  more?: readonly string[];
};
export type SkillGroup = { label: string; items: readonly string[] };

export const site = {
  identity: {
    name: "Ge Zehao",
    title: "Ge Zehao — Embodied AI & Robot Learning",
    description:
      "Ge Zehao studies how humans express motion intent to robots through teleoperation interfaces for robot learning and mobile manipulation.",
    canonical: "https://example.com/TODO-replace-canonical-production-URL",
    email: "thehowge88@gmail.com",
    affiliation: "Tsinghua University Future Laboratory",
  },
  ui: {
    skip: "Skip to content",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    lightMode: "Use light mode",
    darkMode: "Use dark mode",
    toggleTheme: "Toggle color theme",
    cv: "CV",
    downloadCv: "Download CV",
    showMore: "Show more ›",
    showLess: "Show less",
    copyEmail: "Copy email address",
    copied: "Copied",
    photoAlt: "TODO: replace with a real photograph of the teleoperation hardware setup",
    photoTodo: "TODO: replace with real photo at public/media/hero.webp",
  },
  navigation: [
    { label: "Research", href: "#research" },
    { label: "Experience", href: "#experience" },
    { label: "Publications", href: "#publications" },
    { label: "Awards", href: "#awards" },
    { label: "Contact", href: "#contact" },
  ] satisfies readonly NavItem[],
  hero: {
    eyebrow: "Research Assistant · Future Laboratory, Tsinghua University",
    heading: "Ge Zehao",
    tagline: "Embodied AI · Robot Learning · Human–Robot Interaction · Mobile Manipulation",
    statement:
      "I study how humans express motion intent to robots. When both hands are occupied teleoperating dual robot arms, how should the operator drive the robot's body? I design foot-operated locomotion interfaces for omnidirectional mobile bases, and study how interface design shapes demonstration quality — and the policies learned from it.",
    provenance:
      "Before research, I spent two years at Xiaomi EV engineering cockpit human–machine interfaces — an education in where humans and machines meet.",
    researchCta: "View research ›",
  },
  research: {
    heading: "Research",
    lede: "Interfaces are part of the learning system.",
    items: [
      {
        number: "1",
        title: "Foot-based locomotion control",
        body:
          "A foot-operated interface for omnidirectional mobile bases, integrating foot-to-robot motion mapping, shared control, velocity control, and haptic feedback — so an operator can drive the robot continuously while both hands run dual-arm teleoperation.",
      },
      {
        number: "2",
        title: "Interfaces shape data; data shapes policies",
        body:
          "How does teleoperation interface design affect demonstration quality, and the performance of policies trained on those demonstrations? I study this link between human–robot interaction and embodied AI, with attention to teleoperation fluency, operational safety, and downstream policy learning.",
      },
      {
        number: "3",
        title: "End-to-end imitation learning on real hardware",
        body:
          "A complete pipeline built on SO-ARM 101, OpenArm, a mecanum-wheel mobile base, and LeRobot: robot calibration, leader–follower teleoperation, demonstration collection, ACT policy training, and real-world evaluation.",
      },
    ] satisfies readonly ResearchItem[],
    footnote: "Work in progress — current results are being prepared for publication.",
  },
  experience: {
    heading: "Experience",
    items: [
      {
        organization: "Tsinghua University, Future Laboratory",
        role: "Research Assistant, Embodied AI & HRI",
        dates: "Jun 2026 – Present",
        bullets: [
          "Investigating locomotion intent expression in dual-arm teleoperation: how non-hand interaction modalities influence teleoperation fluency, operational safety, demonstration quality, and downstream policy learning.",
          "Proposed and prototyped a foot-operated omnidirectional locomotion interface for whole-body teleoperation.",
          "Built an end-to-end robot imitation learning pipeline: calibration → leader–follower teleoperation → demonstration collection → ACT policy training → real-robot evaluation.",
        ],
      },
      {
        organization: "Xiaomi EV, Shanghai HQ",
        role: "Industrial Design Intern → Studio Engineer Intern → Studio Engineer (full-time from Jul 2025)",
        dates: "Oct 2024 – Jun 2026",
        summary:
          "Led and contributed to cockpit development on the Mann (Xiaomi YU9) platform across instrument panel & CCB, console, seats, and roof & pillars — resolving ~2,500 engineering issues and translating styling and HMI concepts into mass-producible, human-centered structures.",
        bullets: [
          "Led end-to-end engineering of the YU9 instrument panel system — ergonomic layout and interaction mapping for the panoramic HUD and center display.",
          "Owned the studio's AI, HCI, and coding work; co-developed a multimodal-LLM-driven vehicle styling complexity evaluation system with Zhejiang University.",
          "Shipped the Lemans (Xiaomi YU7) HyperVision Panoramic Display System into production; benchmarked cockpit HMI of the BMW X5, Mercedes-Benz S-Class, and NIO ET9.",
        ],
        more: [
          "CNSL: owned the X/Z dimension chain for upper-console hand-reach space and side-panel part breakdown (788 issues resolved).",
          "Seats: PLP layout, massage system integration, front/rear airbag packaging, headrest RNC layout (685 issues closed).",
          "Roof & pillars: independently led design-to-engineering delivery, including A/B/C-pillar interaction buttons and ambient lighting logic.",
          "Instrument panel & CCB: 501 issues closed; defrost vents, part breakdown, ALT packaging optimization.",
          "Cockpit audio and front-cabin benchmarking for the Modena (Xiaomi SU7) platform.",
          "Data cleaning and classification for an industrial-design foundation model; initial study of CNNs and Transformers.",
        ],
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
  publications: {
    heading: "Publications & patents",
    article: {
      title:
        "Application and Challenges of Artificial Intelligence-Driven Manufacturing Systems in Production Line Automation",
      citation:
        "Ge Zehao (independent author). Frontiers in Artificial Intelligence and Applications (FAIA), Vol. 405, 2025. EI Compendex indexed.",
      date: "Apr 2025",
      summary:
        "Systematizes the architecture of AI-driven manufacturing — data acquisition → modeling → autonomous decision-making — and analyzes its value across production scheduling, quality prediction, energy optimization, fault detection, and real-time decision-making.",
      links: [
        { label: "PDF", href: "", todo: "TODO: add PDF URL" },
        { label: "Publisher", href: "", todo: "TODO: add publisher URL" },
      ],
    },
    patent: {
      label: "Utility model patent",
      title: "Anti-collision device for drone flight.",
      role: "First inventor.",
    },
  },
  education: {
    heading: "Education",
    institution: "South China University of Technology (SCUT)",
    degree: "B.Eng. in Product Design",
    dates: "Sep 2021 – Jul 2025",
    detail: "GPA 3.77 / 4.0 (87.19 / 100) · Excellent Graduation Thesis (university level)",
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
    ],
    footer: "© 2026 Ge Zehao · Last updated July 2026",
  },
  todos: [
    "TODO: replace with real photo at public/media/hero.webp",
    "TODO: replace public/cv/GeZehao_CV.pdf with the final CV",
    "TODO: add publication PDF URL",
    "TODO: add publication publisher URL",
    "TODO: add GitHub URL",
    "TODO: add Google Scholar URL",
    "TODO: add LinkedIn URL",
    "TODO: replace canonical production URL",
  ],
} as const;

export type SiteContent = typeof site;

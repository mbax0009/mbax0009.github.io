import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpenText,
  ChartLineUp,
  Check,
  DownloadSimple,
  GithubLogo,
  HouseLine,
  LinkedinLogo,
  List,
  Medal,
  Path,
  Scales,
  Trophy,
  X,
} from "@phosphor-icons/react";

const links = {
  github: "https://github.com/mbax0009",
  linkedin: "https://www.linkedin.com/in/muhammad-bin-asad-8a5415350/",
  greenInvest: "https://github.com/mbax0009/GreenInvest-Pakistan",
  greenInvestRelease:
    "https://github.com/mbax0009/GreenInvest-Pakistan/releases/latest",
  greenInvestInstall:
    "https://github.com/mbax0009/GreenInvest-Pakistan#local-installation",
  energySimulator:
    "https://github.com/mbax0009/Pakistan-Energy-Simulator",
  energySimulatorRelease:
    "https://github.com/mbax0009/Pakistan-Energy-Simulator/releases/latest",
};

const projects = [
  {
    id: "greeninvest",
    index: "01",
    eyebrow: "Household solar decision modelling",
    title: "GreenInvest Pakistan",
    status: "Public / Downloadable",
    summary:
      "A household solar decision platform that turns electricity use, bills, budget, roof space, and backup needs into an explainable recommendation—or independently checks an installer quotation.",
    technologies: ["Python", "Energy modelling", "Financial analysis", "Tariff analysis"],
    evidence: [
      "Pakistan tariff analysis with expected cost and post-solar bill estimates",
      "Solar, battery, and inverter sizing with backup assessment",
      "Confidence, alternatives, and visible modelling assumptions",
    ],
    actions: [
      { label: "View repository", href: links.greenInvest, icon: GithubLogo },
      {
        label: "Latest release",
        href: links.greenInvestRelease,
        icon: DownloadSimple,
      },
      {
        label: "Install guide",
        href: links.greenInvestInstall,
        icon: BookOpenText,
      },
    ],
    image: {
      src: "/assets/projects/greeninvest-solar.jpg",
      alt: "A field of solar panels beneath a dramatic sky",
      caption: "Solar energy decision modelling",
    },
  },
  {
    id: "energy-simulator",
    index: "02",
    eyebrow: "Utility-scale techno-economic screening",
    title: "Pakistan Energy Simulator",
    status: "Public / Windows 10–11 x64",
    summary:
      "A local-first quantitative screening environment for utility-scale solar PV, onshore wind, and research-grade wave energy across Pakistan.",
    technologies: ["React", "FastAPI", "Python", "Scientific modelling"],
    evidence: [
      "Coordinate-based resource analysis with P90, P50, and P10 scenarios",
      "NPV, IRR, LCOE, payback, sensitivity, and break-even assessment",
      "Seeded Monte Carlo risk analysis with transparent sources and assumptions",
    ],
    actions: [
      { label: "View repository", href: links.energySimulator, icon: GithubLogo },
      {
        label: "Latest release",
        href: links.energySimulatorRelease,
        icon: DownloadSimple,
      },
    ],
    image: {
      src: "/assets/projects/energy-simulator-wind.jpg",
      alt: "Wind turbines stretching across an open landscape at sunset",
      caption: "Utility-scale renewable energy screening",
    },
  },
];

const methods = [
  {
    icon: Scales,
    title: "Explain the verdict",
    text: "Models should not be black boxes. I prioritise traceability: showing how each recommendation is derived from inputs, assumptions, and evidence.",
  },
  {
    icon: ChartLineUp,
    title: "Keep uncertainty visible",
    text: "Scenario ranges and seeded Monte Carlo analysis help users understand risk as well as opportunity.",
  },
  {
    icon: Path,
    title: "Separate unlike decisions",
    text: "Technical sizing logic is distinct from financial feasibility, so the tools evaluate engineering and economics independently.",
  },
  {
    icon: HouseLine,
    title: "Design for real constraints",
    text: "Local tariff structures, resource limits, budgets, and practical requirements are built into every simulation.",
  },
];

const capabilities = [
  { label: "Energy models", value: "Solar / Wind / Wave resource analysis" },
  { label: "Economics", value: "NPV / IRR / LCOE / Payback" },
  { label: "Tariffs", value: "Bill analysis / financial constraints" },
  { label: "Risk", value: "Monte Carlo / sensitivity / scenarios" },
  { label: "Data", value: "Python / machine learning / analysis" },
  { label: "Decisions", value: "Explainability / evidence / assumptions" },
];

const education = [
  {
    school: "Westminster International Schools",
    dates: "2025–2027",
    detail: "A Levels — Mathematics, Physics & Chemistry",
  },
  {
    school: "Benchmark School System",
    dates: "2023–2025",
    detail: "O Levels — 7 As (3 A*s, 4 As)",
  },
];

const training = [
  {
    type: "Bootcamp",
    institution: "NUST × Atomcamp",
    detail:
      "Programming, Python, Machine Learning, Data Analysis & AI — two-month on-site bootcamp",
  },
  {
    type: "Leadership",
    institution: "Innovista",
    detail:
      "Leadership, Entrepreneurship, Marketing & Applied AI — one-month on-site program",
  },
  {
    type: "Design",
    institution: "NUST",
    detail: "Graphic Design — one-month on-site course",
  },
  {
    type: "Robotics",
    institution: "NUST × LearnObots",
    detail: "Arduino Robotics — two-week on-site course",
  },
];

function ExternalLink({ href, children, className = "", ariaLabel }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

function Header({ activeSection, scrollProgress }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ["profile", "01 Profile"],
    ["work", "02 Work"],
    ["method", "03 Method"],
    ["credentials", "04 Credentials"],
  ];

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <nav className="site-nav shell" aria-label="Primary navigation">
        <a className="wordmark" href="#profile" aria-label="Muhammad Bin Asad, home">
          Muhammad Bin Asad
        </a>
        <div className="desktop-nav">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              className={activeSection === id ? "active" : ""}
              href={`#${id}`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="header-actions">
          <ExternalLink href={links.github} ariaLabel="GitHub profile">
            <GithubLogo size={20} weight="regular" aria-hidden="true" />
          </ExternalLink>
          <ExternalLink href={links.linkedin} ariaLabel="LinkedIn profile">
            <LinkedinLogo size={20} weight="regular" aria-hidden="true" />
          </ExternalLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
        <div
          className={`mobile-nav ${menuOpen ? "open" : ""}`}
          id="mobile-navigation"
        >
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SectionTitle({ index, children }) {
  return (
    <div className="section-title" data-reveal>
      <span aria-hidden="true">{index}</span>
      <h2>{children}</h2>
    </div>
  );
}

function ProjectArtwork({ project, onOpen }) {
  return (
    <figure className="project-artwork">
      <button
        className="project-artwork-button"
        type="button"
        onClick={() => onOpen({ ...project.image, project: project.title })}
        aria-label={`Open full-size project image: ${project.image.caption}`}
      >
        <img src={project.image.src} alt={project.image.alt} />
        <span className="zoom-label">
          View image <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </button>
    </figure>
  );
}

function Project({ project, reverse, onOpen }) {
  return (
    <article className={`project ${reverse ? "project-reverse" : ""}`} id={project.id}>
      <div className="project-gallery" data-reveal>
        <div className="status-badge">
          <span aria-hidden="true" />
          {project.status}
        </div>
        <ProjectArtwork project={project} onOpen={onOpen} />
      </div>
      <div className="project-copy" data-reveal>
        <p className="eyebrow">
          {project.index} / {project.eyebrow}
        </p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <div className="tags" aria-label="Project technologies">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <ul className="evidence-list">
          {project.evidence.map((item) => (
            <li key={item}>
              <Check size={16} weight="bold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="project-actions">
          {project.actions.map(({ label, href, icon: Icon }, actionIndex) => (
            <ExternalLink
              href={href}
              className={actionIndex === 0 ? "button button-primary" : "button"}
              key={label}
            >
              {label}
              <Icon size={17} aria-hidden="true" />
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.caption}>
      <button className="lightbox-backdrop" type="button" onClick={onClose}>
        <span className="sr-only">Close project image</span>
      </button>
      <div className="lightbox-panel">
        <div className="lightbox-header">
          <div>
            <span>{image.project}</span>
            <strong>{image.caption}</strong>
          </div>
          <button type="button" onClick={onClose} aria-label="Close project image">
            <X size={24} />
          </button>
        </div>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  );
}

export function App() {
  const [activeSection, setActiveSection] = useState("profile");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const sections = ["profile", "work", "method", "credentials"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header activeSection={activeSection} scrollProgress={scrollProgress} />
      <main id="main-content">
        <section className="hero shell bordered" id="profile">
          <div className="hero-content">
            <p className="eyebrow hero-name" data-reveal>
              Muhammad Bin Asad
            </p>
            <h1 data-reveal>
              Student entrepreneur building explainable energy decision tools for
              Pakistan.
            </h1>
            <p className="hero-intro" data-reveal>
              Translating complex energy, tariff, resource, and financial models
              into understandable decisions for Pakistan’s energy transition.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="button button-primary" href="#work">
                Explore projects <ArrowDown size={17} aria-hidden="true" />
              </a>
              <ExternalLink className="button" href={links.github}>
                GitHub profile <GithubLogo size={17} aria-hidden="true" />
              </ExternalLink>
            </div>
          </div>
          <aside className="hero-grid" aria-label="Portfolio focus">
            <div className="technical-rail">
              <span>Model layer</span>
              <strong>Energy × Economics</strong>
            </div>
            <div className="technical-rail technical-rail-middle">
              <span>Working scale</span>
              <strong>Household → Utility</strong>
            </div>
            <div className="technical-rail-note">
              <span>Pakistan-specific assumptions</span>
              <p>Transparent models. Decision-grade outputs.</p>
              <ArrowDown size={18} aria-hidden="true" />
            </div>
          </aside>
        </section>

        <section className="proof shell bordered" aria-label="Portfolio overview">
          <div>
            <span>Project count</span>
            <strong>02</strong>
            <small>Flagship platforms</small>
          </div>
          <div>
            <span>Coverage</span>
            <strong>03</strong>
            <small>Renewable technologies</small>
          </div>
          <div>
            <span>Scalability</span>
            <strong className="proof-words">Household → Utility</strong>
            <small>Full spectrum</small>
          </div>
          <div>
            <span>Context</span>
            <strong className="proof-words">Pakistan</strong>
            <small>Decision models</small>
          </div>
        </section>

        <section className="work shell bordered" id="work">
          <SectionTitle index="02">Featured Work</SectionTitle>
          <div className="project-stack">
            {projects.map((project, index) => (
              <Project
                key={project.id}
                project={project}
                reverse={index % 2 === 1}
                onOpen={setLightboxImage}
              />
            ))}
          </div>
        </section>

        <section className="method shell bordered" id="method">
          <SectionTitle index="03">Core Philosophy</SectionTitle>
          <div className="method-grid">
            {methods.map(({ icon: Icon, title, text }, index) => (
              <article data-reveal key={title}>
                <div className={`method-icon method-icon-${index + 1}`}>
                  <Icon size={19} weight="bold" aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="capabilities" data-reveal>
            <p className="eyebrow">Quantitative capabilities</p>
            <div className="capability-grid">
              {capabilities.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="credentials shell bordered" id="credentials">
          <SectionTitle index="04">Credentials</SectionTitle>
          <div className="credentials-grid">
            <div className="credentials-main">
              <div className="credential-group">
                <p className="eyebrow">Academic</p>
                {education.map((item) => (
                  <article className="education-row" data-reveal key={item.school}>
                    <div>
                      <h3>{item.school}</h3>
                      <p>{item.detail}</p>
                    </div>
                    <span>{item.dates}</span>
                  </article>
                ))}
              </div>
              <div className="credential-group">
                <p className="eyebrow">Selected training & courses</p>
                <div className="training-grid">
                  {training.map((item) => (
                    <article data-reveal key={item.institution + item.type}>
                      <span>{item.type}</span>
                      <h3>{item.institution}</h3>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <aside className="distinctions" data-reveal>
              <p className="eyebrow">Awards & distinctions</p>
              <div>
                <Trophy size={21} weight="regular" aria-hidden="true" />
                <p>
                  <strong>Honorable Mention</strong>
                  <span>
                    Great Future Pakistan National Science Olympiad — Mathematics
                  </span>
                </p>
              </div>
              <div>
                <Medal size={21} weight="regular" aria-hidden="true" />
                <p>
                  <strong>Silver Medal / Charles Dickens Distinction</strong>
                  <span>IKLC 2024</span>
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer shell bordered">
        <div>
          <h2>Building useful, transparent energy tools for Pakistan.</h2>
          <div className="footer-bottom">
            <div>
              <p className="eyebrow">Get in touch</p>
              <div className="social-links">
                <ExternalLink href={links.github}>
                  <GithubLogo size={18} aria-hidden="true" /> GitHub
                </ExternalLink>
                <ExternalLink href={links.linkedin}>
                  <LinkedinLogo size={18} aria-hidden="true" /> LinkedIn
                </ExternalLink>
              </div>
            </div>
            <div className="footer-identity">
              <strong>Muhammad Bin Asad</strong>
              <span>mbax0009.github.io</span>
            </div>
          </div>
        </div>
      </footer>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
}

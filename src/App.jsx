import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  GithubLogo,
  LinkedinLogo,
  DownloadSimple,
} from "@phosphor-icons/react";

const links = {
  github: "https://github.com/mbax0009",
  linkedin: "https://www.linkedin.com/in/muhammad-bin-asad-8a5415350/",
  greeninvest: "https://github.com/mbax0009/GreenInvest-Pakistan",
  simulator: "https://github.com/mbax0009/Pakistan-Energy-Simulator",
};

const projects = [
  {
    id: "greeninvest",
    number: "01",
    name: "GreenInvest Pakistan",
    category: "Solar investment · Decision support",
    question: "Solar sizing and investment analysis",
    description:
      "A calculator for residential, commercial and industrial solar decisions in Pakistan. It recommends solar, inverter and battery capacity using electricity consumption, bill targets, budget, roof space and backup requirements.",
    image: "/assets/projects/greeninvest-solar.jpg",
    alt: "Rows of solar panels under an expansive, cloud-filled sky",
    caption: "Solar PV · System sizing · Investment analysis",
    scope: "Residential, commercial & industrial",
    analyses: [
      [
        "Sizing",
        "Solar, inverter and battery sizing against demand, budget and physical constraints.",
      ],
      [
        "Costs & bills",
        "Seasonal generation, projected electricity bills and investment estimates.",
      ],
      [
        "Quote checks",
        "Checks proposed equipment and pricing against the user’s needs, with alternatives and sensitivity analysis.",
      ],
    ],
    primary: {
      label: "Open calculator",
      href: "https://greeninvest-pakistan.vercel.app",
    },
    repo: links.greeninvest,
    download: links.greeninvest + "/releases/latest",
    methodology: links.greeninvest + "#the-professional-verification-boundary",
    note: "Independent screening, not a final system design or a guarantee of savings.",
  },
  {
    id: "energy-simulator",
    number: "02",
    name: "Pakistan Energy Simulator",
    category: "Renewable energy · Techno-economic analysis",
    question: "Renewable-energy project analysis",
    description:
      "A desktop tool for analysing utility-scale solar PV, onshore wind and research-grade wave projects in Pakistan. It uses location-based resource data to estimate generation, project economics and uncertainty.",
    image: "/assets/projects/energy-simulator-wind.jpg",
    alt: "Wind turbines across an open field beneath the evening sky",
    caption: "Solar · Wind · Wave · Project economics",
    scope: "Solar PV, onshore wind & wave",
    analyses: [
      [
        "Resource",
        "Coordinate-based analysis with historical generation and P90 / P50 / P10 scenarios.",
      ],
      [
        "Economics",
        "NPV, IRR, LCOE and payback, with sensitivity and break-even assessment.",
      ],
      [
        "Uncertainty",
        "Reproducible Monte Carlo analysis and paired comparisons, with sources and limitations retained.",
      ],
    ],
    primary: { label: "View repository", href: links.simulator },
    repo: links.simulator,
    download: links.simulator + "/releases/latest",
    methodology: links.simulator + "/blob/main/docs/METHODOLOGY.md",
    note: "Decision support, not a bankability study. Wave energy remains research-grade.",
  },
];

const principles = [
  [
    "Decision scope",
    "The model starts with a defined question: whether solar fits a property, which system meets its needs, or how a renewable-energy project compares financially.",
  ],
  [
    "Inputs and assumptions",
    "Resource data, system constraints and financial assumptions remain visible alongside the results.",
  ],
  [
    "Uncertainty analysis",
    "Scenarios, sensitivity tests and Monte Carlo analysis show how the results change when the inputs change.",
  ],
];

const skills = [
  ["Energy modelling", "Solar PV · Wind · Wave · System sizing"],
  ["Project economics", "NPV · IRR · LCOE · Payback"],
  ["Risk & uncertainty", "Sensitivity · Scenarios · Monte Carlo"],
  ["Data & analysis", "Python · Data analysis · ML fundamentals"],
];

function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function Header() {
  const [active, setActive] = useState("profile");
  useEffect(() => {
    const sections = [...document.querySelectorAll("main > section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <nav className="shell navigation" aria-label="Primary navigation">
        <a
          className="identity"
          href="#profile"
          aria-label="Muhammad Bin Asad, back to top"
        >
          Muhammad Bin Asad<span>Quantitative energy portfolio</span>
        </a>
        <div className="nav-links">
          {[
            ["work", "Work"],
            ["method", "Approach"],
            ["credentials", "Background"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={"#" + id}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
          <ExternalLink href={links.linkedin} className="nav-contact">
            Connect <ArrowUpRight size={15} aria-hidden="true" />
          </ExternalLink>
        </div>
      </nav>
    </header>
  );
}

function Project({ project }) {
  return (
    <article
      className="project"
      id={project.id}
      aria-labelledby={project.id + "-title"}
    >
      <div className="project-heading">
        <span className="project-number" aria-hidden="true">
          {project.number}
        </span>
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3 id={project.id + "-title"}>{project.name}</h3>
        </div>
        <span className="availability">
          <span aria-hidden="true" />
          Publicly available
        </span>
      </div>
      <div className="project-body">
        <div className="project-visual">
          <figure>
            <img
              src={project.image}
              alt={project.alt}
              width="2200"
              height={project.number === "01" ? "1464" : "1467"}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>{project.caption}</span>
              <span aria-hidden="true">{project.number} / 02</span>
            </figcaption>
          </figure>
          <div className="project-scope">
            <span className="eyebrow">Scope</span>
            <p>{project.scope}</p>
          </div>
        </div>
        <div className="project-copy">
          <h4>{project.question}</h4>
          <p className="project-description">{project.description}</p>
          <dl className="analysis-list">
            {project.analyses.map(([label, text]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
          <div className="project-actions">
            <ExternalLink
              className="button button-dark"
              href={project.primary.href}
            >
              {project.primary.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink
              className="text-link"
              href={project.download}
              aria-label={"Download " + project.name + " for Windows"}
            >
              Windows download
              <DownloadSimple size={17} aria-hidden="true" />
            </ExternalLink>
          </div>
          <div className="project-references">
            {project.primary.href !== project.repo && (
              <ExternalLink href={project.repo}>
                Repository
                <ArrowUpRight size={13} aria-hidden="true" />
              </ExternalLink>
            )}
            <ExternalLink href={project.methodology}>
              {project.number === "01" ? "Scope & limitations" : "Methodology"}
              <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
          </div>
          <p className="project-note">{project.note}</p>
        </div>
      </div>
    </article>
  );
}

export function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section
          className="hero shell"
          id="profile"
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span className="eyebrow">Independent work · Pakistan</span>
            <span className="eyebrow">Solar investment & renewable energy</span>
          </div>
          <div className="hero-grid">
            <div className="hero-title-wrap">
              <h1 id="hero-title">
                Energy modelling
                <br />
                for Pakistan.
              </h1>
              <a className="hero-link" href="#work">
                View projects
                <span>
                  <ArrowDown size={20} aria-hidden="true" />
                </span>
              </a>
            </div>
            <div className="hero-intro">
              <p>
                I’m Muhammad Bin Asad. I study Mathematics, Physics and
                Chemistry at A Level and develop energy modelling projects
                focused on Pakistan.
              </p>
              <p>
                My work focuses on system sizing, project economics and
                uncertainty analysis. The two projects below are available to
                use and download.
              </p>
            </div>
          </div>
          <div
            className="project-index"
            aria-label="Selected project shortcuts"
          >
            <span className="eyebrow index-label">Selected projects</span>
            {projects.map((project) => (
              <a href={"#" + project.id} key={project.id}>
                <span className="index-number">{project.number}</span>
                <span className="index-copy">
                  <strong>{project.name}</strong>
                  <span>
                    {project.number === "01"
                      ? "Solar investment decisions"
                      : "Utility-scale analysis"}
                  </span>
                </span>
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section
          className="work shell section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <SectionLabel number="01">Work</SectionLabel>
              <h2 id="work-title">Selected projects</h2>
            </div>
            <p>
              Solar investment decisions and utility-scale renewable energy
              analysis. Public downloads and documentation for both projects.
            </p>
          </div>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </section>

        <section className="method" id="method" aria-labelledby="method-title">
          <div className="shell method-inner">
            <div className="method-intro">
              <SectionLabel number="02">Approach</SectionLabel>
              <h2 id="method-title">
                Modelling
                <br />
                approach
              </h2>
              <p>
                The projects combine energy estimates with financial analysis.
                Results support screening and comparison, not final engineering
                design.
              </p>
            </div>
            <div className="principles">
              {principles.map(([title, description], i) => (
                <article key={title}>
                  <span className="principle-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="capabilities">
              <p className="eyebrow">Skills</p>
              <dl>
                {skills.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          className="background shell section-space"
          id="credentials"
          aria-labelledby="background-title"
        >
          <div className="section-heading background-heading">
            <div>
              <SectionLabel number="03">Background</SectionLabel>
              <h2 id="background-title">Education & experience</h2>
            </div>
          </div>
          <div className="background-row experience">
            <h3 className="group-title">Experience</h3>
            <div className="experience-content">
              <div className="entry-heading">
                <div>
                  <h4>Innovista</h4>
                  <p className="entry-role">
                    Intern · Leadership & professional development
                  </p>
                </div>
                <p className="entry-meta">
                  Summer 2026 · 2 months
                  <span className="meta-location">On-site</span>
                </p>
              </div>
              <p className="experience-summary">
                An internship focused on entrepreneurship, digital marketing, AI
                automation and AI-assisted software development.
              </p>
              <ul className="experience-list">
                <li>
                  Explored AI tools and automation workflows for practical
                  applications.
                </li>
                <li>
                  Worked with AI-assisted software development and digital
                  content creation.
                </li>
                <li>
                  Developed an understanding of advertising, marketing strategy
                  and operations.
                </li>
                <li>
                  Strengthened professional communication, presentation and
                  entrepreneurial skills.
                </li>
              </ul>
            </div>
          </div>
          <div className="background-row">
            <h3 className="group-title">Education</h3>
            <div className="entries">
              <article className="education-entry">
                <div>
                  <h4>Westminster International Schools</h4>
                  <p>A Levels · Mathematics, Physics & Chemistry</p>
                </div>
                <span className="entry-meta">2025–2027</span>
              </article>
              <article className="education-entry">
                <div>
                  <h4>Benchmark School System</h4>
                  <p>O Levels · 7 As (3 A*, 4 As)</p>
                </div>
                <span className="entry-meta">2023–2025</span>
              </article>
            </div>
          </div>
          <div className="background-row">
            <h3 className="group-title">Selected training</h3>
            <div className="training-list">
              <article>
                <div className="entry-heading">
                  <h4>NUST × Atomcamp</h4>
                  <span className="entry-meta">2 months · On-site</span>
                </div>
                <p>
                  Python, programming, machine learning, data analysis and AI
                  fundamentals.
                </p>
              </article>
              <article>
                <div className="entry-heading">
                  <h4>NUST</h4>
                  <span className="entry-meta">2 weeks · On-site</span>
                </div>
                <p>
                  Graphic design tools and software, including Adobe Photoshop.
                </p>
              </article>
              <article>
                <div className="entry-heading">
                  <h4>NUST × LearnObots</h4>
                  <span className="entry-meta">2 weeks · On-site</span>
                </div>
                <p>
                  Robotics hardware and programming, including Arduino-based
                  projects.
                </p>
              </article>
            </div>
          </div>
          <div className="background-row distinctions">
            <h3 className="group-title">Distinctions</h3>
            <ul>
              <li>
                <span>Honorable Mention · Mathematics</span>
                <p>Great Future Pakistan National Science Olympiad</p>
              </li>
              <li>
                <span>Silver Medal / Charles Dickens Distinction Award</span>
                <p>International Kangaroo Linguistic Contest · 2024</p>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="shell">
          <div className="footer-top">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Get in touch</h2>
              <p className="footer-description">
                For questions about my work or feedback on the projects.
              </p>
            </div>
            <div className="footer-links">
              <ExternalLink href={links.linkedin}>
                <LinkedinLogo size={21} aria-hidden="true" />
                Connect on LinkedIn
                <ArrowUpRight size={21} aria-hidden="true" />
              </ExternalLink>
              <ExternalLink href={links.github}>
                <GithubLogo size={21} aria-hidden="true" />
                View GitHub
                <ArrowUpRight size={21} aria-hidden="true" />
              </ExternalLink>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Muhammad Bin Asad</span>
            <a href="https://mbax0009.github.io/">mbax0009.github.io</a>
            <a href="#profile">
              Back to top
              <ArrowUp size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

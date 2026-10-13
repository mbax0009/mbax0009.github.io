import { useEffect, useState } from "react";
import { usePortfolioMotion } from "./usePortfolioMotion.js";
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
    category: "Residential, commercial & industrial",
    question: "Should you install solar—and what should you install?",
    description:
      "GreenInvest brings system sizing, electricity-bill modelling and financial analysis into a single solar investment assessment. It works from a property’s electricity use, budget, roof space and backup requirements to recommend a suitable configuration—or explain why installation may not make sense.",
    image: "/assets/projects/greeninvest-solar.jpg",
    alt: "Rows of solar panels under an expansive, cloud-filled sky",
    scope: "Start with your electricity use, or bring an installer’s quotation.",
    detail: "The two pathways let users explore a new investment or independently assess a proposal already on the table. Both produce a decision with the assumptions, constraints and alternatives available for review.",
    analyses: [
      [
        "System sizing & backup",
        "Compares solar, inverter and battery configurations against demand, roof area and budget. Backup checks account for protected loads, outage duration and storage capacity.",
      ],
      [
        "Bills & investment",
        "Models seasonal generation and monthly electricity bills using Pakistan-specific tariff categories. Equipment pricing, remaining grid charges and financial estimates help compare the proposed investment with alternatives.",
      ],
      [
        "Independent quotation checks",
        "Assesses proposed equipment, capacity and pricing against the user’s consumption, bill target and backup needs—not just the headline size of the system.",
      ],
      ["Risk & evidence", "Sensitivity analysis and on-demand Monte Carlo simulations test how assumptions affect the result. Reports, configuration data and CSV exports let users examine the recommendation outside the app."],
    ],
    primary: {
      label: "Try GreenInvest",
      href: "https://greeninvest-pakistan.vercel.app",
    },
    repo: links.greeninvest,
    download: links.greeninvest + "/releases/latest",
    methodology: links.greeninvest + "#readme",
    note: "Independent screening, not a final system design or a guarantee of savings.",
  },
  {
    id: "energy-simulator",
    number: "02",
    name: "Pakistan Energy Simulator",
    category: "Utility-scale solar, wind & wave",
    question: "From a site’s energy resource to a project’s economics.",
    description:
      "Pakistan Energy Simulator connects historical resource data, physical generation models and project finance. It evaluates utility-scale solar PV, onshore wind and research-grade wave energy at locations across Pakistan, carrying the uncertainty in energy production through to the investment analysis.",
    image: "/assets/projects/energy-simulator-wind.jpg",
    alt: "Wind turbines across an open field beneath the evening sky",
    scope: "Compare technologies under the same assumptions.",
    detail: "Paired uncertainty analysis compares projects within the same simulated conditions. Wave-energy screening also tests capital cost and conversion efficiency against a solar benchmark, including where no competitive case is found.",
    analyses: [
      [
        "Resource & physical models",
        "Uses coordinates and historical hourly weather or marine data. Solar temperature and losses, wind hub height and turbine power curves, and wave flux and capture width are modelled explicitly.",
      ],
      [
        "Generation & project finance",
        "Estimates P90, P50 and P10 generation scenarios, net present value, project IRR, levelised cost of energy, and simple and discounted payback.",
      ],
      [
        "Sensitivity & uncertainty",
        "One- and two-way sensitivity tests, break-even root finding and reproducible Monte Carlo simulations show which assumptions change a project’s economics—and by how much.",
      ],
      ["Traceable results", "Source records, dated financial assumptions, model limitations and evidence-pack exports accompany the results. The methodology is published alongside the application."],
    ],
    primary: { label: "Public repository", href: links.simulator },
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sections = [...document.querySelectorAll("main > section[id]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = document.querySelector("header").getBoundingClientRect().bottom + 80;
      const current = sections.findLast(section => section.getBoundingClientRect().top <= readingLine);
      setActive(current?.id || "profile");
      setScrolled(window.scrollY > 16);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <nav className="shell navigation" aria-label="Primary navigation">
        <a
          className="identity"
          href="#profile"
          aria-label="Muhammad Bin Asad, back to top"
        >
          Muhammad Bin Asad
        </a>
        <div className="nav-links">
          {[
            ["work", "Projects"],
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
        </div>
        <div className="header-socials">
          <ExternalLink href={links.linkedin}><LinkedinLogo size={19} aria-hidden="true" />LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
          <ExternalLink href={links.github}><GithubLogo size={19} aria-hidden="true" />GitHub<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
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
        <div>
          <p className="project-category">{project.category}</p>
          <h3 id={project.id + "-title"}>{project.name}</h3>
        </div>
        <span className="project-number" aria-hidden="true">{project.number}</span>
      </div>
      <div className="project-body">
        <div className="project-overview">
          <h4>{project.question}</h4>
          <p className="project-description">{project.description}</p>
        </div>
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
          </figure>
          <div className="project-scope">
            <h4>{project.scope}</h4>
            <p>{project.detail}</p>
            <ExternalLink href={project.methodology} className="text-link">
              {project.number === "01" ? "Read the project documentation" : "Explore the methodology"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </ExternalLink>
          </div>
        </div>
        <div className="project-copy">
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
              className="button button-outline download-link"
              href={project.download}
              aria-label={"Download " + project.name + " for Windows"}
            >
              Windows download
              <DownloadSimple size={17} aria-hidden="true" />
            </ExternalLink>
            {project.primary.href !== project.repo && (
              <ExternalLink className="text-link repository-link" href={project.repo}>
                Public repository
                <ArrowUpRight size={17} aria-hidden="true" />
              </ExternalLink>
            )}
          </div>
          <p className="project-note">{project.note}</p>
        </div>
      </div>
    </article>
  );
}

export function App() {
  usePortfolioMotion();
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
          <p className="hero-topline">Mathematics. Energy. Investment.</p>
          <div className="hero-grid">
            <div className="hero-title-wrap">
              <h1 id="hero-title">
                Energy modelling.<br />
                <span>Investment analysis.</span>
              </h1>
            </div>
            <div className="hero-intro">
              <p>
                I’m Muhammad Bin Asad. I develop quantitative models for
                energy decisions in Pakistan—from choosing a solar system
                to evaluating a renewable-energy project.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#work">Explore my work<ArrowDown size={19} aria-hidden="true" /></a>
                <ExternalLink className="button button-outline hero-social" href={links.linkedin}>
                  <LinkedinLogo size={20} aria-hidden="true" />LinkedIn
                </ExternalLink>
                <ExternalLink className="button button-outline hero-social" href={links.github}>
                  <GithubLogo size={20} aria-hidden="true" />GitHub
                </ExternalLink>
              </div>
            </div>
          </div>
        </section>

        <section
          className="work shell section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="work-title">Selected projects</h2>
            </div>
            <p>
              Both projects are publicly available.<br />
              Explore the models, read the methods, or try them yourself.
            </p>
          </div>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </section>

        <section className="method" id="method" aria-labelledby="method-title">
          <div className="shell method-inner">
            <div className="method-intro">
              <SectionLabel number="">How I work</SectionLabel>
              <h2 id="method-title">
                Modelling<br />approach
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
              <SectionLabel number="">Background</SectionLabel>
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

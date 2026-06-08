const { useEffect, useState } = React;

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Works", href: "#works" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

function Icon({ name, size = 18 }) {
  return <i data-lucide={name} style={{ width: size, height: size }} aria-hidden="true"></i>;
}

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight text-ink dark:text-white">{children}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

function scrollToSection(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header({ activeSection, darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button type="button" onClick={() => scrollToSection("#home")} className="text-base font-semibold text-ink dark:text-white">
          Abhijeet Dhali
        </button>

        <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5 md:flex">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                activeSection === item.href.slice(1)
                  ? "bg-accent text-white shadow-sm dark:bg-teal-300 dark:text-ink"
                  : "text-slate-600 hover:bg-slate-100 hover:text-accent dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-teal-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-accent dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            <Icon name={darkMode ? "sun" : "moon"} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-accent dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Open menu"
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-[73px] z-40 bg-white/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 dark:bg-slate-950/95 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
          <div className="mx-auto grid max-w-6xl gap-3">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => {
                  scrollToSection(item.href);
                  setOpen(false);
                }}
                className={`rounded-2xl border p-5 text-left text-lg font-semibold transition ${
                  activeSection === item.href.slice(1)
                    ? "border-accent bg-teal-50 text-accent dark:border-teal-300 dark:bg-teal-300/10 dark:text-teal-200"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
      </div>
    </header>
  );
}

function Hero({ portfolio }) {
  const roles = portfolio.role.split("|").map((role) => role.trim());

  return (
    <section id="home" className="px-5 py-16 sm:py-20 lg:flex lg:min-h-[calc(100vh-73px)] lg:items-center">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto w-full max-w-xs">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-soft dark:border-white/10 dark:bg-white/5">
            <img src={portfolio.avatar} alt={portfolio.name} className="aspect-[4/5] w-full rounded-xl object-cover" />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-ink dark:text-white sm:text-6xl">
            {portfolio.name}
          </h1>
          <div className="mt-6 space-y-2">
            {roles.map((role) => (
              <p key={role} className="text-xl font-medium text-slate-700 dark:text-slate-200">
                {role}
              </p>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {portfolio.headline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={portfolio.resume}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-accent dark:bg-white dark:text-ink dark:hover:bg-teal-200"
            >
              <Icon name="download" />
              Download Resume
            </a>
            {portfolio.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <Icon name={social.icon} />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ portfolio }) {
  return (
    <section id="about" className="border-t border-slate-200 bg-white px-5 py-14 dark:border-white/10 dark:bg-slate-950/40 lg:flex lg:min-h-[calc(100vh-73px)] lg:items-center">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>About Me</SectionTitle>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            <p>{portfolio.summary}</p>
            <p>{portfolio.tagline}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-surface p-5 dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <Info label="Location" value={portfolio.location} />
              <Info label="Email" value={portfolio.email} />
              <Info label="Phone" value={portfolio.phone} />
              <Info label="Status" value="Available upon request" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-slate-400">{label}</p>
      <p className="mt-1 font-medium text-ink dark:text-white">{value}</p>
    </div>
  );
}

function Education({ portfolio }) {
  return (
    <section id="education" className="px-5 py-14 lg:flex lg:min-h-[calc(100vh-73px)] lg:items-center">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-4">
          {portfolio.education.map((item) => (
            <article key={item.degree} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="grid gap-5 md:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <h3 className="text-xl font-semibold text-ink dark:text-white">{item.degree}</h3>
                  <p className="mt-2 font-medium text-accent dark:text-teal-300">{item.organization}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.location}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{item.period}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ portfolio }) {
  return (
    <section id="experience" className="border-t border-slate-200 bg-white px-5 py-14 dark:border-white/10 dark:bg-slate-950/40 lg:flex lg:min-h-[calc(100vh-73px)] lg:items-center">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-5">
          {portfolio.experience.map((item) => (
            <article key={`${item.title}-${item.period}`} className="rounded-2xl border border-slate-200 bg-surface p-6 dark:border-white/10 dark:bg-white/5">
              <div className="grid gap-5 md:grid-cols-[0.32fr_0.68fr]">
                <div>
                  <h3 className="text-xl font-semibold text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-2 font-medium text-accent dark:text-teal-300">{item.organization}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.period}</p>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Interests({ portfolio }) {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Interests</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {portfolio.interests.map((interest) => (
            <span key={interest} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works({ portfolio }) {
  const [openId, setOpenId] = useState(null);
  const works = [
    ...portfolio.projects.map((item) => ({
      ...item,
      id: `project-${item.title}`,
      category: "Project",
      linkLabel: "GitHub"
    })),
    ...portfolio.research.map((item) => ({
      id: `publication-${item.title}`,
      title: item.title,
      type: item.venue,
      category: "Publication",
      description: "Publication entry. Use Google Scholar for the complete and updated publication list.",
      tags: ["Research", "Publication", "Graph Neural Networks"],
      status: item.status,
      year: item.year,
      image: item.image,
      link: portfolio.googleScholar,
      linkLabel: "Google Scholar"
    }))
  ];

  return (
    <section id="works" className="border-t border-slate-200 bg-white px-5 py-14 dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle subtitle="Click any item to read the short description. Projects and publications are grouped together here.">
            Works
          </SectionTitle>
          <a
            href={portfolio.googleScholar}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <Icon name="graduation-cap" />
            Google Scholar
          </a>
        </div>

        <div className="space-y-4">
          {works.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-surface p-4 dark:border-white/10 dark:bg-white/5"
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="grid w-full gap-4 text-left sm:grid-cols-[96px_1fr_auto] sm:items-center"
                aria-expanded={openId === item.id}
              >
                <span className="flex items-center gap-4 sm:block">
                  <span className="block h-20 w-20 flex-none overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950/50 sm:h-24 sm:w-24">
                    {item.image ? (
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-accent dark:text-teal-300">
                        <Icon name={item.category === "Publication" ? "file-text" : "folder-git-2"} />
                      </span>
                    )}
                  </span>
                  {item.year ? (
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 sm:mt-2 sm:block sm:text-center">
                      ({item.year})
                    </span>
                  ) : null}
                </span>

                <span className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent dark:text-teal-300">
                    {item.category}
                  </span>
                  <span className="mt-2 block text-lg font-semibold leading-7 text-ink dark:text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{item.type}</span>
                  {item.status ? (
                    <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">
                      status: {item.status}
                    </span>
                  ) : null}
                </span>

                <span className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
                  <Icon name={openId === item.id ? "minus" : "plus"} size={16} />
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ maxHeight: openId === item.id ? "360px" : "0px", opacity: openId === item.id ? 1 : 0 }}
              >
                <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.id}-${tag}`}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-950/60 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-teal-900 dark:text-teal-300"
                    >
                      {item.linkLabel} <Icon name="arrow-up-right" size={16} />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ portfolio }) {
  const categories = Object.keys(portfolio.skills);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="skills" className="border-t border-slate-200 bg-white px-5 py-14 dark:border-white/10 dark:bg-slate-950/40 lg:flex lg:min-h-[calc(100vh-73px)] lg:items-center">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Skills</SectionTitle>
        <div className="rounded-2xl border border-slate-200 bg-surface p-4 dark:border-white/10 dark:bg-white/5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-accent text-white dark:bg-teal-300 dark:text-ink"
                    : "bg-white text-slate-600 hover:text-accent dark:bg-slate-950/60 dark:text-slate-300 dark:hover:text-teal-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {portfolio.skills[activeCategory].map((skill, index) => (
              <span
                key={skill}
                className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:bg-slate-950/60 dark:text-slate-300"
                style={{ animation: `fadeUp 0.35s ease ${index * 0.04}s both` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ portfolio }) {
  const phoneHref = portfolio.phone.replace(/[^+\d]/g, "");

  return (
    <footer id="contact" className="px-5 py-12">
      <div className="mx-auto max-w-6xl rounded-2xl bg-ink p-6 text-white dark:bg-white/5">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          Feel free to reach out for research, software, data, technical support, or collaboration opportunities.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${portfolio.email}`} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">
            <Icon name="mail" />
            {portfolio.email}
          </a>
          <a href={`tel:${phoneHref}`} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">
            <Icon name="phone" />
            {portfolio.phone}
          </a>
          <a href={portfolio.resume} download className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-3 text-sm font-semibold text-ink hover:bg-teal-200">
            <Icon name="download" />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const portfolio = window.portfolioData;
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [portfolio, darkMode]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const updateActiveSection = () => {
      const nearest = sectionIds
        .map((id) => {
          const node = document.getElementById(id);
          return {
            id,
            distance: node ? Math.abs(node.getBoundingClientRect().top - 90) : Number.POSITIVE_INFINITY
          };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      if (nearest) setActiveSection(nearest.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface text-slate-900 dark:bg-slate-950">
      <Header
        activeSection={activeSection}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((value) => !value)}
      />
      <main>
        <Hero portfolio={portfolio} />
        <About portfolio={portfolio} />
        <Education portfolio={portfolio} />
        <Experience portfolio={portfolio} />
        <Interests portfolio={portfolio} />
        <Works portfolio={portfolio} />
        <Skills portfolio={portfolio} />
      </main>
      <Contact portfolio={portfolio} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiArrowUp,
  FiMapPin,
  FiPhone,
  FiSun,
  FiMoon,
  FiExternalLink,
  FiCheck,
} from "react-icons/fi";
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiLinux,
  SiOpenjdk,
} from "react-icons/si";
import portrait from "@/assets/aashish-portrait.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Aashish Soni — Full-Stack MERN Developer & Software Engineer" },
      {
        name: "description",
        content:
          "Aashish Soni — Full-Stack MERN Developer & Software Engineer building elegant, scalable web experiences. Explore projects, experience and skills.",
      },
    ],
  }),
});

/* ------------------------------ Theme Toggle ------------------------------ */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
    setTheme(dark ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-elevated text-foreground transition hover:scale-105 hover:shadow-md"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -8, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ------------------------------ Nav ------------------------------ */
const NAV = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["home", ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
        <a
          href="#home"
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
            AS
          </span>
          <span className="hidden sm:inline">Aashish Soni</span>
        </a>

        <nav className="glass hidden rounded-full px-2 py-1.5 md:block">
          <ul className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative rounded-full px-3 py-1.5 transition ${
                    active === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-flex"
          >
            Let's talk
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* ------------------------------ Utilities ------------------------------ */
function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-14 max-w-3xl">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-hero mt-5 text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg text-muted-foreground">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------ Hero ------------------------------ */
const ROLES = [
  "Full-Stack MERN Developer",
  "Software Engineer",
  "AI Enthusiast",
  "Problem Solver",
];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = ROLES[i];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1500);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setI((v) => (v + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, i]);
  return (
    <span className="text-foreground">
      {text}
      <span className="caret h-[0.9em] align-[-0.1em]" />
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 22 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const dur = 8 + Math.random() * 12;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-foreground/20 dark:bg-foreground/30"
            style={{ width: size, height: size, left: `${left}%`, top: `${top}%` }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
      <Particles />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--foreground)_10%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 md:grid-cols-[1.1fr_1fr] md:pb-24">
        <div className="order-2 md:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg text-muted-foreground">Hi, I'm</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-hero mt-2 text-[15vw] leading-[0.9] sm:text-7xl md:text-[6.5rem]">
              Aashish
              <br />
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Soni.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-2xl font-medium sm:text-3xl">
              <Typewriter />
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              I build scalable, efficient, and user-friendly web applications with the MERN stack —
              with a growing passion for AI and modern software engineering.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/1yJXPq-yIChyE_Ga_3HgTaN0-oNVo7K__/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:scale-[1.02] hover:shadow-lg"
              >
                <FiDownload /> Download Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3 text-sm font-medium transition hover:bg-secondary"
              >
                View Projects <FiArrowRight />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Contact Me
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex items-center gap-3">
              {[
                { href: "https://github.com/Aashishson", Icon: FiGithub, label: "GitHub" },
                {
                  href: "https://www.linkedin.com/in/aashish-soni-21184830b/",
                  Icon: FiLinkedin,
                  label: "LinkedIn",
                },
                { href: "mailto:theaashishsoni@gmail.com", Icon: FiMail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-elevated text-foreground transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            y: useSpring(scrollY, { stiffness: 60, damping: 20 }),
          }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[3rem] bg-gradient-to-b from-foreground/10 to-transparent blur-2xl"
            />
            <div className="glass relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-elevated">
              <img
                src={portrait}
                alt="Portrait of Aashish Soni"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-border bg-background/70 p-3 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold">Aashish Soni</p>
                  <p className="text-xs text-muted-foreground">Bhiwani, India</p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                  MERN
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <span className="h-8 w-px bg-border" />
      </motion.a>
    </section>
  );
}

/* ------------------------------ About ------------------------------ */
function About() {
  const infoCards = [
    { label: "Location", value: "Bhiwani, Haryana" },
    { label: "Education", value: "B.Tech (2023–2027)" },
    { label: "CGPA", value: "7.6 / 10" },
    { label: "Specialization", value: "Full-Stack MERN" },
    { label: "Career Goal", value: "Software Engineer" },
  ];
  const stats = [
    { label: "Projects Completed", value: 2, suffix: "+" },
    { label: "Months of Internship", value: 6, suffix: "" },
    { label: "Technologies", value: 10, suffix: "+" },
  ];
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="About"
          title="Crafting thoughtful software, one detail at a time."
          subtitle="I'm a Full-Stack MERN developer and aspiring software engineer who cares deeply about polish, performance, and problems that actually matter."
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <p className="text-lg leading-relaxed text-foreground/90">
                I'm currently pursuing my B.Tech at The Technological Institute of Textile &
                Sciences, and building real-world web products with the MERN stack.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                My focus is on clean architecture, delightful UI, and integrating AI to solve
                everyday problems. I'm actively looking for software engineering roles that offer
                challenging projects, mentorship, and continuous learning.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Pursuing B.Tech",
                  "Passionate about the MERN Stack",
                  "Interested in Artificial Intelligence",
                  "Open to Software Engineering opportunities",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
                      <FiCheck size={12} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {infoCards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-surface-elevated p-5 transition hover:-translate-y-1 hover:shadow-elevated">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{c.value}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="h-full rounded-2xl bg-primary p-5 text-primary-foreground">
                <p className="text-xs uppercase tracking-widest opacity-70">Status</p>
                <p className="mt-2 text-lg font-semibold">Open to opportunities</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-3xl border border-border bg-surface p-8 text-center">
                <p className="text-hero text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Education ------------------------------ */
function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Education" title="Where I'm learning." />
        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-2 top-2 h-full w-px bg-border sm:left-4" />
          <Reveal>
            <div className="relative">
              <span className="absolute -left-6 top-4 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-primary sm:-left-8" />
              <div className="glass rounded-3xl p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                    2023 – 2027
                  </span>
                  <span className="text-sm text-muted-foreground">CGPA · 7.6 / 10</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">
                  Bachelor of Technology (B.Tech)
                </h3>
                <p className="mt-1 text-muted-foreground">
                  The Technological Institute of Textile &amp; Sciences
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Experience ------------------------------ */
function Experience() {
  const bullets = [
    "Developed full-stack MERN applications end-to-end.",
    "Designed responsive frontend interfaces with clean UX.",
    "Implemented secure authentication and authorization flows.",
    "Built optimized RESTful APIs with clear contracts.",
    "Improved website performance and overall user experience.",
  ];
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Experience" title="Where I've shipped." />
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-border bg-surface-elevated p-8 md:grid-cols-[1fr_2fr]">
            <div>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Jul 2025 – Dec 2025
              </span>
              <h3 className="mt-4 text-2xl font-semibold">Full Stack Developer Intern</h3>
              <p className="mt-1 text-muted-foreground">Arogya Pandit Pvt. Ltd.</p>
            </div>
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <Reveal key={b} delay={i * 0.05}>
                  <li className="group flex items-start gap-3 rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-surface">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold">
                      {i + 1}
                    </span>
                    <p className="text-foreground/90">{b}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Skills ------------------------------ */
type Skill = { name: string; Icon: React.ComponentType<{ size?: number }>; level: number };
const SKILL_GROUPS: { title: string; items: Skill[] }[] = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", Icon: SiJavascript, level: 90 },
      { name: "Java", Icon: SiOpenjdk, level: 78 },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js", Icon: SiReact, level: 92 },
      { name: "HTML5", Icon: SiHtml5, level: 95 },
      { name: "CSS3", Icon: SiCss, level: 90 },
      { name: "Tailwind CSS", Icon: SiTailwindcss, level: 92 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, level: 88 },
      { name: "Express.js", Icon: SiExpress, level: 85 },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB", Icon: SiMongodb, level: 85 },
      { name: "SQL", Icon: SiMysql, level: 75 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", Icon: SiGit, level: 88 },
      { name: "GitHub", Icon: SiGithub, level: 90 },
      { name: "Linux", Icon: SiLinux, level: 70 },
    ],
  },
];

function SkillBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        className="h-full rounded-full bg-foreground"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Skills"
          title="The stack I build with."
          subtitle="A focused toolkit for building fast, scalable, delightful products."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div className="h-full rounded-3xl border border-border bg-surface-elevated p-6 transition hover:-translate-y-1 hover:shadow-elevated">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {group.title}
                </p>
                <div className="mt-5 space-y-5">
                  {group.items.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-foreground">
                            <s.Icon size={18} />
                          </span>
                          <span className="font-medium">{s.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{s.level}%</span>
                      </div>
                      <SkillBar level={s.level} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Services ------------------------------ */
function Services() {
  const services = [
    {
      title: "Full-Stack Web Development",
      desc: "End-to-end MERN applications — from database and APIs to polished UI.",
    },
    {
      title: "Frontend Development",
      desc: "Fast, accessible, pixel-perfect interfaces with React and Tailwind.",
    },
    {
      title: "Backend Development",
      desc: "Scalable Node.js & Express APIs, authentication, and data modeling.",
    },
    {
      title: "AI Integration",
      desc: "Embed LLMs like Gemini into products for smarter, faster workflows.",
    },
  ];
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Services" title="How I can help." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 transition hover:-translate-y-1 hover:shadow-elevated">
                <div className="mb-6 grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground text-sm font-bold">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <FiArrowRight className="absolute bottom-6 right-6 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Projects ------------------------------ */
type Project = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  accent: string;
  github: string;
  live: string;
};
const PROJECTS: Project[] = [
  {
    name: "HelpX",
    tagline: "AI-Based Complaint Management System",
    description:
      "An AI-powered complaint management system built on the MERN stack. Gemini AI analyzes each complaint and assigns a priority level so admins can resolve the most critical issues first.",
    features: [
      "Role-based Authentication",
      "Admin & User Dashboards",
      "Complaint Management",
      "Gemini AI Integration",
      "Automatic Prioritization",
      "Responsive UI",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini AI"],
    accent: "from-neutral-900 to-neutral-600",
    github: "https://github.com/Aashishson/HelpX",
    live: "https://help-x-three.vercel.app",
  },
  {
    name: "Invoice Generator",
    tagline: "Full-Stack Invoice Management",
    description:
      "A MERN invoice management app for creating, managing, and emailing professional invoices directly to clients' Gmail accounts from the dashboard.",
    features: [
      "Client Management",
      "Invoice Generation",
      "Email Delivery",
      "Professional Templates",
      "Responsive Dashboard",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    accent: "from-neutral-800 to-neutral-500",
    github: "https://github.com/Bawejakartik/Invoice_Generator",
    live: "https://invoice-generator-five-coral.vercel.app",
  },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="group overflow-hidden rounded-[2rem] border border-border bg-surface-elevated transition hover:shadow-elevated">
        <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${p.accent}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="text-white">
              <p className="text-xs uppercase tracking-[0.3em] opacity-70">{p.tagline}</p>
              <h3 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{p.name}</h3>
            </div>
          </div>
          <motion.div
            aria-hidden
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        <div className="p-8">
          <p className="text-foreground/90">{p.description}</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <a
              href={p.github}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              target="_blank"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={p.live}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-secondary"
              target="_blank"
            >
              <FiExternalLink /> Live Demo
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Case Study <FiArrowRight />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Selected work."
          subtitle="A closer look at what I've been building."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Contact ------------------------------ */
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name) errs.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = "Enter a valid email";
    if (!subject) errs.subject = "Please add a subject";
    if (message.length < 10) errs.message = "Message is too short";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      setSending(true);
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        "service_5hbzygi",
        "template_f3e5x37",
        { name, email, from_name: name, from_email: email, subject, message, reply_to: email },
        { publicKey: "BvJvyUhObG7RcEpBI" },
      );
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrors({ message: "Could not send message. Please try again or email me directly." });
    } finally {
      setSending(false);
    }
  };


  const details = [
    { Icon: FiMail, label: "Email", value: "theaashishsoni@gmail.com", href: "mailto:theaashishsoni@gmail.com" },
    { Icon: FiPhone, label: "Phone", value: "+91 90348 36156", href: "tel:+919034836156" },
    { Icon: FiMapPin, label: "Location", value: "Bhiwani, Haryana, India" },
    { Icon: FiLinkedin, label: "LinkedIn", value: "aashish-soni", href: "https://www.linkedin.com/in/aashish-soni-21184830b/" },
    { Icon: FiGithub, label: "GitHub", value: "Aashishson", href: "https://github.com/Aashishson" },
  ];

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something great."
          subtitle="Have a role, a project, or just a question? I'd love to hear from you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface-elevated p-8">
              <div className="space-y-4">
                {details.map(({ Icon, label, value, href }) => {
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-surface">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary">
                        <Icon />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          {label}
                        </p>
                        <p className="truncate text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={label} href={href} target="_blank" rel="noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}
              </div>
              <a
                href="https://drive.google.com/file/d/1r2n0S4lG1crTufompjC1qxi1B08huKrF/view?usp=drive_link"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <FiDownload /> Download Resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-8"
              noValidate
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name} />
                <Field label="Email" name="email" type="email" error={errors.email} />
                <div className="sm:col-span-2">
                  <Field label="Subject" name="subject" error={errors.subject} />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message" name="message" multiline error={errors.message} />
                </div>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {sending ? "Sending..." : (<>Send Message <FiArrowRight /></>)}
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                      <FiCheck size={14} />
                    </span>
                    Thanks — your message has been sent. I'll reply shortly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  multiline,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  error?: string;
}) {
  const base =
    "peer w-full rounded-2xl border border-border bg-surface px-4 pb-2 pt-6 text-sm text-foreground outline-none transition placeholder-transparent focus:border-foreground";
  return (
    <label className="relative block">
      {multiline ? (
        <textarea
          name={name}
          placeholder={label}
          rows={5}
          className={base}
          maxLength={1000}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={label}
          className={base}
          maxLength={type === "email" ? 255 : 120}
          required
        />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

/* ------------------------------ Footer ------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
              AS
            </span>
            Aashish Soni
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Full-Stack MERN Developer & Software Engineer, building thoughtful digital products.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-muted-foreground hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p>
          <div className="mt-4 flex gap-2">
            {[
              { href: "https://github.com/Aashishson", Icon: FiGithub, label: "GitHub" },
              {
                href: "https://www.linkedin.com/in/aashish-soni-21184830b/",
                Icon: FiLinkedin,
                label: "LinkedIn",
              },
              { href: "mailto:theaashishsoni@gmail.com", Icon: FiMail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-elevated transition hover:-translate-y-0.5"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Aashish Soni. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-foreground transition hover:-translate-y-0.5"
          >
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Scroll Progress ------------------------------ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-foreground"
    />
  );
}

/* ------------------------------ Page ------------------------------ */
function Portfolio() {
  return (
    <div className="relative overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowUpRight, Download, Mail, MapPin, Github, Linkedin, Twitter,
  Sparkles, Code2, Rocket, Zap, Target, Users, Palette, Globe,
  ChevronDown, ExternalLink, Award, Briefcase, GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ---------------- Data ----------------
const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SKILLS = {
  Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Angular', 'Bootstrap', 'Tailwind CSS', 'Ant Design'],
  'CMS & Tools': ['WordPress', 'Sanity CMS', 'GitHub', 'Bluehost'],
  Design: ['Figma', 'Adobe Photoshop'],
  Other: ['SEO Optimization', 'Performance Optimization', 'Accessibility', 'Responsive Design', 'Team Leadership'],
};

const EXPERIENCE = [
  {
    role: 'Freelance Web Developer',
    company: 'ITH Technologies',
    period: 'Jan 2026 — Present',
    points: [
      'Managing and maintaining company websites end to end.',
      'Building the Renewist platform using Next.js, Tailwind CSS, and Sanity CMS.',
    ],
  },
  {
    role: 'UI Developer Lead',
    company: 'ITH Technologies',
    period: 'Mar 2025 — Dec 2025',
    points: [
      'Led a UI team across multiple concurrent projects.',
      'Conducted code reviews and established frontend best practices.',
      'Improved application performance and scalability across the stack.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'ITH Technologies',
    period: 'Sep 2017 — Feb 2025',
    points: [
      'Built web applications using React.js, Next.js, Angular, JavaScript, HTML, CSS, Bootstrap, and WordPress.',
      'Converted Figma designs into pixel-accurate, responsive interfaces.',
      'Improved Google PageSpeed score from 55 to 90+.',
      'Increased organic traffic by 30% through SEO and performance work.',
      'Migrated legacy Angular applications to Next.js, cutting load times by 40%.',
    ],
  },
];

const PROJECTS = [
  {
    title: 'Renewist',
    subtitle: 'Global health & wellness education platform',
    description:
      'Developed a responsive health and wellness platform using Next.js, Tailwind CSS, and Sanity CMS. Built reusable UI components, integrated headless CMS content, optimized performance, and ensured a seamless user experience across devices.',
    tags: ['Next.js', 'Tailwind CSS', 'Sanity CMS'],
    url: 'https://renewist.com/',
    accent: 'from-emerald-400/40 via-teal-400/30 to-cyan-400/30',
  },
  {
    title: 'TDX Launchpad',
    subtitle: 'Modernized launch platform, migrated from Angular',
    description:
      'Converted Figma designs into pixel-perfect responsive interfaces using Next.js, TypeScript, and Tailwind CSS. Developed reusable components, implemented modern UI patterns, and optimized performance for production deployment.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://app.tdx.biz/auth/login',
    accent: 'from-violet-400/40 via-fuchsia-400/30 to-pink-400/30',
  },
  {
    title: 'Syncshala',
    subtitle: 'Digital wellness platform for burnout prevention',
    description:
      'Converted Figma designs into responsive web pages using HTML5, CSS3, and Bootstrap. Developed user-friendly interfaces focused on accessibility, performance, and cross-device compatibility.',
    tags: ['HTML5', 'CSS3', 'Bootstrap'],
    url: 'https://syncshala.com/',
    accent: 'from-amber-400/40 via-orange-400/30 to-rose-400/30',
  },
  {
    title: 'Tradedog Group',
    subtitle: 'Corporate Web3 enterprise brand',
    description:
      'Converted Figma designs into a fully responsive corporate website using HTML5, CSS3, and Bootstrap. Ensured cross-browser compatibility, SEO optimization, and performance-focused implementation.',
    tags: ['HTML5', 'CSS3', 'Bootstrap'],
    url: 'https://tradedoggroup.com/',
    accent: 'from-indigo-400/40 via-blue-400/30 to-sky-400/30',
  },
  {
    title: 'TDMM',
    subtitle: 'Crypto marketing & media platform',
    description:
      'Clean, SEO-friendly corporate website using HTML, CSS, and Bootstrap with cross-device compatibility and performance optimization.',
    tags: ['HTML5', 'CSS3', 'Bootstrap'],
    url: 'https://tdmm.io/',
    accent: 'from-amber-400/40 via-yellow-400/30 to-orange-400/30',
  },
  {
    title: 'TDeFi',
    subtitle: 'Decentralized finance enterprise site',
    description:
      'Built a responsive enterprise website using HTML5, CSS3, and Bootstrap. Implemented modern layouts, optimized page speed, and maintained a consistent brand experience across all pages.',
    tags: ['HTML5', 'CSS3', 'Bootstrap'],
    url: 'https://tde.fi/',
    accent: 'from-fuchsia-400/40 via-purple-400/30 to-violet-400/30',
  },
  {
    title: 'BizThon',
    subtitle: 'Global hackathon connection platform',
    description:
      'Developed a responsive event and networking platform using HTML5, CSS3, and Bootstrap. Implemented modern UI components, optimized page performance, and ensured seamless navigation for users.',
    tags: ['HTML5', 'CSS3', 'Bootstrap'],
    url: 'https://bizthon.com/',
    accent: 'from-cyan-400/40 via-sky-400/30 to-blue-400/30',
  },
  {
    title: 'Coinbuck',
    subtitle: 'AdTech & crypto rewards platform',
    description:
      'Developed the public-facing website in Next.js and built user/admin panel interfaces in Angular. Created responsive layouts, integrated dynamic content, and implemented engaging user experiences for the platform.',
    tags: ['Next.js', 'Angular', 'TypeScript'],
    url: 'https://coinbuck.com/',
    accent: 'from-rose-400/40 via-pink-400/30 to-fuchsia-400/30',
  },
  {
    title: 'Tradedog',
    subtitle: 'Institutional-grade financial services web presence',
    description:
      'Designed and customized a WordPress-based corporate website. Built responsive page layouts, optimized content structure, improved user experience, and maintained the brand across all touchpoints.',
    tags: ['WordPress', 'PHP', 'CSS3'],
    url: 'https://tradedog.io/',
    accent: 'from-teal-400/40 via-emerald-400/30 to-green-400/30',
  },
];

const STATS = [
  { value: 8, suffix: '+', label: 'Years experience' },
  { value: 40, suffix: '%', label: 'Faster load time' },
  { value: 90, suffix: '+', label: 'Lighthouse score' },
  { value: 30, suffix: '%', label: 'Organic traffic growth' },
];

// ---------------- Small helpers ----------------
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

function useTypewriter(words, speed = 90, pause = 1600) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    let t;
    if (!del && text.length < current.length) {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else if (!del && text.length === current.length) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && text.length === 0) {
      setDel(false); setI(i + 1);
    }
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// Magnetic wrapper for buttons
function Magnetic({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

// ---------------- Cursor ----------------
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 16); y.set(e.clientY - 16); };
    const over = (e) => {
      const el = e.target;
      setHover(!!(el.closest && el.closest('a,button,[data-cursor]')));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, [x, y]);
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[999] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ scale: hover ? 2.4 : 1, opacity: hover ? 0.9 : 0.7 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-8 h-8 rounded-full border border-violet-400/60 bg-violet-500/10 backdrop-blur-sm"
      />
    </motion.div>
  );
}

// ---------------- Navbar ----------------
function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 20)), [scrollY]);
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className={`mx-auto max-w-6xl px-5`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? 'glass' : ''}`}>
          <a href="#top" className="flex items-center gap-2 group">
            <img src="logo.png" alt="logo" className="w-[30%] md:w-[15%]" />
          </a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="relative px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white transition-colors group">
                {n.label}
                <span className="absolute inset-x-3 -bottom-0 h-px bg-gradient-to-r from-violet-400 to-cyan-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Magnetic>
              <a href="/portfolio/MishbaResume.pdf" target="_blank" rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-neutral-200 transition-colors">
                <Download className="w-4 h-4" /> Resume
              </a>
            </Magnetic>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg glass" aria-label="menu">
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-3 flex flex-col">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/5">{n.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

// ---------------- Hero ----------------
function Hero() {
  const roles = useMemo(() => ['Senior UI Developer', 'React.js Developer', 'Next.js Developer', 'Angular Expert', 'Team Lead'], []);
  const role = useTypewriter(roles);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* animated background */}
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
      <motion.div style={{ y: y1 }} className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/30 blur-3xl blob" />
      <motion.div style={{ y: y2 }} className="absolute top-40 -right-24 w-[520px] h-[520px] rounded-full bg-cyan-500/25 blur-3xl blob" />
      <div className="noise" />

      <div className="relative mx-auto max-w-6xl px-5 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Immediate joiner · Available now
          </motion.div>

          <motion.h1
            initial="hidden" animate="show" variants={fadeUp}
            className="mt-6 font-display text-4xl sm:text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            Mishba <br />
            <span className="gradient-text">Zuber Barkati</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-5 text-lg sm:text-xl text-neutral-300 font-mono">
            <span className="caret">{role}</span>
          </motion.div>

          <motion.p initial="hidden" animate="show" custom={2} variants={fadeUp}
            className="mt-6 max-w-xl text-neutral-400 leading-relaxed">
            8+ years designing and building responsive, user-friendly, and SEO-optimized websites. Skilled across
            HTML, CSS, Bootstrap, React.js, Next.js, and WordPress — leading teams, optimizing performance, and shipping scalable
            applications from Figma to production.
          </motion.p>
          <motion.div initial="hidden" animate="show" variants={fadeUp}  custom={2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projects" data-cursor className="group inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-5 py-3 font-semibold hover:bg-neutral-200 transition-colors">
                  View Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" data-cursor className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 font-semibold hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4" /> Contact Me
                </a>
              </Magnetic>
              <Magnetic>
                <a href="/portfolio/MishbaResume.pdf" target="_blank" rel="noreferrer" data-cursor
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold hover:border-white/20 hover:bg-white/5 transition-colors">
                  <Download className="w-4 h-4" /> Download CV
                </a>
              </Magnetic>
            </div>
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={fadeUp}  custom={3}>
            <div className="mt-8 flex items-center gap-4 text-neutral-400">
              <span className="text-xs uppercase tracking-widest">Find me</span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Linkedin, href: 'https://linkedin.com/in/mishba-zuber-barkati', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:barkati.mishba26@gmail.com', label: 'Email' },
                  { icon: Github, href: 'https://github.com/mishbazuberbarkati', label: 'GitHub' },
                  { icon: Twitter, href: 'https://x.com/MishbaZuber', label: 'Twitter' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.label}
                    className="group grid place-items-center w-9 h-9 rounded-lg glass hover:bg-white/10 transition-colors">
                    <s.icon className="w-4 h-4 group-hover:text-violet-300" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Code card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/30 via-fuchsia-500/20 to-cyan-400/30 blur-2xl rounded-3xl" />
          <div className="relative glass rounded-2xl overflow-hidden card-glow float">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs text-neutral-400 font-mono">profile.ts</span>
            </div>
            <pre className="p-5 text-[13px] leading-relaxed font-mono text-neutral-300 overflow-x-auto">
              {`const developer = {
  name: "Mishba Zuber Barkati",
  role: "Senior UI Developer",
  stack: ["HTML", "CSS", "React.js", "Next.js"],
  experience: "8+ years",
  location: "Kanpur, India",
  status: "immediate_joiner"
};`}
            </pre>
            <div className="px-5 pb-5 grid grid-cols-4 text-center gap-2 text-[11px] font-mono">
              <div className="rounded-lg bg-violet-500/10 border border-violet-400/20 px-2 py-1.5 text-violet-200">HTML ▲</div>
              <div className="rounded-lg bg-violet-500/10 border border-violet-400/20 px-2 py-1.5 text-violet-200">CSS ▲</div>
              <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/20 px-2 py-1.5 text-cyan-200">react ▲</div>
              <div className="rounded-lg bg-rose-500/10 border border-rose-400/20 px-2 py-1.5 text-rose-200">next ▲</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a href="#about"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-500 hover:text-neutral-200">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}

// ---------------- Marquee ----------------
function TechMarquee() {
  const items = ['HTML', 'CSS', 'Bootstrap', 'React.js', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Node.js', 'WordPress', 'Figma to Pixel-perfect', 'Performance Optimisation', 'SEO'];
  return (
    <div className="relative border-y border-white/10 py-5 overflow-hidden bg-white/[0.02]">
      <div className="marquee whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-3 text-neutral-400">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="font-display text-lg">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- SectionHeading ----------------
function SectionHeading({ kicker, title, sub }) {
  return (
    <div className="max-w-3xl mb-12">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-300 mb-4">
        <span className="w-6 h-px bg-violet-400" /> {kicker}
      </motion.div>
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
        className="font-display text-4xl sm:text-5xl font-bold leading-tight">{title}</motion.h2>
      {sub && (
        <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2}
          className="mt-4 text-neutral-400 max-w-2xl">{sub}</motion.p>
      )}
    </div>
  );
}

// ---------------- About ----------------
function About() {
  const highlights = [
    { icon: Award, label: 'Experience', value: '8+ years' },
    { icon: Users, label: 'Leadership', value: 'Led a UI team' },
    { icon: Code2, label: 'Specialization', value: 'HTML, CSS, Bootstrap, React.js, Next.js' },
    { icon: MapPin, label: 'Based in', value: 'Kanpur, India' },
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="About" title="Eight years of turning designs into fast, accessible products" sub="A short look at the path from first lines of HTML to leading a UI team." />
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10">
          <div className="space-y-5 text-neutral-300 leading-relaxed">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              Since 2017, I've worked across the full frontend stack — Angular, React.js, Next.js, and WordPress —
              turning Figma files into interfaces that hold up on real devices and real connections, not just on a
              designer's monitor.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}>
              That work grew into leading a UI team: setting code review standards, choosing the patterns the team
              would use, and being the person accountable when performance or scalability targets were on the line.
              I care as much about how a codebase ages as how a launch demo looks.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2}>
              My specialization sits at the intersection of frontend engineering and outcomes that matter to a business —
              Lighthouse and PageSpeed scores, organic traffic, and load times that survive a slow connection. I'm
              currently an <span className="text-violet-300 font-semibold">immediate joiner</span>, open to opportunities
              in Noida, Gurugram, or remote.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((h, i) => (
              <motion.div key={h.label} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5">
                <h.icon className="w-5 h-5 text-violet-400 mb-3" />
                <div className="text-xs uppercase tracking-widest text-neutral-500">{h.label}</div>
                <div className="mt-1 font-display text-md">{h.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Skills ----------------
function Skills() {
  const groupIcons = { Frontend: Code2, 'CMS & Tools': Globe, Design: Palette, Other: Zap };
  return (
    <section id="skills" className="relative py-24">
      <div className="absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading kicker="Skills" title="The toolkit behind every build" sub="Grouped by where each tool shows up in the day-to-day — from markup to leadership." />
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(SKILLS).map(([group, items], gi) => {
            const Icon = groupIcons[group] || Sparkles;
            return (
              <motion.div key={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp} custom={gi}
                className="relative glass rounded-2xl p-6 overflow-hidden group">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-colors" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-white/10">
                    <Icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <h3 className="font-display text-xl">{group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s, i) => (
                    <motion.span key={s}
                      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.03 * i }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="rounded-lg px-3 py-1.5 text-sm border border-white/10 bg-white/[0.04] text-neutral-200 hover:border-violet-400/50 hover:bg-violet-500/10 cursor-default">
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- Experience ----------------
function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 70%', 'end 40%'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="Experience" title="Career timeline" sub="Three roles, one continuous thread: ship, lead, and keep shipping." />
        <div ref={containerRef} className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/10" />
          <motion.div style={{ height: lineH }} className="absolute left-4 sm:left-6 top-0 w-px bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-400" />
          <div className="space-y-10">
            {EXPERIENCE.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp} className="relative pl-14 sm:pl-20">
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="absolute left-2 sm:left-4 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 ring-4 ring-[#07070b]">
                  <span className="absolute inset-0 rounded-full bg-violet-400/40 animate-ping" />
                </motion.div>
                <div className="glass rounded-2xl p-6 hover:border-violet-400/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-display text-xl">{e.role}</h3>
                    <span className="text-xs font-mono text-neutral-400">{e.period}</span>
                  </div>
                  <div className="text-neutral-400 text-sm mb-4 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> {e.company}
                  </div>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    {e.points.map((p, k) => (
                      <li key={k} className="flex gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Projects ----------------
function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-40, 40], [8, -8]);
  const ry = useTransform(mx, [-40, 40], [-8, 8]);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  };
  const reset = () => { mx.set(0); my.set(0); };
  return (
    <motion.a
      ref={ref}
      href={p.url} target="_blank" rel="noreferrer" data-cursor
      onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.08 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block rounded-3xl overflow-hidden card-glow"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.accent}`}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-transparent to-transparent" />
        <div className="absolute inset-0 grid place-items-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.7 }}
            whileHover={{ scale: 1 }}
            className="font-display text-3xl sm:text-4xl font-bold text-white/90 tracking-tight drop-shadow-2xl text-center leading-tight"
            style={{ transform: 'translateZ(40px)' }}>
            {p.title}
          </motion.div>
        </div>
        <div className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-xl glass group-hover:bg-white group-hover:text-neutral-900 transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] font-mono px-2 py-1 rounded-md bg-black/40 border border-white/10 text-neutral-200">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-6 bg-white/[0.02] border-t border-white/10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl">{p.title}</h3>
            <p className="text-sm text-neutral-400">{p.subtitle}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-violet-300 transition-colors" />
        </div>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-3">{p.description}</p>
      </div>
    </motion.a>
  );
}

function Projects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PROJECTS : PROJECTS.slice(0, 6);
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="Featured Projects" title="Selected work" sub="A mix of CMS-driven platforms, framework migrations, and interactive products." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          <AnimatePresence initial={false}>
            {visible.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </AnimatePresence>
        </div>
        {PROJECTS.length > 6 && (
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <button
                onClick={() => setExpanded(!expanded)}
                data-cursor
                className="group inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                {expanded ? 'Show less' : `Show more`}
                <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </Magnetic>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------- Stats ----------------
function Stats() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative rounded-3xl glass p-8 sm:p-12 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-bold gradient-text">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-neutral-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Contact ----------------
function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="Contact" title="Let's build something fast and accessible" sub="Open to full-time, contract, and lead frontend roles — based in Kanpur, available immediately." />
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="relative glass rounded-3xl p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl blob" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</div>
              <a href="mailto:barkati.mishba26@gmail.com" className="font-display text-2xl sm:text-3xl gradient-text break-all">barkati.mishba26@gmail.com</a>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Location & availability</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-violet-300" /> Kanpur, India</div>
                  <div className="text-sm text-neutral-400 mt-1">Open for opportunities in Noida, Gurugram & Remote</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Elsewhere</div>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Linkedin, href: 'https://linkedin.com/in/mishba-zuber-barkati' },
                      { icon: Mail, href: 'mailto:barkati.mishba26@gmail.com' },
                      { icon: Github, href: 'https://github.com/mishbazuberbarkati' },
                      { icon: Twitter, href: 'https://x.com/MishbaZuber' },
                    ].map((s, i) => (
                      <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        className="grid place-items-center w-10 h-10 rounded-xl border border-white/10 hover:border-violet-400/40 hover:bg-violet-500/10 transition-colors">
                        <s.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="mailto:barkati.mishba26@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-5 py-3 font-semibold hover:bg-neutral-200">
                    <Mail className="w-4 h-4" /> Email Me
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="/portfolio/MishbaResume.pdf" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold hover:bg-white/5">
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="relative glass rounded-3xl p-5 md:p-8 overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl blob" />
            <div className="relative flex flex-col h-full justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
                  <Rocket className="w-3.5 h-3.5 text-violet-300" /> What I bring
                </div>
                <h3 className="font-display text-2xl mt-4">Ship-first, but built to age well.</h3>
                <p className="text-sm text-neutral-400 mt-2">
                  I care about the numbers that stick around after launch: PageSpeed, accessibility, and codebases
                  the next dev doesn't hate you for.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Lighthouse 90+', 'SEO-first', 'Reusable UI', 'Accessible', 'Figma → Prod', 'Team lead'].map((k) => (
                  <span key={k} className="rounded-lg border border-white/10 px-1 py-2 md:px-2 text-center md:text-neutral-300">{k}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Footer ----------------
function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 grid place-items-center text-[10px] font-bold text-white">MZB</div>
          © {new Date().getFullYear()} Mishba Zuber Barkati
        </div>
        <div className="flex items-center gap-3 text-neutral-500 text-sm">
          {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-white transition-colors">{n.label}</a>)}
        </div>
      </div>
    </footer>
  );
}

// ---------------- ScrollProgress ----------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 origin-left z-[60]" />
  );
}

// ---------------- Page ----------------
const App = () => {
  return (
    <main className="relative">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;

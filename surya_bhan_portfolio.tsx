import React, { useState, useEffect, useRef } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap";

const RESUME_FILE = "/Surya_Bhan_PM_Resume.pdf";

/* ──────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────── */

const LOGO_VERSION = "5";
const LogoImg: React.FC<{ src: string; alt: string; size?: number }> = ({ src, alt, size = 48 }) => (
  <div
    className="rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 ring-1 ring-black/5 shadow-sm"
    style={{ width: size, height: size, padding: Math.max(2, Math.round(size * 0.1)) }}
  >
    <img
      src={`${src}?v=${LOGO_VERSION}`}
      alt={alt}
      className="max-w-full max-h-full object-contain"
      loading="lazy"
    />
  </div>
);

const BrandLogos = {
  rezo: ({ size = 48 }: { size?: number } = {}) => <LogoImg src="/rezo.png" alt="Rezo.ai" size={size} />,
  belzabar: ({ size = 48 }: { size?: number } = {}) => <LogoImg src="/belzabar.png" alt="Belzabar" size={size} />,
  authbridge: ({ size = 48 }: { size?: number } = {}) => <LogoImg src="/authbridge.avif" alt="AuthBridge" size={size} />,
  iitj: ({ size = 40 }: { size?: number } = {}) => <LogoImg src="/iitj.png" alt="IIT Jodhpur" size={size} />,
  vit: ({ size = 40 }: { size?: number } = {}) => <LogoImg src="/vit.png" alt="VIT Vellore" size={size} />,
  cspo: ({ size = 48 }: { size?: number } = {}) => <LogoImg src="/cspo.png" alt="Certified Scrum Product Owner" size={size} />,
  pmp: ({ size = 48 }: { size?: number } = {}) => <LogoImg src="/pmp.png" alt="Project Management Professional" size={size} />,
};

const headlineStats = [
  { value: "₹4Cr+", label: "Operational Cost Savings" },
  { value: "₹2.5Cr/mo", label: "FinTech Disbursements" },
  { value: "1Cr+", label: "Daily AI Calls Scaled" },
  { value: "54%", label: "Faster Doc TAT" },
];

const workExperience = [
  {
    id: "rezo",
    company: "Rezo.ai",
    logo: BrandLogos.rezo,
    role: "Product Manager — Voice AI & Agentic Workflows",
    period: "Aug 2024 — Present",
    location: "Remote · India",
    accent: "#6366F1",
    bgAccent: "bg-indigo-500",
    textAccent: "text-indigo-500",
    softAccent: "bg-indigo-500/10",
    borderAccent: "hover:border-indigo-500/50",
    summary: "Led the strategic migration from deterministic flow bots to hybrid agentic AI — reshaping how enterprises (BFSI, telecom, D2C) deploy voice AI at scale.",
    metrics: [
      { value: "90→40%", label: "Flow Dependency" },
      { value: "30%+", label: "Revenue Growth" },
      { value: "₹10L", label: "Q4 Cost Savings" },
    ],
    highlights: [
      "Directed migration to hybrid agentic AI architecture — agentic LLM orchestrator with compliance-grade deterministic nodes.",
      "Architected self-serve analytics on MCP server infrastructure, eliminating 5-day SQL cycles and cutting CS escalations ~70%.",
      "Led 0-to-1 visual Workflow Orchestration Engine empowering non-technical ops teams to build voice AI agents.",
    ],
  },
  {
    id: "belzabar",
    company: "Belzabar Software",
    logo: BrandLogos.belzabar,
    role: "Technical Product Manager",
    period: "Sep 2023 — May 2024",
    location: "New Delhi, India",
    accent: "#8B5CF6",
    bgAccent: "bg-violet-500",
    textAccent: "text-violet-500",
    softAccent: "bg-violet-500/10",
    borderAccent: "hover:border-violet-500/50",
    summary: "Owned the GenAI roadmap for an enterprise document intelligence platform — shipped a hybrid OCR + GPT-Vision pipeline that pulled a major client back from churn.",
    metrics: [
      { value: "54%", label: "Faster TAT" },
      { value: "20%", label: "Accuracy Gain" },
      { value: "75%", label: "Faster APIs" },
    ],
    highlights: [
      "Deployed GPT-Vision document intelligence with confidence-based routing — cut verification TAT by 54%, accuracy up 20%.",
      "Built Swagger-based API auto-generation tooling, reducing deployment time by 75% across the backend team.",
      "Integrated GROQ-based intelligent support automation — cut RCA time by up to 60 minutes, client escalations down 28%.",
    ],
  },
  {
    id: "authbridge",
    company: "AuthBridge",
    logo: BrandLogos.authbridge,
    role: "Product Manager — FinTech APIs & Identity Verification",
    period: "May 2022 — Mar 2024",
    location: "Gurgaon, India",
    accent: "#F59E0B",
    bgAccent: "bg-amber-500",
    textAccent: "text-amber-500",
    softAccent: "bg-amber-500/10",
    borderAccent: "hover:border-amber-500/50",
    summary: "Owned 140+ verification APIs and launched the Account Aggregator framework for NBFCs — scaled monthly disbursements to ₹1.5Cr+ while shrinking onboarding friction.",
    metrics: [
      { value: "₹1.5Cr/mo", label: "TPV via AA" },
      { value: "21%", label: "Less Drop-off" },
      { value: "32%", label: "Auto-closure" },
    ],
    highlights: [
      "Launched Account Aggregator APIs with NBFCs — scaled monthly disbursements to ₹1.5Cr; ₹50L/mo revenue uplift in two quarters.",
      "Optimized top 20 of 140+ microservice APIs to sub-3s p95; lifted release velocity ~30%.",
      "Ran 25+ field audits → Video KYC redesign reduced drop-offs 21% (real-time edge detection + queue transparency).",
    ],
  },
];

const skills = [
  {
    title: "Product Strategy",
    items: ["Go-to-Market Strategy", "Roadmap & OKRs", "0-to-1 Launches", "A/B Testing", "Pricing & Packaging", "Discovery & Research"],
    accent: "from-indigo-500/20 to-indigo-500/0",
    icon: "🎯",
  },
  {
    title: "Generative AI / LLM",
    items: ["Agentic AI Workflows", "LLM Orchestration", "Prompt Engineering", "RAG Architecture", "GPT-Vision", "MCP Servers"],
    accent: "from-violet-500/20 to-violet-500/0",
    icon: "✦",
  },
  {
    title: "Technical",
    items: ["API Design (REST / Swagger)", "Microservices", "SQL", "Power BI", "System Design", "Eval Frameworks"],
    accent: "from-emerald-500/20 to-emerald-500/0",
    icon: "⚙",
  },
  {
    title: "Execution",
    items: ["Agile / Scrum", "Jira & Confluence", "Figma", "Stakeholder Mgmt", "Cross-functional Leadership", "B2B SaaS Scaling"],
    accent: "from-amber-500/20 to-amber-500/0",
    icon: "⚡",
  },
];

const education = [
  {
    school: "Indian Institute of Technology (IIT) Jodhpur",
    degree: "Master of Business Administration (MBA)",
    period: "2020 — 2022",
    detail: "Focus on tech product management, strategy, and analytics. Active in entrepreneurship cell and case competitions.",
    logo: BrandLogos.iitj,
    accent: "#10B981",
  },
  {
    school: "Vellore Institute of Technology (VIT)",
    degree: "B.Tech, Mechanical Engineering",
    period: "2015 — 2019",
    detail: "Built foundation in systems thinking, modeling, and first-principles problem solving — applied today to product architecture.",
    logo: BrandLogos.vit,
    accent: "#3B82F6",
  },
];

const certifications = [
  { name: "Certified Scrum Product Owner", short: "CSPO", issuer: "Scrum Alliance", year: "2025", logo: BrandLogos.cspo },
  { name: "Project Management Professional", short: "PMP", issuer: "PMI", year: "2023", logo: BrandLogos.pmp },
];

const caseStudies = [
  {
    id: "agentic-ai-rezo",
    title: "Agentic AI Transformation at Rezo.ai",
    subtitle: "Hybrid agentic architecture, deterministic guardrails",
    company: "Rezo.ai",
    tag: "AI Architecture",
    accent: "#6366F1",
    bgAccent: "bg-indigo-500",
    textAccent: "text-indigo-500",
    duration: "9 min read",
    summary: "Reduced flow dependency 90→40% and drove 30%+ enterprise revenue growth by orchestrating LLM reasoning over a deterministic compliance backbone.",
    metrics: ["90→40% Flows", "30%+ Revenue", "~10× Faster Onboarding"],
    sections: {
      challenge: "Rezo's deterministic flow-builders meant 3–6 week onboarding and a 55–65% containment ceiling. Two enterprise accounts had churned to LLM-native competitors (Cresta, Observe.ai, Vapi) citing inflexibility — sales was losing demos at the 'can it reason multi-turn?' question.",
      insight: "Pure flows can't reason; pure LLMs fail compliance. The 40% floor wasn't arbitrary — it represented the compliance-critical surface (KYC scripts, regulatory disclosures, payment confirmations) where deterministic behavior is non-negotiable.",
      transformation: {
        before: ["3–6 week use-case onboarding", "55–65% containment plateau", "40–50% of solutions eng time on flow maintenance"],
        after: ["~10x faster onboarding via agentic AI", "30%+ growth in bot-generated enterprise revenue", "Premium SKU launched with usage-based pricing"],
      },
      bento: [
        { title: "Hybrid Orchestrator", desc: "Agentic LLM reasons over context, invokes tools from a scoped registry (RAG, CRM lookups, APIs, transactional actions) with PII redaction and tenant-scoped permissions.", span: "col-span-2" },
        { title: "Golden Dataset Eval", desc: "~2,000 historical conversations with labeled outcomes — every prompt/model change must pass regression before promotion.", span: "col-span-1" },
        { title: "Phased Pilot", desc: "3 friendly clients first with clear exit ramp, then expansion based on containment & CSAT delta.", span: "col-span-1" },
      ],
    },
  },
  {
    id: "mcp-analytics-rezo",
    title: "Self-Serve Conversational Analytics on MCP",
    subtitle: "From dashboard tickets to ask-and-answer",
    company: "Rezo.ai",
    tag: "GenAI Platform",
    accent: "#8B5CF6",
    bgAccent: "bg-violet-500",
    textAccent: "text-violet-500",
    duration: "7 min read",
    summary: "Eliminated 5-day SQL cycles by building a conversational analytics layer on MCP — letting enterprise clients ask questions and get sourced answers in seconds.",
    metrics: ["~70% Fewer Tickets", "≈0 Ad-hoc Pulls", "Days → Hours QBR"],
    sections: {
      challenge: "Every enterprise client wanted slightly different cuts of conversational data. The fixed 8–10 dashboards meant a Jira ticket → CS → SQL request → 3–5 day CSV. ~30–40% of senior CS time was eaten by reporting. Two clients flagged it in renewal conversations.",
      insight: "Clients didn't want more dashboards — they wanted to ask questions. MCP gave clean separation between the LLM (reasons over the question) and the data layer (enforces permissions, schema, query templates).",
      transformation: {
        before: ["3–5 day reporting cycles", "30–40% CS time on reports", "5–10 ad-hoc SQL pulls per week"],
        after: ["~70% drop in reporting tickets", "Near-zero ad-hoc data pulls", "QBR prep days → hours"],
      },
      bento: [
        { title: "MCP Tool Surface", desc: "~20 tools (get_call_volume, get_sentiment_breakdown, compare_periods…) with schema validation and tenant-scoped data access at the server layer.", span: "col-span-2" },
        { title: "Source Citations", desc: "Every answer cites which tool produced which number with a 'view underlying data' affordance — earned client trust.", span: "col-span-1" },
        { title: "Schema Standardization", desc: "Canonical warehouse schema across tenants — the unsexy work that took longer than the LLM layer itself.", span: "col-span-1" },
      ],
    },
  },
  {
    id: "gpt-vision-belzabar",
    title: "Hybrid OCR + GPT-Vision Document Intelligence",
    subtitle: "Confidence-based routing, not wholesale replacement",
    company: "Belzabar Software",
    tag: "Doc AI",
    accent: "#EC4899",
    bgAccent: "bg-pink-500",
    textAccent: "text-pink-500",
    duration: "8 min read",
    summary: "Cut verification TAT 54% and lifted accuracy 20% on a messy 40% tail — by routing on OCR confidence rather than ripping out the existing pipeline.",
    metrics: ["54% Faster TAT", "20% Accuracy", "~60% Smaller Queue"],
    sections: {
      challenge: "Traditional OCR worked on the easy 60% but fell off a cliff on messy documents — handwriting, low-res mobile scans, partial occlusions — dropping to 65–70% accuracy. 24–48hr human review backlog. A major enterprise client had escalated, threatening contract renegotiation.",
      insight: "OCR's confidence scores were already there but underutilized. GPT-Vision per-document was too expensive wholesale. Selective routing based on confidence + image quality signals unlocked the business case.",
      transformation: {
        before: ["65–70% accuracy on messy 40%", "24–48hr human review backlog", "Client escalation, contract at risk"],
        after: ["54% end-to-end TAT reduction", "~60% smaller human review queue", "Previously-escalated client renewed & expanded"],
      },
      bento: [
        { title: "Confidence Router", desc: "OCR runs first. High-confidence auto-accepts. Mid-confidence escalates to GPT-Vision with per-doc-type prompts. Low-confidence routes to humans with both outputs shown.", span: "col-span-2" },
        { title: "Strict JSON Schemas", desc: "Per document type (PAN, passport, utility bill) with validation and graceful fallback on malformed output.", span: "col-span-1" },
        { title: "Eval Infrastructure", desc: "Labeled test set of 2–3K documents. Every prompt or model change runs the full eval before promotion.", span: "col-span-1" },
      ],
    },
  },
  {
    id: "video-kyc-authbridge",
    title: "Video KYC UX Redesign",
    subtitle: "Field-research-led conversion lift",
    company: "AuthBridge",
    tag: "FinTech UX",
    accent: "#F59E0B",
    bgAccent: "bg-amber-500",
    textAccent: "text-amber-500",
    duration: "6 min read",
    summary: "Reduced VKYC drop-offs by 21% (relative) — through 25+ field audits, document-capture edge detection, queue transparency, and consent redesign that legal approved.",
    metrics: ["21% Less Drop-off", "25+ Field Audits", "70% Completion"],
    sections: {
      challenge: "Video KYC drop-offs ran 30–50% industry-wide. AuthBridge was performant but not class-leading, and enterprise clients were asking for funnel improvements. Every percentage point was direct revenue loss for the NBFC.",
      insight: "Field audits gave the why, instrumented data gave the where. Drop-offs clustered at three points: document framing (no real-time feedback), agent queue (90s wait, just a spinner), and consent text wall.",
      transformation: {
        before: ["~38% drop-off across the funnel", "Static rectangle for doc capture", "Spinner-only agent connection"],
        after: ["~30% drop-off (21% relative reduction)", "Real-time edge detection + auto-capture", "Queue transparency with countdown + callback option"],
      },
      bento: [
        { title: "25+ Field Audits", desc: "Mix of in-person NBFC branches and remote VKYC sessions across urban tier-1 and tier-2/3 geographies, multiple age groups.", span: "col-span-2" },
        { title: "Legal-Approved Consent", desc: "Plain-language summary + progressive disclosure, full legal text retained. Approved by compliance before A/B.", span: "col-span-1" },
        { title: "Per-step A/B Tests", desc: "Each intervention validated against funnel-step lift, weighted across demographics to avoid Simpson's paradox.", span: "col-span-1" },
      ],
    },
  },
];

/* ──────────────────────────────────────────────────────────────────
   HOOKS
   ────────────────────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return revealed;
}

function useInView<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
  // Triggers when the element's top edge has scrolled ~120px past the viewport bottom —
  // so the card is comfortably in view before the reveal animation starts.
  const merged: IntersectionObserverInit = {
    threshold: 0,
    rootMargin: "0px 0px -120px 0px",
    ...options,
  };
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, merged);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// Reusable Tailwind classes for the reveal animation — single source of truth.
const REVEAL_BASE =
  "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";
const REVEAL_HIDDEN = "opacity-0 translate-y-12 scale-[0.96] blur-[3px]";
const REVEAL_SHOWN = "opacity-100 translate-y-0 scale-100 blur-0";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight * 0.35;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(ids[0]);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

/* ──────────────────────────────────────────────────────────────────
   THEME
   ────────────────────────────────────────────────────────────────── */
type Theme = "dark" | "light";
const ThemeContext = React.createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "dark",
  setTheme: () => {},
});

const T = {
  bg: { dark: "bg-zinc-950", light: "bg-stone-50" },
  bgAlt: { dark: "bg-zinc-900/40", light: "bg-white" },
  bgInverse: { dark: "bg-white", light: "bg-zinc-950" },
  text: { dark: "text-zinc-50", light: "text-zinc-950" },
  textInverse: { dark: "text-zinc-950", light: "text-white" },
  textMuted: { dark: "text-zinc-400", light: "text-zinc-600" },
  textSubtle: { dark: "text-zinc-500", light: "text-zinc-500" },
  textFaint: { dark: "text-zinc-600", light: "text-zinc-400" },
  border: { dark: "border-zinc-800", light: "border-zinc-200" },
  borderSoft: { dark: "border-zinc-800/50", light: "border-zinc-200/70" },
  card: { dark: "bg-zinc-900/40", light: "bg-white" },
  cardHover: { dark: "hover:bg-zinc-900", light: "hover:bg-stone-100" },
  divider: { dark: "border-zinc-800", light: "border-zinc-200" },
};

const tc = (key: keyof typeof T, theme: Theme) => T[key][theme];

/* ──────────────────────────────────────────────────────────────────
   SECTION WRAPPER
   ────────────────────────────────────────────────────────────────── */
const Section: React.FC<{
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  theme: Theme;
}> = ({ id, label, title, children, className = "", theme }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id={id} ref={ref} className={`scroll-mt-28 ${className}`}>
      <div className={`${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}`}>
        <div className="flex items-baseline gap-3 mb-3">
          <span className={`text-xs font-bold uppercase tracking-[0.2em] ${tc("textFaint", theme)}`}>
            {label}
          </span>
          <div className={`flex-1 h-px ${tc("border", theme)} border-t`} />
        </div>
        {title && (
          <h2
            className={`font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-tight mb-12 ${tc("text", theme)}`}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────────────
   NAVIGATION
   ────────────────────────────────────────────────────────────────── */
const Nav: React.FC<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  onHello: () => void;
}> = ({ theme, setTheme, onHello }) => {
  const sections = ["work", "skills", "education", "case-studies"];
  const labels: Record<string, string> = {
    work: "Work",
    skills: "Skills",
    education: "Education",
    "case-studies": "Case Studies",
  };
  const active = useActiveSection(sections);

  const navBg =
    theme === "dark"
      ? "bg-zinc-950/70 border-zinc-800/80"
      : "bg-white/70 border-zinc-200/80";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 pt-4">
      <div
        className={`max-w-6xl mx-auto rounded-2xl border ${navBg} backdrop-blur-xl px-4 md:px-6 py-3 flex items-center justify-between gap-4 shadow-lg shadow-black/5`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-serif text-sm shadow-[0_0_18px_rgba(99,102,241,0.3)]">
            S
          </div>
          <span className={`hidden sm:block text-sm font-medium ${tc("text", theme)}`}>
            Surya
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                active === s
                  ? tc("text", theme)
                  : `${tc("textMuted", theme)} hover:${tc("text", theme)}`
              }`}
            >
              {labels[s]}
              {active === s && (
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px ${
                    theme === "dark" ? "bg-zinc-50" : "bg-zinc-950"
                  }`}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-9 h-9 rounded-full border ${tc("border", theme)} flex items-center justify-center transition-all hover:scale-105 ${tc("textMuted", theme)}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={onHello}
            className={`hidden sm:block px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 ${
              theme === "dark"
                ? "bg-white text-zinc-950"
                : "bg-zinc-950 text-white"
            }`}
          >
            Say Hello
          </button>
        </div>
      </div>
    </header>
  );
};

/* ──────────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────────── */
const Hero: React.FC<{ theme: Theme; onHello: () => void }> = ({ theme, onHello }) => {
  const loaded = useReveal(80);
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-24">
      <div
        className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <p className={`text-xs uppercase tracking-[0.2em] font-medium ${tc("textMuted", theme)}`}>
            Open to Senior PM roles · AI / FinTech
          </p>
        </div>

        <h1
          className={`font-serif text-[clamp(44px,8vw,112px)] leading-[0.95] tracking-tighter ${tc("text", theme)}`}
        >
          I turn ambiguous AI problems
          <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
            into products that move metrics.
          </span>
        </h1>

        <p
          className={`mt-10 text-lg md:text-xl font-light max-w-3xl leading-relaxed ${tc("textMuted", theme)}`}
        >
          I'm <span className={tc("text", theme)}>Surya Bhan Pratap Singh</span>, an AI Product Manager (CSPO · PMP) with 4+ years shipping
          B2B SaaS across <span className={tc("text", theme)}>conversational AI</span>, <span className={tc("text", theme)}>document intelligence</span>, and
          <span className={tc("text", theme)}> FinTech</span> — driving millions in disbursements and cost savings.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={onHello}
            className={`group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] ${
              theme === "dark" ? "bg-white text-zinc-950" : "bg-zinc-950 text-white"
            }`}
          >
            Say Hello
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a
            href={RESUME_FILE}
            download
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-colors ${
              theme === "dark"
                ? "border-zinc-800 text-zinc-200 hover:border-zinc-500"
                : "border-zinc-200 text-zinc-800 hover:border-zinc-400"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Stats Strip */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-px ${theme === "dark" ? "bg-zinc-900" : "bg-zinc-200"} rounded-2xl overflow-hidden border ${tc("border", theme)}`}>
          {headlineStats.map((s, i) => (
            <div
              key={i}
              className={`p-6 md:p-8 ${tc("bg", theme)} transition-all hover:bg-opacity-50`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`font-serif text-3xl md:text-4xl tracking-tight ${tc("text", theme)}`}>
                {s.value}
              </div>
              <div className={`mt-2 text-xs uppercase tracking-wider ${tc("textSubtle", theme)}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   WORK SECTION
   ────────────────────────────────────────────────────────────────── */
const WorkCard: React.FC<{
  cs: typeof workExperience[number];
  idx: number;
  theme: Theme;
  onSelect: (id: string) => void;
}> = ({ cs, idx, theme, onSelect }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative pl-16 md:pl-20 group cursor-pointer ${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}`}
      style={{ transitionDelay: `${idx * 160}ms` }}
      onClick={() => onSelect(cs.id)}
    >
      <div
        className={`absolute left-[18px] top-[40px] w-3 h-3 rounded-full border-2 ${
          theme === "dark" ? "border-zinc-950" : "border-stone-50"
        } ${theme === "dark" ? "bg-zinc-700" : "bg-zinc-300"} group-hover:${cs.bgAccent} transition-colors duration-500 z-10`}
      />
      <div
        className={`${tc("card", theme)} border ${tc("border", theme)} ${cs.borderAccent} rounded-3xl p-6 md:p-8 transition-all duration-500 ${tc("cardHover", theme)} hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 100% 0%, ${cs.accent}, transparent 70%)` }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-5">
            <cs.logo />
            <div>
              <h3 className={`font-serif text-2xl md:text-3xl mb-1 ${tc("text", theme)}`}>
                {cs.company}
              </h3>
              <p className={`text-sm font-medium ${tc("textMuted", theme)}`}>{cs.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className={`hidden md:flex flex-col items-end ${tc("textSubtle", theme)}`}>
              <span>{cs.period}</span>
              <span>{cs.location}</span>
            </div>
            <div
              className={`w-9 h-9 rounded-full border ${tc("border", theme)} flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 ${tc("textMuted", theme)}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        <p className={`text-sm md:text-base leading-relaxed mb-6 ${tc("textMuted", theme)}`}>
          {cs.summary}
        </p>

        <div className={`grid grid-cols-3 gap-3 mb-6 pb-6 border-b ${tc("borderSoft", theme)}`}>
          {cs.metrics.map((m, i) => (
            <div key={i}>
              <div className={`font-serif text-xl md:text-2xl ${cs.textAccent}`}>{m.value}</div>
              <div className={`text-[10px] uppercase tracking-wider mt-1 ${tc("textSubtle", theme)}`}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <ul className="space-y-2.5">
          {cs.highlights.map((h, i) => (
            <li key={i} className={`flex items-start gap-3 text-sm ${tc("textMuted", theme)}`}>
              <span className={`${cs.textAccent} mt-1.5 text-[8px]`}>●</span>
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const WorkSection: React.FC<{ theme: Theme; onSelect: (id: string) => void }> = ({ theme, onSelect }) => {
  return (
    <Section
      id="work"
      label="Work"
      title="Where I've shipped."
      theme={theme}
      className="max-w-6xl mx-auto px-6 md:px-12 py-20"
    >
      <div className="relative">
        <div
          className={`absolute left-[23px] top-4 bottom-4 w-[2px] ${
            theme === "dark" ? "bg-zinc-900" : "bg-zinc-200"
          }`}
        />
        <div className="flex flex-col gap-8">
          {workExperience.map((cs, idx) => (
            <WorkCard key={cs.id} cs={cs} idx={idx} theme={theme} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────────────────────────────
   SKILLS SECTION
   ────────────────────────────────────────────────────────────────── */
const SkillCard: React.FC<{
  s: typeof skills[number];
  idx: number;
  theme: Theme;
}> = ({ s, idx, theme }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative rounded-3xl border ${tc("border", theme)} ${tc("card", theme)} p-7 md:p-8 overflow-hidden group hover:-translate-y-1 hover:shadow-xl ${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}`}
      style={{ transitionDelay: `${idx * 160}ms` }}
    >
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${s.accent} opacity-60 blur-3xl group-hover:opacity-100 transition-opacity duration-700`}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{s.icon}</span>
          <h3 className={`font-serif text-2xl md:text-3xl ${tc("text", theme)}`}>{s.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {s.items.map((item, i) => (
            <span
              key={item}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${tc("border", theme)} ${tc("textMuted", theme)} ${tc("bgAlt", theme)} transition-all duration-500 hover:scale-105 hover:border-current`}
              style={{
                transitionDelay: `${idx * 100 + i * 50}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(6px)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillsSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <Section
      id="skills"
      label="Skills"
      title="Toolbox."
      theme={theme}
      className="max-w-6xl mx-auto px-6 md:px-12 py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s, idx) => (
          <SkillCard key={s.title} s={s} idx={idx} theme={theme} />
        ))}
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────────────────────────────
   EDUCATION SECTION
   ────────────────────────────────────────────────────────────────── */
const EducationCard: React.FC<{
  e: typeof education[number];
  idx: number;
  theme: Theme;
}> = ({ e, idx, theme }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative rounded-3xl border ${tc("border", theme)} ${tc("card", theme)} p-8 group overflow-hidden hover:-translate-y-1 hover:shadow-xl ${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}`}
      style={{ transitionDelay: `${idx * 180}ms` }}
    >
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: e.accent }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <e.logo />
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${tc("border", theme)} ${tc("textMuted", theme)}`}
          >
            {e.period}
          </span>
        </div>

        <h3 className={`font-serif text-2xl md:text-[28px] leading-tight mb-2 ${tc("text", theme)}`}>
          {e.school}
        </h3>
        <p className={`text-sm font-medium mb-4 ${tc("textMuted", theme)}`}>{e.degree}</p>
        <p className={`text-sm leading-relaxed ${tc("textSubtle", theme)}`}>{e.detail}</p>
      </div>
    </div>
  );
};

const EducationSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <Section
      id="education"
      label="Education & Certifications"
      title="Foundations."
      theme={theme}
      className="max-w-6xl mx-auto px-6 md:px-12 py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {education.map((e, idx) => (
          <EducationCard key={e.school} e={e} idx={idx} theme={theme} />
        ))}
      </div>

      {/* Certifications */}
      <div className={`mt-6 rounded-3xl border ${tc("border", theme)} ${tc("card", theme)} p-7 md:p-8`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${tc("textFaint", theme)}`}>
              Certifications
            </p>
            <h3 className={`font-serif text-xl ${tc("text", theme)}`}>Professional Credentials</h3>
          </div>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={tc("textMuted", theme)}>
            <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((c) => (
            <div
              key={c.short}
              className={`flex items-center gap-4 p-4 rounded-2xl border ${tc("border", theme)} ${tc("bgAlt", theme)} transition-all hover:scale-[1.02]`}
            >
              <c.logo size={52} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${tc("text", theme)}`}>{c.name}</p>
                <p className={`text-xs ${tc("textSubtle", theme)}`}>
                  {c.short} · {c.issuer}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${tc("border", theme)} ${tc("textMuted", theme)}`}
              >
                {c.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────────────────────────────
   CASE STUDIES SECTION
   ────────────────────────────────────────────────────────────────── */
const CaseStudyCard: React.FC<{
  cs: typeof caseStudies[number];
  idx: number;
  theme: Theme;
  onSelect: (id: string) => void;
}> = ({ cs, idx, theme, onSelect }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <article
      ref={ref}
      onClick={() => onSelect(cs.id)}
      className={`group cursor-pointer relative rounded-3xl border ${tc("border", theme)} ${tc("card", theme)} p-7 md:p-8 overflow-hidden hover:-translate-y-1 hover:shadow-2xl ${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}`}
      style={{ transitionDelay: `${idx * 160}ms` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 0%, ${cs.accent}, transparent 60%)` }}
      />
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${tc("border", theme)} ${cs.textAccent}`}
          >
            {cs.tag}
          </span>
          <span className={`text-[10px] ${tc("textSubtle", theme)}`}>{cs.duration}</span>
        </div>

        <h3 className={`font-serif text-2xl md:text-[28px] leading-[1.1] mb-2 tracking-tight ${tc("text", theme)}`}>
          {cs.title}
        </h3>
        <p className={`text-sm font-medium mb-4 ${cs.textAccent}`}>{cs.subtitle}</p>
        <p className={`text-sm leading-relaxed mb-6 ${tc("textMuted", theme)} flex-1`}>{cs.summary}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {cs.metrics.map((m) => (
            <span
              key={m}
              className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${tc("bgAlt", theme)} border ${tc("border", theme)} ${tc("textMuted", theme)}`}
            >
              {m}
            </span>
          ))}
        </div>

        <div className={`flex items-center justify-between pt-4 border-t ${tc("borderSoft", theme)}`}>
          <span className={`text-xs ${tc("textSubtle", theme)}`}>{cs.company}</span>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={tc("text", theme)}>Read case study</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`${tc("text", theme)} group-hover:translate-x-1 transition-transform`}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

const CaseStudiesSection: React.FC<{ theme: Theme; onSelect: (id: string) => void }> = ({ theme, onSelect }) => {
  return (
    <Section
      id="case-studies"
      label="Case Studies"
      title="Deep dives."
      theme={theme}
      className="max-w-6xl mx-auto px-6 md:px-12 py-20"
    >
      <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${tc("textMuted", theme)}`}>
        Long-form writeups of the discovery, decisions, tradeoffs, and outcomes behind the work — built from
        actual ticket mining, field audits, and post-mortems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caseStudies.map((cs, idx) => (
          <CaseStudyCard key={cs.id} cs={cs} idx={idx} theme={theme} onSelect={onSelect} />
        ))}
      </div>

      <p className={`mt-8 text-xs text-center ${tc("textFaint", theme)}`}>
        More writeups coming soon — covering OPUS field-agent app, employment verification automation, and more.
      </p>
    </Section>
  );
};

/* ──────────────────────────────────────────────────────────────────
   ABOUT + CONTACT FOOTER
   ────────────────────────────────────────────────────────────────── */
const AboutContact: React.FC<{ theme: Theme; onHello: () => void }> = ({ theme, onHello }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`max-w-6xl mx-auto px-6 md:px-12 py-20 ${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-16 mb-20">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${tc("textFaint", theme)}`}>About</p>
          <div className={`text-base leading-loose space-y-5 ${tc("textMuted", theme)}`}>
            <p>
              I started in mechanical engineering at VIT, did an MBA at IIT Jodhpur, and landed in AI
              product management — not because it was trendy, but because I kept finding myself in the
              room where a system was failing and thinking{" "}
              <span className={`font-medium italic ${tc("text", theme)}`}>
                "the product decision that caused this was avoidable."
              </span>
            </p>
            <p>
              At AuthBridge, I rode along with field verification agents, sat with NBFC credit teams, and
              pulled 90 days of API logs to find the endpoints that actually mattered. At Belzabar, I
              analyzed 500 failed documents to design a confidence-based routing system instead of a
              wholesale GPT-Vision replacement.
            </p>
            <p>
              The thread across it all — I like being the person who can instrument per-stage API latency
              at 10am, present a market segmentation framework to leadership at 2pm, and run a
              think-aloud session with a non-technical user at 4pm.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${tc("textFaint", theme)}`}>Now</p>
          {[
            { k: "Role", v: "Product Manager — Voice AI & Agentic Workflows" },
            { k: "Company", v: "Rezo.ai" },
            { k: "Based", v: "India · Remote-friendly" },
            { k: "Looking for", v: "Senior PM roles in AI / FinTech" },
          ].map((row) => (
            <div
              key={row.k}
              className={`flex flex-col p-4 rounded-2xl border ${tc("border", theme)} ${tc("card", theme)}`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-widest ${tc("textFaint", theme)}`}>{row.k}</span>
              <span className={`text-sm font-medium mt-1 ${tc("text", theme)}`}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div
        className={`relative rounded-3xl border ${tc("border", theme)} ${tc("card", theme)} p-10 md:p-16 overflow-hidden`}
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-emerald-500/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className={`font-serif text-4xl md:text-6xl tracking-tight mb-3 ${tc("text", theme)}`}>
              Let's talk.
            </h3>
            <p className={`text-base ${tc("textMuted", theme)}`}>
              Senior PM opportunities in AI / FinTech · Strategy advisory · Speaking
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onHello}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105 ${
                theme === "dark" ? "bg-white text-zinc-950" : "bg-zinc-950 text-white"
              }`}
            >
              Say Hello
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href={RESUME_FILE}
              download
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-colors ${
                theme === "dark"
                  ? "border-zinc-700 text-zinc-200 hover:border-zinc-500"
                  : "border-zinc-300 text-zinc-800 hover:border-zinc-500"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <footer
        className={`mt-16 pt-8 border-t ${tc("border", theme)} flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}
      >
        <p className={`text-xs ${tc("textSubtle", theme)}`}>
          © {new Date().getFullYear()} Surya Bhan Pratap Singh · Crafted with care.
        </p>
        <div className="flex gap-4 text-xs">
          <a
            href="https://linkedin.com/in/suryabhansingh"
            target="_blank"
            rel="noreferrer"
            className={`${tc("textMuted", theme)} hover:${tc("text", theme)} transition-colors`}
          >
            LinkedIn
          </a>
          <a
            href="mailto:singh.95@alumni.iitj.ac.in"
            className={`${tc("textMuted", theme)} hover:${tc("text", theme)} transition-colors`}
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   CONTACT MODAL ("Say Hello")
   ────────────────────────────────────────────────────────────────── */
const ContactModal: React.FC<{
  open: boolean;
  onClose: () => void;
  theme: Theme;
}> = ({ open, onClose, theme }) => {
  const [copied, setCopied] = useState(false);
  const email = "singh.95@alumni.iitj.ac.in";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  if (!open) return null;

  const channels = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/suryabhansingh",
      href: "https://linkedin.com/in/suryabhansingh",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "+91-9790708984",
      href: "tel:+919790708984",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className={`relative w-full max-w-lg rounded-3xl border ${tc("border", theme)} ${theme === "dark" ? "bg-zinc-950" : "bg-white"} p-8 md:p-10 shadow-2xl animate-modalSlide`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full border ${tc("border", theme)} flex items-center justify-center transition-colors hover:rotate-90 duration-300 ${tc("textMuted", theme)}`}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <p className={`text-xs uppercase tracking-[0.2em] font-medium ${tc("textMuted", theme)}`}>
            Usually replies in 24 hours
          </p>
        </div>

        <h3 className={`font-serif text-4xl md:text-5xl tracking-tight leading-[1] mb-3 ${tc("text", theme)}`}>
          Let's talk.
        </h3>
        <p className={`text-sm leading-relaxed mb-8 ${tc("textMuted", theme)}`}>
          Whether it's a PM role, a thorny AI product question, or a coffee chat — pick the channel that
          works best for you.
        </p>

        <div className="space-y-2.5">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "LinkedIn" ? "_blank" : undefined}
              rel="noreferrer"
              className={`flex items-center gap-4 p-4 rounded-2xl border ${tc("border", theme)} ${tc("bgAlt", theme)} transition-all hover:scale-[1.02] hover:border-current group`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === "dark" ? "bg-zinc-900 text-zinc-300" : "bg-zinc-100 text-zinc-700"
                }`}
              >
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[11px] font-bold uppercase tracking-widest ${tc("textFaint", theme)}`}>
                  {c.label}
                </p>
                <p className={`text-sm font-medium truncate ${tc("text", theme)}`}>{c.value}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`${tc("textMuted", theme)} group-hover:translate-x-1 transition-transform`}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        <div className={`mt-6 flex flex-col sm:flex-row gap-3 pt-6 border-t ${tc("borderSoft", theme)}`}>
          <button
            onClick={copyEmail}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-semibold transition-all ${
              copied
                ? "bg-emerald-500 text-white"
                : theme === "dark"
                ? "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200"
            }`}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Email
              </>
            )}
          </button>
          <a
            href={RESUME_FILE}
            download
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-semibold transition-all ${
              theme === "dark" ? "bg-white text-zinc-950 hover:scale-[1.02]" : "bg-zinc-950 text-white hover:scale-[1.02]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   CASE STUDY DEEP PAGE
   ────────────────────────────────────────────────────────────────── */
const CaseStudyView: React.FC<{
  id: string;
  onBack: () => void;
  theme: Theme;
}> = ({ id, onBack, theme }) => {
  const cs = caseStudies.find((c) => c.id === id);
  const loaded = useReveal(60);
  if (!cs) return null;

  const lightSurface = theme === "dark" ? "bg-stone-50 text-zinc-950" : "bg-stone-50 text-zinc-950";

  return (
    <div className={`flex flex-col lg:flex-row h-screen w-full overflow-hidden font-sans selection:bg-zinc-950 selection:text-white`}>
      <div className="w-full lg:w-1/2 h-[44vh] lg:h-full bg-zinc-950 text-white p-8 lg:p-16 flex flex-col justify-between relative z-10 shrink-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 blur-[120px] pointer-events-none transition-colors duration-1000"
          style={{ background: `radial-gradient(circle at 0% 100%, ${cs.accent}, transparent 70%)` }}
        />

        <div className="relative z-10 flex justify-between items-start">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-sm font-medium hover:text-white text-zinc-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center group-hover:-translate-x-1 group-hover:border-white transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            Back
          </button>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-zinc-700"
            style={{ color: cs.accent }}
          >
            {cs.tag}
          </span>
        </div>

        <div className={`relative z-10 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400 mb-4">{cs.company}</p>
          <h1 className="font-serif text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tighter mb-6">
            {cs.title}
          </h1>
          <p className="text-lg lg:text-xl font-light text-zinc-300 max-w-md mb-12">{cs.subtitle}</p>

          <div className="flex flex-col gap-5">
            {cs.metrics.map((m, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${cs.bgAccent} animate-pulse`} />
                <span className="font-serif text-2xl lg:text-3xl tracking-tight">{m.split(" ")[0]}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                  {m.substring(m.indexOf(" ") + 1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`w-full lg:w-1/2 h-[56vh] lg:h-full overflow-y-auto ${lightSurface} p-8 lg:p-20 pb-32 custom-scrollbar`}>
        <div className="max-w-2xl mx-auto space-y-20">
          <section className={`transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-5">The Challenge</h3>
              <p className="text-lg lg:text-xl text-zinc-800 leading-relaxed font-medium">
                {cs.sections.challenge}
              </p>
            </div>

            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-zinc-200">
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-4`} style={{ color: cs.accent }}>
                The Insight
              </h3>
              <p className="font-serif text-2xl lg:text-3xl leading-snug text-zinc-900 tracking-tight">
                {cs.sections.insight}
              </p>
            </div>
          </section>

          <section className={`transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">Before → After</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Before</p>
                <ul className="space-y-2.5">
                  {cs.sections.transformation.before.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-500 leading-relaxed">
                      <span className="text-red-400 mt-0.5">✕</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: cs.accent }}>
                  After
                </p>
                <ul className="space-y-2.5">
                  {cs.sections.transformation.after.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-800 font-medium leading-relaxed">
                      <span style={{ color: cs.accent }} className="mt-0.5">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Architecture & Execution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cs.sections.bento.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white border border-zinc-200 rounded-2xl p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-zinc-300 transition-all duration-500 ${item.span}`}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                    style={{ background: `${cs.accent}15` }}
                  >
                    <span className="font-serif text-xl" style={{ color: cs.accent }}>
                      {i + 1}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-12 border-t border-zinc-200 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">End of Case Study</p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-zinc-950 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              ← Back to Portfolio
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   MAIN APP
   ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [helloOpen, setHelloOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_URL;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage?.getItem("portfolio-theme")) as Theme | null;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    try {
      window.localStorage?.setItem("portfolio-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${tc("bg", theme)} ${tc("text", theme)} min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30`}
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <style>{`
          .font-serif { font-family: 'Instrument Serif', Georgia, serif; }
          .font-sans { font-family: 'Inter', system-ui, sans-serif; }
          html { scroll-behavior: smooth; }
          .custom-scrollbar::-webkit-scrollbar { display: none; }
          .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes modalSlide {
            from { opacity: 0; transform: translateY(20px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fadeIn { animation: fadeIn 250ms ease-out forwards; }
          .animate-modalSlide { animation: modalSlide 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>

        <Nav theme={theme} setTheme={setTheme} onHello={() => setHelloOpen(true)} />

        <main>
          <Hero theme={theme} onHello={() => setHelloOpen(true)} />
          <WorkSection theme={theme} onSelect={(id) => setActiveCase(id)} />
          <SkillsSection theme={theme} />
          <EducationSection theme={theme} />
          <CaseStudiesSection theme={theme} onSelect={(id) => setActiveCase(id)} />
          <AboutContact theme={theme} onHello={() => setHelloOpen(true)} />
        </main>

        <ContactModal open={helloOpen} onClose={() => setHelloOpen(false)} theme={theme} />

        <div
          className={`fixed inset-0 z-50 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeCase ? "translate-y-0" : "translate-y-full pointer-events-none"
          }`}
        >
          {activeCase && <CaseStudyView id={activeCase} onBack={() => setActiveCase(null)} theme={theme} />}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

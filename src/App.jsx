import { useState, useEffect, useRef, useCallback } from "react";

const LOGO = "data:image/jpeg;base64,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";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimCounter({ end, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView();
  const started = useRef(false);
  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    let s = 0;
    const step = end / 120;
    const t = setInterval(() => {
      s += step;
      if (s >= end) { setVal(end); clearInterval(t); }
      else setVal(end % 1 !== 0 ? Math.round(s * 10) / 10 : Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [vis]);
  return <span ref={ref}>{prefix}{end % 1 !== 0 ? val.toFixed(1) : val}{suffix}</span>;
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const SERVICES = [
  { pillar: "3D Design", desc: "From hyper-realistic product explainers and architectural walkthroughs to jaw-dropping anamorphic illusions on flat and L-shaped screens.", subs: ["Flat Screen Anamorphic", "L-Shaped Anamorphic", "CGI & VFX Content", "Walkthrough Videos", "3D Product Explainer", "3D Animations"] },
  { pillar: "Experiences", desc: "Immersive AR, VR, and XR solutions spanning brand activations, photobooths, retail shelf experiences, and cross-industry applications.", subs: ["Web AR Experiences", "Web XR & VR", "AR Photobooth", "Retail Experiences", "Bespoke Experiences", "Immersive Installations"] },
  { pillar: "Technology", desc: "Industry 4.0 training environments, AI-powered VR, and cutting-edge solutions for healthcare, education, and real estate.", subs: ["VR Simulators", "Industrial VR Solutions", "AI-Powered VR", "Education & Training VR", "Healthcare Solutions", "Real Estate Solutions"] },
];
const CASES = [
  { id: "01", client: "PepsiCo India", year: "2024", brief: "Developed CGI, VFX, and anamorphic content showcasing iconic global monuments for PepsiCo's first R&D lab reveal in Gurugram.", tag: "Anamorphic", color: "#0047AB" },
  { id: "02", client: "Diageo", year: "2024", brief: "Flat-screen anamorphic displays for A-frame standees across India, plus an immersive experience for the Kiera Knightley × Black Dog launch.", tag: "3D Design", color: "#1a1a2e" },
  { id: "03", client: "Mountain Dew", year: "2024", brief: "Tap-to-place world-tracked AR game allowing users to interact with products and earn exclusive deals.", tag: "AR", result: "+21% Sales Lift", color: "#F5873E" },
  { id: "04", client: "Nike", year: "2024", brief: "XR-powered retail shelf experience blending digital and physical shopping with real-time personalization.", tag: "XR Retail", color: "#0047AB" },
];
const CLIENTS = ["Pepsi", "Diageo", "Heineken", "Nike", "Cadbury", "JBL", "Colgate", "Mastercard", "Ray-Ban", "Air India", "Vistara", "Hyundai", "HSBC", "Mondelez", "Roseate Hotels", "Philip Morris", "United Spirits", "McCain"];
const SERVICE_INFO = {
  "Flat Screen Anamorphic": { text: "Anamorphic content for standard flat screens — 3D objects appear to break out of the display. Cost effective, angle independent, no installation required.", benefits: ["Cost Effective", "Angle Independent", "No Install Needed", "All Screen Sizes"] },
  "L-Shaped Anamorphic": { text: "Corner-mounted or L-shaped display configurations that create dramatic depth illusions. Ideal for retail environments, events, and brand activations.", benefits: ["Maximum Impact", "Ideal for Retail", "Depth Illusions", "Brand Activation"] },
  "AR Photobooth": { text: "All-in-one interactive experience merging reality with imagination. Thematic filters, full interactivity, and personalized outputs for events and activations.", benefits: ["Thematic Filters", "Full Interactivity", "Personalized Outputs", "Event Ready"] },
  "VR Simulators": { text: "Industry 4.0 training environments — cost-saving, risk-free, and hands-on. Realistic, safe practice environments for industrial training.", benefits: ["Cost-Saving", "Risk-Free Practice", "Hands-On Learning", "Industry 4.0"] },
};

const C = { blue: "#0047AB", dark: "#0c0c14", navy: "#08090f", orange: "#F5873E", gray: "#f2f3f7", text: "#6b6e7a", light: "#999" };
const F = {
  display: "'Bebas Neue', 'Impact', sans-serif",
  heading: "'Outfit', sans-serif",
  body: "'DM Sans', sans-serif"
};

export default function BBT() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [caseDetail, setCaseDetail] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", desc: "" });
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState("All");

  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorType, setCursorType] = useState("default");

  useEffect(() => {
    let raf, mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    const over = (e) => { setCursorType(e.target.closest("button, a, [data-hover]") ? "link" : "default"); };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = useCallback((p) => {
    setPage(p); setCaseDetail(null); setServiceDetail(null); setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const openCase = (c) => { setCaseDetail(c); setPage("case"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const LogoImg = ({ h = 36, white = false }) => (
    <img src={LOGO} alt="BBT" style={{ height: h, width: "auto", filter: white ? "brightness(0) invert(1)" : "none", transition: "filter 0.4s", display: "block" }} />
  );

  // ═══════════ NAV ═══════════
  const Nav = () => (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(12,12,20,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease", padding: "0 clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "none", padding: 0 }}>
          <LogoImg h={34} white />
        </button>
        <div className="dsk-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Home","About","Services","Portfolio","Contact"].map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "none", padding: "6px 0", fontFamily: F.heading, fontSize: 13, fontWeight: 500, letterSpacing: 0.8, color: page === l.toLowerCase() ? C.orange : "rgba(255,255,255,0.6)", transition: "all 0.3s" }}
              onMouseEnter={e => e.target.style.color = C.orange} onMouseLeave={e => e.target.style.color = page === l.toLowerCase() ? C.orange : "rgba(255,255,255,0.6)"}
            >{l}</button>
          ))}
          <button onClick={() => go("contact")} style={{ background: C.orange, color: "#fff", border: "none", padding: "10px 26px", borderRadius: 6, fontFamily: F.heading, fontSize: 13, fontWeight: 600, cursor: "none", transition: "opacity 0.3s" }}>Get a Quote</button>
        </div>
        <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "none", padding: 8, flexDirection: "column", gap: 6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 24, height: 2, background: "#fff", borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? (i===0?"rotate(45deg) translateY(8px)":i===2?"rotate(-45deg) translateY(-8px)":"scaleX(0)") : "none" }} />)}
        </button>
      </div>
      {menuOpen && <div style={{ position: "fixed", inset: 0, background: C.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, zIndex: 99 }}>
        {["Home","About","Services","Portfolio","Contact"].map((l,i) => (
          <button key={l} onClick={() => go(l.toLowerCase())} style={{ background: "none", border: "none", color: "#fff", fontFamily: F.display, fontSize: 52, letterSpacing: 4, cursor: "pointer", animation: `slideUp 0.4s ease ${i*0.06}s both`, textTransform: "uppercase" }}>{l}</button>
        ))}
      </div>}
    </nav>
  );

  // ═══════════ HERO ═══════════
  const Hero = () => (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(170deg, ${C.navy} 0%, #0a1028 35%, ${C.blue}cc 100%)`, position: "relative", overflow: "hidden", padding: "100px 24px 80px" }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,135,62,0.07),transparent 70%)", top: "-15%", right: "-15%" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,71,171,0.12),transparent 70%)", bottom: "-10%", left: "-8%" }} />
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900 }}>
        <div style={{ animation: "slideUp 0.7s ease both", marginBottom: 24 }}><LogoImg h={60} white /></div>
        <p style={{ fontFamily: F.heading, fontSize: 13, color: C.orange, letterSpacing: 4, textTransform: "uppercase", fontWeight: 500, marginBottom: 20, animation: "slideUp 0.7s ease 0.1s both" }}>BeyondBound Technologies</p>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(42px,8vw,100px)", color: "#fff", lineHeight: 0.95, fontWeight: 400, margin: "0 0 28px", textTransform: "uppercase", letterSpacing: 4, animation: "slideUp 0.7s ease 0.2s both" }}>
          Innovating The Future Of <span style={{ color: C.orange, display: "inline" }}>3D Technology</span> & Immersive Experiences
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 40px", fontWeight: 400, animation: "slideUp 0.7s ease 0.3s both" }}>
          Transforming how brands connect with audiences through stunning 3D design, AR, VR, and bespoke immersive installations.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "slideUp 0.7s ease 0.4s both" }}>
          <button onClick={() => go("portfolio")} data-hover style={{ background: C.orange, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 6, fontFamily: F.heading, fontSize: 14, fontWeight: 600, cursor: "none", letterSpacing: 0.5 }}>Explore Our Work</button>
          <button onClick={() => go("contact")} data-hover style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "14px 36px", borderRadius: 6, fontFamily: F.heading, fontSize: 14, fontWeight: 500, cursor: "none", transition: "all 0.3s", letterSpacing: 0.5 }}
            onMouseEnter={e => { e.target.style.borderColor="#fff"; e.target.style.background="rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { e.target.style.borderColor="rgba(255,255,255,0.25)"; e.target.style.background="transparent"; }}
          >Get in Touch</button>
        </div>
      </div>
    </div>
  );

  // ═══════════ PHILOSOPHY ═══════════
  const Philosophy = () => {
    const [ref, vis] = useInView();
    return (
      <div ref={ref} style={{ padding: "96px 24px", background: C.gray, textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,64px)", color: C.dark, lineHeight: 1.05, textTransform: "uppercase", letterSpacing: 3 }}>
            <span style={{ textDecoration: vis?"line-through":"none", textDecorationColor: C.orange, textDecorationThickness: "3px", color: vis?"#bbb":C.dark, transition: "all 1s ease 0.3s" }}>Not Footfall</span>
            {" — "}<span style={{ color: C.orange, opacity: vis?1:0, transition: "opacity 0.8s ease 1s" }}>Eyeball.</span>
            <br />
            <span style={{ textDecoration: vis?"line-through":"none", textDecorationColor: C.orange, textDecorationThickness: "3px", color: vis?"#bbb":C.dark, transition: "all 1s ease 1.3s" }}>Not A Gimmick</span>
            {" — "}<span style={{ color: C.orange, opacity: vis?1:0, transition: "opacity 0.8s ease 2s" }}>Catalyst.</span>
          </div>
          <p style={{ fontFamily: F.body, fontSize: 15, color: C.text, lineHeight: 1.75, marginTop: 28, maxWidth: 500, marginLeft: "auto", marginRight: "auto", opacity: vis?1:0, transition: "opacity 0.8s ease 2.4s" }}>
            Every experience we build captures attention, drives measurable impact, and becomes a growth engine for your brand.
          </p>
        </div>
      </div>
    );
  };

  // ═══════════ SERVICE CARDS ═══════════
  const PillarCard = ({ s, i }) => (
    <Reveal delay={i*0.1}>
      <div data-hover onClick={() => { setActiveTab(i); go("services"); }}
        onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}
        style={{ background: hoveredCard===i?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.03)", border: `1px solid ${hoveredCard===i?"rgba(245,135,62,0.3)":"rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "40px 32px", cursor: "none", transition: "all 0.4s ease", transform: hoveredCard===i?"translateY(-6px)":"none" }}>
        <h3 style={{ fontFamily: F.display, fontSize: 36, color: "#fff", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>{s.pillar}</h3>
        <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28 }}>{s.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {s.subs.map((sub,j) => <span key={j} style={{ fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "4px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s", ...(hoveredCard===i?{borderColor:"rgba(245,135,62,0.2)",color:"rgba(255,255,255,0.6)"}:{}) }}>{sub}</span>)}
        </div>
      </div>
    </Reveal>
  );

  const ServicesSection = () => (
    <div style={{ background: C.dark, padding: "110px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: F.heading, fontSize: 12, color: C.orange, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>What We Do</p>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,56px)", color: "#fff", textTransform: "uppercase", letterSpacing: 4, marginBottom: 64 }}>Three Pillars Of Innovation</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {SERVICES.map((s,i) => <PillarCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </div>
  );

  // ═══════════ CASE CARD ═══════════
  const CaseCard = ({ cs, i }) => (
    <Reveal delay={i*0.08}>
      <div data-hover onClick={() => openCase(cs)} style={{ borderRadius: 12, overflow: "hidden", cursor: "none", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", transition: "all 0.4s ease" }}
        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor="rgba(245,135,62,0.2)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; }}>
        <div style={{ height: 200, background: `linear-gradient(135deg,${cs.color}dd,${cs.color}88)`, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontFamily: F.display, fontSize: 64, color: "rgba(255,255,255,0.06)", letterSpacing: 2 }}>{cs.id}</span>
            <span style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.12)", padding: "4px 14px", borderRadius: 4, fontWeight: 500, letterSpacing: 0.5 }}>{cs.tag}</span>
          </div>
          <div>
            <h3 style={{ fontFamily: F.display, fontSize: 32, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{cs.client}</h3>
            <span style={{ fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{cs.year}</span>
          </div>
        </div>
        <div style={{ padding: 28 }}>
          <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{cs.brief}</p>
          {cs.result && <p style={{ fontFamily: F.display, fontSize: 28, color: C.orange, letterSpacing: 2, marginTop: 16 }}>{cs.result}</p>}
          <p style={{ fontFamily: F.heading, fontSize: 12, color: C.orange, fontWeight: 600, marginTop: 16, letterSpacing: 0.5 }}>View Project →</p>
        </div>
      </div>
    </Reveal>
  );

  const WorkSection = () => (
    <div style={{ padding: "110px 24px", background: C.dark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: F.heading, fontSize: 12, color: C.orange, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>Featured Work</p>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,56px)", color: "#fff", textTransform: "uppercase", letterSpacing: 4, marginBottom: 64 }}>Selected Case Studies</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {CASES.map((cs,i) => <CaseCard key={i} cs={cs} i={i} />)}
        </div>
      </div>
    </div>
  );

  // ═══════════ STATS ═══════════
  const StatsSection = () => (
    <div style={{ padding: "88px 24px", background: C.navy, borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 24, textAlign: "center" }}>
        {[{ end:21,suf:"%",pre:"+",label:"Sales Lift" },{ end:463.7,suf:"B",pre:"$",label:"Market by 2030" },{ end:20,suf:"+",pre:"",label:"Global Brands" },{ end:4,suf:"+",pre:"",label:"Years Experience" }].map((s,i) => (
          <Reveal key={i} delay={i*0.08}>
            <div style={{ fontFamily: F.display, fontSize: "clamp(40px,6vw,64px)", color: C.orange, letterSpacing: 2 }}><AnimCounter end={s.end} suffix={s.suf} prefix={s.pre} /></div>
            <div style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );

  // ═══════════ MARQUEE ═══════════
  const Marquee = () => (
    <div style={{ padding: "56px 0", overflow: "hidden", background: C.dark }}>
      <p style={{ textAlign: "center", fontFamily: F.heading, fontSize: 11, color: C.orange, letterSpacing: 4, textTransform: "uppercase", marginBottom: 28, fontWeight: 500 }}>Trusted By</p>
      <div style={{ display: "flex", animation: "marquee 40s linear infinite", width: "max-content" }}>
        {[...CLIENTS,...CLIENTS].map((c,i) => <span key={i} style={{ padding: "0 40px", fontFamily: F.display, fontSize: 22, color: "rgba(255,255,255,0.12)", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap", transition: "color 0.3s" }}
          onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.5)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.12)"}>{c}</span>)}
      </div>
    </div>
  );

  // ═══════════ CTA ═══════════
  const CTA = () => (
    <div style={{ background: `linear-gradient(170deg, ${C.navy}, ${C.blue}cc)`, padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,135,62,0.06),transparent 70%)", top: "-20%", left: "50%", transform: "translateX(-50%)" }} />
      <Reveal style={{ position: "relative" }}>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(40px,6vw,72px)", color: "#fff", textTransform: "uppercase", letterSpacing: 4, marginBottom: 20, lineHeight: 1 }}>
          Let's Build Something <span style={{ color: C.orange }}>Extraordinary</span>
        </h2>
        <p style={{ fontFamily: F.body, fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 36, lineHeight: 1.7 }}>Ready to create immersive experiences that drive real results?</p>
        <button onClick={() => go("contact")} data-hover style={{ background: C.orange, color: "#fff", border: "none", padding: "16px 44px", borderRadius: 6, fontFamily: F.heading, fontSize: 15, fontWeight: 600, cursor: "none", letterSpacing: 0.5 }}>Start a Project</button>
      </Reveal>
    </div>
  );

  // ═══════════ FOOTER ═══════════
  const Footer = () => (
    <footer style={{ background: C.navy, color: "rgba(255,255,255,0.4)", padding: "64px 24px 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 40 }}>
        <div>
          <div style={{ marginBottom: 16 }}><LogoImg h={32} white /></div>
          <p style={{ fontFamily: F.body, fontSize: 13, lineHeight: 1.7 }}>Innovating the future of 3D technology and immersive experiences.</p>
        </div>
        <div>
          <h4 style={{ fontFamily: F.display, fontSize: 18, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Links</h4>
          {["Home","About","Services","Portfolio","Contact"].map(l => <button key={l} onClick={() => go(l.toLowerCase())} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontFamily: F.body, fontSize: 13, padding: "4px 0", cursor: "none", transition: "color 0.3s" }}
            onMouseEnter={e => e.target.style.color=C.orange} onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.35)"}>{l}</button>)}
        </div>
        <div>
          <h4 style={{ fontFamily: F.display, fontSize: 18, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Services</h4>
          {["3D Design","Experiences","Technology","AR / VR / XR"].map(l => <p key={l} style={{ fontFamily: F.body, fontSize: 13, padding: "4px 0" }}>{l}</p>)}
        </div>
        <div>
          <h4 style={{ fontFamily: F.display, fontSize: 18, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
          <p style={{ fontFamily: F.body, fontSize: 13, lineHeight: 2 }}>work@beyondbound.tech<br/>+91 9910 8779 05<br/>+91 7982 353389<br/><span style={{ color: C.orange }}>www.beyondbound.tech</span></p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 48, paddingTop: 20, textAlign: "center", fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
        © 2024 BeyondBound Technologies. All Rights Reserved.
      </div>
    </footer>
  );

  // ═══════════ PAGE HEADER ═══════════
  const PageHead = ({ label, title }) => (
    <div style={{ background: `linear-gradient(170deg,${C.navy},${C.blue}cc)`, padding: "120px 24px 72px", textAlign: "center", color: "#fff" }}>
      <p style={{ fontFamily: F.heading, fontSize: 12, color: C.orange, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>{label}</p>
      <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px,6vw,72px)", textTransform: "uppercase", letterSpacing: 4, margin: 0 }}>{title}</h1>
    </div>
  );

  // ═══════════ ABOUT ═══════════
  const AboutPage = () => (
    <div style={{ paddingTop: 72, background: C.dark, color: "#fff", minHeight: "100vh" }}>
      <PageHead label="About Us" title="Who We Are" />
      <Reveal style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontFamily: F.display, fontSize: 40, color: "#fff", textTransform: "uppercase", letterSpacing: 3, marginBottom: 24 }}>Our Story</h2>
        <p style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: 20 }}>BeyondBound Technologies is a cutting-edge immersive technology studio specializing in 3D design, AR, VR, XR, CGI/VFX, and anamorphic displays. Based in India with a global client portfolio, we transform how brands connect with audiences through innovative visual experiences.</p>
        <p style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>Unlike pure tech companies, BBT combines creative storytelling with technical execution — making us a full-service partner for brands looking to create standout experiences.</p>
      </Reveal>
      <div style={{ padding: "48px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}><h2 style={{ fontFamily: F.display, fontSize: 40, color: "#fff", textTransform: "uppercase", letterSpacing: 3 }}>Our Values</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
          {[{t:"Innovation",d:"Pushing boundaries with 3D and immersive technology."},{t:"Immersion",d:"Captivating all senses to create lasting memories."},{t:"Impact",d:"Measured by real results — engagement, sales, transformation."}].map((v,i) => (
            <Reveal key={i} delay={i*0.1}>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 36, textAlign: "center", transition: "all 0.3s", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="rgba(245,135,62,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; }}>
                <h3 style={{ fontFamily: F.display, fontSize: 30, color: C.orange, textTransform: "uppercase", letterSpacing: 3, marginBottom: 14 }}>{v.t}</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══════════ SERVICES PAGE ═══════════
  const ServicesPage = () => (
    <div style={{ paddingTop: 72, background: C.dark, color: "#fff", minHeight: "100vh" }}>
      <PageHead label="Our Services" title="What We Build" />
      <div style={{ padding: "56px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {SERVICES.map((s,i) => <button key={i} onClick={() => { setActiveTab(i); setServiceDetail(null); }} style={{ background: activeTab===i?C.orange:"rgba(255,255,255,0.05)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 6, cursor: "none", fontFamily: F.heading, fontSize: 13, fontWeight: 600, transition: "all 0.3s", letterSpacing: 0.5 }}>{s.pillar}</button>)}
        </div>
        <Reveal><p style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>{SERVICES[activeTab].desc}</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          {SERVICES[activeTab].subs.map((sub,j) => (
            <Reveal key={sub} delay={j*0.05}>
              <div data-hover onClick={() => SERVICE_INFO[sub] && setServiceDetail(sub)} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 24, cursor: SERVICE_INFO[sub]?"none":"default", transition: "all 0.3s", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.orange; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; e.currentTarget.style.transform=""; }}>
                <p style={{ fontFamily: F.heading, fontSize: 15, color: "#fff", fontWeight: 600 }}>{sub}</p>
                {SERVICE_INFO[sub] && <p style={{ fontFamily: F.body, fontSize: 12, color: C.orange, marginTop: 8, fontWeight: 500 }}>View Details →</p>}
              </div>
            </Reveal>
          ))}
        </div>
        {serviceDetail && SERVICE_INFO[serviceDetail] && (
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "44px 40px", border: `1px solid ${C.orange}44`, marginTop: 36, position: "relative", animation: "slideUp 0.3s ease" }}>
            <button onClick={() => setServiceDetail(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: "none", width: 32, height: 32, borderRadius: "50%", fontSize: 16, cursor: "none", color: "rgba(255,255,255,0.5)" }}>×</button>
            <p style={{ fontFamily: F.heading, fontSize: 12, color: C.orange, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Service Detail</p>
            <h3 style={{ fontFamily: F.display, fontSize: 36, color: "#fff", textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>{serviceDetail}</h3>
            <p style={{ fontFamily: F.body, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 28 }}>{SERVICE_INFO[serviceDetail].text}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
              {SERVICE_INFO[serviceDetail].benefits.map((b,i) => <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "14px 16px", fontFamily: F.body, fontSize: 13, color: "#fff", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: C.orange }}>✓</span>{b}</div>)}
            </div>
            <button onClick={() => go("contact")} data-hover style={{ background: C.orange, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6, fontFamily: F.heading, fontSize: 13, fontWeight: 600, cursor: "none", marginTop: 28 }}>Discuss This Service</button>
          </div>
        )}
        <Reveal style={{ marginTop: 72 }}>
          <h3 style={{ fontFamily: F.display, fontSize: 36, color: "#fff", textTransform: "uppercase", letterSpacing: 3, textAlign: "center", marginBottom: 32 }}>Anamorphic Comparison</h3>
          <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.body, fontSize: 14 }}>
              <thead><tr style={{ background: C.orange }}>
                {["Feature","Flat Screen","L-Shaped"].map(h => <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontFamily: F.heading, fontWeight: 600, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff" }}>{h}</th>)}
              </tr></thead>
              <tbody>{[["Cost","Cost Effective","Higher Investment"],["Installation","None Required","Corner Mount"],["Angle","Independent","Dependent"],["Screens","All Sizes","Custom Config"],["Best For","Versatile","Retail & Events"]].map(([f,a,b],i) => (
                <tr key={i} style={{ background: i%2===0?"rgba(255,255,255,0.02)":"transparent" }}>
                  <td style={{ padding: "12px 20px", fontWeight: 600, color: "#fff" }}>{f}</td>
                  <td style={{ padding: "12px 20px", color: "rgba(255,255,255,0.5)" }}>{a}</td>
                  <td style={{ padding: "12px 20px", color: "rgba(255,255,255,0.5)" }}>{b}</td>
                </tr>))}</tbody>
            </table>
          </div>
        </Reveal>
        <Reveal style={{ marginTop: 72, textAlign: "center" }}>
          <h3 style={{ fontFamily: F.display, fontSize: 36, color: "#fff", textTransform: "uppercase", letterSpacing: 3, marginBottom: 32 }}>Technology Stack</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {["Unity","Unreal Engine","WebXR","ARKit","ARCore","Three.js","React Three Fiber","GSAP","Next.js","Blender"].map(t => (
              <span key={t} data-hover style={{ background: "rgba(255,255,255,0.04)", padding: "10px 22px", borderRadius: 6, fontFamily: F.heading, fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500, border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", cursor: "none" }}
                onMouseEnter={e => { e.target.style.background=C.orange; e.target.style.color="#fff"; e.target.style.borderColor=C.orange; }}
                onMouseLeave={e => { e.target.style.background="rgba(255,255,255,0.04)"; e.target.style.color="rgba(255,255,255,0.5)"; e.target.style.borderColor="rgba(255,255,255,0.06)"; }}>{t}</span>))}
          </div>
        </Reveal>
      </div>
    </div>
  );

  // ═══════════ PORTFOLIO ═══════════
  const PortfolioPage = () => {
    const cats = ["All","3D Design","Anamorphic","AR","XR Retail"];
    const filtered = filter==="All" ? CASES : CASES.filter(c => c.tag===filter);
    return (
      <div style={{ paddingTop: 72, background: C.dark, color: "#fff", minHeight: "100vh" }}>
        <PageHead label="Our Work" title="Portfolio" />
        <div style={{ padding: "56px 24px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 44, flexWrap: "wrap", justifyContent: "center" }}>
            {cats.map(c => <button key={c} onClick={() => setFilter(c)} style={{ background: filter===c?C.orange:"rgba(255,255,255,0.05)", color: "#fff", border: "none", padding: "8px 22px", borderRadius: 6, cursor: "none", fontFamily: F.heading, fontSize: 12, fontWeight: 600, transition: "all 0.3s" }}>{c}</button>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {filtered.map((cs,i) => <CaseCard key={cs.id} cs={cs} i={i} />)}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════ CASE DETAIL ═══════════
  const CasePage = () => {
    if (!caseDetail) return null;
    const cs = caseDetail;
    return (
      <div style={{ paddingTop: 72, background: C.dark, color: "#fff", minHeight: "100vh" }}>
        <div style={{ background: `linear-gradient(170deg,${cs.color}dd,${cs.color}88)`, padding: "110px 24px 80px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <button onClick={() => go("portfolio")} data-hover style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 20px", borderRadius: 6, cursor: "none", fontFamily: F.body, fontSize: 13, marginBottom: 36 }}>← Back</button>
            <p style={{ fontFamily: F.heading, fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>{cs.tag} · {cs.year}</p>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(44px,7vw,80px)", textTransform: "uppercase", letterSpacing: 4, margin: 0, lineHeight: 0.95 }}>{cs.client}</h1>
          </div>
        </div>
        <div style={{ padding: "64px 24px", maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <h3 style={{ fontFamily: F.display, fontSize: 28, textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>Project Brief</h3>
            <p style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: 44 }}>{cs.brief}</p>
          </Reveal>
          {cs.result && <Reveal><div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 40, textAlign: "center", marginBottom: 44, border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Key Result</p>
            <p style={{ fontFamily: F.display, fontSize: 64, color: C.orange, letterSpacing: 3 }}>{cs.result}</p>
          </div></Reveal>}
          <button onClick={() => go("contact")} data-hover style={{ background: C.orange, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 6, fontFamily: F.heading, fontSize: 14, fontWeight: 600, cursor: "none" }}>Discuss a Similar Project</button>
        </div>
      </div>
    );
  };

  // ═══════════ CONTACT ═══════════
  const inputStyle = { width: "100%", padding: "14px 16px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontFamily: F.body, fontSize: 14, outline: "none", transition: "border 0.3s", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", color: "#fff" };

  const ContactPage = () => (
    <div style={{ paddingTop: 72, background: C.dark, color: "#fff", minHeight: "100vh" }}>
      <PageHead label="Get In Touch" title="Contact Us" />
      <div style={{ padding: "56px 24px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 44 }}>
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: 48, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#fff", fontSize: 24 }}>✓</div>
                <h3 style={{ fontFamily: F.display, fontSize: 36, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>Thank You!</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>We'll respond within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[{k:"name",l:"Name",t:"text"},{k:"email",l:"Email",t:"email"},{k:"phone",l:"Phone",t:"tel"},{k:"company",l:"Company",t:"text"}].map(f => (
                  <div key={f.k}>
                    <label style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{f.l}</label>
                    <input type={f.t} value={form[f.k]} onChange={e => setForm({...form,[f.k]:e.target.value})} style={inputStyle}
                      onFocus={e => e.target.style.borderColor=C.orange} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
                  </div>))}
                <div>
                  <label style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Service Interest</label>
                  <select value={form.service} onChange={e => setForm({...form,service:e.target.value})} style={{...inputStyle, appearance: "none"}}>
                    <option value="" style={{background:C.dark}}>Select...</option>
                    {["3D Design","Flat Screen Anamorphic","L-Shaped Anamorphic","AR Experiences","VR Simulators","XR Retail","CGI/VFX","Bespoke Solutions"].map(o => <option key={o} style={{background:C.dark}}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Budget (Optional)</label>
                  <select value={form.budget} onChange={e => setForm({...form,budget:e.target.value})} style={{...inputStyle, appearance: "none"}}>
                    <option value="" style={{background:C.dark}}>Select...</option>
                    {["Under ₹5L","₹5L – ₹15L","₹15L – ₹50L","₹50L+"].map(o => <option key={o} style={{background:C.dark}}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Project Description</label>
                  <textarea value={form.desc} onChange={e => setForm({...form,desc:e.target.value})} rows={4} style={{...inputStyle, resize: "vertical"}}
                    onFocus={e => e.target.style.borderColor=C.orange} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
                </div>
                <button onClick={() => setSent(true)} data-hover style={{ background: C.orange, color: "#fff", border: "none", padding: "15px 36px", borderRadius: 8, fontFamily: F.heading, fontSize: 14, fontWeight: 600, cursor: "none", marginTop: 4, letterSpacing: 0.5 }}>Send Message</button>
              </div>
            )}
          </div>
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 36, marginBottom: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontFamily: F.display, fontSize: 28, textTransform: "uppercase", letterSpacing: 3, marginBottom: 24 }}>Direct Contact</h3>
              {[{l:"Email",v:"work@beyondbound.tech"},{l:"Phone",v:"+91 9910 8779 05"},{l:"Phone",v:"+91 7982 353389"},{l:"Web",v:"www.beyondbound.tech"},{l:"Web",v:"www.bbt.group"}].map((c,i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i<4?"1px solid rgba(255,255,255,0.05)":"none" }}>
                  <p style={{ fontFamily: F.heading, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase" }}>{c.l}</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, color: "#fff", fontWeight: 500 }}>{c.v}</p>
                </div>))}
            </div>
            <div style={{ background: `linear-gradient(135deg,${C.blue}88,${C.blue}44)`, borderRadius: 12, padding: 32, border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontFamily: F.display, fontSize: 22, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Follow Us</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["LinkedIn","Instagram","YouTube","Behance"].map(s => <span key={s} data-hover style={{ background: "rgba(255,255,255,0.08)", padding: "8px 16px", borderRadius: 6, fontFamily: F.body, fontSize: 12, fontWeight: 500, cursor: "none", transition: "background 0.3s" }}
                  onMouseEnter={e => e.target.style.background="rgba(255,255,255,0.16)"} onMouseLeave={e => e.target.style.background="rgba(255,255,255,0.08)"}>{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══════════ ROUTER ═══════════
  const renderPage = () => {
    switch(page) {
      case "about": return <AboutPage />;
      case "services": return <ServicesPage />;
      case "portfolio": return <PortfolioPage />;
      case "contact": return <ContactPage />;
      case "case": return <CasePage />;
      default: return <><Hero /><Philosophy /><ServicesSection /><WorkSection /><StatsSection /><Marquee /><CTA /></>;
    }
  };

  const cSize = cursorType==="link" ? 44 : 32;

  return (
    <div style={{ fontFamily: F.body, background: C.dark, color: "#fff", minHeight: "100vh", cursor: "none", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;cursor:none!important}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(245,135,62,0.3);color:#fff}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${C.navy}}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:${C.orange}}
        @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @media(max-width:768px){.dsk-nav{display:none!important}.mob-btn{display:flex!important}}
        @media(min-width:769px){.mob-btn{display:none!important}}
        @media(pointer:coarse){*{cursor:auto!important}.c-ring,.c-dot{display:none!important}}
      `}</style>
      <div ref={ringRef} className="c-ring" style={{ position:"fixed",top:0,left:0,width:cSize,height:cSize,borderRadius:"50%",pointerEvents:"none",zIndex:9999,border:cursorType==="link"?`1.5px solid ${C.orange}`:"1.5px solid rgba(255,255,255,0.2)",background:cursorType==="link"?"rgba(245,135,62,0.06)":"transparent",transition:"width 0.25s,height 0.25s,border 0.25s,background 0.25s" }}/>
      <div ref={dotRef} className="c-dot" style={{ position:"fixed",top:0,left:0,width:6,height:6,borderRadius:"50%",pointerEvents:"none",zIndex:10000,background:cursorType==="link"?C.orange:"#fff",transition:"background 0.2s" }}/>
      <Nav />
      {renderPage()}
      <Footer />
    </div>
  );
}

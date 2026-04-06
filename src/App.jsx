import { useState, useEffect, useRef, useCallback } from "react";

const LOGO = "/logo.png";


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

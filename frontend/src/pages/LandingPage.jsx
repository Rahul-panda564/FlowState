import { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Import high-fidelity assets
import featureAi from '../assets/feature-ai.png';
import featureTwin from '../assets/digital-twin.png';
import featureOps from '../assets/feature-ops.png';
import techIcons from '../assets/tech-icons.png';
import fanIcons from '../assets/fan-icons.png';

// ── Animated counter hook ──────────────────────────────────
function useCountUp(end, duration = 2000, start = 0) {
  const [value, setValue] = useState(start);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration, start]);

  return [value, ref];
}


export default function LandingPage() {
  const navigate = useNavigate();
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenu(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const [stat1, stat1Ref] = useCountUp(50, 2000);
  const [stat2, stat2Ref] = useCountUp(100, 2200);
  const [stat3, stat3Ref] = useCountUp(99, 2400);
  const [stat4, stat4Ref] = useCountUp(30, 1800);

  const features = [
    { icon: featureAi, title: 'Predictive Intelligence', desc: 'AI-powered models forecast crowd behavior 60 minutes ahead with 92% accuracy, enabling proactive safety measures.', tag: 'AI/ML' },
    { icon: featureTwin, title: 'Digital Twin Technology', desc: 'Real-time 3D replicas of your venue, updated with live sensor data for complete situational awareness.', tag: '3D SIMULATION' },
    { icon: featureOps, title: 'Seamless Operations', desc: 'End-to-end operational intelligence from ingress to egress, optimizing every touchpoint of the guest experience.', tag: 'REAL-TIME' },
  ];

  const techStack = [
    { icon: techIcons, label: 'LiDAR Integration', sub: 'Sub-centimeter precision venue mapping with real-time point cloud processing.' },
    { icon: techIcons, label: 'Physics-Based AI', sub: 'Proprietary crowd dynamics engine based on fluid mechanics and agent-based modeling.' },
    { icon: techIcons, label: 'Mesh-First Platform', sub: 'Distributed edge computing architecture for zero-latency sensor data aggregation.' },
  ];

  const venues = ['OLYMPIC ARENA', 'TECH-DOME', 'METRO-PLEX', 'VELOCITY-CIRCUIT', 'NEXUS PARK'];

  return (
    <div className="landing">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className={`landing-nav ${navSolid ? 'solid' : ''}`}>
        <div className="landing-container landing-nav-inner">
          <div className="landing-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
            <div className="landing-logo-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span>FlowState</span>
          </div>
          <div className={`landing-nav-links ${mobileMenu ? 'open' : ''}`}>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} style={{ fontSize: mobileMenu ? '1.5rem' : 'inherit' }}>Intelligence</a>
            <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollToSection('showcase'); }} style={{ fontSize: mobileMenu ? '1.5rem' : 'inherit' }}>Digital Twin</a>
            <a href="#fan-experience" onClick={(e) => { e.preventDefault(); scrollToSection('fan-experience'); }} style={{ fontSize: mobileMenu ? '1.5rem' : 'inherit' }}>Experience</a>
            <a href="#technology" onClick={(e) => { e.preventDefault(); scrollToSection('technology'); }} style={{ fontSize: mobileMenu ? '1.5rem' : 'inherit' }}>Technology</a>
          </div>
          <div className="landing-nav-actions">
            <button className="btn btn-primary nav-cta" onClick={() => navigate('/login')}>Get Started</button>
          </div>
          <button className="landing-menu-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="landing-hero">
        <div className="hero-static-bg" />
        <div className="hero-3d-overlay" />
        
        <div className="landing-container hero-content">
          <div className="hero-badge">
            <span className="status-dot online pulse" />
            A PREDICTIVE ANALYTICS PLATFORM
          </div>

          <h1 className="hero-title">
            FLOWSTATE
          </h1>

          <p className="hero-subtitle">
            See the future of crowd flow
          </p>
          <p className="hero-desc">
            AI-powered crowd intelligence for seamless stadium experiences. Optimize movement, 
            reduce congestion, and maximize revenue across the entire event lifecycle.
          </p>

          <div className="hero-cta">
            <button className="btn-hero-primary" onClick={() => navigate('/login')}>
              ADMIN COMMAND
            </button>
            <button className="btn-hero-terminal" onClick={() => navigate('/signup')}>
               LAUNCH FAN TERMINAL
            </button>
            <button className="btn-hero-secondary" onClick={() => scrollToSection('showcase')}>
              WATCH DEMO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7.8H7.8"/></svg>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats">
            <div className="hero-stat" ref={stat1Ref}><span className="hero-stat-value mono">50+</span><span className="hero-stat-label">VENUES</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat" ref={stat2Ref}><span className="hero-stat-value mono">188M+</span><span className="hero-stat-label">PEOPLE TRACKED</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat" ref={stat3Ref}><span className="hero-stat-value mono">99.9%</span><span className="hero-stat-label">ACCURACY</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat" ref={stat4Ref}><span className="hero-stat-value mono">38%</span><span className="hero-stat-label">FASTER EGRESS</span></div>
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────── */}
      <section className="landing-section" id="features">
        <div className="landing-container">
          <div className="section-header">
            <span className="section-overline">CAPABILITIES</span>
            <h2 className="section-title">The Future of Venue Management</h2>
            <p className="section-desc">Three pillars of intelligent crowd orchestration that transform how venues operate.</p>
          </div>

          <div className="fan-grid">
            {features.map((f, i) => (
              <div key={i} className="fan-card" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="fan-card-icon">
                  <img src={f.icon} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span className="feature-tag">{f.tag}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
                <span className="fan-card-cta">Learn more →</span>
              </div>
            ))}
          </div>

          <div className="fan-grid-horizontal" style={{ marginTop: 60 }}>
            <div className="fan-card-sleek" onClick={() => navigate('/attendee/friends')}>
              <span>SYNC NOW →</span>
            </div>
            <div className="fan-card-sleek" onClick={() => navigate('/attendee/navigate')}>
              <span>EXPLORE →</span>
            </div>
            <div className="fan-card-sleek" onClick={() => navigate('/attendee/food')}>
              <span>MENU →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fan Experience Hub Section ────────────────────── */}
      <section className="landing-section fan-hub-preview" id="fan-experience" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="landing-container">
          <div className="section-header">
            <span className="section-overline">ATTENDEE EMPOWERMENT</span>
            <h2 className="section-title">The Fan Terminal</h2>
            <p className="section-desc">More than just a dashboard. A mission-control interface for every attendee in your venue.</p>
          </div>

          <div className="fan-grid">
            <div className="fan-card" onClick={() => navigate('/attendee/friends')}>
              <div className="fan-card-icon">
                <img src={fanIcons} alt="Social Hub" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 8px var(--accent))' }} />
              </div>
              <h4>Social Hub</h4>
              <p>Locate friends in real-time with sub-meter precision and shared safety beacons.</p>
              <span className="fan-card-cta">Sync Now →</span>
            </div>
            <div className="fan-card" onClick={() => navigate('/attendee/navigate')}>
              <div className="fan-card-icon">
                <img src={fanIcons} alt="Smart Map" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 8px var(--accent))' }} />
              </div>
              <h4>Smart Map</h4>
              <p>Interactive 3D navigation to seats, amenities, and exits with live wait-times.</p>
              <span className="fan-card-cta">Explore →</span>
            </div>
            <div className="fan-card" onClick={() => navigate('/attendee/food')}>
              <div className="fan-card-icon">
                <img src={fanIcons} alt="Express Order" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 8px var(--accent))' }} />
              </div>
              <h4>Express Order</h4>
              <p>Skip the lines. Pre-order food and drinks with AI-predicted pickup windows.</p>
              <span className="fan-card-cta">Menu →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Showcase Section ──────────────────────────────── */}
      <section className="landing-section showcase-section" id="showcase">
        <div className="landing-container">
          <div className="showcase-grid">
            <div className="showcase-text">
              <span className="section-overline">SEE WHAT OTHERS CAN'T</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Real-Time 3D<br />Digital Twin</h2>
              <p className="section-desc" style={{ textAlign: 'left', maxWidth: 480 }}>
                Explore a photorealistic holographic replica of your venue with live sensor overlays, 
                crowd density heatmaps, and predictive congestion alerts — all updating in real time.
              </p>
              <div className="showcase-bullets">
                <div className="showcase-bullet"><span className="bullet-dot" />Real-time density heatmaps</div>
                <div className="showcase-bullet"><span className="bullet-dot" />Predictive congestion alerts</div>
                <div className="showcase-bullet"><span className="bullet-dot" />Dynamic exit path visualization</div>
              </div>
            </div>
            <div className="showcase-image-wrap">
              <div className="showcase-image-frame">
                <div className="showcase-frame-label">
                  <span className="status-dot online pulse" style={{ width: 5, height: 5 }} />
                  <span className="mono" style={{ fontSize: '0.62rem' }}>LIVE TWIN — SESSION #882</span>
                </div>
                <img src={featureTwin} alt="Digital Twin" className="showcase-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technology Section ─────────────────────────────── */}
      <section className="landing-section tech-section" id="technology">
        <div className="landing-container">
          <div className="tech-layout">
            <div className="tech-cards">
              {techStack.map((t, i) => (
                <div key={i} className="tech-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="tech-card-icon">
                    <img src={t.icon} alt={t.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h4>{t.label}</h4>
                    <p>{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="tech-hero">
              <span className="section-overline">ARCHITECTURE</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Architected for<br /><span style={{ color: 'var(--accent)' }}>Scale.</span></h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                FlowState is built on a distributed edge computing architecture that processes millions of data 
                points per second across your entire venue, enabling 100% GDPR/CCPA compliance through anonymous 
                data analysis.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Predictive Analytics', 'Edge Computing', 'GDPR Compliant', 'Real-Time Processing'].map(tag => (
                  <span key={tag} className="badge badge-accent">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Venues Marquee ─────────────────────────────────── */}
      <section className="landing-section venues-section">
        <div className="landing-container">
          <div className="venues-marquee">
            <div className="venues-track">
              {[...venues, ...venues].map((v, i) => (
                <span key={i} className="venue-name">{v}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────── */}
      <section className="landing-section" id="testimonial">
        <div className="landing-container">
          <div className="testimonial-card">
            <div className="testimonial-quote">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.3"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <p>
                "In deploying FlowState, we achieved a <strong>record-setting 14-minute full evacuation</strong> — 
                surpassing our own target by 6 minutes. Our safety protocols are now proactive, not reactive."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JS</div>
              <div>
                <strong>James Sterling</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>VP Operations, Apex Sports Group</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────── */}
      <section className="landing-section cta-section">
        <div className="landing-container">
          <div className="cta-card">
            <div className="cta-glow" />
            <h2 className="cta-title">
              Ready to <span className="text-gradient">Transform</span><br />Your Venue?
            </h2>
            <p className="cta-desc">
              Join the elite network of stadiums redefining the guest experience through predictive crowd technology.
            </p>
            <div className="cta-buttons">
              <button className="btn-hero-primary" onClick={() => navigate('/login')}>Start Free Trial</button>
              <button className="btn-hero-secondary" onClick={() => navigate('/login')}>
                Schedule a Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="landing-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ marginBottom: 12, cursor: 'pointer' }}>
                <div className="landing-logo-mark">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span>FlowState</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: 300 }}>
                © 2026 FlowState. Predictive Crowd Technology.
              </p>
            </div>
            <div className="footer-links-group">
              <h5>Product</h5>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Integrations</a>
            </div>
            <div className="footer-links-group">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
            <div className="footer-links-group">
              <h5>Legal</h5>
              <a href="#">Privacy</a>
              <a href="#">Security</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

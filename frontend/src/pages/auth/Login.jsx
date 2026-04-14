import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { platformRoles } from '../../data/rolesConfig';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  // Ensure field is empty on mount to prevent browser pre-fill
  useEffect(() => {
    // Small timeout to ensure browser autofill is cleared after it tries to populate
    const timer = setTimeout(() => {
      setEmail('');
      setPassword('');
      // Also clear any lingering session metadata that might trigger autofill
      localStorage.removeItem('flowstate_last_user');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Demo Bypass for Prototype Access
      if (email === 'admin@gmail.com' && password === 'flowstate123') {
        localStorage.setItem('flowstate_role_admin@gmail.com', 'venue-admin');
        localStorage.setItem('flowstate_last_user', 'admin@gmail.com');
        setTimeout(() => navigate('/venue-admin'), 800);
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check for stored role
      const storedRoleId = localStorage.getItem(`flowstate_role_${user.email}`);
      if (storedRoleId) {
        if (storedRoleId === 'fan') {
          setError('Unauthorized: This terminal is for system operators only. Fans must sign in via the Fan Portal.');
          auth.signOut();
          return;
        }
        const role = platformRoles.find(r => r.id === storedRoleId);
        if (role) {
          navigate(role.path);
          return;
        }
      }

      // If no role is found on this page, we don't automatically redirect admins to signup.
      // We block them unless they are authorized.
      setError('Access Denied: Your account is not provisioned for administrative access.');
      auth.signOut();
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const storedRoleId = localStorage.getItem(`flowstate_role_${user.email}`);
      if (storedRoleId) {
        if (storedRoleId === 'fan') {
          setError('Unauthorized: This terminal is for system operators only. Fans must sign in via the Fan Portal.');
          auth.signOut();
          return;
        }
        const role = platformRoles.find(r => r.id === storedRoleId);
        if (role) {
          navigate(role.path);
          return;
        }
      }

      // Block unauthorized Google accounts
      setError('Access Denied: Your account is not provisioned for administrative access.');
      auth.signOut();
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = (roleId, path) => {
    const demoEmail = `demo_${roleId}@gmail.com`;
    localStorage.setItem(`flowstate_role_${demoEmail}`, roleId);
    localStorage.setItem('flowstate_last_user', demoEmail);
    navigate(path);
  };

  return (
    <div className="auth-page cinematic">
      {/* Dynamic Background */}
      <div className="auth-bg-blur" />
      <div className="auth-overlay-glow" />
      <div className="hud-scanline" style={{ opacity: 0.1 }} />

      <div className="auth-container page-enter" style={{ display: 'flex', gap: 24, maxWidth: 900, width: '95%' }}>
        <div className="auth-card glass-panel stagger-item" style={{ flex: 1.2, animationDelay: '0.1s' }}>
          <div className="auth-header">
            <div className="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>FLOWSTATE</span>
            </div>
            <h1>System Access</h1>
            <p className="auth-subtitle">Initialize secure operator session</p>
          </div>

          <div className="auth-sso-grid">
            <button className={`${loading ? 'loading' : ''} btn-sso`} onClick={handleGoogleLogin} disabled={loading}>
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Sign in with Google
            </button>
          </div>

          <div className="auth-divider">
            <div className="line" />
            <span>OR CONTINUE WITH EMAIL</span>
            <div className="line" />
          </div>

          {error && <div className="auth-error-msg">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-group">
              <label>Operator Email</label>
              <div className="input-affix">
                <span className="icon">@</span>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="chrome-off"
                  required
                />
              </div>
            </div>

            <div className="auth-group">
              <label>
                Security Key
                <a href="#" className="link-muted">Forgot?</a>
              </label>
              <div className="input-affix">
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button type="submit" className={`btn-auth-primary ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'Establishing Link...' : 'Initialize Command Link →'}
            </button>
          </form>

          <div className="auth-footer">
            <div className="auth-legal">
              <a href="#">Security Protocol</a>
              <span className="sep" />
              <a href="#">Privacy Shield</a>
            </div>
          </div>

          <div className="demo-hint" style={{ marginTop: 20, textAlign: 'center', fontSize: '0.7rem', color: 'var(--accent)', opacity: 0.8, letterSpacing: '0.05em' }}>
            DEMO_SESSION // admin@gmail.com : flowstate123
          </div>
        </div>

        {/* DEMO BYPASS PANEL */}
        <div className="auth-card glass-panel demo-bypass-panel stagger-item" style={{ flex: 0.8, background: 'rgba(0, 212, 170, 0.03)', border: '1px solid rgba(0, 212, 170, 0.2)', animationDelay: '0.2s' }}>
          <div className="auth-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', marginBottom: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              <span className="mono" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>DEMO_TOOLKIT</span>
            </div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Simulation Mode</h2>
            <p className="auth-subtitle" style={{ fontSize: '0.75rem' }}>One-click entry to all major operational modules.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            <button className="btn-demo-bypass" onClick={() => handleDemoAccess('venue-admin', '/venue-admin')}>
              <div className="btn-content">
                <span className="title">Venue Command</span>
                <span className="desc">Local stadium operations</span>
              </div>
              <span className="arrow">→</span>
            </button>

            <button className="btn-demo-bypass" onClick={() => handleDemoAccess('super-admin', '/super-admin')}>
              <div className="btn-content">
                <span className="title">Global Intelligence</span>
                <span className="desc">Platform-wide analytics</span>
              </div>
              <span className="arrow">→</span>
            </button>

            <button className="btn-demo-bypass" onClick={() => handleDemoAccess('operations', '/operations')}>
              <div className="btn-content">
                <span className="title">Incident Control</span>
                <span className="desc">Real-time crowd flow</span>
              </div>
              <span className="arrow">→</span>
            </button>

            <Link to="/attendee" className="btn-demo-bypass fan" style={{ textDecoration: 'none' }}>
              <div className="btn-content">
                <span className="title">Fan Terminal</span>
                <span className="desc">Mobile-first user experience</span>
              </div>
              <span className="arrow">→</span>
            </Link>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 24 }}>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
              SYSTEM_NOTE: Selecting a simulation role will automatically provision transient credentials for your current browser session.
            </div>
          </div>
        </div>
      </div>

      {/* Request Access Modal */}
      {showAccessModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAccessModal(false)}>
          <div className="auth-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="brand-logo" style={{ marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>ACCESS_REQUEST</span>
            </div>
            <h3>Request Transmitted</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20 }}>
              Your request for system command access has been logged and sent to Super Admin for verification.
              You will receive a notification via secure link once approved.
            </p>
            <button className="btn-auth-primary" style={{ marginTop: 0 }} onClick={() => setShowAccessModal(false)}>
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

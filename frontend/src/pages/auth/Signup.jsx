import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  // Check for redirected Google User on Mount
  useEffect(() => {
    if (location.state?.googleUser) {
      setEmail(location.state.googleUser.email);
      setName(location.state.googleUser.name);
      setIsGoogleAuth(true);
      // Automatically register them as fan and redirect
      finalizeRegistration(location.state.googleUser.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const finalizeRegistration = (userEmail) => {
    localStorage.setItem(`flowstate_role_${userEmail}`, 'fan');
    localStorage.setItem('flowstate_last_user', userEmail);
    navigate('/attendee');
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setEmail(user.email);
      setName(user.displayName || 'Fan');
      setIsGoogleAuth(true);

      finalizeRegistration(user.email);
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) return;

    setLoading(true);
    setError('');

    try {
      let finalEmail = email;

      if (!isGoogleAuth) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        finalEmail = user.email;
      }

      finalizeRegistration(finalEmail);
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page cinematic">
      <div className="auth-bg-blur" />
      <div className="auth-overlay-glow" />

      <div className="auth-container" style={{
        display: 'flex',
        gap: 40,
        maxWidth: 1000,
        width: '95%',
        zIndex: 10,
        alignItems: 'stretch',
        marginTop: '-2vh'
      }}>
        <div className="auth-card glass-panel" style={{ flex: 1.2 }}>
          <div className="auth-header">
            <div className="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>FLOWSTATE</span>
            </div>
            <h1>Fan Registration</h1>
            <p className="auth-subtitle">
              Register for Stadium Connect and sync with the venue grid.
            </p>
          </div>

          {error && <div className="auth-error-msg" style={{ marginBottom: 20 }}>{error}</div>}

          <div className="auth-sso-grid" style={{ marginBottom: 24 }}>
            <button type="button" className={`${loading ? 'loading' : ''} btn-sso`} onClick={handleGoogleSignup} disabled={loading}>
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Register with Google
            </button>
          </div>

          <div className="auth-divider">
            <div className="line" />
            <span>OR PREFER MANUAL</span>
            <div className="line" />
          </div>

          <form onSubmit={handleSignup} className="auth-form">
            <div className="auth-group">
              <label>Full Name</label>
              <div className="input-affix">
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-group">
              <label>Email Address</label>
              <div className="input-affix">
                <span className="icon">@</span>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="auth-group">
              <label>Security Key</label>
              <div className="input-affix">
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <button type="submit" className={`btn-auth-primary ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'Initializing...' : 'Register for Stadium Connect →'}
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Administrative or Operator access requires authorized provisioning by a system administrator.
          </p>

          <div className="auth-footer" style={{ marginTop: 24 }}>
            <p>Already registered? <Link to="/login">Initialize Link</Link></p>
          </div>
        </div>

        {/* FAN DEMO BYPASS PANEL */}
        <div className="auth-card glass-panel demo-bypass-panel" style={{
          flex: 0.8,
          background: 'rgba(59, 130, 246, 0.03)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className="auth-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3b82f6', marginBottom: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              <span className="mono" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>DEMO_TOOLKIT</span>
            </div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Simulation Mode</h2>
            <p className="auth-subtitle" style={{ fontSize: '0.75rem' }}>Direct bypass to evaluate the mobile-first Fan Terminal.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            <button className="btn-demo-bypass fan" onClick={() => finalizeRegistration('demo_fan@gmail.com')}>
              <div className="btn-content">
                <span className="title">Demo Fan Explorer</span>
                <span className="desc">Instant access to attendee features</span>
              </div>
              <span className="arrow">→</span>
            </button>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 24 }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
              SYSTEM_NOTE: This mode grants transient Guest access to sample profiles. No real data is persisted.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import './Auth.css';

export default function FanSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!location.state?.googleUser) {
        setEmail('');
        setPassword('');
        setName('');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.state]);

  useEffect(() => {
    if (location.state?.googleUser) {
      setEmail(location.state.googleUser.email);
      setName(location.state.googleUser.name);
      setIsGoogleAuth(true);
      finalizeRegistration(location.state.googleUser.email);
    }
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
    <div className="auth-wrapper">
      <img 
        className="auth-bg-image" 
        alt="Vibrant futuristic stadium at night" 
        src="/bg/fan_bg.png"
      />
      <div className="auth-circuit-bg"></div>
      <div className="auth-gradient-overlay"></div>

      <main className="auth-main">
        <div className="auth-card-container">
          
          <div className="auth-brand-header">
            <h1 className="auth-brand-title">FLOWSTATE</h1>
            <p className="auth-brand-subtitle">Deep Space Protocol // Active</p>
          </div>

          <div className="auth-glass-panel">
            <div className="auth-panel-accent"></div>
            
            <div className="auth-form-header">
              <h2 className="auth-form-title">Fan Registration</h2>
              <span className="auth-form-badge">NEW ENROLLMENT</span>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button 
              type="button"
              className="auth-google-btn" 
              onClick={handleGoogleSignup} 
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Register with Google
            </button>

            <div className="auth-divider-container">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">OR PREFER MANUAL</span>
              <div className="auth-divider-line"></div>
            </div>

            <form onSubmit={handleSignup}>
              <div className="auth-input-group">
                <label className="auth-label">FULL NAME</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    placeholder="YOUR NAME" 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label className="auth-label">FAN EMAIL</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    placeholder="ATTENDEE@EMAIL.COM" 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group" style={{ marginBottom: '2rem' }}>
                <label className="auth-label">SECURE ACCESS KEY</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    placeholder="CREATE ACCESS KEY" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="auth-input-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Initializing...' : 'Register as Fan'}
              </button>
            </form>

            <div className="auth-switch-state">
              <Link to="/fan/login" className="auth-switch-btn" style={{ border: 'none', textDecoration: 'none' }}>
                Return to Fan Login
              </Link>
            </div>
          </div>

          <div className="auth-security-notice">
            <div className="auth-encryption-line">
              <div className="auth-line"></div>
              <span className="auth-encryption-text">ENCRYPTED WITH AETHERIS-256</span>
              <div className="auth-line"></div>
            </div>
            <div className="auth-security-icons">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shield</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>terminal</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>security</span>
            </div>
          </div>

        </div>
      </main>

      <footer className="auth-footer">
        <div className="auth-footer-content">
          <p className="auth-footer-text">© {new Date().getFullYear()} FLOWSTATE // DEEP SPACE PROTOCOL ACTIVE</p>
          <div className="auth-footer-links">
            <a href="#" className="auth-footer-link">ENCRYPTION</a>
            <a href="#" className="auth-footer-link">TERMINAL</a>
            <a href="#" className="auth-footer-link">ARCHIVE</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

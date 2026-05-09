import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import './Auth.css';

export default function FanLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmail('');
      setPassword('');
      localStorage.removeItem('flowstate_last_user');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const storedRoleId = localStorage.getItem(`flowstate_role_${user.email}`);
      if (storedRoleId === 'fan') {
        localStorage.setItem('flowstate_last_user', user.email);
        navigate('/attendee');
        return;
      }

      setError('Access Denied: This terminal is for fans only.');
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
      if (storedRoleId === 'fan') {
        localStorage.setItem('flowstate_last_user', user.email);
        navigate('/attendee');
        return;
      }

      setError('Access Denied: This terminal is for fans only. Operator? Use Operator Terminal.');
      auth.signOut();
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
              <h2 className="auth-form-title">Fan Terminal</h2>
              <span className="auth-form-badge">ATTENDEE ACCESS</span>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button 
              className="auth-google-btn" 
              onClick={handleGoogleLogin} 
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Connect via Google
            </button>

            <div className="auth-divider-container">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">OR ENTER MANUAL KEY</span>
              <div className="auth-divider-line"></div>
            </div>

            <form onSubmit={handleLogin}>
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

              <div className="auth-input-group">
                <label className="auth-label">SECURITY KEY</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    placeholder="••••••••••••" 
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

              <div className="auth-options">
                <label className="auth-checkbox-label">
                  <input type="checkbox" className="auth-checkbox" />
                  <span className="auth-checkbox-text">REMEMBER VECTOR</span>
                </label>
                <a href="#" className="auth-forgot-link">FORGOT KEY?</a>
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Access Terminal'}
              </button>
            </form>

            <div className="auth-switch-state">
              <p className="auth-switch-text">Unregistered Attendee?</p>
              <Link to="/fan/signup" className="auth-switch-btn" style={{ textDecoration: 'none' }}>
                Create Fan Profile
              </Link>
            </div>
            
            <div className="auth-switch-state" style={{ marginTop: '1rem' }}>
               <Link to="/operator/login" className="auth-forgot-link" style={{ fontSize: '0.75rem', textDecoration: 'none' }}>
                  → Access Operator Command
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

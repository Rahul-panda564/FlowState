import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { platformRoles } from '../../data/rolesConfig';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Ensure field is empty on mount to prevent browser pre-fill
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
      // Development mode: Allow admin credentials for testing
      if (import.meta.env.DEV && email === 'admin@gmail.com' && password === 'admin123') {
        localStorage.setItem(`flowstate_role_${email}`, 'super-admin');
        localStorage.setItem('flowstate_last_user', email);
        setTimeout(() => navigate('/super-admin'), 500);
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

      setError('Access Denied: Your account is not provisioned for administrative access.');
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
        alt="A sprawling cinematic view of a futuristic digital nebula" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdKcdQSwCvuha-Ly_7GVsiBhpbtUW-LsDlFChpHc7CEeHdynrmPAJGV303iyqaUKOL5bz0Sq1eRqVjaAO7y0yeJ61d1oUIUwpo66jGXzt0AsBuGGqAlLes5xBy6cp7YkZf6hAHF2S2OuE6_CjHVmZ9qJYtv2Z9VxqislBJ4tltTR0Q5YQ3Uj4cW728nxdzGvspzMiDn4V0YTSdZpTdQuj1ezUvcfP9V3x1P8PqYEsg7t2Ic0l9Jf_wpkalTIpBNSKiEBH_4leiAQQ"
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
              <h2 className="auth-form-title">Operator Login</h2>
              <span className="auth-form-badge">LVL-4 ACCESS</span>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button 
              className="auth-google-btn" 
              onClick={handleGoogleLogin} 
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Initialize Link via Google
            </button>

            <div className="auth-divider-container">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">OR MANUAL OVERRIDE</span>
              <div className="auth-divider-line"></div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="auth-input-group">
                <label className="auth-label">OPERATOR EMAIL</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    placeholder="IDENTITY@FLOWSTATE.SYS" 
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
                {loading ? 'Establishing Link...' : 'Initialize Session'}
              </button>
            </form>

            <div className="auth-switch-state">
              <p className="auth-switch-text">Unregistered Entity?</p>
              <Link to="/signup" className="auth-switch-btn">
                New Operator? Sign Up
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

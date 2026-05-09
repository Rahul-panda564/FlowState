import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import './Auth.css';

export default function OperatorSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithPopup(auth, provider);
      setSuccess(true);
      setTimeout(() => navigate('/operator/login'), 4000);
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      
      setSuccess(true);
      setTimeout(() => navigate('/operator/login'), 4000);
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
        alt="Cinematic high-tech 3D holographic wireframe of a stadium" 
        src="/bg/operator_bg.png"
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
              <h2 className="auth-form-title">Operator Request</h2>
              <span className="auth-form-badge">SYSTEM ACCESS</span>
            </div>

            {error && <div className="auth-error">{error}</div>}
            {success && (
              <div className="auth-error" style={{ background: 'rgba(0,230,179,0.1)', borderColor: '#00e6b3', color: '#00e6b3' }}>
                Request transmitted. Your account is pending Super Admin approval. Redirecting...
              </div>
            )}

            {!success && (
              <>
                <button 
                  type="button"
                  className="auth-google-btn" 
                  onClick={handleGoogleSignup} 
                  disabled={loading}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" />
                  Request Access via Google
                </button>

                <div className="auth-divider-container">
                  <div className="auth-divider-line"></div>
                  <span className="auth-divider-text">OR MANUAL REQUEST</span>
                  <div className="auth-divider-line"></div>
                </div>

                <form onSubmit={handleSignup}>
                  <div className="auth-input-group">
                    <label className="auth-label">FULL NAME</label>
                    <div className="auth-input-wrapper">
                      <input 
                        className="auth-input" 
                        placeholder="OPERATOR NAME" 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

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

                  <div className="auth-input-group" style={{ marginBottom: '2rem' }}>
                    <label className="auth-label">REQUESTED SECURE KEY</label>
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
                    {loading ? 'Transmitting...' : 'Submit Request'}
                  </button>
                </form>
              </>
            )}

            <div className="auth-switch-state">
              <Link to="/operator/login" className="auth-switch-btn" style={{ border: 'none', textDecoration: 'none' }}>
                Return to Operator Login
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

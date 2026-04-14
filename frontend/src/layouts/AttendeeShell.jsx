import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AttendeeShell({ children, title, isEvacuating }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('flowstate_last_user');
    navigate('/');
  };

  useEffect(() => {
    document.body.classList.add('attendee-portal');
    return () => {
      document.body.classList.remove('attendee-portal');
    };
  }, []);
  const navItems = [
    { label: 'Home', path: '/attendee', iconPath: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/> },
    { label: 'Map', path: '/attendee/navigate', iconPath: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
    { label: 'Social', path: '/attendee/friends', iconPath: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
    { label: 'Food', path: '/attendee/food', iconPath: <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></> },
    { label: 'Me', path: '/attendee/profile', iconPath: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></> }
  ];

  return (
    <div className={`mobile-shell ${isEvacuating ? 'emergency-mode' : ''}`}>
      {/* Emergency Alert Banner */}
      {isEvacuating && (
        <div style={{ background: 'var(--status-alert)', color: 'white', padding: '12px 16px', textAlign: 'center', fontWeight: 700, animation: 'pulse-dot 1.5s infinite', position: 'sticky', top: 0, zIndex: 100 }}>
          ⚠️ URGENT: EVACUATE NOW - PROCURE NEAREST EXIT
        </div>
      )}

      <div className="mobile-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          {title || 'Stadium Connect'}
        </h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button 
            onClick={handleLogout}
            style={{ padding: 8, color: 'var(--text-muted)', transition: 'color 0.2s' }}
            title="Disconnect Session"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-elevated)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </div>

      <div className="mobile-content">
        {children}
      </div>

      <div className="mobile-bottom-nav">
        {navItems.map(item => (
          <button 
            key={item.path}
            className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.iconPath}</svg>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

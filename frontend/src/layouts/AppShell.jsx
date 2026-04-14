import { useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { globalSidebar } from '../data/sidebarConfig';

export default function AppShell({ children, brand, brandSub, user, sidebarItems, headerExtra }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Derived state for the sidebar section that should be open based on current path
  const autoOpenSection = useMemo(() => {
    if (!sidebarItems) { // isGlobalMode
      for (const section of globalSidebar) {
        if (section.items.some(item => {
          if (item.end) return location.pathname === item.path;
          return location.pathname.startsWith(item.path);
        })) {
          return section.section;
        }
      }
    }
    return '';
  }, [location.pathname, sidebarItems]);

  const [manualSection, setManualSection] = useState(null);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // If path changed, reset manual toggle so it follows the path again.
  // This is a documented pattern for resetting state on prop/context change.
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setManualSection(null);
  }

  const openSection = manualSection !== null ? manualSection : autoOpenSection;

  // Source of truth for navigation: specific items or global fallback
  const finalSidebar = sidebarItems || [];
  const isGlobalMode = !sidebarItems;

  const [activeDropdown, setActiveDropdown] = useState(null); // 'notif', 'settings', 'profile'
  const [isCinematicMode, setIsCinematicMode] = useState(false);
  const [telemetry, setTelemetry] = useState('FAST');
  const [notifications, setNotifications] = useState([]);

  const showToast = (msg, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.zIndex = '10000';
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = type === 'success' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12.01" y2="8"/><polyline points="11 12 12 12 12 16 13 16"/></svg>';
    const text = document.createElement('div');
    text.innerText = msg;
    text.style.fontWeight = '500';
    text.style.fontSize = '0.9rem';
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('Clearing system notification', 'info');
  };

  const toggleCinematic = () => {
    const newVal = !isCinematicMode;
    setIsCinematicMode(newVal);
    if (newVal) {
      document.documentElement.style.filter = 'contrast(1.1) saturate(1.1) brightness(1.05)';
      showToast('Cinematic Overlay Enabled', 'success');
    } else {
      document.documentElement.style.filter = 'none';
      showToast('System Visuals Reset', 'info');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flowstate_last_user');
    showToast('Vault sequence initiated... Logging out.', 'info');
    setTimeout(() => (window.location.href = '/'), 800);
  };
  
  // Update document title for production professionalism
  useEffect(() => {
    const area = brandSub || 'Crowd Intelligence';
    document.title = `FlowState — ${area}`;
  }, [brandSub]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = () => setActiveDropdown(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const toggleSection = (sectionName) => {
    setManualSection(prev => {
      const current = prev !== null ? prev : autoOpenSection;
      return current === sectionName ? '' : sectionName;
    });
  };

  const renderSidebarContent = () => {
    if (isGlobalMode) {
      return globalSidebar.map((group, i) => (
        <div key={i} className={`sidebar-group ${openSection === group.section ? 'open' : ''}`}>
          <div className="sidebar-group-header" onClick={() => toggleSection(group.section)}>
            <span>{group.section}</span>
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div className="sidebar-group-items">
            <div className="sidebar-group-inner">
              {group.items.map((item, j) => (
                <NavLink
                  key={item.path || j}
                  to={item.path}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                  end={item.end}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ));
    }

    // Role-specific flat list
    return finalSidebar.map((item, i) => {
      if (item.section) {
        return <div key={i} className="sidebar-section-label">{item.section}</div>;
      }
      return (
        <NavLink
          key={item.path || i}
          to={item.path}
          className={({ isActive }) => `sidebar-item hover-accent ${isActive ? 'active' : ''}`}
          end={item.end}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      );
    });
  };

  return (
    <div className={`app-shell ${isCinematicMode ? 'cinematic-active' : ''}`}>
      <div className="hud-scanline" />
      <div className="hud-fixed-decor top-right">VER_4.0.2_STABLE</div>
      <div className="hud-fixed-decor bottom-left">NEXUS_NODE_ACTIVE</div>
      
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-top">
            <NavLink to="/" className="brand-link" title="Return to Public Site">
              <h2>{brand || 'FlowState'}</h2>
            </NavLink>
          </div>
          {brandSub && (
            <div className="brand-sub">
              <span className="data-pulse">●</span> {brandSub}
            </div>
          )}
        </div>
        <nav className="sidebar-nav">
          {renderSidebarContent()}
        </nav>
        {user && (
          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-avatar">{user.initials}</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-role">{user.role}</div>
              </div>
            </div>
          </div>
        )}
      </aside>
      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <div className="header-status">
              <span className={`status-dot ${isCinematicMode ? 'critical pulse' : 'online pulse'}`}></span>
              <span className="label-caps">{brandSub}</span>
            </div>
          </div>

          <div className="header-center">
            {headerExtra}
          </div>

          <div className="header-right">
            <div className="header-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Global node search..." />
            </div>

            <div className="header-divider" style={{ width: 1, height: 20, background: 'var(--border-subtle)', margin: '0 8px' }} />
            
            {/* Notifications */}
            <div className="header-dropdown-container" onClick={e => e.stopPropagation()}>
              <button 
                className={`btn-icon header-notification ${activeDropdown === 'notif' ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === 'notif' ? null : 'notif')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                {notifications.length > 0 && <span className="count">{notifications.length}</span>}
              </button>
              {activeDropdown === 'notif' && (
                <div className="header-dropdown">
                  <div className="dropdown-header">
                    <h4>Pulse Notifications</h4>
                    <button className="btn-ghost" style={{ fontSize: '0.6rem' }} onClick={() => setNotifications([])}>Clear All</button>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Infrastructure is stable. No active pulses.</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`dropdown-item ${n.type === 'alert' ? 'alert' : ''}`} onClick={() => handleDismiss(n.id)}>
                        {n.type === 'alert' ? 
                          <div style={{ background: 'var(--status-alert)', width: 8, height: 8, borderRadius: '50%' }} /> :
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        }
                        <div>
                          <div style={{ fontWeight: 600 }}>{n.title}</div>
                          <div className="item-meta">{n.desc}</div>
                        </div>
                      </div>
                    ))
                  )}
                  <div style={{ padding: 10, textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: 4 }}>
                    <a href="#" style={{ fontSize: '0.7rem', color: 'var(--accent)', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); showToast('Accessing complete intelligence logs...', 'info'); }}>View Intelligence Log</a>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="header-dropdown-container" onClick={e => e.stopPropagation()}>
              <button 
                className={`btn-icon ${activeDropdown === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === 'settings' ? null : 'settings')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </button>
              {activeDropdown === 'settings' && (
                <div className="header-dropdown">
                  <div className="dropdown-header"><h4>Interface Settings</h4></div>
                  <div className="dropdown-item" onClick={toggleCinematic} style={{ cursor: 'pointer' }}>
                    <span>Cinematic / High Contrast</span> 
                    <div style={{ marginLeft: 'auto', width: 32, height: 16, background: isCinematicMode ? 'var(--accent)' : 'var(--bg-deep)', borderRadius: 10, position: 'relative', border: '1px solid var(--border-color)' }}>
                        <div style={{ position: 'absolute', top: 2, left: isCinematicMode ? 18 : 2, width: 10, height: 10, background: 'white', borderRadius: '50%', transition: 'all 0.2s' }} />
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => {
                      const next = telemetry === 'FAST' ? 'BALANCED' : telemetry === 'BALANCED' ? 'STABLE' : 'FAST';
                      setTelemetry(next);
                      showToast(`Telemetry updated to ${next} frequency`);
                  }} style={{ cursor: 'pointer' }}>
                    <span>Telemetry Frequency</span> 
                    <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '0.7rem' }}>{telemetry}</span>
                  </div>
                  <div className="dropdown-item" onClick={() => showToast('Master diagnostic sweep initiated...', 'info')}>
                    <span>System Diagnostics</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="header-dropdown-container" onClick={e => e.stopPropagation()}>
              <button 
                className={`btn-icon ${activeDropdown === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              {activeDropdown === 'profile' && (
                <div className="header-dropdown profile-dropdown">
                  <div className="dropdown-header">
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name || 'Operator'}</div>
                    <div className="item-meta">{user?.role || 'Nexus System User'}</div>
                  </div>
                  <div className="dropdown-item" onClick={() => { navigate('/profile', { state: { activeTab: 'Security' } }); setActiveDropdown(null); }}>Account Security</div>
                  <div className="dropdown-item" onClick={() => { navigate('/profile', { state: { activeTab: 'Activity Log' } }); setActiveDropdown(null); }}>Session History</div>
                  <div className="sidebar-divider" style={{ margin: '8px 0' }} />
                  <div className="dropdown-item" style={{ color: 'var(--status-alert)', cursor: 'pointer' }} onClick={handleLogout}>Logout System</div>
                </div>
              )}
            </div>

            <div className="header-divider" style={{ width: 1, height: 24, background: 'var(--border-subtle)', margin: '0 8px' }} />
            <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '6px 10px', color: 'var(--status-alert)' }} title="Exit System" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </header>
        <div className="page-content page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}

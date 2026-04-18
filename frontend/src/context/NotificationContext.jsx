import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showToast = useCallback((msg, type = 'success', persistInTray = true) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type === 'critical' ? 'critical' : type}`;
    toast.style.zIndex = '100000';
    
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

    if (persistInTray) {
      const id = Date.now();
      const newNotif = {
        id,
        title: msg,
        desc: 'Operational Intelligence Pulse',
        type: type === 'critical' ? 'alert' : 'info',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 50));
    }
  }, []);

  const addNotification = useCallback((title, desc, type = 'info') => {
    const id = Date.now();
    const newNotif = {
      id,
      title,
      desc,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    // Also show a toast for every pulse
    showToast(title, type === 'alert' ? 'critical' : 'success', false); // false because we already added it manually
    
    setNotifications(prev => [newNotif, ...prev].slice(0, 50));
    return id;
  }, [showToast]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications, dismissNotification, showToast }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

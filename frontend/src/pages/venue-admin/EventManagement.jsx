import { useState, useEffect } from 'react';
import { eventApi } from '../../api';
import CreateEventModal from '../../components/modals/CreateEventModal';
import EditEventModal from '../../components/modals/EditEventModal';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [activeSubView, setActiveSubView] = useState('Registry');

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

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventApi.getAll();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditOpen(true);
  };

  const handleCancelEvent = async (id) => {
    if (!window.confirm('Are you sure you want to cancel and remove this event from the system grid?')) return;
    
    try {
      await eventApi.delete(id);
      await fetchEvents();
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div className="page-pretitle">Event Operations / {activeTab}</div>
            <h1>Event Management</h1>
            <p className="page-subtitle">Schedule, configure, and monitor all events within your venue infrastructure.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16 }}>
              {['Registry', 'Calendar', 'Drafts'].map((t) => (
                <span key={t} className={activeSubView === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { setActiveSubView(t); showToast(`Switching to ${t} view`, 'info'); }}>{t}</span>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => showToast('Exporting event manifest...', 'success')}>Export Grid</button>
            <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>+ Create Event</button>
          </div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 24 }}>
        {['Upcoming', 'Active', 'Completed', 'Archived'].map(tab => (
          <button 
            key={tab} 
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>Event</th><th>Type</th><th>Date & Time</th><th>Expected Capacity</th><th>Staffing</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ padding: 40, textAlign: 'center' }}>Synchronizing local node...</td></tr>
            ) : events.filter(e => {
              if (activeTab === 'Upcoming') return e.status === 'upcoming';
              if (activeTab === 'Active') return e.status === 'live';
              if (activeTab === 'Completed') return e.status === 'completed';
              if (activeTab === 'Archived') return e.status === 'archived' || e.status === 'cancelled';
              return true;
            }).length === 0 ? (
              <tr><td colSpan="7" style={{ padding: 40, textAlign: 'center' }}>No {activeTab.toLowerCase()} events.</td></tr>
            ) : events.filter(e => {
              if (activeTab === 'Upcoming') return e.status === 'upcoming';
              if (activeTab === 'Active') return e.status === 'live';
              if (activeTab === 'Completed') return e.status === 'completed';
              if (activeTab === 'Archived') return e.status === 'archived' || e.status === 'cancelled';
              return true;
            }).map(e => (
              <tr key={e._id}>
                <td style={{ fontWeight: 600 }}>{e.name}</td>
                <td><span className={`badge ${e.type === 'sports' ? 'badge-accent' : e.type === 'concert' ? 'badge-info' : 'badge-neutral'}`}>{e.type}</span></td>
                <td><div>{e.date}</div><div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.time}</div></td>
                <td className="mono" style={{ fontWeight: 600 }}>{(e.expected || 0).toLocaleString()}</td>
                <td>{e.staffing === 'full' ? <span style={{ color: 'var(--status-ok)' }}>✓ Full</span> : e.staffing === 'partial' ? <span style={{ color: 'var(--status-warning)' }}>⚠ Partial</span> : <span style={{ color: 'var(--text-muted)' }}>─ Minimal</span>}</td>
                <td><span className={`badge ${e.status === 'live' ? 'badge-critical' : 'badge-success'}`}>{e.status === 'live' ? '● LIVE' : '○ ' + e.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost" style={{ fontSize: '0.72rem' }} onClick={() => handleEdit(e)}>Edit</button>
                    <button className="btn btn-ghost" style={{ fontSize: '0.72rem', color: 'var(--status-alert)' }} onClick={() => handleCancelEvent(e._id)}>Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateEventModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onCreated={fetchEvents}
      />

      <EditEventModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onUpdated={fetchEvents}
        event={selectedEvent}
      />
    </>
  );
}

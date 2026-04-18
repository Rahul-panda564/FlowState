import { useState, useEffect } from 'react';
import { eventApi } from '../../api';
import CreateEventModal from '../../components/modals/CreateEventModal';
import EditEventModal from '../../components/modals/EditEventModal';
import { useNotifications } from '../../context/NotificationContext';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [activeSubView, setActiveSubView] = useState('Registry');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // Dec 2025 as per seed/mock data
  const [selectedDateForModal, setSelectedDateForModal] = useState('');

  const { showToast } = useNotifications();

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

  const renderRegistry = () => (
    <div className="card" style={{ padding: 0 }}>
      <table className="data-table">
        <thead>
          <tr><th>Event</th><th>Type</th><th>Date & Time</th><th>Expected Capacity</th><th>Staffing</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="7" style={{ padding: 40, textAlign: 'center' }}>Synchronizing local node...</td></tr>
          ) : events.filter(e => {
            if (activeTab === 'Upcoming') return e.status === 'upcoming' || e.status === 'scheduled';
            if (activeTab === 'Active') return e.status === 'live';
            if (activeTab === 'Completed') return e.status === 'completed';
            if (activeTab === 'Archived') return e.status === 'archived' || e.status === 'cancelled';
            return true;
          }).length === 0 ? (
            <tr><td colSpan="7" style={{ padding: 40, textAlign: 'center' }}>No {activeTab.toLowerCase()} events.</td></tr>
          ) : events.filter(e => {
            if (activeTab === 'Upcoming') return e.status === 'upcoming' || e.status === 'scheduled';
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
  );

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });

    const calendarGrid = [];
    for (let i = 0; i < firstDay; i++) calendarGrid.push(null);
    for (let i = 1; i <= days; i++) calendarGrid.push(i);

    return (
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2>{monthName} {year}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>‹ Previous</button>
            <button className="btn btn-ghost" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>Next ›</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
            <div key={d} className="label-caps" style={{ textAlign: 'center', paddingBottom: 12 }}>{d}</div>
          ))}
          {calendarGrid.map((day, idx) => {
            const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
            const dayEvents = events.filter(e => e.date === dateStr);
            
            return (
              <div 
                key={idx} 
                className={`card ${day ? 'hover-scale' : ''}`} 
                style={{ 
                  minHeight: 70, 
                  padding: '10px 12px', 
                  background: day ? 'rgba(255,255,255,0.02)' : 'transparent',
                  border: day ? '1px solid var(--border-subtle)' : 'none',
                  opacity: day ? 1 : 0.3,
                  cursor: day ? 'pointer' : 'default',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => {
                  if (day) {
                    setSelectedDateForModal(dateStr);
                    setIsCreateOpen(true);
                  }
                }}
              >
                {day && (
                  <>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 8 }}>{day}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {dayEvents.map(e => (
                        <div key={e._id} style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'var(--accent-dim)', borderLeft: '2px solid var(--accent)', borderRadius: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={e.name}>
                          {e.name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDrafts = () => (
    <div className="card" style={{ padding: 0 }}>
      <table className="data-table">
        <thead>
          <tr><th>Event</th><th>Type</th><th>Draft Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {events.filter(e => e.status === 'draft').length === 0 ? (
            <tr><td colSpan="5" style={{ padding: 40, textAlign: 'center' }}>No draft manifests found in the pipeline.</td></tr>
          ) : events.filter(e => e.status === 'draft').map(e => (
            <tr key={e._id}>
              <td style={{ fontWeight: 600 }}>{e.name}</td>
              <td><span className="badge badge-neutral">{e.type}</span></td>
              <td>{e.date}</td>
              <td><span className="badge badge-info">DRAFT</span></td>
              <td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-ghost" style={{ fontSize: '0.72rem' }} onClick={() => handleEdit(e)}>Resume Editing</button>
                  <button className="btn btn-primary" style={{ fontSize: '0.72rem' }} onClick={() => showToast('Manifest published to live grid.', 'success')}>Publish</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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

      {activeSubView === 'Registry' && renderRegistry()}
      {activeSubView === 'Calendar' && renderCalendar()}
      {activeSubView === 'Drafts' && renderDrafts()}

      <CreateEventModal 
        isOpen={isCreateOpen} 
        onClose={() => { setIsCreateOpen(false); setSelectedDateForModal(''); }} 
        onCreated={fetchEvents}
        initialDate={selectedDateForModal}
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

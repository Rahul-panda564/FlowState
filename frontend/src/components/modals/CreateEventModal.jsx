import { useState, useEffect } from 'react';
import { eventApi } from '../../api';

export default function CreateEventModal({ isOpen, onClose, onCreated, initialDate }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'sports',
    date: '',
    time: '',
    expected: 1000,
    staffing: 'full'
  });

  useEffect(() => {
    if (isOpen && initialDate) {
      setFormData(prev => ({ ...prev, date: initialDate }));
    } else if (isOpen && !initialDate) {
      setFormData(prev => ({ ...prev, date: '' }));
    }
  }, [initialDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For now we assume a default venue ID if none provided, 
      // in a real app this would be the logged in user's venue.
      // We'll fetch the first venue for testing purposes.
      await eventApi.create({ ...formData, venueId: '661582846e4b47644265431b' }); // Placeholder ID
      onCreated();
      onClose();
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('Failed to schedule event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content glass-panel" style={{ width: 500 }}>
        <div className="modal-header">
          <h2 id="modal-title">Schedule New Event</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="label-caps" htmlFor="event-name">Event Identity</label>
            <input 
              id="event-name"
              placeholder="e.g., Championship Final" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label className="label-caps" htmlFor="event-category">Category</label>
              <select id="event-category" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="sports">Sports</option>
                <option value="concert">Concert</option>
                <option value="conference">Conference</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label-caps" htmlFor="event-staffing">Staffing Level</label>
              <select id="event-staffing" value={formData.staffing} onChange={e => setFormData({...formData, staffing: e.target.value})}>
                <option value="full">Full Deployment</option>
                <option value="partial">Partial Grid</option>
                <option value="minimal">Minimal Standby</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label className="label-caps" htmlFor="event-date">Date</label>
              <input id="event-date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div>
              <label className="label-caps" htmlFor="event-time">Commencement Time</label>
              <input id="event-time" type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="label-caps" htmlFor="event-occupancy">Expected Occupancy</label>
            <input id="event-occupancy" type="number" value={formData.expected} onChange={e => setFormData({...formData, expected: parseInt(e.target.value) || 0})} required />
          </div>

          <div className="modal-footer" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Scheduling...' : 'Initialize Event →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

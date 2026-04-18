import { useState, useEffect } from 'react';
import { eventApi } from '../../api';

export default function EditEventModal({ isOpen, onClose, onUpdated, event }) {
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
    if (event) {
      setFormData({
        name: event.name || '',
        type: event.type || 'sports',
        date: event.date || '',
        time: event.time || '',
        expected: event.expected || 1000,
        staffing: event.staffing || 'full'
      });
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await eventApi.update(event._id, formData);
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Failed to update event:', err);
      alert('Failed to update event parameters.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ width: 500 }}>
        <div className="modal-header">
          <h2>Edit Event Configuration</h2>
          <button className="btn-icon" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <div className="label-caps">Event Identity</div>
            <input 
              placeholder="e.g., Championship Final" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div className="label-caps">Category</div>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="sports">Sports</option>
                <option value="concert">Concert</option>
                <option value="conference">Conference</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <div className="label-caps">Staffing Level</div>
              <select value={formData.staffing} onChange={e => setFormData({...formData, staffing: e.target.value})}>
                <option value="full">Full Deployment</option>
                <option value="partial">Partial Grid</option>
                <option value="minimal">Minimal Standby</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div className="label-caps">Date</div>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div>
              <div className="label-caps">Commencement Time</div>
              <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="label-caps">Expected Occupancy</div>
            <input type="number" value={formData.expected} onChange={e => setFormData({...formData, expected: parseInt(e.target.value) || 0})} required />
          </div>

          <div className="modal-footer" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Commit Changes →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { userApi } from '../../api';

export default function InviteStaffModal({ isOpen, onClose, onInvited }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'operations',
    venueAccess: [] // In a real app, this would pre-fill with the current venue
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.invite(formData);
      onInvited();
      onClose();
    } catch (err) {
      console.error('Failed to invite staff:', err);
      alert('Failed to send invitation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ width: 450 }}>
        <div className="modal-header">
          <h2>Invite Team Member</h2>
          <button className="btn-icon" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <div className="label-caps">Full Name</div>
            <input 
              placeholder="e.g., Sarah Chen" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <div className="label-caps">Professional Email</div>
            <input 
              type="email"
              placeholder="name@kinetic.cmd" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <div className="label-caps">Primary Access Role</div>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="venue-admin">Venue Administrator</option>
              <option value="operations">Operations Manager</option>
              <option value="security">Security Supervisor</option>
              <option value="attendee">Attendee (Standard)</option>
            </select>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 8 }}>
              Permissions can be further refined in the Personnel Matrix after initialization.
            </p>
          </div>

          <div className="modal-footer" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Initializing...' : 'Send Command Link →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';

export default function IncidentReportModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    severity: 'medium',
    category: 'security',
    description: ''
  });
  const { addNotification, showToast } = useNotifications();

  if (!isOpen) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API dispatch
    await new Promise(r => setTimeout(r, 1000));
    showToast(`✅ INCIDENT_REPORTED: Emergency units dispatched to ${formData.location}`);
    addNotification('Incident Command Dispatched', `Units deployed to ${formData.location} for ${formData.category} event.`, formData.severity === 'critical' ? 'alert' : 'info');
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ width: 450 }}>
        <div className="modal-header">
          <div>
            <div className="label-accent" style={{ marginBottom: 4 }}>INCIDENT RESPONSE UNIT</div>
            <h2>New Incident Manifest</h2>
          </div>
          <button className="btn-icon" onClick={onClose} style={{ fontSize: '1.5rem' }}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <div className="label-caps">Incident Location / Zone</div>
            <input 
              placeholder="e.g., North Gate, Sector 402" 
              value={formData.location} 
              onChange={e => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div className="label-caps">Priority Level</div>
              <select value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}>
                <option value="critical">Critical (Immediate)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="low">Low (Monitoring)</option>
              </select>
            </div>
            <div>
              <div className="label-caps">Category</div>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="security">Security Breach</option>
                <option value="medical">Medical / Health</option>
                <option value="crowd">Crowd Anomaly</option>
                <option value="hardware">Hardware Failure</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <div className="label-caps">Description & Situational Intel</div>
            <textarea 
              rows="3" 
              placeholder="Provide specific details for the dispatch team..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
              style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'white', resize: 'none' }}
            />
          </div>

          <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ background: formData.severity === 'critical' ? 'var(--status-alert)' : 'var(--accent)' }}>
              {loading ? 'Dispatching...' : 'Dispatch Command →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

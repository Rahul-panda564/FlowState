import { useState } from 'react';
import { sensorApi } from '../../api';

export default function AddSensorModal({ isOpen, onClose, onCreated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sensorId: '',
    type: 'LIDAR',
    x: 50,
    y: 50,
    status: 'Online'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, venueId would come from the current context
      const venueId = '661582846e4b47644265431b'; // Placeholder
      await sensorApi.create({ ...formData, venueId });
      onCreated();
      onClose();
    } catch (err) {
      console.error('Failed to add sensor:', err);
      alert('Failed to register sensor on grid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ width: 450 }}>
        <div className="modal-header">
          <h2>Register New Sensor Node</h2>
          <button className="btn-icon" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <div className="label-caps">Hardware ID</div>
            <input 
              placeholder="e.g., LID-AR-XX" 
              value={formData.sensorId} 
              onChange={e => setFormData({...formData, sensorId: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div className="label-caps">Sensor Architecture</div>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="LIDAR">LiDAR System</option>
                <option value="IOT SENSOR">IoT Motion</option>
                <option value="CAMERA">Vision Node</option>
                <option value="PLANNED">Planned Deployment</option>
              </select>
            </div>
            <div>
              <div className="label-caps">Initial Status</div>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Online">Online / Active</option>
                <option value="Planned">Planned / Inactive</option>
              </select>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--bg-deep)', padding: 16, marginBottom: 20 }}>
            <div className="label-caps" style={{ marginBottom: 12 }}>Spatial Coordinates (Grid Relative)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>X-Axis: {formData.x}%</label>
                <input type="range" value={formData.x} onChange={e => setFormData({...formData, x: parseInt(e.target.value)})} min="0" max="100" />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Y-Axis: {formData.y}%</label>
                <input type="range" value={formData.y} onChange={e => setFormData({...formData, y: parseInt(e.target.value)})} min="0" max="100" />
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Initializing Node...' : 'Connect to Grid →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

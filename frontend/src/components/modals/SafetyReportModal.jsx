import { securityData } from '../../data/mockData';
import { useNotifications } from '../../context/NotificationContext';

export default function SafetyReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const d = securityData;

  const { showToast } = useNotifications();

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ width: 800, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', padding: 40 }}>
        <div className="modal-header" style={{ marginBottom: 32 }}>
          <div>
            <div className="label-accent" style={{ marginBottom: 4 }}>SECURITY AUDIT REPORT</div>
            <h2>Operational Safety Analysis: Session_FS_402</h2>
          </div>
          <button className="btn-icon" onClick={onClose} style={{ fontSize: '1.5rem' }}>×</button>
        </div>

        <div className="grid-3" style={{ marginBottom: 32 }}>
           <div className="card" style={{ textAlign: 'center', background: 'var(--bg-deep)' }}>
             <div className="label-caps">Safety Grade</div>
             <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', marginTop: 8 }}>A</div>
             <div style={{ fontSize: '0.72rem', color: 'var(--status-ok)', marginTop: 4 }}>HIGH_RELIABILITY</div>
           </div>
           <div className="card" style={{ textAlign: 'center', background: 'var(--bg-deep)' }}>
             <div className="label-caps">Resolved Incidents</div>
             <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 8 }}>94%</div>
             <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>VS 88% BASELINE</div>
           </div>
           <div className="card" style={{ textAlign: 'center', background: 'var(--bg-deep)' }}>
             <div className="label-caps">Critical Failures</div>
             <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--status-ok)', marginTop: 8 }}>0</div>
             <div style={{ fontSize: '0.72rem', color: 'var(--status-ok)', marginTop: 4 }}>ZERO_TOLERANCE_MET</div>
           </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div className="label-caps" style={{ marginBottom: 16 }}>Crowd Pressure Telemetry (24H Trend)</div>
          <div style={{ height: 150, background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', padding: 20, display: 'flex', alignItems: 'flex-end', gap: 6, border: '1px solid var(--border-subtle)' }}>
             {[30, 45, 60, 55, 70, 85, 92, 78, 65, 50, 40, 35, 45, 55, 65, 75, 82, 90, 85, 70, 60, 50, 40, 30].map((v, i) => (
               <div key={i} style={{ flex: 1, height: `${v}%`, background: v > 85 ? 'var(--status-alert)' : v > 70 ? 'var(--status-warning)' : 'var(--accent-dim)', borderRadius: '2px 2px 0 0' }}></div>
             ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <span className="mono" style={{ fontSize: '0.65rem' }}>00:00</span>
            <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--status-alert)' }}>PEAK_ACTIVITY</span>
            <span className="mono" style={{ fontSize: '0.65rem' }}>23:59</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          <div className="card">
            <div className="label-caps" style={{ marginBottom: 12 }}>Incident Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Medical Emergency', count: 12, color: 'var(--status-info)' },
                { label: 'Security Breach', count: 2, color: 'var(--status-alert)' },
                { label: 'Infrastructure Alert', count: 5, color: 'var(--status-warning)' },
                { label: 'General Inquiry', count: 42, color: 'var(--text-muted)' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.color }}></div>
                    <span style={{ fontSize: '0.85rem' }}>{b.label}</span>
                  </div>
                  <span className="mono" style={{ fontWeight: 600 }}>{b.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="label-caps" style={{ marginBottom: 12 }}>AI Prediction Accuracy</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 6 }}>
                   <span>CROWD_DYNAMICS_MODEL</span>
                   <span style={{ color: 'var(--accent)' }}>98.4%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <div style={{ width: '98.4%', height: '100%', background: 'var(--accent)', borderRadius: 2 }}></div>
                </div>
              </div>
              <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 6 }}>
                    <span>RISK_ASSESSMENT_VECHTOR</span>
                    <span style={{ color: 'var(--status-ok)' }}>96.1%</span>
                 </div>
                 <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                   <div style={{ width: '96.1%', height: '100%', background: 'var(--status-ok)', borderRadius: 2 }}></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => showToast('Compiling high-resolution PDF package...')}>Export PDF</button>
          <button className="btn btn-secondary" onClick={() => showToast('Report shared with local emergency response hub')}>Share Audit</button>
          <button className="btn btn-primary" onClick={onClose}>Close Report</button>
        </div>
      </div>
    </div>
  );
}

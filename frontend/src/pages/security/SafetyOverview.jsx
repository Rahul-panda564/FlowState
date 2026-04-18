import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { securityData } from '../../data/mockData';
import { useState } from 'react';
import SafetyReportModal from '../../components/modals/SafetyReportModal';
import IncidentReportModal from '../../components/modals/IncidentReportModal';
import { useNotifications } from '../../context/NotificationContext';

export default function SafetyOverview() {
  const d = securityData;
  const [activeTab, setActiveTab] = useState('Overview');
  const [reportType, setReportType] = useState('Full Operational Audit');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const { addNotification, showToast } = useNotifications();


  const zoneColors = { ok: 'badge-success', watch: 'badge-warning', alert: 'badge-critical' };
  const incSevColors = { critical: 'badge-critical', medium: 'badge-warning', low: 'badge-neutral' };

  const renderOverview = () => (
    <>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard 
          label="Crowd Pressure Index" 
          value={d.crowdPressureIndex.value}
          progress={d.crowdPressureIndex.value}
          progressColor={d.crowdPressureIndex.value < 60 ? 'accent' : 'warning'}
          subtext={d.crowdPressureIndex.trend}
        />
        <StatCard 
          label="Evacuation Readiness" 
          value={`${d.evacuationReadiness.value} min`}
          subtext={d.evacuationReadiness.status}
        />
        <StatCard 
          label="Medical Incident Rate" 
          value={`${d.medicalRate.value} ${d.medicalRate.unit}`}
          subtext={d.medicalRate.status}
        />
        <StatCard 
          label="Security Response Time" 
          value={`${d.securityResponse.value} min`}
          subtext={`${d.securityResponse.activeUnits} Active Units`}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }}>
        <GlassPanel header="Zone Status Grid" headerActions={<span className="label-accent">Live Telemetry</span>}>
          <table className="data-table" style={{ fontSize: '0.82rem' }}>
            <thead>
              <tr><th>Zone</th><th>Occupancy</th><th>Pressure</th><th>Status</th><th>Staff</th></tr>
            </thead>
            <tbody>
              {d.zones.map((z, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{z.name}</td>
                  <td className="mono" style={{ opacity: 0.8 }}>{z.occupancy} / {z.capacity}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className={`progress-bar-fill ${parseInt(z.pressure) > 90 ? 'red' : parseInt(z.pressure) > 70 ? 'yellow' : 'green'}`} style={{ width: z.pressure }}></div>
                      </div>
                      <span className="mono">{z.pressure}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${zoneColors[z.status]}`}>{z.status}</span></td>
                  <td><button className="btn btn-ghost" style={{ fontSize: '0.72rem', padding: '4px 8px' }} onClick={() => showToast(`Optimizing staffing roster for ${z.name}...`, 'success')}>Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>

        <GlassPanel header="Active Incidents" headerActions={<button className="btn btn-primary" style={{ fontSize: '0.72rem' }} onClick={() => setIsIncidentModalOpen(true)}>+ Report</button>}>
          <table className="data-table" style={{ fontSize: '0.78rem' }}>
            <thead>
              <tr><th>Location</th><th>Severity</th><th>Status</th></tr>
            </thead>
            <tbody>
              {d.incidents.map((inc, i) => (
                <tr key={i}>
                  <td>{inc.location}</td>
                  <td><span className={`badge ${incSevColors[inc.severity]}`}>{inc.severity}</span></td>
                  <td><span style={{ fontWeight: 600, color: inc.status === 'Reported' ? 'var(--status-alert)' : 'var(--status-warning)' }}>{inc.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>
      </div>
    </>
  );

  const renderIntelligence = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <GlassPanel header="Risk Correlation Grid (AI-Flow)">
        <div style={{ height: 250, background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute' }}>
             {[...Array(6)].map((_, i) => (
                <circle key={i} cx={`${15 + i * 15}%`} cy={`${20 + (i % 3) * 30}%`} r="3" fill="var(--accent)" className="pulse" />
             ))}
             <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="var(--border-subtle)" strokeDasharray="4 2" />
             <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="var(--border-subtle)" strokeDasharray="4 2" />
          </svg>
          <div style={{ zIndex: 2, textAlign: 'center' }}>
             <div className="label-accent">AI MODEL: NEXUS_SENSE_V4</div>
             <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 8 }}>Anomaly Detection: <span style={{ color: 'var(--status-ok)' }}>NOMINAL</span></div>
          </div>
        </div>
      </GlassPanel>

      <div className="card">
        <div className="card-header"><span className="card-title">Predictive Crowd Intelligence</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
           {[
             { label: 'Congestion Threshold', value: '82%', trend: '+4% from baseline' },
             { label: 'Egress Velocity', value: '1.2m/s', trend: 'Optimal' },
             { label: 'Heatmap Density', value: 'Medium', trend: 'Stabilizing' },
           ].map((p, i) => (
             <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)', display: 'flex', justifyContent: 'space-between' }}>
               <div>
                 <div className="label-caps">{p.label}</div>
                 <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: 4 }}>{p.value}</div>
               </div>
               <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right' }}>{p.trend}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderAudit = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
      <GlassPanel header="Full Incident Archive">
        <table className="data-table">
          <thead>
            <tr><th>Time</th><th>Zone</th><th>Severity</th><th>Description</th></tr>
          </thead>
          <tbody>
            {[
              { time: '14:22', zone: 'Sector A', sev: 'low', desc: 'Dehydration assist' },
              { time: '14:15', zone: 'Gate 4', sev: 'medium', desc: 'Crowd surge at ingress' },
              { time: '13:58', zone: 'Section 102', sev: 'low', desc: 'Lost child resolved' },
            ].map((a, i) => (
              <tr key={i}>
                <td className="mono">{a.time}</td>
                <td style={{ fontWeight: 600 }}>{a.zone}</td>
                <td><span className={`badge ${incSevColors[a.sev]}`}>{a.sev}</span></td>
                <td style={{ fontSize: '0.82rem' }}>{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>

      <div className="card">
        <div className="card-header"><span className="card-title">Generate Safety Report</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
           <div>
             <div className="label-caps" style={{ marginBottom: 8 }}>Report Configuration</div>
             <select value={reportType} onChange={e => setReportType(e.target.value)}>
               <option>Full Operational Audit</option>
               <option>Incident Summary</option>
               <option>Crowd Dynamics Analysis</option>
             </select>
           </div>
           <div className="card" style={{ padding: 14, background: 'var(--bg-deep)', fontSize: '0.82rem', borderLeft: '3px solid var(--accent)' }}>
             This report will compile all telemetry, incident logs, and AI risk assessments for the active session.
           </div>
           <button className="btn btn-primary w-full" onClick={() => setIsReportOpen(true)}>
             Initialize Report Generation →
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <p className="label-caps">SAFETY & SECURITY MONITORING</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 12, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
                {['Overview', 'Intelligence', 'Audit'].map((t) => (
                  <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', fontSize: '0.65rem' }} onClick={() => { 
                    setActiveTab(t); 
                    showToast(`Switching to ${t.toLowerCase()} panel`, 'info'); 
                    addNotification('Security View Change', `Safety dashboard switched to ${t} view.`, 'info');
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <h1>Real-Time Safety Dashboard</h1>
          </div>
          <div className="page-actions">
            <span className="badge badge-success" style={{ padding: '6px 14px', marginRight: 12 }}>
              <span className="status-dot online pulse" style={{ width: 6, height: 6 }}></span> 
              CHAMPIONSHIP_ACTIVE
            </span>
            <button className="btn btn-secondary" onClick={() => { setIsReportOpen(true); showToast('Compiling Security Audit Report...', 'info'); }}>
              <Icon name="export" size={14} /> Audit & Reports
            </button>
            <button className="btn btn-primary" style={{ background: 'var(--status-alert)', color: 'white' }} onClick={() => {
              showToast('WARNING: Initializing Emergency Protocol Systems...', 'info');
              addNotification('Emergency Protocol Init', 'Manual system override: Emergency protocols are being initialized.', 'alert');
            }}>
               ⚠ EMERGENCY PROTOCOLS
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'Overview' && renderOverview()}
      {activeTab === 'Intelligence' && renderIntelligence()}
      {activeTab === 'Audit' && renderAudit()}

      <SafetyReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />

      <IncidentReportModal 
        isOpen={isIncidentModalOpen} 
        onClose={() => setIsIncidentModalOpen(false)} 
      />
    </>
  );
}

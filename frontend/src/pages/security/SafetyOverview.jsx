import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { securityData } from '../../data/mockData';
import { useState } from 'react';

export default function SafetyOverview() {
  const d = securityData;
  const [activeTab, setActiveTab] = useState('All');

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
  const zoneColors = { ok: 'badge-success', watch: 'badge-warning', alert: 'badge-critical' };
  const incSevColors = { critical: 'badge-critical', medium: 'badge-warning', low: 'badge-neutral' };

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <p className="label-caps">SAFETY & SECURITY MONITORING</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 12, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
                {['All', 'Watch', 'Alert'].map((t) => (
                  <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', fontSize: '0.65rem' }} onClick={() => { setActiveTab(t); showToast(`Filtering security nodes by ${t}`, 'info'); }}>{t}</span>
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
            <button className="btn btn-secondary" onClick={() => showToast('Compiling Security Audit Report...', 'success')}>
              <Icon name="export" size={14} /> Generate Report
            </button>
            <button className="btn btn-primary" style={{ background: 'var(--status-alert)', color: 'white' }} onClick={() => showToast('WARNING: Initializing Emergency Protocol Systems...', 'info')}>
               ⚠ EMERGENCY PROTOCOLS
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
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
        {/* Zone Status Grid */}
        <GlassPanel 
          header="Zone Status Grid" 
          headerActions={<span className="label-accent">Live Telemetry</span>}
        >
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

          {/* AI Risk Flow */}
          <GlassPanel header="Risk Correlation Grid (AI-Flow)" style={{ marginTop: 24, border: '1px solid var(--accent-border)' }}>
            <div style={{ height: 120, background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                 <circle cx="20%" cy="50%" r="4" fill="var(--accent)" className="pulse" />
                 <circle cx="50%" cy="50%" r="4" fill="var(--status-alert)" className="pulse" />
                 <circle cx="80%" cy="50%" r="4" fill="var(--status-ok)" className="pulse" />
                 <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="var(--border-subtle)" strokeDasharray="4 2" />
                 <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="var(--border-subtle)" strokeDasharray="4 2" />
              </svg>
              <div style={{ zIndex: 2, textAlign: 'center' }}>
                 <div className="label-accent">AI MODEL: NEXUS_SENSE_V4</div>
                 <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Proactive anomaly detection active across all nodes</div>
              </div>
            </div>
          </GlassPanel>

        {/* Incident Log */}
        <GlassPanel 
          header="Recent Incidents" 
          headerActions={<button className="btn btn-primary" style={{ fontSize: '0.72rem' }} onClick={() => showToast('Opening Incident Dispatch Form...', 'info')}>+ Report</button>}
        >
          <table className="data-table" style={{ fontSize: '0.78rem' }}>
            <thead>
              <tr><th>Time</th><th>Location</th><th>Severity</th><th>Status</th></tr>
            </thead>
            <tbody>
              {d.incidents.map((inc, i) => (
                <tr key={i}>
                  <td className="mono">{inc.time}</td>
                  <td>{inc.location}</td>
                  <td><span className={`badge ${incSevColors[inc.severity]}`}>{inc.severity}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ 
                        fontWeight: 600,
                        color: inc.status === 'Reported' ? 'var(--status-alert)' : inc.status === 'En Route' ? 'var(--status-warning)' : 'var(--status-ok)' 
                      }}>
                        {inc.status}
                      </span>
                      {inc.status === 'Reported' && <button className="btn btn-secondary" style={{ fontSize: '0.55rem', padding: '2px 6px' }} onClick={() => showToast('Dispatching emergency unit to location...', 'success')}>Dispatch</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>
      </div>
    </>
  );
}

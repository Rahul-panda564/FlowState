import { useState } from 'react';
import { globalAnalytics, sensorData, dataIngestion, revenueMetrics, venues, apiPerformance, platformHealth } from '../../data/mockData';
import { superAdminSidebar, superAdminBrand, superAdminUser } from '../../data/sidebarConfig';
import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { formatCurrency } from '../../utils/currency';

const trendClass = (dir) => dir === 'up' ? 'up' : dir === 'down' ? 'down' : 'stable';

export default function GlobalAnalytics() {
  const [activeTab, setActiveTab] = useState('Usage Analytics');
  const tabs = ['Usage Analytics', 'Performance Metrics', 'Business Intelligence', 'Technical Metrics'];
  const d = globalAnalytics;

  const handleDownload = () => {
    const toast = document.createElement('div');
    toast.className = 'badge badge-accent pulse';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.zIndex = '1000';
    toast.style.padding = '12px 20px';
    toast.innerText = `📊 INTEL_EXPORT: ${activeTab.toUpperCase()} Package Generated Successfully`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  const renderUsageAnalytics = () => (
    <>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { ...d.totalActiveUsers, label: 'Total Active Users', icon: '👥' },
          { ...d.avgSessionDuration, label: 'Avg. Session Duration', icon: '⏱️' },
          { ...d.featureAdoption, label: 'Feature Adoption Rate', icon: '📊' },
          { ...d.churnRate, label: 'Churn Rate', icon: '📉' },
        ].map((m, i) => (
          <div key={i} className="metric-card">
            <div className="metric-card-header">
              <div className="metric-card-icon"><span style={{ fontSize: '1rem' }}>{m.icon}</span></div>
              {m.change !== 0 && <span className={`metric-card-trend ${trendClass(m.direction)}`}>{m.change > 0 ? '+' : ''}{m.change}%</span>}
              {m.change === 0 && m.label.includes('Session') && <span className="badge badge-accent">Stable</span>}
            </div>
            <div className="metric-card-label">{m.label}</div>
            <div className="metric-card-value">{m.value}</div>
            {m.alert && <div style={{ fontSize: '0.72rem', color: 'var(--status-alert)', marginTop: 4 }}>{m.alert}</div>}
          </div>
        ))}
      </div>

      <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 24 }}>
        <GlassPanel header="Active Sessions Trend">
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {['Attendee', 'Operator', 'Web'].map(l => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: l === 'Attendee' ? 'var(--accent)' : l === 'Operator' ? '#3B82F6' : '#8B5CF6' }}></span>
                {l}
              </span>
            ))}
          </div>
          <div style={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 6, paddingTop: 20 }}>
            {d.activeSessions.labels.map((l, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: 180 }}>
                  <div style={{ flex: 1, height: `${(d.activeSessions.attendee[i]/90)*100}%`, background: 'var(--accent)', borderRadius: '3px 3px 0 0', opacity: 0.8 }}></div>
                  <div style={{ flex: 1, height: `${(d.activeSessions.operator[i]/90)*100}%`, background: '#3B82F6', borderRadius: '3px 3px 0 0', opacity: 0.6 }}></div>
                  <div style={{ flex: 1, height: `${(d.activeSessions.web[i]/90)*100}%`, background: '#8B5CF6', borderRadius: '3px 3px 0 0', opacity: 0.5 }}></div>
                </div>
                <span className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel header="Adoption Funnel">
          {Object.entries(d.adoptionFunnel).map(([key, val], i) => (
            <div key={key} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="label-caps" style={{ fontSize: '0.7rem' }}>{key}</span>
                <span className="mono" style={{ fontSize: '0.78rem' }}>{val.count}</span>
              </div>
              <div className="progress-bar" style={{ height: 24 }}>
                 <div className="progress-bar-fill" style={{ width: val.value, background: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--status-info)' : 'var(--status-warning)' }}></div>
              </div>
            </div>
          ))}
        </GlassPanel>
      </div>

      <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <GlassPanel header="Top Venues by Concurrent Activity">
          {d.topVenues.map((v, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.88rem' }}>{v.name}</span>
                <span className="mono" style={{ fontSize: '0.82rem', fontWeight: 600 }}>{v.concurrent.toLocaleString()}</span>
              </div>
              <div className="progress-bar" style={{ height: 4 }}>
                <div className="progress-bar-fill accent" style={{ width: `${(v.concurrent / 12500) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </GlassPanel>
        <GlassPanel header="API Endpoint Distribution">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ name: '/v1/auth', pct: '24%' }, { name: '/v1/stream', pct: '18%' }, { name: '/v1/telemetry', pct: '16%' }, { name: '/v1/user', pct: '12%' }].map((ep, i) => (
              <StatCard key={i} compact label={ep.name} value={ep.pct} />
            ))}
          </div>
        </GlassPanel>
      </div>
    </>
  );

  const renderPerformanceMetrics = () => (
    <div className="tab-content page-enter">
       <div className="grid-4" style={{ marginBottom: 24 }}>
          <StatCard label="LiDAR Ingestion" value={dataIngestion.lidarPts} subtext={dataIngestion.unit} accent />
          <StatCard label="IoT Velocity" value={dataIngestion.iotEvents} subtext={dataIngestion.iotUnit} />
          <StatCard label="Sensors Online" value={`${sensorData.online}/${sensorData.total}`} progress={(sensorData.online/sensorData.total)*100} />
          <StatCard label="Avg. Sync Latency" value="12ms" trend="-4%" />
       </div>

       <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassPanel header="Global Ingestion Pulse [PTS/SEC]">
             <div style={{ height: 240, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: `${30 + Math.random()*70}%`, background: 'var(--accent)', opacity: 0.1 + (i*0.02), borderRadius: 1 }} />
                ))}
             </div>
             <div className="label-caps" style={{ textAlign: 'center', marginTop: 12, fontSize: '0.62rem' }}>Real-time telemetry throughput across 42 ingress nodes</div>
          </GlassPanel>

          <GlassPanel header="Sensor Status Distribution">
             <div style={{ marginTop: 10 }}>
                {[{ label: 'Operational', count: sensorData.online, color: 'var(--status-success)' },
                  { label: 'Requires Attention', count: sensorData.attention, color: 'var(--status-warning)' },
                  { label: 'Offline / Manual', count: sensorData.offline, color: 'var(--status-alert)' }].map(s => (
                  <div key={s.label} style={{ marginBottom: 16 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span className="label-caps" style={{ fontSize: '0.7rem' }}>{s.label}</span>
                        <span className="mono" style={{ fontWeight: 600 }}>{s.count}</span>
                     </div>
                     <div className="progress-bar" style={{ height: 10 }}>
                        <div className="progress-bar-fill" style={{ width: `${(s.count/sensorData.total)*100}%`, background: s.color }}></div>
                     </div>
                  </div>
                ))}
             </div>
          </GlassPanel>
       </div>

       <GlassPanel header="Sensor Incident Log">
          <table className="data-table">
             <thead><tr><th>Timestamp</th><th>Sensor ID</th><th>Message</th><th>Status</th></tr></thead>
             <tbody>
                {sensorData.recentEvents.map((ev, i) => (
                  <tr key={i}>
                     <td className="mono">{ev.time}</td>
                     <td className="mono">{ev.message.split(' ')[1]}</td>
                     <td>{ev.message}</td>
                     <td><span className={`badge badge-${ev.status}`}>{ev.status.toUpperCase()}</span></td>
                  </tr>
                ))}
             </tbody>
          </table>
       </GlassPanel>
    </div>
  );

  const renderBusinessIntelligence = () => (
    <div className="tab-content page-enter">
       <div className="grid-3" style={{ marginBottom: 24 }}>
          <StatCard label="Managed Revenue (MRR)" value={formatCurrency(revenueMetrics.mrr)} trend={`+${revenueMetrics.mrrChange}%`} accent />
          <StatCard label="Active Churn Rate" value={`${revenueMetrics.churnRate}%`} subtext="Benchmark: 1.2%" />
          <StatCard label="New Venues (Monthly)" value={revenueMetrics.newVenues} trend="+8%" />
       </div>

       <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassPanel header="Revenue Velocity Trend (6M)">
             <div style={{ height: 260, position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d={`M 0 100 ${revenueMetrics.monthlyRevenue.map((v, i) => `L ${(i*20)} ${100 - (v*35)}`).join(' ')} L 100 100 Z`} fill="url(#bizGrad)" stroke="var(--accent)" strokeWidth="0.5" />
                   <defs><linearGradient id="bizGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
                </svg>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                   {revenueMetrics.months.map(m => <span key={m} className="mono" style={{ fontSize: '0.62rem', opacity: 0.5 }}>{m}</span>)}
                </div>
             </div>
          </GlassPanel>

          <GlassPanel header="Venue Tier Distribution">
             <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10 }}>
                {['Enterprise', 'Pro', 'Starter'].map(tier => {
                  const count = venues.filter(v => v.tier === tier.toLowerCase()).length;
                  return (
                    <div key={tier} style={{ padding: '16px', background: 'var(--bg-deep)', borderLeft: `4px solid ${tier === 'Enterprise' ? 'var(--accent)' : tier === 'Pro' ? 'var(--status-info)' : 'var(--border-subtle)'}`, borderRadius: '0 4px 4px 0' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="label-caps">{tier} Tier</span>
                          <span className="mono" style={{ fontWeight: 700 }}>{count}</span>
                       </div>
                    </div>
                  );
                })}
             </div>
             <p className="label-accent" style={{ marginTop: 20, textAlign: 'center' }}>Enterprise accounts represent 84% of total MRR</p>
          </GlassPanel>
       </div>
    </div>
  );

  const renderTechnicalMetrics = () => (
    <div className="tab-content page-enter">
       <div className="grid-3" style={{ marginBottom: 24 }}>
          <StatCard label="Avg Response Latency" value={`${apiPerformance.avgLatency}ms`} trend="-2ms" />
          <StatCard label="P99 Tail Latency" value={`${apiPerformance.p99Latency}ms`} accent />
          <StatCard label="Global Error Rate" value={`${apiPerformance.errorRate}%`} status={apiPerformance.healthy ? 'success' : 'warning'} />
       </div>

       <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassPanel header="Infrastructure Cluster Load">
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: '10px 0' }}>
                <StatCard compact label="CPU Utilization" value={`${platformHealth.cpu}%`} progress={platformHealth.cpu} />
                <StatCard compact label="Memory Footprint" value={`${platformHealth.memory}%`} progress={platformHealth.memory} />
             </div>
             <div style={{ marginTop: 20, height: 140, background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', padding: 20, border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                   <span className="label-caps">Network Saturation</span>
                   <span className="label-accent">STABLE</span>
                </div>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} style={{ display: 'inline-block', width: 8, height: 16 + Math.random()*24, background: 'var(--accent)', marginRight: 4, opacity: 0.1 + (i*0.03), borderRadius: 1 }} />
                ))}
             </div>
          </GlassPanel>

          <GlassPanel header="Cluster Sync Status">
             <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                   <div style={{ fontSize: '2.4rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{platformHealth.uptime}</div>
                   <div className="label-caps" style={{ color: 'var(--text-muted)' }}>System Uptime</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--accent-dim)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-border)' }}>
                   <div className="label-caps" style={{ fontSize: '0.65rem', marginBottom: 6 }}>ACTIVE_NODES</div>
                   <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{platformHealth.activeNodes.toLocaleString()}</div>
                </div>
             </div>
          </GlassPanel>
       </div>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>Global Analytics</h1>
            <p className="page-subtitle">Real-time usage intelligence and kinetic performance metrics.</p>
          </div>
          <div className="page-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="status-dot online"></span>
              <span className="label-caps">Last 30 days active</span>
            </div>
            <button className="btn btn-primary" onClick={handleDownload}>
              <Icon name="export" size={14} style={{ marginRight: 8 }} />
              Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div className="tab-container">
        {activeTab === 'Usage Analytics' && renderUsageAnalytics()}
        {activeTab === 'Performance Metrics' && renderPerformanceMetrics()}
        {activeTab === 'Business Intelligence' && renderBusinessIntelligence()}
        {activeTab === 'Technical Metrics' && renderTechnicalMetrics()}
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import AppShell from '../../layouts/AppShell';
import { eventApi } from '../../api';
import { postEventReport } from '../../data/mockData';
import { analyticsSidebar, analyticsBrand } from '../../data/sidebarConfig';
import { formatCurrency } from '../../utils/currency';

export default function PostEventReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Analytics');

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

  const fetchReport = async () => {
    try {
      const events = await eventApi.getAll();
      const completed = events.filter(e => e.status === 'completed' || e.status === 'live');
      
      if (completed.length > 0) {
        const event = completed[0];
        setReportData({
          ...postEventReport,
          eventName: event.name,
          overallGrade: event.successRate > 90 ? 'A+' : 'A',
          revenue: {
            ...postEventReport.revenue,
            concessionRevenue: (event.peakAttendance || 42000) * 12.5
          }
        });
      }
    } catch (err) {
      console.error('Failed to generate report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const d = reportData || postEventReport;
  if (loading) return <AppShell sidebarItems={analyticsSidebar} brand={analyticsBrand.brand} brandSub={analyticsBrand.brandSub}><div style={{ padding: 60, textAlign: 'center' }}>Generating Intelligence Report...</div></AppShell>;
  return (
    <AppShell sidebarItems={analyticsSidebar} brand={analyticsBrand.brand} brandSub={analyticsBrand.brandSub} user={null}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16, marginRight: 8 }}>
            {['Dashboard', 'Analytics', 'Stakeholders'].map((t) => (
              <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { setActiveTab(t); showToast(`Switching to ${t} view`, 'info'); }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '6px 10px' }} onClick={() => showToast('Compiling high-resolution PDF...', 'success')}>PDF</button>
            <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '6px 10px' }} onClick={() => showToast('Secure sharing link copied to clipboard', 'success')}>Share</button>
            <button className="btn btn-primary" style={{ fontSize: '0.65rem', padding: '6px 12px' }} onClick={() => showToast('Report scheduled for recursive delivery', 'success')}>Schedule</button>
          </div>
        </div>
      }
    >
      {/* Executive Summary */}
      <div className="card card-accent" style={{ marginBottom: 24, padding: '28px 32px' }}>
        <div className="grid-2" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          <div>
            <div className="label-accent" style={{ marginBottom: 8 }}>Executive Summary</div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 12 }}>Overall Grade: <span style={{ color: 'var(--accent)' }}>{d.overallGrade}</span></h1>
            <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(46,204,113,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✅</div>
                <div>
                  <div className="label-caps" style={{ marginBottom: 2 }}>Key Achievement</div>
                  <div style={{ fontSize: '0.88rem' }}>{d.keyAchievement}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,71,87,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚠️</div>
                <div>
                  <div className="label-caps" style={{ marginBottom: 2 }}>Improvement Area</div>
                  <div style={{ fontSize: '0.88rem' }}>{d.improvementArea}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 16, background: 'var(--bg-deep)' }}>
            <div className="label-caps" style={{ marginBottom: 8 }}>Venue Utilization</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
              {[40, 55, 70, 85, 95, 92, 88, 75, 60, 45, 30, 20].map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${v}%`, background: i === 4 ? 'var(--accent)' : 'var(--accent-dim)', borderRadius: '2px 2px 0 0', border: `1px solid ${i === 4 ? 'var(--accent)' : 'var(--accent-border)'}` }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span className="label-caps" style={{ fontSize: '0.58rem' }}>16:00</span>
              <span className="label-accent" style={{ fontSize: '0.58rem' }}>PEAK</span>
              <span className="label-caps" style={{ fontSize: '0.58rem' }}>22:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {d.grades.map((g, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: 20, borderTop: `3px solid ${i === 0 ? 'var(--accent)' : i === 1 ? 'var(--status-ok)' : i === 2 ? 'var(--accent)' : 'var(--status-info)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: '1.2rem' }}>{g.icon}</span>
              <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Grade: {g.grade}</span>
            </div>
            <div className="label-accent" style={{ marginBottom: 8 }}>{g.sublabel}</div>
            <div style={{ fontSize: '0.85rem', marginBottom: 4 }}>{g.label}</div>
            <div className="metric-medium mono" style={{ color: 'var(--accent)' }}>
              {g.label === 'Revenue Growth' ? `+${formatCurrency(parseInt(g.value.replace('K', '')) * 1000, { notation: 'compact' })}` : g.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{g.target}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Prediction Performance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Prediction Performance</span>
            <span className="badge badge-accent">MODEL VERSION {d.predictionPerformance.modelVersion}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: '15M HORIZON', value: d.predictionPerformance.horizon15 },
              { label: '30M HORIZON', value: d.predictionPerformance.horizon30 },
              { label: '60M HORIZON', value: d.predictionPerformance.horizon60 },
            ].map((h, i) => (
              <div key={i} className="card" style={{ padding: 16, background: 'var(--bg-deep)', textAlign: 'center' }}>
                <div className="label-caps">{h.label}</div>
                <div className="metric-medium mono" style={{ marginTop: 8, color: h.value > 85 ? 'var(--accent)' : 'var(--status-warning)' }}>{h.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Security */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Safety & Security</span>
            <span className="badge badge-success">● Active Monitoring</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Crowd Pressure Incidents', value: d.safety.pressureIncidents, icon: '⚡' },
              { label: 'Avg Response Time', value: d.safety.responseTime, sub: 'Dispatch to Arrival', icon: '🚨' },
              { label: 'Evacuation Testing', value: d.safety.evacTesting, sub: `Predicted: 18m ${d.safety.evacDelta} DELTA`, icon: '🚪' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem' }}>{s.label}</div>
                    {s.sub && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.sub}</div>}
                  </div>
                </div>
                <span className="mono" style={{ fontSize: '1.3rem', fontWeight: 700 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Revenue Impact */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Revenue Impact</span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1.1rem' }}>+{formatCurrency(d.revenue.concessionRevenue)}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div className="card" style={{ padding: 14, background: 'var(--bg-deep)' }}>
              <div className="label-caps">Seat Upgrades</div>
              <div className="metric-medium mono" style={{ marginTop: 4 }}>{d.revenue.seatUpgrades}</div>
            </div>
            <div className="card" style={{ padding: 14, background: 'var(--bg-deep)' }}>
              <div className="label-caps">In-Seat Orders</div>
              <div className="metric-medium mono" style={{ marginTop: 4 }}>{d.revenue.inSeatOrders.toLocaleString()}</div>
            </div>
          </div>
          <div className="card" style={{ padding: 12, background: 'var(--accent-dim)', borderColor: 'var(--accent-border)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)' }}>🎯</span>
              <div>
                <span className="label-accent">Stockout Avoidance Savings</span>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Predictive replenishment saved {formatCurrency(d.revenue.stockoutSavings)} this session.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Efficiency */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Operational Efficiency</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'ENTRY FLOW', value: d.efficiency.entryFlow, sub: 'Reduction in wait time', color: 'var(--accent)' },
              { label: 'STAFF UTILIZATION', value: d.efficiency.staffUtil, sub: 'Fewer labor hours required', color: 'var(--status-info)' },
              { label: 'CLEAR-OUT TIME', value: d.efficiency.clearOutTime, sub: 'Post-event evacuation', color: 'var(--text-primary)' },
              { label: 'FAN NPS SCORE', value: d.efficiency.fanNps, sub: 'Increase vs previous event', color: 'var(--accent)' },
            ].map((e, i) => (
              <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)' }}>
                <div className="label-caps">{e.label}</div>
                <div className="metric-medium mono" style={{ marginTop: 4, color: e.color }}>{e.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{e.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Optimization Recommendations */}
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ fontSize: '1.05rem' }}>
            <span style={{ color: 'var(--accent)' }}>✨</span>
            AI Optimization Recommendations
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {d.aiRecommendations.map((r, i) => (
            <div key={i} className="card" style={{ padding: 20, background: 'var(--bg-deep)', borderTop: '3px solid var(--accent)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 700, marginBottom: 14, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{r.num}</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{r.text}</p>
              <a href="#" className="label-accent" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); showToast(`Applying strategy: ${r.action}`, 'success'); }}>{r.action} →</a>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

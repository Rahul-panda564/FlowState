import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sandboxData } from '../../data/mockData';
import { operationsSidebar, operationsBrand } from '../../data/sidebarConfig';
import { formatCurrency } from '../../utils/currency';
import { useNotifications } from '../../context/NotificationContext';

const gradeColors = { 'A': 'var(--status-ok)', 'A+': 'var(--status-ok)', 'B+': 'var(--accent)', 'C-': 'var(--status-warning)' };

export default function WhatIfSandbox() {
  const location = useLocation();
  const d = sandboxData;
  const initialTab = location.state?.activeTab || 'Parameters';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  useEffect(() => {
    if (location.state?.activeTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const { showToast } = useNotifications();
  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div className="page-pretitle">
              <span className="status-dot online pulse"></span>
              SANDBOX SESSION ACTIVE
            </div>
            <h1>What-If Sandbox</h1>
            <p className="page-subtitle">Test hypothetical scenarios against baseline data without affecting live operations.</p>
          </div>
          <div className="page-actions">
            <span className="badge badge-accent">{d.sessionId}</span>
            <button className="btn btn-secondary" onClick={() => showToast('Scenario reset to baseline.', 'info')}>Reset Scenario</button>
            <button className="btn btn-primary" onClick={() => showToast('▶ Running simulation... Computing vectors.')}>▶ Run Simulation</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Simulation Viewport */}
        <div className="card hover-scale" style={{ minHeight: 300 }}>
          <div className="card-header">
            <span className="card-title"><span className="status-dot online pulse"></span> Simulation Viewport</span>
            <span className="badge badge-accent">ACTIVE_MODEL: NEXUS_SIM_V1</span>
          </div>
          <div style={{ height: 250, background: 'linear-gradient(135deg, #0D1117 0%, #1A2332 100%)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid var(--accent-border)' }}>
            <div style={{ width: '60%', height: '50%', borderRadius: '50%', border: '2px solid var(--accent-border)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '20%', borderRadius: '50%', border: '1px solid var(--border-color)' }}></div>
              {/* Simulated flow arrows */}
              <div style={{ position: 'absolute', top: '-10%', left: '45%', color: 'var(--accent)', fontSize: '1.2rem', animation: 'pulse-dot 2s infinite' }}>↓</div>
              <div style={{ position: 'absolute', bottom: '-10%', left: '45%', color: 'var(--status-ok)', fontSize: '1.2rem', animation: 'pulse-dot 2s infinite' }}>↑</div>
              <div style={{ position: 'absolute', left: '-10%', top: '45%', color: 'var(--status-warning)', fontSize: '1.2rem', animation: 'pulse-dot 2s infinite' }}>→</div>
            </div>
            <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
              <div className="label-caps" style={{ fontSize: '0.6rem' }}>Dataset</div>
              <div className="mono" style={{ fontSize: '0.78rem' }}>{d.baselineDataset}</div>
            </div>
          </div>
        </div>

        {/* Scenario Parameters */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Scenario Parameters</span>
            <button className="btn btn-ghost" style={{ fontSize: '0.72rem' }} onClick={() => showToast('Opening intervention registry...', 'info')}>+ Add Intervention</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Open Gate 6 (+15 min early)', type: 'GATE TIMING' },
              { label: 'Deploy 3 Extra Staff to Section 427', type: 'STAFFING' },
              { label: 'Redirect Flow: North Corridor → East Bypass', type: 'FLOW CONTROL' },
            ].map((p, i) => (
              <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{p.label}</div>
                  <div className="label-caps" style={{ marginTop: 4 }}>{p.type}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked onChange={(e) => showToast(`Intervention ${e.target.checked ? 'activated' : 'deactivated'}`, 'info')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <span className="card-title">Performance Comparison</span>
          <span className="badge badge-accent">BASELINE vs SCENARIO</span>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Metric</th><th>Baseline</th><th>Scenario</th><th>Impact</th><th>Grade</th></tr>
          </thead>
          <tbody>
            {d.performanceComparison.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{r.metric}</td>
                <td className="mono">{r.metric === 'Revenue Impact' ? formatCurrency(parseInt(r.baseline.replace('k', '')) * 1000, { notation: 'compact' }) : r.baseline}</td>
                <td className="mono" style={{ color: 'var(--accent)' }}>{r.metric === 'Revenue Impact' ? formatCurrency(parseInt(r.scenario.replace('k', '')) * 1000, { notation: 'compact' }) : r.scenario}</td>
                <td className="mono" style={{ color: r.impact.startsWith('+') && r.metric !== 'Revenue Impact' ? 'var(--status-alert)' : 'var(--status-ok)' }}>{r.impact}</td>
                <td><span className="mono" style={{ fontWeight: 700, color: gradeColors[r.grade] || 'var(--text-primary)' }}>{r.grade}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Insight */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card glass-card-accent">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>🧠</span>
            <div>
              <div className="label-accent" style={{ marginBottom: 8 }}>AI Insight</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d.aiInsight}</p>
            </div>
          </div>
        </div>
        <div className="card glass-card-accent">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
            <div>
              <div className="label-accent" style={{ marginBottom: 8 }}>Recommendation</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d.aiReco}</p>
              <button className="btn btn-primary" style={{ marginTop: 12, fontSize: '0.75rem' }} onClick={() => showToast('Success! Configurations applied to layout grid.', 'success')}>Apply to Live Config →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import AppShell from '../../layouts/AppShell';
import { settingsApi } from '../../api';
import { superAdminSidebar, superAdminBrand, superAdminUser } from '../../data/sidebarConfig';
import { revenueMetrics } from '../../data/mockData';
import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { formatCurrency } from '../../utils/currency';

export default function SystemConfiguration() {
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState({
    branding_accent: '#00D4AA',
    branding_mood: 'Atmospheric Dark',
    loc_language: 'English (US)',
    loc_timezone: 'UTC -05:00 Eastern Time',
    flag_predictive_flow: true,
    flag_spatial_audio: false,
    flag_biometric_matching: true,
    flag_neural_occupancy: true,
    comp_purge_days: 90,
    comp_media_expiry: 2,
    sec_mfa_enforced: true,
    sec_session_timeout: 45,
    sec_pw_complexity: 'High',
    int_slack_enabled: true,
    int_aws_sync: true,
    notif_email_critical: true,
    notif_sms_critical: true,
    notif_push_warning: false
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsApi.get();
      if (Object.keys(data).length > 0) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Failed to sync global config:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
    setHasChanges(true);
  };

  const showToast = (msg, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.zIndex = '10000';
    const text = document.createElement('div');
    text.innerText = msg;
    text.style.fontWeight = '500';
    text.style.fontSize = '0.9rem';
    toast.appendChild(text);
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await settingsApi.update(settings);
      setHasChanges(false);
      showToast('Global configuration synchronized successfully.', 'success');
    } catch {
      showToast('Failed to transmit configuration node.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = ['General', 'Security', 'Integrations', 'Billing', 'Notifications'];
  
  const featureFlags = [
    { name: 'Predictive Flow Logic', key: 'predictive_flow', flag: 'flag_predictive_flow' },
    { name: 'Spatial Audio Triggers', key: 'spatial_audio', flag: 'flag_spatial_audio' },
    { name: 'Biometric Density Matching', key: 'biometric', flag: 'flag_biometric_matching' },
    { name: 'Neural Occupancy Engine', key: 'neural_occ', flag: 'flag_neural_occupancy' }
  ];

  const renderGeneralSettings = () => (
    <div className="page-enter">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }}>
        <GlassPanel header="Platform Branding">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div className="label-caps" style={{ marginBottom: 8 }}>Identity Logo (SVG)</div>
              <div style={{ height: 140, background: 'var(--bg-deep)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700 }}>BRAND</div>
            </div>
            <div>
              <div className="label-caps" style={{ marginBottom: 8 }}>Accent Color</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <input type="color" value={settings.branding_accent} onChange={e => handleChange('branding_accent', e.target.value)} style={{ width: 44, height: 44, padding: 4, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'transparent' }} />
                <input value={settings.branding_accent} readOnly style={{ flex: 1, fontFamily: 'var(--font-mono)' }} />
              </div>
              <div className="label-caps" style={{ marginBottom: 8 }}>Interface Mood</div>
              <select value={settings.branding_mood} onChange={e => handleChange('branding_mood', e.target.value)}>
                <option>Atmospheric Dark</option>
                <option>Pure Black</option>
                <option>System Default</option>
              </select>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel header="Localization">
          <div style={{ marginBottom: 16 }}>
            <div className="label-caps" style={{ marginBottom: 8 }}>System Language</div>
            <select value={settings.loc_language} onChange={e => handleChange('loc_language', e.target.value)}>
              <option>English (US)</option><option>English (UK)</option><option>Hindi (IN)</option><option>Spanish (ES)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div className="label-caps" style={{ marginBottom: 8 }}>Terminal Timezone</div>
            <input value={settings.loc_timezone} onChange={e => handleChange('loc_timezone', e.target.value)} />
          </div>
          <div className="label-accent" style={{ fontSize: '0.72rem' }}>GEO_SYNC_LAST: {new Date().toLocaleTimeString()}</div>
        </GlassPanel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <GlassPanel header="Feature Governance">
           {featureFlags.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < featureFlags.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div><div style={{ fontWeight: 500 }}>{f.name}</div><div className="mono" style={{ fontSize: '0.68rem', opacity: 0.5 }}>{f.key}</div></div>
              <label className="toggle"><input type="checkbox" checked={settings[f.flag]} onChange={e => handleChange(f.flag, e.target.checked)} /><span className="toggle-slider"></span></label>
            </div>
          ))}
        </GlassPanel>
        <GlassPanel header="Compliance">
           <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600 }}>Data Retention Policy</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Automated purge cycles for user telemetry logs.</p>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><div className="label-caps" style={{ marginBottom: 8 }}>Log Purge (Days)</div><input type="number" value={settings.comp_purge_days} onChange={e => handleChange('comp_purge_days', parseInt(e.target.value))} /></div>
              <div><div className="label-caps" style={{ marginBottom: 8 }}>Media Expiry (Years)</div><input type="number" value={settings.comp_media_expiry} onChange={e => handleChange('comp_media_expiry', parseInt(e.target.value))} /></div>
           </div>
        </GlassPanel>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="page-enter">
       <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassPanel header="Authentication Policy">
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div><div style={{ fontWeight: 600 }}>Force MFA Enrollment</div><div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Require all admins to use 2FA.</div></div>
                <label className="toggle"><input type="checkbox" checked={settings.sec_mfa_enforced} onChange={e => handleChange('sec_mfa_enforced', e.target.checked)} /><span className="toggle-slider"></span></label>
             </div>
             <div style={{ padding: '16px 0' }}>
                <div className="label-caps" style={{ marginBottom: 8 }}>Session Timeout (Minutes)</div>
                <input type="range" min="15" max="240" step="15" value={settings.sec_session_timeout} onChange={e => handleChange('sec_session_timeout', e.target.value)} style={{ width: '100%' }} />
                <div style={{ textAlign: 'right', fontWeight: 700, marginTop: 4 }}>{settings.sec_session_timeout} MIN</div>
             </div>
             <div className="label-caps">Password Complexity Threshold</div>
             <select value={settings.sec_pw_complexity} onChange={e => handleChange('sec_pw_complexity', e.target.value)} style={{ marginTop: 8 }}>
                <option>Standard</option><option>High</option><option>Paranoid</option>
             </select>
          </GlassPanel>

          <GlassPanel header="Audit Log [LIVE]">
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { user: 'arivera@kinetic.cmd', action: 'Update_Branding', time: '2m ago' },
                  { user: 'schen@kinetic.cmd', action: 'Invite_Staff_Member', time: '14m ago' },
                  { user: 'SYSTEM', action: 'Auto_Purge_Logs', time: '1h ago' },
                  { user: 'mthorne@kinetic.cmd', action: 'Node_Auth_Rotate', time: '4h ago' }
                ].map((log, i) => (
                  <div key={i} style={{ padding: '10px', background: 'var(--bg-deep)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span className="mono" style={{ color: 'var(--accent)' }}>{log.user}</span>
                        <span style={{ opacity: 0.4 }}>{log.time}</span>
                     </div>
                     <div style={{ fontWeight: 600 }}>Action: {log.action}</div>
                  </div>
                ))}
             </div>
          </GlassPanel>
       </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="page-enter">
       <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
          <GlassPanel header="External Webhooks">
             <div className="alert-stack">
                <div className="alert-row" style={{ padding: '16px' }}>
                   <div style={{ flex: 1 }}>
                      <div className="label-accent" style={{ fontSize: '0.72rem' }}>SLACK_CONNECTOR</div>
                      <div style={{ fontWeight: 600, marginTop: 4 }}>Operations Alert Stream</div>
                      <p style={{ fontSize: '0.78rem', opacity: 0.5 }}>https://hooks.slack.com/services/FS...</p>
                   </div>
                   <div className="status-dot online"></div>
                   <button className="btn btn-secondary" style={{ fontSize: '0.65rem' }} onClick={() => showToast('Dispatching test packet to Slack...', 'info')}>Test Ping</button>
                </div>
                <button className="btn btn-primary" style={{ marginTop: 16, width: '100%' }}>Add Notification Webhook</button>
             </div>
          </GlassPanel>

          <GlassPanel header="Cloud Sync Clusters">
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                <div><div style={{ fontWeight: 600 }}>AWS S3 Primary Storage</div><div className="mono" style={{ fontSize: '0.62rem', opacity: 0.5 }}>Region: us-east-1</div></div>
                <label className="toggle"><input type="checkbox" checked={settings.int_aws_sync} onChange={e => handleChange('int_aws_sync', e.target.checked)} /><span className="toggle-slider"></span></label>
             </div>
             <div style={{ padding: '16px', background: 'var(--accent-dim)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--accent-border)', marginTop: 20 }}>
                <div className="label-caps">API Access Key Management</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                   <input type="password" value="FLW-88219-CMS-SCRT" readOnly style={{ flex: 1, height: 32 }} />
                   <button className="btn btn-secondary" style={{ height: 32, fontSize: '0.65rem' }} onClick={() => showToast('Regenerating global keys...', 'warning')}>Rotate</button>
                </div>
             </div>
          </GlassPanel>
       </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="page-enter">
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <StatCard label="Current Platform Plan" value="ENTERPRISE" trend="+12 Managed Venues" accent>
             <div className="label-caps" style={{ marginTop: 16, fontSize: '0.65rem' }}>Next renewal: Dec 1, 2025</div>
             <button className="btn btn-primary" style={{ marginTop: 16, width: '100%' }}>Upgrade Subscription</button>
          </StatCard>
          
          <GlassPanel header="Usage Consumption">
             <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                   <span className="label-caps">LiDAR Pts Processed</span>
                   <span className="label-accent">84.2%</span>
                </div>
                <div className="progress-bar" style={{ height: 12 }}><div className="progress-bar-fill" style={{ width: '84.2%', background: 'var(--accent)' }}></div></div>
                <div style={{ marginTop: 6, fontSize: '0.72rem', opacity: 0.4 }}>4.2B / 5.0B monthly quota utilized</div>
             </div>
          </GlassPanel>
       </div>

       <GlassPanel header="Billing History">
          <table className="data-table">
             <thead><tr><th>Invoice ID</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
             <tbody>
                {[
                  { id: 'INV-990-88', date: '2025-11-01', amt: formatCurrency(revenueMetrics.mrr/10), status: 'Paid' },
                  { id: 'INV-990-87', date: '2025-10-01', amt: formatCurrency(revenueMetrics.mrr/10), status: 'Paid' },
                  { id: 'INV-990-86', date: '2025-09-01', amt: formatCurrency(revenueMetrics.mrr/10), status: 'Paid' }
                ].map((inv, i) => (
                  <tr key={i}>
                     <td className="mono">{inv.id}</td><td>{inv.date}</td><td className="mono" style={{ fontWeight: 700 }}>{inv.amt}</td><td><span className="badge badge-success">{inv.status}</span></td>
                  </tr>
                ))}
             </tbody>
          </table>
       </GlassPanel>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="page-enter">
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <GlassPanel header="Global Severity Routing">
             <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>Toggle active notification mediums for administrative alerts.</p>
             {[
               { icon: '✉️', label: 'Critical System Outages', flag: 'notif_email_critical', desc: 'Email alerts to global admins' },
               { icon: '📱', label: 'Emergency Evacuation Triggers', flag: 'notif_sms_critical', desc: 'Direct SMS to Ops Commanders' },
               { icon: '🔔', label: 'Operational Warning Alerts', flag: 'notif_push_warning', desc: 'Push notifications via Hub' }
             ].map((n, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ fontSize: '1.4rem' }}>{n.icon}</div>
                  <div style={{ flex: 1 }}>
                     <div style={{ fontWeight: 600 }}>{n.label}</div>
                     <div style={{ fontSize: '0.72rem', opacity: 0.5 }}>{n.desc}</div>
                  </div>
                  <label className="toggle"><input type="checkbox" checked={settings[n.flag]} onChange={e => handleChange(n.flag, e.target.checked)} /><span className="toggle-slider"></span></label>
               </div>
             ))}
          </GlassPanel>

          <GlassPanel header="Operational Routing">
             <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-deep)', border: '1px solid var(--border-color)' }}>
                <div className="label-caps" style={{ marginBottom: 12 }}>Primary Webhook Endpoint</div>
                <input value="https://api.kinetic.cmd/v1/ingest/alerts" readOnly />
                <p style={{ marginTop: 12, fontSize: '0.72rem', color: 'var(--text-muted)' }}>This endpoint receives raw operational telemetry events for tertiary processing.</p>
             </div>
          </GlassPanel>
       </div>
    </div>
  );

  return (
    <AppShell sidebarItems={superAdminSidebar} brand={superAdminBrand.brand} brandSub={superAdminBrand.brandSub} user={superAdminUser}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 4 }}>
        <span className="label-accent">Terminal Console</span>
        <span className="label-caps">• V4.9.2-STABLE</span>
        {tabs.map((t) => (
          <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer' }} onClick={() => setActiveTab(t)}>{t}</span>
        ))}
      </div>

      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
           <h1>{activeTab} Settings</h1>
           <p className="page-subtitle">Configure the core mission parameters for global platform governance.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
           <button className={`btn btn-primary ${loading ? 'loading' : ''}`} onClick={handleSave} disabled={!hasChanges || loading}>
             {loading ? 'Synchronizing...' : 'Commit Updates'}
           </button>
        </div>
      </div>

      <div className="tab-container" style={{ marginBottom: 40 }}>
        {activeTab === 'General' && renderGeneralSettings()}
        {activeTab === 'Security' && renderSecuritySettings()}
        {activeTab === 'Integrations' && renderIntegrationSettings()}
        {activeTab === 'Billing' && renderBillingSettings()}
        {activeTab === 'Notifications' && renderNotificationSettings()}
      </div>

      {hasChanges && (
        <div className="badge badge-accent pulse" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', zIndex: 1000 }}>
          UNSAVED_CHANGES_DETECTED // COMMIT REQUIRED TO SYNC NODES
        </div>
      )}
    </AppShell>
  );
}

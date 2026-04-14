import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../layouts/AppShell';
import { superAdminSidebar, superAdminBrand, superAdminUser } from '../../data/sidebarConfig';
import { venueApi } from '../../api';

export default function VenueManagement() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [status, setStatus] = useState('Any Status');

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    try {
      const data = await venueApi.getAll({ search, region });
      setVenues(data);
    } catch (err) {
      console.error('Failed to fetch venues:', err);
    } finally {
      setLoading(false);
    }
  }, [search, region]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchVenues();
    }, 300); // 300ms debounce for search
    return () => clearTimeout(timeoutId);
  }, [fetchVenues]);

  const statusColors = { active: 'badge-success', offline: 'badge-critical', paused: 'badge-warning' };
  const tierColors = { enterprise: 'badge-accent', pro: 'badge-info', starter: 'badge-neutral' };

  return (
    <AppShell sidebarItems={superAdminSidebar} brand={superAdminBrand.brand} brandSub={superAdminBrand.brandSub} user={superAdminUser}>
      <div className="page-header page-enter">
        <div className="page-pretitle"><span className="status-dot online"></span> DIRECTORY NODE: MASTER</div>
        <div className="page-header-top">
          <div>
            <h1>Venue Management</h1>
            <p className="page-subtitle">Centralized command for global venue infrastructure, capacity monitoring, and system-wide status overrides.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/super-admin/venues/new')}>
            + Add New Venue
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-premium stagger-item" style={{ marginBottom: 20, padding: 24, borderRadius: 'var(--radius-md)', animationDelay: '0.1s' }}>
        <div style={{ position: 'absolute', top: 0, right: 20, fontSize: '0.6rem', color: 'var(--accent)', opacity: 0.4, fontFamily: 'var(--font-mono)' }}>FILTER_MODULE_ACTIVE</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: 16, alignItems: 'end' }}>
          <div>
            <div className="label-caps" style={{ marginBottom: 8 }}>Global Search</div>
            <input placeholder="Filter by name or city..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 8 }}>Region</div>
            <select value={region} onChange={e => setRegion(e.target.value)}>
              <option>All Regions</option>
              <option>NA-EAST</option>
              <option>EU-WEST</option>
              <option>APAC-01</option>
            </select>
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 8 }}>Operational Status</div>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option>Any Status</option>
              <option>Active</option>
              <option>Offline</option>
              <option>Paused</option>
            </select>
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 8 }}>Capacity Range <span style={{ float: 'right' }}>0 - 85K</span></div>
            <input type="range" min="0" max="85000" style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </div>
        </div>
      </div>

      {/* Venue Table */}
      <div className="card-premium stagger-item" style={{ padding: 0, borderRadius: 'var(--radius-md)', animationDelay: '0.2s' }}>
        <div style={{ position: 'absolute', top: 12, right: 24, fontSize: '0.55rem', color: 'var(--accent)', opacity: 0.3, fontFamily: 'var(--font-mono)' }}>NODE_CLUSTER_SYNC: 0.42ms</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Venue Identity</th>
              <th>Location</th>
              <th>Max Capacity</th>
              <th>Status</th>
              <th>Sensor Network</th>
              <th>Deployment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ padding: 40, textAlign: 'center' }}>Synchronizing with Global Node...</td></tr>
            ) : venues.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: 40, textAlign: 'center' }}>No venues found in primary cluster.</td></tr>
            ) : venues.map(v => (
              <tr key={v._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--border-color)' }}>{v.image}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{v.name}</div>
                      <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ID: {v._id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{v.location}</div>
                  <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>REGION: {v.region}</div>
                </td>
                <td>
                  <div className="mono" style={{ fontWeight: 600, color: 'var(--accent)' }}>{v.capacity.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Load: {v.liveLoad}%</div>
                </td>
                <td>
                  <span className={`badge ${statusColors[v.status]}`}>● {v.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="mono" style={{ fontSize: '0.85rem' }}>
                      {v.sensorsOnline.toLocaleString()} / {v.sensorsTotal.toLocaleString()}
                    </div>
                    {v.sensorHealth ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-ok)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-warning)" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    )}
                  </div>
                  <div className="progress-bar" style={{ marginTop: 6, width: 80 }}>
                    <div className={`progress-bar-fill ${v.sensorHealth ? 'accent' : 'yellow'}`} style={{ width: `${(v.sensorsOnline / v.sensorsTotal) * 100}%` }}></div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${tierColors[v.tier]}`}>{v.tier}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon" style={{ width: 28, height: 28 }} title="View" onClick={() => navigate('/super-admin')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    <button className="btn-icon" style={{ width: 28, height: 28 }} title="Edit" onClick={() => navigate('/super-admin/settings')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button className="btn-icon" style={{ width: 28, height: 28 }} title="Sync" onClick={fetchVenues}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination" style={{ padding: '12px 16px' }}>
          <div className="pagination-info">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="label-caps">Items per page:</span>
              <select style={{ width: 65, padding: '4px 8px' }}><option>25</option></select>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Showing {venues.length} nodes in primary cluster</span>
            </span>
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" onClick={() => alert('Seeking to previous page...')}>‹</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn" onClick={() => alert('Seeking to next page...')}>2</button>
            <button className="pagination-btn" onClick={() => alert('Seeking to next page...')}>3</button>
            <button className="pagination-btn">…</button>
            <button className="pagination-btn" onClick={() => alert('Seeking to end...')}>6</button>
            <button className="pagination-btn" onClick={() => alert('Seeking to next page...')}>›</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

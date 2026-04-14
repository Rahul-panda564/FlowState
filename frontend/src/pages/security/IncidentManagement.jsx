import { useState } from 'react';
import { securityData, incidentTeams } from '../../data/mockData';

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState(() => securityData.incidents.map(inc => ({
    ...inc,
    id: Math.random().toString(36).substr(2, 9)
  })));
  const [teams] = useState(incidentTeams);
  const [filter, setFilter] = useState('active');

  const updateStatus = (id, newStatus) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status: newStatus } : inc
    ));
  };

  const handleAssign = (incId, teamId) => {
    const team = teams.find(t => t.id === teamId);
    setIncidents(prev => prev.map(inc => 
      inc.id === incId ? { ...inc, assigned: team?.name || 'Assigned', status: 'En Route' } : inc
    ));
  };

  const filteredIncidents = incidents.filter(inc => {
    if (filter === 'active') return inc.status !== 'Resolved';
    if (filter === 'resolved') return inc.status === 'Resolved';
    return true;
  });

  return (
    <>
      <header className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="mono">INCIDENT COMMAND / {filter.toUpperCase()}</h1>
            <p className="text-secondary">Active Security & Medical Response Dispatch • Node: SEC_INCIDENT_CMDR</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('active')}>ACTIVE</button>
            <button className={`btn ${filter === 'resolved' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('resolved')}>RESOLVED</button>
            <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>ALL LOGS</button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Incident List */}
        <div className="col-span-8">
          <div className="card h-full">
            <div className="card-header">
              <h3 className="mono">LIVE INCIDENT BOARD</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>TIME</th>
                    <th>TYPE / SEVERITY</th>
                    <th>LOCATION</th>
                    <th>STATUS</th>
                    <th>ASSIGNED TEAM</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map(inc => (
                    <tr key={inc.id} style={{ opacity: inc.status === 'Resolved' ? 0.6 : 1 }}>
                      <td className="mono">{inc.time}</td>
                      <td>
                        <span className={`badge badge-${inc.severity}`}>
                          {inc.severity.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{inc.location}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className={`status-dot ${inc.status === 'Resolved' ? 'online' : 'critical pulse'}`}></span>
                          <span className="mono" style={{ fontSize: '0.75rem' }}>{inc.status.toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="mono" style={{ color: 'var(--accent)' }}>
                        {inc.assigned === 'UNAS...' ? (
                          <span style={{ color: 'var(--status-alert)' }}>PENDING DISPATCH</span>
                        ) : inc.assigned}
                      </td>
                      <td>
                        {inc.status !== 'Resolved' ? (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <select 
                              className="btn btn-secondary" 
                              style={{ fontSize: '0.65rem', padding: '4px 8px' }}
                              onChange={(e) => handleAssign(inc.id, e.target.value)}
                              defaultValue=""
                            >
                              <option value="" disabled>Assign Unit...</option>
                              {teams.map(t => (
                                <option key={t.id} value={t.id}>{t.name} ({t.type})</option>
                              ))}
                            </select>
                            <button className="btn btn-primary" style={{ fontSize: '0.65rem', padding: '4px 8px' }} onClick={() => updateStatus(inc.id, 'Resolved')}>RESOLVE</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>LOGGED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Team Readiness */}
        <div className="col-span-4 space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="mono">RESPONDER STATUS</h3>
            </div>
            <div className="card-body space-y-4">
              {teams.map(team => (
                <div key={team.id} className="card-accent" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="label-accent">{team.id}</div>
                    <div style={{ fontWeight: 600 }}>{team.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{team.type} • {team.location}</div>
                  </div>
                  <div className="mono" style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: team.status === 'Available' ? 'var(--status-ok)' : 'var(--status-warning)' }}>
                      {team.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-alert" style={{ background: 'linear-gradient(135deg, rgba(255,59,48,0.1) 0%, rgba(255,59,48,0.02) 100%)' }}>
            <div className="card-body">
              <h4 className="mono" style={{ color: 'var(--status-alert)', marginBottom: 12 }}>SYSTEM ANNOUNCEMENT</h4>
              <p style={{ fontSize: '0.85rem', marginBottom: 16 }}>Broadcast an emergency alert to all responder devices in the stadium.</p>
              <textarea 
                className="btn btn-secondary w-full" 
                placeholder="Type priority message..." 
                style={{ height: 80, padding: 10, background: 'var(--bg-deep)', textAlign: 'left', marginBottom: 12 }}
              />
              <button 
                className="btn btn-primary w-full" 
                style={{ background: 'var(--status-alert)', color: 'white' }}
                onClick={() => alert('BROADCAST SENT')}
              >
                SEND WIDE-CHANNEL ALERT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

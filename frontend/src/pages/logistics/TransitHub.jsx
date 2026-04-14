import { useState } from 'react';
import AppShell from '../../layouts/AppShell';
import { transitData } from '../../data/mockData';

export default function TransitHub() {
  const [data] = useState(transitData);

  return (
    <AppShell brandSub="LOGISTICS_HUB" sidebarItems={[]}>
      <header className="panel-header">
        <div>
          <h1 className="mono">TRANSIT & LOGISTICS</h1>
          <p className="text-secondary">Global Mobility Intelligence • Stadium Perimeters</p>
        </div>
        <div className="header-status">
          <span className="status-dot online pulse"></span>
          <span className="mono">LINKED TO METRO_OS</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Parking Grid */}
        <div className="col-span-12">
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 className="mono">PARKING INFRASTRUCTURE</h3>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>TOTAL CAPACITY: 15,200 UNITS</div>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-4 gap-6">
                {data.parking.map(lot => (
                  <div key={lot.id} className="card-accent" style={{ padding: 20 }}>
                    <div className="label-accent" style={{ marginBottom: 12 }}>{lot.id} • {lot.name}</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 8 }}>
                      <span className="mono" style={{ fontSize: '1.8rem', fontWeight: 700 }}>{lot.fill}%</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>OCCUPIED</span>
                    </div>
                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: 4, background: 'var(--bg-deep)', borderRadius: 2, marginBottom: 16 }}>
                      <div style={{ 
                        width: `${lot.fill}%`, height: '100%', 
                        background: lot.fill > 80 ? 'var(--status-alert)' : lot.fill > 40 ? 'var(--status-warning)' : 'var(--accent)',
                        borderRadius: 2,
                        boxShadow: `0 0 10px ${lot.fill > 80 ? 'var(--status-alert)' : 'var(--accent)'}`
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                      <span className="mono" style={{ color: 'var(--text-secondary)' }}>CAPACITY: {lot.capacity}</span>
                      <span className="mono" style={{ color: lot.status === 'open' ? 'var(--status-ok)' : 'var(--status-warning)' }}>{lot.status.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Train & Bus Feeds */}
        <div className="col-span-8">
          <div className="card">
            <div className="card-header">
              <h3 className="mono">PUBLIC TRANSIT CHANNELS</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>MODE</th>
                    <th>LINE / ROUTE</th>
                    <th>DIRECTION</th>
                    <th>NEXT ARRIVAL</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.trains.map(train => (
                    <tr key={train.id}>
                      <td style={{ fontSize: '1.2rem' }}>🚆</td>
                      <td style={{ fontWeight: 600 }}>{train.line}</td>
                      <td className="mono">{train.direction}</td>
                      <td className="mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{train.time}</td>
                      <td>
                        <span className={`badge ${train.status === 'on-time' ? 'badge-low' : 'badge-medium'}`}>
                          {train.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {data.buses.map(bus => (
                    <tr key={bus.id}>
                      <td style={{ fontSize: '1.2rem' }}>🚌</td>
                      <td style={{ fontWeight: 600 }}>{bus.shuttle}</td>
                      <td className="mono">{bus.route}</td>
                      <td className="mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{bus.time}</td>
                      <td>
                        <span className="badge badge-low" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                           ACTIVE ({bus.count} UNITS)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Rideshare & Mobility */}
        <div className="col-span-4">
          <div className="card h-full">
            <div className="card-header">
              <h3 className="mono">MOBILITY ON-DEMAND</h3>
            </div>
            <div className="card-body">
              <div className="card-accent" style={{ padding: 16, marginBottom: 20, textAlign: 'center', border: '1px solid var(--accent)' }}>
                <div className="label-accent">CURR. SURGE MULTIPLIER</div>
                <div className="mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)' }}>{data.rideshare.surge}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Global Transit Sync Active</div>
              </div>
              
              <div className="space-y-4">
                {data.rideshare.zones.map(zone => (
                  <div key={zone.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{zone.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Avg. Wait: {data.rideshare.avgWait}</div>
                    </div>
                    <span className={`badge ${zone.load === 'HIGH' ? 'badge-medium' : 'badge-low'}`}>{zone.load} LOAD</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <button className="btn btn-secondary w-full" style={{ marginBottom: 10 }}>REQUEST RIDE SURGE MITIGATION</button>
                <button className="btn btn-primary w-full">DISPATCH AUX BUS FLEET</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

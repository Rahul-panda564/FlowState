import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendeeShell from '../../layouts/AttendeeShell';
import { friendsList } from '../../data/mockData';

export default function AttendeeFriends() {
  const navigate = useNavigate();
  const [ghostMode, setGhostMode] = useState(false);
  const [activeTab, setActiveTab] = useState('friends'); // 'friends' or 'nearby'
  const [friends, setFriends] = useState(friendsList);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [pingMessage, setPingMessage] = useState('');

  const [mySyncCode] = useState(() => 'SYNC-' + Math.floor(100000 + Math.random() * 900000));
  const [nearbyFans] = useState([
    { id: 'n1', name: 'Sameer', dist: '14m', color: '#10B981', avatar: 'SA' },
    { id: 'n2', name: 'Rohan', dist: '32m', color: '#3B82F6', avatar: 'RO' },
    { id: 'n3', name: 'Kavya', dist: '85m', color: '#F59E0B', avatar: 'KA' },
  ]);

  const handleAddFriend = () => {
    if (inviteCode.length === 6) {
      const newFriend = { 
        id: 'f' + (friends.length + 1), 
        name: 'Guest_' + inviteCode.substring(0,3), 
        status: 'Joining Now', 
        zone: 'Entrance 6', 
        avatar: 'GU', 
        color: '#F59E0B', 
        battery: 100 
      };
      setFriends([newFriend, ...friends]);
      setInviteCode('');
      setShowInviteModal(false);
      triggerPing('Connection Synchronized!');
    }
  };

  const triggerPing = (msg) => {
    setPingMessage(msg);
    setTimeout(() => setPingMessage(''), 3000);
  };

  return (
    <AttendeeShell title="Social Hub">
      <div className="attendee-friends page-enter">
        {/* Interaction Toast */}
        {pingMessage && (
          <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'var(--text-inverse)', padding: '12px 24px', borderRadius: 'var(--radius-full)', zIndex: 100000, fontWeight: 700, fontSize: '0.85rem', boxShadow: '0 8px 32px rgba(0,212,170,0.5)', border: '1px solid rgba(255,255,255,0.2)', animation: 'slideUp 0.3s ease-out' }}>
            {pingMessage}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="label-accent">Beacon Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono" style={{ fontSize: '0.6rem', color: ghostMode ? 'var(--text-muted)' : 'var(--accent)', fontWeight: 800 }}>
              {ghostMode ? 'GHOST_MODE' : 'LIVE_BEACON'}
            </span>
            <label className="toggle">
              <input type="checkbox" checked={ghostMode} onChange={(e) => setGhostMode(e.target.checked)} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* My Sync Identity */}
        <div className="card" style={{ padding: 20, marginBottom: 20, background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div className="label-accent" style={{ marginBottom: 4 }}>YOUR IDENTITY BEACON</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="mono" style={{ fontSize: '1.4rem', letterSpacing: 2, fontWeight: 900, color: 'var(--text-primary)' }}>{mySyncCode}</h2>
            <button 
              onClick={() => triggerPing('Code copied to clipboard!')}
              style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: 'none', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', fontWeight: 700 }}
            >
              COPY
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-deep)', padding: 4, borderRadius: 'var(--radius-md)', marginBottom: 20 }}>
          <button 
            onClick={() => setActiveTab('friends')}
            style={{ 
              flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', border: 'none', fontSize: '0.82rem', fontWeight: 700,
              background: activeTab === 'friends' ? 'var(--bg-elevated)' : 'transparent',
              color: activeTab === 'friends' ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            My Group ({friends.length})
          </button>
          <button 
            onClick={() => setActiveTab('nearby')}
            style={{ 
              flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', border: 'none', fontSize: '0.82rem', fontWeight: 700,
              background: activeTab === 'nearby' ? 'var(--bg-elevated)' : 'transparent',
              color: activeTab === 'nearby' ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            Nearby Fans
          </button>
        </div>

        {activeTab === 'friends' ? (
          <div className="friends-list">
            {friends.map(friend => (
              <div key={friend.id} className="card" style={{ padding: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14, opacity: friend.ghost ? 0.6 : 1, borderLeft: `4px solid ${friend.color}` }}>
                <div style={{ 
                  width: 48, height: 48, borderRadius: '12px', 
                  background: friend.ghost ? 'var(--bg-deep)' : `linear-gradient(135deg, ${friend.color}33 0%, ${friend.color}11 100%)`,
                  border: `1px solid ${friend.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, color: friend.color,
                  position: 'relative'
                }}>
                  {friend.avatar}
                  {!friend.ghost && <span className="status-dot online" style={{ position: 'absolute', top: -4, right: -4, border: '2px solid var(--bg-surface)', boxShadow: `0 0 10px ${friend.color}` }}></span>}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{friend.name}</span>
                    <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{friend.zone}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    {friend.ghost ? 'Signal Lost' : friend.status} • <span style={{ color: friend.battery < 20 ? 'var(--status-alert)' : 'inherit' }}>🔋{friend.battery}%</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => triggerPing(`Ping sent to ${friend.name}!`)} className="btn-icon" style={{ width: 32, height: 32 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
                  <button onClick={() => navigate('/attendee/navigate')} className="btn-icon" style={{ width: 32, height: 32 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></button>
                </div>
              </div>
            ))}

            <button 
              className="btn btn-secondary w-full" 
              onClick={() => setShowInviteModal(true)}
              style={{ marginTop: 12, borderStyle: 'dashed', background: 'var(--bg-deep)', padding: '16px', color: 'var(--accent)' }}
            >
              + SYNC WITH NEW FRIEND
            </button>
          </div>
        ) : (
          <div className="nearby-list">
            <div className="label-accent" style={{ marginBottom: 16 }}>DISCOVERY BEACON ACTIVE</div>
            {nearbyFans.map(fan => (
              <div key={fan.id} className="card" style={{ padding: '12px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: fan.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#000' }}>
                  {fan.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{fan.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{fan.dist} away</div>
                </div>
                <button 
                  onClick={() => triggerPing(`Friend request sent to ${fan.name}!`)}
                  className="btn btn-primary" 
                  style={{ padding: '4px 12px', fontSize: '0.65rem', height: 'auto' }}
                >
                  ADD
                </button>
              </div>
            ))}
            
            <div style={{ textAlign: 'center', marginTop: 30, padding: 20 }}>
              <div style={{ width: 60, height: 60, border: '2px solid var(--accent)', borderRadius: '50%', margin: '0 auto 16px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--accent)', borderRadius: '50%', animation: 'glowPulse 2s infinite' }}></div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>SCANNING FOR NEARBY SIGNALS...</p>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal Overlay */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '100%', maxWidth: 320 }}>
            <h3 style={{ marginBottom: 16 }}>Add Connection</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Enter the 6-digit sync code provided by your friend.</p>
            <input 
              type="text" 
              placeholder="000000"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.substring(0,6))}
              className="mono"
              style={{ width: '100%', background: 'var(--bg-deep)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '4px', marginBottom: 20 }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowInviteModal(false)}>Cancel</button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={handleAddFriend}
                disabled={inviteCode.length !== 6}
              >
                Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </AttendeeShell>
  );
}

// Centralized sidebar navigation configuration
// Each panel has a consistent set of sidebar items with correct paths

// ─── SVG Icon Components ─────────────────────────────────────
const icons = {
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
  pulse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68c.17-.38.55-.63.94-.68H12a2 2 0 0 1 0 4h-.09"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  exit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  report: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  replay: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>,
  dollar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  help: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
};

// ─── Super Admin Sidebar ─────────────────────────────────────
export const superAdminSidebar = [
  { label: 'System Overview', path: '/super-admin', icon: icons.grid, end: true },
  { label: 'Venue Management', path: '/super-admin/venues', icon: icons.pin },
  { label: 'Global Analytics', path: '/super-admin/analytics', icon: icons.chart },
  { label: 'Platform Settings', path: '/super-admin/settings', icon: icons.gear },
];

export const superAdminBrand = { brand: 'FlowState', brandSub: 'SUPER ADMIN' };
export const superAdminUser = { name: 'Alex Rivera', role: 'Master Control', initials: 'AR' };

// ─── Venue Admin Sidebar ─────────────────────────────────────
export const venueAdminSidebar = [
  { label: 'Command Center', path: '/venue-admin', icon: icons.grid, end: true },
  { label: 'Event Management', path: '/venue-admin/events', icon: icons.calendar },
  { label: 'Staff Management', path: '/venue-admin/staff', icon: icons.users },
  { label: 'Sensor Network', path: '/venue-admin/sensors', icon: icons.pulse },
  { label: 'Post-Event Report', path: '/analytics/report', icon: icons.report },
  { label: 'Venue Settings', path: '/venue-admin/settings', icon: icons.gear },
];

export const venueAdminBrand = { brand: 'FlowState', brandSub: 'VENUE ADMIN' };
export const venueAdminUser = { name: 'Ops Lead', role: 'Terminal 01', initials: 'OL' };

// ─── Operations Sidebar ──────────────────────────────────────
export const operationsSidebar = [
  { label: 'Operations Command', path: '/operations', icon: icons.grid, end: true },
  { label: 'What-If Sandbox', path: '/operations/sandbox', icon: icons.box },
  { section: 'Cross-Panel' },
  { label: 'Safety Overview', path: '/security', icon: icons.shield },
  { label: 'Evacuation Control', path: '/security/evacuation', icon: icons.exit },
  { label: 'Post-Event Report', path: '/analytics/report', icon: icons.report },
];

export const operationsBrand = { brand: 'FlowState', brandSub: 'OPS CENTER' };

// ─── Security Sidebar ────────────────────────────────────────
export const securitySidebar = [
  { label: 'Safety Overview', path: '/security', icon: icons.shield, end: true },
  { label: 'Evacuation Control', path: '/security/evacuation', icon: icons.exit },
  { label: 'Incident Command', path: '/security/incidents', icon: icons.warning },
  { section: 'Cross-Panel' },
  { label: 'Operations Command', path: '/operations', icon: icons.grid },
  { label: 'Post-Event Report', path: '/analytics/report', icon: icons.report },
];

export const securityBrand = { brand: 'FlowState', brandSub: 'SECURITY' };

// ─── Analytics Sidebar ───────────────────────────────────────
export const analyticsSidebar = [
  { label: 'Post-Event Report', path: '/analytics/report', icon: icons.report },
  { label: 'Event Replay', path: '/analytics/replay', icon: icons.replay },
  { section: 'Cross-Panel' },
  { label: 'Operations Command', path: '/operations', icon: icons.grid },
  { label: 'Safety Overview', path: '/security', icon: icons.shield },
];

export const analyticsBrand = { brand: 'FlowState', brandSub: 'ANALYTICS' };

// ─── Attendee Sidebar ────────────────────────────────────────
export const attendeeSidebar = [
  { label: 'Event Home', path: '/attendee', icon: icons.grid, end: true },
  { label: 'Live Navigation', path: '/attendee/navigate', icon: icons.pin },
  { label: 'Food & Drinks', path: '/attendee/food', icon: icons.box },
  { label: 'My Profile', path: '/attendee/profile', icon: icons.users },
];

export const attendeeBrand = { brand: 'FlowState', brandSub: 'FAN EXPERIENCE' };

// ─── Unified Global Sidebar ──────────────────────────────────
export const globalSidebar = [
  {
    section: 'Super Admin',
    items: superAdminSidebar
  },
  {
    section: 'Venue Admin',
    items: [
      { label: 'Command Center', path: '/venue-admin', icon: icons.grid, end: true },
      { label: 'Event Management', path: '/venue-admin/events', icon: icons.calendar },
      { label: 'Staff Management', path: '/venue-admin/staff', icon: icons.users },
      { label: 'Sensor Network', path: '/venue-admin/sensors', icon: icons.pulse },
      { label: 'Venue Settings', path: '/venue-admin/settings', icon: icons.gear },
    ]
  },
  {
    section: 'Operations',
    items: [
      { label: 'Operations Command', path: '/operations', icon: icons.grid, end: true },
      { label: 'What-If Sandbox', path: '/operations/sandbox', icon: icons.box },
    ]
  },
  {
    section: 'Security',
    items: [
      { label: 'Safety Overview', path: '/security', icon: icons.shield, end: true },
      { label: 'Evacuation Control', path: '/security/evacuation', icon: icons.exit },
    ]
  },
  {
    section: 'Analytics',
    items: [
      { label: 'Post-Event Report', path: '/analytics/report', icon: icons.report },
      { label: 'Event Replay', path: '/analytics/replay', icon: icons.replay },
    ]
  },
  {
    section: 'Logistics',
    items: [
      { label: 'Transit Hub', path: '/logistics/transit', icon: icons.truck },
    ]
  }
];

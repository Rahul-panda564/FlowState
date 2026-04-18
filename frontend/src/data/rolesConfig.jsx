import React from 'react';

export const platformRoles = [
  {
    id: 'venue-admin',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Venue Administrator',
    description: 'Full venue management and system control. Oversee all aspects of the command infrastructure.',
    access: 'LEVEL_5 CLEARANCE',
    path: '/venue-admin',
  },
  {
    id: 'operations',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    title: 'Operations Manager',
    description: 'Live event monitoring and crowd flow management. Access to real-time predictive logistics.',
    access: 'OPS_FLOW ENABLED',
    path: '/operations',
  },
  {
    id: 'security',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    title: 'Security Supervisor',
    description: 'Incident response and safety telemetry. Direct interface with field assets and emergency systems.',
    access: 'TACTICAL_COMM_V3',
    path: '/security',
  },
  {
    id: 'observer',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    title: 'Observer',
    description: 'View-only access to analytics and reporting. For audit, performance review, and stakeholder visibility.',
    access: 'READ_ONLY ACCESS',
    path: '/super-admin',
  },
  {
    id: 'fan',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M9 21v-2a4 4 0 0 1 4-4"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Event Fan',
    description: 'Access to Stadium Connect features: Friends Hub, Smart Navigation, and Express Concessions.',
    access: 'FAN_PORTAL_ACTIVE',
    path: '/attendee',
  },
];

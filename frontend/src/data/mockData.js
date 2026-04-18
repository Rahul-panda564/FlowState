// ============================================================
// FLOWSTATE — Mock Data Layer
// ============================================================

export const platformHealth = {
  cpu: 42.8,
  memory: 68.2,
  dbLatency: 88.1,
  nodes: { healthy: 34, degraded: 1, label: 'DR-REPLICA-R21: DELAY' },
  uptime: '99.97%',
  activeNodes: 1402,
};

export const revenueMetrics = {
  mrr: 2400000,
  mrrChange: 12.4,
  newVenues: 48,
  churnRate: 0.8,
  monthlyRevenue: [1.8, 1.9, 2.0, 2.1, 2.2, 2.4],
  months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const apiPerformance = {
  avgLatency: 18,
  p99Latency: 32,
  errorRate: 0.02,
  healthy: true,
  throughput: '14.2K req/s',
  latencyHistory: [22, 19, 21, 18, 20, 17, 18, 16, 19, 18],
};

export const supportTickets = [
  { id: 'TKT-9821', priority: 'urgent', status: 'LiDAR Drop-off', sla: '09:17:44' },
  { id: 'TKT-8842', priority: 'high', status: 'API Auth Failure', sla: '02:33:10' },
  { id: 'TKT-8839', priority: 'medium', status: 'Venue Sync Delay', sla: '08:12:00' },
  { id: 'TKT-8831', priority: 'medium', status: 'Billing Inquiry', sla: '14:45:30' },
];

export const dataIngestion = {
  lidarPts: '1.2M',
  iotEvents: '45.2K',
  unit: 'PTS/SEC',
  iotUnit: 'TOT EV/MIN',
};

export const nodeDistribution = {
  capacity: 84,
  regions: [
    { name: 'North-AM', color: '#00D4AA' },
    { name: 'Europe-C', color: '#00D4AA' },
  ],
};

export const venues = [
  {
    id: 'AA-882-VX',
    name: 'Apex Arena Mumbai',
    location: 'Mumbai, India',
    region: 'IN-WEST',
    capacity: 65500,
    liveLoad: 42,
    status: 'active',
    sensorsOnline: 1204,
    sensorsTotal: 1204,
    sensorHealth: true,
    tier: 'enterprise',
    image: '🏟️',
    vendors: [
      { name: 'Saffron Flavors', location: 'Section 427, Level 4', waitTime: 4 },
      { name: 'Desi Tadka Junction', location: 'Gate 6, Concourse A', waitTime: 12 },
      { name: 'Mumbai Express Burger', location: 'North Plaza, Level 2', waitTime: 8 },
      { name: 'The Chai Hub', location: 'Global Concourse', waitTime: 2 },
    ]
  },
  {
    id: 'NP-041-LQ',
    name: 'Neon Plaza Hub',
    location: 'Tokyo, Japan',
    region: 'APAC-01',
    capacity: 12200,
    liveLoad: 89,
    status: 'offline',
    sensorsOnline: 422,
    sensorsTotal: 850,
    sensorHealth: false,
    tier: 'pro',
    image: '🏢',
  },
  {
    id: 'GS-909-TM',
    name: 'Grand Sphere Theater',
    location: 'London, UK',
    region: 'EU-WEST',
    capacity: 5400,
    liveLoad: 0,
    status: 'paused',
    sensorsOnline: 310,
    sensorsTotal: 310,
    sensorHealth: true,
    tier: 'starter',
    image: '🎭',
  },
  {
    id: 'VE-112-K0',
    name: 'Vertex Expo Center',
    location: 'Berlin, Germany',
    region: 'EU-CENTRAL',
    capacity: 82000,
    liveLoad: 15,
    status: 'active',
    sensorsOnline: 4192,
    sensorsTotal: 4500,
    sensorHealth: true,
    tier: 'enterprise',
    image: '🏛️',
  },
];

export const globalAnalytics = {
  totalActiveUsers: { value: '1.2M', change: 12.4, direction: 'up' },
  avgSessionDuration: { value: '24m 15s', change: 0, direction: 'stable', label: 'Consistent with prev. period' },
  featureAdoption: { value: '68.2%', change: 5.2, direction: 'up' },
  churnRate: { value: '1.4%', change: -0.3, direction: 'down', alert: 'Critical Threshold: 2.0%' },
  activeSessions: {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    attendee: [12, 8, 15, 45, 62, 55, 78, 85],
    operator: [5, 4, 6, 18, 22, 20, 25, 28],
    web: [3, 2, 4, 12, 18, 15, 20, 22],
  },
  adoptionFunnel: {
    onboarding: { value: '100%', count: '2.4M' },
    activation: { value: '74%', count: '1.7M' },
    retention: { value: '42%', count: '1.0M' },
  },
  topVenues: [
    { name: 'The Kinetic Arena', concurrent: 12462 },
    { name: 'Neon Grid Plaza', concurrent: 9812 },
    { name: 'Flow Nexus Terminal', concurrent: 8440 },
    { name: 'Vortex Lounge', concurrent: 7961 },
    { name: 'The Octagon', concurrent: 6110 },
  ],
};

export const venueEvents = [
  { id: 1, name: 'Championship Game', date: '2025-12-14', time: '19:00', type: 'sports', expected: 65000, status: 'live', staffing: 'full' },
  { id: 2, name: 'Concert: Solar Echoes', date: '2025-12-15', time: '20:30', type: 'concert', expected: 45000, status: 'scheduled', staffing: 'partial' },
  { id: 3, name: 'Private Corporate Gala', date: '2025-12-16', time: '18:00', type: 'conference', expected: 2000, status: 'scheduled', staffing: 'minimal' },
];

export const operationsData = {
  eventName: 'Championship Game',
  isLive: true,
  localTime: '14:32:15',
  gameQuarter: 'Q2',
  gameClock: '8:34',
  currentOccupancy: 64281,
  maxCapacity: 82500,
  avgVelocity: 0.82,
  peakDensity: { time: 'T+22m', change: 12.4 },
  egressEstimate: '18m',
  alertsSummary: { critical: 1, active: 3 },
  totalOccupancy60: '62.4K',
  flowEfficiency: 87,
  fanSentiment: 'GOOD',
  estRevenue: 12482,
  throughputHistory: [42, 58, 72, 85, 91, 88, 74, 52, 41, 38],
  revenueHistory: [4.2, 5.8, 6.1, 8.4, 12.5, 9.8, 7.2, 6.5, 5.4, 4.8],
  waitTimePredictions: [
    { time: '14:32', label: 'Now', wait: '4.2m' },
    { time: '14:45', label: '', wait: '8.5m (Halftime Rush)' },
    { time: '15:15', label: '', wait: '2.1m' },
  ],
};

export const operationsAlerts = [
  {
    id: 1,
    severity: 'critical',
    title: 'CONGESTION BOTTLE NECK',
    description: 'Section 427 Egress Route blocked by non-authorized vehicle. Flow rate dropped by 80%.',
    timeAgo: '02m',
    actions: ['Acknowledge'],
  },
  {
    id: 2,
    severity: 'warning',
    title: 'QUEUE LENGTH SPIKE',
    description: 'Concession Block B average wait time exceeding 12 minutes.',
    timeAgo: '08m',
    actions: ['Acknowledge'],
  },
  {
    id: 3,
    severity: 'info',
    title: 'STAFF SWAP REQUEST',
    description: '',
    timeAgo: '15m',
    actions: [],
  },
];

export const securityData = {
  crowdPressureIndex: { value: 45, max: 100, trend: 'Stable Trend', status: 'ok' },
  evacuationReadiness: { value: 18, unit: 'MINS EST.', status: 'Optimal Clearance' },
  medicalRate: { value: 0.3, unit: '/ 10K PAX', status: 'Under Threshold' },
  securityResponse: { value: 2.4, unit: 'MIN AVG.', activeUnits: 42 },
  zones: [
    { name: 'Section A', occupancy: '1,240', capacity: '2,000', pressure: '32%', status: 'ok', lastIncident: 'None', staff: 'Delta-4' },
    { name: 'Concourse B', occupancy: '4,890', capacity: '5,000', pressure: '88%', status: 'watch', lastIncident: 'Crowd Density 14:02', staff: 'Sigma-2, Beta-1' },
    { name: 'Gate 5', occupancy: '2,105', capacity: '2,000', pressure: '105%', status: 'alert', lastIncident: 'BOTTLE NECK DETECTED', staff: 'Unassigned' },
  ],
  incidents: [
    { time: '14:22:05', location: 'Gate 5', severity: 'critical', status: 'Reported', assigned: 'UNAS...' },
    { time: '14:15:30', location: 'North Plaza', severity: 'medium', status: 'En Route', assigned: 'Sigma...' },
    { time: '14:02:11', location: 'Main Stage', severity: 'low', status: 'Resolved', assigned: 'Alpha...' },
    { time: '13:58:45', location: 'Exit 3', severity: 'low', status: 'Resolved', assigned: 'Beta-...' },
    { time: '13:45:00', location: 'Level 2 Concourse', severity: 'medium', status: 'Resolved', assigned: 'Delta...' },
  ],
};

export const sandboxData = {
  sessionId: 'FS-990-ALPHA',
  baselineDataset: 'Championship Final - Q4 Rush',
  simulationDuration: 120,
  performanceComparison: [
    { metric: 'Peak Density', baseline: '4.2 p/m²', scenario: '3.1 p/m²', impact: '-26%', grade: 'A' },
    { metric: 'Wait Time', baseline: '12.4m', scenario: '8.8m', impact: '-29%', grade: 'B+' },
    { metric: 'Clear-Out Time', baseline: '44m', scenario: '48m', impact: '+9%', grade: 'C-' },
    { metric: 'Revenue Impact', baseline: '840k', scenario: '912k', impact: '+8.5%', grade: 'A' },
  ],
  aiInsight: 'Critical friction detected at Gate 6. Reducing throughput by 15% redirected load to northern corridors effectively.',
  aiReco: 'Deployment of 4 additional mobile vendors to Zone C will capture redirected flow and boost tertiary revenue by projected 4.2%.',
};

export const evacuationData = {
  isActive: true,
  type: 'FULL EVACUATION',
  timeSinceActivation: '00:04:32',
  occupancy: 24500,
  egressRate: 1200,
  estComplete: 18,
  zoneClearance: [
    { name: 'Sections 300-325', status: 'cleared', time: null },
    { name: 'Concourse A', status: 'clearing', time: '02:45' },
    { name: 'Field Level', status: 'clearing', time: '05:12' },
    { name: 'Parking Level 1', status: 'pending', time: null },
  ],
  externalAgencies: [
    { name: 'Metro Fire Dept', status: 'ON SCENE', action: 'REQUEST ADDITIONAL' },
    { name: 'Paramedic Unit 4', status: 'STANDING BY', action: 'DISPATCH TO GATE 2' },
    { name: 'Local PD Units', status: 'NOTIFIED', action: 'REQUEST BACKUP' },
  ],
};

export const staffMembers = [
  { name: 'Rahul Sharma', email: 'rahul@kinetic.cmd', role: 'Venue Admin', roleColor: '#00D4AA', status: 'Active', lastActive: '2023-11-24 14:22:05', avatar: 'RS' },
  { name: 'Priya Singh', email: 'priya@kinetic.cmd', role: 'Operations Manager', roleColor: '#3B82F6', status: 'Invited', lastActive: 'Pending Acceptance', avatar: 'PS' },
  { name: 'Vikram Mehta', email: 'vikram@kinetic.cmd', role: 'Security Supervisor', roleColor: '#F59E0B', status: 'Active', lastActive: '2023-11-24 12:05:44', avatar: 'VM' },
  { name: 'Ananya Iyer', email: 'ananya@kinetic.cmd', role: 'Logistics Coordinator', roleColor: '#8B5CF6', status: 'Inactive', lastActive: '2023-10-15 09:15:22', avatar: 'AI' },
];

export const sensorData = {
  total: 47,
  online: 43,
  attention: 3,
  offline: 1,
  sensors: [
    { id: 'LID-AR-092', type: 'LIDAR SENSOR SYSTEM', status: 'Online', needsCalibration: true, reading: '4s ago', battery: 88, signal: '-42dBm', x: 60, y: 50 },
    { id: 'LID-07', type: 'LIDAR', status: 'Online', needsCalibration: false, reading: '2s ago', battery: 95, signal: '-38dBm', x: 35, y: 30 },
    { id: 'IOT-12', type: 'IOT SENSOR', status: 'Online', needsCalibration: false, reading: '1s ago', battery: 12, signal: '-45dBm', x: 80, y: 20 },
    { id: 'P-003', type: 'PLANNED', status: 'Planned', needsCalibration: false, reading: '-', battery: null, signal: '-', x: 50, y: 70 },
    { id: 'CAM-04', type: 'CAMERA', status: 'Offline', needsCalibration: false, reading: '2h ago', battery: 0, signal: '-', x: 30, y: 60 },
  ],
  recentEvents: [
    { time: '14:22:04', message: 'Sensor LID-07 calibrated', location: 'SECTOR 4', status: 'ok' },
    { time: '14:19:12', message: 'IOT-12 low battery alert', location: 'GATE B-12', status: 'warning' },
    { time: '14:15:55', message: 'Planned sensor P-003 initialized', location: 'CONCOURSE', status: 'info' },
  ],
};

export const postEventReport = {
  overallGrade: 'A-',
  keyAchievement: 'Zero safety incidents, 30% faster clear-out',
  improvementArea: 'Concourse B congestion during halftime',
  grades: [
    { label: 'Prediction Accuracy', grade: 'A', value: '87%', target: 'Met Target: 85%', sublabel: 'NET TARGET', icon: '📊' },
    { label: 'Safety Score', grade: 'A+', value: '100%', target: 'Perfect Record', sublabel: 'PERFECT RECORD', icon: '🛡️' },
    { label: 'Revenue Growth', grade: 'A', value: '45K', target: 'vs Baseline', sublabel: 'ABOVE BASELINE', icon: '💰' },
    { label: 'Efficiency Delta', grade: 'A', value: '30%', target: 'Faster Entry', sublabel: 'SYSTEM OPTIMIZED', icon: '⚡' },
  ],
  predictionPerformance: {
    horizon15: 92,
    horizon30: 87,
    horizon60: 74,
    modelVersion: 'v.2.6',
  },
  safety: {
    pressureIncidents: 0,
    responseTime: '2.1m',
    evacTesting: '16m',
    evacDelta: '-9%',
  },
  revenue: {
    concessionRevenue: 45200,
    seatUpgrades: 234,
    inSeatOrders: 1200,
    stockoutSavings: 8500,
  },
  efficiency: {
    entryFlow: '30%',
    staffUtil: '15%',
    clearOutTime: '38m',
    fanNps: '+12',
  },
  aiRecommendations: [
    { num: 1, text: 'Open Gate 6 15 mins earlier for the next event based on early arrival clusters.', action: 'APPLY TO SCHEDULE →' },
    { num: 2, text: 'Deploy 3 mobile vendors to Section 427-450 during Q3 to capture 18% latent demand.', action: 'DISPATCH STAFF →' },
    { num: 3, text: 'Adjust PA timing in Concourse B to stagger halftime return flow by 120 seconds.', action: 'UPDATE AUTOMATION →' },
  ],
};

export const concessionItems = [
  { name: 'Nachos + Craft Beer Combo', price: 18.00, wait: null, favorite: true, section: '427' },
  { name: 'Jumbo Stadium Dog', price: 8.50, wait: '8 MIN', waitStatus: 'ok', image: '🌭' },
  { name: 'Arena IPA Draft', price: 12.00, wait: '15 MIN', waitStatus: 'long', image: '🍺' },
  { name: 'Giant Salted Pretzel', price: 9.00, wait: '5 MIN', waitStatus: 'ok', image: '🥨' },
];

export const attendeeRecap = {
  totalDistance: 2.3,
  distancePercentile: '15% more than average',
  timeInSeat: '2h 47m',
  timeSaved: '12 min',
  stepsTaken: 8432,
  crowdZonesAvoided: 3,
  journeyLog: [
    { time: '2:15 PM', icon: '📍', title: 'Arrived (Gate 6)', subtitle: 'Initial perimeter sync complete.' },
    { time: null, icon: '🍿', title: 'Concession Stop', subtitle: 'Nachos & Beer acquired.', badge: '0 MIN WAIT', tip: "DON'T MISS KICKOFF!" },
    { time: null, icon: '🚻', title: 'Pit Stop', subtitle: 'Restroom (smart timing during timeout)', meta: 'Engagement Metric: Seat occupied for 84% of play time.' },
    { time: '5:45 PM', icon: '🚪', title: 'Left Stadium', subtitle: 'Beat the mass rush by 12 mins.' },
  ],
};

export const platformSettings = {
  branding: { accentColor: '#28DFB5', interfaceMood: 'atmospheric-dark' },
  localization: { language: 'English (Global - US)', timezone: 'UTC-05:00 (EST - New York)' },
  featureFlags: [
    { name: 'Advanced Predictive Modeling', key: 'ENABLE_AI_PROJECTION_ENGINE', enabled: true },
    { name: 'Multi-Venue Aggregation', key: 'GLOBAL_LOCUS_SYNC_V2', enabled: false },
    { name: 'Experimental AR Layouts', key: 'WEB_XR_SPATIAL_DEBUGGER', enabled: true },
  ],
  compliance: { logPurgeDays: 90, mediaExpiryYears: 2, automatedScrubbing: true },
};

export const venueProfile = {
  name: 'Apex Central Stadium',
  type: 'Multi-purpose Arena',
  regionCode: 'LN-HQ-01',
  coordinates: '51.5074° N, 0.1278° W',
  activeModel: 'MAIN_CONCOURSE_REV4.obj',
  operationalHours: {
    weekday: { open: '08:00 AM', close: '10:00 PM' },
    saturday: { open: '10:00 AM', close: '12:00 AM' },
    sunday: { open: '10:00 AM', close: '08:00 PM' },
  },
  emergencyContacts: [
    { role: 'Incident Commander', name: 'Major Sarah Vance', phone: '+1 (555) 091-2291' },
    { role: 'Fire Safety Officer', name: 'Marcus Thorne', phone: '+1 (555) 091-2284' },
  ],
};

export const friendsList = [
  { id: 'f1', name: 'Amit', status: 'Near Seat', zone: 'Section 427', avatar: 'AM', color: '#3B82F6', battery: 82, lat: 0.2, lng: 0.4 },
  { id: 'f2', name: 'Ananya', status: 'Concessions', zone: 'North Plaza', avatar: 'AN', color: '#EC4899', battery: 14, lat: 0.8, lng: 0.2 },
  { id: 'f3', name: 'Vikram', status: 'Arriving', zone: 'Gate 6', avatar: 'VI', color: '#10B981', battery: 94, lat: 0.1, lng: 0.1 },
  { id: 'f4', name: 'Aditi', status: 'Ghost Mode', zone: 'Unknown', avatar: 'AD', color: '#6B7280', battery: 45, ghost: true },
];

export const menuItems = [
  // Beer
  { id: 'm1', name: 'Kingfisher Draft', price: 14.50, category: 'Beer', vendor: 'The Chai Hub', image: '🍺', wait: '2 min', popular: true },
  { id: 'm2', name: 'Bira 91 White', price: 12.00, category: 'Beer', vendor: 'Saffron Flavors', image: '🍺', wait: '4 min' },
  // Meals
  { id: 'm3', name: 'Paneer Tikka Burger', price: 16.95, category: 'Meals', vendor: 'Mumbai Express', image: '🍔', wait: '12 min', popular: true },
  { id: 'm4', name: 'Chicken Biryani Box', price: 22.50, category: 'Meals', vendor: 'Desi Tadka', image: '🍱', wait: '15 min' },
  { id: 'm5', name: 'Masala Vada Pav', price: 9.50, category: 'Meals', vendor: 'Saffron Flavors', image: '🥪', wait: '5 min' },
  // Snacks
  { id: 'm6', name: 'Masala Nachos', price: 12.00, category: 'Snacks', vendor: 'Saffron Flavors', image: '🧀', wait: '3 min', popular: true },
  { id: 'm7', name: 'Butter Garlic Naan Bites', price: 8.50, category: 'Snacks', vendor: 'Saffron Flavors', image: '🫓', wait: '4 min' },
  // Drinks
  { id: 'm8', name: 'Cutting Chai', price: 6.50, category: 'Drinks', vendor: 'The Chai Hub', image: '☕', wait: '0 min' },
  { id: 'm9', name: 'Mango Lassi', price: 8.00, category: 'Drinks', vendor: 'The Chai Hub', image: '🥤', wait: '1 min' },
];

export const transitData = {
  parking: [
    { id: 'P1', name: 'North Lot (VIP)', fill: 82, status: 'near-capacity', capacity: 1200 },
    { id: 'P2', name: 'East Structured', fill: 45, status: 'stable', capacity: 4500 },
    { id: 'P3', name: 'West Perimeter', fill: 12, status: 'open', capacity: 8000 },
    { id: 'P4', name: 'South Overflow', fill: 0, status: 'closed', capacity: 2500 }
  ],
  trains: [
    { id: 'T1', line: 'Blue Line (Stadia)', direction: 'Downtown', time: '4 min', status: 'on-time' },
    { id: 'T2', line: 'Red Line (Express)', direction: 'Central Hub', time: '12 min', status: 'delayed' }
  ],
  buses: [
    { id: 'B1', shuttle: 'Shuttle A', route: 'North Gate', time: '2 min', count: 3 },
    { id: 'B2', shuttle: 'Shuttle B', route: 'West Gate', time: '8 min', count: 1 }
  ],
  rideshare: {
    surge: '1.2x',
    avgWait: '6 min',
    zones: [
      { id: 'Z1', name: 'Gate 6 Pickup', load: 'HIGH' },
      { id: 'Z2', name: 'Main Concourse', load: 'LOW' }
    ]
  }
};

export const incidentTeams = [
  { id: 'T-SIG-6', name: 'Sigma-6', type: 'Security', status: 'Available', location: 'Section 101' },
  { id: 'T-DEL-2', name: 'Delta-2', type: 'Medical', status: 'On Route', location: 'Gate 4' },
  { id: 'T-BET-1', name: 'Beta-1', type: 'Security', status: 'On Scene', location: 'Concourse B' },
  { id: 'T-ALP-4', name: 'Alpha-4', type: 'Supervisor', status: 'Available', location: 'Ops Center' }
];


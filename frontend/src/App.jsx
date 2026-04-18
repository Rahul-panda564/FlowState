import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext';
import { AdminLayout, AttendeeLayout, SharedProfileLayout } from './layouts/PersistentLayouts';

// Public & Auth
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ProfileHub from './pages/auth/ProfileHub';

// Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import VenueManagement from './pages/super-admin/VenueManagement';
import AddVenueWizard from './pages/super-admin/AddVenueWizard';
import GlobalAnalytics from './pages/super-admin/GlobalAnalytics';
import SystemConfiguration from './pages/super-admin/SystemConfiguration';

// Venue Admin
import VenueCommandCenter from './pages/venue-admin/VenueCommandCenter';
import EventManagement from './pages/venue-admin/EventManagement';
import StaffManagement from './pages/venue-admin/StaffManagement';
import SensorManagement from './pages/venue-admin/SensorManagement';
import VenueSettings from './pages/venue-admin/VenueSettings';

// Operations & Security
import OperationsCommand from './pages/operations/OperationsCommand';
import WhatIfSandbox from './pages/operations/WhatIfSandbox';
import SafetyOverview from './pages/security/SafetyOverview';
import EvacuationControl from './pages/security/EvacuationControl';
import IncidentManagement from './pages/security/IncidentManagement';
import TransitHub from './pages/logistics/TransitHub';

// Analytics
import PostEventReport from './pages/analytics/PostEventReport';
import EventReplay from './pages/analytics/EventReplay';

// Attendee
import AttendeeHome from './pages/attendee/AttendeeHome';
import AttendeeNavigate from './pages/attendee/AttendeeNavigate';
import AttendeeFood from './pages/attendee/AttendeeFood';
import AttendeeProfile from './pages/attendee/AttendeeProfile';
import AttendeeRecap from './pages/attendee/AttendeeRecap';
import AttendeeFriends from './pages/attendee/AttendeeFriends';

function App() {
  return (
    <NotificationProvider>
      <HashRouter>
        <Routes>
          {/* ... existing routes ... */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<Navigate to="/venue-admin" replace />} />
          <Route path="/analytics" element={<Navigate to="/analytics/report" replace />} />
          
          <Route element={<SharedProfileLayout />}>
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin', 'operations', 'security', 'observer']}>
                <ProfileHub />
              </ProtectedRoute>
            } />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['super-admin', 'observer']}><AdminLayout role="super-admin" /></ProtectedRoute>}>
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/venues" element={<VenueManagement />} />
            <Route path="/super-admin/venues/new" element={<AddVenueWizard />} />
            <Route path="/super-admin/analytics" element={<GlobalAnalytics />} />
            <Route path="/super-admin/settings" element={<SystemConfiguration />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['venue-admin', 'super-admin']}><AdminLayout role="venue-admin" /></ProtectedRoute>}>
            <Route path="/venue-admin" element={<VenueCommandCenter />} />
            <Route path="/venue-admin/events" element={<EventManagement />} />
            <Route path="/venue-admin/staff" element={<StaffManagement />} />
            <Route path="/venue-admin/sensors" element={<SensorManagement />} />
            <Route path="/venue-admin/settings" element={<VenueSettings />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['operations', 'venue-admin', 'super-admin']}><AdminLayout role="operations" /></ProtectedRoute>}>
            <Route path="/operations" element={<OperationsCommand />} />
            <Route path="/operations/sandbox" element={<WhatIfSandbox />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['security', 'venue-admin', 'super-admin']}><AdminLayout role="security" /></ProtectedRoute>}>
            <Route path="/security" element={<SafetyOverview />} />
            <Route path="/security/evacuation" element={<EvacuationControl />} />
            <Route path="/security/incidents" element={<IncidentManagement />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['logistics', 'operations', 'venue-admin', 'super-admin']}><AdminLayout role="operations" /></ProtectedRoute>}>
             <Route path="/logistics/transit" element={<TransitHub />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['observer', 'super-admin', 'venue-admin']}><AdminLayout role="super-admin" /></ProtectedRoute>}>
            <Route path="/analytics/report" element={<PostEventReport />} />
            <Route path="/analytics/replay" element={<EventReplay />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}><AttendeeLayout /></ProtectedRoute>}>
            <Route path="/attendee" element={<AttendeeHome />} />
            <Route path="/attendee/navigate" element={<AttendeeNavigate />} />
            <Route path="/attendee/food" element={<AttendeeFood />} />
            <Route path="/attendee/profile" element={<AttendeeProfile />} />
            <Route path="/attendee/recap" element={<AttendeeRecap />} />
            <Route path="/attendee/friends" element={<AttendeeFriends />} />
          </Route>
        </Routes>
      </HashRouter>
    </NotificationProvider>
  );
}


export default App;

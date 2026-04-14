import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import VenueManagement from './pages/super-admin/VenueManagement';
import AddVenueWizard from './pages/super-admin/AddVenueWizard';
import GlobalAnalytics from './pages/super-admin/GlobalAnalytics';
import SystemConfiguration from './pages/super-admin/SystemConfiguration';
import VenueCommandCenter from './pages/venue-admin/VenueCommandCenter';
import EventManagement from './pages/venue-admin/EventManagement';
import StaffManagement from './pages/venue-admin/StaffManagement';
import SensorManagement from './pages/venue-admin/SensorManagement';
import VenueSettings from './pages/venue-admin/VenueSettings';
import OperationsCommand from './pages/operations/OperationsCommand';
import WhatIfSandbox from './pages/operations/WhatIfSandbox';
import SafetyOverview from './pages/security/SafetyOverview';
import EvacuationControl from './pages/security/EvacuationControl';
import PostEventReport from './pages/analytics/PostEventReport';
import EventReplay from './pages/analytics/EventReplay';
import IncidentManagement from './pages/security/IncidentManagement';
import TransitHub from './pages/logistics/TransitHub';
import AttendeeHome from './pages/attendee/AttendeeHome';
import AttendeeNavigate from './pages/attendee/AttendeeNavigate';
import AttendeeFood from './pages/attendee/AttendeeFood';
import AttendeeProfile from './pages/attendee/AttendeeProfile';
import AttendeeRecap from './pages/attendee/AttendeeRecap';
import AttendeeFriends from './pages/attendee/AttendeeFriends';
import ProfileHub from './pages/auth/ProfileHub';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public & Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Aliases for Redirects */}
        <Route path="/dashboard" element={<Navigate to="/venue-admin" replace />} />
        <Route path="/analytics" element={<Navigate to="/analytics/report" replace />} />
        
        {/* Profile Hub - Shared but requires login */}
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin', 'operations', 'security', 'observer']}>
            <ProfileHub />
          </ProtectedRoute>
        } />

        {/* Super Admin Segment */}
        <Route path="/super-admin" element={
          <ProtectedRoute allowedRoles={['super-admin', 'observer']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/venues" element={
          <ProtectedRoute allowedRoles={['super-admin']}>
            <VenueManagement />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/venues/new" element={
          <ProtectedRoute allowedRoles={['super-admin']}>
            <AddVenueWizard />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/analytics" element={
          <ProtectedRoute allowedRoles={['super-admin', 'observer']}>
            <GlobalAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/settings" element={
          <ProtectedRoute allowedRoles={['super-admin']}>
            <SystemConfiguration />
          </ProtectedRoute>
        } />

        {/* Venue Admin Segment */}
        <Route path="/venue-admin" element={
          <ProtectedRoute allowedRoles={['venue-admin', 'super-admin']}>
            <VenueCommandCenter />
          </ProtectedRoute>
        } />
        <Route path="/venue-admin/events" element={
          <ProtectedRoute allowedRoles={['venue-admin', 'super-admin']}>
            <EventManagement />
          </ProtectedRoute>
        } />
        <Route path="/venue-admin/staff" element={
          <ProtectedRoute allowedRoles={['venue-admin', 'super-admin']}>
            <StaffManagement />
          </ProtectedRoute>
        } />
        <Route path="/venue-admin/sensors" element={
          <ProtectedRoute allowedRoles={['venue-admin', 'super-admin']}>
            <SensorManagement />
          </ProtectedRoute>
        } />
        <Route path="/venue-admin/settings" element={
          <ProtectedRoute allowedRoles={['venue-admin', 'super-admin']}>
            <VenueSettings />
          </ProtectedRoute>
        } />

        {/* Operations Segment */}
        <Route path="/operations" element={
          <ProtectedRoute allowedRoles={['operations', 'venue-admin', 'super-admin']}>
            <OperationsCommand />
          </ProtectedRoute>
        } />
        <Route path="/operations/sandbox" element={
          <ProtectedRoute allowedRoles={['operations', 'venue-admin', 'super-admin']}>
            <WhatIfSandbox />
          </ProtectedRoute>
        } />

        {/* Security Segment */}
        <Route path="/security" element={
          <ProtectedRoute allowedRoles={['security', 'venue-admin', 'super-admin']}>
            <SafetyOverview />
          </ProtectedRoute>
        } />
        <Route path="/security/evacuation" element={
          <ProtectedRoute allowedRoles={['security', 'venue-admin', 'super-admin']}>
            <EvacuationControl />
          </ProtectedRoute>
        } />
        <Route path="/security/incidents" element={
          <ProtectedRoute allowedRoles={['security', 'venue-admin', 'super-admin']}>
            <IncidentManagement />
          </ProtectedRoute>
        } />
        
        {/* Logistics Segment */}
        <Route path="/logistics/transit" element={
          <ProtectedRoute allowedRoles={['logistics', 'operations', 'venue-admin', 'super-admin']}>
            <TransitHub />
          </ProtectedRoute>
        } />

        {/* Analytics Segment */}
        <Route path="/analytics/report" element={
          <ProtectedRoute allowedRoles={['observer', 'super-admin', 'venue-admin']}>
            <PostEventReport />
          </ProtectedRoute>
        } />
        <Route path="/analytics/replay" element={
          <ProtectedRoute allowedRoles={['observer', 'super-admin', 'venue-admin']}>
            <EventReplay />
          </ProtectedRoute>
        } />

        {/* Fan Portal (Attendee) Segment - Admins can also view */}
        <Route path="/attendee" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}>
            <AttendeeHome />
          </ProtectedRoute>
        } />
        <Route path="/attendee/navigate" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}>
            <AttendeeNavigate />
          </ProtectedRoute>
        } />
        <Route path="/attendee/food" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}>
            <AttendeeFood />
          </ProtectedRoute>
        } />
        <Route path="/attendee/profile" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}>
            <AttendeeProfile />
          </ProtectedRoute>
        } />
        <Route path="/attendee/recap" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}>
            <AttendeeRecap />
          </ProtectedRoute>
        } />
        <Route path="/attendee/friends" element={
          <ProtectedRoute allowedRoles={['fan', 'venue-admin', 'super-admin']}>
            <AttendeeFriends />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}


export default App;

import { Outlet } from 'react-router-dom';
import AppShell from './AppShell';
import AttendeeShell from './AttendeeShell';
import { 
  superAdminSidebar, superAdminBrand, superAdminUser,
  venueAdminSidebar, venueAdminBrand,
  operationsSidebar, operationsBrand,
  securitySidebar, securityBrand
} from '../data/sidebarConfig';

// Generic Admin Layout for all system-access roles
export function AdminLayout({ role }) {
  const configs = {
    'super-admin': {
      sidebarItems: superAdminSidebar,
      brand: superAdminBrand.brand,
      brandSub: superAdminBrand.brandSub,
      user: superAdminUser
    },
    'venue-admin': {
      sidebarItems: venueAdminSidebar,
      brand: venueAdminBrand.brand,
      brandSub: venueAdminBrand.brandSub,
      user: { ...superAdminUser, role: 'Venue Administrator' }
    },
    'operations': {
      sidebarItems: operationsSidebar,
      brand: operationsBrand.brand,
      brandSub: operationsBrand.brandSub,
      user: { ...superAdminUser, role: 'Operations Lead' }
    },
    'security': {
      sidebarItems: securitySidebar,
      brand: securityBrand.brand,
      brandSub: securityBrand.brandSub,
      user: { ...superAdminUser, role: 'Security Chief' }
    }
  };

  const config = configs[role] || configs['super-admin'];

  return (
    <AppShell {...config}>
      <Outlet />
    </AppShell>
  );
}

// Attendee / Fan Layout
export function AttendeeLayout() {
  return (
    <AttendeeShell>
      <Outlet />
    </AttendeeShell>
  );
}

// Dynamic Shared Layout for pages like Profile that exist in both worlds
export function SharedProfileLayout() {
  const userEmail = localStorage.getItem('flowstate_last_user');
  const userRole = localStorage.getItem(`flowstate_role_${userEmail}`);
  
  if (userRole === 'fan') {
    return <AttendeeLayout />;
  }
  
  // Default to venue-admin shell for all other roles for now
  // In a real app we might map them more precisely
  return <AdminLayout role={userRole === 'super-admin' ? 'super-admin' : 'venue-admin'} />;
}

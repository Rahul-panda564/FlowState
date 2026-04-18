import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute component to enforce role-based access control.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authorized.
 * @param {string[]} props.allowedRoles - List of roles permitted to access this route.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  
  // Get current user and role from localStorage (simulated auth state)
  const userEmail = localStorage.getItem('flowstate_last_user');
  const userRole = localStorage.getItem(`flowstate_role_${userEmail}`);

  // 1. If no user is logged in, redirect to appropriate login page
  // 1. If no user is logged in, redirect to login page
  if (!userEmail) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If user is logged in but role is not allowed, redirect to their default dashboard
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(`Access Denied: User ${userEmail} with role ${userRole} tried to access ${location.pathname}`);
    
    // Redirect logic based on role
    if (userRole === 'fan') return <Navigate to="/attendee" replace />;
    if (['venue-admin', 'super-admin'].includes(userRole)) return <Navigate to="/venue-admin" replace />;
    if (userRole === 'operations') return <Navigate to="/operations" replace />;
    if (userRole === 'security') return <Navigate to="/security" replace />;
    
    // Fallback: Default to landing page
    return <Navigate to="/" replace />;
  }

  // 3. User is authorized
  return children;
}

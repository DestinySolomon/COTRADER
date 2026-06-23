import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

/**
 * ProtectedRoute
 *
 * Wraps any route that requires the user to be logged in.
 * If the user is not authenticated, redirects them to /login.
 * If they are, renders the child route (via <Outlet />).
 *
 * Usage in the router:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *   </Route>
 */
export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // Replace: true so the user can't hit the back button to get back in
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
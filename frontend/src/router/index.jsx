import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute    from './ProtectedRoute';
import AppLayout         from '../components/layout/AppLayout';

// Auth pages
import LoginPage         from '../pages/auth/LoginPage';
import RegisterPage      from '../pages/auth/RegisterPage';

// App pages (we'll build these one by one)
import DashboardPage     from '../pages/dashboard/DashboardPage';

// Placeholder pages — we'll replace these as we build each section
function ComingSoon({ name }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="w-12 h-12 rounded-full bg-ct-surface2 flex items-center justify-center">
        <span className="text-ct-text-3 text-xl">🚧</span>
      </div>
      <p className="text-ct-text-2 text-sm">{name} — coming soon</p>
    </div>
  );
}

const router = createBrowserRouter([
  /* ============================================================
     Public routes — no auth required
     ============================================================ */
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  /* ============================================================
     Protected routes — must be logged in
     All wrapped in <AppLayout> which renders the sidebar + top bar
     ============================================================ */
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          // Default: redirect root to dashboard
          { path: '/', element: <Navigate to="/dashboard" replace /> },

          // Dashboard
          { path: '/dashboard', element: <DashboardPage /> },

          // Accounts
          { path: '/accounts', element: <ComingSoon name="Accounts" /> },

          // Rules
          { path: '/rules', element: <ComingSoon name="Rules" /> },

          // Price Alerts
          { path: '/alerts', element: <ComingSoon name="Price Alerts" /> },

          // News Guard
          { path: '/news', element: <ComingSoon name="News Guard" /> },

          // Trade Journal
          { path: '/journal', element: <ComingSoon name="Trade Journal" /> },

          // AI Coach
          { path: '/coaching', element: <ComingSoon name="AI Coach" /> },

          // Settings
          { path: '/settings', element: <ComingSoon name="Settings" /> },
        ],
      },
    ],
  },

  /* ============================================================
     Catch-all — redirect unknown paths to dashboard
     ============================================================ */
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
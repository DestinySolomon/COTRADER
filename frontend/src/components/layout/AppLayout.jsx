import { Outlet }  from 'react-router-dom';
import Sidebar      from './Sidebar';
import TopBar       from './TopBar';

/**
 * AppLayout
 *
 * The shell that wraps every authenticated page.
 * Structure:
 *   [Sidebar] | [TopBar      ]
 *             | [Page Content] ← <Outlet /> renders here
 *
 * The sidebar is fixed height (min-h-screen).
 * The right side scrolls independently.
 */
export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-ct-bg">

      {/* Sidebar — fixed on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Top bar — sticky */}
        <TopBar />

        {/* Page content — scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
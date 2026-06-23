import React, { useEffect, useState } from 'react';
import ReactDOM                        from 'react-dom/client';
import { RouterProvider }              from 'react-router-dom';
import router                          from './router/index';
import useAuthStore                    from './store/useAuthStore';
import './index.css';

/**
 * AppBootstrap
 *
 * Before rendering any routes, we check localStorage for an existing
 * auth token and validate it with the API (initAuth).
 *
 * While that check is running we show a full-screen loading state
 * so there's no flash of the login page for already-logged-in users.
 */
function AppBootstrap() {
  const { initAuth, isInitialized } = useAuthStore();
  const [ready, setReady]           = useState(false);

  useEffect(() => {
    initAuth().finally(() => setReady(true));
  }, []);

  if (!ready || !isInitialized) {
    return (
      <div className="min-h-screen bg-ct-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Animated teal ring */}
          <div className="w-10 h-10 border-2 border-ct-border border-t-ct-accent rounded-full animate-spin" />
          <p className="text-ct-text-3 text-xs tracking-wider uppercase">
            Loading Co-Trader
          </p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppBootstrap />
  </React.StrictMode>
);
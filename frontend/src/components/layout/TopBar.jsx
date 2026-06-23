import { Bell, ChevronDown } from 'lucide-react';
import { useLocation }       from 'react-router-dom';
import useAuthStore          from '../../store/useAuthStore';

/* ============================================================
   Map routes to human-readable page titles
   ============================================================ */
const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard',    subtitle: 'Your trading overview' },
  '/accounts':  { title: 'Accounts',     subtitle: 'Connected brokers & exchanges' },
  '/rules':     { title: 'Rules',        subtitle: 'Your discipline rules' },
  '/alerts':    { title: 'Price Alerts', subtitle: 'Monitor price targets' },
  '/news':      { title: 'News Guard',   subtitle: 'High-impact event protection' },
  '/journal':   { title: 'Journal',      subtitle: 'Full trade history' },
  '/coaching':  { title: 'AI Coach',     subtitle: 'Trading psychology insights' },
  '/settings':  { title: 'Settings',     subtitle: 'Account & preferences' },
};

/* ============================================================
   TopBar
   ============================================================ */
export default function TopBar() {
  const { pathname } = useLocation();
  const user         = useAuthStore((state) => state.user);

  // Match on exact path or first segment
  const pageInfo =
    PAGE_TITLES[pathname] ||
    PAGE_TITLES[`/${pathname.split('/')[1]}`] ||
    { title: 'Co-Trader', subtitle: '' };

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 17 ? 'Good afternoon' :
                'Good evening';

  return (
    <header className="
      flex items-center justify-between
      px-6 py-4
      border-b border-ct-border
      bg-ct-surface/50
      sticky top-0 z-30 backdrop-blur-sm
    ">
      {/* Left — page title */}
      <div>
        <h1 className="text-ct-text font-semibold text-lg leading-tight">
          {pageInfo.title}
        </h1>
        {pageInfo.subtitle && (
          <p className="text-ct-text-3 text-xs mt-0.5">
            {pageInfo.subtitle}
          </p>
        )}
      </div>

      {/* Right — greeting + notifications + user */}
      <div className="flex items-center gap-4">

        {/* Greeting — hidden on small screens */}
        <span className="hidden md:block text-ct-text-2 text-sm">
          {greeting}, <span className="text-ct-text font-medium">
            {user?.name?.split(' ')[0] ?? 'trader'}
          </span>
        </span>

        {/* Notifications bell */}
        <button className="
          relative flex items-center justify-center
          w-9 h-9 rounded-lg
          bg-ct-surface border border-ct-border
          text-ct-text-2
          hover:border-ct-accent hover:text-ct-accent
          transition-colors duration-150
        ">
          <Bell size={16} strokeWidth={1.5} />
          {/* Unread dot — will be driven by state later */}
          <span className="
            absolute top-1.5 right-1.5
            w-2 h-2 rounded-full bg-ct-accent
          " />
        </button>

        {/* User menu — minimal for now */}
        <button className="
          flex items-center gap-2
          pl-3 pr-2 py-2 rounded-lg
          bg-ct-surface border border-ct-border
          text-ct-text-2 text-sm
          hover:border-ct-accent hover:text-ct-text
          transition-colors duration-150
        ">
          {/* Avatar initial */}
          <div className="
            w-5 h-5 rounded-full bg-ct-accent/20
            text-ct-accent text-2xs font-bold
            flex items-center justify-center
          ">
            {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
          </div>
          <span className="hidden sm:block max-w-[100px] truncate">
            {user?.name?.split(' ')[0]}
          </span>
          <ChevronDown size={12} className="text-ct-text-3" />
        </button>
      </div>
    </header>
  );
}
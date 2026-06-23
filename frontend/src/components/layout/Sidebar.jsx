import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  Bell,
  Newspaper,
  BookOpen,
  BrainCircuit,
  Settings,
  LogOut,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';

/* ============================================================
   Navigation items — in order
   ============================================================ */
const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/accounts',  icon: Wallet,          label: 'Accounts'  },
  { to: '/rules',     icon: ShieldCheck,     label: 'Rules'     },
  { to: '/alerts',    icon: Bell,            label: 'Alerts'    },
  { to: '/news',      icon: Newspaper,       label: 'News Guard' },
  { to: '/journal',   icon: BookOpen,        label: 'Journal'   },
  { to: '/coaching',  icon: BrainCircuit,    label: 'AI Coach'  },
];

/* ============================================================
   Sidebar
   — Collapsed (64px icon-only) or expanded (240px) state
   — Active item gets teal left-border accent
   ============================================================ */
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user }          = useAuthStore();
  const navigate                  = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        relative flex flex-col
        bg-ct-surface border-r border-ct-border
        transition-all duration-200 ease-in-out
        ${collapsed ? 'w-16' : 'w-60'}
        min-h-screen shrink-0
      `}
    >
      {/* ---- Logo ---- */}
      <div className={`
        flex items-center gap-3 px-4 py-5 border-b border-ct-border
        ${collapsed ? 'justify-center px-0' : ''}
      `}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-ct-accent shrink-0">
          <TrendingUp size={16} className="text-ct-bg" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div>
            <span className="text-ct-text font-bold text-base tracking-tight">
              Co-Trader
            </span>
            <p className="text-ct-text-3 text-2xs">Discipline platform</p>
          </div>
        )}
      </div>

      {/* ---- Navigation ---- */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {/* Section label — hidden when collapsed */}
        {!collapsed && (
          <p className="ct-section-label px-3 mb-3">Menu</p>
        )}

        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `ct-nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} strokeWidth={1.5} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ---- Bottom section — settings + logout ---- */}
      <div className="border-t border-ct-border px-2 py-3 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `ct-nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
          }
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} strokeWidth={1.5} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={handleLogout}
          className={`ct-nav-item w-full text-ct-loss hover:text-ct-loss hover:bg-ct-loss/10 ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title={collapsed ? 'Log out' : undefined}
        >
          <LogOut size={18} strokeWidth={1.5} className="shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>

        {/* User avatar row — hidden when collapsed */}
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 pt-3 mt-1 border-t border-ct-border">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ct-accent/20 text-ct-accent text-xs font-bold shrink-0">
              {user.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-ct-text text-xs font-medium truncate">{user.name}</p>
              <p className="text-ct-text-3 text-2xs truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* ---- Collapse toggle button ---- */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-3 top-20
          flex items-center justify-center
          w-6 h-6 rounded-full
          bg-ct-surface border border-ct-border
          text-ct-text-2 hover:text-ct-accent hover:border-ct-accent
          transition-colors duration-150
          z-10
        "
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight size={12} />
          : <ChevronLeft  size={12} />
        }
      </button>
    </aside>
  );
}
import { TrendingUp, TrendingDown, Wallet, Bell, ShieldAlert, CircleDot } from 'lucide-react';

/* ============================================================
   Skeleton block — animated shimmer placeholder
   ============================================================ */
function Skeleton({ className = '' }) {
  return <div className={`ct-skeleton ${className}`} />;
}

/* ============================================================
   Stat card — one of the top summary widgets
   Props:
     label     string   — e.g. "Account Balance"
     value     string   — e.g. "$12,450.00"
     change    string   — e.g. "+$340 today"
     positive  bool     — green if true, red if false, gray if null
     icon      node     — Lucide icon component
     loading   bool
   ============================================================ */
function StatCard({ label, value, change, positive, icon: Icon, loading = false }) {
  return (
    <div className="ct-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-ct-text-2 text-sm font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-ct-surface2 flex items-center justify-center">
          {loading
            ? <Skeleton className="w-5 h-5" />
            : <Icon size={16} strokeWidth={1.5} className="text-ct-text-3" />
          }
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      ) : (
        <div>
          <p className="font-mono text-ct-text text-2xl font-semibold tabular-nums">
            {value}
          </p>
          {change && (
            <p className={`text-xs font-mono mt-1 ${
              positive === true  ? 'text-ct-profit' :
              positive === false ? 'text-ct-loss'   :
                                   'text-ct-text-3'
            }`}>
              {change}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Open trades table — skeleton rows
   ============================================================ */
function OpenTradesWidget({ loading = true }) {
  return (
    <div className="ct-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ct-border">
        <div className="flex items-center gap-2">
          <CircleDot size={14} className="text-ct-accent" />
          <h3 className="text-ct-text font-semibold text-sm">Open Trades</h3>
        </div>
        <span className="ct-badge-neutral">Live</span>
      </div>

      {loading ? (
        <div className="p-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty state — shown when no trades yet */
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-full bg-ct-surface2 flex items-center justify-center">
            <TrendingUp size={20} className="text-ct-text-3" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-ct-text text-sm font-medium">No open trades</p>
            <p className="text-ct-text-3 text-xs mt-1">
              Connect an account to see your live positions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Active alerts widget — skeleton
   ============================================================ */
function ActiveAlertsWidget({ loading = true }) {
  return (
    <div className="ct-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ct-border">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-ct-accent" strokeWidth={1.5} />
          <h3 className="text-ct-text font-semibold text-sm">Price Alerts</h3>
        </div>
        <button className="text-ct-accent text-xs hover:text-ct-accent/80 transition-colors">
          + Add alert
        </button>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Bell size={20} className="text-ct-text-3" strokeWidth={1.5} />
          <div className="text-center">
            <p className="text-ct-text text-sm font-medium">No active alerts</p>
            <p className="text-ct-text-3 text-xs mt-1">Set a price target to get notified</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Upcoming news widget — skeleton
   ============================================================ */
function NewsWidget({ loading = true }) {
  return (
    <div className="ct-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ct-border">
        <div className="flex items-center gap-2">
          <ShieldAlert size={14} className="text-ct-warning" strokeWidth={1.5} />
          <h3 className="text-ct-text font-semibold text-sm">Upcoming News</h3>
        </div>
        <span className="ct-badge-warning">Next 24h</span>
      </div>

      {loading ? (
        <div className="p-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-12 w-10 rounded shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <ShieldAlert size={20} className="text-ct-text-3" strokeWidth={1.5} />
          <div className="text-center">
            <p className="text-ct-text text-sm font-medium">No high-impact events</p>
            <p className="text-ct-text-3 text-xs mt-1">Markets are quiet for now</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DashboardPage — main export
   ============================================================ */
export default function DashboardPage() {
  // TODO: replace `true` with real loading state from API calls in Phase 1 backend
  const isLoading = false;

  return (
    <div className="space-y-6">

      {/* ---- Top stat cards ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Account Balance"
          value="$0.00"
          change="Connect an account"
          positive={null}
          icon={Wallet}
          loading={isLoading}
        />
        <StatCard
          label="Today's P&L"
          value="$0.00"
          change="No trades today"
          positive={null}
          icon={TrendingUp}
          loading={isLoading}
        />
        <StatCard
          label="Open Trades"
          value="0"
          change="No live positions"
          positive={null}
          icon={CircleDot}
          loading={isLoading}
        />
        <StatCard
          label="Active Alerts"
          value="0"
          change="Set a price target"
          positive={null}
          icon={Bell}
          loading={isLoading}
        />
      </div>

      {/* ---- No account banner ---- */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-ct-accent/5 border border-ct-accent/20">
        <div className="w-9 h-9 rounded-lg bg-ct-accent/10 flex items-center justify-center shrink-0 mt-0.5">
          <Wallet size={16} className="text-ct-accent" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <p className="text-ct-text text-sm font-semibold">Connect your first account</p>
          <p className="text-ct-text-2 text-xs mt-1 leading-relaxed">
            Link your MT5 broker or Binance account to start monitoring your trades,
            enforcing your rules, and protecting your account.
          </p>
        </div>
        <button className="ct-btn-primary text-xs px-3 py-2 shrink-0">
          Connect account
        </button>
      </div>

      {/* ---- Main grid — open trades + sidebar ---- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Open trades takes 2/3 width on large screens */}
        <div className="xl:col-span-2">
          <OpenTradesWidget loading={isLoading} />
        </div>

        {/* Sidebar widgets */}
        <div className="flex flex-col gap-6">
          <ActiveAlertsWidget loading={isLoading} />
          <NewsWidget         loading={isLoading} />
        </div>
      </div>
    </div>
  );
}
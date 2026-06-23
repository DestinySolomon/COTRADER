import { useEffect }        from 'react';
import { useForm }           from 'react-hook-form';
import { zodResolver }       from '@hookform/resolvers/zod';
import { z }                 from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useState }          from 'react';
import useAuthStore          from '../../store/useAuthStore';

/* ============================================================
   Validation schema
   ============================================================ */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

/* ============================================================
   LoginPage
   ============================================================ */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError, token } = useAuthStore();
  const navigate = useNavigate();

  // If already logged in, go straight to dashboard
  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    clearError();
    const result = await login(data);
    if (result.success) {
      // If onboarding not done, send to onboarding (we'll build this later)
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-ct-bg flex">

      {/* ---- Left panel — branding ---- */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-ct-surface border-r border-ct-border">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-ct-accent">
            <TrendingUp size={20} className="text-ct-bg" strokeWidth={2.5} />
          </div>
          <span className="text-ct-text font-bold text-xl tracking-tight">Co-Trader</span>
        </div>

        {/* Feature highlights */}
        <div className="space-y-8">
          <div>
            <h2 className="text-ct-text text-3xl font-bold leading-tight">
              Trade with discipline.
              <br />
              <span className="text-ct-accent">Not with emotion.</span>
            </h2>
            <p className="text-ct-text-2 mt-4 text-base leading-relaxed max-w-sm">
              Connect your MT5 or Binance account and let Co-Trader enforce your
              rules so you never have to fight your instincts alone.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            {[
              { label: 'Rules enforcement',    desc: 'Auto-lock when your rules are broken' },
              { label: 'Price alerts',          desc: 'Never miss your entry price again' },
              { label: 'News protection',       desc: 'Shield your trades from high-impact events' },
              { label: 'AI psychology coach',  desc: 'Understand the patterns behind your losses' },
            ].map(({ label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-ct-accent shrink-0" />
                <div>
                  <p className="text-ct-text text-sm font-medium">{label}</p>
                  <p className="text-ct-text-3 text-xs mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer quote */}
        <p className="text-ct-text-3 text-xs">
          "The market rewards discipline, not intelligence."
        </p>
      </div>

      {/* ---- Right panel — login form ---- */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-ct-accent">
              <TrendingUp size={16} className="text-ct-bg" strokeWidth={2.5} />
            </div>
            <span className="text-ct-text font-bold text-lg">Co-Trader</span>
          </div>

          <div className="mb-8">
            <h1 className="text-ct-text text-2xl font-bold">Welcome back</h1>
            <p className="text-ct-text-2 text-sm mt-1">
              Sign in to your trading dashboard
            </p>
          </div>

          {/* API error */}
          {error && (
            <div className="mb-4 flex items-start gap-3 p-3 rounded-lg bg-ct-loss/10 border border-ct-loss/20">
              <AlertCircle size={16} className="text-ct-loss mt-0.5 shrink-0" />
              <p className="text-ct-loss text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-ct-text-2 text-sm font-medium">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className={`ct-input ${errors.email ? 'border-ct-loss focus:border-ct-loss' : ''}`}
                autoComplete="email"
                onChange={() => error && clearError()}
              />
              {errors.email && (
                <p className="text-ct-loss text-xs flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-ct-text-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  className={`ct-input pr-10 ${errors.password ? 'border-ct-loss focus:border-ct-loss' : ''}`}
                  autoComplete="current-password"
                  onChange={() => error && clearError()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ct-text-3 hover:text-ct-text-2 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword
                    ? <EyeOff size={15} strokeWidth={1.5} />
                    : <Eye    size={15} strokeWidth={1.5} />
                  }
                </button>
              </div>
              {errors.password && (
                <p className="text-ct-loss text-xs flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="ct-btn-primary w-full mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-ct-bg/30 border-t-ct-bg rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-ct-text-2 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-ct-accent hover:text-ct-accent/80 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
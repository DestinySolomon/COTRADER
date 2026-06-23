import { useEffect, useState }   from 'react';
import { useForm }                from 'react-hook-form';
import { zodResolver }            from '@hookform/resolvers/zod';
import { z }                      from 'zod';
import { Link, useNavigate }      from 'react-router-dom';
import { TrendingUp, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import useAuthStore               from '../../store/useAuthStore';

/* ============================================================
   Validation schema
   ============================================================ */
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name is too long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    password_confirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path:    ['password_confirmation'],
  });

/* ============================================================
   Password strength indicator
   ============================================================ */
function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters',    pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number',           pass: /[0-9]/.test(password) },
  ];

  return (
    <div className="flex gap-3 mt-2">
      {checks.map(({ label, pass }) => (
        <div key={label} className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
            pass ? 'bg-ct-profit' : 'bg-ct-border'
          }`}>
            {pass && <Check size={8} className="text-ct-bg" strokeWidth={3} />}
          </div>
          <span className={`text-2xs transition-colors ${
            pass ? 'text-ct-profit' : 'text-ct-text-3'
          }`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   RegisterPage
   ============================================================ */
export default function RegisterPage() {
  const [showPassword,    setShowPassword]    = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const { register: registerUser, isLoading, error, clearError, token } = useAuthStore();
  const navigate = useNavigate();

  // If already logged in, redirect
  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    clearError();
    const result = await registerUser(data);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-ct-bg flex items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-ct-accent">
            <TrendingUp size={18} className="text-ct-bg" strokeWidth={2.5} />
          </div>
          <span className="text-ct-text font-bold text-xl tracking-tight">Co-Trader</span>
        </div>

        <div className="mb-7">
          <h1 className="text-ct-text text-2xl font-bold">Create your account</h1>
          <p className="text-ct-text-2 text-sm mt-1">
            Start trading with discipline from day one.
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

          {/* Full name */}
          <div className="space-y-1.5">
            <label className="block text-ct-text-2 text-sm font-medium">
              Full name
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Destiny Solomon"
              className={`ct-input ${errors.name ? 'border-ct-loss' : ''}`}
              autoComplete="name"
              onChange={() => error && clearError()}
            />
            {errors.name && (
              <p className="text-ct-loss text-xs flex items-center gap-1">
                <AlertCircle size={11} /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-ct-text-2 text-sm font-medium">
              Email address
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              className={`ct-input ${errors.email ? 'border-ct-loss' : ''}`}
              autoComplete="email"
              onChange={() => error && clearError()}
            />
            {errors.email && (
              <p className="text-ct-loss text-xs flex items-center gap-1">
                <AlertCircle size={11} /> {errors.email.message}
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
                placeholder="Min. 8 characters"
                className={`ct-input pr-10 ${errors.password ? 'border-ct-loss' : ''}`}
                autoComplete="new-password"
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
            {/* Password strength */}
            {passwordValue && <PasswordStrength password={passwordValue} />}
            {errors.password && (
              <p className="text-ct-loss text-xs flex items-center gap-1 mt-1">
                <AlertCircle size={11} /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label className="block text-ct-text-2 text-sm font-medium">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register('password_confirmation')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat your password"
                className={`ct-input pr-10 ${errors.password_confirmation ? 'border-ct-loss' : ''}`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ct-text-3 hover:text-ct-text-2 transition-colors"
                tabIndex={-1}
              >
                {showConfirm
                  ? <EyeOff size={15} strokeWidth={1.5} />
                  : <Eye    size={15} strokeWidth={1.5} />
                }
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-ct-loss text-xs flex items-center gap-1">
                <AlertCircle size={11} /> {errors.password_confirmation.message}
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
                Creating account…
              </span>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-ct-text-2 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-ct-accent hover:text-ct-accent/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Eye, EyeOff, Info, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Button, Checkbox, Field, Input } from '../components/ui';
import { Logo } from '../components/Logo';
import { DEMO_EMAIL, DEMO_PASSWORD, useAuth } from '../lib/auth';

export default function DemoLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError(null);
    setNotice('Demo credentials filled in. Click Sign In to continue.');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!email.trim() || !password) {
      setError('Please enter both an email address and a password.');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.error ?? 'Sign in failed.');
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" aria-label="TSoft home">
            <Logo />
          </Link>

          <div className="mt-10">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">Welcome to TSoft Admin</h1>
            <p className="mt-2 text-sm text-ink-muted">
              Sign in to explore the administration dashboard.
            </p>
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs text-amber-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              <strong className="font-semibold">DEMO ACCOUNT.</strong> This is a demonstration login
              with a mock authentication flow. It is not production-grade security and must never be
              used for a real system.
            </span>
          </div>

          <form className="mt-6" onSubmit={onSubmit} noValidate>
            <Field label="Email Address" htmlFor="email" required>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tsoft.demo"
                  autoComplete="username"
                />
              </div>
            </Field>

            <Field label="Password" htmlFor="password" required>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-ink"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                </button>
              </div>
            </Field>

            <div className="mb-5 flex items-center justify-between">
              <Checkbox id="remember" label="Remember me" checked={remember} onChange={setRemember} />
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    'Password recovery is not configured in this demonstration. Use the demo account instead.',
                  )
                }
                className="text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700" role="alert">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {error}
              </div>
            )}
            {notice && (
              <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-ink-soft" role="status">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                {notice}
              </div>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-3 w-full"
              onClick={fillDemo}
            >
              Use Demo Account
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs text-ink-muted">
            <p className="font-medium text-ink-soft">Demo credentials</p>
            <p className="mt-1">
              Email: <span className="font-mono text-ink-soft">admin@tsoft.demo</span>
            </p>
            <p>
              Password: <span className="font-mono text-ink-soft">TSoftDemo2026!</span>
            </p>
            <p className="mt-2">For the local demonstration experience only.</p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Website
          </Link>
        </div>
      </div>

      {/* Branding panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 lg:flex">
        <div>
          <Logo variant="dark" />
        </div>
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white">
            Administration built for clarity.
          </h2>
          <p className="mt-4 text-slate-400">
            Manage users, products, support, and system settings from a single dashboard. Every
            figure in this demonstration is fictional sample data.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Total Users', value: '2,340' },
              { label: 'Open Tickets', value: '3' },
              { label: 'Products', value: '4' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500">
          TSoft is a fictional demonstration company. Sample data only.
        </p>
      </div>
    </div>
  );
}

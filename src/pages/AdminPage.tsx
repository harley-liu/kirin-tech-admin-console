import { useEffect, useState, type ReactNode, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Lock, LogOut, Tag, Package, ShieldAlert, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CategoryManager from '../components/admin/CategoryManager';
import ProductManager from '../components/admin/ProductManager';

type Tab = 'products' | 'categories';

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [tab, setTab] = useState<Tab>('products');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    setCheckingAdmin(true);
    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setIsAdmin(!!data);
        setCheckingAdmin(false);
      });
  }, [session]);

  if (checkingSession) {
    return <CenteredState icon={<Loader2 className="w-6 h-6 animate-spin" />} message="Loading..." />;
  }

  if (!session) {
    return <LoginForm />;
  }

  if (checkingAdmin || isAdmin === null) {
    return <CenteredState icon={<Loader2 className="w-6 h-6 animate-spin" />} message="Checking access..." />;
  }

  if (!isAdmin) {
    return (
      <CenteredState
        icon={<ShieldAlert className="w-10 h-10 text-amber-500" />}
        message="Your account is signed in but isn't authorized for store admin access."
        sub={session.user.email ?? undefined}
        action={
          <button onClick={() => supabase.auth.signOut()} className="btn-secondary text-sm mt-4">
            Sign Out
          </button>
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative pt-32 pb-10 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-3">Store Admin</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Manage Categories &amp; Products</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300 hidden sm:inline">{session.user.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
            <TabButton active={tab === 'products'} onClick={() => setTab('products')} icon={<Package className="w-4 h-4" />}>
              Products
            </TabButton>
            <TabButton active={tab === 'categories'} onClick={() => setTab('categories')} icon={<Tag className="w-4 h-4" />}>
              Categories
            </TabButton>
          </div>

          {tab === 'products' ? <ProductManager /> : <CategoryManager />}
        </div>
      </section>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-3 -mb-px text-sm font-medium border-b-2 transition-colors ${
        active
          ? 'border-primary-600 text-primary-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function CenteredState({
  icon,
  message,
  sub,
  action,
}: {
  icon: ReactNode;
  message: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 px-4">
      <div className="text-center max-w-sm">
        <div className="flex items-center justify-center mb-4 text-gray-400">{icon}</div>
        <p className="text-white font-medium">{message}</p>
        {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
        {action}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signInError) setError(signInError.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 px-4">
      <div className="w-full max-w-sm">
        <div className="card p-8">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
            <Lock className="w-5 h-5 text-primary-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Store Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to manage categories and products.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { readStore, removeStore, writeStore } from './storage';

/*
 * DEMONSTRATION AUTHENTICATION ONLY.
 * This is a frontend-only mock login for the TSoft demo. It is not
 * production-grade authentication and must never be used to protect
 * real data or systems.
 */

export const DEMO_EMAIL = 'admin@tsoft.demo';
export const DEMO_PASSWORD = 'TSoftDemo2026!';

export interface SessionUser {
  name: string;
  email: string;
  role: string;
  signedInAt: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const SESSION_KEY = 'session';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() =>
    readStore<SessionUser | null>(SESSION_KEY, null),
  );

  const login = useCallback(async (email: string, password: string) => {
    // Simulated network latency so the demo shows a loading state.
    await new Promise((resolve) => setTimeout(resolve, 650));
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const session: SessionUser = {
        name: 'Alex Morgan',
        email: DEMO_EMAIL,
        role: 'Super Admin',
        signedInAt: new Date().toISOString(),
      };
      writeStore(SESSION_KEY, session);
      setUser(session);
      return { ok: true };
    }
    return {
      ok: false,
      error: 'Incorrect email or password. Use the demo account to continue.',
    };
  }, []);

  const logout = useCallback(() => {
    removeStore(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/demo-login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}

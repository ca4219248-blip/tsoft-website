import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Menu, UserRound } from 'lucide-react';
import { Badge } from '../ui';
import { useAuth } from '../../lib/auth';
import { initials } from '../../lib/utils';

export function Topbar({
  onOpenSidebar,
  unreadCount,
}: {
  onOpenSidebar: () => void;
  unreadCount: number;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-md p-2 text-ink-soft transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <span className="text-sm font-semibold text-ink">TSoft Admin</span>
        <Badge tone="warning" className="hidden sm:inline-flex">DEMO MODE</Badge>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/admin/notifications"
          className="relative rounded-md p-2 text-ink-soft transition-colors hover:bg-slate-100"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        >
          <Bell className="h-5 w-5" aria-hidden />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md px-1.5 py-1.5 transition-colors hover:bg-slate-100"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
              {initials(user?.name ?? 'Admin User')}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-ink">
                {user?.name ?? 'Admin User'}
              </span>
              <span className="block text-xs leading-tight text-ink-muted">{user?.role}</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-ink-muted sm:block" aria-hidden />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-raised"
            >
              <div className="border-b border-slate-100 px-4 py-2.5">
                <p className="text-sm font-medium text-ink">{user?.name}</p>
                <p className="truncate text-xs text-ink-muted">{user?.email}</p>
              </div>
              <Link
                to="/admin/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-slate-50"
              >
                <UserRound className="h-4 w-4" aria-hidden />
                My Profile
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                  navigate('/demo-login', { replace: true });
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

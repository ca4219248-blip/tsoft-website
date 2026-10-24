import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  Briefcase,
  Database,
  FileText,
  Gauge,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Plug,
  ShieldCheck,
  SlidersHorizontal,
  Ticket,
  UserCog,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '../Logo';
import { useAuth } from '../../lib/auth';
import { cn } from '../../lib/utils';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Management',
    items: [
      { to: '/admin/users', label: 'Users', icon: Users },
      { to: '/admin/administrators', label: 'Administrators', icon: UserCog },
      { to: '/admin/roles', label: 'Roles & Permissions', icon: ShieldCheck },
      { to: '/admin/products', label: 'Products', icon: Boxes },
      { to: '/admin/services', label: 'Services', icon: Briefcase },
    ],
  },
  {
    label: 'Communication',
    items: [
      { to: '/admin/notifications', label: 'Notifications', icon: Bell },
      { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
      { to: '/admin/tickets', label: 'Support Tickets', icon: Ticket },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/admin/reports', label: 'Reports', icon: FileText },
      { to: '/admin/activity', label: 'Activity Logs', icon: Activity },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', label: 'Website Settings', icon: SlidersHorizontal },
      { to: '/admin/security', label: 'Security', icon: ShieldCheck },
      { to: '/admin/api', label: 'API Management', icon: Plug },
      { to: '/admin/backups', label: 'Backup Management', icon: Database },
      { to: '/admin/system-health', label: 'System Health', icon: HeartPulse },
    ],
  },
  {
    label: 'Account',
    items: [{ to: '/admin/profile', label: 'My Profile', icon: UserRound }],
  },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/demo-login', { replace: true });
  };

  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-5">
        <NavLink to="/admin/dashboard" onClick={onNavigate} aria-label="TSoft admin home">
          <Logo />
        </NavLink>
      </div>

      <nav className="hide-scrollbar flex-1 overflow-y-auto px-3 py-4" aria-label="Admin">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-ink-soft hover:bg-slate-100 hover:text-ink',
                      )
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Logout
        </button>
      </div>
    </div>
  );
}

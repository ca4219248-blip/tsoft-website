import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useNotifications } from '../../lib/useNotifications';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { unreadCount } = useNotifications();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
          <Sidebar />
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setSidebarOpen(false)}
              aria-hidden
            />
            <div className="absolute inset-y-0 left-0 w-64">
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-h-screen w-full flex-col lg:pl-64">
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} unreadCount={unreadCount} />

          <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 sm:px-6">
            <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>
              Demonstration environment. All records, metrics, and financial figures are
              fictional sample data and do not represent a real system.
            </span>
          </div>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1200px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

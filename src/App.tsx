import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './lib/auth';
import { NotificationProvider } from './lib/useNotifications';
import { ToastProvider } from './components/ui/Toast';
import { SiteLayout } from './components/site/SiteLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoadingState } from './components/ui';

/* Public site — loaded eagerly for a fast first paint. */
import Home from './pages/site/Home';

/* Everything else is code-split so the initial bundle stays small. */
const About = lazy(() => import('./pages/site/About'));
const Services = lazy(() => import('./pages/site/Services'));
const Products = lazy(() => import('./pages/site/Products'));
const ProductDetail = lazy(() => import('./pages/site/ProductDetail'));
const Contact = lazy(() => import('./pages/site/Contact'));
const Privacy = lazy(() => import('./pages/site/Privacy'));
const Terms = lazy(() => import('./pages/site/Terms'));
const NotFound = lazy(() => import('./pages/site/NotFound'));
const DemoLogin = lazy(() => import('./pages/DemoLogin'));

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const Administrators = lazy(() => import('./pages/admin/Administrators'));
const Roles = lazy(() => import('./pages/admin/Roles'));
const ProductsAdmin = lazy(() => import('./pages/admin/ProductsAdmin'));
const ServicesAdmin = lazy(() => import('./pages/admin/ServicesAdmin'));
const Notifications = lazy(() => import('./pages/admin/Notifications'));
const Announcements = lazy(() => import('./pages/admin/Announcements'));
const Tickets = lazy(() => import('./pages/admin/Tickets'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const ActivityLogs = lazy(() => import('./pages/admin/ActivityLogs'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const Security = lazy(() => import('./pages/admin/Security'));
const ApiManagement = lazy(() => import('./pages/admin/ApiManagement'));
const Backups = lazy(() => import('./pages/admin/Backups'));
const SystemHealth = lazy(() => import('./pages/admin/SystemHealth'));
const Profile = lazy(() => import('./pages/admin/Profile'));

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingState label="Loading…" />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Route>

              <Route path="/demo-login" element={<DemoLogin />} />

              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="administrators" element={<Administrators />} />
                <Route path="roles" element={<Roles />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="activity" element={<ActivityLogs />} />
                <Route path="settings" element={<Settings />} />
                <Route path="security" element={<Security />} />
                <Route path="api" element={<ApiManagement />} />
                <Route path="backups" element={<Backups />} />
                <Route path="system-health" element={<SystemHealth />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Boxes, DollarSign, Ticket as TicketIcon, UserCheck, Users as UsersIcon } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  FilterDropdown,
  PageHeader,
  Pagination,
  SearchInput,
  StatCard,
} from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useCollection, paginate } from '../../lib/useCollection';
import { useNotifications } from '../../lib/useNotifications';
import {
  CHART_COLORS,
  activityOverviewData,
  seedActivity,
  seedTickets,
  seedUsers,
  trafficSourcesData,
  userGrowthData,
} from '../../lib/demoData';
import { formatCurrency, formatDate } from '../../lib/utils';
import type { ActivityLog, Ticket, User } from '../../lib/types';

const PAGE_SIZE = 5;

export default function Dashboard() {
  const { items: users } = useCollection<User>('users', seedUsers);
  const { items: tickets } = useCollection<Ticket>('tickets', seedTickets);
  const { items: activity } = useCollection<ActivityLog>('activity', seedActivity);
  const { unreadCount } = useNotifications();

  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All roles');
  const [status, setStatus] = useState('All statuses');
  const [page, setPage] = useState(1);

  const openTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        !query ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = role === 'All roles' || u.role === role;
      const matchesStatus = status === 'All statuses' || u.status === status;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, query, role, status]);

  const { slice, pageCount, page: safePage } = paginate(filteredUsers, page, PAGE_SIZE);

  const userColumns: Array<Column<User>> = [
    {
      key: 'name',
      header: 'Name',
      render: (u) => (
        <div>
          <p className="font-medium text-ink">{u.name}</p>
          <p className="text-xs text-ink-muted">{u.company}</p>
        </div>
      ),
    },
    { key: 'email', header: 'Email', render: (u) => <span className="text-ink-soft">{u.email}</span> },
    { key: 'role', header: 'Role', render: (u) => <StatusPill value={u.role} /> },
    { key: 'status', header: 'Status', render: (u) => <StatusPill value={u.status} /> },
    { key: 'joinedAt', header: 'Joined Date', render: (u) => formatDate(u.joinedAt) },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (u) => (
        <Link
          to="/admin/users"
          className="text-sm font-medium text-brand-700 hover:text-brand-800"
          onClick={(e) => e.stopPropagation()}
        >
          View details
        </Link>
      ),
    },
  ];

  const activityColumns: Array<Column<ActivityLog>> = [
    { key: 'action', header: 'Activity', render: (a) => <span className="font-medium text-ink">{a.action}</span> },
    { key: 'actor', header: 'User', render: (a) => <span className="text-ink-soft">{a.actor}</span> },
    { key: 'timestamp', header: 'Date', render: (a) => formatDate(a.timestamp) },
    { key: 'result', header: 'Status', render: (a) => <StatusPill value={a.result} /> },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Monitor your platform and manage operations."
        badge={<Badge tone="warning">DEMO MODE</Badge>}
        actions={
          <Link to="/admin/reports" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            View reports
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Users" value="2,340" icon={UsersIcon} delta={{ value: '8.4%', positive: true }} hint="vs last month" />
        <StatCard label="Active Users" value="1,706" icon={UserCheck} delta={{ value: '6.1%', positive: true }} hint="vs last month" />
        <StatCard label="Total Products" value="4" icon={Boxes} hint="fictional catalogue" />
        <StatCard label="Open Support Tickets" value={String(openTickets)} icon={TicketIcon} hint="open or in progress" />
        <StatCard label="Monthly Revenue" value={formatCurrency(48200)} icon={DollarSign} delta={{ value: '3.2%', positive: true }} hint="sample data" />
      </div>

      <p className="mt-3 text-xs text-ink-muted">
        Revenue and all other figures are fictional sample data for this demonstration, not actual earnings.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="User Growth" description="Total and active users over the last 12 months (sample)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
                <Area isAnimationActive={false} type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} fill="url(#usersFill)" name="Total users" />
                <Area isAnimationActive={false} type="monotone" dataKey="active" stroke="#0B1F3A" strokeWidth={2} fillOpacity={0} name="Active users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Traffic Sources" description="Share of sessions (sample)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie isAnimationActive={false}
                  data={trafficSourcesData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {trafficSourcesData.map((entry, i) => (
                    <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 border-t border-slate-100 px-5 py-3">
            {trafficSourcesData.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  {s.name}
                </span>
                <span className="font-medium text-ink">{s.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader title="Activity Overview" description="Sessions and recorded actions per month (sample)." />
        <div className="h-64 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityOverviewData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar isAnimationActive={false} dataKey="sessions" fill="#2563EB" radius={[3, 3, 0, 0]} name="Sessions" />
              <Bar isAnimationActive={false} dataKey="actions" fill="#93C5FD" radius={[3, 3, 0, 0]} name="Actions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Recent Activity" description="Latest recorded demonstration events." />
          <DataTable columns={activityColumns} rows={activity.slice(0, 6)} />
        </Card>

        <Card>
          <CardHeader
            title="Recent Users"
            description="Demonstration user records."
            actions={<Badge tone="neutral">{unreadCount} unread notifications</Badge>}
          />
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
            <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search users…" className="flex-1 min-w-[180px]" />
            <FilterDropdown label="Role" value={role} options={['All roles', 'Super Admin', 'Administrator', 'Editor', 'Support Agent']} onChange={(v) => { setRole(v); setPage(1); }} />
            <FilterDropdown label="Status" value={status} options={['All statuses', 'Active', 'Inactive', 'Pending', 'Suspended']} onChange={(v) => { setStatus(v); setPage(1); }} />
          </div>
          <DataTable
            columns={userColumns}
            rows={slice}
            footer={
              <Pagination page={safePage} pageCount={pageCount} total={filteredUsers.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
            }
          />
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => { setQuery(''); setRole('All roles'); setStatus('All statuses'); setPage(1); }}>
          Reset table filters
        </Button>
      </div>
    </>
  );
}

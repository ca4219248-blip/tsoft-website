import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge, Card, CardHeader, FilterDropdown, PageHeader } from '../../components/ui';
import {
  CHART_COLORS,
  activityOverviewData,
  pageViewsData,
  productUsageData,
  trafficSourcesData,
  userGrowthData,
} from '../../lib/demoData';

const RANGES: Record<string, number> = {
  'Last 3 months': 3,
  'Last 6 months': 6,
  'Last 12 months': 12,
};

const tooltipStyle = { borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 } as const;

export default function Analytics() {
  const [range, setRange] = useState('Last 12 months');
  const n = RANGES[range] ?? 12;

  const growth = userGrowthData.slice(-n);
  const activity = activityOverviewData.slice(-n);
  const views = pageViewsData.slice(-n);

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Usage and engagement across the demonstration platform."
        badge={<Badge tone="warning">SAMPLE DATA</Badge>}
        actions={<FilterDropdown label="Range" value={range} options={Object.keys(RANGES)} onChange={setRange} />}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="User growth" description="Total and active users (fictional sample data)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growth} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="anUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area isAnimationActive={false} type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} fill="url(#anUsers)" name="Total users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Active users" description="Monthly active users (fictional sample data)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growth} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line isAnimationActive={false} type="monotone" dataKey="active" stroke="#0B1F3A" strokeWidth={2} dot={false} name="Active users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Page views" description="Monthly page views (fictional sample data)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={views} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar isAnimationActive={false} dataKey="views" fill="#2563EB" radius={[3, 3, 0, 0]} name="Page views" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Sessions & actions" description="Engagement per month (fictional sample data)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activity} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar isAnimationActive={false} dataKey="sessions" fill="#2563EB" radius={[3, 3, 0, 0]} name="Sessions" />
                <Bar isAnimationActive={false} dataKey="actions" fill="#93C5FD" radius={[3, 3, 0, 0]} name="Actions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Traffic sources" description="Share of sessions (fictional sample data)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie isAnimationActive={false} data={trafficSourcesData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={2}>
                  {trafficSourcesData.map((entry, i) => (
                    <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
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

        <Card>
          <CardHeader title="Product usage" description="Share of usage by product (fictional sample data)." />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productUsageData} layout="vertical" margin={{ top: 8, right: 16, left: 16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar isAnimationActive={false} dataKey="value" fill="#2563EB" radius={[0, 3, 3, 0]} name="Usage %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        All figures on this page are fictional sample data for the demonstration and do not represent
        real usage.
      </p>
    </>
  );
}

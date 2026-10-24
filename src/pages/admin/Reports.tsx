import { useState } from 'react';
import { Download } from 'lucide-react';
import { Badge, Button, Card, CardHeader, PageHeader, Tabs } from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { exportToCsv } from '../../lib/csv';
import { seedActivity, seedProducts, seedTickets, seedUsers } from '../../lib/demoData';
import { formatDate } from '../../lib/utils';
import type { ActivityLog, Product, Ticket, User } from '../../lib/types';

const TABS = [
  { key: 'users', label: 'User Report' },
  { key: 'products', label: 'Product Report' },
  { key: 'support', label: 'Support Report' },
  { key: 'activity', label: 'Activity Report' },
];

export default function Reports() {
  const { notify } = useToast();
  const [tab, setTab] = useState('users');

  const userRows = seedUsers.map((u) => ({
    Name: u.name,
    Email: u.email,
    Company: u.company,
    Role: u.role,
    Status: u.status,
    Plan: u.plan,
    Joined: formatDate(u.joinedAt),
  }));

  const productRows = seedProducts.map((p) => ({
    Product: p.name,
    Category: p.category,
    Version: p.version,
    Status: p.status,
    'Active Users': p.activeUsers,
  }));

  const supportRows = seedTickets.map((t) => ({
    Ticket: t.id,
    Subject: t.subject,
    Customer: t.customer,
    Priority: t.priority,
    Status: t.status,
    Assignee: t.assignee ?? 'Unassigned',
    Created: formatDate(t.createdAt),
  }));

  const activityRows = seedActivity.map((a) => ({
    Timestamp: formatDate(a.timestamp),
    Actor: a.actor,
    Action: a.action,
    Module: a.module,
    Result: a.result,
  }));

  const datasets: Record<string, { filename: string; rows: Array<Record<string, unknown>> }> = {
    users: { filename: 'tsoft-user-report.csv', rows: userRows },
    products: { filename: 'tsoft-product-report.csv', rows: productRows },
    support: { filename: 'tsoft-support-report.csv', rows: supportRows },
    activity: { filename: 'tsoft-activity-report.csv', rows: activityRows },
  };

  const userColumns: Array<Column<User & { id: string }>> = [
    { key: 'name', header: 'Name', render: (u) => <span className="font-medium text-ink">{u.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'company', header: 'Company' },
    { key: 'role', header: 'Role', render: (u) => <StatusPill value={u.role} /> },
    { key: 'status', header: 'Status', render: (u) => <StatusPill value={u.status} /> },
  ];

  const productColumns: Array<Column<Product>> = [
    { key: 'name', header: 'Product', render: (p) => <span className="font-medium text-ink">{p.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'version', header: 'Version', render: (p) => 'v' + p.version },
    { key: 'status', header: 'Status', render: (p) => <StatusPill value={p.status} /> },
    { key: 'activeUsers', header: 'Active users', align: 'right' },
  ];

  const supportColumns: Array<Column<Ticket>> = [
    { key: 'id', header: 'Ticket', render: (t) => <span className="font-mono text-xs font-medium text-ink">{t.id}</span> },
    { key: 'subject', header: 'Subject' },
    { key: 'priority', header: 'Priority', render: (t) => <StatusPill value={t.priority} /> },
    { key: 'status', header: 'Status', render: (t) => <StatusPill value={t.status} /> },
    { key: 'assignee', header: 'Assignee', render: (t) => t.assignee ?? 'Unassigned' },
  ];

  const activityColumns: Array<Column<ActivityLog>> = [
    { key: 'timestamp', header: 'Timestamp', render: (a) => formatDate(a.timestamp) },
    { key: 'actor', header: 'Actor' },
    { key: 'action', header: 'Action' },
    { key: 'module', header: 'Module' },
    { key: 'result', header: 'Result', render: (a) => <StatusPill value={a.result} /> },
  ];

  const current = datasets[tab];

  const handleExport = () => {
    exportToCsv(current.filename, current.rows);
    notify('CSV export started', { description: current.filename, tone: 'info' });
  };

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Generate and export demonstration reports."
        badge={<Badge tone="warning">SAMPLE DATA</Badge>}
        actions={
          <Button icon={Download} variant="outline" onClick={handleExport}>
            Export CSV
          </Button>
        }
      />

      <Card>
        <div className="px-5 pt-4">
          <Tabs items={TABS} active={tab} onChange={setTab} />
        </div>

        {tab === 'users' && <DataTable columns={userColumns} rows={seedUsers} />}
        {tab === 'products' && <DataTable columns={productColumns} rows={seedProducts} />}
        {tab === 'support' && <DataTable columns={supportColumns} rows={seedTickets} />}
        {tab === 'activity' && <DataTable columns={activityColumns} rows={seedActivity} />}
      </Card>

      <Card className="mt-5">
        <CardHeader title="Export" description="Export the currently selected report as a CSV file." />
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <Button icon={Download} onClick={handleExport}>Export {TABS.find((t) => t.key === tab)?.label}</Button>
          <span className="text-sm text-ink-muted">{current.rows.length} rows · {current.filename}</span>
        </div>
      </Card>

      <p className="mt-3 text-xs text-ink-muted">
        All figures in these reports are fictional sample data for the demonstration.
      </p>
    </>
  );
}

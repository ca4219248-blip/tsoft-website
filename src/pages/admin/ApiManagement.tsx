import { Badge, Card, CardHeader, PageHeader } from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { seedIntegrations } from '../../lib/demoData';
import { formatDateTime } from '../../lib/utils';
import type { ApiIntegration } from '../../lib/types';

export default function ApiManagement() {
  const columns: Array<Column<ApiIntegration>> = [
    {
      key: 'name',
      header: 'Integration',
      render: (i) => (
        <div>
          <p className="font-medium text-ink">{i.name}</p>
          <p className="text-xs text-ink-muted">{i.provider}</p>
        </div>
      ),
    },
    { key: 'status', header: 'Connection status', render: (i) => <StatusPill value={i.status} /> },
    { key: 'maskedKey', header: 'Example key', render: (i) => <span className="font-mono text-xs text-ink-soft">{i.maskedKey}</span> },
    { key: 'lastSync', header: 'Last sync', render: (i) => (i.lastSync === '—' ? <span className="text-ink-muted">—</span> : formatDateTime(i.lastSync)) },
  ];

  return (
    <>
      <PageHeader
        title="API Management"
        subtitle="Sample API integrations and their demonstration connection status."
        badge={<Badge tone="warning">SAMPLE DATA</Badge>}
      />

      <Card>
        <CardHeader title="Integrations" description="All keys shown are masked examples. No real secrets are stored in this demo." />
        <DataTable columns={columns} rows={seedIntegrations} />
      </Card>

      <Card className="mt-5">
        <CardHeader title="Security note" />
        <p className="px-5 py-4 text-sm text-ink-soft">
          This page displays masked example keys only. No real API keys or secrets are present in
          this frontend application, and the connection statuses are sample data.
        </p>
      </Card>
    </>
  );
}

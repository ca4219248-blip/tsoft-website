import { AlertTriangle, CheckCircle2, CircleSlash } from 'lucide-react';
import { Badge, Card, CardHeader, PageHeader } from '../../components/ui';
import { seedActivity } from '../../lib/demoData';
import { formatDateTime } from '../../lib/utils';

type Status = 'operational' | 'demo' | 'not-connected';

const STATUS_META: Record<Status, { label: string; tone: 'success' | 'warning' | 'neutral'; icon: typeof CheckCircle2 }> = {
  operational: { label: 'Operational', tone: 'success', icon: CheckCircle2 },
  demo: { label: 'Demo Data', tone: 'warning', icon: AlertTriangle },
  'not-connected': { label: 'Not Connected', tone: 'neutral', icon: CircleSlash },
};

const SERVICES: Array<{ name: string; status: Status; note: string }> = [
  { name: 'Application', status: 'operational', note: 'The demo interface is running in your browser.' },
  { name: 'Frontend', status: 'operational', note: 'Static frontend assets are served correctly.' },
  { name: 'Backend connection', status: 'not-connected', note: 'No backend is configured for this demonstration.' },
  { name: 'Database connection', status: 'not-connected', note: 'No database is connected; data is stored in your browser.' },
  { name: 'Monitoring service', status: 'demo', note: 'Live metrics are unavailable, so sample values are not shown.' },
];

function StatusBadge({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return (
    <Badge tone={meta.tone}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {meta.label}
    </Badge>
  );
}

export default function SystemHealth() {
  const lastActivity = seedActivity[0];

  return (
    <>
      <PageHeader
        title="System Health"
        subtitle="Connection and service status for this demonstration."
        badge={<Badge tone="warning">DEMO DATA</Badge>}
      />

      <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink-soft">
        No real backend or monitoring service is connected. Rather than showing fabricated live
        metrics, unavailable services are labelled <strong className="font-medium text-ink">Demo Data</strong> or{' '}
        <strong className="font-medium text-ink">Not Connected</strong>.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <Card key={service.name} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">{service.name}</p>
              <StatusBadge status={service.status} />
            </div>
            <p className="mt-2 text-sm text-ink-soft">{service.note}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-5">
        <CardHeader title="Last demo activity" description="Most recent recorded demonstration event." />
        <dl className="grid gap-4 px-5 py-4 text-sm sm:grid-cols-2">
          <div><dt className="text-ink-muted">Timestamp</dt><dd className="mt-0.5 font-medium text-ink">{formatDateTime(lastActivity.timestamp)}</dd></div>
          <div><dt className="text-ink-muted">Actor</dt><dd className="mt-0.5 font-mono text-xs text-ink-soft">{lastActivity.actor}</dd></div>
          <div><dt className="text-ink-muted">Action</dt><dd className="mt-0.5 text-ink-soft">{lastActivity.action}</dd></div>
          <div><dt className="text-ink-muted">Module</dt><dd className="mt-0.5 text-ink-soft">{lastActivity.module}</dd></div>
        </dl>
      </Card>
    </>
  );
}

import { Badge, Card, CardHeader, PageHeader, StatCard } from '../../components/ui';
import { StatusPill } from '../../components/admin/pills';
import { seedAdmins } from '../../lib/demoData';
import { formatDateTime } from '../../lib/utils';
import { Clock, KeyRound, Lock, ShieldCheck, UserCheck } from 'lucide-react';

const LOGIN_ACTIVITY = [
  { id: '1', when: '2026-10-24T09:31:00Z', who: 'admin@tsoft.demo', result: 'Success', note: 'This browser session' },
  { id: '2', when: '2026-10-24T06:02:00Z', who: 'unknown', result: 'Failed', note: 'Blocked demonstration attempt' },
  { id: '3', when: '2026-10-23T17:02:00Z', who: 'jordan.ellis@tsoft.demo', result: 'Success', note: 'Web session' },
  { id: '4', when: '2026-10-22T11:48:00Z', who: 'meera.iyer@tsoft.demo', result: 'Success', note: 'Web session' },
  { id: '5', when: '2026-10-20T10:12:00Z', who: 'diego.alvarez@tsoft.demo', result: 'Failed', note: 'Account disabled' },
];

export default function Security() {
  const twoFactorEnabled = seedAdmins.filter((a) => a.twoFactor).length;

  return (
    <>
      <PageHeader
        title="Security"
        subtitle="Demonstration security overview. Values reflect sample data only."
        badge={<Badge tone="warning">DEMO DATA</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Administrators" value={String(seedAdmins.length)} icon={UserCheck} hint="demo accounts" />
        <StatCard label="2FA enabled" value={twoFactorEnabled + ' / ' + seedAdmins.length} icon={ShieldCheck} hint="simulated status" />
        <StatCard label="Active sessions" value="1" icon={Clock} hint="this demo session" />
        <StatCard label="Failed logins (7d)" value="2" icon={Lock} hint="sample data" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Demo login activity" description="Recent demonstration sign-in attempts." />
          <ul className="divide-y divide-slate-100">
            {LOGIN_ACTIVITY.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs text-ink-soft">{entry.who}</p>
                  <p className="text-xs text-ink-muted">{formatDateTime(entry.when)} · {entry.note}</p>
                </div>
                <StatusPill value={entry.result} />
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Session overview" />
            <div className="space-y-3 px-5 py-4 text-sm">
              <div className="flex items-center justify-between"><span className="text-ink-muted">Current session</span><span className="font-medium text-ink">Active</span></div>
              <div className="flex items-center justify-between"><span className="text-ink-muted">Session mechanism</span><span className="font-medium text-ink">Frontend demo (localStorage)</span></div>
              <div className="flex items-center justify-between"><span className="text-ink-muted">Production-grade auth</span><span className="font-medium text-red-600">No</span></div>
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-xs text-ink-muted">
              The demo login is a frontend-only simulation. It is not production-grade authentication.
            </p>
          </Card>

          <Card>
            <CardHeader title="Password policy" description="Demonstration policy information." />
            <ul className="space-y-2 px-5 py-4 text-sm text-ink-soft">
              <li className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-brand-600" aria-hidden /> Minimum length: 12 characters</li>
              <li className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-brand-600" aria-hidden /> Requires upper and lower case</li>
              <li className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-brand-600" aria-hidden /> Requires a number and a symbol</li>
              <li className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-brand-600" aria-hidden /> Rotation: every 180 days</li>
            </ul>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <CardHeader title="Permission overview" description="Simulated role assignments across demonstration administrators." />
        <ul className="divide-y divide-slate-100">
          {seedAdmins.map((admin) => (
            <li key={admin.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{admin.name}</p>
                <p className="text-xs text-ink-muted">{admin.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill value={admin.role} />
                <StatusPill value={admin.status} />
                <Badge tone={admin.twoFactor ? 'success' : 'neutral'}>{admin.twoFactor ? '2FA on' : '2FA off'}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-3 text-xs text-ink-muted">
        Security information on this page is sample data for the demonstration and does not reflect a
        real system.
      </p>
    </>
  );
}

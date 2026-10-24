import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Field,
  FilterDropdown,
  PageHeader,
  SearchInput,
  Select,
  Textarea,
} from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { useCollection } from '../../lib/useCollection';
import { seedAdmins, seedTickets } from '../../lib/demoData';
import { formatDate, formatDateTime, uid } from '../../lib/utils';
import type { Ticket, TicketPriority, TicketStatus } from '../../lib/types';

const PRIORITIES: TicketPriority[] = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES: TicketStatus[] = ['Open', 'In Progress', 'Resolved', 'Closed'];
const AGENTS = ['Unassigned', ...seedAdmins.filter((a) => a.status === 'Active').map((a) => a.name)];

export default function Tickets() {
  const { notify } = useToast();
  const { items, update, reset } = useCollection<Ticket>('tickets', seedTickets);
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('All priorities');
  const [status, setStatus] = useState('All statuses');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  const active = items.find((t) => t.id === activeId) ?? null;

  const filtered = useMemo(
    () =>
      items.filter((t) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || t.subject.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
        const matchesPriority = priority === 'All priorities' || t.priority === priority;
        const matchesStatus = status === 'All statuses' || t.status === status;
        return matchesQuery && matchesPriority && matchesStatus;
      }),
    [items, query, priority, status],
  );

  const columns: Array<Column<Ticket>> = [
    { key: 'id', header: 'Ticket', render: (t) => <span className="font-mono text-xs font-medium text-ink">{t.id}</span> },
    {
      key: 'subject',
      header: 'Subject',
      render: (t) => (
        <div>
          <p className="font-medium text-ink">{t.subject}</p>
          <p className="text-xs text-ink-muted">{t.customer}</p>
        </div>
      ),
    },
    { key: 'priority', header: 'Priority', render: (t) => <StatusPill value={t.priority} /> },
    { key: 'status', header: 'Status', render: (t) => <StatusPill value={t.status} /> },
    { key: 'createdAt', header: 'Created', render: (t) => formatDate(t.createdAt) },
    { key: 'assignee', header: 'Assignee', render: (t) => <span className="text-ink-soft">{t.assignee ?? 'Unassigned'}</span> },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (t) => (
        <button type="button" className="text-sm font-medium text-brand-700 hover:text-brand-800" onClick={() => { setActiveId(t.id); setReply(''); }}>
          View ticket
        </button>
      ),
    },
  ];

  const sendReply = () => {
    if (!active || !reply.trim()) return;
    const message = { id: uid('m'), author: 'Alex Morgan', kind: 'agent' as const, body: reply.trim(), at: new Date().toISOString() };
    update(active.id, { messages: [...active.messages, message], status: active.status === 'Open' ? 'In Progress' : active.status });
    setReply('');
    notify('Demo response added', { description: 'Stored in this demonstration only.' });
  };

  return (
    <>
      <PageHeader
        title="Support Tickets"
        subtitle="Review and respond to demonstration support tickets."
        actions={<Button variant="outline" onClick={() => { reset(); notify('Demo data restored', { tone: 'info' }); }}>Reset demo data</Button>}
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={setQuery} placeholder="Search tickets…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Priority" value={priority} options={['All priorities', ...PRIORITIES]} onChange={setPriority} />
          <FilterDropdown label="Status" value={status} options={['All statuses', ...STATUSES]} onChange={setStatus} />
        </div>
        <DataTable columns={columns} rows={filtered} emptyTitle="No tickets match your filters" />
      </Card>

      {active && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
          <div className="fixed inset-0 bg-ink/40" onClick={() => setActiveId(null)} aria-hidden />
          <div className="relative z-10 my-8 w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-raised">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-ink-muted">{active.id}</span>
                  <StatusPill value={active.priority} />
                  <StatusPill value={active.status} />
                </div>
                <h2 className="mt-2 text-base font-semibold text-ink">{active.subject}</h2>
                <p className="text-sm text-ink-muted">{active.customer} — {active.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setActiveId(null)}>Close</Button>
            </div>

            <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:grid-cols-2">
              <Field label="Status" htmlFor="t-status" className="mb-0">
                <Select id="t-status" value={active.status} onChange={(e) => update(active.id, { status: e.target.value as TicketStatus })}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
              </Field>
              <Field label="Assign administrator" htmlFor="t-assign" className="mb-0">
                <Select
                  id="t-assign"
                  value={active.assignee ?? 'Unassigned'}
                  onChange={(e) => update(active.id, { assignee: e.target.value === 'Unassigned' ? null : e.target.value })}
                >
                  {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
                </Select>
              </Field>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-5 py-4">
              {active.messages.map((m) => (
                <div key={m.id} className={'rounded-lg border px-4 py-3 ' + (m.kind === 'agent' ? 'border-brand-100 bg-brand-50' : 'border-slate-200 bg-white')}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-ink">{m.author}</p>
                    <span className="text-xs text-ink-muted">{formatDateTime(m.at)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-soft">{m.body}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 px-5 py-4">
              <Field label="Add demo response" htmlFor="t-reply" className="mb-2">
                <Textarea id="t-reply" rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a demonstration response…" />
              </Field>
              <div className="flex items-center justify-between gap-3">
                <Badge tone="neutral">Demo only — no message is sent</Badge>
                <Button icon={Send} onClick={sendReply} disabled={!reply.trim()}>Add Response</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

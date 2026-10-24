import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  FilterDropdown,
  PageHeader,
  Pagination,
  SearchInput,
} from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { exportToCsv } from '../../lib/csv';
import { useCollection, paginate } from '../../lib/useCollection';
import { seedActivity } from '../../lib/demoData';
import { formatDateTime } from '../../lib/utils';
import type { ActivityLog } from '../../lib/types';

const PAGE_SIZE = 10;

export default function ActivityLogs() {
  const { notify } = useToast();
  const { items } = useCollection<ActivityLog>('activity', seedActivity);
  const [query, setQuery] = useState('');
  const [module, setModule] = useState('All modules');
  const [result, setResult] = useState('All results');
  const [range, setRange] = useState('All time');
  const [page, setPage] = useState(1);

  const modules = useMemo(() => ['All modules', ...Array.from(new Set(items.map((a) => a.module)))], [items]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const windows: Record<string, number> = { 'All time': Infinity, 'Last 24 hours': 1, 'Last 7 days': 7, 'Last 30 days': 30 };
    const days = windows[range] ?? Infinity;
    return items.filter((a) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || a.action.toLowerCase().includes(q) || a.actor.toLowerCase().includes(q);
      const matchesModule = module === 'All modules' || a.module === module;
      const matchesResult = result === 'All results' || a.result === result;
      const withinRange = days === Infinity || now - new Date(a.timestamp).getTime() <= days * 86400000;
      return matchesQuery && matchesModule && matchesResult && withinRange;
    });
  }, [items, query, module, result, range]);

  const { slice, pageCount, page: safePage } = paginate(filtered, page, PAGE_SIZE);

  const columns: Array<Column<ActivityLog>> = [
    { key: 'timestamp', header: 'Timestamp', render: (a) => <span className="whitespace-nowrap text-ink-soft">{formatDateTime(a.timestamp)}</span> },
    { key: 'actor', header: 'Actor', render: (a) => <span className="font-mono text-xs text-ink-soft">{a.actor}</span> },
    { key: 'action', header: 'Action', render: (a) => <span className="font-medium text-ink">{a.action}</span> },
    { key: 'module', header: 'Module' },
    { key: 'result', header: 'Result', render: (a) => <StatusPill value={a.result} /> },
  ];

  return (
    <>
      <PageHeader
        title="Activity Logs"
        subtitle="Actions recorded within this demonstration application."
        badge={<Badge tone="neutral">Local demo records</Badge>}
        actions={
          <Button
            icon={Download}
            variant="outline"
            onClick={() => {
              exportToCsv('tsoft-activity-logs.csv', filtered.map((a) => ({
                Timestamp: formatDateTime(a.timestamp),
                Actor: a.actor,
                Action: a.action,
                Module: a.module,
                Result: a.result,
              })));
              notify('CSV export started', { description: 'tsoft-activity-logs.csv', tone: 'info' });
            }}
          >
            Export CSV
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search by action or actor…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Module" value={module} options={modules} onChange={(v) => { setModule(v); setPage(1); }} />
          <FilterDropdown label="Result" value={result} options={['All results', 'Success', 'Warning', 'Failed']} onChange={(v) => { setResult(v); setPage(1); }} />
          <FilterDropdown label="Range" value={range} options={['All time', 'Last 24 hours', 'Last 7 days', 'Last 30 days']} onChange={(v) => { setRange(v); setPage(1); }} />
        </div>
        <DataTable
          columns={columns}
          rows={slice}
          emptyTitle="No activity matches your filters"
          footer={<Pagination page={safePage} pageCount={pageCount} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />}
        />
      </Card>

      <p className="mt-3 text-xs text-ink-muted">
        These logs record actions performed inside this demonstration only. They do not represent
        real production activity or security events.
      </p>
    </>
  );
}

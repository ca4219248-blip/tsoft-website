import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Button,
  Card,
  ConfirmDialog,
  Field,
  FilterDropdown,
  Input,
  Modal,
  PageHeader,
  SearchInput,
  Select,
  Textarea,
} from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { useCollection } from '../../lib/useCollection';
import { seedAnnouncements } from '../../lib/demoData';
import { formatDate, uid } from '../../lib/utils';
import type { Announcement } from '../../lib/types';

const AUDIENCES: Announcement['audience'][] = ['All Users', 'Administrators', 'Customers', 'Developers'];

const emptyAnnouncement = (): Announcement => ({
  id: uid('ann'),
  title: '',
  body: '',
  audience: 'All Users',
  status: 'Draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export default function Announcements() {
  const { notify } = useToast();
  const { items, add, update, remove, reset } = useCollection<Announcement>('announcements', seedAnnouncements);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<Announcement | null>(null);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const filtered = useMemo(
    () =>
      items.filter((a) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q);
        const matchesStatus = status === 'All statuses' || a.status === status;
        return matchesQuery && matchesStatus;
      }),
    [items, query, status],
  );

  const save = () => {
    if (!editing) return;
    const next: typeof errors = {};
    if (!editing.title.trim()) next.title = 'Title is required.';
    if (!editing.body.trim()) next.body = 'Content is required.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const record: Announcement = { ...editing, updatedAt: new Date().toISOString() };
    if (isNew) {
      add(record);
      notify('Demo announcement created', { description: record.title });
    } else {
      update(record.id, record);
      notify('Announcement updated', { description: 'Changes saved to the demonstration interface.' });
    }
    setEditing(null);
  };

  const columns: Array<Column<Announcement>> = [
    {
      key: 'title',
      header: 'Announcement',
      render: (a) => (
        <div className="max-w-md">
          <p className="font-medium text-ink">{a.title}</p>
          <p className="line-clamp-1 text-xs text-ink-muted">{a.body}</p>
        </div>
      ),
    },
    { key: 'audience', header: 'Audience' },
    { key: 'status', header: 'Status', render: (a) => <StatusPill value={a.status} /> },
    { key: 'updatedAt', header: 'Updated', render: (a) => formatDate(a.updatedAt) },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (a) => (
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="text-sm font-medium text-ink-soft hover:text-ink" onClick={() => { setEditing({ ...a }); setIsNew(false); setErrors({}); }}>Edit</button>
          <button type="button" className="text-sm font-medium text-brand-700 hover:text-brand-800" onClick={() => { const st = a.status === 'Published' ? 'Draft' : 'Published'; update(a.id, { status: st, updatedAt: new Date().toISOString() }); notify(st === 'Published' ? 'Announcement published' : 'Announcement unpublished', { description: a.title, tone: 'info' }); }}>
            {a.status === 'Published' ? 'Unpublish' : 'Publish'}
          </button>
          <button type="button" className="text-sm font-medium text-red-600 hover:text-red-700" onClick={() => setDeleting(a)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Announcements"
        subtitle="Create and publish demonstration announcements."
        actions={
          <>
            <Button variant="outline" onClick={() => { reset(); notify('Demo data restored', { tone: 'info' }); }}>Reset demo data</Button>
            <Button icon={Plus} onClick={() => { setEditing(emptyAnnouncement()); setIsNew(true); setErrors({}); }}>Create Announcement</Button>
          </>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={setQuery} placeholder="Search announcements…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Status" value={status} options={['All statuses', 'Published', 'Draft']} onChange={setStatus} />
        </div>
        <DataTable columns={columns} rows={filtered} emptyTitle="No announcements found" />
      </Card>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={isNew ? 'Create demo announcement' : 'Edit announcement'}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>{isNew ? 'Create Announcement' : 'Save Changes'}</Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Title" htmlFor="an-title" required error={errors.title} className="sm:col-span-2">
              <Input id="an-title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </Field>
            <Field label="Content" htmlFor="an-body" required error={errors.body} className="sm:col-span-2">
              <Textarea id="an-body" rows={4} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
            </Field>
            <Field label="Audience" htmlFor="an-audience">
              <Select id="an-audience" value={editing.audience} onChange={(e) => setEditing({ ...editing, audience: e.target.value as Announcement['audience'] })}>
                {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
              </Select>
            </Field>
            <Field label="Status" htmlFor="an-status">
              <Select id="an-status" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Announcement['status'] })}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </Select>
            </Field>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete demo announcement"
        message={deleting ? 'Delete "' + deleting.title + '"? This only affects local demonstration data.' : ''}
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) {
            remove(deleting.id);
            notify('Demo announcement deleted', { description: deleting.title, tone: 'info' });
          }
          setDeleting(null);
        }}
      />
    </>
  );
}

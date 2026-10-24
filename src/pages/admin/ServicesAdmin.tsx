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
import { seedServices } from '../../lib/demoData';
import { formatDate, uid } from '../../lib/utils';
import type { Service, ServiceStatus } from '../../lib/types';

const CATEGORIES = ['Engineering', 'Design', 'Infrastructure', 'Operations', 'Consulting'];

const emptyService = (): Service => ({
  id: uid('svc'),
  name: '',
  category: 'Engineering',
  summary: '',
  description: '',
  capabilities: [],
  status: 'Draft',
  updatedAt: new Date().toISOString(),
});

export default function ServicesAdmin() {
  const { notify } = useToast();
  const { items, add, update, remove, reset } = useCollection<Service>('services', seedServices);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [capabilityText, setCapabilityText] = useState('');
  const [errors, setErrors] = useState<{ name?: string; summary?: string }>({});

  const filtered = useMemo(
    () =>
      items.filter((s) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q);
        const matchesCategory = category === 'All categories' || s.category === category;
        return matchesQuery && matchesCategory;
      }),
    [items, query, category],
  );

  const openNew = () => {
    setEditing(emptyService());
    setCapabilityText('');
    setIsNew(true);
    setErrors({});
  };

  const openEdit = (s: Service) => {
    setEditing({ ...s });
    setCapabilityText(s.capabilities.join('\n'));
    setIsNew(false);
    setErrors({});
  };

  const save = () => {
    if (!editing) return;
    const next: typeof errors = {};
    if (!editing.name.trim()) next.name = 'Service name is required.';
    if (!editing.summary.trim()) next.summary = 'A short summary is required.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const capabilities = capabilityText.split('\n').map((c) => c.trim()).filter(Boolean);
    const record: Service = { ...editing, capabilities, updatedAt: new Date().toISOString() };
    if (isNew) {
      add(record);
      notify('Demo service created', { description: record.name });
    } else {
      update(record.id, record);
      notify('Service updated', { description: 'Changes saved to the demonstration interface.' });
    }
    setEditing(null);
  };

  const columns: Array<Column<Service>> = [
    {
      key: 'name',
      header: 'Service',
      render: (s) => (
        <div>
          <p className="font-medium text-ink">{s.name}</p>
          <p className="text-xs text-ink-muted">{s.summary}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    { key: 'capabilities', header: 'Capabilities', align: 'center', render: (s) => String(s.capabilities.length) },
    { key: 'updatedAt', header: 'Updated', render: (s) => formatDate(s.updatedAt) },
    { key: 'status', header: 'Status', render: (s) => <StatusPill value={s.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (s) => (
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="text-sm font-medium text-ink-soft hover:text-ink" onClick={() => openEdit(s)}>Edit</button>
          <button type="button" className="text-sm font-medium text-brand-700 hover:text-brand-800" onClick={() => { const st: ServiceStatus = s.status === 'Published' ? 'Draft' : 'Published'; update(s.id, { status: st, updatedAt: new Date().toISOString() }); notify(st === 'Published' ? 'Service published' : 'Service unpublished', { description: s.name, tone: 'info' }); }}>
            {s.status === 'Published' ? 'Unpublish' : 'Publish'}
          </button>
          <button type="button" className="text-sm font-medium text-red-600 hover:text-red-700" onClick={() => setDeleting(s)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Create and manage the services shown on the public site (demonstration content)."
        actions={
          <>
            <Button variant="outline" onClick={() => { reset(); notify('Demo data restored', { tone: 'info' }); }}>Reset demo data</Button>
            <Button icon={Plus} onClick={openNew}>Create Service</Button>
          </>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={setQuery} placeholder="Search services…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Category" value={category} options={['All categories', ...CATEGORIES]} onChange={setCategory} />
        </div>
        <DataTable columns={columns} rows={filtered} emptyTitle="No services match your filters" />
      </Card>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={isNew ? 'Create demo service' : 'Edit service'}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>{isNew ? 'Create Service' : 'Save Changes'}</Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Service Name" htmlFor="s-name" required error={errors.name}>
              <Input id="s-name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Category" htmlFor="s-category">
              <Select id="s-category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Summary" htmlFor="s-summary" required error={errors.summary} className="sm:col-span-2">
              <Input id="s-summary" value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} />
            </Field>
            <Field label="Description" htmlFor="s-desc" className="sm:col-span-2">
              <Textarea id="s-desc" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </Field>
            <Field label="Key capabilities (one per line)" htmlFor="s-caps" className="sm:col-span-2">
              <Textarea id="s-caps" rows={4} value={capabilityText} onChange={(e) => setCapabilityText(e.target.value)} />
            </Field>
            <Field label="Status" htmlFor="s-status">
              <Select id="s-status" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as ServiceStatus })}>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </Select>
            </Field>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete demo service"
        message={deleting ? 'Delete ' + deleting.name + '? This only affects local demonstration data.' : ''}
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) {
            remove(deleting.id);
            notify('Demo service deleted', { description: deleting.name, tone: 'info' });
          }
          setDeleting(null);
        }}
      />
    </>
  );
}

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
import { seedProducts } from '../../lib/demoData';
import { formatNumber, uid } from '../../lib/utils';
import type { Product, ProductStatus } from '../../lib/types';

const CATEGORIES = ['Productivity', 'Analytics', 'Infrastructure', 'Integration', 'Security'];

const emptyProduct = (): Product => ({
  id: uid('prd'),
  slug: 'new-product-' + Math.random().toString(36).slice(2, 6),
  name: '',
  tagline: '',
  description: '',
  category: 'Productivity',
  features: [],
  status: 'Active',
  version: '1.0',
  activeUsers: 0,
});

export default function ProductsAdmin() {
  const { notify } = useToast();
  const { items, add, update, remove, reset } = useCollection<Product>('products', seedProducts);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [status, setStatus] = useState('All statuses');
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [featureText, setFeatureText] = useState('');
  const [errors, setErrors] = useState<{ name?: string; tagline?: string }>({});

  const filtered = useMemo(
    () =>
      items.filter((p) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
        const matchesCategory = category === 'All categories' || p.category === category;
        const matchesStatus = status === 'All statuses' || p.status === status;
        return matchesQuery && matchesCategory && matchesStatus;
      }),
    [items, query, category, status],
  );

  const openNew = () => {
    setEditing(emptyProduct());
    setFeatureText('');
    setIsNew(true);
    setErrors({});
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setFeatureText(p.features.join('\n'));
    setIsNew(false);
    setErrors({});
  };

  const save = () => {
    if (!editing) return;
    const next: typeof errors = {};
    if (!editing.name.trim()) next.name = 'Product name is required.';
    if (!editing.tagline.trim()) next.tagline = 'A short tagline is required.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const features = featureText.split('\n').map((f) => f.trim()).filter(Boolean);
    const record: Product = { ...editing, features };
    if (isNew) {
      add(record);
      notify('Demo product added', { description: record.name });
    } else {
      update(record.id, record);
      notify('Product updated', { description: 'Changes saved to the demonstration interface.' });
    }
    setEditing(null);
  };

  const columns: Array<Column<Product>> = [
    {
      key: 'name',
      header: 'Product',
      render: (p) => (
        <div>
          <p className="font-medium text-ink">{p.name}</p>
          <p className="text-xs text-ink-muted">{p.tagline}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    { key: 'version', header: 'Version', render: (p) => <span className="text-ink-soft">v{p.version}</span> },
    { key: 'activeUsers', header: 'Active users', align: 'right', render: (p) => formatNumber(p.activeUsers) },
    { key: 'status', header: 'Status', render: (p) => <StatusPill value={p.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (p) => (
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="text-sm font-medium text-ink-soft hover:text-ink" onClick={() => openEdit(p)}>Edit</button>
          <button type="button" className="text-sm font-medium text-brand-700 hover:text-brand-800" onClick={() => { const s: ProductStatus = p.status === 'Active' ? 'Inactive' : 'Active'; update(p.id, { status: s }); notify('Product ' + (s === 'Active' ? 'activated' : 'deactivated'), { description: p.name, tone: 'info' }); }}>
            {p.status === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
          <button type="button" className="text-sm font-medium text-red-600 hover:text-red-700" onClick={() => setDeleting(p)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Manage the fictional demonstration product catalogue."
        actions={
          <>
            <Button variant="outline" onClick={() => { reset(); notify('Demo data restored', { tone: 'info' }); }}>Reset demo data</Button>
            <Button icon={Plus} onClick={openNew}>Add Product</Button>
          </>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={setQuery} placeholder="Search products…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Category" value={category} options={['All categories', ...CATEGORIES]} onChange={setCategory} />
          <FilterDropdown label="Status" value={status} options={['All statuses', 'Active', 'Inactive']} onChange={setStatus} />
        </div>
        <DataTable columns={columns} rows={filtered} emptyTitle="No products match your filters" />
      </Card>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={isNew ? 'Add demo product' : 'Edit product'}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>{isNew ? 'Add Product' : 'Save Changes'}</Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Product Name" htmlFor="p-name" required error={errors.name}>
              <Input id="p-name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Tagline" htmlFor="p-tagline" required error={errors.tagline}>
              <Input id="p-tagline" value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} />
            </Field>
            <Field label="Category" htmlFor="p-category">
              <Select id="p-category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Status" htmlFor="p-status">
              <Select id="p-status" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as ProductStatus })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </Field>
            <Field label="Version" htmlFor="p-version">
              <Input id="p-version" value={editing.version} onChange={(e) => setEditing({ ...editing, version: e.target.value })} />
            </Field>
            <Field label="Active users (sample)" htmlFor="p-users">
              <Input id="p-users" type="number" value={editing.activeUsers} onChange={(e) => setEditing({ ...editing, activeUsers: Number(e.target.value) })} />
            </Field>
            <Field label="Description" htmlFor="p-desc" className="sm:col-span-2">
              <Textarea id="p-desc" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </Field>
            <Field label="Features (one per line)" htmlFor="p-features" className="sm:col-span-2">
              <Textarea id="p-features" rows={4} value={featureText} onChange={(e) => setFeatureText(e.target.value)} />
            </Field>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete demo product"
        message={deleting ? 'Delete ' + deleting.name + '? This only affects local demonstration data.' : ''}
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) {
            remove(deleting.id);
            notify('Demo product deleted', { description: deleting.name, tone: 'info' });
          }
          setDeleting(null);
        }}
      />
    </>
  );
}

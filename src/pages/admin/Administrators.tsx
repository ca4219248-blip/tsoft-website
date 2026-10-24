import { useMemo, useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import {
  Badge,
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
} from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { useCollection } from '../../lib/useCollection';
import { seedAdmins } from '../../lib/demoData';
import { formatDateTime, uid } from '../../lib/utils';
import type { AdminStatus, AdminUser, Role } from '../../lib/types';

const ROLES: Role[] = ['Super Admin', 'Administrator', 'Editor', 'Support Agent'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyAdmin = (): AdminUser => ({
  id: uid('adm'),
  name: '',
  email: '',
  role: 'Administrator',
  status: 'Active',
  lastLogin: new Date().toISOString(),
  twoFactor: false,
});

export default function Administrators() {
  const { notify } = useToast();
  const { items, add, update, reset } = useCollection<AdminUser>('admins', seedAdmins);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All roles');
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const filtered = useMemo(
    () =>
      items.filter((a) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
        const matchesRole = role === 'All roles' || a.role === role;
        return matchesQuery && matchesRole;
      }),
    [items, query, role],
  );

  const save = () => {
    if (!editing) return;
    const next: typeof errors = {};
    if (!editing.name.trim()) next.name = 'Name is required.';
    if (!editing.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_RE.test(editing.email.trim())) next.email = 'Enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    if (isNew) {
      add(editing);
      notify('Demo administrator added', { description: editing.name + ' was added.' });
    } else {
      update(editing.id, editing);
      notify('Administrator updated', { description: 'Changes saved to the demonstration interface.' });
    }
    setEditing(null);
  };

  const columns: Array<Column<AdminUser>> = [
    {
      key: 'name',
      header: 'Administrator',
      render: (a) => (
        <div>
          <p className="font-medium text-ink">{a.name}</p>
          <p className="text-xs text-ink-muted">{a.email}</p>
        </div>
      ),
    },
    { key: 'role', header: 'Role', render: (a) => <StatusPill value={a.role} /> },
    { key: 'status', header: 'Status', render: (a) => <StatusPill value={a.status} /> },
    { key: 'twoFactor', header: '2FA', render: (a) => <Badge tone={a.twoFactor ? 'success' : 'neutral'}>{a.twoFactor ? 'Enabled' : 'Off'}</Badge> },
    { key: 'lastLogin', header: 'Last login', render: (a) => formatDateTime(a.lastLogin) },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (a) => (
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="text-sm font-medium text-ink-soft hover:text-ink" onClick={() => { setEditing({ ...a }); setIsNew(false); setErrors({}); }}>
            Edit
          </button>
          <button
            type="button"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
            onClick={() => {
              const nextStatus: AdminStatus = a.status === 'Active' ? 'Disabled' : 'Active';
              update(a.id, { status: nextStatus });
              notify(nextStatus === 'Active' ? 'Administrator enabled' : 'Administrator disabled', { description: a.name, tone: 'info' });
            }}
          >
            {a.status === 'Active' ? 'Disable' : 'Enable'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Administrators"
        subtitle="Manage demonstration administrator accounts. Role-based access is simulated."
        actions={
          <>
            <Button variant="outline" onClick={() => { reset(); notify('Demo data restored', { tone: 'info' }); }}>
              Reset demo data
            </Button>
            <Button icon={Plus} onClick={() => { setEditing(emptyAdmin()); setIsNew(true); setErrors({}); }}>
              Add Administrator
            </Button>
          </>
        }
      />

      <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink-soft">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
        <span>
          Role-based permissions in this demonstration are simulated in the interface. Without a
          secure backend enforcing them, they do not provide real access control.
        </span>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={setQuery} placeholder="Search administrators…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Role" value={role} options={['All roles', ...ROLES]} onChange={setRole} />
        </div>
        <DataTable columns={columns} rows={filtered} emptyTitle="No administrators found" />
      </Card>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={isNew ? 'Add demo administrator' : 'Edit administrator'}
        description="Demonstration record — stored locally in your browser."
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>{isNew ? 'Add Administrator' : 'Save Changes'}</Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Full Name" htmlFor="a-name" required error={errors.name}>
              <Input id="a-name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Email" htmlFor="a-email" required error={errors.email}>
              <Input id="a-email" type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
            </Field>
            <Field label="Role" htmlFor="a-role">
              <Select id="a-role" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value as Role })}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Status" htmlFor="a-status">
              <Select id="a-status" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as AdminStatus })}>
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </Select>
            </Field>
          </div>
        )}
      </Modal>
    </>
  );
}

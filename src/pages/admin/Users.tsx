import { useMemo, useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import {
  Button,
  Card,
  ConfirmDialog,
  Field,
  FilterDropdown,
  Input,
  Modal,
  PageHeader,
  Pagination,
  SearchInput,
  Select,
} from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { useCollection, paginate } from '../../lib/useCollection';
import { seedUsers } from '../../lib/demoData';
import { formatDate, uid } from '../../lib/utils';
import type { Role, User, UserStatus } from '../../lib/types';

const PAGE_SIZE = 8;
const ROLES: Role[] = ['Super Admin', 'Administrator', 'Editor', 'Support Agent'];
const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Suspended'];
const PLANS: User['plan'][] = ['Starter', 'Professional', 'Enterprise'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = (): User => ({
  id: uid('usr'),
  name: '',
  email: '',
  company: '',
  role: 'Editor',
  status: 'Active',
  joinedAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  plan: 'Professional',
});

export default function Users() {
  const { notify } = useToast();
  const { items, add, update, remove, reset } = useCollection<User>('users', seedUsers);

  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All roles');
  const [status, setStatus] = useState('All statuses');
  const [page, setPage] = useState(1);

  const [editing, setEditing] = useState<User | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [viewing, setViewing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string }>({});

  const filtered = useMemo(
    () =>
      items.filter((u) => {
        const q = query.toLowerCase();
        const matchesQuery =
          !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.company.toLowerCase().includes(q);
        const matchesRole = role === 'All roles' || u.role === role;
        const matchesStatus = status === 'All statuses' || u.status === status;
        return matchesQuery && matchesRole && matchesStatus;
      }),
    [items, query, role, status],
  );

  const { slice, pageCount, page: safePage } = paginate(filtered, page, PAGE_SIZE);

  const openNew = () => {
    setEditing(emptyForm());
    setIsNew(true);
    setErrors({});
  };

  const openEdit = (user: User) => {
    setEditing({ ...user });
    setIsNew(false);
    setErrors({});
  };

  const save = () => {
    if (!editing) return;
    const next: typeof errors = {};
    if (!editing.name.trim()) next.name = 'Name is required.';
    if (!editing.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_RE.test(editing.email.trim())) next.email = 'Enter a valid email address.';
    if (!editing.company.trim()) next.company = 'Company is required.';
    setErrors(next);
    if (Object.keys(next).length) return;

    if (isNew) {
      add(editing);
      notify('Demo user added', { description: editing.name + ' was added to the demonstration list.' });
    } else {
      update(editing.id, editing);
      notify('Demo user updated', { description: 'Changes saved to the demonstration interface.' });
    }
    setEditing(null);
  };

  const columns: Array<Column<User>> = [
    {
      key: 'name',
      header: 'User',
      render: (u) => (
        <div>
          <p className="font-medium text-ink">{u.name}</p>
          <p className="text-xs text-ink-muted">{u.company}</p>
        </div>
      ),
    },
    { key: 'email', header: 'Email', render: (u) => <span className="text-ink-soft">{u.email}</span> },
    { key: 'role', header: 'Role', render: (u) => <StatusPill value={u.role} /> },
    { key: 'status', header: 'Status', render: (u) => <StatusPill value={u.status} /> },
    { key: 'joined', header: 'Joined', render: (u) => formatDate(u.joinedAt) },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (u) => (
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="text-sm font-medium text-brand-700 hover:text-brand-800" onClick={() => setViewing(u)}>
            View
          </button>
          <button type="button" className="text-sm font-medium text-ink-soft hover:text-ink" onClick={() => openEdit(u)}>
            Edit
          </button>
          <button type="button" className="text-sm font-medium text-red-600 hover:text-red-700" onClick={() => setDeleting(u)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage demonstration user records. These are fictional sample accounts."
        actions={
          <>
            <Button variant="outline" onClick={() => { reset(); notify('Demo data restored', { tone: 'info' }); }}>
              Reset demo data
            </Button>
            <Button icon={Plus} onClick={openNew}>
              Add User
            </Button>
          </>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3">
          <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search by name, email or company…" className="flex-1 min-w-[200px]" />
          <FilterDropdown label="Role" value={role} options={['All roles', ...ROLES]} onChange={(v) => { setRole(v); setPage(1); }} />
          <FilterDropdown label="Status" value={status} options={['All statuses', ...STATUSES]} onChange={(v) => { setStatus(v); setPage(1); }} />
        </div>

        <DataTable
          columns={columns}
          rows={slice}
          emptyTitle="No users match your filters"
          emptyDescription="Try a different search term or reset the filters."
          footer={<Pagination page={safePage} pageCount={pageCount} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />}
        />
      </Card>

      <p className="mt-3 text-xs text-ink-muted">
        All add, edit, and delete actions update this demonstration interface only and are stored in
        your browser. They do not modify any real customer accounts.
      </p>

      {/* Add / edit modal */}
      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={isNew ? 'Add demo user' : 'Edit demo user'}
        description="Demonstration record — stored locally in your browser."
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button icon={isNew ? UserPlus : undefined} onClick={save}>
              {isNew ? 'Add User' : 'Save Changes'}
            </Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Full Name" htmlFor="u-name" required error={errors.name}>
              <Input id="u-name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Email" htmlFor="u-email" required error={errors.email}>
              <Input id="u-email" type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
            </Field>
            <Field label="Company" htmlFor="u-company" required error={errors.company}>
              <Input id="u-company" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} />
            </Field>
            <Field label="Role" htmlFor="u-role">
              <Select id="u-role" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value as Role })}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Select>
            </Field>
            <Field label="Status" htmlFor="u-status">
              <Select id="u-status" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as UserStatus })}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <Field label="Plan" htmlFor="u-plan">
              <Select id="u-plan" value={editing.plan} onChange={(e) => setEditing({ ...editing, plan: e.target.value as User['plan'] })}>
                {PLANS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Select>
            </Field>
          </div>
        )}
      </Modal>

      {/* View details */}
      <Modal open={Boolean(viewing)} onClose={() => setViewing(null)} title="User details" size="md">
        {viewing && (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-ink-muted">Name</dt><dd className="mt-0.5 font-medium text-ink">{viewing.name}</dd></div>
            <div><dt className="text-ink-muted">Email</dt><dd className="mt-0.5 text-ink-soft">{viewing.email}</dd></div>
            <div><dt className="text-ink-muted">Company</dt><dd className="mt-0.5 text-ink-soft">{viewing.company}</dd></div>
            <div><dt className="text-ink-muted">Role</dt><dd className="mt-0.5"><StatusPill value={viewing.role} /></dd></div>
            <div><dt className="text-ink-muted">Status</dt><dd className="mt-0.5"><StatusPill value={viewing.status} /></dd></div>
            <div><dt className="text-ink-muted">Plan</dt><dd className="mt-0.5"><StatusPill value={viewing.plan} /></dd></div>
            <div><dt className="text-ink-muted">Joined</dt><dd className="mt-0.5 text-ink-soft">{formatDate(viewing.joinedAt)}</dd></div>
            <div><dt className="text-ink-muted">Last active</dt><dd className="mt-0.5 text-ink-soft">{formatDate(viewing.lastActive)}</dd></div>
          </dl>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete demo user"
        message={deleting ? 'Delete ' + deleting.name + ' from the demonstration list? This only affects local demo data.' : ''}
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) {
            remove(deleting.id);
            notify('Demo user deleted', { description: deleting.name + ' was removed from the demo list.', tone: 'info' });
          }
          setDeleting(null);
        }}
      />
    </>
  );
}

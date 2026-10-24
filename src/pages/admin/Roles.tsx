import { Check, Minus } from 'lucide-react';
import { Badge, Card, CardHeader, PageHeader } from '../../components/ui';
import { permissionMatrix } from '../../lib/demoData';
import type { Role } from '../../lib/types';

const ROLE_INFO: Array<{ role: Role; description: string }> = [
  { role: 'Super Admin', description: 'Full access to every module, including settings and security.' },
  { role: 'Administrator', description: 'Manages users, products, services, and support operations.' },
  { role: 'Editor', description: 'Can view most modules and edit content such as products and services.' },
  { role: 'Support Agent', description: 'Focuses on support tickets and assisting users.' },
];

const PERMISSIONS: Array<keyof (typeof permissionMatrix)[number]['roles'][Role]> = [
  'view',
  'create',
  'edit',
  'delete',
  'settings',
];

const LABELS: Record<string, string> = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
  settings: 'Manage Settings',
};

export default function Roles() {
  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Define what each role can do. Permissions here are simulated in the interface."
        badge={<Badge tone="warning">SIMULATED</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ROLE_INFO.map((info) => (
          <Card key={info.role} className="p-5">
            <p className="text-sm font-semibold text-ink">{info.role}</p>
            <p className="mt-2 text-sm text-ink-soft">{info.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Permissions matrix"
          description="Demonstration permissions. Without a secure backend, these are illustrative only and are not enforced."
        />
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">Module</th>
                {ROLE_INFO.map((r) => (
                  <th key={r.role} scope="col" className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {r.role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row) => (
                <tr key={row.module} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{row.module}</td>
                  {ROLE_INFO.map((r) => {
                    const perms = row.roles[r.role];
                    const count = PERMISSIONS.filter((p) => perms[p]).length;
                    return (
                      <td key={r.role} className="px-4 py-3">
                        {count === 0 ? (
                          <span className="flex items-center justify-center text-slate-300" title="No access">
                            <Minus className="h-4 w-4" aria-hidden />
                          </span>
                        ) : (
                          <div className="flex flex-wrap items-center justify-center gap-1">
                            {PERMISSIONS.filter((p) => perms[p]).map((p) => (
                              <span key={p} className="inline-flex items-center gap-0.5 rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">
                                <Check className="h-3 w-3" aria-hidden />
                                {LABELS[p]}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-3 text-xs text-ink-muted">
        Role-based permissions are simulated if there is no secure backend enforcing them.
      </p>
    </>
  );
}

import { useState } from 'react';
import { Save } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  PageHeader,
  Textarea,
} from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../lib/auth';
import { readStore, writeStore } from '../../lib/storage';
import { formatDateTime, initials } from '../../lib/utils';

interface ProfileState {
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  bio: string;
}

const KEY = 'profile';

export default function Profile() {
  const { notify } = useToast();
  const { user } = useAuth();
  const defaults: ProfileState = {
    name: user?.name ?? 'Alex Morgan',
    email: user?.email ?? 'admin@tsoft.demo',
    jobTitle: 'Platform Administrator',
    phone: '+1 (555) 0100',
    bio: 'Demonstration administrator account for the TSoft admin dashboard.',
  };
  const [form, setForm] = useState<ProfileState>(() => readStore<ProfileState>(KEY, defaults));

  const set = <K extends keyof ProfileState>(key: K, value: ProfileState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const save = () => {
    writeStore(KEY, form);
    notify('Profile saved', { description: 'Stored locally in your browser for this demo.' });
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Manage your demonstration administrator profile."
        badge={<Badge tone="warning">DEMO MODE</Badge>}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Profile information" description="Changes are stored locally in your browser." />
            <div className="grid gap-x-6 p-5 sm:grid-cols-2">
              <Field label="Full Name" htmlFor="pr-name">
                <Input id="pr-name" value={form.name} onChange={(e) => set('name', e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="pr-email">
                <Input id="pr-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
              </Field>
              <Field label="Job Title" htmlFor="pr-title">
                <Input id="pr-title" value={form.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} />
              </Field>
              <Field label="Phone" htmlFor="pr-phone">
                <Input id="pr-phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </Field>
              <Field label="Bio" htmlFor="pr-bio" className="sm:col-span-2">
                <Textarea id="pr-bio" rows={3} value={form.bio} onChange={(e) => set('bio', e.target.value)} />
              </Field>
            </div>
            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <Button icon={Save} onClick={save}>Save Changes</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700">
                {initials(form.name)}
              </span>
              <div>
                <p className="text-base font-semibold text-ink">{form.name}</p>
                <p className="text-sm text-ink-muted">{form.jobTitle}</p>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-ink-muted">Role</span><Badge tone="brand">{user?.role ?? 'Super Admin'}</Badge></div>
              <div className="flex items-center justify-between"><span className="text-ink-muted">Email</span><span className="truncate text-ink-soft">{form.email}</span></div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Demo session" />
            <div className="space-y-2 px-5 py-4 text-sm">
              <div className="flex items-center justify-between"><span className="text-ink-muted">Signed in</span><span className="text-ink-soft">{user ? formatDateTime(user.signedInAt) : '—'}</span></div>
              <div className="flex items-center justify-between"><span className="text-ink-muted">Session type</span><span className="text-ink-soft">Frontend demo</span></div>
              <div className="flex items-center justify-between"><span className="text-ink-muted">Storage</span><span className="text-ink-soft">Browser localStorage</span></div>
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-xs text-ink-muted">
              This is a demonstration session, not production-grade authentication.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

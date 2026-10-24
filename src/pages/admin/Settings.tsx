import { useEffect, useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  PageHeader,
  Select,
  Tabs,
  Toggle,
} from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { readStore, writeStore } from '../../lib/storage';

interface SettingsState {
  companyName: string;
  websiteTitle: string;
  description: string;
  contactEmail: string;
  timezone: string;
  primaryColor: string;
  secondaryColor: string;
  metaTitle: string;
  metaDescription: string;
  maintenanceMode: boolean;
}

const DEFAULTS: SettingsState = {
  companyName: 'TSoft',
  websiteTitle: 'TSoft — Technology That Moves Your Business Forward',
  description: 'TSoft builds reliable software solutions for modern businesses.',
  contactEmail: 'hello@tsoft.demo',
  timezone: 'UTC+00:00 — London',
  primaryColor: '#2563EB',
  secondaryColor: '#0B1F3A',
  metaTitle: 'TSoft — Enterprise Software Solutions',
  metaDescription: 'Reliable software solutions for modern businesses.',
  maintenanceMode: false,
};

const KEY = 'settings';

export default function Settings() {
  const { notify } = useToast();
  const [tab, setTab] = useState('general');
  const [form, setForm] = useState<SettingsState>(() => readStore<SettingsState>(KEY, DEFAULTS));
  const [saved, setSaved] = useState<SettingsState>(form);

  useEffect(() => {
    setSaved(form);
  }, [form]);

  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  const save = () => {
    writeStore(KEY, form);
    setSaved(form);
    notify('Settings saved', { description: 'Stored locally in your browser for this demo.' });
  };

  const reset = () => {
    setForm(DEFAULTS);
    writeStore(KEY, DEFAULTS);
    setSaved(DEFAULTS);
    notify('Settings reset to defaults', { tone: 'info' });
  };

  const set = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <PageHeader
        title="Website Settings"
        subtitle="Configure demonstration settings. Changes are stored locally in your browser."
        badge={dirty ? <Badge tone="warning">Unsaved changes</Badge> : undefined}
        actions={
          <>
            <Button variant="outline" icon={RotateCcw} onClick={reset}>Reset</Button>
            <Button icon={Save} onClick={save} disabled={!dirty}>Save Changes</Button>
          </>
        }
      />

      <Card>
        <div className="px-5 pt-4">
          <Tabs
            items={[
              { key: 'general', label: 'General' },
              { key: 'branding', label: 'Branding' },
              { key: 'seo', label: 'SEO' },
              { key: 'maintenance', label: 'Maintenance' },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        <div className="p-5">
          {tab === 'general' && (
            <div className="grid gap-x-6 sm:grid-cols-2">
              <Field label="Company Name" htmlFor="set-company">
                <Input id="set-company" value={form.companyName} onChange={(e) => set('companyName', e.target.value)} />
              </Field>
              <Field label="Website Title" htmlFor="set-title">
                <Input id="set-title" value={form.websiteTitle} onChange={(e) => set('websiteTitle', e.target.value)} />
              </Field>
              <Field label="Contact Email" htmlFor="set-email">
                <Input id="set-email" type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} />
              </Field>
              <Field label="Timezone" htmlFor="set-tz">
                <Select id="set-tz" value={form.timezone} onChange={(e) => set('timezone', e.target.value)}>
                  {['UTC+00:00 — London', 'UTC+01:00 — Berlin', 'UTC+05:30 — Mumbai', 'UTC-05:00 — New York', 'UTC+09:00 — Tokyo'].map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Description" htmlFor="set-desc" className="sm:col-span-2">
                <Input id="set-desc" value={form.description} onChange={(e) => set('description', e.target.value)} />
              </Field>
            </div>
          )}

          {tab === 'branding' && (
            <div className="grid gap-x-6 sm:grid-cols-2">
              <Field label="Primary Color" htmlFor="set-primary">
                <div className="flex items-center gap-3">
                  <input id="set-primary" type="color" value={form.primaryColor} onChange={(e) => set('primaryColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-white p-1" />
                  <Input value={form.primaryColor} onChange={(e) => set('primaryColor', e.target.value)} />
                </div>
              </Field>
              <Field label="Secondary Color" htmlFor="set-secondary">
                <div className="flex items-center gap-3">
                  <input id="set-secondary" type="color" value={form.secondaryColor} onChange={(e) => set('secondaryColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-white p-1" />
                  <Input value={form.secondaryColor} onChange={(e) => set('secondaryColor', e.target.value)} />
                </div>
              </Field>
              <Field label="Website Title" htmlFor="set-brand-title" className="sm:col-span-2">
                <Input id="set-brand-title" value={form.websiteTitle} onChange={(e) => set('websiteTitle', e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <p className="label">Logo preview</p>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md" style={{ background: form.primaryColor }}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path d="M4 6h16M12 6v13M7.5 19h9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-lg font-semibold" style={{ color: form.secondaryColor }}>{form.companyName}</span>
                </div>
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div>
              <Field label="Meta Title" htmlFor="set-meta-title">
                <Input id="set-meta-title" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
              </Field>
              <Field label="Meta Description" htmlFor="set-meta-desc">
                <Input id="set-meta-desc" value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} />
              </Field>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-ink-muted">Search preview</p>
                <p className="mt-1 text-sm font-medium text-brand-700">{form.metaTitle}</p>
                <p className="text-xs text-emerald-700">https://tsoft.demo</p>
                <p className="mt-1 text-sm text-ink-soft">{form.metaDescription}</p>
              </div>
            </div>
          )}

          {tab === 'maintenance' && (
            <div className="space-y-5">
              <Toggle
                id="set-maintenance"
                label="Maintenance mode"
                description="Show a maintenance notice to visitors."
                checked={form.maintenanceMode}
                onChange={(v) => set('maintenanceMode', v)}
              />
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                This toggle is a simulation. It does not take the public website offline, and no
                maintenance page is actually served in this demonstration.
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

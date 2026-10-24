import { Badge, type BadgeTone } from '../ui';

const TONE_MAP: Record<string, BadgeTone> = {
  Active: 'success',
  Inactive: 'neutral',
  Pending: 'warning',
  Suspended: 'danger',
  Disabled: 'danger',
  Open: 'brand',
  'In Progress': 'warning',
  Resolved: 'success',
  Closed: 'neutral',
  Low: 'neutral',
  Medium: 'info',
  High: 'warning',
  Urgent: 'danger',
  Published: 'success',
  Draft: 'neutral',
  Connected: 'success',
  'Not Connected': 'neutral',
  Error: 'danger',
  Completed: 'success',
  Running: 'warning',
  Failed: 'danger',
  Success: 'success',
  Warning: 'warning',
  'Super Admin': 'brand',
  Administrator: 'info',
  Editor: 'neutral',
  'Support Agent': 'neutral',
  Starter: 'neutral',
  Professional: 'info',
  Enterprise: 'brand',
};

export function StatusPill({ value }: { value: string }) {
  return <Badge tone={TONE_MAP[value] ?? 'neutral'}>{value}</Badge>;
}

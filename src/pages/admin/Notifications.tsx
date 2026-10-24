import { useMemo, useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Badge, Button, Card, CardHeader, EmptyState, PageHeader, Tabs } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { useNotifications } from '../../lib/useNotifications';
import { formatRelative } from '../../lib/utils';
import type { NotificationItem } from '../../lib/types';

const CATEGORIES = ['All', 'System', 'Security', 'Billing', 'Product'] as const;

export default function Notifications() {
  const { notify } = useToast();
  const { items, markRead, markAllRead, remove, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<string>('All');

  const filtered = useMemo(
    () => items.filter((n) => filter === 'All' || n.category === filter),
    [items, filter],
  );

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Demonstration notifications generated for this demo environment."
        badge={<Badge tone="neutral">{unreadCount} unread</Badge>}
        actions={
          <Button icon={CheckCheck} variant="outline" onClick={() => { markAllRead(); notify('All notifications marked as read', { tone: 'info' }); }}>
            Mark all as read
          </Button>
        }
      />

      <Card>
        <div className="px-5 pt-4">
          <Tabs
            items={CATEGORIES.map((c) => ({ key: c, label: c }))}
            active={filter}
            onChange={setFilter}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Bell} title="No notifications" description="There are no notifications in this category." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((n: NotificationItem) => (
              <li key={n.id} className={'flex items-start gap-4 px-5 py-4 ' + (n.read ? '' : 'bg-brand-50/40')}>
                <span className={'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ' + (n.read ? 'bg-slate-100 text-ink-muted' : 'bg-brand-100 text-brand-700')}>
                  <Bell className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-ink">{n.title}</p>
                    <Badge tone="neutral">{n.category}</Badge>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-brand-600" aria-label="Unread" />}
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{n.body}</p>
                  <p className="mt-1 text-xs text-ink-muted">{formatRelative(n.createdAt)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {!n.read && (
                    <button type="button" className="text-xs font-medium text-brand-700 hover:text-brand-800" onClick={() => markRead(n.id)}>
                      Mark as read
                    </button>
                  )}
                  <button type="button" aria-label="Delete notification" className="rounded p-1 text-ink-muted transition-colors hover:bg-slate-100 hover:text-red-600" onClick={() => remove(n.id)}>
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mt-5">
        <CardHeader title="About these notifications" />
        <p className="px-5 py-4 text-sm text-ink-soft">
          Notifications are stored locally in your browser for this demonstration. They do not
          represent real system events or security alerts.
        </p>
      </Card>
    </>
  );
}

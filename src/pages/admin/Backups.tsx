import { useState } from 'react';
import { DatabaseBackup } from 'lucide-react';
import { Badge, Button, Card, CardHeader, PageHeader } from '../../components/ui';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/admin/pills';
import { useToast } from '../../components/ui/Toast';
import { useCollection } from '../../lib/useCollection';
import { seedBackups } from '../../lib/demoData';
import { formatDateTime, uid } from '../../lib/utils';
import type { BackupRecord } from '../../lib/types';

export default function Backups() {
  const { notify } = useToast();
  const { items, add } = useCollection<BackupRecord>('backups', seedBackups);
  const [creating, setCreating] = useState(false);

  const runBackup = async () => {
    setCreating(true);
    // Simulated operation — no real backup is taken.
    await new Promise((resolve) => setTimeout(resolve, 900));
    const record: BackupRecord = {
      id: uid('bkp'),
      label: 'Manual backup (simulated)',
      size: '2.4 GB',
      createdAt: new Date().toISOString(),
      status: 'Completed',
      type: 'Manual',
    };
    add(record);
    setCreating(false);
    notify('Simulated backup recorded', { description: 'No real data was backed up.', tone: 'info' });
  };

  const columns: Array<Column<BackupRecord>> = [
    { key: 'label', header: 'Backup', render: (b) => <span className="font-medium text-ink">{b.label}</span> },
    { key: 'type', header: 'Type' },
    { key: 'size', header: 'Size' },
    { key: 'createdAt', header: 'Created', render: (b) => formatDateTime(b.createdAt) },
    { key: 'status', header: 'Status', render: (b) => <StatusPill value={b.status} /> },
  ];

  return (
    <>
      <PageHeader
        title="Backup Management"
        subtitle="Simulated backup history for this demonstration."
        badge={<Badge tone="warning">SIMULATED</Badge>}
        actions={
          <Button icon={DatabaseBackup} loading={creating} onClick={runBackup}>
            {creating ? 'Running…' : 'Run Backup'}
          </Button>
        }
      />

      <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        All backup operations here are simulated. No real data is copied, stored, or transferred.
      </div>

      <Card>
        <CardHeader title="Backup history" description="Sample records for the demonstration." />
        <DataTable columns={columns} rows={items} />
      </Card>
    </>
  );
}

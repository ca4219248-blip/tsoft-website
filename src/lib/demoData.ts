import type {
  ActivityLog,
  AdminUser,
  Announcement,
  ApiIntegration,
  BackupRecord,
  NotificationItem,
  PermissionRow,
  Product,
  Role,
  Service,
  Ticket,
  User,
} from './types';

/*
 * All records below are fictional demonstration data for the TSoft demo.
 * No figure here represents a real company, customer, or financial result.
 */

export const seedUsers: User[] = [
  { id: 'usr_01', name: 'Aarav Mehta', email: 'aarav.mehta@example.com', company: 'Northwind Retail', role: 'Administrator', status: 'Active', joinedAt: '2025-11-04T09:12:00Z', lastActive: '2026-10-23T14:20:00Z', plan: 'Enterprise' },
  { id: 'usr_02', name: 'Priya Nair', email: 'priya.nair@example.com', company: 'Bluepeak Logistics', role: 'Editor', status: 'Active', joinedAt: '2025-12-18T11:03:00Z', lastActive: '2026-10-24T08:41:00Z', plan: 'Professional' },
  { id: 'usr_03', name: 'Daniel Okafor', email: 'daniel.okafor@example.com', company: 'Helix Manufacturing', role: 'Support Agent', status: 'Active', joinedAt: '2026-01-22T15:47:00Z', lastActive: '2026-10-22T17:05:00Z', plan: 'Professional' },
  { id: 'usr_04', name: 'Sofia Almeida', email: 'sofia.almeida@example.com', company: 'Orchard Finance', role: 'Administrator', status: 'Pending', joinedAt: '2026-09-30T10:15:00Z', lastActive: '2026-10-01T09:00:00Z', plan: 'Enterprise' },
  { id: 'usr_05', name: 'Liam Bennett', email: 'liam.bennett@example.com', company: 'Cobalt Health', role: 'Editor', status: 'Inactive', joinedAt: '2025-08-11T13:30:00Z', lastActive: '2026-05-19T12:12:00Z', plan: 'Starter' },
  { id: 'usr_06', name: 'Chen Wei', email: 'chen.wei@example.com', company: 'Meridian Systems', role: 'Support Agent', status: 'Active', joinedAt: '2026-02-14T08:05:00Z', lastActive: '2026-10-24T06:58:00Z', plan: 'Professional' },
  { id: 'usr_07', name: 'Fatima Al-Sayed', email: 'fatima.alsayed@example.com', company: 'Cedar Consulting', role: 'Administrator', status: 'Active', joinedAt: '2025-10-02T16:22:00Z', lastActive: '2026-10-21T19:33:00Z', plan: 'Enterprise' },
  { id: 'usr_08', name: 'Noah Fischer', email: 'noah.fischer@example.com', company: 'Granite Legal', role: 'Editor', status: 'Suspended', joinedAt: '2026-03-09T09:41:00Z', lastActive: '2026-07-30T10:10:00Z', plan: 'Starter' },
  { id: 'usr_09', name: 'Isabella Rossi', email: 'isabella.rossi@example.com', company: 'Adriatic Travel', role: 'Support Agent', status: 'Active', joinedAt: '2026-04-27T12:00:00Z', lastActive: '2026-10-23T21:15:00Z', plan: 'Professional' },
  { id: 'usr_10', name: 'Rahul Verma', email: 'rahul.verma@example.com', company: 'Sundara Foods', role: 'Editor', status: 'Active', joinedAt: '2026-05-16T14:48:00Z', lastActive: '2026-10-24T07:22:00Z', plan: 'Professional' },
  { id: 'usr_11', name: 'Mia Johansson', email: 'mia.johansson@example.com', company: 'Fjord Energy', role: 'Administrator', status: 'Pending', joinedAt: '2026-10-10T11:11:00Z', lastActive: '2026-10-11T08:30:00Z', plan: 'Enterprise' },
  { id: 'usr_12', name: 'Tomas Novak', email: 'tomas.novak@example.com', company: 'Vltava Media', role: 'Editor', status: 'Inactive', joinedAt: '2025-09-21T10:05:00Z', lastActive: '2026-04-02T15:45:00Z', plan: 'Starter' },
  { id: 'usr_13', name: 'Aisha Khan', email: 'aisha.khan@example.com', company: 'Lotus Education', role: 'Support Agent', status: 'Active', joinedAt: '2026-06-30T13:27:00Z', lastActive: '2026-10-24T09:04:00Z', plan: 'Professional' },
  { id: 'usr_14', name: 'Lucas Silva', email: 'lucas.silva@example.com', company: 'Amazonia Agritech', role: 'Editor', status: 'Active', joinedAt: '2026-07-19T07:52:00Z', lastActive: '2026-10-20T16:40:00Z', plan: 'Professional' },
  { id: 'usr_15', name: 'Hannah Weber', email: 'hannah.weber@example.com', company: 'Rhine Automotive', role: 'Administrator', status: 'Active', joinedAt: '2025-12-01T09:00:00Z', lastActive: '2026-10-19T13:08:00Z', plan: 'Enterprise' },
  { id: 'usr_16', name: 'Kenji Tanaka', email: 'kenji.tanaka@example.com', company: 'Sakura Robotics', role: 'Support Agent', status: 'Inactive', joinedAt: '2026-01-08T18:14:00Z', lastActive: '2026-06-14T11:26:00Z', plan: 'Starter' },
];

export const seedAdmins: AdminUser[] = [
  { id: 'adm_01', name: 'Alex Morgan', email: 'admin@tsoft.demo', role: 'Super Admin', status: 'Active', lastLogin: '2026-10-24T09:31:00Z', twoFactor: true },
  { id: 'adm_02', name: 'Jordan Ellis', email: 'jordan.ellis@tsoft.demo', role: 'Administrator', status: 'Active', lastLogin: '2026-10-23T17:02:00Z', twoFactor: true },
  { id: 'adm_03', name: 'Meera Iyer', email: 'meera.iyer@tsoft.demo', role: 'Administrator', status: 'Active', lastLogin: '2026-10-22T11:48:00Z', twoFactor: false },
  { id: 'adm_04', name: 'Owen Clarke', email: 'owen.clarke@tsoft.demo', role: 'Editor', status: 'Active', lastLogin: '2026-10-21T08:19:00Z', twoFactor: false },
  { id: 'adm_05', name: 'Sara Lindqvist', email: 'sara.lindqvist@tsoft.demo', role: 'Support Agent', status: 'Active', lastLogin: '2026-10-24T07:44:00Z', twoFactor: true },
  { id: 'adm_06', name: 'Diego Alvarez', email: 'diego.alvarez@tsoft.demo', role: 'Editor', status: 'Disabled', lastLogin: '2026-08-15T14:30:00Z', twoFactor: false },
];

export const seedProducts: Product[] = [
  {
    id: 'prd_01',
    slug: 'workspace',
    name: 'TSoft Workspace',
    tagline: 'One connected place for teams and projects.',
    description:
      'A collaborative workspace that brings projects, documents, and team communication into a single, organised environment. Built for organisations that need clarity without adding overhead.',
    category: 'Productivity',
    features: ['Shared project boards', 'Document collaboration', 'Role-based access', 'Activity timelines', 'Team directory'],
    status: 'Active',
    version: '4.2',
    activeUsers: 1840,
  },
  {
    id: 'prd_02',
    slug: 'analytics',
    name: 'TSoft Analytics',
    tagline: 'Turn operational data into decisions.',
    description:
      'A reporting and analytics suite that consolidates business data into dashboards your teams can act on. Configure metrics, schedule reports, and export the results you need.',
    category: 'Analytics',
    features: ['Custom dashboards', 'Scheduled reports', 'CSV and PDF export', 'Cohort analysis', 'Data source connectors'],
    status: 'Active',
    version: '3.7',
    activeUsers: 1120,
  },
  {
    id: 'prd_03',
    slug: 'cloud',
    name: 'TSoft Cloud',
    tagline: 'Managed infrastructure that scales with you.',
    description:
      'A managed hosting layer for your applications with environment management, monitoring, and backup tooling. Designed to keep deployment predictable as your usage grows.',
    category: 'Infrastructure',
    features: ['Managed environments', 'Automated backups', 'Uptime monitoring', 'Environment variables', 'Deployment history'],
    status: 'Active',
    version: '2.9',
    activeUsers: 760,
  },
  {
    id: 'prd_04',
    slug: 'connect',
    name: 'TSoft Connect',
    tagline: 'Integrate the tools your business already uses.',
    description:
      'An integration platform that connects internal systems and third-party services through a consistent API layer, with visibility into every connection.',
    category: 'Integration',
    features: ['API gateway', 'Webhook management', 'Connection status monitoring', 'Rate limiting', 'Request logging'],
    status: 'Inactive',
    version: '1.4',
    activeUsers: 410,
  },
];

export const seedServices: Service[] = [
  {
    id: 'svc_01',
    name: 'Web Application Development',
    category: 'Engineering',
    summary: 'Modern, accessible web applications built to last.',
    description:
      'We design and build web applications with a focus on maintainability, performance, and accessibility, from initial architecture through to release.',
    capabilities: ['React and TypeScript front ends', 'Design system implementation', 'Performance budgets', 'Accessibility audits'],
    status: 'Published',
    updatedAt: '2026-09-18T10:00:00Z',
  },
  {
    id: 'svc_02',
    name: 'Software Engineering',
    category: 'Engineering',
    summary: 'Custom systems tailored to how your business works.',
    description:
      'Bespoke software for processes that off-the-shelf tools do not fit, delivered with clear documentation and handover.',
    capabilities: ['Domain modelling', 'Service architecture', 'Automated testing', 'Technical documentation'],
    status: 'Published',
    updatedAt: '2026-08-30T09:30:00Z',
  },
  {
    id: 'svc_03',
    name: 'UI/UX Design',
    category: 'Design',
    summary: 'Interfaces that are clear, consistent, and usable.',
    description:
      'Research-led interface design that aligns product goals with user needs, delivered as documented, reusable design systems.',
    capabilities: ['User research', 'Wireframing and prototyping', 'Design tokens', 'Usability testing'],
    status: 'Published',
    updatedAt: '2026-09-05T14:15:00Z',
  },
  {
    id: 'svc_04',
    name: 'Cloud Infrastructure',
    category: 'Infrastructure',
    summary: 'Reliable, observable infrastructure from day one.',
    description:
      'Infrastructure design and setup with monitoring, backups, and a clear deployment path so operations stay predictable.',
    capabilities: ['Environment strategy', 'Monitoring and alerting', 'Backup planning', 'Cost visibility'],
    status: 'Published',
    updatedAt: '2026-07-21T11:45:00Z',
  },
  {
    id: 'svc_05',
    name: 'API Development & Integration',
    category: 'Engineering',
    summary: 'Connect systems through well-designed APIs.',
    description:
      'We design, build, and document APIs, and integrate the third-party services your operations depend on.',
    capabilities: ['REST and webhook design', 'Authentication patterns', 'Third-party integrations', 'API documentation'],
    status: 'Published',
    updatedAt: '2026-08-12T16:20:00Z',
  },
  {
    id: 'svc_06',
    name: 'Maintenance & Support',
    category: 'Operations',
    summary: 'Ongoing care for the systems you rely on.',
    description:
      'Structured maintenance and support to keep software secure, current, and dependable after launch.',
    capabilities: ['Dependency updates', 'Incident response process', 'Performance reviews', 'Release management'],
    status: 'Draft',
    updatedAt: '2026-10-02T08:10:00Z',
  },
];

export const seedTickets: Ticket[] = [
  {
    id: 'TKT-2041',
    subject: 'Analytics export missing weekend rows',
    customer: 'Priya Nair',
    email: 'priya.nair@example.com',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-10-22T09:14:00Z',
    assignee: 'Sara Lindqvist',
    messages: [
      { id: 'm1', author: 'Priya Nair', kind: 'customer', body: 'Scheduled exports drop Saturday and Sunday rows for our weekly report.', at: '2026-10-22T09:14:00Z' },
      { id: 'm2', author: 'Sara Lindqvist', kind: 'agent', body: 'Thanks for the report. Could you share the report ID and the date range used?', at: '2026-10-22T10:02:00Z' },
    ],
  },
  {
    id: 'TKT-2040',
    subject: 'Cannot invite new team member',
    customer: 'Daniel Okafor',
    email: 'daniel.okafor@example.com',
    priority: 'Urgent',
    status: 'In Progress',
    createdAt: '2026-10-21T15:40:00Z',
    assignee: 'Jordan Ellis',
    messages: [
      { id: 'm1', author: 'Daniel Okafor', kind: 'customer', body: 'The invite button returns an error for any email address we try.', at: '2026-10-21T15:40:00Z' },
      { id: 'm2', author: 'Jordan Ellis', kind: 'agent', body: 'We have reproduced this on the staging environment and are investigating the invitation service.', at: '2026-10-21T17:05:00Z' },
    ],
  },
  {
    id: 'TKT-2039',
    subject: 'Request: bulk user import template',
    customer: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-10-20T11:22:00Z',
    assignee: null,
    messages: [
      { id: 'm1', author: 'Aarav Mehta', kind: 'customer', body: 'Is there a template available for importing users in bulk?', at: '2026-10-20T11:22:00Z' },
    ],
  },
  {
    id: 'TKT-2038',
    subject: 'Cloud deployment history pagination',
    customer: 'Hannah Weber',
    email: 'hannah.weber@example.com',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-10-17T08:55:00Z',
    assignee: 'Meera Iyer',
    messages: [
      { id: 'm1', author: 'Hannah Weber', kind: 'customer', body: 'Deployment history only shows the first page.', at: '2026-10-17T08:55:00Z' },
      { id: 'm2', author: 'Meera Iyer', kind: 'agent', body: 'This is resolved in version 2.9.2 — please refresh after the update.', at: '2026-10-18T09:30:00Z' },
    ],
  },
  {
    id: 'TKT-2037',
    subject: 'Two-factor setup guide needed',
    customer: 'Fatima Al-Sayed',
    email: 'fatima.alsayed@example.com',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-10-16T13:10:00Z',
    assignee: 'Sara Lindqvist',
    messages: [
      { id: 'm1', author: 'Fatima Al-Sayed', kind: 'customer', body: 'Our team needs a short guide for enabling two-factor authentication.', at: '2026-10-16T13:10:00Z' },
    ],
  },
  {
    id: 'TKT-2036',
    subject: 'Billing invoice shows old company name',
    customer: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-12T10:05:00Z',
    assignee: 'Meera Iyer',
    messages: [
      { id: 'm1', author: 'Rahul Verma', kind: 'customer', body: 'Invoices still use our previous company name.', at: '2026-10-12T10:05:00Z' },
      { id: 'm2', author: 'Meera Iyer', kind: 'agent', body: 'Updated the billing profile — future invoices will use the new name.', at: '2026-10-13T11:20:00Z' },
    ],
  },
  {
    id: 'TKT-2035',
    subject: 'API rate limit clarification',
    customer: 'Chen Wei',
    email: 'chen.wei@example.com',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-10-08T16:45:00Z',
    assignee: 'Owen Clarke',
    messages: [
      { id: 'm1', author: 'Chen Wei', kind: 'customer', body: 'What are the current rate limits for the integration API?', at: '2026-10-08T16:45:00Z' },
      { id: 'm2', author: 'Owen Clarke', kind: 'agent', body: 'Limits are documented in the API reference under Usage. Closing this ticket.', at: '2026-10-09T09:00:00Z' },
    ],
  },
  {
    id: 'TKT-2034',
    subject: 'Dashboard charts not loading on mobile',
    customer: 'Isabella Rossi',
    email: 'isabella.rossi@example.com',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-10-23T07:30:00Z',
    assignee: null,
    messages: [
      { id: 'm1', author: 'Isabella Rossi', kind: 'customer', body: 'The overview charts render blank on my phone browser.', at: '2026-10-23T07:30:00Z' },
    ],
  },
];

export const seedNotifications: NotificationItem[] = [
  { id: 'ntf_01', title: 'New administrator added', body: 'Meera Iyer was added as an Administrator.', category: 'System', read: false, createdAt: '2026-10-24T08:15:00Z' },
  { id: 'ntf_02', title: 'Failed sign-in attempt', body: 'A sign-in attempt for admin@tsoft.demo failed and was blocked.', category: 'Security', read: false, createdAt: '2026-10-24T06:02:00Z' },
  { id: 'ntf_03', title: 'Support ticket escalated', body: 'TKT-2040 was escalated to Urgent priority.', category: 'System', read: false, createdAt: '2026-10-23T18:40:00Z' },
  { id: 'ntf_04', title: 'TSoft Analytics 3.7 released', body: 'A new version of TSoft Analytics is available.', category: 'Product', read: true, createdAt: '2026-10-22T12:00:00Z' },
  { id: 'ntf_05', title: 'Scheduled backup completed', body: 'The weekly automatic backup completed successfully.', category: 'System', read: true, createdAt: '2026-10-21T02:00:00Z' },
  { id: 'ntf_06', title: 'Invoice generated', body: 'A demonstration invoice was generated for this billing period.', category: 'Billing', read: true, createdAt: '2026-10-20T09:30:00Z' },
  { id: 'ntf_07', title: 'Password policy updated', body: 'The demonstration password policy was updated to require 12 characters.', category: 'Security', read: true, createdAt: '2026-10-18T14:20:00Z' },
  { id: 'ntf_08', title: 'New announcement published', body: 'The announcement "Scheduled maintenance window" was published.', category: 'System', read: true, createdAt: '2026-10-15T10:00:00Z' },
];

export const seedAnnouncements: Announcement[] = [
  { id: 'ann_01', title: 'Scheduled maintenance window', body: 'A demonstration maintenance window is planned for this weekend. This is sample content only.', audience: 'All Users', status: 'Published', createdAt: '2026-10-15T10:00:00Z', updatedAt: '2026-10-15T10:00:00Z' },
  { id: 'ann_02', title: 'TSoft Analytics 3.7 now available', body: 'Version 3.7 introduces scheduled reports and improved export options. Demonstration content.', audience: 'Customers', status: 'Published', createdAt: '2026-10-22T12:05:00Z', updatedAt: '2026-10-22T12:05:00Z' },
  { id: 'ann_03', title: 'Updated API documentation', body: 'The integration API reference has been revised. Sample announcement for the demo.', audience: 'Developers', status: 'Draft', createdAt: '2026-10-19T15:40:00Z', updatedAt: '2026-10-20T09:10:00Z' },
  { id: 'ann_04', title: 'Administrator onboarding checklist', body: 'A revised onboarding checklist for new administrators. Demonstration content.', audience: 'Administrators', status: 'Draft', createdAt: '2026-10-11T11:00:00Z', updatedAt: '2026-10-11T11:00:00Z' },
];

export const seedActivity: ActivityLog[] = [
  { id: 'act_01', timestamp: '2026-10-24T09:31:00Z', actor: 'admin@tsoft.demo', action: 'Signed in to admin dashboard', module: 'Authentication', result: 'Success' },
  { id: 'act_02', timestamp: '2026-10-24T09:12:00Z', actor: 'meera.iyer@tsoft.demo', action: 'Updated product "TSoft Analytics"', module: 'Products', result: 'Success' },
  { id: 'act_03', timestamp: '2026-10-24T08:15:00Z', actor: 'admin@tsoft.demo', action: 'Created administrator "Meera Iyer"', module: 'Administrators', result: 'Success' },
  { id: 'act_04', timestamp: '2026-10-24T06:02:00Z', actor: 'unknown', action: 'Failed sign-in attempt', module: 'Authentication', result: 'Failed' },
  { id: 'act_05', timestamp: '2026-10-23T18:40:00Z', actor: 'jordan.ellis@tsoft.demo', action: 'Escalated ticket TKT-2040', module: 'Support', result: 'Success' },
  { id: 'act_06', timestamp: '2026-10-23T16:22:00Z', actor: 'sara.lindqvist@tsoft.demo', action: 'Replied to ticket TKT-2041', module: 'Support', result: 'Success' },
  { id: 'act_07', timestamp: '2026-10-23T11:05:00Z', actor: 'owen.clarke@tsoft.demo', action: 'Updated website settings', module: 'Settings', result: 'Success' },
  { id: 'act_08', timestamp: '2026-10-22T14:30:00Z', actor: 'meera.iyer@tsoft.demo', action: 'Exported user report (CSV)', module: 'Reports', result: 'Success' },
  { id: 'act_09', timestamp: '2026-10-22T09:00:00Z', actor: 'system', action: 'Dependency update reminder generated', module: 'System Health', result: 'Warning' },
  { id: 'act_10', timestamp: '2026-10-21T02:00:00Z', actor: 'system', action: 'Automatic backup completed', module: 'Backup', result: 'Success' },
  { id: 'act_11', timestamp: '2026-10-20T17:45:00Z', actor: 'admin@tsoft.demo', action: 'Disabled user "Noah Fischer"', module: 'Users', result: 'Success' },
  { id: 'act_12', timestamp: '2026-10-20T10:12:00Z', actor: 'diego.alvarez@tsoft.demo', action: 'Attempted settings change', module: 'Settings', result: 'Failed' },
  { id: 'act_13', timestamp: '2026-10-19T13:08:00Z', actor: 'jordan.ellis@tsoft.demo', action: 'Published announcement', module: 'Announcements', result: 'Success' },
  { id: 'act_14', timestamp: '2026-10-18T14:20:00Z', actor: 'admin@tsoft.demo', action: 'Updated security policy', module: 'Security', result: 'Success' },
];

export const seedIntegrations: ApiIntegration[] = [
  { id: 'api_01', name: 'Payments Gateway', provider: 'DemoPay', status: 'Connected', maskedKey: 'sk_live_••••••••••••4f2a', lastSync: '2026-10-24T08:00:00Z' },
  { id: 'api_02', name: 'Transactional Email', provider: 'DemoMail', status: 'Connected', maskedKey: 'ml_key_••••••••••••9c17', lastSync: '2026-10-24T07:45:00Z' },
  { id: 'api_03', name: 'Object Storage', provider: 'DemoStore', status: 'Connected', maskedKey: 'ds_••••••••••••b310', lastSync: '2026-10-23T22:10:00Z' },
  { id: 'api_04', name: 'Error Monitoring', provider: 'DemoWatch', status: 'Error', maskedKey: 'dw_••••••••••••2a88', lastSync: '2026-10-19T14:02:00Z' },
  { id: 'api_05', name: 'SMS Notifications', provider: 'DemoSMS', status: 'Not Connected', maskedKey: 'Not configured', lastSync: '—' },
  { id: 'api_06', name: 'Analytics Warehouse', provider: 'DemoLake', status: 'Connected', maskedKey: 'dl_••••••••••••77e0', lastSync: '2026-10-24T06:30:00Z' },
];

export const seedBackups: BackupRecord[] = [
  { id: 'bkp_01', label: 'Weekly automatic backup', size: '2.4 GB', createdAt: '2026-10-21T02:00:00Z', status: 'Completed', type: 'Automatic' },
  { id: 'bkp_02', label: 'Manual backup before release', size: '2.3 GB', createdAt: '2026-10-18T16:30:00Z', status: 'Completed', type: 'Manual' },
  { id: 'bkp_03', label: 'Weekly automatic backup', size: '2.3 GB', createdAt: '2026-10-14T02:00:00Z', status: 'Completed', type: 'Automatic' },
  { id: 'bkp_04', label: 'Weekly automatic backup', size: '2.2 GB', createdAt: '2026-10-07T02:00:00Z', status: 'Completed', type: 'Automatic' },
  { id: 'bkp_05', label: 'Manual backup before migration', size: '2.2 GB', createdAt: '2026-10-03T11:15:00Z', status: 'Failed', type: 'Manual' },
  { id: 'bkp_06', label: 'Weekly automatic backup', size: '2.1 GB', createdAt: '2026-09-30T02:00:00Z', status: 'Completed', type: 'Automatic' },
];

export const userGrowthData = [
  { month: 'Nov', users: 820, active: 610 },
  { month: 'Dec', users: 905, active: 672 },
  { month: 'Jan', users: 1010, active: 738 },
  { month: 'Feb', users: 1120, active: 812 },
  { month: 'Mar', users: 1245, active: 902 },
  { month: 'Apr', users: 1380, active: 998 },
  { month: 'May', users: 1510, active: 1090 },
  { month: 'Jun', users: 1660, active: 1204 },
  { month: 'Jul', users: 1820, active: 1320 },
  { month: 'Aug', users: 1985, active: 1448 },
  { month: 'Sep', users: 2160, active: 1572 },
  { month: 'Oct', users: 2340, active: 1706 },
];

export const activityOverviewData = [
  { month: 'Nov', sessions: 4200, actions: 12400 },
  { month: 'Dec', sessions: 4680, actions: 13900 },
  { month: 'Jan', sessions: 5120, actions: 15600 },
  { month: 'Feb', sessions: 5640, actions: 17100 },
  { month: 'Mar', sessions: 6180, actions: 18800 },
  { month: 'Apr', sessions: 6720, actions: 20400 },
  { month: 'May', sessions: 7260, actions: 22100 },
  { month: 'Jun', sessions: 7840, actions: 23900 },
  { month: 'Jul', sessions: 8420, actions: 25800 },
  { month: 'Aug', sessions: 8980, actions: 27400 },
  { month: 'Sep', sessions: 9460, actions: 29100 },
  { month: 'Oct', sessions: 9980, actions: 30800 },
];

export const pageViewsData = [
  { month: 'Nov', views: 18200 },
  { month: 'Dec', views: 20100 },
  { month: 'Jan', views: 22400 },
  { month: 'Feb', views: 24800 },
  { month: 'Mar', views: 27600 },
  { month: 'Apr', views: 30100 },
  { month: 'May', views: 32800 },
  { month: 'Jun', views: 35900 },
  { month: 'Jul', views: 38400 },
  { month: 'Aug', views: 41600 },
  { month: 'Sep', views: 44900 },
  { month: 'Oct', views: 48200 },
];

export const trafficSourcesData = [
  { name: 'Organic Search', value: 42 },
  { name: 'Direct', value: 26 },
  { name: 'Referral', value: 16 },
  { name: 'Social', value: 11 },
  { name: 'Email', value: 5 },
];

export const productUsageData = [
  { name: 'Workspace', value: 46 },
  { name: 'Analytics', value: 28 },
  { name: 'Cloud', value: 19 },
  { name: 'Connect', value: 7 },
];

export const CHART_COLORS = ['#2563EB', '#60A5FA', '#0B1F3A', '#93C5FD', '#64748B'];

const ALL_ROLES: Role[] = ['Super Admin', 'Administrator', 'Editor', 'Support Agent'];

function roleRow(
  module: string,
  allowed: Partial<Record<Role, Partial<{ view: boolean; create: boolean; edit: boolean; delete: boolean; settings: boolean }>>>,
): PermissionRow {
  const base = { view: false, create: false, edit: false, delete: false, settings: false };
  const roles = {} as PermissionRow['roles'];
  ALL_ROLES.forEach((role) => {
    roles[role] = { ...base, ...(allowed[role] ?? {}) };
  });
  return { module, roles };
}

export const permissionMatrix: PermissionRow[] = [
  roleRow('Dashboard', {
    'Super Admin': { view: true },
    Administrator: { view: true },
    Editor: { view: true },
    'Support Agent': { view: true },
  }),
  roleRow('Users', {
    'Super Admin': { view: true, create: true, edit: true, delete: true },
    Administrator: { view: true, create: true, edit: true, delete: false },
    Editor: { view: true },
    'Support Agent': { view: true, edit: true },
  }),
  roleRow('Products', {
    'Super Admin': { view: true, create: true, edit: true, delete: true },
    Administrator: { view: true, create: true, edit: true, delete: true },
    Editor: { view: true, edit: true },
    'Support Agent': { view: true },
  }),
  roleRow('Services', {
    'Super Admin': { view: true, create: true, edit: true, delete: true },
    Administrator: { view: true, create: true, edit: true, delete: false },
    Editor: { view: true, edit: true },
    'Support Agent': { view: true },
  }),
  roleRow('Support Tickets', {
    'Super Admin': { view: true, create: true, edit: true, delete: true },
    Administrator: { view: true, create: true, edit: true, delete: false },
    Editor: { view: true },
    'Support Agent': { view: true, create: true, edit: true },
  }),
  roleRow('Website Settings', {
    'Super Admin': { view: true, edit: true, settings: true },
    Administrator: { view: true, edit: true },
    Editor: { view: true },
    'Support Agent': {},
  }),
  roleRow('Security', {
    'Super Admin': { view: true, edit: true, settings: true },
    Administrator: { view: true },
    Editor: {},
    'Support Agent': {},
  }),
];

export const DEMO_STATS = [
  { label: 'Projects Delivered', value: '120+' },
  { label: 'Business Clients', value: '45+' },
  { label: 'Software Solutions', value: '12+' },
  { label: 'Customer Satisfaction', value: '98%' },
];

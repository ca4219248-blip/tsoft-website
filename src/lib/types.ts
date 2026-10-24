export type Role = 'Super Admin' | 'Administrator' | 'Editor' | 'Support Agent';

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: Role;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
}

export type AdminStatus = 'Active' | 'Disabled';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: AdminStatus;
  lastLogin: string;
  twoFactor: boolean;
}

export type ProductStatus = 'Active' | 'Inactive';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  status: ProductStatus;
  version: string;
  activeUsers: number;
}

export type ServiceStatus = 'Published' | 'Draft';

export interface Service {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  capabilities: string[];
  status: ServiceStatus;
  updatedAt: string;
}

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface TicketMessage {
  id: string;
  author: string;
  kind: 'customer' | 'agent';
  body: string;
  at: string;
}

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  email: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  assignee: string | null;
  messages: TicketMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  category: 'System' | 'Security' | 'Billing' | 'Product';
  read: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: 'All Users' | 'Administrators' | 'Customers' | 'Developers';
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  module: string;
  result: 'Success' | 'Failed' | 'Warning';
}

export interface ApiIntegration {
  id: string;
  name: string;
  provider: string;
  status: 'Connected' | 'Not Connected' | 'Error';
  maskedKey: string;
  lastSync: string;
}

export interface BackupRecord {
  id: string;
  label: string;
  size: string;
  createdAt: string;
  status: 'Completed' | 'Running' | 'Failed';
  type: 'Automatic' | 'Manual';
}

export interface PermissionRow {
  module: string;
  roles: Record<Role, { view: boolean; create: boolean; edit: boolean; delete: boolean; settings: boolean }>;
}

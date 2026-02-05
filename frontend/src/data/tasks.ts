export interface Task {
  id: string;
  name: string;
  category: 'legal' | 'people-facing' | 'admin';
  frequency?: 'daily' | 'weekly' | 'monthly';
  importance?: 'low' | 'medium' | 'high';
}

export const TASKS: Task[] = [
  // LEGAL
  { id: 'legal-1', name: 'Draft Legal Documents', category: 'legal' },
  { id: 'legal-2', name: 'File / E-File Court Cases', category: 'legal' },
  { id: 'legal-3', name: 'Review Contracts', category: 'legal' },
  { id: 'legal-4', name: 'Filing an Insurance Claim', category: 'legal' },
  { id: 'legal-5', name: 'Draft Demand Letters', category: 'legal' },
  { id: 'legal-6', name: 'Research New Law / Regulations', category: 'legal' },
  { id: 'legal-7', name: 'Draft & Send Letters of Representation', category: 'legal' },
  { id: 'legal-8', name: 'Negotiate & Close Bill Reductions', category: 'legal' },
  { id: 'legal-9', name: 'Draft Closing & Releases', category: 'legal' },
  { id: 'legal-10', name: 'Draft Discovery Requests & Responses', category: 'legal' },
  { id: 'legal-11', name: 'Review Discovery Documents', category: 'legal' },
  { id: 'legal-12', name: 'Prepare Documents for Production', category: 'legal' },
  
  // PEOPLE FACING
  { id: 'people-1', name: 'Intake: Qualify & Schedule Leads', category: 'people-facing' },
  { id: 'people-2', name: 'Intake: Qualify & Obtain Retainer', category: 'people-facing' },
  { id: 'people-3', name: 'Reception: Answer Inquiries', category: 'people-facing' },
  { id: 'people-4', name: 'Cold Call Leads', category: 'people-facing' },
  { id: 'people-5', name: 'Communicate with Insurance Companies', category: 'people-facing' },
  { id: 'people-6', name: 'Set People Up with Medical Treatment', category: 'people-facing' },
  { id: 'people-7', name: 'Request Police Records', category: 'people-facing' },
  
  // ADMIN - "Request Police Reports" REMOVED
  { id: 'admin-1', name: "Manage an Executive's Calendar", category: 'admin' },
  { id: 'admin-2', name: 'Draft Professional Emails', category: 'admin' },
  { id: 'admin-3', name: 'Use CRM & CMS', category: 'admin' },
  { id: 'admin-4', name: 'Organize & File Documents', category: 'admin' },
  { id: 'admin-5', name: 'Schedule Business Events & Reminders', category: 'admin' },
  { id: 'admin-6', name: 'Bookkeeping', category: 'admin' },
  { id: 'admin-7', name: 'Track & Update Cases', category: 'admin' },
  { id: 'admin-8', name: 'Request Medical Bills & Records', category: 'admin' },
];

export const TASK_COURSES: Record<string, string[]> = {
  'legal-1': ['Legal Document Drafting', 'Legal Writing Standards'],
  'legal-2': ['Court Filing Procedures', 'E-Filing Systems'],
  'legal-3': ['Contract Review Fundamentals', 'Legal Analysis'],
  'legal-4': ['Insurance Claims Process', 'Claims Documentation'],
  'legal-5': ['Demand Letter Writing', 'Negotiation Basics'],
  'legal-6': ['Legal Research Methods', 'Regulatory Compliance'],
  'legal-7': ['Client Representation', 'Professional Correspondence'],
  'legal-8': ['Negotiation Strategies', 'Settlement Procedures'],
  'legal-9': ['Closing Documents', 'Release Agreements'],
  'legal-10': ['Discovery Process', 'Legal Document Preparation'],
  'legal-11': ['Document Review Techniques', 'Evidence Analysis'],
  'legal-12': ['Production Procedures', 'Document Management'],
  'people-1': ['Client Intake Process', 'Lead Qualification'],
  'people-2': ['Retainer Agreements', 'Client Onboarding'],
  'people-3': ['Reception Best Practices', 'Customer Service'],
  'people-4': ['Cold Calling Techniques', 'Sales Communication'],
  'people-5': ['Insurance Communication', 'Claims Coordination'],
  'people-6': ['Medical Treatment Coordination', 'Healthcare Liaison'],
  'people-7': ['Records Request Process', 'Police Department Procedures'],
  'admin-1': ['Calendar Management', 'Executive Support'],
  'admin-2': ['Professional Email Writing', 'Business Communication'],
  'admin-3': ['CRM Systems', 'Case Management Software'],
  'admin-4': ['Document Organization', 'Filing Systems'],
  'admin-5': ['Event Planning', 'Scheduling Systems'],
  'admin-6': ['Basic Bookkeeping', 'Financial Records'],
  'admin-7': ['Case Tracking', 'Status Updates'],
  'admin-8': ['Medical Records Request', 'HIPAA Compliance'],
};
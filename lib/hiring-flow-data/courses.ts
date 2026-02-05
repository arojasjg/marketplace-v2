export interface Course {
  id: string;
  name: string;
  type: 'mandatory' | 'task-specific';
  duration: string;
}

export const MANDATORY_COURSES: Course[] = [
  { id: 'mand-1', name: 'English C2', type: 'mandatory', duration: '40 hours' },
  { id: 'mand-2', name: 'Attention to Detail', type: 'mandatory', duration: '8 hours' },
  { id: 'mand-3', name: 'Working for a US Business', type: 'mandatory', duration: '12 hours' },
  { id: 'mand-4', name: 'Improving Communication Skills', type: 'mandatory', duration: '16 hours' },
  { id: 'mand-5', name: 'Handling Confidential Information', type: 'mandatory', duration: '6 hours' },
  { id: 'mand-6', name: 'Improving Language Proficiency', type: 'mandatory', duration: '20 hours' },
  { id: 'mand-7', name: 'Cybersecurity & Data Protection', type: 'mandatory', duration: '10 hours' },
  { id: 'mand-8', name: 'Dealing with Stress', type: 'mandatory', duration: '8 hours' },
  { id: 'mand-9', name: 'Escalations to Stafi Coaches', type: 'mandatory', duration: '4 hours' },
  { id: 'mand-10', name: 'Stafi Contract & NDA', type: 'mandatory', duration: '2 hours' },
  { id: 'mand-11', name: 'How Stafi Client Success Supports Clients', type: 'mandatory', duration: '6 hours' },
  { id: 'mand-12', name: 'Procedures While on the Bench', type: 'mandatory', duration: '4 hours' },
];

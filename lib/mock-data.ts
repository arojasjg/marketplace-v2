import type { UserData, MarketBenchmark, BuyerData, UserRole } from './types';

export const initialUserData: UserData = {
  user: {
    id: '1',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  resume: {
    coreProfile: {
      aboutMe: '',
      monthlyRate: 0,
      availability: '',
      timezone: '',
      profilePicture: '',
    },
    jobExperiences: [],
    education: [],
  },
  completionPercentage: 5,
  assessments: [
    { id: 'a1', name: 'English C1', type: 'vetting', status: 'not-started' },
    { id: 'a2', name: 'Attention to Detail', type: 'vetting', status: 'not-started' },
    { id: 'a3', name: 'Introductory Video', type: 'vetting', status: 'not-started' },
    { id: 'a4', name: 'Mandatory Training Courses', type: 'additional', status: 'not-started' },
    { id: 'a5', name: 'DISC Personality Test', type: 'additional', status: 'not-started' },
    { id: 'a6', name: 'Working Culture Assessment', type: 'additional', status: 'not-started' },
  ],
  taskCourses: [
    // LEGAL COURSES
    {
      id: 'tc-legal-1',
      name: 'Draft Legal Documents',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Document Structure Basics', 'Legal Formatting Standards', 'Common Document Types', 'Quality Review Process'],
    },
    {
      id: 'tc-legal-2',
      name: 'File / E-File Court Cases',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Court Filing Requirements', 'E-Filing Systems Overview', 'Document Preparation', 'Tracking Filed Cases'],
    },
    {
      id: 'tc-legal-3',
      name: 'Review Contracts',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Contract Components', 'Key Terms Identification', 'Red Flag Recognition', 'Summary Reporting'],
    },
    {
      id: 'tc-legal-4',
      name: 'Filing an Insurance Claim',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Claim Types Overview', 'Documentation Requirements', 'Filing Procedures', 'Follow-up Process'],
    },
    {
      id: 'tc-legal-5',
      name: 'Draft Demand Letters',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Demand Letter Structure', 'Tone and Language', 'Supporting Documentation', 'Delivery Methods'],
    },
    {
      id: 'tc-legal-6',
      name: 'Research New Law / Regulations',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Legal Research Databases', 'Regulatory Sources', 'Citation Methods', 'Research Documentation'],
    },
    {
      id: 'tc-legal-7',
      name: 'Draft & Send Letters of Representation',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Letter Components', 'Client Information Handling', 'Distribution Protocols', 'Record Keeping'],
    },
    {
      id: 'tc-legal-8',
      name: 'Negotiate & Close Bill Reductions',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Negotiation Fundamentals', 'Bill Analysis', 'Communication Strategies', 'Settlement Documentation'],
    },
    {
      id: 'tc-legal-9',
      name: 'Draft Closing & Releases',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Closing Document Types', 'Release Language', 'Final Review Process', 'Execution Requirements'],
    },
    {
      id: 'tc-legal-10',
      name: 'Draft Discovery Requests & Responses',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Discovery Types', 'Request Drafting', 'Response Preparation', 'Objection Handling'],
    },
    {
      id: 'tc-legal-11',
      name: 'Review Discovery Documents',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Document Organization', 'Relevance Assessment', 'Privilege Review', 'Summary Creation'],
    },
    {
      id: 'tc-legal-12',
      name: 'Prepare Documents for Production',
      category: 'legal',
      status: 'start',
      score: 0,
      units: ['Production Standards', 'Redaction Procedures', 'Bates Numbering', 'Production Logs'],
    },
    // PEOPLE FACING COURSES
    {
      id: 'tc-people-1',
      name: 'Intake: Qualify & Schedule Leads',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Lead Qualification Criteria', 'Intake Scripts', 'Scheduling Best Practices', 'CRM Data Entry'],
    },
    {
      id: 'tc-people-2',
      name: 'Intake: Qualify & Obtain Retainer',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Retainer Process Overview', 'Client Onboarding', 'Fee Discussions', 'Documentation Requirements'],
    },
    {
      id: 'tc-people-3',
      name: 'Reception: Answer Inquiries',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Phone Etiquette', 'Common Inquiry Types', 'Information Routing', 'Message Taking'],
    },
    {
      id: 'tc-people-4',
      name: 'Cold Call Leads',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Cold Calling Basics', 'Script Development', 'Objection Handling', 'Follow-up Protocols'],
    },
    {
      id: 'tc-people-5',
      name: 'Communicate with Insurance Companies',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Insurance Communication Protocols', 'Claim Status Inquiries', 'Documentation Requests', 'Escalation Procedures'],
    },
    {
      id: 'tc-people-6',
      name: 'Set People Up with Medical Treatment',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Medical Provider Networks', 'Appointment Scheduling', 'Treatment Coordination', 'Follow-up Procedures'],
    },
    {
      id: 'tc-people-7',
      name: 'Request Police Records',
      category: 'people-facing',
      status: 'start',
      score: 0,
      units: ['Record Request Types', 'Agency Contact Procedures', 'Form Completion', 'Tracking Requests'],
    },
    // ADMIN COURSES
    {
      id: 'tc-admin-1',
      name: 'Manage an Executive\'s Calendar',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Calendar Management Tools', 'Scheduling Priorities', 'Conflict Resolution', 'Meeting Preparation'],
    },
    {
      id: 'tc-admin-2',
      name: 'Drafting Professional Emails',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Email Structure', 'Professional Tone', 'Subject Line Best Practices', 'Proofreading Tips'],
    },
    {
      id: 'tc-admin-3',
      name: 'Use CRM & CMS',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['CRM Fundamentals', 'CMS Navigation', 'Data Entry Standards', 'Reporting Basics'],
    },
    {
      id: 'tc-admin-4',
      name: 'Organize & File Documents',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Filing Systems', 'Naming Conventions', 'Digital Organization', 'Retrieval Procedures'],
    },
    {
      id: 'tc-admin-5',
      name: 'Schedule Business Events & Reminders',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Event Planning Basics', 'Reminder Systems', 'Coordination Tasks', 'Post-Event Follow-up'],
    },
    {
      id: 'tc-admin-6',
      name: 'Bookkeeping',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Basic Accounting Principles', 'Expense Tracking', 'Invoice Management', 'Financial Reporting'],
    },
    {
      id: 'tc-admin-7',
      name: 'Track & Update Cases',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Case Management Systems', 'Status Updates', 'Deadline Tracking', 'Client Communication'],
    },
    {
      id: 'tc-admin-8',
      name: 'Requesting Medical Bills & Records',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Request Procedures', 'HIPAA Compliance', 'Provider Communication', 'Record Organization'],
    },
    {
      id: 'tc-admin-9',
      name: 'Requesting Police Reports',
      category: 'admin-marketing',
      status: 'start',
      score: 0,
      units: ['Report Request Process', 'Agency Contacts', 'Form Requirements', 'Tracking and Follow-up'],
    },
  ],
  jobPosts: [
    {
      id: 'jp1',
      candidateLabel: 'Law Firm – Paralegal Support',
      description: 'Seeking experienced paralegal for document review and legal research.',
      areaOfWork: 'legal',
      monthlyBudget: 3500,
      postedDate: '2026-01-09',
      requirements: ['3+ years experience', 'Strong attention to detail', 'Legal research skills'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-legal-1',  // Draft Legal Documents
        'tc-legal-3',  // Review Contracts
        'tc-legal-6',  // Research New Law / Regulations
        'tc-legal-10', // Draft Discovery Requests & Responses
        'tc-legal-11', // Review Discovery Documents
        'tc-legal-12', // Prepare Documents for Production
        'tc-admin-4',  // Organize & File Documents
        'tc-admin-7',  // Track & Update Cases
      ],
      isSaved: false,
    },
    {
      id: 'jp2',
      candidateLabel: 'Corporate Legal Assistant',
      description: 'Corporate law firm needs legal assistant for contract management.',
      areaOfWork: 'legal',
      monthlyBudget: 4200,
      postedDate: '2026-01-08',
      requirements: ['Contract law knowledge', 'Document management', 'Client communication'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-legal-1',  // Draft Legal Documents
        'tc-legal-3',  // Review Contracts
        'tc-legal-5',  // Draft Demand Letters
        'tc-legal-7',  // Draft & Send Letters of Representation
        'tc-legal-8',  // Negotiate & Close Bill Reductions
        'tc-legal-9',  // Draft Closing & Releases
        'tc-people-5', // Communicate with Insurance Companies
        'tc-admin-2',  // Drafting Professional Emails
        'tc-admin-3',  // Use CRM & CMS
        'tc-admin-4',  // Organize & File Documents
      ],
      isSaved: false,
    },
    {
      id: 'jp3',
      candidateLabel: 'Office Administrator',
      description: 'Law firm seeking office administrator for daily operations and scheduling.',
      areaOfWork: 'admin-marketing',
      monthlyBudget: 3800,
      postedDate: '2026-01-07',
      requirements: ['Administrative experience', 'Calendar management', 'Professional communication'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-admin-1',  // Manage an Executive's Calendar
        'tc-admin-2',  // Drafting Professional Emails
        'tc-admin-3',  // Use CRM & CMS
        'tc-admin-4',  // Organize & File Documents
        'tc-admin-5',  // Schedule Business Events & Reminders
        'tc-admin-6',  // Bookkeeping
        'tc-admin-7',  // Track & Update Cases
        'tc-admin-8',  // Requesting Medical Bills & Records
        'tc-admin-9',  // Requesting Police Reports
        'tc-people-3', // Reception: Answer Inquiries
      ],
      isSaved: false,
    },
    {
      id: 'jp4',
      candidateLabel: 'Client Relations Specialist',
      description: 'Handle client inquiries and maintain relationships with key accounts.',
      areaOfWork: 'people-facing',
      monthlyBudget: 3200,
      postedDate: '2026-01-06',
      requirements: ['Excellent communication', 'CRM experience', 'Problem-solving skills'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-people-1', // Intake: Qualify & Schedule Leads
        'tc-people-2', // Intake: Qualify & Obtain Retainer
        'tc-people-3', // Reception: Answer Inquiries
        'tc-people-4', // Cold Call Leads
        'tc-people-5', // Communicate with Insurance Companies
        'tc-people-6', // Set People Up with Medical Treatment
        'tc-people-7', // Request Police Records
        'tc-admin-2',  // Drafting Professional Emails
        'tc-admin-3',  // Use CRM & CMS
      ],
      isSaved: false,
    },
    {
      id: 'jp5',
      candidateLabel: 'Executive Assistant',
      description: 'Support daily operations and executive scheduling for law firm partners.',
      areaOfWork: 'admin-marketing',
      monthlyBudget: 2800,
      postedDate: '2026-01-05',
      requirements: ['Calendar management', 'Microsoft Office proficiency', 'Organizational skills'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-admin-1',  // Manage an Executive's Calendar
        'tc-admin-2',  // Drafting Professional Emails
        'tc-admin-4',  // Organize & File Documents
        'tc-admin-5',  // Schedule Business Events & Reminders
        'tc-people-3', // Reception: Answer Inquiries
      ],
      isSaved: false,
    },
    {
      id: 'jp6',
      candidateLabel: 'Personal Injury Case Manager',
      description: 'Manage personal injury cases from intake through settlement.',
      areaOfWork: 'legal',
      monthlyBudget: 4500,
      postedDate: '2026-01-04',
      requirements: ['Personal injury experience', 'Case management skills', 'Insurance knowledge'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-legal-4',  // Filing an Insurance Claim
        'tc-legal-5',  // Draft Demand Letters
        'tc-legal-7',  // Draft & Send Letters of Representation
        'tc-legal-8',  // Negotiate & Close Bill Reductions
        'tc-legal-9',  // Draft Closing & Releases
        'tc-people-5', // Communicate with Insurance Companies
        'tc-people-6', // Set People Up with Medical Treatment
        'tc-admin-7',  // Track & Update Cases
        'tc-admin-8',  // Requesting Medical Bills & Records
        'tc-admin-9',  // Requesting Police Reports
      ],
      isSaved: false,
    },
    {
      id: 'jp7',
      candidateLabel: 'Litigation Support Specialist',
      description: 'Provide litigation support including discovery and document preparation.',
      areaOfWork: 'legal',
      monthlyBudget: 3900,
      postedDate: '2026-01-03',
      requirements: ['Litigation experience', 'E-filing knowledge', 'Detail-oriented'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-legal-2',  // File / E-File Court Cases
        'tc-legal-6',  // Research New Law / Regulations
        'tc-legal-10', // Draft Discovery Requests & Responses
        'tc-legal-11', // Review Discovery Documents
        'tc-legal-12', // Prepare Documents for Production
        'tc-admin-4',  // Organize & File Documents
        'tc-admin-7',  // Track & Update Cases
      ],
      isSaved: false,
    },
    {
      id: 'jp8',
      candidateLabel: 'Intake Coordinator',
      description: 'Handle incoming leads, qualify potential clients, and schedule consultations.',
      areaOfWork: 'people-facing',
      monthlyBudget: 2600,
      postedDate: '2026-01-02',
      requirements: ['Sales experience', 'Phone skills', 'CRM proficiency'],
      applicationStatus: 'not-applied',
      requiredTasks: [
        'tc-people-1', // Intake: Qualify & Schedule Leads
        'tc-people-2', // Intake: Qualify & Obtain Retainer
        'tc-people-3', // Reception: Answer Inquiries
        'tc-people-4', // Cold Call Leads
        'tc-admin-2',  // Drafting Professional Emails
        'tc-admin-3',  // Use CRM & CMS
      ],
      isSaved: false,
    },
  ],
  taApprovalStatus: 'pending',
};

// Buyer (Hiring) Dashboard Initial Data
export const initialBuyerData: BuyerData = {
  user: {
    id: 'buyer-1',
    email: 'hiring@lawfirm.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
  },
  role: 'buyer',
  companyName: 'Johnson & Associates Law Firm',
  jobPosts: [
    {
      id: 'bjp1',
      name: 'Senior Paralegal',
      totalCandidates: 24,
      newCandidates: 5,
      publishedDate: '2026-01-15',
      daysSincePublished: 19,
      status: 'active',
      isComplete: true,
      requiredTasks: ['tc-legal-1', 'tc-legal-3', 'tc-legal-6'],
      description: 'Looking for an experienced paralegal to join our litigation team.',
      monthlyBudget: 4000,
    },
    {
      id: 'bjp2',
      name: 'Legal Assistant',
      totalCandidates: 18,
      newCandidates: 3,
      publishedDate: '2026-01-20',
      daysSincePublished: 14,
      status: 'active',
      isComplete: true,
      requiredTasks: ['tc-legal-1', 'tc-admin-2', 'tc-admin-3'],
      description: 'Entry-level legal assistant for administrative support.',
      monthlyBudget: 2800,
    },
    {
      id: 'bjp3',
      name: 'Client Intake Specialist',
      totalCandidates: 12,
      newCandidates: 0,
      publishedDate: '2026-01-05',
      daysSincePublished: 29,
      status: 'paused',
      isComplete: true,
      requiredTasks: ['tc-people-1', 'tc-people-2', 'tc-people-3'],
      description: 'Handle incoming leads and client intake processes.',
      monthlyBudget: 2500,
    },
    {
      id: 'bjp4',
      name: 'Contract Reviewer',
      totalCandidates: 8,
      newCandidates: 2,
      publishedDate: '2025-12-20',
      daysSincePublished: 45,
      status: 'closed',
      isComplete: true,
      requiredTasks: ['tc-legal-3', 'tc-legal-5'],
      description: 'Review and analyze legal contracts.',
      monthlyBudget: 3500,
    },
    {
      id: 'bjp5',
      name: 'Executive Assistant',
      totalCandidates: 0,
      newCandidates: 0,
      publishedDate: '2026-02-01',
      daysSincePublished: 2,
      status: 'paused',
      isComplete: false,
      requiredTasks: ['tc-admin-1', 'tc-admin-2'],
      description: 'Support daily operations for partners.',
      monthlyBudget: 3000,
    },
  ],
  candidates: [
    {
      id: 'bc1',
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@email.com',
      profilePicture: '',
      taskCoursesAverage: 92,
      source: 'recommended',
      isFavorite: true,
      recommendedForJobPostIds: ['bjp1', 'bjp2'],
    },
    {
      id: 'bc2',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@email.com',
      profilePicture: '',
      taskCoursesAverage: 88,
      source: 'applied',
      isFavorite: false,
      appliedJobPostId: 'bjp1',
      recommendedForJobPostIds: [],
    },
    {
      id: 'bc3',
      firstName: 'Emily',
      lastName: 'Chen',
      email: 'emily.chen@email.com',
      profilePicture: '',
      taskCoursesAverage: 85,
      source: 'recommended',
      isFavorite: true,
      recommendedForJobPostIds: ['bjp1'],
    },
    {
      id: 'bc4',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      profilePicture: '',
      taskCoursesAverage: 79,
      source: 'applied',
      isFavorite: false,
      appliedJobPostId: 'bjp2',
      recommendedForJobPostIds: [],
    },
    {
      id: 'bc5',
      firstName: 'Sofia',
      lastName: 'Martinez',
      email: 'sofia.martinez@email.com',
      profilePicture: '',
      taskCoursesAverage: 95,
      source: 'recommended',
      isFavorite: false,
      recommendedForJobPostIds: ['bjp1', 'bjp2', 'bjp3'],
    },
    {
      id: 'bc6',
      firstName: 'David',
      lastName: 'Lee',
      email: 'david.lee@email.com',
      profilePicture: '',
      taskCoursesAverage: 72,
      source: 'applied',
      isFavorite: false,
      appliedJobPostId: 'bjp1',
      recommendedForJobPostIds: [],
    },
    {
      id: 'bc7',
      firstName: 'Anna',
      lastName: 'Thompson',
      email: 'anna.thompson@email.com',
      profilePicture: '',
      taskCoursesAverage: 81,
      source: 'applied',
      isFavorite: true,
      appliedJobPostId: 'bjp3',
      recommendedForJobPostIds: [],
    },
  ],
  interviews: [
    {
      id: 'bi1',
      candidateId: 'bc1',
      candidateName: 'Maria Garcia',
      jobPostId: 'bjp1',
      jobPostName: 'Senior Paralegal',
      scheduledDate: '2026-02-05T10:00:00',
      status: 'scheduled',
    },
    {
      id: 'bi2',
      candidateId: 'bc3',
      candidateName: 'Emily Chen',
      jobPostId: 'bjp1',
      jobPostName: 'Senior Paralegal',
      scheduledDate: '2026-02-06T14:00:00',
      status: 'scheduled',
    },
  ],
  messages: [
    {
      id: 'bm1',
      candidateId: 'bc1',
      candidateName: 'Maria Garcia',
      candidateProfilePicture: '',
      lastMessage: 'Thank you for the interview invitation!',
      lastMessageDate: '2026-02-01T15:30:00',
      unread: true,
    },
    {
      id: 'bm2',
      candidateId: 'bc2',
      candidateName: 'James Wilson',
      candidateProfilePicture: '',
      lastMessage: 'I look forward to hearing from you.',
      lastMessageDate: '2026-01-30T09:15:00',
      unread: false,
    },
    {
      id: 'bm3',
      candidateId: 'bc7',
      candidateName: 'Anna Thompson',
      candidateProfilePicture: '',
      lastMessage: 'When would be a good time to schedule a call?',
      lastMessageDate: '2026-01-28T11:45:00',
      unread: true,
    },
  ],
};

const BUYER_STORAGE_KEY = 'lawwork_buyer_data';

export function loadBuyerData(): BuyerData | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(BUYER_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as BuyerData;
    } catch {
      return null;
    }
  }
  return null;
}

export function saveBuyerData(data: BuyerData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BUYER_STORAGE_KEY, JSON.stringify(data));
}

export function clearBuyerData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(BUYER_STORAGE_KEY);
}

// Role storage
const ROLE_STORAGE_KEY = 'lawwork_user_role';

export function loadUserRole(): UserRole | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(ROLE_STORAGE_KEY);
  if (stored === 'candidate' || stored === 'buyer') {
    return stored;
  }
  return null;
}

export function saveUserRole(role: UserRole): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ROLE_STORAGE_KEY, role);
}

export function clearUserRole(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ROLE_STORAGE_KEY);
}

export function getMarketBenchmark(availability: 'full-time' | 'half-time'): MarketBenchmark {
  if (availability === 'full-time') {
    return {
      average: 3500,
      range: [2500, 4500],
    };
  }
  return {
    average: 1800,
    range: [1200, 2400],
  };
}

const STORAGE_KEY = 'lawwork_user_data';

export function loadUserData(): UserData | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsedData = JSON.parse(stored) as UserData;
      
      // Merge in any new taskCourses from initialUserData that don't exist in stored data
      // This ensures users always see the latest course catalog
      const storedCourseIds = new Set(parsedData.taskCourses?.map(c => c.id) || []);
      const newCourses = initialUserData.taskCourses.filter(c => !storedCourseIds.has(c.id));
      
      // If there are outdated courses (old IDs not in initial data), replace entirely
      const initialCourseIds = new Set(initialUserData.taskCourses.map(c => c.id));
      const hasOutdatedCourses = parsedData.taskCourses?.some(c => !initialCourseIds.has(c.id));
      
      if (hasOutdatedCourses) {
        // Replace taskCourses entirely with the new catalog
        parsedData.taskCourses = initialUserData.taskCourses;
      } else if (newCourses.length > 0) {
        // Add new courses to existing catalog
        parsedData.taskCourses = [...(parsedData.taskCourses || []), ...newCourses];
      }
      
      // Merge in any new jobPosts and update existing ones with requiredTasks
      const initialJobPostMap = new Map(initialUserData.jobPosts.map(jp => [jp.id, jp]));
      const storedJobPostIds = new Set(parsedData.jobPosts?.map(jp => jp.id) || []);
      
      // Update existing job posts with requiredTasks and isSaved if missing
      parsedData.jobPosts = (parsedData.jobPosts || []).map(storedPost => {
        const initialPost = initialJobPostMap.get(storedPost.id);
        if (initialPost) {
          return {
            ...storedPost,
            requiredTasks: storedPost.requiredTasks || initialPost.requiredTasks || [],
            isSaved: storedPost.isSaved ?? false,
          };
        }
        return {
          ...storedPost,
          requiredTasks: storedPost.requiredTasks || [],
          isSaved: storedPost.isSaved ?? false,
        };
      });
      
      // Add any new job posts from initial data
      const newJobPosts = initialUserData.jobPosts.filter(jp => !storedJobPostIds.has(jp.id));
      if (newJobPosts.length > 0) {
        parsedData.jobPosts = [...parsedData.jobPosts, ...newJobPosts];
      }
      
      return parsedData;
    } catch {
      return null;
    }
  }
  return null;
}

export function saveUserData(data: UserData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearUserData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function calculateCompletionPercentage(data: UserData): number {
  let points = 0;
  const maxPoints = 100;

  // Base points for having an account
  points += 5;

  // Core profile fields
  const { coreProfile } = data.resume;
  if (coreProfile.aboutMe.length > 50) points += 15;
  if (coreProfile.monthlyRate > 0) points += 10;
  if (coreProfile.availability) points += 10;
  if (coreProfile.timezone) points += 5;
  if (coreProfile.profilePicture) points += 5;

  // Job experiences
  if (data.resume.jobExperiences.length > 0) {
    points += Math.min(data.resume.jobExperiences.length * 15, 30);
  }

  // Education
  if (data.resume.education.length > 0) {
    points += Math.min(data.resume.education.length * 10, 20);
  }

  return Math.min(points, maxPoints);
}

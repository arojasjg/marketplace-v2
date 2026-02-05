export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CoreProfile {
  aboutMe: string;
  monthlyRate: number;
  availability: 'full-time' | 'half-time' | '';
  timezone: string;
  profilePicture: string;
}

export interface JobExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  status: string;
  graduationYear: string;
}

export interface Resume {
  coreProfile: CoreProfile;
  jobExperiences: JobExperience[];
  education: Education[];
}

export interface Assessment {
  id: string;
  name: string;
  type: 'vetting' | 'additional';
  status: 'not-started' | 'in-progress' | 'submitted' | 'approved';
}

export interface TaskCourse {
  id: string;
  name: string;
  category: 'legal' | 'admin-marketing' | 'people-facing';
  status: 'start' | 'in-progress' | 'completed';
  score?: number;
  units?: string[];
}

export interface JobPost {
  id: string;
  candidateLabel: string;
  description: string;
  areaOfWork: 'legal' | 'admin-marketing' | 'people-facing';
  monthlyBudget: number;
  postedDate: string;
  requirements: string[];
  applicationStatus: 'not-applied' | 'applied';
  requiredTasks: string[]; // Array of task/course IDs (up to 12)
  isSaved: boolean;
}

export interface UserData {
  user: User;
  resume: Resume;
  completionPercentage: number;
  assessments: Assessment[];
  taskCourses: TaskCourse[];
  jobPosts: JobPost[];
  taApprovalStatus: 'pending' | 'approved' | 'rejected';
}

export interface MarketBenchmark {
  average: number;
  range: [number, number];
}

// Buyer (Hiring) Dashboard Types
export type UserRole = 'candidate' | 'buyer';

export type BuyerJobPostStatus = 'active' | 'paused' | 'closed';

export interface BuyerJobPost {
  id: string;
  name: string;
  totalCandidates: number;
  newCandidates: number;
  publishedDate: string;
  daysSincePublished: number;
  status: BuyerJobPostStatus;
  isComplete: boolean;
  requiredTasks: string[];
  description: string;
  monthlyBudget: number;
}

export type CandidateSource = 'recommended' | 'applied';

export interface BuyerCandidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  taskCoursesAverage: number;
  source: CandidateSource;
  isFavorite: boolean;
  appliedJobPostId?: string;
  recommendedForJobPostIds: string[];
}

export interface BuyerInterview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobPostId: string;
  jobPostName: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface BuyerMessage {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateProfilePicture: string;
  lastMessage: string;
  lastMessageDate: string;
  unread: boolean;
}

export interface BuyerData {
  user: User;
  role: 'buyer';
  companyName: string;
  jobPosts: BuyerJobPost[];
  candidates: BuyerCandidate[];
  interviews: BuyerInterview[];
  messages: BuyerMessage[];
}

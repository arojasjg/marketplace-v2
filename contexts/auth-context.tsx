'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserData, Resume, Assessment, BuyerData, UserRole, BuyerJobPostStatus, BuyerJobPost, JobPostDraft } from '@/lib/types';
import {
  initialUserData,
  loadUserData,
  saveUserData,
  clearUserData,
  calculateCompletionPercentage,
  initialBuyerData,
  loadBuyerData,
  saveBuyerData,
  clearBuyerData,
  loadUserRole,
  saveUserRole,
  clearUserRole,
} from '@/lib/mock-data';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userData: UserData | null;
  buyerData: BuyerData | null;
  login: (email: string, firstName: string, lastName?: string) => void;
  loginAsBuyer: (email: string, firstName: string, lastName?: string, companyName?: string) => void;
  logout: () => void;
  updateResume: (resume: Partial<Resume>) => void;
  updateAssessment: (assessmentId: string, status: Assessment['status']) => void;
  updateTaskCourse: (courseId: string, status: 'start' | 'in-progress' | 'completed', score?: number) => void;
  applyToJobPost: (postId: string) => void;
  updateJobPostLabel: (postId: string, label: string) => void;
  toggleSaveJobPost: (postId: string) => void;
  // Buyer functions
  updateBuyerJobPostStatus: (postId: string, status: BuyerJobPostStatus) => void;
  toggleCandidateFavorite: (candidateId: string) => void;
  addBuyerJobPost: (draft: JobPostDraft, isComplete: boolean) => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [buyerData, setBuyerData] = useState<BuyerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = loadUserRole();
    if (role === 'candidate') {
      const stored = loadUserData();
      if (stored) {
        setUserData(stored);
        setUserRole('candidate');
        setIsAuthenticated(true);
      }
    } else if (role === 'buyer') {
      const stored = loadBuyerData();
      if (stored) {
        setBuyerData(stored);
        setUserRole('buyer');
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, firstName: string, lastName?: string) => {
    const newUserData: UserData = {
      ...initialUserData,
      user: {
        ...initialUserData.user,
        email,
        firstName,
        lastName: lastName || '',
      },
    };
    saveUserData(newUserData);
    saveUserRole('candidate');
    setUserData(newUserData);
    setUserRole('candidate');
    setIsAuthenticated(true);
  };

  const loginAsBuyer = (email: string, firstName: string, lastName?: string, companyName?: string) => {
    const newBuyerData: BuyerData = {
      ...initialBuyerData,
      user: {
        ...initialBuyerData.user,
        email,
        firstName,
        lastName: lastName || '',
      },
      companyName: companyName || 'My Law Firm',
    };
    saveBuyerData(newBuyerData);
    saveUserRole('buyer');
    setBuyerData(newBuyerData);
    setUserRole('buyer');
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearUserData();
    clearBuyerData();
    clearUserRole();
    setUserData(null);
    setBuyerData(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const updateResume = (resumeUpdate: Partial<Resume>) => {
    if (!userData) return;
    
    const newResume = {
      ...userData.resume,
      ...resumeUpdate,
      coreProfile: {
        ...userData.resume.coreProfile,
        ...(resumeUpdate.coreProfile || {}),
      },
    };
    
    const newUserData = {
      ...userData,
      resume: newResume,
    };
    
    newUserData.completionPercentage = calculateCompletionPercentage(newUserData);
    
    saveUserData(newUserData);
    setUserData(newUserData);
  };

  const updateAssessment = (assessmentId: string, status: Assessment['status']) => {
    if (!userData) return;
    
    const newAssessments = userData.assessments.map((a) =>
      a.id === assessmentId ? { ...a, status } : a
    );
    
    const newUserData = {
      ...userData,
      assessments: newAssessments,
    };
    
    saveUserData(newUserData);
    setUserData(newUserData);
  };

  const updateTaskCourse = (courseId: string, status: 'start' | 'in-progress' | 'completed', score?: number) => {
    if (!userData) return;
    
    const newTaskCourses = userData.taskCourses.map((c) =>
      c.id === courseId ? { ...c, status, score: score !== undefined ? score : c.score } : c
    );
    
    const newUserData = {
      ...userData,
      taskCourses: newTaskCourses,
    };
    
    saveUserData(newUserData);
    setUserData(newUserData);
  };

  const applyToJobPost = (postId: string) => {
    if (!userData) return;
    
    const newJobPosts = userData.jobPosts.map((p) =>
      p.id === postId ? { ...p, applicationStatus: 'applied' as const } : p
    );
    
    const newUserData = {
      ...userData,
      jobPosts: newJobPosts,
    };
    
    saveUserData(newUserData);
    setUserData(newUserData);
  };

  const updateJobPostLabel = (postId: string, label: string) => {
    if (!userData) return;
    
    const newJobPosts = userData.jobPosts.map((p) =>
      p.id === postId ? { ...p, candidateLabel: label } : p
    );
    
    const newUserData = {
      ...userData,
      jobPosts: newJobPosts,
    };
    
    saveUserData(newUserData);
    setUserData(newUserData);
  };

  const toggleSaveJobPost = (postId: string) => {
    if (!userData) return;
    
    const newJobPosts = userData.jobPosts.map((p) =>
      p.id === postId ? { ...p, isSaved: !p.isSaved } : p
    );
    
    const newUserData = {
      ...userData,
      jobPosts: newJobPosts,
    };
    
    saveUserData(newUserData);
    setUserData(newUserData);
  };

  // Buyer functions
  const updateBuyerJobPostStatus = (postId: string, status: BuyerJobPostStatus) => {
    if (!buyerData) return;
    
    const jobPost = buyerData.jobPosts.find(p => p.id === postId);
    
    // If trying to activate an incomplete job post, don't allow
    if (status === 'active' && jobPost && !jobPost.isComplete) {
      return;
    }
    
    const newJobPosts = buyerData.jobPosts.map((p) =>
      p.id === postId ? { ...p, status } : p
    );
    
    const newBuyerData = {
      ...buyerData,
      jobPosts: newJobPosts,
    };
    
    saveBuyerData(newBuyerData);
    setBuyerData(newBuyerData);
  };

  const addBuyerJobPost = (draft: JobPostDraft, isComplete: boolean): string => {
    if (!buyerData) return '';

    // Derive name from task categories
    const categories = [...new Set(draft.selectedTasks.map(t => t.category))];
    const categoryLabels = categories.map(c => {
      if (c === 'legal') return 'Legal';
      if (c === 'people-facing') return 'People Facing';
      if (c === 'admin') return 'Admin';
      return c;
    });
    const autoName = draft.jobName || categoryLabels.join(' / ') || 'Untitled Job Post';

    // Derive color from first category
    const firstCat = categories[0] || 'admin';
    const categoryColor = firstCat === 'legal' ? 'blue' : firstCat === 'people-facing' ? 'purple' : 'orange';

    // Count completed steps
    let completedSteps = 0;
    if (draft.selectedTasks.length > 0) completedSteps++;
    if (draft.workStartDate) completedSteps++;
    if (draft.weeklyHours || draft.timezone || draft.overlapPreference) completedSteps++;
    if (draft.softwareTools && draft.softwareTools.length > 0) completedSteps++;
    if (draft.culturalFit) completedSteps++;
    if (draft.languages && draft.languages.length > 0) completedSteps++;
    if (draft.monthlyBudget && draft.monthlyBudget > 0) completedSteps++;
    // Steps 8 (review) and 9 (post) don't have data fields, they're action steps
    if (isComplete) completedSteps = 9;

    const newId = `bjp-${Date.now()}`;
    const newPost: BuyerJobPost = {
      id: newId,
      name: autoName,
      totalCandidates: 0,
      newCandidates: 0,
      publishedDate: new Date().toISOString().split('T')[0],
      daysSincePublished: 0,
      status: isComplete ? 'active' : 'paused',
      isComplete,
      requiredTasks: draft.selectedTasks.map(t => t.id),
      description: `${autoName} - ${draft.selectedTasks.length} task${draft.selectedTasks.length !== 1 ? 's' : ''} selected`,
      monthlyBudget: draft.monthlyBudget || 0,
      taskCategories: categoryLabels,
      categoryColor,
      workStartDate: draft.workStartDate,
      weeklyHours: draft.weeklyHours,
      timezone: draft.timezone,
      overlapPreference: draft.overlapPreference,
      softwareTools: draft.softwareTools,
      culturalFit: draft.culturalFit,
      languages: draft.languages,
      completedSteps,
    };

    const newBuyerData = {
      ...buyerData,
      jobPosts: [newPost, ...buyerData.jobPosts],
    };

    saveBuyerData(newBuyerData);
    setBuyerData(newBuyerData);
    return newId;
  };

  const toggleCandidateFavorite = (candidateId: string) => {
    if (!buyerData) return;
    
    const newCandidates = buyerData.candidates.map((c) =>
      c.id === candidateId ? { ...c, isFavorite: !c.isFavorite } : c
    );
    
    const newBuyerData = {
      ...buyerData,
      candidates: newCandidates,
    };
    
    saveBuyerData(newBuyerData);
    setBuyerData(newBuyerData);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userData,
        buyerData,
        login,
        loginAsBuyer,
        logout,
        updateResume,
        updateAssessment,
        updateTaskCourse,
        applyToJobPost,
        updateJobPostLabel,
        toggleSaveJobPost,
        updateBuyerJobPostStatus,
        toggleCandidateFavorite,
        addBuyerJobPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

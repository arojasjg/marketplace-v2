'use client';

import { useState } from 'react';
import { StepProgress } from './step-progress';
import { Step1TaskSelection } from './steps/step1-task-selection';
import { Step2WorkStartDate } from './steps/step2-work-start-date';
import { Step3ScheduleAvailability } from './steps/step3-schedule-availability';
import { Step4SoftwareTools } from './steps/step4-software-tools';
import { Step5CulturalFit } from './steps/step5-cultural-fit';
import { Step6LanguageRequirements } from './steps/step6-language-requirements';
import { Step7BudgetSelection } from './steps/step7-budget-selection';
import { Step8JobDescription } from './steps/step8-job-description';
import { Step9JobPosting } from './steps/step9-job-posting';
import { Task } from '@/lib/hiring-flow-data/tasks';
import type { JobPostDraft } from '@/lib/types';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X, Save, Trash2 } from 'lucide-react';

interface HiringFlowFullScreenProps {
  onClose: () => void;
  initialStep?: number;
}

export function HiringFlowFullScreen({ onClose, initialStep }: HiringFlowFullScreenProps) {
  const { addBuyerJobPost } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialStep || 1);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [draft, setDraft] = useState<JobPostDraft>({
    selectedTasks: [],
    languages: ['English'],
  });

  const updateDraft = (updates: Partial<JobPostDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const handleExit = () => {
    if (draft.selectedTasks.length === 0) {
      onClose();
      return;
    }
    setShowExitPrompt(true);
  };

  const handleSaveAndExit = () => {
    addBuyerJobPost(draft, false);
    toast.success('Job post saved as draft');
    setShowExitPrompt(false);
    onClose();
  };

  const handleDiscard = () => {
    setShowExitPrompt(false);
    onClose();
  };

  const handlePostJob = () => {
    addBuyerJobPost(draft, true);
    toast.success('Job post published successfully!');
    onClose();
  };

  // Save: saves as incomplete and returns to job posts
  const handleSave = () => {
    addBuyerJobPost(draft, false);
    toast.success('Job post saved as draft');
    onClose();
  };

  // Skip: moves to the next step without saving current step data
  const handleSkip = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to a specific step (used by pencil icons and Edit Availability)
  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSaveDraft = () => {
    addBuyerJobPost(draft, false);
    toast.success('Job post saved as draft');
    onClose();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top bar with close */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 shrink-0">
        <h2 className="text-sm font-medium text-gray-900">Create New Job Post</h2>
        <button
          onClick={handleExit}
          className="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Exit job post creation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Progress */}
      <StepProgress currentStep={currentStep} totalSteps={9} />

      {/* Steps content (scrollable) */}
      <div className="flex-1 overflow-y-auto">
        {currentStep === 1 && (
          <Step1TaskSelection
            onNext={(tasks: Task[]) => {
              updateDraft({ selectedTasks: tasks.map(t => ({ id: t.id, name: t.name, category: t.category, frequency: t.frequency, importance: t.importance })) });
              setCurrentStep(2);
            }}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 2 && (
          <Step2WorkStartDate
            initialValue={draft.workStartDate}
            onNext={(value) => {
              updateDraft({ workStartDate: value });
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 3 && (
          <Step3ScheduleAvailability
            initialWeeklyHours={draft.weeklyHours}
            initialTimezone={draft.timezone}
            initialOverlap={draft.overlapPreference}
            initialShiftStart={draft.shiftStart}
            initialShiftEnd={draft.shiftEnd}
            onNext={(data) => {
              updateDraft(data);
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(2)}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 4 && (
          <Step4SoftwareTools
            initialTools={draft.softwareTools}
            onNext={(tools) => {
              updateDraft({ softwareTools: tools });
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 5 && (
          <Step5CulturalFit
            initialValue={draft.culturalFit}
            onNext={(value) => {
              updateDraft({ culturalFit: value });
              setCurrentStep(6);
            }}
            onBack={() => setCurrentStep(4)}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 6 && (
          <Step6LanguageRequirements
            initialLanguages={draft.languages}
            onNext={(languages) => {
              updateDraft({ languages });
              setCurrentStep(7);
            }}
            onBack={() => setCurrentStep(5)}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 7 && (
          <Step7BudgetSelection
            initialBudget={draft.monthlyBudget}
            weeklyHours={draft.weeklyHours}
            onNext={(budget) => {
              updateDraft({ monthlyBudget: budget });
              setCurrentStep(8);
            }}
            onBack={() => setCurrentStep(6)}
            onSave={handleSave}
            onSkip={handleSkip}
            onGoToStep={goToStep}
          />
        )}

        {currentStep === 8 && (
          <Step8JobDescription
            draft={draft}
            onUpdate={updateDraft}
            onNext={() => setCurrentStep(9)}
            onBack={() => setCurrentStep(7)}
            onSave={handleSave}
            onSkip={handleSkip}
            onGoToStep={goToStep}
          />
        )}

        {currentStep === 9 && (
          <Step9JobPosting
            draft={draft}
            onPost={handlePostJob}
            onSave={handleSaveDraft}
            onBack={() => setCurrentStep(8)}
          />
        )}
      </div>

      {/* Exit Prompt Dialog */}
      <Dialog open={showExitPrompt} onOpenChange={setShowExitPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save your progress?</DialogTitle>
            <DialogDescription>
              Would you like to save your progress or discard it?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              If saved, this job post will appear as &quot;Incomplete&quot; in your Job Posts tab. You can return to finish it later.
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleDiscard}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Discard
            </button>
            <button
              onClick={handleSaveAndExit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Progress
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

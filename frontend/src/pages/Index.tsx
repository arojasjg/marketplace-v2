import { useState } from 'react';
import { StepProgress } from '@/components/StepProgress';
import { Step1TaskSelection } from '@/components/steps/Step1TaskSelection';
import { Step2JobDescription } from '@/components/steps/Step2JobDescription';
import { Step3JobPosting } from '@/components/steps/Step3JobPosting';
import { Step4ApplicantSurge } from '@/components/steps/Step4ApplicantSurge';
import { Step5Screening } from '@/components/steps/Step5Screening';
import { Step6Interviewing } from '@/components/steps/Step6Interviewing';
import { Step7Hiring } from '@/components/steps/Step7Hiring';
import { Step7Training } from '@/components/steps/Step7Training';
import { Step8Shortlist } from '@/components/steps/Step8Shortlist';
import { Step9Scheduling } from '@/components/steps/Step9Scheduling';
import { Step11FinalSelection } from '@/components/steps/Step11FinalSelection';
import { Step10Support } from '@/components/steps/Step10Support';
import { Task } from '@/data/tasks';

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [starredCandidates, setStarredCandidates] = useState<Set<string>>(new Set());
  const [totalApplicants] = useState(1532);

  const handleStep1Next = (tasks: Task[]) => {
    setSelectedTasks(tasks);
    setCurrentStep(2);
  };

  const handleStep8Next = (starred: Set<string>) => {
    setStarredCandidates(starred);
    setCurrentStep(10);
  };

  const handleStep9Next = (starred: Set<string>) => {
    setStarredCandidates(starred);
    setCurrentStep(11);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedTasks([]);
    setStarredCandidates(new Set());
  };

  return (
    <div className="min-h-screen">
      <StepProgress currentStep={currentStep} totalSteps={12} />
      
      {currentStep === 1 && (
        <Step1TaskSelection onNext={handleStep1Next} />
      )}
      
      {currentStep === 2 && (
        <Step2JobDescription
          selectedTasks={selectedTasks}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}
      
      {currentStep === 3 && (
        <Step3JobPosting 
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}
      
      {currentStep === 4 && (
        <Step4ApplicantSurge 
          onNext={() => setCurrentStep(5)}
          onBack={() => setCurrentStep(3)}
        />
      )}
      
      {currentStep === 5 && (
        <Step5Screening 
          totalApplicants={totalApplicants}
          onNext={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
        />
      )}
      
      {currentStep === 6 && (
        <Step6Interviewing 
          onNext={() => setCurrentStep(7)}
          onBack={() => setCurrentStep(5)}
        />
      )}
      
      {currentStep === 7 && (
        <Step7Hiring 
          onNext={() => setCurrentStep(8)}
          onBack={() => setCurrentStep(6)}
        />
      )}
      
      {currentStep === 8 && (
        <Step7Training
          selectedTasks={selectedTasks}
          onNext={() => setCurrentStep(9)}
          onBack={() => setCurrentStep(7)}
        />
      )}
      
      {currentStep === 9 && (
        <Step8Shortlist 
          selectedTasks={selectedTasks}
          onNext={handleStep8Next}
          onBack={() => setCurrentStep(8)}
        />
      )}
      
      {currentStep === 10 && (
        <Step9Scheduling 
          starredCandidates={starredCandidates}
          onNext={handleStep9Next}
          onBack={() => setCurrentStep(9)}
        />
      )}
      
      {currentStep === 11 && (
        <Step11FinalSelection 
          selectedTasks={selectedTasks}
          starredCandidates={starredCandidates}
          onNext={() => setCurrentStep(12)}
          onBack={() => setCurrentStep(10)}
        />
      )}
      
      {currentStep === 12 && (
        <Step10Support 
          onRestart={handleRestart}
          onBack={() => setCurrentStep(11)}
        />
      )}
    </div>
  );
}
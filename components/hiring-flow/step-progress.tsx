import { cn } from '@/lib/utils';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_NAMES = [
  'Task Selection',
  'Job Description',
  'Job Posting',
  'Applicant Surge',
  'Vetting Assessments',
  'Interviewing Candidates',
  'Candidates hired by Stafi',
  'Training at Stafi University',
  'Shortlist',
  'Scheduling',
  'Final Selection',
  'Stafi Support System',
];

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-xl md:text-2xl font-medium tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Step {currentStep} of {totalSteps}: {STEP_NAMES[currentStep - 1]}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-light text-gray-900">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
            <img 
              src="/stafi-logo.png" 
              alt="Stafi" 
              className="h-12"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-1 flex-1 transition-all duration-500',
                index < currentStep ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

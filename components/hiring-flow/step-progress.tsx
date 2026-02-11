import { cn } from '@/lib/utils';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_NAMES = [
  'Task Selection',
  'Work Start Date',
  'Schedule & Availability',
  'Software & Tools',
  'Cultural Fit',
  'Language Requirements',
  'Budget Selection',
  'Job Description',
  'Job Posting',
];

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="text-lg md:text-xl font-medium tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Step {currentStep} of {totalSteps}: {STEP_NAMES[currentStep - 1]}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-light text-gray-900">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-500',
                index < currentStep ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

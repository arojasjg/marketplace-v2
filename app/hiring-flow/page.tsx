'use client';

import { useState } from 'react';
import { StepProgress } from '@/components/hiring-flow/step-progress';
import { Step1TaskSelection } from '@/components/hiring-flow/steps/step1-task-selection';
import { Task } from '@/lib/hiring-flow-data/tasks';

export default function HiringFlowPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [starredCandidates, setStarredCandidates] = useState<Set<string>>(new Set());
  const [totalApplicants] = useState(1532);

  const handleStep1Next = (tasks: Task[]) => {
    setSelectedTasks(tasks);
    setCurrentStep(2);
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
        <div className="h-screen overflow-hidden bg-white pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                Step 2: Job Description
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You selected {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}.
              </p>
              <div className="text-left max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Selected Tasks:</h2>
                <ul className="space-y-2">
                  {selectedTasks.map(task => (
                    <li key={task.id} className="text-gray-700">
                      {task.name} 
                      {task.frequency && <span className="text-sm text-gray-500"> ({task.frequency})</span>}
                      {task.importance && <span className="text-sm text-gray-500"> - {task.importance} priority</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors mr-4"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep >= 3 && (
        <div className="h-screen overflow-hidden bg-white pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Step {currentStep}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Additional steps are being implemented. This demonstrates the integration pattern.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              {currentStep < 12 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Next
                </button>
              )}
              {currentStep === 12 && (
                <button
                  onClick={handleRestart}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Restart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

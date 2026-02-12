'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Info, ArrowLeft } from 'lucide-react';

interface Step7Props {
  initialBudget?: number;
  weeklyHours?: 'half-time' | 'full-time';
  onNext: (budget: number) => void;
  onBack: () => void;
  onSave: () => void;
  onSkip: () => void;
  onGoToStep: (step: number) => void;
}

const BENCHMARKS = {
  'full-time': { average: 3500, min: 2000, max: 6000 },
  'half-time': { average: 1800, min: 1000, max: 3500 },
};

export function Step7BudgetSelection({ initialBudget, weeklyHours, onNext, onBack, onSave, onSkip, onGoToStep }: Step7Props) {
  const scheduleType = weeklyHours || 'full-time';
  const benchmark = BENCHMARKS[scheduleType];
  const [budget, setBudget] = useState(initialBudget || benchmark.average);

  const percentage = ((budget - benchmark.min) / (benchmark.max - benchmark.min)) * 100;

  return (
    <div className="bg-white pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Budget Selection
          </h1>
          <p className="text-base font-light text-gray-600">
            Set a monthly budget for this role.
          </p>
        </div>

        {/* Dynamic schedule context */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-900">
                According to your {scheduleType === 'full-time' ? 'full-time' : 'half-time'} preference chosen previously, this is the suggested monthly budget.
              </p>
              <p className="text-sm text-indigo-700 mt-1">
                Suggested range: ${benchmark.min.toLocaleString()} - ${benchmark.max.toLocaleString()}/month for {scheduleType === 'full-time' ? 'full-time (40 hrs/week)' : 'half-time (20 hrs/week)'}.
              </p>
              <button
                onClick={() => onGoToStep(3)}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Edit Availability
              </button>
            </div>
          </div>
        </div>

        {/* Budget Display */}
        <div className="text-center mb-8">
          <div className="text-5xl font-light text-gray-900 mb-2">
            ${budget.toLocaleString()}
            <span className="text-lg text-gray-500">/mo</span>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-6 px-4">
          <input
            type="range"
            min={benchmark.min}
            max={benchmark.max}
            step={100}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #4f46e5 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>${benchmark.min.toLocaleString()}</span>
            <span>${benchmark.max.toLocaleString()}</span>
          </div>
        </div>

        {/* Benchmark Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Market Benchmark</p>
              <p className="text-sm text-blue-700 mt-1">
                Most candidates are requesting around <strong>${benchmark.average.toLocaleString()}/month</strong> for {scheduleType} roles.
                If you adjust your budget to match, long-term relationships are more likely to develop.
              </p>
            </div>
          </div>
        </div>

        {budget < benchmark.average - 500 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              Your budget is below the average candidate expectation. Consider increasing it to attract higher-quality candidates.
            </p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 py-4 px-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            className="px-6 py-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm"
          >
            Save
          </button>
          <button
            onClick={onSkip}
            className="px-6 py-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg font-medium transition-colors text-sm"
          >
            Skip for now
          </button>
          <button
            onClick={() => onNext(budget)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            Continue
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

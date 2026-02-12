'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb, ListChecks, HelpCircle } from 'lucide-react';

interface Step5Props {
  initialValue?: 'independent' | 'structured' | 'not-sure';
  onNext: (value: 'independent' | 'structured' | 'not-sure') => void;
  onBack: () => void;
  onSave: () => void;
  onSkip: () => void;
}

const OPTIONS = [
  {
    value: 'independent' as const,
    label: 'Independent / Proactive',
    description: 'Someone who takes initiative, solves problems on their own, and works well with minimal supervision.',
    icon: Lightbulb,
  },
  {
    value: 'structured' as const,
    label: 'Structured / Process-Oriented',
    description: 'Someone who follows procedures carefully, prefers clear guidelines, and excels at systematic work.',
    icon: ListChecks,
  },
  {
    value: 'not-sure' as const,
    label: "I'm not sure yet",
    description: "You can decide later. We'll present candidates with a mix of personality traits.",
    icon: HelpCircle,
  },
];

export function Step5CulturalFit({ initialValue, onNext, onBack, onSave, onSkip }: Step5Props) {
  const [selected, setSelected] = useState<typeof OPTIONS[number]['value'] | undefined>(initialValue);

  return (
    <div className="bg-white pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Cultural Fit
          </h1>
          <p className="text-base font-light text-gray-600">
            Select the personality traits that matter most to your firm.
          </p>
        </div>

        <div className="space-y-4">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setSelected(option.value)}
                className={cn(
                  'w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left',
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                )}
              >
                <div className={cn(
                  'h-12 w-12 rounded-lg flex items-center justify-center shrink-0',
                  isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className={cn('font-medium', isSelected ? 'text-blue-900' : 'text-gray-900')}>
                    {option.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
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
            onClick={() => selected && onNext(selected)}
            disabled={!selected}
            className={cn(
              'px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2',
              selected
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            Continue
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Clock, Globe, ArrowLeftRight } from 'lucide-react';

interface Step3Props {
  initialWeeklyHours?: 'part-time' | 'full-time';
  initialTimezone?: string;
  initialOverlap?: 'exact' | 'partial' | 'flexible';
  onNext: (data: { weeklyHours: 'part-time' | 'full-time'; timezone: string; overlapPreference: 'exact' | 'partial' | 'flexible' }) => void;
  onBack: () => void;
}

const TIMEZONES = [
  'US/Eastern (EST)',
  'US/Central (CST)',
  'US/Mountain (MST)',
  'US/Pacific (PST)',
  'US/Alaska (AKST)',
  'US/Hawaii (HST)',
  'Europe/London (GMT)',
  'Europe/Berlin (CET)',
  'Asia/Tokyo (JST)',
  'Asia/Shanghai (CST)',
  'Australia/Sydney (AEST)',
  'America/Sao_Paulo (BRT)',
];

const OVERLAP_OPTIONS = [
  {
    value: 'exact' as const,
    label: 'Exact overlap with your office hours',
    description: 'Contractor works the same hours as your team',
    icon: Clock,
  },
  {
    value: 'partial' as const,
    label: 'Partial overlap +/- 2 hours',
    description: 'Some shared working hours with flexibility',
    icon: ArrowLeftRight,
  },
  {
    value: 'flexible' as const,
    label: 'Flexible / Asynchronous',
    description: 'No strict schedule, async communication',
    icon: Globe,
  },
];

export function Step3ScheduleAvailability({ initialWeeklyHours, initialTimezone, initialOverlap, onNext, onBack }: Step3Props) {
  const [weeklyHours, setWeeklyHours] = useState<'part-time' | 'full-time' | undefined>(initialWeeklyHours);
  const [timezone, setTimezone] = useState(initialTimezone || '');
  const [overlapPreference, setOverlapPreference] = useState<'exact' | 'partial' | 'flexible' | undefined>(initialOverlap);

  const canContinue = weeklyHours && timezone && overlapPreference;

  return (
    <div className="bg-white pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Schedule & Availability
          </h1>
          <p className="text-base font-light text-gray-600">
            Set your expectations for work hours and availability.
          </p>
        </div>

        {/* Weekly Hours */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Expected Weekly Hours</h2>
          <div className="grid grid-cols-2 gap-4">
            {(['part-time', 'full-time'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setWeeklyHours(option)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  weeklyHours === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <p className={cn('font-medium capitalize', weeklyHours === option ? 'text-blue-900' : 'text-gray-900')}>
                  {option === 'part-time' ? 'Part-Time' : 'Full-Time'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {option === 'part-time' ? '~20 hours/week' : '~40 hours/week'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">What is your time zone?</h2>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-blue-600 focus:outline-none transition-colors"
          >
            <option value="">Select your time zone</option>
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        {/* Overlap Preference */}
        <div>
          <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Time Zone & Availability Preference</h2>
          <div className="space-y-3">
            {OVERLAP_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = overlapPreference === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setOverlapPreference(option.value)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                >
                  <div className={cn(
                    'h-10 w-10 rounded-lg flex items-center justify-center shrink-0',
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={cn('font-medium text-sm', isSelected ? 'text-blue-900' : 'text-gray-900')}>
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 py-4 px-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => canContinue && onNext({ weeklyHours: weeklyHours!, timezone, overlapPreference: overlapPreference! })}
          disabled={!canContinue}
          className={cn(
            'px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2',
            canContinue
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          Continue
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

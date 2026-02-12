'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Clock, Globe, ArrowLeftRight, AlertTriangle } from 'lucide-react';

interface Step3Props {
  initialWeeklyHours?: 'half-time' | 'full-time';
  initialTimezone?: string;
  initialOverlap?: 'exact' | 'partial' | 'flexible';
  initialShiftStart?: string;
  initialShiftEnd?: string;
  onNext: (data: { weeklyHours: 'half-time' | 'full-time'; timezone: string; overlapPreference: 'exact' | 'partial' | 'flexible'; shiftStart: string; shiftEnd: string }) => void;
  onBack: () => void;
  onSave: () => void;
  onSkip: () => void;
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

// Generate time options in 30-min increments
const TIME_OPTIONS: string[] = [];
for (let h = 0; h < 24; h++) {
  for (const m of ['00', '30']) {
    const label = `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m} ${h < 12 ? 'AM' : 'PM'}`;
    TIME_OPTIONS.push(label);
  }
}

function getHourValue(timeLabel: string): number {
  const match = timeLabel.match(/^(\d+):(\d+)\s*(AM|PM)$/);
  if (!match) return 0;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const period = match[3];
  if (period === 'AM' && h === 12) h = 0;
  if (period === 'PM' && h !== 12) h += 12;
  return h + m / 60;
}

function getShiftDuration(start: string, end: string): number {
  const s = getHourValue(start);
  const e = getHourValue(end);
  if (e <= s) return 0;
  return e - s;
}

export function Step3ScheduleAvailability({ initialWeeklyHours, initialTimezone, initialOverlap, initialShiftStart, initialShiftEnd, onNext, onBack, onSave, onSkip }: Step3Props) {
  const [weeklyHours, setWeeklyHours] = useState<'half-time' | 'full-time' | undefined>(initialWeeklyHours);
  const [timezone, setTimezone] = useState(initialTimezone || '');
  const [overlapPreference, setOverlapPreference] = useState<'exact' | 'partial' | 'flexible' | undefined>(initialOverlap);
  const [shiftStart, setShiftStart] = useState(initialShiftStart || '');
  const [shiftEnd, setShiftEnd] = useState(initialShiftEnd || '');
  const [shiftError, setShiftError] = useState('');

  const duration = shiftStart && shiftEnd ? getShiftDuration(shiftStart, shiftEnd) : 0;

  // Validate shift duration
  useEffect(() => {
    if (!shiftStart || !shiftEnd || !weeklyHours) {
      setShiftError('');
      return;
    }
    if (duration <= 0) {
      setShiftError('End time must be after start time.');
      return;
    }
    if (weeklyHours === 'half-time' && duration > 4) {
      setShiftError('A half-time shift can only be 4 hours. Please adjust the hours to match your selection.');
      return;
    }
    setShiftError('');
  }, [shiftStart, shiftEnd, weeklyHours, duration]);

  const canContinue = weeklyHours && timezone && overlapPreference && shiftStart && shiftEnd && !shiftError && duration > 0;

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
            {(['half-time', 'full-time'] as const).map((option) => (
              <button
                key={option}
                onClick={() => {
                  setWeeklyHours(option);
                  // Clear shift error on type change
                  setShiftError('');
                }}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  weeklyHours === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <p className={cn('font-medium capitalize', weeklyHours === option ? 'text-blue-900' : 'text-gray-900')}>
                  {option === 'half-time' ? 'Half-Time' : 'Full-Time'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {option === 'half-time' ? '4 hours per day (~20 hrs/week)' : '8 hours per day (~40 hrs/week)'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Shift Time Selection */}
        {weeklyHours && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Shift Start & End Time</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
                <select
                  value={shiftStart}
                  onChange={(e) => setShiftStart(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-blue-600 focus:outline-none transition-colors"
                >
                  <option value="">Select start time</option>
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">End Time</label>
                <select
                  value={shiftEnd}
                  onChange={(e) => setShiftEnd(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-blue-600 focus:outline-none transition-colors"
                >
                  <option value="">Select end time</option>
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            {shiftStart && shiftEnd && duration > 0 && !shiftError && (
              <p className="text-sm text-gray-500 mt-2">Shift duration: {duration} hours</p>
            )}
            {shiftError && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{shiftError}</p>
              </div>
            )}
          </div>
        )}

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
            onClick={() => canContinue && onNext({ weeklyHours: weeklyHours!, timezone, overlapPreference: overlapPreference!, shiftStart, shiftEnd })}
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
    </div>
  );
}

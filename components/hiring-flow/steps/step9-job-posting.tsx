'use client';

import { cn } from '@/lib/utils';
import { Rocket, Save, CheckCircle2 } from 'lucide-react';
import type { JobPostDraft } from '@/lib/types';

interface Step9Props {
  draft: JobPostDraft;
  onPost: () => void;
  onSave: () => void;
  onBack: () => void;
}

export function Step9JobPosting({ draft, onPost, onSave, onBack }: Step9Props) {
  const categories = [...new Set(draft.selectedTasks.map(t => t.category))];
  const categoryLabels = categories.map(c => {
    if (c === 'legal') return 'Legal';
    if (c === 'people-facing') return 'People Facing';
    if (c === 'admin') return 'Admin';
    return c;
  });
  const jobName = draft.jobName || categoryLabels.join(' / ') || 'Untitled';

  // Check if all sections are complete
  const isComplete = !!(
    draft.selectedTasks.length > 0 &&
    draft.workStartDate &&
    draft.weeklyHours &&
    draft.timezone &&
    draft.overlapPreference &&
    draft.culturalFit &&
    draft.languages && draft.languages.length > 0 &&
    draft.monthlyBudget && draft.monthlyBudget > 0
  );

  return (
    <div className="bg-white pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Ready to Post?
          </h1>
          <p className="text-base font-light text-gray-600">
            Your job post is ready to go live.
          </p>
        </div>

        {/* Job Summary Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">{jobName}</h2>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span>{draft.selectedTasks.length} tasks</span>
            <span className="text-gray-300">|</span>
            <span>{draft.monthlyBudget ? `$${draft.monthlyBudget.toLocaleString()}/mo` : 'No budget set'}</span>
            <span className="text-gray-300">|</span>
            <span>{draft.weeklyHours === 'full-time' ? 'Full-Time' : 'Part-Time'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={onPost}
            disabled={!isComplete}
            className={cn(
              'w-full flex items-center justify-center gap-3 p-5 rounded-xl border-2 transition-all',
              isComplete
                ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            )}
          >
            <Rocket className="h-5 w-5" />
            <span className="font-medium">Post Job Now</span>
          </button>

          {!isComplete && (
            <p className="text-center text-sm text-amber-600">
              Some sections are incomplete. Please go back and fill in all required fields to post.
            </p>
          )}

          <button
            onClick={onSave}
            className="w-full flex items-center justify-center gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <Save className="h-5 w-5" />
            <span className="font-medium">Save as Draft (Incomplete)</span>
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 py-4 px-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}

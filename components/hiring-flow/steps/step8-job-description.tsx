'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Pencil, Check, X } from 'lucide-react';
import type { JobPostDraft } from '@/lib/types';

interface Step8Props {
  draft: JobPostDraft;
  onUpdate: (draft: Partial<JobPostDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step8JobDescription({ draft, onUpdate, onNext, onBack }: Step8Props) {
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(draft.jobName || '');

  // Derive auto name
  const categories = [...new Set(draft.selectedTasks.map(t => t.category))];
  const categoryLabels = categories.map(c => {
    if (c === 'legal') return 'Legal';
    if (c === 'people-facing') return 'People Facing';
    if (c === 'admin') return 'Admin';
    return c;
  });
  const autoName = categoryLabels.join(' / ') || 'Untitled';
  const displayName = draft.jobName || autoName;

  const handleSaveName = () => {
    onUpdate({ jobName: nameValue || undefined });
    setEditingName(false);
  };

  const sections = [
    {
      title: 'Task Selection',
      content: draft.selectedTasks.length > 0
        ? `${draft.selectedTasks.length} task${draft.selectedTasks.length !== 1 ? 's' : ''} selected: ${draft.selectedTasks.map(t => t.name).join(', ')}`
        : 'No tasks selected',
      onEdit: () => {},
      stepNumber: 1,
    },
    {
      title: 'Work Start Date',
      content: draft.workStartDate
        ? draft.workStartDate === 'immediately' ? 'Immediately'
          : draft.workStartDate === 'within-one-week' ? 'Within One Week'
          : 'Flexible Start Date'
        : 'Not set',
      stepNumber: 2,
    },
    {
      title: 'Schedule & Availability',
      content: [
        draft.weeklyHours ? (draft.weeklyHours === 'part-time' ? 'Part-Time' : 'Full-Time') : null,
        draft.timezone || null,
        draft.overlapPreference ? (
          draft.overlapPreference === 'exact' ? 'Exact overlap'
            : draft.overlapPreference === 'partial' ? 'Partial overlap +/- 2 hours'
            : 'Flexible / Asynchronous'
        ) : null,
      ].filter(Boolean).join(' | ') || 'Not set',
      stepNumber: 3,
    },
    {
      title: 'Software & Tools',
      content: draft.softwareTools && draft.softwareTools.length > 0
        ? draft.softwareTools.join(', ')
        : 'None selected',
      stepNumber: 4,
    },
    {
      title: 'Cultural Fit',
      content: draft.culturalFit
        ? draft.culturalFit === 'independent' ? 'Independent / Proactive'
          : draft.culturalFit === 'structured' ? 'Structured / Process-Oriented'
          : "Not sure yet"
        : 'Not set',
      stepNumber: 5,
    },
    {
      title: 'Language Requirements',
      content: draft.languages && draft.languages.length > 0
        ? draft.languages.join(', ')
        : 'English',
      stepNumber: 6,
    },
    {
      title: 'Monthly Budget',
      content: draft.monthlyBudget
        ? `$${draft.monthlyBudget.toLocaleString()}/month`
        : 'Not set',
      stepNumber: 7,
    },
  ];

  return (
    <div className="bg-white pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Review Your Job Post
          </h1>
          <p className="text-base font-light text-gray-600">
            Review all sections below. Click the edit icon to make changes.
          </p>
        </div>

        {/* Job Name */}
        <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Job Post Name</div>
            {!editingName && (
              <button onClick={() => { setNameValue(displayName); setEditingName(true); }} className="text-gray-400 hover:text-blue-600 transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
            )}
          </div>
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg font-medium"
                autoFocus
              />
              <button onClick={handleSaveName} className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                <Check className="h-4 w-4" />
              </button>
              <button onClick={() => setEditingName(false)} className="h-9 w-9 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <p className="text-lg font-medium text-gray-900">{displayName}</p>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-blue-600">Step {section.stepNumber}</span>
                    <span className="text-xs text-gray-300">|</span>
                    <h3 className="text-sm font-medium text-gray-900">{section.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
                </div>
                <button className="text-gray-400 hover:text-blue-600 transition-colors shrink-0 mt-1">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
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
          onClick={onNext}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Continue to Post
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step4Props {
  initialTools?: string[];
  onNext: (tools: string[]) => void;
  onBack: () => void;
}

const TOOL_CATEGORIES = [
  {
    title: 'Case Management Systems',
    tools: ['Clio', 'MyCase', 'Filevine'],
  },
  {
    title: 'CRM Platforms',
    tools: ['Lawmatics', 'HubSpot', 'Salesforce'],
  },
  {
    title: 'Communication & Collaboration Tools',
    tools: ['Outlook', 'Teams', 'Slack', 'Zoom'],
  },
];

export function Step4SoftwareTools({ initialTools, onNext, onBack }: Step4Props) {
  const [selectedTools, setSelectedTools] = useState<string[]>(initialTools || []);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  return (
    <div className="bg-white pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Software & Tools
          </h1>
          <p className="text-base font-light text-gray-600 max-w-xl mx-auto">
            Select all platforms your remote legal staff member should be comfortable with.
          </p>
        </div>

        <div className="space-y-8">
          {TOOL_CATEGORIES.map((category) => (
            <div key={category.title}>
              <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                {category.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.tools.map((tool) => {
                  const isSelected = selectedTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={cn(
                        'relative flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all',
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <span className={cn('font-medium text-sm', isSelected ? 'text-blue-900' : 'text-gray-700')}>
                        {tool}
                      </span>
                    </button>
                  );
                })}
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
          onClick={() => onNext(selectedTools)}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Continue
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

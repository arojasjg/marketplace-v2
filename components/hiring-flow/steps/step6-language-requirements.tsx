'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step6Props {
  initialLanguages?: string[];
  onNext: (languages: string[]) => void;
  onBack: () => void;
}

const LANGUAGES = [
  { value: 'English', flag: 'EN' },
  { value: 'Spanish', flag: 'ES' },
  { value: 'Portuguese', flag: 'PT' },
  { value: 'Russian', flag: 'RU' },
  { value: 'Mandarin', flag: 'ZH' },
];

export function Step6LanguageRequirements({ initialLanguages, onNext, onBack }: Step6Props) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialLanguages || ['English']);

  const toggleLanguage = (lang: string) => {
    // English is always required
    if (lang === 'English') return;
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="bg-white pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Language Requirements
          </h1>
          <p className="text-base font-light text-gray-600">
            English is required. Select any additional languages needed.
          </p>
        </div>

        <div className="space-y-3">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguages.includes(lang.value);
            const isEnglish = lang.value === 'English';
            return (
              <button
                key={lang.value}
                onClick={() => toggleLanguage(lang.value)}
                className={cn(
                  'w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all',
                  isEnglish
                    ? 'border-blue-600 bg-blue-50 cursor-default'
                    : isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold',
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  )}>
                    {lang.flag}
                  </div>
                  <div className="text-left">
                    <p className={cn('font-medium', isSelected ? 'text-blue-900' : 'text-gray-900')}>
                      {lang.value}
                    </p>
                    {isEnglish && <p className="text-xs text-blue-600">Required</p>}
                  </div>
                </div>
                {isSelected && (
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            );
          })}
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
          onClick={() => onNext(selectedLanguages)}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Continue
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stage {
  id: number;
  label: string;
  requirement: string;
  isActive: boolean;
  isCompleted: boolean;
}

const stages: Stage[] = [
  {
    id: 1,
    label: 'Stage 1',
    requirement: 'Complete your basic profile information and upload your resume.',
    isActive: true,
    isCompleted: false,
  },
  {
    id: 2,
    label: 'Stage 2',
    requirement: 'Complete your resume to 50% and verify your email address.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 3,
    label: 'Stage 3',
    requirement: 'Complete your resume to 80% and pass the initial screening.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 4,
    label: 'Stage 4',
    requirement: 'Pass 2 vetting assessments and complete at least 1 training course.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 5,
    label: 'Stage 5',
    requirement: 'Pass all 3 vetting assessments and complete your skills verification.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 6,
    label: 'Stage 6',
    requirement: 'Get approved by the TA team and unlock messaging features.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 7,
    label: 'Stage 7',
    requirement: 'Complete your first client communication training module.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 8,
    label: 'Stage 8',
    requirement: 'Pass the mock interview assessment and receive feedback.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 9,
    label: 'Stage 9',
    requirement: 'Complete all required courses and schedule your first interview.',
    isActive: false,
    isCompleted: false,
  },
  {
    id: 10,
    label: 'Hired US Law Firm',
    requirement: 'Congratulations! Complete interviews and receive an offer from a US law firm.',
    isActive: false,
    isCompleted: false,
  },
];

export function Milestones() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Your Path to Getting Hired</h2>
        <span className="text-sm text-blue-100">Stage 1 of 10</span>
      </div>

      {/* Milestone Track */}
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6">
        {/* Progress Line Background */}
        <div className="absolute top-11 left-6 right-6 h-1 bg-white/20 rounded-full" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-11 left-6 h-1 bg-white rounded-full transition-all duration-500"
          style={{ width: '5%' }}
        />

        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isActive = stage.isActive;
            const isLocked = !isActive && !stage.isCompleted;
            const isHovered = hoveredStage === stage.id;

            return (
              <div
                key={stage.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* "You are here" indicator */}
                {isActive && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium text-white bg-white/20 px-2 py-1 rounded-full">
                      You are here
                    </span>
                  </div>
                )}

                {/* Stage Node */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 cursor-pointer',
                    isActive && 'bg-white border-white shadow-lg shadow-white/30 scale-110',
                    stage.isCompleted && 'bg-green-400 border-green-400',
                    isLocked && 'bg-white/10 border-white/30',
                    isHovered && !isActive && !stage.isCompleted && 'border-white/50 bg-white/20'
                  )}
                >
                  {stage.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : isActive ? (
                    <span className="text-sm font-bold text-blue-600">{stage.id}</span>
                  ) : (
                    <Lock className={cn('h-4 w-4', isHovered ? 'text-white/80' : 'text-white/50')} />
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={cn(
                    'mt-3 text-xs font-medium text-center max-w-[60px] leading-tight transition-colors',
                    isActive && 'text-white',
                    stage.isCompleted && 'text-green-200',
                    isLocked && 'text-white/60',
                    isHovered && isLocked && 'text-white/80'
                  )}
                >
                  {stage.id === 10 ? 'Hired US Law Firm' : stage.label}
                </span>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative bg-gray-900 text-white text-xs rounded-lg px-3 py-2 max-w-[200px] shadow-xl">
                      {/* Arrow */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45" />
                      <p className="relative z-10 leading-relaxed">{stage.requirement}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

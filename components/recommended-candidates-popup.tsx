'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BuyerCandidate, BuyerJobPost } from '@/lib/types';

interface RecommendedCandidatesPopupProps {
  jobPost: BuyerJobPost;
  candidates: BuyerCandidate[];
  onClose: () => void;
  onViewCandidates: (jobPostId: string) => void;
}

export function RecommendedCandidatesPopup({ jobPost, candidates, onClose, onViewCandidates }: RecommendedCandidatesPopupProps) {
  const recommendedCandidates = useMemo(() => {
    return candidates.filter(c =>
      c.source === 'recommended' && c.recommendedForJobPostIds.includes(jobPost.id)
    );
  }, [candidates, jobPost.id]);

  if (recommendedCandidates.length === 0) return null;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Recommended by LawWork</p>
              <p className="text-white/80 text-xs mt-0.5">
                {recommendedCandidates.length} candidate{recommendedCandidates.length !== 1 ? 's' : ''} for &quot;{jobPost.name}&quot;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Candidate Avatars */}
      <div className="p-5">
        <div className="flex flex-wrap gap-3 mb-4">
          {recommendedCandidates.slice(0, 6).map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => onViewCandidates(jobPost.id)}
              className="group flex flex-col items-center gap-1.5 transition-transform hover:scale-105"
              title={`${candidate.firstName} ${candidate.lastName}`}
            >
              <Avatar className="h-12 w-12 ring-2 ring-blue-100 group-hover:ring-blue-400 transition-all">
                <AvatarImage src={candidate.profilePicture || "/placeholder.svg"} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                  {getInitials(candidate.firstName, candidate.lastName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-gray-600 font-medium max-w-[60px] truncate">
                {candidate.firstName}
              </span>
            </button>
          ))}
          {recommendedCandidates.length > 6 && (
            <button
              onClick={() => onViewCandidates(jobPost.id)}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
                +{recommendedCandidates.length - 6}
              </div>
              <span className="text-[10px] text-gray-500">more</span>
            </button>
          )}
        </div>

        {/* View All Button */}
        <button
          onClick={() => onViewCandidates(jobPost.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-medium text-sm transition-colors"
        >
          View All Candidates
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

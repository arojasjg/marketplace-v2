'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, MessageSquare, Calendar, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type FilterType = 'all' | 'recommended' | 'applied' | 'favorites';

export default function BuyerCandidatesPage() {
  const { buyerData, toggleCandidateFavorite } = useAuth();
  const [selectedJobPost, setSelectedJobPost] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredCandidates = useMemo(() => {
    let candidates = [...buyerData.candidates];

    // Filter by job post
    if (selectedJobPost !== 'all') {
      candidates = candidates.filter(c => 
        c.appliedJobPostId === selectedJobPost || 
        c.recommendedForJobPostIds.includes(selectedJobPost)
      );
    }

    // Filter by type
    switch (activeFilter) {
      case 'recommended':
        candidates = candidates.filter(c => c.source === 'recommended');
        break;
      case 'applied':
        candidates = candidates.filter(c => c.source === 'applied');
        break;
      case 'favorites':
        candidates = candidates.filter(c => c.isFavorite);
        break;
    }

    // Sort by task courses average (highest first)
    return candidates.sort((a, b) => b.taskCoursesAverage - a.taskCoursesAverage);
  }, [buyerData.candidates, selectedJobPost, activeFilter]);

  if (!buyerData) return null;

  const handleInviteInterview = (candidateId: string, candidateName: string) => {
    toast.success(`Interview invitation sent to ${candidateName}`);
  };

  const handleMessage = (candidateId: string, candidateName: string) => {
    toast.success(`Opening conversation with ${candidateName}`);
  };

  const handleInviteToApply = (candidateId: string, candidateName: string) => {
    toast.success(`Application invitation sent to ${candidateName}`);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Candidates' },
    { key: 'recommended', label: 'Recommended by LawWork' },
    { key: 'applied', label: 'Applicants' },
    { key: 'favorites', label: 'Favorites' },
  ];

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
        <p className="text-gray-500 text-sm mt-1">Review and manage your candidate pipeline</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Job Post Selector */}
        <Select value={selectedJobPost} onValueChange={setSelectedJobPost}>
          <SelectTrigger className="w-full sm:w-64 border-gray-200 bg-white">
            <SelectValue placeholder="Select job post" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Job Posts</SelectItem>
            {buyerData.jobPosts.map((jobPost) => (
              <SelectItem key={jobPost.id} value={jobPost.id}>
                {jobPost.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                'text-sm',
                activeFilter === filter.key
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredCandidates.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No candidates match your current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  {/* Candidate Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.profilePicture || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                        {getInitials(candidate.firstName, candidate.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        {candidate.source === 'recommended' && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                            Recommended by LawWork
                          </Badge>
                        )}
                        {candidate.source === 'applied' && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                            Applied to Job
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{candidate.email}</p>
                    </div>
                  </div>

                  {/* Task Courses Average */}
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Task Courses Avg</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        candidate.taskCoursesAverage >= 85 ? "text-green-600" :
                        candidate.taskCoursesAverage >= 70 ? "text-blue-600" : "text-gray-600"
                      )}>
                        {candidate.taskCoursesAverage}%
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleCandidateFavorite(candidate.id)}
                      className={cn(
                        "h-9 w-9",
                        candidate.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                      )}
                    >
                      <Star className={cn("h-5 w-5", candidate.isFavorite && "fill-current")} />
                    </Button>

                    {/* Conditional Actions based on source */}
                    {candidate.source === 'applied' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInviteInterview(candidate.id, `${candidate.firstName} ${candidate.lastName}`)}
                          className="bg-transparent text-gray-700 hover:bg-gray-50"
                        >
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Invite for Interview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMessage(candidate.id, `${candidate.firstName} ${candidate.lastName}`)}
                          className="bg-transparent text-gray-700 hover:bg-gray-50"
                        >
                          <MessageSquare className="h-4 w-4 mr-1.5" />
                          Message
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleInviteToApply(candidate.id, `${candidate.firstName} ${candidate.lastName}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="h-4 w-4 mr-1.5" />
                        Invite to Apply
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mobile: Task Courses Average */}
                <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Task Courses Average</span>
                    <span className={cn(
                      "font-semibold",
                      candidate.taskCoursesAverage >= 85 ? "text-green-600" :
                      candidate.taskCoursesAverage >= 70 ? "text-blue-600" : "text-gray-600"
                    )}>
                      {candidate.taskCoursesAverage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {filteredCandidates.length} of {buyerData.candidates.length} candidates
      </div>
    </div>
  );
}

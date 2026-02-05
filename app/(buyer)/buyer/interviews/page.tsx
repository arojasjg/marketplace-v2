'use client';

import { useAuth } from '@/contexts/auth-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Video, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function BuyerInterviewsPage() {
  const { buyerData } = useAuth();

  if (!buyerData) return null;

  const scheduledInterviews = buyerData.interviews.filter(i => i.status === 'scheduled');
  const completedInterviews = buyerData.interviews.filter(i => i.status === 'completed');

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2 
      ? `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleReschedule = (interviewId: string) => {
    toast.info('Reschedule functionality coming soon');
  };

  const handleCancel = (interviewId: string) => {
    toast.info('Cancel functionality coming soon');
  };

  const handleJoin = (interviewId: string) => {
    toast.info('Join meeting functionality coming soon');
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your scheduled interviews with candidates</p>
      </div>

      {/* Upcoming Interviews */}
      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Interviews</h2>
        
        {scheduledInterviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No upcoming interviews</p>
            <p className="text-sm text-gray-400">Scheduled interviews will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                        {getInitials(interview.candidateName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{interview.jobPostName}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(interview.scheduledDate)}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {formatTime(interview.scheduledDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Scheduled
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleJoin(interview.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Video className="h-4 w-4 mr-1.5" />
                      Join Meeting
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReschedule(interview.id)}>
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleCancel(interview.id)}
                          className="text-red-600"
                        >
                          Cancel Interview
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Interviews */}
      {completedInterviews.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Completed Interviews</h2>
          <div className="space-y-4">
            {completedInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-xl border border-gray-200 p-6 opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                        {getInitials(interview.candidateName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{interview.jobPostName}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(interview.scheduledDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

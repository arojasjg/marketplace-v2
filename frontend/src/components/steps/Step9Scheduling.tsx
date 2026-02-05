import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { CANDIDATES } from '@/data/candidates';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

interface Step9Props {
  starredCandidates: Set<string>;
  onNext: (starredCandidates: Set<string>) => void;
  onBack: () => void;
}

export function Step9Scheduling({ starredCandidates, onNext, onBack }: Step9Props) {
  const [schedulingComplete, setSchedulingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSchedulingComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Filter to show only starred candidates
  const starredCandidatesList = CANDIDATES.filter(c => starredCandidates.has(c.id));
  
  if (starredCandidatesList.length === 0) {
    return (
      <div className="h-screen overflow-hidden bg-white pt-16 pb-20 flex items-center justify-center">
        <BackButton onClick={onBack} />
        <Card className="p-8 max-w-md text-center">
          <p className="text-lg font-light text-gray-900 mb-4">
            No candidates were starred in the previous step.
          </p>
          <p className="text-sm font-light text-gray-600">
            Please go back and star at least one candidate to continue.
          </p>
        </Card>
      </div>
    );
  }

  const interviews = starredCandidatesList.map((candidate, index) => ({
    candidate,
    date: index % 2 === 0 ? 'Jan 15, 2026' : 'Jan 16, 2026',
    time: index % 2 === 0 ? `${10 + index}:00 AM PST` : `${2 + index}:00 PM PST`,
    status: index % 3 === 2 ? ('pending' as const) : ('scheduled' as const)
  }));

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-4">
          <h1 className="squarespace-heading gradient-text mb-3 text-2xl">
            Interview Scheduling
          </h1>

          {/* Top-Center Message - Primary Takeaway */}
          <Card className="p-6 bg-blue-50 border-2 border-blue-200 max-w-3xl mx-auto mb-4">
            <div className="text-center">
              <h2 className="text-xl font-light text-gray-900 mb-2">
                Zero Effort Required From You
              </h2>
              <p className="text-sm font-light text-gray-700 leading-relaxed">
                Stafi handled all logistics: candidate outreach, timezone coordination, calendar management, and confirmations. You just show up.
              </p>
            </div>
          </Card>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Card className="p-6 border-2 gradient-border">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                {!schedulingComplete ? (
                  <div className="w-24 h-24 rounded-full border-8 border-t-transparent animate-spin gradient-primary" 
                       style={{ borderColor: 'var(--gradient-start)', borderTopColor: 'transparent' }} />
                ) : (
                  <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center animate-in zoom-in">
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mb-4">
              {!schedulingComplete ? (
                <div>
                  <div className="text-lg font-light text-gray-900 mb-1">
                    Coordinating Schedules...
                  </div>
                  <div className="text-xs font-light text-gray-600">
                    Finding optimal interview times
                  </div>
                </div>
              ) : (
                <div>
                  <div className="inline-block gradient-primary text-white px-4 py-2 text-[10px] font-light tracking-widest uppercase mb-2 rounded">
                    All Interviews Scheduled
                  </div>
                  <div className="text-xs font-light text-gray-600">
                    Calendar invites sent to all candidates
                  </div>
                </div>
              )}
            </div>

            {schedulingComplete && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                {interviews.map((interview, index) => (
                  <Card key={index} className="p-3 bg-gray-50 border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={interview.candidate.photo}
                          alt={`${interview.candidate.firstName} ${interview.candidate.lastNameInitial}.`}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                        />
                        <div className="p-2 gradient-primary rounded flex-shrink-0">
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-light text-gray-900 text-sm mb-0.5 truncate">
                            {interview.candidate.firstName} {interview.candidate.lastNameInitial}.
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-xs font-light text-gray-600">
                            <span>{interview.date}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {interview.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 text-[10px] font-light tracking-widest uppercase rounded flex-shrink-0 ${
                        interview.status === 'scheduled' 
                          ? 'gradient-primary text-white' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {interview.status === 'scheduled' ? 'Confirmed' : 'Pending'}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <FloatingNextButton
        onClick={() => onNext(starredCandidates)}
        disabled={!schedulingComplete}
        label="Final Selection"
      />
    </div>
  );
}
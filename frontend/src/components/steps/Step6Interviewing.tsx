import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CheckCircle2, Users, TrendingUp, UserCheck } from 'lucide-react';

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
}

const INTERVIEW_SPECIALISTS = [
  {
    name: 'Laura Mendez',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/24c67f11-ccbb-4a72-9c74-80cda44f34f1.png',
    candidates: 14
  },
  {
    name: 'Diego Santos',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/cbfc4b01-e82f-4953-a6c0-b361f546a81b.png',
    candidates: 13
  },
  {
    name: 'Patricia Rojas',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/bef13c2c-8104-4670-8e3e-243d08fa6ead.png',
    candidates: 13
  }
];

export function Step6Interviewing({ onNext, onBack }: Step6Props) {
  const [interviewingComplete, setInterviewingComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setInterviewingComplete(true), 3000);
    const timer2 = setTimeout(() => setShowResults(true), 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const totalInterviewed = 40;
  const advancedToNextStage = 18;

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-3">
          <h1 className="squarespace-heading gradient-text mb-2 text-2xl">
            Interviewing Candidates
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Total Interviewed Indicator */}
          <Card className="p-4 border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-center gap-3">
              <UserCheck className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <div className="text-3xl font-light text-blue-600">
                  {showResults ? <AnimatedCounter target={totalInterviewed} duration={2000} /> : '—'}
                </div>
                <div className="text-[10px] font-light tracking-widest uppercase text-blue-700">
                  Total Interviewed
                </div>
              </div>
            </div>
          </Card>

          {/* Interview Specialists Section */}
          <Card className="p-4 border-2 gradient-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 gradient-primary rounded">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-light text-gray-900">Stafi Interview Specialists</h3>
                <p className="text-xs font-light text-gray-600">Structured human-led interviewing at scale</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {INTERVIEW_SPECIALISTS.map((specialist) => (
                <Card key={specialist.name} className="p-4 bg-gray-50 border border-gray-200">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={specialist.photo}
                      alt={specialist.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-2"
                    />
                    <div className="font-light text-gray-900 text-sm mb-1">
                      {specialist.name}
                    </div>
                    <div className="text-2xl font-light gradient-text mb-0.5">
                      {showResults ? <AnimatedCounter target={specialist.candidates} duration={2000} /> : '—'}
                    </div>
                    <div className="text-[10px] font-light text-gray-600">
                      candidates interviewed
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center text-xs font-light text-gray-600">
              Total of {totalInterviewed} candidates distributed evenly across interview team
            </div>
          </Card>

          {/* Interview Progress */}
          <Card className="p-4 border-2 gradient-border">
            <div className="flex items-center justify-center mb-3">
              <div className="relative">
                {!interviewingComplete ? (
                  <div className="w-20 h-20 rounded-full border-8 border-t-transparent animate-spin gradient-primary" 
                       style={{ borderColor: 'var(--gradient-start)', borderTopColor: 'transparent' }} />
                ) : (
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center animate-in zoom-in">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mb-3">
              {!interviewingComplete ? (
                <div>
                  <div className="text-base font-light text-gray-900 mb-1">
                    Interviews in Progress...
                  </div>
                  <div className="text-xs font-light text-gray-600">
                    Evaluating technical skills, cultural fit, and communication
                  </div>
                </div>
              ) : (
                <div className="inline-block gradient-primary text-white px-4 py-2 text-[10px] font-light tracking-widest uppercase rounded">
                  Interviews Complete
                </div>
              )}
            </div>
          </Card>

          {/* Advancement Indicator */}
          {showResults && (
            <Card className="p-6 gradient-primary text-white border-0 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-light tracking-widest uppercase mb-2 opacity-90">
                  Advanced to Next Stage
                </div>
                <div className="text-5xl font-light mb-2">
                  <AnimatedCounter target={advancedToNextStage} duration={2000} />
                </div>
                <div className="text-sm font-light opacity-90">
                  Candidates passed interviews and ready for hiring
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        disabled={!showResults}
        label="Hire & Train"
      />
    </div>
  );
}
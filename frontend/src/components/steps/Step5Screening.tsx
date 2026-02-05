import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CheckCircle2, Users } from 'lucide-react';

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
  totalApplicants?: number;
}

const SPECIALISTS = [
  {
    name: 'Sofia Martinez',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/4a316f8b-cf9d-4383-a9e3-d0c0daf4adf8.png',
    resumes: 382
  },
  {
    name: 'Carlos Rivera',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/6824a9b8-2e11-4516-8201-9efc8dff3893.png',
    resumes: 381
  },
  {
    name: 'Ana Gutierrez',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/f529a05a-9c18-4453-8ba0-520d5c86d685.png',
    resumes: 385
  },
  {
    name: 'Miguel Torres',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/afb1cfc2-aa2e-4e16-af9c-430f3efac37e.png',
    resumes: 384
  }
];

export function Step5Screening({ onNext, onBack, totalApplicants = 1532 }: Step5Props) {
  const [screeningComplete, setScreeningComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setScreeningComplete(true), 3000);
    const timer2 = setTimeout(() => setShowResults(true), 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const qualified = 40;
  const disqualified = 1492;

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-3">
          <h1 className="squarespace-heading gradient-text mb-3 text-2xl">
            Vetting Assessments
          </h1>

          {/* Top Indicators - 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-4">
            <Card className="p-4 border-2 border-blue-200 bg-blue-50">
              <div className="text-[10px] font-light tracking-widest uppercase text-blue-700 mb-1">
                Total Applicants
              </div>
              <div className="text-3xl font-light text-blue-600">
                {showResults ? <AnimatedCounter target={totalApplicants} duration={2000} /> : '—'}
              </div>
            </Card>

            <Card className="p-4 border-2 border-green-200 bg-green-50">
              <div className="text-[10px] font-light tracking-widest uppercase text-green-700 mb-1">
                Qualified Candidates
              </div>
              <div className="text-3xl font-light text-green-600">
                {showResults ? <AnimatedCounter target={qualified} duration={2000} /> : '—'}
              </div>
            </Card>

            <Card className="p-4 border-2 border-red-200 bg-red-50">
              <div className="text-[10px] font-light tracking-widest uppercase text-red-700 mb-1">
                Disqualified Candidates
              </div>
              <div className="text-3xl font-light text-red-600">
                {showResults ? <AnimatedCounter target={disqualified} duration={2000} /> : '—'}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Talent Acquisition Specialists Section */}
          <Card className="p-4 border-2 gradient-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 gradient-primary rounded">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-light text-gray-900">Stafi Talent Acquisition Specialists</h3>
                <p className="text-xs font-light text-gray-600">Human oversight and expert vetting</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {SPECIALISTS.map((specialist) => (
                <Card key={specialist.name} className="p-3 bg-gray-50 border border-gray-200">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={specialist.photo}
                      alt={specialist.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md mb-2"
                    />
                    <div className="font-light text-gray-900 text-xs mb-1">
                      {specialist.name}
                    </div>
                    <div className="text-xl font-light gradient-text mb-0.5">
                      {showResults ? <AnimatedCounter target={specialist.resumes} duration={2000} /> : '—'}
                    </div>
                    <div className="text-[10px] font-light text-gray-600">
                      resumes reviewed
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Screening Progress */}
          <Card className="p-4 border-2 gradient-border">
            <div className="flex items-center justify-center mb-3">
              <div className="relative">
                {!screeningComplete ? (
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
              {!screeningComplete ? (
                <div>
                  <div className="text-base font-light text-gray-900 mb-1">
                    Vetting in Progress...
                  </div>
                  <div className="text-xs font-light text-gray-600">
                    Analyzing qualifications, experience, and assessments
                  </div>
                </div>
              ) : (
                <div className="inline-block gradient-primary text-white px-4 py-2 text-[10px] font-light tracking-widest uppercase rounded">
                  Vetting Complete
                </div>
              )}
            </div>
          </Card>

          {/* Vetting Assessments List */}
          {showResults && (
            <Card className="p-4 border-2 gradient-border animate-in fade-in slide-in-from-bottom-4 delay-300">
              <h3 className="text-[10px] font-light tracking-widest uppercase gradient-text mb-2">Vetting Assessments</h3>
              <div className="grid sm:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="font-light text-gray-900 text-xs">English C2</div>
                    <div className="text-[10px] font-light text-gray-600">Advanced proficiency</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="font-light text-gray-900 text-xs">Attention to Detail</div>
                    <div className="text-[10px] font-light text-gray-600">Precision testing</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="font-light text-gray-900 text-xs">DISC Personality</div>
                    <div className="text-[10px] font-light text-gray-600">Behavioral assessment</div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        disabled={!showResults}
        label="Interview"
      />
    </div>
  );
}
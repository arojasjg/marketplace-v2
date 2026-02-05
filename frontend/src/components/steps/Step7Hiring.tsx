import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CheckCircle2, GraduationCap, Users } from 'lucide-react';

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
}

const ROLE_BREAKDOWN = [
  { role: 'Intake Specialists', count: 7, color: 'from-blue-500 to-blue-600' },
  { role: 'Paralegals / Case Managers', count: 6, color: 'from-purple-500 to-purple-600' },
  { role: 'Admin', count: 3, color: 'from-green-500 to-green-600' },
  { role: 'Hybrid', count: 2, color: 'from-orange-500 to-orange-600' }
];

export function Step7Hiring({ onNext, onBack }: Step7Props) {
  const [hiringComplete, setHiringComplete] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setHiringComplete(true), 2500);
    const timer2 = setTimeout(() => setShowBreakdown(true), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const totalHired = 18;

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-3">
          <h1 className="squarespace-heading gradient-text mb-2 text-2xl">
            Candidates hired by Stafi
          </h1>
          <p className="text-4xl font-light text-gray-900 mb-1">
            Ready to begin task-specific training
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Total Hired Indicator */}
          <Card className="p-6 gradient-primary text-white border-0">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-3 bg-white/20 rounded-full">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-light tracking-widest uppercase mb-2 opacity-90">
                Total Candidates Hired
              </div>
              <div className="text-5xl font-light mb-2">
                {hiringComplete ? <AnimatedCounter target={totalHired} duration={2500} /> : '—'}
              </div>
            </div>
          </Card>

          {/* Hiring Progress */}
          <Card className="p-4 border-2 gradient-border">
            <div className="flex items-center justify-center mb-3">
              <div className="relative">
                {!hiringComplete ? (
                  <div className="w-20 h-20 rounded-full border-8 border-t-transparent animate-spin gradient-primary" 
                       style={{ borderColor: 'var(--gradient-start)', borderTopColor: 'transparent' }} />
                ) : (
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center animate-in zoom-in">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              {!hiringComplete ? (
                <div>
                  <div className="text-base font-light text-gray-900 mb-1">
                    Finalizing Hiring Decisions...
                  </div>
                  <div className="text-xs font-light text-gray-600">
                    Processing offers and onboarding paperwork
                  </div>
                </div>
              ) : (
                <div className="inline-block gradient-primary text-white px-4 py-2 text-[10px] font-light tracking-widest uppercase rounded">
                  All Candidates Hired
                </div>
              )}
            </div>
          </Card>

          {/* Role Breakdown */}
          {showBreakdown && (
            <Card className="p-4 border-2 gradient-border animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-sm font-light text-gray-900 mb-3">Breakdown by role type</h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {ROLE_BREAKDOWN.map((role) => (
                  <Card key={role.role} className="p-3 bg-gray-50 border border-gray-200">
                    <div className="text-center">
                      <div className={`inline-block p-2 bg-gradient-to-br ${role.color} rounded-full mb-2`}>
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-2xl font-light gradient-text mb-1">
                        <AnimatedCounter target={role.count} duration={2000} />
                      </div>
                      <div className="text-xs font-light text-gray-900">
                        {role.role}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-3 text-center text-xs font-light text-gray-600">
                Diverse skill sets aligned with your operational needs
              </div>
            </Card>
          )}
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        disabled={!showBreakdown}
        label="Begin Training"
      />
    </div>
  );
}
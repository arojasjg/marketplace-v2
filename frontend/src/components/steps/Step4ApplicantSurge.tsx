import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CITIES } from '@/data/cities';
import { Users } from 'lucide-react';

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const CITY_APPLICANTS: Record<string, number> = {
  'mx-1': 142,
  'mx-2': 98,
  'ca-1': 87,
  'ca-2': 76,
  'ca-3': 65,
  'ca-4': 71,
  'ca-5': 89,
  'sa-1': 156,
  'sa-2': 134,
  'sa-3': 92,
  'sa-4': 118,
  'sa-5': 81,
  'sa-6': 145,
  'sa-7': 178,
};

export function Step4ApplicantSurge({ onNext, onBack }: Step4Props) {
  const [showCounters, setShowCounters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCounters(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalApplicants = Object.values(CITY_APPLICANTS).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-white pt-16 pb-24">
      <BackButton onClick={onBack} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="squarespace-heading gradient-text mb-2">
            Applicant Surge in Progress
          </h1>
          <p className="text-base font-light text-gray-600 max-w-3xl mx-auto">
            Applications are flooding in from across Latin America
          </p>
        </div>

        <Card className="p-8 mb-6 gradient-primary text-white border-0">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <div className="text-4xl sm:text-5xl font-light mb-2">
              {showCounters && <AnimatedCounter target={totalApplicants} duration={3000} />}
            </div>
            <div className="text-sm font-light tracking-widest uppercase opacity-90">Total Applicants</div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CITIES.map((city) => (
            <Card key={city.id} className="p-4 hover:shadow-lg transition-all duration-300 border-2 gradient-border">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="font-light text-gray-900 text-sm mb-1 truncate">{city.name}</div>
                  <div className="text-xs font-light text-gray-500 truncate">{city.country}</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-2xl font-light gradient-text">
                    {showCounters && (
                      <AnimatedCounter 
                        target={CITY_APPLICANTS[city.id] || 0} 
                        duration={2500}
                      />
                    )}
                  </div>
                  <div className="text-[10px] font-light tracking-wide uppercase text-gray-500">applicants</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        label="Screen"
      />
    </div>
  );
}
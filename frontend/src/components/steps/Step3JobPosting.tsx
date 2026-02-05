import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { CyclingCandidatePhotos } from '@/components/CyclingCandidatePhotos';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { CITIES } from '@/data/cities';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

export function Step3JobPosting({ onNext, onBack }: Step3Props) {
  const [postedCities, setPostedCities] = useState<Set<string>>(new Set());
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    if (!CITIES || CITIES.length === 0) {
      console.error('CITIES array is empty or undefined');
      setAllComplete(true);
      return;
    }

    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < CITIES.length && CITIES[currentIndex]) {
        const cityId = CITIES[currentIndex].id;
        if (cityId) {
          setPostedCities(prev => new Set([...prev, cityId]));
        }
        currentIndex++;
      } else {
        setAllComplete(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <h1 className="text-lg sm:text-xl font-light gradient-text">
            Posting Across Latin America
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-light tracking-wide uppercase text-gray-600">
              Live Applicants
            </span>
            <div className="scale-75 origin-right">
              <CyclingCandidatePhotos />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2 pr-2">
            <div className="grid grid-cols-1 gap-1.5">
              {CITIES.map((city) => {
                if (!city || !city.id) {
                  return null;
                }

                const isPosted = postedCities.has(city.id);
                
                return (
                  <Card
                    key={city.id}
                    className={cn(
                      'p-2 transition-all duration-500 border-2',
                      isPosted ? 'gradient-border bg-gray-50' : 'border-gray-200 bg-white'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-500 flex-shrink-0',
                          isPosted ? 'bg-gradient-to-br from-blue-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-500'
                        )}>
                          {city.displayNumber}
                        </span>
                        <div className="min-w-0">
                          <div className={cn(
                            'font-light transition-colors duration-500 truncate text-xs',
                            isPosted ? 'text-gray-900 font-medium' : 'text-gray-600'
                          )}>
                            {city.name}
                          </div>
                          <div className="text-[10px] font-light text-gray-500 truncate">
                            {city.country}
                          </div>
                        </div>
                      </div>
                      
                      {isPosted && (
                        <div className="flex items-center gap-1 animate-in fade-in zoom-in duration-300 flex-shrink-0">
                          <Check className="h-3 w-3 text-green-600" />
                          <span className="text-[10px] font-light tracking-widest uppercase text-green-700 hidden sm:inline">
                            Posted
                          </span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-3 gradient-primary text-white border-0">
              <div className="text-center">
                <div className="text-2xl font-light mb-1">
                  {postedCities.size}
                </div>
                <div className="text-[10px] font-light tracking-widest uppercase opacity-90">
                  Cities Activated
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        disabled={!allComplete}
        label="View Surge"
      />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Brain, Heart, Target } from 'lucide-react';

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
}

export function Step6Assessments({ onNext, onBack }: Step6Props) {
  const [personalityProgress, setPersonalityProgress] = useState(0);
  const [psychologicalProgress, setPsychologicalProgress] = useState(0);
  const [filteringProgress, setFilteringProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // All three animations start immediately and run simultaneously
    const personalityTimer = setInterval(() => {
      setPersonalityProgress(prev => {
        if (prev >= 100) {
          clearInterval(personalityTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const psychTimer = setInterval(() => {
      setPsychologicalProgress(prev => {
        if (prev >= 100) {
          clearInterval(psychTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const filterTimer = setInterval(() => {
      setFilteringProgress(prev => {
        if (prev >= 100) {
          clearInterval(filterTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const resultsTimer = setTimeout(() => setShowResults(true), 3000);

    return () => {
      clearInterval(personalityTimer);
      clearInterval(psychTimer);
      clearInterval(filterTimer);
      clearTimeout(resultsTimer);
    };
  }, []);

  const totalCandidates = 102;
  const passedCandidates = Math.floor(totalCandidates * 0.4);

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-8">
      <BackButton onClick={onBack} />
      
      <div className="max-w-5xl mx-auto px-8 h-full flex flex-col">
        <div className="text-center mb-6">
          <h1 className="squarespace-heading gradient-text mb-2">
            Personality & Psychological Assessments
          </h1>
          <p className="text-base font-light text-gray-600 max-w-3xl mx-auto">
            Advanced testing to ensure candidates are the right fit
          </p>
        </div>

        <div className="flex-1 overflow-y-auto pr-20">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6 border-2 gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-primary rounded">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-900 mb-1">Personality</h3>
                  <p className="text-xs font-light text-gray-500">Big Five traits</p>
                </div>
              </div>
              <Progress value={personalityProgress} className="mb-2 h-2" />
              <div className="text-xs font-light text-gray-600 text-right">
                {personalityProgress}% Complete
              </div>
            </Card>

            <Card className="p-6 border-2 gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-primary rounded">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-900 mb-1">Psychological</h3>
                  <p className="text-xs font-light text-gray-500">EQ & resilience</p>
                </div>
              </div>
              <Progress value={psychologicalProgress} className="mb-2 h-2" />
              <div className="text-xs font-light text-gray-600 text-right">
                {psychologicalProgress}% Complete
              </div>
            </Card>

            <Card className="p-6 border-2 gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-primary rounded">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-900 mb-1">Filtering</h3>
                  <p className="text-xs font-light text-gray-500">Top performers</p>
                </div>
              </div>
              <Progress value={filteringProgress} className="mb-2 h-2" />
              <div className="text-xs font-light text-gray-600 text-right">
                {filteringProgress}% Complete
              </div>
            </Card>
          </div>

          {showResults && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <Card className="p-8 gradient-primary text-white border-0">
                <div className="text-center">
                  <div className="inline-block bg-white text-gray-900 px-4 py-2 text-xs font-light tracking-widest uppercase mb-4 rounded">
                    Assessments Complete
                  </div>
                  <div className="text-5xl font-light mb-2">
                    <AnimatedCounter target={passedCandidates} duration={2000} />
                  </div>
                  <div className="text-lg font-light mb-2">
                    Candidates Passed (40%)
                  </div>
                  <div className="text-xs font-light opacity-75">
                    Ready for Stafi University training
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 gradient-border">
                <h3 className="text-xs font-light tracking-widest uppercase gradient-text mb-4">Score Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-light mb-2">
                      <span className="text-gray-600">90-100 (Excellent)</span>
                      <span className="text-gray-900">12 candidates</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-light mb-2">
                      <span className="text-gray-600">80-89 (Very Good)</span>
                      <span className="text-gray-900">18 candidates</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-light mb-2">
                      <span className="text-gray-600">70-79 (Good)</span>
                      <span className="text-gray-900">11 candidates</span>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        disabled={!showResults}
        label="Train"
      />
    </div>
  );
}
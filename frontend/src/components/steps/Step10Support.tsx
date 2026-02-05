import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { COACHES } from '@/data/coaches';
import { CheckCircle2, Shield, MessageCircle, TrendingUp, Users, Headphones } from 'lucide-react';

interface Step10Props {
  onRestart: () => void;
  onBack: () => void;
}

export function Step10Support({ onRestart, onBack }: Step10Props) {
  const coach = COACHES[0];

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-3">
          <h1 className="squarespace-heading gradient-text mb-2 text-2xl">
            Stafi Support System
          </h1>
          <p className="text-sm font-light text-gray-600 max-w-3xl mx-auto">
            Two-tier support structure for your success
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Part 1: Your Stafi Representative dedicated Coach */}
            <Card className="p-6 border-2 gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-primary rounded">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-lg font-light gradient-text">
                  Your Stafi Representative dedicated Coach
                </h2>
              </div>

              <div className="flex flex-col items-center text-center mb-4">
                <img
                  src={coach.photo}
                  alt={coach.name}
                  className="w-28 h-28 rounded-full object-cover border-4 mb-3"
                  style={{ borderColor: 'var(--gradient-end)' }}
                />
                <div className="text-xl font-light gradient-text mb-1">
                  {coach.name}
                </div>
                <div className="text-sm font-light text-gray-600 mb-3">
                  {coach.title}
                </div>
                <p className="text-xs font-light text-gray-600 leading-relaxed mb-3">
                  {coach.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {coach.specialties.slice(0, 3).map((specialty, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-[10px] font-light text-gray-900 border border-gray-200 rounded"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-light text-gray-900 text-xs mb-1">
                      First Line of Support
                    </h3>
                    <p className="text-xs font-light text-gray-600 leading-relaxed">
                      Your representative escalates questions to their coach, not to you. This protects your time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-light text-gray-900 text-xs mb-1">
                      Real-Time Guidance
                    </h3>
                    <p className="text-xs font-light text-gray-600 leading-relaxed">
                      Coaches provide immediate support for complex questions and situations.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Part 2: Client Success Specialist assigned to your Lawfirm */}
            <Card className="p-6 border-2 gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-primary rounded">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-lg font-light gradient-text">
                  Client Success Specialist assigned to your Lawfirm
                </h2>
              </div>

              <div className="flex flex-col items-center text-center mb-4">
                <img
                  src="https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-14/2f422cbd-5548-4b67-986d-4ef14cae3ffa.png"
                  alt="Sarah Mitchell"
                  className="w-28 h-28 rounded-full object-cover border-4 mb-3"
                  style={{ borderColor: 'var(--gradient-end)' }}
                />
                <div className="text-xl font-light gradient-text mb-1">
                  Sarah Mitchell
                </div>
                <div className="text-sm font-light text-gray-600 mb-3">
                  Client Success Specialist
                </div>
                <p className="text-xs font-light text-gray-600 leading-relaxed">
                  A dedicated specialist who understands your firm's unique needs and ensures 
                  smooth operations, proactive support, and continuous optimization.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-light text-gray-900 text-xs mb-1">
                      Strategic Partnership
                    </h3>
                    <p className="text-xs font-light text-gray-600 leading-relaxed">
                      Regular check-ins to optimize workflows, address concerns, and identify growth opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-light text-gray-900 text-xs mb-1">
                      Quality Assurance
                    </h3>
                    <p className="text-xs font-light text-gray-600 leading-relaxed">
                      Monitors performance metrics and ensures your representatives meet your standards.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 gradient-primary text-white mb-4 border-0">
            <div className="text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-3" />
              <h2 className="text-2xl font-light mb-3">
                Stafi Already Did the Hard Work
              </h2>
              <p className="text-sm font-light opacity-90 mb-4 max-w-3xl mx-auto leading-relaxed">
                By the time you meet your Stafi Representative, they've been sourced from 
                1,500+ applicants, screened by AI, assessed for fit, and trained at Stafi University.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-[10px]">
                <div className="bg-white text-gray-900 px-3 py-1.5 font-light tracking-wide uppercase rounded">AI-Screened</div>
                <div className="bg-white text-gray-900 px-3 py-1.5 font-light tracking-wide uppercase rounded">Assessed</div>
                <div className="bg-white text-gray-900 px-3 py-1.5 font-light tracking-wide uppercase rounded">Trained</div>
                <div className="bg-white text-gray-900 px-3 py-1.5 font-light tracking-wide uppercase rounded">Supported</div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-3">
            <button
              onClick={onRestart}
              className="btn-squarespace-secondary text-sm py-2 px-5 flex items-center gap-2"
            >
              Start New Demo
            </button>
            <button
              onClick={() => window.location.href = 'https://stafi.com'}
              className="btn-cta-blue text-sm py-2 px-5 flex items-center gap-2"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
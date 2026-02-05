'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle2, Clock, AlertCircle, PlayCircle } from 'lucide-react';
import { Milestones } from '@/components/milestones';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { userData, updateAssessment } = useAuth();

  if (!userData) return null;

  const completionPercentage = userData.completionPercentage;
  const isResumeComplete = completionPercentage >= 80;

  const vettingAssessments = userData.assessments?.filter((a) => a.type === 'vetting') || [];
  const additionalAssessments = userData.assessments?.filter((a) => a.type === 'additional') || [];
  const completedVettingAssessments = vettingAssessments.filter((a) => a.status === 'approved').length;
  const isAssessmentsComplete = completedVettingAssessments >= 3;

  const isTAApproved = userData.taApprovalStatus === 'approved';
  const isFeaturesUnlocked = isResumeComplete && isAssessmentsComplete && isTAApproved;

  const getAssessmentStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAssessmentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      'not-started': { label: 'Not Started', className: 'bg-gray-100 text-gray-700' },
      'in-progress': { label: 'In Progress', className: 'bg-amber-100 text-amber-700' },
      submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-700' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
    };
    return statusMap[status] || statusMap['not-started'];
  };

  const handleStartAssessment = (assessmentId: string) => {
    updateAssessment(assessmentId, 'in-progress');
    toast.info('Check your email to start!', {
      duration: 4000,
    });
  };

  // Assessment descriptions for vetting assessments
  const getAssessmentDescription = (assessmentId: string): string => {
    const descriptions: Record<string, string> = {
      'a1': '📣 Why this matters:\nLaw firms filter candidates by English level.\nThis free certification makes your profile searchable for high-level roles.',
      'a2': '🧠 Why this matters:\nU.S. law firms value accuracy.\nThis assessment highlights your reliability and strengthens your profile ranking.',
      'a3': '🎥 Why this matters:\nLaw firms want to see the person behind the resume.\nA short intro video increases profile views and interview requests.',
    };
    return descriptions[assessmentId] || '';
  };

  return (
    <div className="space-y-10">
      {/* Milestones Section */}
      <Milestones />

      {/* Main Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resume Completion Card */}
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">Resume Progress</CardTitle>
                <CardDescription className="text-gray-600">Build the profile law firms search for.</CardDescription>
              </div>
              <Badge
                variant="secondary"
                className={`${isResumeComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} font-medium`}
              >
                {completionPercentage}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Progress to unlock features</span>
                <span className="font-medium text-gray-900">{completionPercentage}% / 80%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            {!isResumeComplete && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-base text-amber-900 leading-relaxed">
                  <strong>Almost there!</strong> Complete {80 - completionPercentage}% more to unlock messaging and interviews.
                </p>
              </div>
            )}

            {isResumeComplete && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-base text-green-900 font-medium">Resume completed! Great job!</p>
              </div>
            )}

            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
            >
              <Link href="/resume">{isResumeComplete ? 'View Resume' : 'Complete Your Resume'}</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Vetting Assessments Card */}
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 mb-2">Unlock Your Profile Visibility</CardTitle>
            <CardDescription className="text-blue-600 font-medium">
              {'✨ 100% free. No hidden steps. Complete assessments to get discovered by U.S. law firms'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">Assessments Completed</span>
                <Badge
                  variant="secondary"
                  className={`${isAssessmentsComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} font-medium`}
                >
                  {completedVettingAssessments} / 3
                </Badge>
              </div>

              <div className="space-y-3">
                {vettingAssessments.map((assessment) => {
                  const statusBadge = getAssessmentStatusBadge(assessment.status);
                  const description = getAssessmentDescription(assessment.id);
                  return (
                    <div
                      key={assessment.id}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-0.5">
                            {getAssessmentStatusIcon(assessment.status)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <p className="text-base font-medium text-gray-900">{assessment.name}</p>
                              <Badge variant="secondary" className={`${statusBadge.className} text-sm mt-1.5 font-medium`}>
                                {statusBadge.label}
                              </Badge>
                            </div>
                            {description && (
                              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed mt-2">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={assessment.status === 'not-started' ? 'default' : 'outline'}
                          onClick={() => handleStartAssessment(assessment.id)}
                          disabled={assessment.status === 'approved'}
                          className={`${assessment.status === 'not-started' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-200 bg-transparent'} transition-all flex-shrink-0`}
                        >
                          {assessment.status === 'approved' ? 'Completed' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Card - LOCKED */}
        <Card
          className={`border-gray-100 shadow-sm transition-all duration-200 ${!isFeaturesUnlocked ? 'opacity-60' : 'hover:shadow-md'}`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl font-semibold text-gray-900">Messages</CardTitle>
                  {!isFeaturesUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                <CardDescription className="text-gray-600">Connect with potential employers</CardDescription>
              </div>
              {!isFeaturesUnlocked && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-medium">
                  Locked
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 space-y-3 border border-gray-100">
              <p className="text-base font-medium text-gray-700">Unlock by completing:</p>
              <ul className="space-y-2 text-base text-gray-600">
                <li className="flex items-center gap-2">
                  {isResumeComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  )}
                  Resume completion ≥ 80%
                </li>
                <li className="flex items-center gap-2">
                  {isAssessmentsComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  )}
                  Vetting assessments approved
                </li>
                <li className="flex items-center gap-2">
                  {isTAApproved ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  )}
                  Approved by TA team
                </li>
              </ul>
            </div>
            <Button variant="outline" className="w-full h-12 border-gray-200 font-medium rounded-lg bg-transparent" disabled>
              <Lock className="mr-2 h-4 w-4" />
              Unlock Messages
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Interviews Card - LOCKED */}
        <Card
          className={`border-gray-100 shadow-sm transition-all duration-200 ${!isFeaturesUnlocked ? 'opacity-60' : 'hover:shadow-md'}`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl font-semibold text-gray-900">Scheduled Interviews</CardTitle>
                  {!isFeaturesUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                <CardDescription className="text-gray-600">Upcoming interview sessions</CardDescription>
              </div>
              {!isFeaturesUnlocked && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-medium">
                  Locked
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 space-y-3 border border-gray-100">
              <p className="text-base font-medium text-gray-700">Unlock by completing:</p>
              <ul className="space-y-2 text-base text-gray-600">
                <li className="flex items-center gap-2">
                  {isResumeComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  )}
                  Resume completion ≥ 80%
                </li>
                <li className="flex items-center gap-2">
                  {isAssessmentsComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  )}
                  Vetting assessments approved
                </li>
                <li className="flex items-center gap-2">
                  {isTAApproved ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  )}
                  Approved by TA team
                </li>
              </ul>
            </div>
            <Button variant="outline" className="w-full h-12 border-gray-200 font-medium rounded-lg bg-transparent" disabled>
              <Lock className="mr-2 h-4 w-4" />
              Unlock Interviews
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Assessments Section */}
      {additionalAssessments.length > 0 && (
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Other Assessments</CardTitle>
            <CardDescription className="text-gray-600">Additional assessments to enhance your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {additionalAssessments.map((assessment) => {
                const statusBadge = getAssessmentStatusBadge(assessment.status);
                return (
                  <div
                    key={assessment.id}
                    className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getAssessmentStatusIcon(assessment.status)}
                        <h4 className="text-base font-medium text-gray-900">{assessment.name}</h4>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`${statusBadge.className} text-sm font-medium`}>
                      {statusBadge.label}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-gray-200 transition-all bg-transparent"
                      onClick={() => handleStartAssessment(assessment.id)}
                      disabled={assessment.status === 'approved'}
                    >
                      {assessment.status === 'approved' ? 'Completed' : 'Start'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestone Achievement */}
      {isResumeComplete && (
        <Card className="border-green-100 bg-green-50">
          <CardContent className="flex items-center gap-5 p-8">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-1">Congratulations!</h3>
              <p className="text-base text-green-700 leading-relaxed">
                {"You've reached 80% profile completion! Complete your assessments to unlock all features."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

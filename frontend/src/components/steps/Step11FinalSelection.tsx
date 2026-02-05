import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { CANDIDATES } from '@/data/candidates';
import { MANDATORY_COURSES } from '@/data/courses';
import { TASK_COURSES, Task } from '@/data/tasks';
import { UserCheck, Eye, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step11Props {
  selectedTasks: Task[];
  starredCandidates: Set<string>;
  onNext: () => void;
  onBack: () => void;
}

export function Step11FinalSelection({ selectedTasks, starredCandidates, onNext, onBack }: Step11Props) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hiredCandidate, setHiredCandidate] = useState<string | null>(null);
  const [disqualifiedCandidates, setDisqualifiedCandidates] = useState<Set<string>>(new Set());

  const topCandidates = CANDIDATES
    .filter(c => starredCandidates.has(c.id) && !disqualifiedCandidates.has(c.id))
    .sort((a, b) => b.overallScore - a.overallScore);

  const disqualifyCandidate = (candidateId: string) => {
    setDisqualifiedCandidates(prev => new Set([...prev, candidateId]));
  };

  const handleHireCandidate = (candidateId: string) => {
    setHiredCandidate(candidateId);
  };

  const candidate = CANDIDATES.find(c => c.id === selectedCandidate);

  const taskSpecificCourses = selectedTasks.flatMap(task => 
    TASK_COURSES[task.id] || []
  );
  const uniqueTaskCourses = Array.from(new Set(taskSpecificCourses));

  const generateCourseScores = (overallScore: number) => {
    return uniqueTaskCourses.map(courseName => ({
      name: courseName,
      score: Math.floor(overallScore - 5 + Math.random() * 10)
    }));
  };

  const taskCourseAverage = candidate ? 
    generateCourseScores(candidate.overallScore).reduce((sum, c) => sum + c.score, 0) / uniqueTaskCourses.length : 0;

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-3">
          <h1 className="squarespace-heading gradient-text mb-1 text-2xl">
            Final Candidate Selection
          </h1>
          <p className="text-xs font-light text-gray-600">
            Review the top candidates and select one to hire
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {hiredCandidate ? (
            <Card className="p-12 gradient-primary text-white border-0 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="h-24 w-24 mx-auto mb-6" />
              <h2 className="text-4xl font-light mb-4">Candidate Hired!</h2>
              <p className="text-xl font-light mb-6">
                {CANDIDATES.find(c => c.id === hiredCandidate)?.firstName} {CANDIDATES.find(c => c.id === hiredCandidate)?.lastNameInitial}. has been successfully hired
              </p>
              <div className="text-sm font-light opacity-90">
                Your new team member will be onboarded and ready to start
              </div>
            </Card>
          ) : (
            <div className="space-y-2 mb-3">
              {topCandidates.map((candidate, index) => {
                return (
                  <Card
                    key={candidate.id}
                    className="p-3 hover:shadow-xl transition-all duration-300 border-2 gradient-border"
                  >
                    <div className="flex items-center gap-3">
                      {/* Numeric Ranking */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{index + 1}</span>
                      </div>

                      <img
                        src={candidate.photo}
                        alt={`${candidate.firstName} ${candidate.lastNameInitial}.`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-base font-light text-gray-900">
                            {candidate.firstName} {candidate.lastNameInitial}.
                          </h3>
                        </div>
                        
                        {/* Role Label */}
                        <div className="text-xs font-light text-gray-500 mb-1">
                          {candidate.role}
                        </div>

                        {/* Score Breakdown */}
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <div className="text-[9px] font-light tracking-wide uppercase text-gray-600">
                              Vetting
                            </div>
                            <div className="text-sm font-light text-gray-900">
                              {candidate.vettingScore}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] font-light tracking-wide uppercase text-gray-600">
                              Mandatory
                            </div>
                            <div className="text-sm font-light text-gray-900">
                              {candidate.mandatoryCoursesScore}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] font-light tracking-wide uppercase text-gray-600">
                              Lawfirm
                            </div>
                            <div className="text-sm font-light text-gray-900">
                              {candidate.lawfirmCoursesScore}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] font-light tracking-wide uppercase text-gray-600">
                              Average
                            </div>
                            <div className="text-lg font-light gradient-text">
                              {candidate.overallScore}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setSelectedCandidate(candidate.id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 text-[10px] font-light tracking-wide uppercase rounded transition-colors flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Profile
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHireCandidate(candidate.id);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-[10px] font-light tracking-wide uppercase rounded transition-colors flex items-center gap-1"
                        >
                          <UserCheck className="h-3 w-3" />
                          Hire
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            disqualifyCandidate(candidate.id);
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 text-[10px] font-light tracking-wide uppercase rounded transition-colors flex items-center gap-1"
                        >
                          <X className="h-3 w-3" />
                          Disqualify
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        disabled={!hiredCandidate}
        label="Continue"
      />

      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light gradient-text">Candidate Profile</DialogTitle>
          </DialogHeader>
          {candidate && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                <img
                  src={candidate.photo}
                  alt={`${candidate.firstName} ${candidate.lastNameInitial}.`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <div>
                  <h3 className="text-3xl font-light text-gray-900 mb-1">
                    {candidate.firstName} {candidate.lastNameInitial}.
                  </h3>
                  <div className="text-sm font-light text-gray-600">
                    {candidate.role}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border-2 gradient-border">
                  <div className="text-xs font-light tracking-wide uppercase text-gray-600 mb-1">Vetting Score</div>
                  <div className="text-3xl font-light gradient-text">
                    {candidate.vettingScore}%
                  </div>
                </Card>
                <Card className="p-4 border-2 gradient-border">
                  <div className="text-xs font-light tracking-wide uppercase text-gray-600 mb-1">Mandatory Courses</div>
                  <div className="text-3xl font-light text-gray-900">
                    {candidate.mandatoryCoursesScore}%
                  </div>
                </Card>
                <Card className="p-4 border-2 gradient-border">
                  <div className="text-xs font-light tracking-wide uppercase text-gray-600 mb-1">Lawfirm Courses</div>
                  <div className="text-3xl font-light text-gray-900">
                    {candidate.lawfirmCoursesScore}%
                  </div>
                </Card>
                <Card className="p-4 border-2 gradient-border">
                  <div className="text-xs font-light tracking-wide uppercase text-gray-600 mb-1">Average Score</div>
                  <div className="text-3xl font-light gradient-text">
                    {candidate.overallScore}%
                  </div>
                </Card>
              </div>

              {/* DISC Personality Type */}
              <Card className="p-4 border-2 gradient-border">
                <div className="text-xs font-light tracking-widest uppercase gradient-text mb-2">
                  DISC Personality Type
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-3xl font-light">{candidate.discType}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-light text-gray-900 mb-1">
                      {candidate.discType === 'D' && 'Dominance'}
                      {candidate.discType === 'I' && 'Influence'}
                      {candidate.discType === 'S' && 'Steadiness'}
                      {candidate.discType === 'C' && 'Conscientiousness'}
                    </div>
                    <p className="text-xs font-light text-gray-600 leading-relaxed">
                      {candidate.discDescription}
                    </p>
                  </div>
                </div>
              </Card>

              <div>
                <h4 className="text-xs font-light tracking-widest uppercase gradient-text mb-3">
                  Mandatory Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {MANDATORY_COURSES.map((course) => (
                    <div
                      key={course.id}
                      className="px-3 py-2 bg-gray-100 text-xs font-light text-gray-900 border border-gray-200 rounded"
                    >
                      {course.name}
                    </div>
                  ))}
                </div>
              </div>

              {uniqueTaskCourses.length > 0 && (
                <div>
                  <h4 className="text-xs font-light tracking-widest uppercase gradient-text mb-3">
                    Task-Specific Course Scores
                  </h4>
                  <p className="text-xs font-light text-gray-600 mb-3 italic">
                    These scores are based on the exact tasks you selected in Step 1.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {generateCourseScores(candidate.overallScore).map((course, index) => (
                      <Card key={index} className="p-3 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-light text-gray-900">{course.name}</div>
                          <div className="text-lg font-light gradient-text">{course.score}%</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-3 p-3 gradient-primary text-white rounded text-center">
                    <div className="text-xs font-light tracking-wide uppercase mb-1">Average Score</div>
                    <div className="text-2xl font-light">{Math.round(taskCourseAverage)}%</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
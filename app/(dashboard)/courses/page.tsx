'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CheckCircle2, Scale, Users, Briefcase, Key, TrendingUp, RefreshCw } from 'lucide-react';
import type { TaskCourse } from '@/lib/types';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const { userData, updateTaskCourse } = useAuth();
  const [courseFilter, setCourseFilter] = useState<'legal' | 'admin-marketing' | 'people-facing'>('legal');
  const [sortBy, setSortBy] = useState<'default' | 'most-requested'>('default');
  const [credentialsStatus] = useState<'active' | 'inactive'>('active');
  const [highlightedCourseId, setHighlightedCourseId] = useState<string | null>(null);
  const courseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Handle URL query parameters for deep linking from Job Posts
  useEffect(() => {
    const category = searchParams.get('category');
    const courseId = searchParams.get('courseId');
    
    if (category && ['legal', 'admin-marketing', 'people-facing'].includes(category)) {
      setCourseFilter(category as 'legal' | 'admin-marketing' | 'people-facing');
    }
    
    if (courseId) {
      setHighlightedCourseId(courseId);
      // Scroll to the course after a short delay to allow rendering
      setTimeout(() => {
        const courseElement = courseRefs.current[courseId];
        if (courseElement) {
          courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedCourseId(null);
      }, 3000);
    }
  }, [searchParams]);

  if (!userData) return null;

  const handleStartCourse = (courseId: string, currentStatus: string, currentScore?: number) => {
    // If course is completed with score < 75%, allow re-take
    if (currentStatus === 'completed' && currentScore !== undefined && currentScore < 75) {
      updateTaskCourse(courseId, 'in-progress');
    } else if (currentStatus === 'start') {
      updateTaskCourse(courseId, 'in-progress');
    }
    // For in-progress, do nothing (button should say "Resume" but same action)
  };

  const handleRequestCredentials = () => {
    alert('Credentials request submitted! You will receive an email with your access details.');
  };

  // Calculate category statistics
  const getCategoryStats = (category: typeof courseFilter) => {
    const categoryCourses = userData.taskCourses?.filter((course) => course.category === category) || [];

    const completed = categoryCourses.filter(
      (c) => c.status === 'completed' && (c.score === undefined || c.score >= 75)
    ).length;

    const inProgress = categoryCourses.filter((c) => c.status === 'in-progress').length;

    const retakeRequired = categoryCourses.filter(
      (c) => c.status === 'completed' && c.score !== undefined && c.score < 75
    ).length;

    return { completed, inProgress, retakeRequired };
  };

  // Filter courses by category
  let filteredCourses = userData.taskCourses?.filter((course) => course.category === courseFilter) || [];

  // Sort courses if "most-requested" is selected
  if (sortBy === 'most-requested') {
    const priorityCourses = ['Contract Law Fundamentals', 'Client Communication Skills', 'Legal Research Methods'];
    filteredCourses = [...filteredCourses].sort((a, b) => {
      const aPriority = priorityCourses.includes(a.name) ? 0 : 1;
      const bPriority = priorityCourses.includes(b.name) ? 0 : 1;
      return aPriority - bPriority;
    });
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'legal':
        return <Scale className="h-8 w-8 text-blue-600" />;
      case 'people-facing':
        return <Users className="h-8 w-8 text-purple-600" />;
      case 'admin-marketing':
        return <Briefcase className="h-8 w-8 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal':
        return 'from-blue-50 to-blue-100';
      case 'people-facing':
        return 'from-purple-50 to-purple-100';
      case 'admin-marketing':
        return 'from-yellow-50 to-yellow-100';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  const getActionButtonLabel = (course: TaskCourse) => {
    if (course.status === 'completed' && course.score !== undefined && course.score < 75) {
      return 'Re-take';
    }
    if (course.status === 'in-progress') {
      return 'Resume';
    }
    if (course.status === 'completed') {
      return 'Completed';
    }
    return 'Start Course';
  };

  const getCourseScore = (course: TaskCourse): number => {
    return course.score ?? 0;
  };

  const stats = getCategoryStats(courseFilter);

  return (
    <div className="space-y-10">
      {/* Hero Section - matching Dashboard hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-semibold mb-4 tracking-tight">Courses</h1>
          <p className="text-lg text-blue-50 leading-relaxed">
            Access training courses and manage your learning credentials
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      {/* Credentials Section - matching Dashboard card style */}
      <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-pink-600 flex items-center justify-center">
                <Key className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">Learning Credentials</CardTitle>
                <CardDescription className="text-gray-600">Manage your access to the training system</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-base font-medium text-gray-700">Credential Status:</span>
              <Badge
                variant="secondary"
                className={`font-medium ${
                  credentialsStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {credentialsStatus === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <Button
            onClick={handleRequestCredentials}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
          >
            Request Credentials
          </Button>

          <p className="text-sm text-gray-500 text-center leading-relaxed">
            Request access credentials to unlock full features of the learning management system
          </p>
        </CardContent>
      </Card>

      {/* Task Courses Section - matching Dashboard card style */}
      {userData.taskCourses && userData.taskCourses.length > 0 && (
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">Task Courses</CardTitle>
                <CardDescription className="text-gray-600">Complete courses to enhance your skills and readiness</CardDescription>
              </div>

              {/* Sort/Filter Dropdown */}
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <Select value={sortBy} onValueChange={(value: 'default' | 'most-requested') => setSortBy(value)}>
                  <SelectTrigger className="w-[200px] h-10 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Order</SelectItem>
                    <SelectItem value="most-requested">Most Requested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortBy === 'most-requested' && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <p className="text-base text-blue-900">Showing priority courses recommended for candidates</p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Tabs value={courseFilter} onValueChange={(value) => setCourseFilter(value as typeof courseFilter)}>
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="legal" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Legal
                </TabsTrigger>
                <TabsTrigger value="admin-marketing" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Admin
                </TabsTrigger>
                <TabsTrigger value="people-facing" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  People-Facing
                </TabsTrigger>
              </TabsList>

              <TabsContent value={courseFilter} className="space-y-5">
                {/* Category Header with Icon and Progress Indicators */}
                <div className={`p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(courseFilter)} border border-gray-100`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {getCategoryIcon(courseFilter)}
                      <h3 className="text-3xl font-semibold text-gray-900">
                        {courseFilter === 'legal' && 'Legal'}
                        {courseFilter === 'people-facing' && 'People-Facing'}
                        {courseFilter === 'admin-marketing' && 'Admin'}
                      </h3>
                    </div>
                  </div>

                  {/* Category Progress Indicators */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="outline" className="bg-white border-gray-200 text-gray-700 px-3 py-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                      <span className="font-medium">Completed: {stats.completed}</span>
                    </Badge>
                    <Badge variant="outline" className="bg-white border-gray-200 text-gray-700 px-3 py-1.5">
                      <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                      <span className="font-medium">In Progress: {stats.inProgress}</span>
                    </Badge>
                    {stats.retakeRequired > 0 && (
                      <Badge variant="outline" className="bg-white border-gray-200 text-gray-700 px-3 py-1.5">
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-red-600" />
                        <span className="font-medium">Re-take Required: {stats.retakeRequired}</span>
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Courses List - matching Dashboard assessment style */}
                {filteredCourses.length > 0 ? (
                  <div className="space-y-3">
                    {filteredCourses.map((course) => {
                      const score = getCourseScore(course);
                      const needsRetake = course.status === 'completed' && score < 75;
                      const isCompleted = course.status === 'completed' && score >= 75;

                      return (
                        <div
                          key={course.id}
                          ref={(el) => { courseRefs.current[course.id] = el; }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                            highlightedCourseId === course.id
                              ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
                              : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          {/* Course Name with Hover Card */}
                          <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                            <HoverCard openDelay={200}>
                              <HoverCardTrigger asChild>
                                <h4 className="text-base font-medium text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                                  {course.name}
                                </h4>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-96" side="top" align="start">
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="text-base font-semibold text-gray-900 mb-1">Training Overview</h4>
                                    <p className="text-sm text-gray-600">
                                      {course.category === 'legal' && 'Legal'}
                                      {course.category === 'people-facing' && 'People-Facing'}
                                      {course.category === 'admin-marketing' && 'Admin'}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    {course.units && course.units.length > 0 ? (
                                      course.units.map((unit, index) => (
                                        <div key={index} className="flex items-start gap-2 text-sm">
                                          <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-xs">
                                            {index + 1}
                                          </span>
                                          <span className="text-gray-700 leading-relaxed">{unit}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-sm text-gray-500">No units available</p>
                                    )}
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>

                          {/* Score Display and Action Button */}
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span
                                className={`text-base font-semibold ${
                                  needsRetake ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-600'
                                }`}
                              >
                                {score}%
                              </span>
                              {needsRetake && <p className="text-sm text-red-600 font-medium">Below 75%</p>}
                            </div>

                            {/* Action Button */}
                            <Button
                              size="sm"
                              variant={needsRetake ? 'default' : isCompleted ? 'outline' : 'default'}
                              onClick={() => handleStartCourse(course.id, course.status, course.score)}
                              disabled={isCompleted}
                              className={`${
                                needsRetake
                                  ? 'bg-red-600 hover:bg-red-700 text-white'
                                  : isCompleted
                                    ? 'border-gray-200 cursor-not-allowed'
                                    : 'bg-gray-900 hover:bg-gray-800'
                              } transition-all`}
                            >
                              {getActionButtonLabel(course)}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>No courses available in this category yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

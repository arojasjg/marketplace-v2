'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Lock, Briefcase, DollarSign, Calendar, CheckCircle2, Edit2, Bookmark, BookmarkCheck, GraduationCap } from 'lucide-react';
import type { JobPost, TaskCourse } from '@/lib/types';

export default function JobPostsPage() {
  const router = useRouter();
  const { userData, applyToJobPost, updateJobPostLabel, toggleSaveJobPost } = useAuth();
  const [filters, setFilters] = useState({
    applicationStatus: 'all',
    areaOfWork: 'all',
    budgetRange: [0, 6000] as [number, number],
    sortBy: 'recent',
    savedFilter: 'all', // 'all' | 'saved' | 'applied'
  });
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [labelInput, setLabelInput] = useState('');

  if (!userData) return null;

  const isEligibleToApply =
    userData.completionPercentage >= 80 &&
    userData.assessments.filter((a) => a.type === 'vetting' && a.status === 'approved').length >= 3 &&
    userData.taApprovalStatus === 'approved';

  // Create a map of task courses for quick lookup
  const taskCourseMap = new Map<string, TaskCourse>(
    userData.taskCourses.map((tc) => [tc.id, tc])
  );

  // Filter and sort job posts
  let filteredPosts = [...(userData.jobPosts || [])];

  // Saved/Applied filter
  if (filters.savedFilter === 'saved') {
    filteredPosts = filteredPosts.filter((post) => post.isSaved);
  } else if (filters.savedFilter === 'applied') {
    filteredPosts = filteredPosts.filter((post) => post.applicationStatus === 'applied');
  }

  if (filters.applicationStatus !== 'all') {
    if (filters.applicationStatus === 'applied') {
      filteredPosts = filteredPosts.filter((post) => post.applicationStatus === 'applied');
    } else if (filters.applicationStatus === 'not-applied') {
      filteredPosts = filteredPosts.filter((post) => post.applicationStatus !== 'applied');
    }
  }

  if (filters.areaOfWork !== 'all') {
    filteredPosts = filteredPosts.filter((post) => post.areaOfWork === filters.areaOfWork);
  }

  filteredPosts = filteredPosts.filter(
    (post) => post.monthlyBudget >= filters.budgetRange[0] && post.monthlyBudget <= filters.budgetRange[1]
  );

  if (filters.sortBy === 'recent') {
    filteredPosts.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  } else if (filters.sortBy === 'oldest') {
    filteredPosts.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
  }

  const getAreaOfWorkLabel = (area: string) => {
    const labels: Record<string, string> = {
      legal: 'Legal',
      'admin-marketing': 'Admin',
      'people-facing': 'People-Facing',
    };
    return labels[area] || area;
  };

  const getAreaOfWorkColor = (area: string) => {
    const colors: Record<string, string> = {
      legal: 'bg-blue-100 text-blue-700',
      'admin-marketing': 'bg-purple-100 text-purple-700',
      'people-facing': 'bg-green-100 text-green-700',
    };
    return colors[area] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  const handleApply = (postId: string) => {
    if (isEligibleToApply) {
      applyToJobPost(postId);
    }
  };

  const handleSaveLabel = (postId: string) => {
    if (labelInput.trim()) {
      updateJobPostLabel(postId, labelInput);
      setEditingLabel(null);
      setLabelInput('');
    }
  };

  const startEditingLabel = (post: JobPost) => {
    setEditingLabel(post.id);
    setLabelInput(post.candidateLabel);
  };

  const handleNavigateToCourse = (courseId: string) => {
    const course = taskCourseMap.get(courseId);
    if (course) {
      // Navigate to courses page with the course category as a query param
      router.push(`/courses?category=${course.category}&courseId=${courseId}`);
    }
  };

  const resetFilters = () => {
    setFilters({
      applicationStatus: 'all',
      areaOfWork: 'all',
      budgetRange: [0, 6000],
      sortBy: 'recent',
      savedFilter: 'all',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">Job Posts</h1>
          <p className="text-gray-600 leading-relaxed">Discover opportunities from top law firms</p>
        </div>
        <Badge variant="outline" className="text-base px-5 py-2 border-gray-200 font-medium">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
        </Badge>
      </div>

      {/* Quick Filters: Saved / Applied */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">Quick filters:</span>
        <div className="flex items-center gap-2">
          <Button
            variant={filters.savedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ ...filters, savedFilter: 'all' })}
            className={filters.savedFilter === 'all' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-transparent border-gray-200 hover:bg-gray-50'}
          >
            All
          </Button>
          <Button
            variant={filters.savedFilter === 'saved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ ...filters, savedFilter: 'saved' })}
            className={filters.savedFilter === 'saved' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-transparent border-gray-200 hover:bg-gray-50'}
          >
            <Bookmark className="h-3.5 w-3.5 mr-1.5" />
            Saved
          </Button>
          <Button
            variant={filters.savedFilter === 'applied' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ ...filters, savedFilter: 'applied' })}
            className={filters.savedFilter === 'applied' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-transparent border-gray-200 hover:bg-gray-50'}
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Applied
          </Button>
        </div>
      </div>

      {/* Eligibility Banner */}
      {!isEligibleToApply && (
        <Card className="border-amber-100 bg-amber-50 shadow-sm">
          <CardContent className="flex items-start gap-5 p-8">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Applications Locked</h3>
              <p className="text-base text-amber-800 leading-relaxed mb-4">
                Complete your profile and vetting to apply for these roles. You can view all opportunities now to stay motivated!
              </p>
              <div className="flex items-center gap-6 text-base">
                <div className="flex items-center gap-2">
                  {userData.completionPercentage >= 80 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-amber-600" />
                  )}
                  <span className="text-amber-900">Resume ≥ 80%</span>
                </div>
                <div className="flex items-center gap-2">
                  {userData.assessments.filter((a) => a.type === 'vetting' && a.status === 'approved').length >= 3 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-amber-600" />
                  )}
                  <span className="text-amber-900">3 Assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  {userData.taApprovalStatus === 'approved' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded border-2 border-amber-600" />
                  )}
                  <span className="text-amber-900">TA Approval</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Filters & Sorting</CardTitle>
            <Button variant="outline" size="sm" onClick={resetFilters} className="border-gray-200 hover:bg-gray-50 bg-transparent">
              Reset Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Application Status Filter */}
            <div className="space-y-2">
              <label className="text-base font-medium text-gray-700">Application Status</label>
              <Select value={filters.applicationStatus} onValueChange={(value) => setFilters({ ...filters, applicationStatus: value })}>
                <SelectTrigger className="h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="not-applied">Not Applied</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Area of Work Filter */}
            <div className="space-y-2">
              <label className="text-base font-medium text-gray-700">Area of Work</label>
              <Select value={filters.areaOfWork} onValueChange={(value) => setFilters({ ...filters, areaOfWork: value })}>
                <SelectTrigger className="h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="admin-marketing">Admin</SelectItem>
                  <SelectItem value="people-facing">People-Facing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-base font-medium text-gray-700">Sort By</label>
              <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger className="h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget Range */}
            <div className="space-y-3">
              <label className="text-base font-medium text-gray-700">
                Monthly Budget: ${filters.budgetRange[0]} - ${filters.budgetRange[1]}
              </label>
              <Slider
                value={filters.budgetRange}
                onValueChange={(value) => setFilters({ ...filters, budgetRange: value as [number, number] })}
                max={6000}
                min={0}
                step={100}
                className="py-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Posts List */}
      <div className="space-y-5">
        {filteredPosts.length === 0 ? (
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="text-center py-16">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <Briefcase className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No job posts found</h3>
              <p className="text-base text-gray-600">Try adjusting your filters to see more opportunities</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Job Title with Edit */}
                    <div className="flex items-center gap-3">
                      {editingLabel === post.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={labelInput}
                            onChange={(e) => setLabelInput(e.target.value)}
                            placeholder="Enter custom label"
                            className="max-w-md h-11 border-gray-200"
                          />
                          <Button size="sm" onClick={() => handleSaveLabel(post.id)} className="bg-gray-900 hover:bg-gray-800">
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingLabel(null);
                              setLabelInput('');
                            }}
                            className="border-gray-200 bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-2xl font-semibold text-gray-900">{post.candidateLabel}</h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditingLabel(post)}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <Edit2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${getAreaOfWorkColor(post.areaOfWork)} font-medium`}>
                        {getAreaOfWorkLabel(post.areaOfWork)}
                      </Badge>
                      {post.applicationStatus === 'applied' && (
                        <Badge className="bg-green-100 text-green-700 font-medium">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Applied
                        </Badge>
                      )}
                      {post.isSaved && (
                        <Badge className="bg-amber-100 text-amber-700 font-medium">
                          <BookmarkCheck className="h-3 w-3 mr-1" />
                          Saved
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">{post.description}</p>

                    {/* Requirements */}
                    {post.requirements.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Requirements</p>
                        <ul className="text-base text-gray-700 space-y-1.5">
                          {post.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tasks Required Section - Grouped by Category in Columns */}
                    {post.requiredTasks && post.requiredTasks.length > 0 && (() => {
                      // Group tasks by category
                      const tasksByCategory: Record<string, typeof userData.taskCourses> = {
                        legal: [],
                        'people-facing': [],
                        'admin-marketing': [],
                      };
                      
                      post.requiredTasks.forEach((taskId) => {
                        const course = taskCourseMap.get(taskId);
                        if (course) {
                          tasksByCategory[course.category].push(course);
                        }
                      });
                      
                      // Filter out empty categories
                      const nonEmptyCategories = Object.entries(tasksByCategory).filter(
                        ([, tasks]) => tasks.length > 0
                      );
                      
                      const categoryLabels: Record<string, string> = {
                        legal: 'Legal',
                        'people-facing': 'People Facing',
                        'admin-marketing': 'Admin',
                      };
                      
                      const categoryColors: Record<string, string> = {
                        legal: 'bg-blue-50 border-blue-100',
                        'people-facing': 'bg-green-50 border-green-100',
                        'admin-marketing': 'bg-purple-50 border-purple-100',
                      };
                      
                      const categoryHeaderColors: Record<string, string> = {
                        legal: 'text-blue-700 bg-blue-100',
                        'people-facing': 'text-green-700 bg-green-100',
                        'admin-marketing': 'text-purple-700 bg-purple-100',
                      };
                      
                      return (
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-gray-500" />
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                              Tasks Required ({post.requiredTasks.length})
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {nonEmptyCategories.map(([category, tasks]) => (
                              <div
                                key={category}
                                className={`rounded-lg border p-3 ${categoryColors[category]}`}
                              >
                                {/* Category Header */}
                                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-3 ${categoryHeaderColors[category]}`}>
                                  {categoryLabels[category]} ({tasks.length})
                                </div>
                                {/* Task List */}
                                <div className="space-y-2">
                                  {tasks.map((course) => {
                                    const hasTaken = course.status === 'completed';
                                    const score = course.score || 0;
                                    
                                    return (
                                      <div
                                        key={course.id}
                                        className="flex items-start justify-between gap-2 py-2 px-2 bg-white rounded-md border border-gray-100"
                                      >
                                        <span className="text-xs font-medium text-gray-800 leading-tight flex-1">
                                          {course.name}
                                        </span>
                                        {hasTaken ? (
                                          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                                            <span className={`text-xs font-semibold ${score >= 75 ? 'text-green-600' : 'text-amber-600'}`}>
                                              {score}%
                                            </span>
                                            {score < 75 && (
                                              <span className="text-[10px] text-amber-500">Re-take</span>
                                            )}
                                          </div>
                                        ) : (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleNavigateToCourse(course.id)}
                                            className="h-6 text-[10px] px-2 bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 flex-shrink-0"
                                          >
                                            Take
                                          </Button>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-base text-gray-600">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">${post.monthlyBudget.toLocaleString()}/month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Posted {formatDate(post.postedDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    {/* Save Button */}
                    <Button
                      variant="outline"
                      onClick={() => toggleSaveJobPost(post.id)}
                      className={`h-10 px-4 rounded-lg transition-all duration-200 ${
                        post.isSaved
                          ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                          : 'bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {post.isSaved ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>

                    {/* Apply Button */}
                    {post.applicationStatus === 'applied' ? (
                      <Button disabled className="bg-green-600 h-12 px-6 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Applied
                      </Button>
                    ) : isEligibleToApply ? (
                      <Button
                        onClick={() => handleApply(post.id)}
                        className="h-12 px-6 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                      >
                        Apply Now
                      </Button>
                    ) : (
                      <Button disabled className="h-12 px-6 rounded-lg border-gray-200">
                        <Lock className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                    )}
                    {!isEligibleToApply && post.applicationStatus !== 'applied' && (
                      <p className="text-sm text-center text-gray-500 max-w-[140px] leading-relaxed">
                        Complete profile to apply
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

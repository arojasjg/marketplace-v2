'use client';

import React from "react"

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2, CheckCircle2, Save, TrendingUp, Camera, User } from 'lucide-react';
import type { JobExperience, Education } from '@/lib/types';
import { getMarketBenchmark } from '@/lib/mock-data';

export default function ResumePage() {
  const { userData, updateResume } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [coreProfile, setCoreProfile] = useState(
    userData?.resume.coreProfile || {
      aboutMe: '',
      monthlyRate: 0,
      availability: '' as const,
      timezone: '',
      profilePicture: '',
    }
  );
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>(userData?.resume.jobExperiences || []);
  const [education, setEducation] = useState<Education[]>(userData?.resume.education || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!userData) return null;

  const handleSave = () => {
    setIsSaving(true);
    updateResume({
      coreProfile,
      jobExperiences,
      education,
    });
    setSaveMessage('Resume saved successfully!');
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('');
    }, 2000);
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoreProfile({ ...coreProfile, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addJobExperience = () => {
    const newExperience: JobExperience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    setJobExperiences([...jobExperiences, newExperience]);
  };

  const updateJobExperience = (id: string, field: keyof JobExperience, value: string | boolean) => {
    setJobExperiences(jobExperiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  const removeJobExperience = (id: string) => {
    setJobExperiences(jobExperiences.filter((exp) => exp.id !== id));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      status: '',
      graduationYear: '',
    };
    setEducation([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const completionPercentage = userData.completionPercentage;
  const isComplete = completionPercentage >= 80;

  const benchmark =
    coreProfile.availability && coreProfile.availability !== ''
      ? getMarketBenchmark(coreProfile.availability as 'full-time' | 'half-time')
      : null;
  const isRateInRange =
    benchmark && coreProfile.monthlyRate >= benchmark.range[0] && coreProfile.monthlyRate <= benchmark.range[1];

  const getInitials = () => {
    const firstName = userData.user.firstName || '';
    const lastName = userData.user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with Progress */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">Resume Editor</CardTitle>
              <CardDescription className="text-gray-600">Complete your profile to unlock opportunities</CardDescription>
            </div>
            <Badge
              variant="secondary"
              className={`text-lg px-5 py-2 font-medium ${isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            >
              {completionPercentage}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Overall Completion</span>
              <span className="font-medium text-gray-900">{completionPercentage}% / 80% to unlock</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            {isComplete && (
              <div className="flex items-center gap-2 text-green-700 text-base font-medium mt-3">
                <CheckCircle2 className="h-4 w-4" />
                {"Resume completed! You're ready to unlock features."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Core Profile Section */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Core Profile</CardTitle>
          <CardDescription className="text-gray-600">Tell us about yourself and your availability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Picture Upload */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <button
                type="button"
                className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all overflow-hidden group"
                onClick={handleProfilePictureClick}
              >
                {coreProfile.profilePicture ? (
                  <img
                    src={coreProfile.profilePicture || '/placeholder.svg'}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Profile Picture</h3>
              <p className="text-sm text-gray-600 mb-2">Click the circle to upload or change your photo</p>
              <Button onClick={handleProfilePictureClick} size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutMe" className="text-base font-medium text-gray-700">
              About Me
            </Label>
            <Textarea
              id="aboutMe"
              placeholder="Tell us about your professional background, skills, and what you're looking for..."
              value={coreProfile.aboutMe}
              onChange={(e) => setCoreProfile({ ...coreProfile, aboutMe: e.target.value })}
              rows={4}
              className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Monthly Rate Section with Slider */}
          <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly Rate</h3>
            </div>

            {/* Availability Selector */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="text-base font-medium text-gray-700">
                Availability *
              </Label>
              <Select
                value={coreProfile.availability}
                onValueChange={(value: 'full-time' | 'half-time') => setCoreProfile({ ...coreProfile, availability: value })}
              >
                <SelectTrigger className="h-12 border-gray-200 bg-white">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-Time</SelectItem>
                  <SelectItem value="half-time">Half-Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Rate Slider */}
            {coreProfile.availability && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium text-gray-700">Your Monthly Rate</Label>
                    <span className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                      ${coreProfile.monthlyRate.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[coreProfile.monthlyRate]}
                    onValueChange={(value) => setCoreProfile({ ...coreProfile, monthlyRate: value[0] })}
                    max={6000}
                    min={0}
                    step={100}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$0</span>
                    <span>$6,000</span>
                  </div>
                </div>

                {/* Market Benchmark Visualization */}
                {benchmark && (
                  <div className="space-y-4 p-5 bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <span className="text-base font-medium text-gray-700">Market Benchmark</span>
                    </div>

                    <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden">
                      {/* Benchmark range visualization */}
                      <div
                        className="absolute h-full bg-blue-100 transition-all"
                        style={{
                          left: `${(benchmark.range[0] / 6000) * 100}%`,
                          width: `${((benchmark.range[1] - benchmark.range[0]) / 6000) * 100}%`,
                        }}
                      />
                      {/* Average marker */}
                      <div
                        className="absolute top-0 h-full w-0.5 bg-blue-600"
                        style={{ left: `${(benchmark.average / 6000) * 100}%` }}
                      />
                      {/* User's rate marker */}
                      {coreProfile.monthlyRate > 0 && (
                        <div
                          className="absolute top-0 h-full w-0.5 bg-pink-600"
                          style={{ left: `${(coreProfile.monthlyRate / 6000) * 100}%` }}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>Average: ${benchmark.average.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-pink-600" />
                        <span>Your rate</span>
                      </div>
                    </div>

                    <p className="text-base text-gray-700 leading-relaxed">
                      Most of our <strong>{coreProfile.availability}</strong> candidates charge around{' '}
                      <strong>${benchmark.average.toLocaleString()}/month</strong>
                    </p>

                    {isRateInRange ? (
                      <div className="flex items-center gap-2 text-base text-green-700 bg-green-50 p-3 rounded-lg border border-green-100">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                        <span>Your rate is within the market range and may be more attractive to buyers</span>
                      </div>
                    ) : coreProfile.monthlyRate > 0 ? (
                      <div className="text-base text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                        Choosing a rate within ${benchmark.range[0].toLocaleString()} - ${benchmark.range[1].toLocaleString()} may
                        make your profile more attractive to buyers
                      </div>
                    ) : null}
                  </div>
                )}

                <p className="text-sm text-gray-500 italic leading-relaxed">
                  {"This is based on current market data from similar candidates. You're in control of your rate."}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-base font-medium text-gray-700">
              Time Zone
            </Label>
            <Input
              id="timezone"
              type="text"
              placeholder="e.g., PST (UTC-8), EST (UTC-5)"
              value={coreProfile.timezone}
              onChange={(e) => setCoreProfile({ ...coreProfile, timezone: e.target.value })}
              className="h-12 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Job Experience Section */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Job Experience</CardTitle>
              <CardDescription className="text-gray-600">Add your work history and achievements</CardDescription>
            </div>
            <Button onClick={addJobExperience} size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {jobExperiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>{'No job experience added yet. Click "Add Experience" to get started.'}</p>
            </div>
          ) : (
            jobExperiences.map((exp, index) => (
              <div key={exp.id} className="space-y-5 p-6 border border-gray-100 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base text-gray-700">Experience {index + 1}</h4>
                  <Button onClick={() => removeJobExperience(exp.id)} size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Company / Employer</Label>
                    <Input
                      placeholder="e.g., Google"
                      value={exp.company}
                      onChange={(e) => updateJobExperience(exp.id, 'company', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Role / Title</Label>
                    <Input
                      placeholder="e.g., Senior Software Engineer"
                      value={exp.role}
                      onChange={(e) => updateJobExperience(exp.id, 'role', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateJobExperience(exp.id, 'startDate', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateJobExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.isCurrent}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.isCurrent}
                    onCheckedChange={(checked) => updateJobExperience(exp.id, 'isCurrent', checked as boolean)}
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-base font-medium text-gray-700 cursor-pointer">
                    I currently work here
                  </label>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">Description</Label>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => updateJobExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    className="border-gray-200 bg-white resize-none"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Education Background</CardTitle>
              <CardDescription className="text-gray-600">Add your academic qualifications</CardDescription>
            </div>
            <Button onClick={addEducation} size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {education.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>{'No education added yet. Click "Add Education" to get started.'}</p>
            </div>
          ) : (
            education.map((edu, index) => (
              <div key={edu.id} className="space-y-5 p-6 border border-gray-100 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base text-gray-700">Education {index + 1}</h4>
                  <Button onClick={() => removeEducation(edu.id)} size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Institution</Label>
                    <Input
                      placeholder="e.g., Harvard University"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Degree</Label>
                    <Input
                      placeholder="e.g., Bachelor's Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Field of Study</Label>
                    <Input
                      placeholder="e.g., Computer Science"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Graduation Year</Label>
                    <Input
                      type="text"
                      placeholder="e.g., 2020"
                      value={edu.graduationYear}
                      onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                      className="h-11 border-gray-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {saveMessage && <p className="text-green-600 font-medium">{saveMessage}</p>}
          <div className="ml-auto">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Resume'}
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed button */}
      <div className="h-20" />
    </div>
  );
}

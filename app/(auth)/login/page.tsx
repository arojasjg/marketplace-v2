'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Building2, User, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserPath = 'hire' | 'candidate' | null;

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsBuyer } = useAuth();
  const [selectedPath, setSelectedPath] = useState<UserPath>(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPath) return;
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (selectedPath === 'hire') {
      loginAsBuyer(email || 'hiring@lawfirm.com', firstName || 'Sarah', lastName || 'Johnson', companyName || 'My Law Firm');
      router.push('/buyer/job-posts');
    } else {
      login(email || 'test@gmail.com', firstName || 'John', lastName);
      router.push('/dashboard');
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (!selectedPath) return;
    
    setIsLoading(true);
    setTimeout(() => {
      if (selectedPath === 'hire') {
        loginAsBuyer(`hiring@${provider}.com`, 'Sarah', 'Johnson', 'My Law Firm');
        router.push('/buyer/job-posts');
      } else {
        login(`user@${provider}.com`, 'John', 'Doe');
        router.push('/dashboard');
      }
    }, 500);
  };

  // Path selection screen
  if (!selectedPath) {
    return (
      <div className="h-screen flex overflow-hidden bg-white">
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-6">
          <div className="w-full max-w-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-600">LawWork</h1>
              <p className="text-gray-500 text-sm mt-1">Legal talent marketplace</p>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to LawWork</h2>
              <p className="text-gray-600 text-lg">
                How would you like to use LawWork today?
              </p>
            </div>

            {/* Path Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Looking to Hire */}
              <button
                onClick={() => setSelectedPath('hire')}
                className="group relative p-8 bg-white border-2 border-gray-200 rounded-2xl text-left transition-all hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm looking to hire</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Find vetted legal talent for your firm. Post jobs, review candidates, and schedule interviews.
                  </p>
                </div>
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 transition-colors" />
              </button>

              {/* Looking to be Hired */}
              <button
                onClick={() => setSelectedPath('candidate')}
                className="group relative p-8 bg-white border-2 border-gray-200 rounded-2xl text-left transition-all hover:border-pink-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-pink-50 flex items-center justify-center mb-5 group-hover:bg-pink-100 transition-colors">
                    <User className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm looking to be hired</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Create your profile, get vetted, and connect with top law firms seeking your skills.
                  </p>
                </div>
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full border-2 border-gray-300 group-hover:border-pink-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login form based on selected path
  const isHiring = selectedPath === 'hire';
  const accentColor = isHiring ? 'blue' : 'pink';
  const portalName = isHiring ? 'Hiring Portal' : 'Candidate Portal';
  const welcomeText = isHiring 
    ? 'Sign in to find and hire top legal talent.'
    : 'Sign in to access your candidate dashboard.';
  const heroTitle = isHiring
    ? 'Find exceptional legal talent'
    : 'Your career in law starts here';
  const heroDescription = isHiring
    ? 'Access a curated pool of vetted legal professionals ready to join your team.'
    : 'Connect with leading law firms, showcase your expertise, and unlock opportunities that match your skills.';
  const benefits = isHiring
    ? [
        'Post jobs and reach vetted candidates',
        'Review detailed candidate profiles',
        'Schedule interviews directly',
        'Manage your hiring pipeline',
      ]
    : [
        'Complete your professional profile',
        'Get vetted by our expert team',
        'Apply to exclusive opportunities',
        'Connect directly with employers',
      ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-6 lg:px-12 xl:px-16 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPath(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to selection</span>
          </button>

          {/* Logo */}
          <div className="mb-4">
            <h1 className={cn("text-xl font-bold", isHiring ? "text-blue-600" : "text-blue-600")}>LawWork</h1>
            <p className="text-gray-500 text-xs">{portalName}</p>
          </div>

          {/* Welcome Text */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-gray-600 text-sm">{welcomeText}</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-2 mb-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 border-gray-200 hover:bg-gray-50 font-medium bg-transparent text-sm"
              onClick={() => handleSocialLogin('linkedin')}
              disabled={isLoading}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              Continue with LinkedIn
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-10 border-gray-200 hover:bg-gray-50 font-medium bg-transparent text-sm"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 border-gray-200 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">
                  First name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-9 border-gray-200 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-9 border-gray-200 text-sm"
                />
              </div>
            </div>

            {isHiring && (
              <div className="space-y-1">
                <Label htmlFor="companyName" className="text-gray-700 font-medium text-sm">
                  Company / Firm name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Your Law Firm"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-9 border-gray-200 text-sm"
                />
              </div>
            )}

            <Button
              type="submit"
              className={cn(
                "w-full h-10 text-white font-medium text-sm",
                isHiring 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700"
              )}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : isHiring ? 'Continue to Hiring Dashboard' : 'Continue to Dashboard'}
            </Button>
          </form>

          {/* Terms */}
          <p className="mt-3 text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className={cn(
        "hidden lg:flex flex-1 relative overflow-hidden",
        isHiring 
          ? "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100" 
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      )}>
        {/* Gradient overlay at top */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-24 opacity-20",
          isHiring 
            ? "bg-gradient-to-r from-blue-600 to-blue-500" 
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        )} />
        
        <div className="flex flex-col justify-center px-10 xl:px-12 relative z-10">
          <div className="max-w-md">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm mb-5">
              <span className="text-xs font-medium text-gray-700">
                {isHiring ? 'Trusted by 500+ law firms' : 'Trusted by 1,000+ legal professionals'}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {heroTitle}
            </h2>
            
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {heroDescription}
            </p>

            {/* Benefits list */}
            <div className="space-y-2.5">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0",
                    isHiring 
                      ? "bg-blue-600" 
                      : "bg-gradient-to-r from-blue-600 to-pink-600"
                  )}>
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative gradient at bottom */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-24 opacity-10",
          isHiring 
            ? "bg-gradient-to-r from-blue-600 to-blue-500" 
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        )} />
      </div>
    </div>
  );
}

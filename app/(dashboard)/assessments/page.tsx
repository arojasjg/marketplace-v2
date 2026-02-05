'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

export default function AssessmentsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="text-center">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <ClipboardCheck className="h-8 w-8 text-gray-400" />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">Assessments</CardTitle>
          <CardDescription className="text-gray-600">Complete vetting assessments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lock className="h-5 w-5 text-amber-600" />
              <span className="text-lg font-medium text-amber-900">Feature Locked</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Assessments can be started from the Dashboard. Visit your dashboard to begin.
            </p>
          </div>

          <Button asChild className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

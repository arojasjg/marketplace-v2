'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, AlertCircle } from 'lucide-react';
import type { BuyerJobPostStatus } from '@/lib/types';
import { toast } from 'sonner';
import { HiringFlowDialog } from '@/components/hiring-flow/hiring-flow-dialog';

export default function BuyerJobPostsPage() {
  const { buyerData, updateBuyerJobPostStatus } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [incompleteDialogOpen, setIncompleteDialogOpen] = useState(false);
  const [selectedIncompletePost, setSelectedIncompletePost] = useState<string | null>(null);
  const [hiringFlowOpen, setHiringFlowOpen] = useState(false);

  // Auto-open hiring flow dialog when navigated from "Hiring Flow" sidebar tab
  useEffect(() => {
    if (searchParams.get('openHiringFlow') === 'true') {
      setHiringFlowOpen(true);
      // Clean up the URL param
      router.replace('/buyer/job-posts', { scroll: false });
    }
  }, [searchParams, router]);

  if (!buyerData) return null;

  const handleStatusChange = (postId: string, newStatus: BuyerJobPostStatus) => {
    const jobPost = buyerData.jobPosts.find(p => p.id === postId);
    
    // Check if trying to activate an incomplete job post
    if (newStatus === 'active' && jobPost && !jobPost.isComplete) {
      setSelectedIncompletePost(postId);
      setIncompleteDialogOpen(true);
      return;
    }
    
    updateBuyerJobPostStatus(postId, newStatus);
    toast.success(`Job post status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: BuyerJobPostStatus) => {
    const statusStyles: Record<BuyerJobPostStatus, { className: string; label: string }> = {
      active: { className: 'bg-green-100 text-green-700', label: 'Active' },
      paused: { className: 'bg-yellow-100 text-yellow-700', label: 'Paused' },
      closed: { className: 'bg-red-100 text-red-700', label: 'Closed' },
    };
    return statusStyles[status];
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Job Post</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your job listings and track applicants</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setHiringFlowOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Job Post
        </Button>
      </div>

      {/* Job Posts Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Post Name
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Candidates
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                New Candidates
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published Date
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days Since
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {buyerData.jobPosts.map((jobPost) => {
              const statusBadge = getStatusBadge(jobPost.status);
              
              return (
                <tr key={jobPost.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{jobPost.name}</span>
                      {!jobPost.isComplete && (
                        <Badge variant="outline" className="text-xs bg-transparent text-orange-600 border-orange-200">
                          Incomplete
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{jobPost.description}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-900 font-medium">{jobPost.totalCandidates}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {jobPost.newCandidates > 0 ? (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {jobPost.newCandidates} new
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {new Date(jobPost.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {jobPost.daysSincePublished} days
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <Select
                        value={jobPost.status}
                        onValueChange={(value: BuyerJobPostStatus) => handleStatusChange(jobPost.id, value)}
                      >
                        <SelectTrigger className="w-28 h-8 text-sm border-gray-200 bg-transparent">
                          <SelectValue>
                            <Badge className={`${statusBadge.className} hover:${statusBadge.className}`}>
                              {statusBadge.label}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                          </SelectItem>
                          <SelectItem value="paused">
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Paused</Badge>
                          </SelectItem>
                          <SelectItem value="closed">
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Closed</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Hiring Flow Dialog */}
      <HiringFlowDialog open={hiringFlowOpen} onOpenChange={setHiringFlowOpen} />

      {/* Incomplete Job Post Dialog */}
      <Dialog open={incompleteDialogOpen} onOpenChange={setIncompleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <DialogTitle>Complete Job Post Required</DialogTitle>
                <DialogDescription className="mt-1">
                  This job post is missing required information and cannot be activated.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Please complete all required fields in your job post before activating it. This ensures candidates have all the information they need to apply.
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => setIncompleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setIncompleteDialogOpen(false);
                // TODO: Navigate to job post edit page
                toast.info('Job post editor coming soon');
              }}
            >
              Complete Job Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

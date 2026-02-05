import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-8 left-8 z-50',
        'bg-blue-600 hover:bg-blue-700 text-white',
        'px-9 py-5 rounded-full shadow-lg',
        'flex items-center gap-3',
        'transition-all duration-300 hover:shadow-xl',
        'font-light tracking-wide text-base'
      )}
      aria-label="Back"
    >
      <ArrowLeft className="h-6 w-6" />
      <span>Back</span>
    </button>
  );
}

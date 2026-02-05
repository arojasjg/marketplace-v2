import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingNextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function FloatingNextButton({ onClick, disabled = false, label = 'Next Step' }: FloatingNextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'fixed bottom-8 right-8 z-[60]',
        'bg-blue-600 hover:bg-blue-700 text-white',
        'px-9 py-5 rounded-full shadow-lg',
        'flex items-center gap-3',
        'transition-all duration-300 hover:shadow-xl',
        'font-light tracking-wide text-base',
        disabled ? 'opacity-50 cursor-not-allowed hover:bg-blue-600' : 'hover:scale-105'
      )}
      aria-label={label}
    >
      <span>{label}</span>
      <ArrowRight className="h-6 w-6" />
    </button>
  );
}

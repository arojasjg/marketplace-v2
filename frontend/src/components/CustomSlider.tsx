import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CustomSliderProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  direction?: 'ltr' | 'rtl';
  className?: string;
}

export function CustomSlider({ value, onChange, options, direction = 'ltr', className = '' }: CustomSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const currentIndex = options.findIndex(opt => opt.value === value);
  const displayPercentage = dragPosition !== null ? dragPosition : (currentIndex / (options.length - 1)) * 100;

  useEffect(() => {
    if (!isDragging && dragPosition !== null) {
      // Snap to nearest value when released
      const nearestIndex = Math.round((dragPosition / 100) * (options.length - 1));
      const clampedIndex = Math.max(0, Math.min(options.length - 1, nearestIndex));
      onChange(options[clampedIndex].value);
      setDragPosition(null);
    }
  }, [isDragging, dragPosition, options, onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updatePosition = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    
    // Clamp between 0 and 100 (no direction reversal here)
    percentage = Math.max(0, Math.min(100, percentage));
    setDragPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Calculate display position based on direction
  const getDisplayPosition = () => {
    if (direction === 'rtl') {
      return 100 - displayPercentage;
    }
    return displayPercentage;
  };

  const displayPosition = getDisplayPosition();

  return (
    <div className={cn('w-full', className)}>
      <div className="relative py-4">
        <div 
          ref={sliderRef}
          className="slider-container cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div 
            className="slider-track" 
            style={{ 
              width: `${displayPosition}%`,
              left: '0',
              right: 'auto'
            }} 
          />
          <div 
            className={cn(
              'slider-thumb transition-transform',
              isDragging && 'scale-125'
            )}
            style={{ 
              left: `${displayPosition}%`,
              right: 'auto',
              transition: isDragging ? 'none' : 'all 0.2s ease-out'
            }}
          />
        </div>
        
        <div className="flex justify-between mt-2">
          {options.map((option, index) => {
            const optionPercentage = (index / (options.length - 1)) * 100;
            const displayOptionPercentage = direction === 'rtl' ? 100 - optionPercentage : optionPercentage;
            const isActive = Math.abs(displayPosition - displayOptionPercentage) < 5 && dragPosition === null;
            
            return (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={cn(
                  'slider-label text-[10px] transition-all',
                  isActive && 'font-semibold text-gray-900'
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
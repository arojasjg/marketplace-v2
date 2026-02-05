'use client';

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
          className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div 
            className="absolute h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all" 
            style={{ 
              width: `${displayPosition}%`,
              left: '0',
              right: 'auto'
            }} 
          />
          <div 
            className={cn(
              'absolute w-5 h-5 rounded-full bg-white border-2 border-purple-600 shadow-lg cursor-pointer transition-transform',
              isDragging && 'scale-125'
            )}
            style={{ 
              left: `${displayPosition}%`,
              right: 'auto',
              top: '50%',
              transform: `translate(-50%, -50%)`,
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
                  'text-[10px] font-light tracking-wider uppercase text-gray-500 transition-all',
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

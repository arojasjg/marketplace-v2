import { useState, useEffect } from 'react';
import { CANDIDATES } from '@/data/candidates';

export function CyclingCandidatePhotos() {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([0]);

  useEffect(() => {
    // Safety check: ensure we have candidates
    if (!CANDIDATES || CANDIDATES.length === 0) {
      console.error('No candidates available');
      return;
    }

    const interval = setInterval(() => {
      setVisibleIndices(prev => {
        const lastIndex = prev[prev.length - 1];
        const nextIndex = (lastIndex + 1) % CANDIDATES.length;
        // Keep last 3 images visible for smooth accumulation effect
        const newIndices = [...prev, nextIndex];
        return newIndices.slice(-3);
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Safety check: if no candidates, don't render
  if (!CANDIDATES || CANDIDATES.length === 0) {
    return null;
  }

  return (
    <div className="relative h-24 flex items-center justify-end gap-2">
      {visibleIndices.map((index, position) => {
        // Safety check: ensure index is valid
        if (index < 0 || index >= CANDIDATES.length) {
          return null;
        }

        const candidate = CANDIDATES[index];
        
        // Safety check: skip if candidate is undefined
        if (!candidate || !candidate.photo) {
          return null;
        }
        
        const isNewest = position === visibleIndices.length - 1;
        
        return (
          <img
            key={`${index}-${position}`}
            src={candidate.photo}
            alt={`${candidate.firstName} ${candidate.lastNameInitial}.`}
            className={`w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 ${
              isNewest ? 'animate-in fade-in zoom-in' : 'opacity-80 scale-95'
            }`}
            style={{
              zIndex: position,
            }}
          />
        );
      })}
    </div>
  );
}
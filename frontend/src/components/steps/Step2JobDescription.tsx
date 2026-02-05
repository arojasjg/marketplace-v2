import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { Task } from '@/data/tasks';
import { generateJobDescription } from '@/lib/jobDescriptionGenerator';
import { Edit2, Check } from 'lucide-react';

interface Step2Props {
  selectedTasks: Task[];
  onNext: () => void;
  onBack: () => void;
}

export function Step2JobDescription({ selectedTasks, onNext, onBack }: Step2Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const description = generateJobDescription(selectedTasks);
    setJobDescription(description);
    setEditedDescription(description);
    
    // Real-time typing animation
    let currentIndex = 0;
    const typingSpeed = 8; // Fast, fluid pace (milliseconds per character)
    
    const typingInterval = setInterval(() => {
      if (currentIndex < description.length) {
        setDisplayedText(description.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [selectedTasks]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setJobDescription(editedDescription);
    setIsEditing(false);
  };

  const isEmojiLine = (line: string) => {
    const emojiStarters = ['🎯', '✨', '📋', '🤝', '⚙️', '🌟', '💎', '🎓', '👥', '💰', '🏡', '📈', '🚀'];
    return emojiStarters.some(emoji => line.startsWith(emoji));
  };

  const renderFormattedDescription = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        const content = line.slice(2, -2);
        return (
          <div key={index} className="font-bold text-gray-900 text-sm my-0.5">
            {content}
          </div>
        );
      }
      
      if (isEmojiLine(line)) {
        return (
          <div key={index} className="text-lg font-bold text-gray-900 mt-2 mb-1">
            {line}
          </div>
        );
      }
      
      if (line.startsWith('• **')) {
        const match = line.match(/• \*\*(.*?)\*\*(.*)/);
        if (match) {
          return (
            <div key={index} className="ml-2 my-0.5 text-xs">
              <span className="font-bold text-gray-900">{match[1]}</span>
              <span className="font-light text-gray-700">{match[2]}</span>
            </div>
          );
        }
      }
      
      if (line.startsWith('• ')) {
        return (
          <div key={index} className="ml-2 my-0.5 text-xs font-light text-gray-700">
            {line}
          </div>
        );
      }
      
      if (line.trim() === '') {
        return <div key={index} className="h-1" />;
      }
      
      return (
        <div key={index} className="text-xs font-light text-gray-700 leading-relaxed my-0.5">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-5xl mx-auto px-6 h-full flex flex-col">
        <div className="text-center mb-3">
          <h1 className="squarespace-heading gradient-text mb-1 text-2xl">
            AI-Generated Job Description
          </h1>
          <p className="text-sm font-light text-gray-600 max-w-3xl mx-auto">
            Our AI is creating a professional job description based on your selected tasks
          </p>
        </div>

        <Card className="p-4 flex-1 overflow-y-auto border-2 gradient-border">
          <div className="flex justify-between items-center mb-3">
            <h2 className="job-description-heading gradient-text text-xl">Job Description</h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="btn-squarespace-secondary text-xs py-1.5 px-3 flex items-center gap-2"
                disabled={!isTypingComplete}
              >
                <Edit2 className="h-3 w-3" />
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="btn-cta-blue text-xs py-1.5 px-3 flex items-center gap-2"
              >
                <Check className="h-3 w-3" />
                Save
              </button>
            )}
          </div>

          {isEditing ? (
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="min-h-[350px] font-light text-xs leading-relaxed"
            />
          ) : (
            <div className="max-w-none">
              {renderFormattedDescription(displayedText)}
              {!isTypingComplete && <span className="inline-block w-1 h-4 bg-gray-900 animate-pulse ml-0.5" />}
            </div>
          )}
        </Card>
      </div>

      <FloatingNextButton
        onClick={onNext}
        label="Post Job"
      />
    </div>
  );
}
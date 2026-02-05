import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { Task, TASKS } from '@/data/tasks';
import { TRAINING_UNITS } from '@/data/trainingUnits';
import { GraduationCap, BookOpen, Shield, Scale, Users, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Step7Props {
  selectedTasks: Task[];
  onNext: () => void;
  onBack: () => void;
}

const MANDATORY_TRAININGS = [
  'Working for a US Business',
  'Improving Communication Skills',
  'Handling Confidential Information',
  'Improving Language Proficiency',
  'CyberSecurity & Data Protection',
  'Dealing with Stress',
  'Escalations to Stafi Coaches',
  'Stafi Contract & NDA',
  'How Stafi\'s Client Success Supports our Clients'
];

const CATEGORY_ICONS = {
  legal: Scale,
  'people-facing': Users,
  admin: Briefcase,
};

const CATEGORY_COLORS = {
  legal: { light: 'category-legal-light', medium: 'category-legal-medium' },
  'people-facing': { light: 'category-people-light', medium: 'category-people-medium' },
  admin: { light: 'category-admin-light', medium: 'category-admin-medium' },
};

export function Step7Training({ selectedTasks, onNext, onBack }: Step7Props) {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const legalTasks = useMemo(() => selectedTasks.filter(t => t.category === 'legal'), [selectedTasks]);
  const peopleTasks = useMemo(() => selectedTasks.filter(t => t.category === 'people-facing'), [selectedTasks]);
  const adminTasks = useMemo(() => selectedTasks.filter(t => t.category === 'admin'), [selectedTasks]);

  const renderTaskCard = (task: Task, category: 'legal' | 'people-facing' | 'admin') => {
    const units = TRAINING_UNITS[task.name] || [];
    const colors = CATEGORY_COLORS[category];
    
    return (
      <Popover key={task.id}>
        <PopoverTrigger asChild>
          <Card 
            className={cn(
              'p-2 border-2 hover:shadow-lg transition-all duration-300 cursor-pointer',
              colors.medium
            )}
            onMouseEnter={() => setHoveredTask(task.id)}
            onMouseLeave={() => setHoveredTask(null)}
          >
            <div className="flex items-start gap-2">
              <div className="p-1 gradient-primary rounded flex-shrink-0">
                <BookOpen className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-light text-gray-900 text-xs mb-0.5">
                  {task.name}
                </h3>
                <div className="text-[9px] font-light text-gray-600">
                  {units.length} units
                </div>
              </div>
            </div>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="right" align="start">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Training overview</h4>
              <p className="text-xs font-light text-gray-600">{task.name}</p>
            </div>
            <div className="space-y-2">
              {units.map((unit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-medium">{index + 1}</span>
                  </div>
                  <div className="text-xs font-light text-gray-700 leading-relaxed">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const renderCategory = (
    title: string,
    tasks: Task[],
    category: 'legal' | 'people-facing' | 'admin'
  ) => {
    if (tasks.length === 0) return null;
    
    const Icon = CATEGORY_ICONS[category];
    const colors = CATEGORY_COLORS[category];

    return (
      <div>
        <div className={cn('mb-2 p-2 rounded-lg', colors.light)}>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <div>
              <h3 className="text-[10px] font-light tracking-widest uppercase text-gray-900">
                {title}
              </h3>
              <p className="text-[9px] font-light text-gray-600">{tasks.length} tasks</p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {tasks.map(task => renderTaskCard(task, category))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-2">
          <h1 className="squarespace-heading gradient-text mb-1 text-2xl">
            Training at Stafi University
          </h1>
          <p className="text-xs font-light text-gray-600">
            Task-specific training modules tailored to your selected responsibilities
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Card className="p-3 mb-2 gradient-primary text-white border-0">
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <div className="text-center">
                <div className="text-2xl font-light mb-0.5">
                  {selectedTasks.length}
                </div>
                <div className="text-[9px] font-light tracking-widest uppercase opacity-90">
                  Training Modules
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
            {renderCategory('Legal', legalTasks, 'legal')}
            {renderCategory('People Facing', peopleTasks, 'people-facing')}
            {renderCategory('Admin', adminTasks, 'admin')}
          </div>

          {/* Mandatory Trainings Section */}
          <Card className="p-3 border-2 gradient-border mb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 gradient-primary rounded">
                <Shield className="h-3 w-3 text-white" />
              </div>
              <h3 className="text-xs font-light text-gray-900">Mandatory Trainings</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              {MANDATORY_TRAININGS.map((training, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded border border-gray-200"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[7px] font-medium">✓</span>
                  </div>
                  <div className="text-[9px] font-light text-gray-700 leading-tight">
                    {training}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-3 border-2 gradient-border">
            <div className="text-center">
              <GraduationCap className="h-6 w-6 mx-auto mb-1 text-gray-400" />
              <h3 className="text-xs font-light text-gray-900 mb-1">
                Comprehensive Training Program
              </h3>
              <p className="text-[9px] font-light text-gray-600 leading-relaxed">
                Each candidate receives intensive training on the specific tasks you selected plus mandatory courses. 
                Our curriculum combines theoretical knowledge with practical application.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <FloatingNextButton
        onClick={onNext}
        label="View Shortlist"
      />
    </div>
  );
}
'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomSlider } from '../custom-slider';
import { TASKS, Task } from '@/lib/hiring-flow-data/tasks';
import { Scale, Users, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step1Props {
  onNext: (selectedTasks: Task[]) => void;
  onSave: () => void;
  onSkip: () => void;
}

const CATEGORY_ICONS = {
  legal: Scale,
  'people-facing': Users,
  admin: Briefcase,
};

const CATEGORY_COLORS = {
  legal: { light: 'bg-blue-50', medium: 'bg-blue-100', dark: 'bg-blue-600' },
  'people-facing': { light: 'bg-purple-50', medium: 'bg-purple-100', dark: 'bg-purple-600' },
  admin: { light: 'bg-orange-50', medium: 'bg-orange-100', dark: 'bg-orange-600' },
};

export function Step1TaskSelection({ onNext, onSave, onSkip }: Step1Props) {
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const handleTaskToggle = (task: Task) => {
    setSelectedTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) {
        return prev.filter(t => t.id !== task.id);
      } else {
        return [...prev, { ...task, frequency: 'weekly', importance: 'medium' }];
      }
    });
  };

  const updateTaskProperty = (taskId: string, property: keyof Task, value: Task['frequency'] | Task['importance']) => {
    setSelectedTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, [property]: value } : t))
    );
  };

  const isTaskSelected = (taskId: string) => selectedTasks.some(t => t.id === taskId);

  const sortedLegalTasks = useMemo(() => {
    const legal = TASKS.filter(t => t.category === 'legal');
    return [...legal.filter(t => isTaskSelected(t.id)), ...legal.filter(t => !isTaskSelected(t.id))];
  }, [selectedTasks]);

  const sortedPeopleTasks = useMemo(() => {
    const people = TASKS.filter(t => t.category === 'people-facing');
    return [...people.filter(t => isTaskSelected(t.id)), ...people.filter(t => !isTaskSelected(t.id))];
  }, [selectedTasks]);

  const sortedAdminTasks = useMemo(() => {
    const admin = TASKS.filter(t => t.category === 'admin');
    return [...admin.filter(t => isTaskSelected(t.id)), ...admin.filter(t => !isTaskSelected(t.id))];
  }, [selectedTasks]);

  const renderTaskCard = (task: Task, category: 'legal' | 'people-facing' | 'admin') => {
    const selected = isTaskSelected(task.id);
    const selectedTask = selectedTasks.find(t => t.id === task.id);
    const colors = CATEGORY_COLORS[category];

    return (
      <Card 
        key={task.id} 
        className={cn(
          'p-3 hover:shadow-md transition-all duration-300 border border-gray-200 cursor-pointer',
          selected ? colors.medium : 'bg-white'
        )}
        onClick={() => handleTaskToggle(task)}
      >
        <div className="flex items-start gap-3">
          <Checkbox
            checked={selected}
            onCheckedChange={() => handleTaskToggle(task)}
            className="mt-1 pointer-events-none"
          />
          <div className="flex-1 space-y-2">
            <div className={cn('font-light text-sm', selected ? 'text-gray-900' : 'text-gray-700')}>
              {task.name}
            </div>
            {selected && (
              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                <div>
                  <div className="text-[9px] font-light tracking-wider uppercase text-gray-600 mb-1">
                    Frequency
                  </div>
                  <CustomSlider
                    value={selectedTask?.frequency || 'weekly'}
                    onChange={(value) => updateTaskProperty(task.id, 'frequency', value as 'daily' | 'weekly' | 'monthly')}
                    options={[
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'daily', label: 'Daily' },
                    ]}
                    direction="ltr"
                  />
                </div>
                <div>
                  <div className="text-[9px] font-light tracking-wider uppercase text-gray-600 mb-1">
                    Importance
                  </div>
                  <CustomSlider
                    value={selectedTask?.importance || 'medium'}
                    onChange={(value) => updateTaskProperty(task.id, 'importance', value as 'low' | 'medium' | 'high')}
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                    ]}
                    direction="ltr"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const renderCategory = (
    title: string,
    tasks: Task[],
    category: 'legal' | 'people-facing' | 'admin'
  ) => {
    const Icon = CATEGORY_ICONS[category];
    const colors = CATEGORY_COLORS[category];

    return (
      <div>
        <div className={cn('mb-3 p-3 rounded-lg', colors.light)}>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <div>
              <h3 className="text-xs font-light tracking-widest uppercase text-gray-900">
                {title}
              </h3>
              <p className="text-xs font-light text-gray-600">{tasks.length} tasks</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {tasks.map(task => renderTaskCard(task, category))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="text-center mb-6 pt-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Select Tasks for Your Stafi Representative
          </h1>
          <p className="text-base font-light text-gray-600 max-w-3xl mx-auto mb-4">
            Choose the responsibilities you need help with. We will find and train the perfect candidate.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            {selectedTasks.length > 0 && (
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md">
                <span className="text-2xl font-bold text-white">
                  {selectedTasks.length}
                </span>
                <span className="text-xs font-light tracking-widest uppercase text-white opacity-95">
                  Task{selectedTasks.length !== 1 ? 's' : ''} Selected
                </span>
              </div>
            )}
            <p className="text-sm text-gray-500">Up to 12 tasks can be selected</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 pb-4">
          {renderCategory('Legal', sortedLegalTasks, 'legal')}
          {renderCategory('People Facing', sortedPeopleTasks, 'people-facing')}
          {renderCategory('Admin', sortedAdminTasks, 'admin')}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 py-4 px-8 flex items-center justify-between">
        <div />
        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            className="px-6 py-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm"
          >
            Save
          </button>
          <button
            onClick={onSkip}
            className="px-6 py-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg font-medium transition-colors text-sm"
          >
            Skip for now
          </button>
          {selectedTasks.length > 0 && (
            <button
              onClick={() => onNext(selectedTasks)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Continue
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

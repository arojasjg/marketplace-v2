import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomSlider } from '@/components/CustomSlider';
import { FloatingNextButton } from '@/components/FloatingNextButton';
import { TASKS, Task } from '@/data/tasks';
import { Scale, Users, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step1Props {
  onNext: (selectedTasks: Task[]) => void;
}

const CATEGORY_ICONS = {
  legal: Scale,
  'people-facing': Users,
  admin: Briefcase,
};

const CATEGORY_COLORS = {
  legal: { light: 'category-legal-light', medium: 'category-legal-medium', dark: 'category-legal-dark' },
  'people-facing': { light: 'category-people-light', medium: 'category-people-medium', dark: 'category-people-dark' },
  admin: { light: 'category-admin-light', medium: 'category-admin-medium', dark: 'category-admin-dark' },
};

export function Step1TaskSelection({ onNext }: Step1Props) {
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

  const updateTaskProperty = (taskId: string, property: keyof Task, value: string) => {
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
                    onChange={(value) => updateTaskProperty(task.id, 'frequency', value)}
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
                    onChange={(value) => updateTaskProperty(task.id, 'importance', value)}
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
    <div className="h-screen overflow-hidden bg-white pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="text-center mb-4">
          <h1 className="squarespace-heading gradient-text mb-3">
            Select Tasks for Your Stafi Representative
          </h1>
          <p className="text-base font-light text-gray-600 max-w-3xl mx-auto mb-4">
            Choose the responsibilities you need help with. We'll find and train the perfect candidate.
          </p>
          
          {selectedTasks.length > 0 && (
            <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg mb-2">
              <div className="text-4xl font-bold text-white mb-1">
                {selectedTasks.length}
              </div>
              <div className="text-xs font-light tracking-widest uppercase text-white opacity-95">
                Task{selectedTasks.length !== 1 ? 's' : ''} Selected
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4">
          {renderCategory('Legal', sortedLegalTasks, 'legal')}
          {renderCategory('People Facing', sortedPeopleTasks, 'people-facing')}
          {renderCategory('Admin', sortedAdminTasks, 'admin')}
        </div>
      </div>

      {selectedTasks.length > 0 && (
        <FloatingNextButton
          onClick={() => onNext(selectedTasks)}
          label="Continue"
        />
      )}
    </div>
  );
}
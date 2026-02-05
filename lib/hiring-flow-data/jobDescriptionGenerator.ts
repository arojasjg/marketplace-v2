import { Task } from './tasks';

export function generateJobDescription(selectedTasks: Task[]): string {
  if (selectedTasks.length === 0) {
    return 'Select tasks to generate a job description...';
  }

  const legalTasks = selectedTasks.filter(t => t.category === 'legal');
  const peopleTasks = selectedTasks.filter(t => t.category === 'people-facing');
  const adminTasks = selectedTasks.filter(t => t.category === 'admin');

  let description = 'Stafi Legal Representative\n\n';
  
  description += 'Join Our Team\n\n';
  description += 'Are you a detail-oriented professional with a passion for legal work? We\'re looking for an exceptional Legal Representative to join our growing law firm. This is more than just a job—it\'s an opportunity to make a real impact while working with a supportive team that values your growth.\n\n';

  description += 'What You\'ll Do\n\n';

  if (legalTasks.length > 0) {
    description += 'Legal Responsibilities\n\n';
    legalTasks.forEach(task => {
      const freq = task.frequency ? ` (${task.frequency})` : '';
      const imp = task.importance ? ` - ${task.importance.toUpperCase()} priority` : '';
      description += `- ${task.name}${freq}${imp}\n`;
    });
    description += '\n';
  }

  if (peopleTasks.length > 0) {
    description += 'Client-Facing Excellence\n\n';
    peopleTasks.forEach(task => {
      const freq = task.frequency ? ` (${task.frequency})` : '';
      const imp = task.importance ? ` - ${task.importance.toUpperCase()} priority` : '';
      description += `- ${task.name}${freq}${imp}\n`;
    });
    description += '\n';
  }

  if (adminTasks.length > 0) {
    description += 'Administrative Excellence\n\n';
    adminTasks.forEach(task => {
      const freq = task.frequency ? ` (${task.frequency})` : '';
      const imp = task.importance ? ` - ${task.importance.toUpperCase()} priority` : '';
      description += `- ${task.name}${freq}${imp}\n`;
    });
    description += '\n';
  }

  description += 'What Makes You Perfect for This Role\n\n';
  description += '- English Mastery – You communicate at a C2 level with confidence and clarity\n';
  description += '- Attention to Detail – Nothing slips past you; accuracy is your superpower\n';
  description += '- Legal Expertise – You understand legal documentation and procedures inside and out\n';
  description += '- Tech-Savvy – CRM and case management systems are second nature to you\n';
  description += '- Discretion – You handle confidential information with the utmost professionalism\n';
  description += '- Problem-Solver – You think critically and find solutions independently\n\n';

  description += 'What We Offer You\n\n';
  description += 'World-Class Training – Complete your education at Stafi University with comprehensive courses designed for success\n\n';
  description += 'Dedicated Coaching – Work alongside experienced legal coaches who support your growth every step of the way\n\n';
  description += 'Competitive Compensation – Your skills and dedication deserve to be rewarded\n\n';
  description += 'Remote Flexibility – Work from anywhere while maintaining work-life balance\n\n';
  description += 'Career Growth – We invest in your professional development with ongoing training and advancement opportunities\n\n';
  
  description += 'Ready to Start Your Journey?\n\n';
  description += 'This is your chance to join a team that values excellence, supports your growth, and recognizes your contributions. If you\'re ready to take your career to the next level, we want to hear from you!\n';

  return description;
}

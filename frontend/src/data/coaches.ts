export interface Coach {
  id: string;
  name: string;
  title: string;
  photo: string;
  specialties: string[];
  bio: string;
}

export const COACHES: Coach[] = [
  {
    id: 'coach-1',
    name: 'Loveness Gatsi',
    title: 'PI Legal Coach',
    photo: 'https://mgx-backend-cdn.metadl.com/generate/images/891635/2026-01-13/2fcd7259-7326-40c6-921e-09bea0fbea25.png',
    specialties: ['Personal Injury Law', 'Client Communication', 'Legal Documentation'],
    bio: 'Loveness is your dedicated PI Legal Coach, providing first-line support for all personal injury matters. She ensures your Stafi Representative is always prepared and confident, so you never have to handle routine escalations.',
  },
];
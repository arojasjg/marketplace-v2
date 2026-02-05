# Hiring Flow Migration Guide

## Overview

The frontend Vite + React Router application has been successfully integrated into the Next.js app as a new route at `/hiring-flow`.

## What Was Migrated

### Data Files (in `lib/hiring-flow-data/`)
- `tasks.ts` - Task definitions and categories
- `candidates.ts` - Candidate data with DISC profiles
- `cities.ts` - Geographic data for job posting
- `courses.ts` - Training course information
- `coaches.ts` - Coach profiles
- `trainingUnits.ts` - Training unit mappings
- `jobDescriptionGenerator.ts` - Job description generation logic

### Components (in `components/hiring-flow/`)

#### Utility Components
- `step-progress.tsx` - Progress indicator at top of page
- `floating-next-button.tsx` - Floating "Next" button
- `back-button.tsx` - Floating "Back" button
- `animated-counter.tsx` - Animated number counter
- `custom-slider.tsx` - Custom slider for frequency/importance

#### Step Components (in `components/hiring-flow/steps/`)
- `step1-task-selection.tsx` - Task selection interface (fully implemented)
- Additional steps 2-12 need to be migrated from `frontend/src/components/steps/`

### Page
- `app/hiring-flow/page.tsx` - Main hiring flow page with state management

### Styles
- Added custom CSS to `app/globals.css` for gradient utilities and typography

## Current Status

### ✅ Completed
- All data files migrated
- Core utility components migrated
- Step 1 (Task Selection) fully functional
- Page routing configured
- Custom styles added
- State management structure in place

### 🚧 Remaining Work
You need to migrate the remaining step components from the frontend:

1. **Step 2: Job Description** (`Step2JobDescription.tsx`)
   - Includes typing animation effect
   - Job description generation and editing

2. **Step 3: Job Posting** (`Step3JobPosting.tsx`)
   - Map visualization of cities
   - Job posting animation

3. **Step 4: Applicant Surge** (`Step4ApplicantSurge.tsx`)
   - Animated applicant counter

4. **Step 5: Screening** (`Step5Screening.tsx`)
   - Vetting assessment visualization

5. **Step 6: Interviewing** (`Step6Interviewing.tsx`)
   - Interview process display

6. **Step 7: Hiring** (`Step7Hiring.tsx`)
   - Hiring decision interface

7. **Step 8: Training** (`Step7Training.tsx`)
   - Training course selection and progress

8. **Step 9: Shortlist** (`Step8Shortlist.tsx`)
   - Candidate shortlist with starring

9. **Step 10: Scheduling** (`Step9Scheduling.tsx`)
   - Interview scheduling interface

10. **Step 11: Final Selection** (`Step11FinalSelection.tsx`)
    - Final candidate selection

11. **Step 12: Support** (`Step10Support.tsx`)
    - Support system overview

## Migration Pattern

To migrate each step component:

1. **Copy the component** from `frontend/src/components/steps/`
2. **Update imports:**
   ```tsx
   // OLD (Vite)
   import { Component } from '@/components/ui/component';
   import { Task } from '@/data/tasks';
   
   // NEW (Next.js)
   import { Component } from '@/components/ui/component';
   import { Task } from '@/lib/hiring-flow-data/tasks';
   ```

3. **Add 'use client' directive** at the top if the component uses hooks:
   ```tsx
   'use client';
   
   import { useState } from 'react';
   // ... rest of imports
   ```

4. **Update component paths:**
   - Change `@/components/BackButton` to `../back-button`
   - Change `@/components/FloatingNextButton` to `../floating-next-button`
   - Change `@/components/AnimatedCounter` to `../animated-counter`
   - etc.

5. **Update data imports:**
   - Change `@/data/tasks` to `@/lib/hiring-flow-data/tasks`
   - Change `@/data/candidates` to `@/lib/hiring-flow-data/candidates`
   - etc.

6. **Add to main page** in `app/hiring-flow/page.tsx`:
   ```tsx
   import { Step2JobDescription } from '@/components/hiring-flow/steps/step2-job-description';
   
   // In the render:
   {currentStep === 2 && (
     <Step2JobDescription
       selectedTasks={selectedTasks}
       onNext={() => setCurrentStep(3)}
       onBack={() => setCurrentStep(1)}
     />
   )}
   ```

## Additional Components Needed

Some step components may reference additional utility components from the frontend that haven't been migrated yet:

- `CyclingCandidatePhotos.tsx` - Animated candidate photo carousel
- `TypingText.tsx` - Typing animation effect

Copy these from `frontend/src/components/` to `components/hiring-flow/` as needed.

## Testing

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/hiring-flow`

3. Test the task selection (Step 1):
   - Select tasks from different categories
   - Adjust frequency and importance sliders
   - Click "Continue" to proceed

## Key Differences from Original

### Removed Dependencies
- No React Router (Next.js handles routing)
- No Tanstack Query (can be added if needed for data fetching)
- No Supabase (was in frontend but not used in this flow)

### Architecture Changes
- Client components use `'use client'` directive
- State management stays in the page component
- No separate App.tsx wrapper needed

### Styling
- Uses existing Next.js Tailwind CSS 4 setup
- Custom gradient utilities added to globals.css
- All shadcn/ui components work as-is

## Future Enhancements

Once all steps are migrated, consider:

1. **Add animations** with framer-motion if desired
2. **Add data persistence** (localStorage or database)
3. **Add form validation** with react-hook-form + zod
4. **Add loading states** between steps
5. **Add error boundaries** for better error handling
6. **Add analytics tracking** for step completion
7. **Make it responsive** for mobile devices

## File Structure

```
/Users/jrstafi/Downloads/law-work-marketplace/
├── app/
│   └── hiring-flow/
│       └── page.tsx                 # Main hiring flow page
├── components/
│   └── hiring-flow/
│       ├── animated-counter.tsx
│       ├── back-button.tsx
│       ├── custom-slider.tsx
│       ├── floating-next-button.tsx
│       ├── step-progress.tsx
│       └── steps/
│           ├── step1-task-selection.tsx
│           └── [steps 2-12 to be added]
└── lib/
    └── hiring-flow-data/
        ├── candidates.ts
        ├── cities.ts
        ├── coaches.ts
        ├── courses.ts
        ├── jobDescriptionGenerator.ts
        ├── tasks.ts
        └── trainingUnits.ts
```

## Notes

- The original frontend folder remains intact and can be removed once migration is complete
- All UI components from shadcn/ui are already available in the Next.js project
- The hiring flow is completely isolated from the rest of the Next.js app
- You can access it directly at `/hiring-flow` route

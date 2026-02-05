# Stafi AI-Driven Hiring Demo - Development Plan

## Design Guidelines

### Design References (Primary Inspiration)
- **Stripe.com**: Clean, professional SaaS aesthetic with smooth animations
- **Linear.app**: Modern dashboard design with excellent micro-interactions
- **Notion.so**: Clear information hierarchy and intuitive UI patterns
- **Style**: Modern SaaS + Professional + Trust-Building + Animation-Rich

### Color Palette
- Primary: #2563EB (Professional Blue - primary actions, active states)
- Secondary: #1E293B (Slate Dark - text, headers)
- Success: #10B981 (Emerald - passed candidates, completions)
- Warning: #F59E0B (Amber - in-progress states)
- Error: #EF4444 (Red - failed candidates)
- Background: #F8FAFC (Light Gray - main background)
- Card Background: #FFFFFF (White - cards, panels)
- Border: #E2E8F0 (Light Border)
- Text Primary: #0F172A (Slate 900)
- Text Secondary: #64748B (Slate 500)

### Typography
- Heading1: Inter font-weight 700 (36px) - Main section titles
- Heading2: Inter font-weight 600 (28px) - Subsection titles
- Heading3: Inter font-weight 600 (20px) - Card titles
- Body/Normal: Inter font-weight 400 (16px) - Main content
- Body/Small: Inter font-weight 400 (14px) - Secondary info
- Body/Emphasis: Inter font-weight 600 (16px) - Important labels
- Button Text: Inter font-weight 500 (14px)

### Key Component Styles
- **Buttons**: 
  - Primary: Blue background (#2563EB), white text, 8px rounded, hover: darken 10%
  - Secondary: White background, blue border, blue text
  - Ghost: Transparent, hover: light gray background
- **Cards**: White background, subtle shadow (0 1px 3px rgba(0,0,0,0.1)), 12px rounded, border 1px #E2E8F0
- **Progress Bars**: Blue fill, light gray background, 8px height, rounded
- **Badges**: 
  - Success: Green background, white text
  - Warning: Amber background, white text
  - Info: Blue background, white text
- **Animations**:
  - Typing effect: 30ms per character
  - Fade transitions: 300ms ease
  - Slide animations: 400ms ease-out
  - Counter animations: 2000ms for full count
  - Map activation: 3s interval per city

### Layout & Spacing
- Max content width: 1400px centered
- Section padding: 60px vertical, 40px horizontal
- Card spacing: 24px gaps in grids
- Step navigation: Fixed top bar with progress indicator
- Responsive breakpoints: 1024px (desktop), 768px (tablet), 640px (mobile)

### Images to Generate
1. **coach-loveness-gatsi.jpg** - Professional headshot of a female coach, warm smile, business attire, studio background (Style: photorealistic, professional portrait)
2. **latin-america-map-illustration.svg** - Simplified illustrated map of Latin America showing Mexico, Central America, and South America with 15 city markers (Style: minimalist, flat design, vector-style)
3. **stafi-logo.png** - Modern SaaS company logo with "Stafi" text, professional and trustworthy (Style: minimalist, vector-style, transparent background)
4. **hero-background-pattern.svg** - Subtle geometric pattern for hero section background (Style: minimalist, light, abstract)

---

## Development Tasks

### 1. Project Setup & Structure
- Initialize shadcn-ui template
- Install dependencies
- Create folder structure: /components, /pages, /lib, /data
- Generate all 4 images using ImageCreator.generate_images

### 2. Mock Data Creation
- Create /data/tasks.ts with all task categories (Legal, People Facing, Admin)
- Create /data/cities.ts with 15 Latin American cities
- Create /data/candidates.ts with mock candidate profiles (Latin American names)
- Create /data/courses.ts with mandatory and task-specific courses
- Create /data/coaches.ts with Loveness Gatsi profile

### 3. Shared Components
- StepProgress.tsx - Top navigation showing current step (1-10)
- TaskCard.tsx - Reusable task selection card with frequency/importance
- CandidateCard.tsx - Profile card with scores and star functionality
- AnimatedCounter.tsx - Number counter with animation
- TypingText.tsx - Live typing effect component
- ProgressBar.tsx - Animated progress bar

### 4. Step 1: Task Selection Page
- TaskSelection.tsx - Main page component
- Task categories: Legal, People Facing, Admin
- Each task: checkbox, frequency dropdown, importance selector
- Selected tasks state management
- "Continue" button to proceed

### 5. Step 2: AI Job Description Generator
- JobDescriptionGenerator.tsx - Main component
- Live typing animation (30ms per character)
- Edit mode toggle
- Real-time updates based on selected tasks
- Professional legal industry tone
- Save configuration button

### 6. Step 3: Latin America Map Visualization
- LatinAmericaMap.tsx - Interactive map component
- 15 city markers (2 Mexico, 5 Central America, 7 South America)
- Sequential activation animation (3s interval)
- Color change on activation
- "Job Post Active" indicator

### 7. Step 4: Applicant Surge
- ApplicantSurge.tsx - Counter visualization
- Live counters per city
- Rapid number increase animation
- Total counter reaching 1,532
- Visual emphasis on growth

### 8. Step 5: AI Screening Results
- ScreeningResults.tsx - Results visualization
- Passed: 102 (stay visible)
- Failed: 1,431 (fade out animation)
- Animated categorization
- Visual separation of passed/failed

### 9. Step 6: Assessment Phase
- AssessmentPhase.tsx - Assessment visualization
- Personality assessment scores
- Psychological assessment scores
- Live score appearance (as tests are "taken")
- 40% pass rate visualization
- Score distribution chart

### 10. Step 7: Stafi University
- StafiUniversity.tsx - Training dashboard
- Mandatory courses list (12 courses)
- Task-specific courses based on Step 1 selections
- Progress indicators per candidate
- Course completion animations
- Overall completion percentage

### 11. Step 8: Candidate Shortlist
- CandidateShortlist.tsx - Top candidates view
- Filter: ≥90% score
- Latin American names (first name + surname initial)
- Star/favorite functionality
- Click to view detailed profile
- CandidateProfile.tsx - Detailed view modal

### 12. Step 9: Interview Scheduling
- InterviewScheduling.tsx - Calendar visualization
- Visual calendar component
- Automated scheduling animation
- "Interview Scheduled by Stafi" message
- Emphasis on zero buyer effort

### 13. Step 10: Post-Hire Support
- PostHireSupport.tsx - Coach assignment screen
- Loveness Gatsi profile card with photo
- Title: PI Legal Coach
- Support messaging
- Escalation flow visualization
- "Buyer productivity protected" emphasis

### 14. Main App Structure
- App.tsx - Step navigation logic
- State management for entire flow
- Step transitions with animations
- Progress tracking
- Back/forward navigation

### 15. Styling & Polish
- Apply design system consistently
- Smooth transitions between steps
- Micro-interactions on hover/click
- Loading states
- Responsive design
- Animation timing refinement

### 16. Testing & Quality Check
- Test all 10 steps sequentially
- Verify animations timing
- Check responsive behavior
- Ensure smooth transitions
- Validate mock data accuracy
- Run pnpm run lint
- Run pnpm run build

---

## Key Technical Notes

- All data is mocked (no backend)
- AI outputs are pre-scripted but appear live
- Animations must feel fast but readable
- Focus on visual storytelling
- Emphasis on "Stafi did the hard work"
- Professional, trust-building aesthetic
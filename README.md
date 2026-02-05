# Law Work Marketplace

A comprehensive legal staffing platform connecting law firms with qualified legal professionals across Latin America.

## 🚀 Features

### For Buyers (Law Firms)
- **Job Posting Management** - Create and manage job postings
- **Candidate Database** - Browse and filter qualified candidates
- **Interview Scheduling** - Coordinate interviews with candidates
- **Messaging System** - Direct communication with candidates
- **Hiring Flow Wizard** - 12-step guided hiring process

### For Candidates (Legal Professionals)
- **Profile Management** - Build comprehensive professional profiles
- **Resume Builder** - Create and update resumes
- **Course Catalog** - Access training and certification courses
- **Assessment Center** - Complete skill assessments
- **Job Applications** - Apply to open positions

### Hiring Flow (New!)
A comprehensive 12-step wizard that guides law firms through the entire hiring process:
1. **Task Selection** - Choose tasks and responsibilities ✅
2. **Job Description** - AI-generated job descriptions
3. **Job Posting** - Post to 14 cities across Latin America
4. **Applicant Surge** - Track incoming applications
5. **Screening** - Automated vetting assessments
6. **Interviewing** - Schedule and conduct interviews
7. **Hiring** - Make hiring decisions
8. **Training** - Stafi University onboarding
9. **Shortlist** - Select top candidates
10. **Scheduling** - Coordinate final interviews
11. **Final Selection** - Make final hiring decision
12. **Support** - Ongoing Stafi support system

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Package Manager**: npm

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/arojasjg/marketplace-v2.git
cd marketplace-v2

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
law-work-marketplace/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication pages
│   ├── (buyer)/                  # Buyer portal pages
│   ├── (dashboard)/              # Candidate dashboard pages
│   ├── hiring-flow/              # Hiring flow wizard
│   └── layout.tsx                # Root layout
├── components/
│   ├── buyer-sidebar.tsx         # Buyer navigation
│   ├── dashboard-sidebar.tsx     # Candidate navigation
│   ├── hiring-flow/              # Hiring flow components
│   │   ├── steps/                # Individual step components
│   │   ├── step-progress.tsx    # Progress indicator
│   │   └── ...                   # Utility components
│   └── ui/                       # shadcn/ui components
├── contexts/
│   └── auth-context.tsx          # Authentication context
├── lib/
│   ├── hiring-flow-data/         # Hiring flow data models
│   ├── mock-data.ts              # Mock data for development
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
└── frontend/                     # Legacy Vite app (reference)
```

## 🎯 Key Routes

- `/` - Landing page
- `/login` - Authentication
- `/buyer/*` - Buyer portal (law firms)
- `/dashboard` - Candidate dashboard
- `/hiring-flow` - Hiring flow wizard

## 🔐 Authentication

The application uses a context-based authentication system with role-based access control:
- **Buyer Role** - Access to hiring tools and candidate management
- **Candidate Role** - Access to profile, courses, and job applications

## 📱 Responsive Design

The application is built with mobile-first principles and includes:
- Responsive navigation
- Adaptive layouts
- Touch-friendly interactions

## 🎨 Design System

Built with a consistent design system featuring:
- Blue (#3B82F6) and Purple (#EC4899) gradient accents
- Clean, modern interface
- Accessible components
- Smooth animations and transitions

## 📄 Documentation

- [Hiring Flow Migration Guide](./HIRING_FLOW_MIGRATION.md) - Guide for migrating remaining steps
- [Integration Complete](./INTEGRATION_COMPLETE.md) - Integration status and next steps

## 🚧 Development Status

### ✅ Complete
- Buyer portal (job posts, candidates, interviews, messages)
- Candidate dashboard (resume, courses, assessments)
- Authentication system
- Hiring Flow Step 1 (Task Selection)
- Data models and utilities
- UI component library

### 🔨 In Progress
- Hiring Flow Steps 2-12 (structure in place, needs implementation)
- Real-time messaging
- Video interview integration
- Payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for the legal staffing industry

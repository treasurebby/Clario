# Clario - Career Guidance Platform

A modern, responsive career guidance web application designed specifically for Nigerian senior secondary students. Clario helps students discover their perfect career path through intelligent personality and interest-based assessments.

## Features

- **Stunning Landing Page**: Eye-catching hero section with animated gradients and smooth animations
- **Stream Selection**: Choose between Science, Arts, or Commercial streams
- **Intelligent Assessment**: 15 carefully crafted questions per stream to understand student interests
- **Personalized Recommendations**: AI-powered course matching algorithm with percentage scores
- **Beautiful UI/UX**: Dark theme with purple accents, smooth animations, and responsive design
- **Instant Results**: Get career recommendations immediately upon completing the assessment
- **Feedback System**: Built-in suggestion form for user feedback

## Tech Stack

### Core Technologies
- **React 18+** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Context API** - State management

### Architecture
- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Dependency Injection** - Proper service layer with DI
- **Atomic Design Pattern** - Atoms, Molecules, Organisms, Templates, Pages
- **Custom Hooks** - Reusable business logic
- **Service Layer** - Separation of concerns

## Project Structure

```
src/
├── components/
│   ├── atoms/              # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Loading.tsx
│   ├── molecules/          # Composite components
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── StreamSelector.tsx
│   │   └── FeatureCard.tsx
│   ├── organisms/          # Complex sections
│   └── templates/          # Page layouts
├── pages/
│   ├── Landing.tsx         # Name input + hero section
│   ├── Dashboard.tsx       # Stream selection + features
│   ├── Assessment.tsx      # Question flow
│   ├── Results.tsx         # Course recommendations
│   └── Suggestions.tsx     # Feedback form
├── services/
│   ├── AssessmentService.ts
│   ├── StorageService.ts
│   └── RecommendationService.ts
├── hooks/
│   ├── useLocalStorage.ts
│   └── useAnimations.ts
├── types/
│   ├── assessment.types.ts
│   ├── user.types.ts
│   └── course.types.ts
├── utils/
│   └── constants.ts        # Courses, questions, streams
├── context/
│   └── AssessmentContext.tsx
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Clario
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Design System

### Colour Palette

**Primary Colours:**
- Background: `#000000` (Pure Black)
- Cards/Surfaces: `#1a1a2e` (Dark Navy Blue)
- Primary Purple: `#7c3aed`
- Light Purple: `#a78bfa`
- Accent Purple: `#c084fc`

**Text Colours:**
- Primary: `#ffffff` (White)
- Secondary: `#9ca3af` (Gray 400)
- Muted: `#6b7280` (Gray 500)

**Gradients:**
- Primary: `from-purple-600 via-purple-500 to-indigo-600`
- Button: `from-purple-600 to-purple-800`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights
- **Body**: Regular weights

### Effects
- Glow effects on buttons and cards
- Smooth hover animations
- Fade-in page transitions
- Animated progress bars
- Counter animations for percentages

## User Flow

1. **Landing Page** → Enter name
2. **Dashboard** → Select stream (Science/Arts/Commercial)
3. **Assessment** → Answer 15 questions
4. **Results** → View course recommendations with match percentages
5. **Suggestions** (Optional) → Submit feedback

## Features Breakdown

### Landing Page
- Animated background gradients
- Floating orbs effect
- Name input with validation
- Call-to-action button with animations

### Dashboard
- Welcome message with user's name
- Three stream selection cards
- Features grid explaining app benefits
- Navigation to assessment

### Assessment Page
- Progress bar showing completion
- Question cards with smooth transitions
- Multiple choice and scale questions
- Previous/Next navigation
- Answer validation

### Results Page
- Celebration animation
- Primary recommendation with high match percentage
- Animated percentage counter
- Key reasons for recommendation
- JAMB subject requirements
- Alternative course recommendations
- Next steps guidance
- Retake option

### Suggestions Page
- Category selection
- Message textarea
- Optional email field
- Success animation on submission

## Course Database

### Science Stream (6 Courses)
- Medicine and Surgery
- Computer Science
- Engineering (Various)
- Pharmacy
- Architecture
- Nursing Science

### Arts Stream (6 Courses)
- Law
- Mass Communication
- English and Literary Studies
- Psychology
- Political Science
- International Relations

### Commercial Stream (6 Courses)
- Accounting
- Business Administration
- Economics
- Banking and Finance
- Marketing
- Insurance

## Recommendation Algorithm

The app uses a sophisticated matching algorithm that:
1. Analyses user responses to 15 questions
2. Matches answer traits with course traits
3. Calculates weighted scores
4. Generates match percentages (0-100%)
5. Ranks courses by best fit
6. Provides personalized reasons for recommendations

## Local Storage

The app uses browser localStorage to persist:
- User name
- Selected stream
- Assessment answers
- Recommendations (for quick access)

This allows users to resume their session even after closing the browser.

## Responsive Design

The application is fully responsive and works seamlessly on:
- **Mobile devices** (< 640px)
- **Tablets** (640px - 1024px)
- **Desktop** (> 1024px)

Key responsive features:
- Single column layouts on mobile
- Grid layouts on larger screens
- Touch-friendly buttons (min 44px)
- Optimized font sizes
- Collapsible navigation

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible styles
- Colour contrast compliance (WCAG AA)
- Screen reader friendly

## Performance Optimizations

- Lazy loading routes (code splitting)
- Optimized images
- Memoized components
- Debounced input handlers
- Efficient re-renders
- Minimal bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements (Phase 2+)

- [ ] Course details modal with more information
- [ ] University search and filter
- [ ] JAMB requirements reference
- [ ] Share results on social media
- [ ] Download PDF report
- [ ] Save and resume assessment later
- [ ] User authentication
- [ ] Assessment history
- [ ] Compare courses side-by-side
- [ ] Virtual counsellor chat
- [ ] Resources library
- [ ] Success stories section

## License

All rights reserved. This project is proprietary software.

---

**Built with ❤️ for Nigerian Students**

Helping you discover your perfect career path, one assessment at a time.

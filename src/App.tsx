import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { Suggestions } from './pages/Suggestions';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <AssessmentProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AssessmentProvider>
    </Router>
  );
}

export default App;

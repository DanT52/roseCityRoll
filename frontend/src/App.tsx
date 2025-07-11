import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FAQPage from './pages/FAQ';
import SchedulePage from './pages/Schedule';
import Thanks from './pages/Thanks';

// Google Analytics tracking hook
function usePageTracking() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-4K2ENH6D1P', {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <PageTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import FAQ from './pages/FAQ';
import Thanks from './pages/Thanks';
import Login from './pages/Login';
import AdminDash from './pages/AdminDash';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound'; // Import the 404 page component

// Google Analytics tracking function
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Call usePageTracking inside BrowserRouter */}
        <PageTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="thanks" element={<Thanks />} />
            <Route path="login" element={<Login />} />
            <Route
              path="admindash"
              element={
                <ProtectedRoute>
                  <AdminDash />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} /> {/* Add 404 route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Separate component to handle page tracking
function PageTracker() {
  usePageTracking();
  return null;
}

export default App;
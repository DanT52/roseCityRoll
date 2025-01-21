import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FAQPage from './pages/FAQ';
import SchedulePage from './pages/Schedule';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
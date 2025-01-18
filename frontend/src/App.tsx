import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import FAQ from './pages/FAQ';
import Thanks from './pages/Thanks';
import Login from './pages/Login';
import AdminDash from './pages/AdminDash';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="thanks" element={<Thanks />} />
          <Route path="login" element={<Login />} />
          <Route path="admindash" element={<AdminDash />} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
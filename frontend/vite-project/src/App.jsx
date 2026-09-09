import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FloatingWhatsApp from './components/FloatingWhatsApp'; // <-- Import cheyali

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Home />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
        
        {/* Ikkada pettarante website lo ekkadunna button bounce avtu kanipistundi */}
        <FloatingWhatsApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
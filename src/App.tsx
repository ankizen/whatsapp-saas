import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import Templates from './pages/templates/Templates';
import TemplateEditor from './pages/templates/TemplateEditor';
import BulkMessaging from './pages/messaging/BulkMessaging';
import Conversations from './pages/conversations/Conversations';
import Chat from './pages/conversations/Chat';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="templates/new" element={<TemplateEditor />} />
            <Route path="templates/edit/:id" element={<TemplateEditor />} />
            <Route path="messaging" element={<BulkMessaging />} />
            <Route path="conversations" element={<Conversations />} />
            <Route path="conversations/:id" element={<Chat />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
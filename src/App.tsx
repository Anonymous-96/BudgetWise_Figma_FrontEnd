import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Goals from './components/Goals';
import Insights from './components/Insights';
import Settings from './components/Settings';
import AIHub from './components/AIHub';
import Gamification from './components/Gamification';
import Subscription from './components/Subscription';
import LearningHub from './components/LearningHub';
import Community from './components/Community';
import AuthWrapper from './components/AuthWrapper';

export default function App() {
  const { isAuthenticated, loading } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('financeflow-theme');
    return saved ? saved === 'dark' : false;
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [notifications, setNotifications] = useState<any[]>([]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('financeflow-theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    // Apply theme to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0F172A';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isDarkMode]);

  // Simple notification system
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const newNotification = {
          id: Date.now(),
          message: "💡 AI Tip: You can save ₹3,000 monthly by optimizing subscriptions",
          type: "tip"
        };
        setNotifications(prev => [...prev.slice(-2), newNotification]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const appProps = {
    isDarkMode,
    toggleDarkMode,
    isOffline,
    notifications,
    setNotifications
  };

  const handleRemoveNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Simple loading fallback
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* Offline Indicator */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 z-50 font-medium">
          📡 You're offline. Some features may be limited.
        </div>
      )}

      {/* Simple Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="clean-card p-4 bg-card/95 backdrop-blur-sm border-l-4 border-l-primary max-w-sm"
          >
            <p className="text-sm font-medium text-foreground">{notification.message}</p>
            <button
              onClick={() => handleRemoveNotification(notification.id)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Navigation for authenticated users */}
      {isAuthenticated && (
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage {...appProps} />
            )
          } 
        />
        <Route 
          path="/auth" 
          element={<AuthForm />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <AuthWrapper>
              <Dashboard {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <AuthWrapper>
              <Transactions {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/budgets" 
          element={
            <AuthWrapper>
              <Budgets {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/goals" 
          element={
            <AuthWrapper>
              <Goals {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/insights" 
          element={
            <AuthWrapper>
              <Insights {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <AuthWrapper>
              <Settings {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/ai-hub" 
          element={
            <AuthWrapper>
              <AIHub {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/gamification" 
          element={
            <AuthWrapper>
              <Gamification {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/subscription" 
          element={
            <AuthWrapper>
              <Subscription {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/learning" 
          element={
            <AuthWrapper>
              <LearningHub {...appProps} />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/community" 
          element={
            <AuthWrapper>
              <Community {...appProps} />
            </AuthWrapper>
          } 
        />
        
        {/* Handle legacy routes */}
        <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
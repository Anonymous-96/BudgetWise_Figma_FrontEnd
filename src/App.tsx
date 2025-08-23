import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Goals from './components/Goals';
import Insights from './components/Insights';
import Settings from './components/Settings';
// New enhanced components
import AIHub from './components/AIHub';
import Gamification from './components/Gamification';
import Subscription from './components/Subscription';
import LearningHub from './components/LearningHub';
import Community from './components/Community';
// UI Components
import NotificationPanel from './components/ui/NotificationPanel';
import { useNotifications } from './components/hooks/useNotifications';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('financeflow-theme');
    return saved ? saved === 'dark' : false;
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { notifications, setNotifications } = useNotifications();

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

  return (
    <Router>
      {/* Offline Indicator */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 z-50 font-medium">
          📡 You're offline. Some features may be limited.
        </div>
      )}

      {/* Push Notifications */}
      <NotificationPanel 
        notifications={notifications} 
        onRemoveNotification={handleRemoveNotification}
      />

      <Routes>
        <Route path="/" element={<LandingPage {...appProps} />} />
        <Route path="/dashboard" element={<Dashboard {...appProps} />} />
        <Route path="/transactions" element={<Transactions {...appProps} />} />
        <Route path="/budgets" element={<Budgets {...appProps} />} />
        <Route path="/goals" element={<Goals {...appProps} />} />
        <Route path="/insights" element={<Insights {...appProps} />} />
        <Route path="/settings" element={<Settings {...appProps} />} />
        
        {/* New Enhanced Routes */}
        <Route path="/ai-hub" element={<AIHub {...appProps} />} />
        <Route path="/gamification" element={<Gamification {...appProps} />} />
        <Route path="/subscription" element={<Subscription {...appProps} />} />
        <Route path="/learning" element={<LearningHub {...appProps} />} />
        <Route path="/community" element={<Community {...appProps} />} />
        
        {/* Handle legacy routes */}
        <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
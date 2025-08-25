import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from './ui/card';
import { Loader2 } from 'lucide-react';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthWrapper({ children, requireAuth = true }: AuthWrapperProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // Remove loading screen for better UX
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated && location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
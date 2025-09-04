import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile, getProfile } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simplified auth for demo - check if Supabase is properly configured
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const { data: profileData } = await getProfile(session.user.id);
            setProfile(profileData);
          } catch (error) {
            console.warn('Profile fetch failed, using demo mode');
            setProfile({
              id: session.user.id,
              email: session.user.email || 'demo@example.com',
              full_name: 'Demo User',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          }
        }
      } catch (error) {
        console.warn('Supabase not configured, using demo mode');
        // Demo mode - simulate logged in user
        const demoUser = {
          id: 'demo-user-id',
          email: 'demo@example.com',
          created_at: new Date().toISOString()
        } as User;
        
        setUser(demoUser);
        setProfile({
          id: 'demo-user-id',
          email: 'demo@example.com',
          full_name: 'Demo User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
  };
}
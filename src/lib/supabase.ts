import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kzzatfvzethoepgpekiw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6emF0ZnZ6ZXRob2VwZ3Bla2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NTU5MTksImV4cCI6MjA3MTUzMTkxOX0.vdVRRBZMUN5WKzQ-dRNtjM2BBwyzsPTSJSYqaVNeQJ0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  is_default: boolean;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string;
  amount: number;
  description: string;
  transaction_date: string;
  type: 'income' | 'expense' | 'transfer';
  merchant?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  account?: Account;
}

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  name: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName?: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) {
      console.error('Signup error:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Unexpected signup error:', err);
    return { data: null, error: { message: 'An unexpected error occurred during signup' } };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Signin error:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Unexpected signin error:', err);
    return { data: null, error: { message: 'An unexpected error occurred during signin' } };
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching profile:', err);
    return { data: null, error: { message: 'Failed to fetch profile' } };
  }
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

export const getAccounts = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching accounts:', error);
      return { data: [], error };
    }
    
    return { data: data || [], error: null };
  } catch (err) {
    console.error('Unexpected error fetching accounts:', err);
    return { data: [], error: { message: 'Failed to fetch accounts' } };
  }
};

export const createAccount = async (account: Omit<Account, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('accounts')
    .insert(account)
    .select()
    .single();
  return { data, error };
};

export const getCategories = async (userId: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name');
  return { data, error };
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
  return { data, error };
};

export const getTransactions = async (userId: string, limit = 50) => {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      category:categories(*),
      account:accounts(*)
    `)
    .eq('user_id', userId)
    .order('transaction_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'category' | 'account'>) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select(`
      *,
      category:categories(*),
      account:accounts(*)
    `)
    .single();
  return { data, error };
};

export const getBudgets = async (userId: string) => {
  const { data, error } = await supabase
    .from('budgets')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createBudget = async (budget: Omit<Budget, 'id' | 'created_at' | 'updated_at' | 'category'>) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select(`
      *,
      category:categories(*)
    `)
    .single();
  return { data, error };
};

export const getGoals = async (userId: string) => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('target_date', { ascending: true });
  return { data, error };
};

export const createGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('goals')
    .insert(goal)
    .select()
    .single();
  return { data, error };
};

export const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single();
  return { data, error };
};

// File upload helpers
export const uploadAvatar = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/avatar.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true });
  
  if (error) return { data: null, error };
  
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);
  
  return { data: { path: data.path, publicUrl }, error: null };
};

export const uploadReceipt = async (userId: string, transactionId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${transactionId}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('receipts')
    .upload(fileName, file);
  
  return { data, error };
};
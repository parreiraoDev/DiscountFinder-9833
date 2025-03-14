import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const updatePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
};
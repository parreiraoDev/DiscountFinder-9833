import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');

export const getBusinessApplications = async () => {
  const { data, error } = await supabase
    .from('business_applications')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateBusinessApplication = async (id, status) => {
  const { data, error } = await supabase
    .from('business_applications')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
  return data;
};

export const getRevenueStats = async (period = 'month') => {
  const { data, error } = await supabase
    .from('revenue_stats')
    .select('*')
    .eq('period', period)
    .single();
  
  if (error) throw error;
  return data;
};

export const getAdPerformance = async (startDate, endDate) => {
  const { data, error } = await supabase
    .from('ad_performance')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate);
  
  if (error) throw error;
  return data;
};

export const getUserStats = async () => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
};
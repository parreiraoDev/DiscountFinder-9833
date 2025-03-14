import { supabase } from './supabaseClient';
import { sendBusinessApplicationNotification } from './notifications';

export const submitBusinessApplication = async (applicationData) => {
  const { data, error } = await supabase
    .from('business_partners')
    .insert({
      business_name: applicationData.businessName,
      website_url: applicationData.website,
      contact_email: applicationData.email,
      subscription_tier: applicationData.productCount,
      monthly_fee: applicationData.selectedTier.price,
      status: 'pending'
    });

  if (error) throw error;

  await sendBusinessApplicationNotification(
    applicationData.email,
    'received'
  );

  return data;
};

export const approveBusinessApplication = async (applicationId) => {
  const { data, error } = await supabase
    .from('business_partners')
    .update({ status: 'active' })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;

  await sendBusinessApplicationNotification(
    data.contact_email,
    'approved'
  );

  return data;
};

export const rejectBusinessApplication = async (applicationId) => {
  const { data, error } = await supabase
    .from('business_partners')
    .update({ status: 'rejected' })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;

  await sendBusinessApplicationNotification(
    data.contact_email,
    'rejected'
  );

  return data;
};
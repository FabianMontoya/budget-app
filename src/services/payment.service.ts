import supabase from '@/supabase';
import dayjs from 'dayjs';

const savePayment = async ({ description, amount }) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([{ created_at: dayjs().toISOString(), description: description, amount: amount }]);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getPayments = async () => {
  try {
    const { data: payments, error } = await supabase.from('payments').select('*');
    return payments;
  } catch (error) {
    throw new Error(error);
  }
};

const deletePayment = async (id) => {
  try {
    const { data, error } = await supabase.from('payments').delete().eq('id', id);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const updatePayment = async ({ description, amount, id }) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({ description: description, amount: amount })
      .eq('id', id);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { savePayment, getPayments, deletePayment, updatePayment };

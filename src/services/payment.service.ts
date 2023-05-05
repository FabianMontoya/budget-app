import supabase from '@/supabase';
import dayjs from 'dayjs';

import type { Payment } from '@/stores/types/payments';
import type { SavePaymentPayload, UpdatePaymentPayload } from './types/payment';

const savePayment = async ({ description, amount }: SavePaymentPayload) => {
  try {
    const { data } = await supabase
      .from('payments')
      .insert([{ created_at: dayjs().toISOString(), description: description, amount: amount }]);
    return data;
  } catch (error) {
    throw error;
  }
};

const getPayments = async (): Promise<Payment[]> => {
  try {
    const { data: payments } = await supabase.from('payments').select('*');
    return payments as Payment[];
  } catch (error) {
    throw error;
  }
};

const deletePayment = async (id: number) => {
  try {
    const { data } = await supabase.from('payments').delete().eq('id', id);
    return data;
  } catch (error) {
    throw error;
  }
};

const updatePayment = async ({ description, amount, id }: UpdatePaymentPayload) => {
  try {
    const { data } = await supabase.from('payments').update({ description: description, amount: amount }).eq('id', id);
    return data;
  } catch (error) {
    throw error;
  }
};

export { deletePayment, getPayments, savePayment, updatePayment };

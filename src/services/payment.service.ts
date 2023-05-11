import supabase from '@/supabase';
import { getUserId } from '@/utils';
import dayjs from 'dayjs';

import type { IPaymentData } from '@/stores/types/payments';
import type { IPaymentResponseData, ISavePaymentPayload, IUpdatePaymentPayload } from './types/payment';

const savePayment = async ({ description, amount, url, reference, isFixed }: ISavePaymentPayload) => {
  try {
    const movementDate = dayjs().toISOString();
    const { data } = await supabase.from('payments').insert([
      {
        description,
        amount,
        url,
        reference,
        isFixed,
        user_created: getUserId(),
        created_at: movementDate,
        updated_at: movementDate
      }
    ]);
    return data;
  } catch (error) {
    throw error;
  }
};

const parsePaymentResponseToPaymentData = (payment: IPaymentResponseData): IPaymentData => ({
  id: payment.id,
  description: payment.description,
  amount: payment.amount,
  url: payment.url === null ? '' : payment.url,
  isFixed: payment.isFixed,
  reference: payment.reference === null ? '' : payment.reference,
  user_created: payment.user_created,
  created_at: dayjs(payment.created_at),
  updated_at: dayjs(payment.updated_at)
});

const getPayments = async (): Promise<IPaymentData[]> => {
  try {
    const { data } = await supabase
      .from('payments')
      .select('id, description, amount, url, isFixed, reference, user_created, created_at, updated_at');

    if (data === null) {
      return [];
    }

    return data.map((payment: IPaymentResponseData) => parsePaymentResponseToPaymentData(payment));
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

const updatePayment = async ({ id, description, amount, url, reference, isFixed }: IUpdatePaymentPayload) => {
  try {
    const { data } = await supabase
      .from('payments')
      .update({ description, amount, url, reference, isFixed, updated_at: dayjs().toISOString() })
      .eq('id', id);
    return data;
  } catch (error) {
    throw error;
  }
};

export { deletePayment, getPayments, savePayment, updatePayment };

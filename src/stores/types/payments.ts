import type { Dayjs } from 'dayjs';

export interface IPaymentForm {
  id: number;
  description: string;
  amount: number;
  isFixed: boolean;
  url: string;
  reference: string;
}

export interface IPaymentData {
  id: number;
  description: string;
  amount: number;
  isFixed: boolean;
  url: string;
  reference: string;
  created_at: Dayjs;
  user_created: string;
  updated_at: Dayjs;
}

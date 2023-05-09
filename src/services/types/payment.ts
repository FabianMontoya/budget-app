export interface IPaymentResponseData {
  id: number;
  description: string;
  amount: number;
  isFixed: boolean;
  url: string | null;
  reference: string | null;
  created_at: string;
  user_created: string;
  updated_at: string;
}

export interface ISavePaymentPayload {
  description: string;
  amount: number;
  isFixed: boolean;
  url: string;
  reference: string;
}

export interface IUpdatePaymentPayload extends ISavePaymentPayload {
  id: number;
}

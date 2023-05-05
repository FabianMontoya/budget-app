export interface Payment {
  id: number;
  description: string;
  amount: number;
  created_date?: Date;
}

export interface PaymentForm {
  id: number;
  description: string;
  amount: number;
}

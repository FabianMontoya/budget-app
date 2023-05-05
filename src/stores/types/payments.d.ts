interface Payment {
  id: number;
  description: string;
  amount: number;
  created_date?: Date;
}

interface PaymentForm {
  id: number;
  description: string;
  amount: number;
}

export { Payment, PaymentForm };

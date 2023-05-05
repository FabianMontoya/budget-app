interface SavePaymentPayload {
  description: string;
  amount: number;
}

interface UpdatePaymentPayload extends SavePaymentPayload {
  id: number;
}

export { SavePaymentPayload, UpdatePaymentPayload };

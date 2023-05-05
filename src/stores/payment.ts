import { deletePayment, getPayments, savePayment, updatePayment } from '@/services/payment.service';
import { defineStore } from 'pinia';
import type { Payment } from './types/payments';

export const usePaymentStore = defineStore('payment', {
  state: () => ({ isLoading: false, payments: [] as Payment[] }),
  actions: {
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setPayments(data: Payment[]) {
      this.payments = data;
    },
    async savePayment(payload: Payment) {
      try {
        this.setIsLoading(true);
        await savePayment(payload);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.setIsLoading(false);
      }
    },
    async deletePayment(id: number) {
      try {
        this.setIsLoading(true);
        await deletePayment(id);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.setIsLoading(false);
      }
    },
    async updatePayment(payload: Payment) {
      try {
        this.setIsLoading(true);
        await updatePayment(payload);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.setIsLoading(false);
      }
    },
    async loadPayments() {
      try {
        this.setIsLoading(true);
        const response = await getPayments();
        this.setPayments(response);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.setIsLoading(false);
      }
    }
  }
});

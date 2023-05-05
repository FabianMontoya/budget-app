import { defineStore } from 'pinia';
import { savePayment, getPayments, deletePayment, updatePayment } from '@/services/payment.service.ts';

export const usePaymentStore = defineStore('payment', {
  state: () => ({ isLoading: false, payments: [] }),
  actions: {
    setIsLoading(isLoading) {
      this.isLoading = isLoading;
    },
    setPayments(data) {
      this.payments = data;
    },
    async savePayment(payload) {
      try {
        this.setIsLoading(true);
        const response = await savePayment(payload);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.setIsLoading(false);
      }
    },
    async deletePayment(id) {
      try {
        this.setIsLoading(true);
        const response = await deletePayment(id);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.setIsLoading(false);
      }
    },
    async updatePayment(payload) {
      try {
        this.setIsLoading(true);
        const response = await updatePayment(payload);
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

import { deletePayment, getPayments, savePayment, updatePayment } from '@/services/payment.service';
import { defineStore } from 'pinia';
import type { IPaymentData } from './types/payments';

export const usePaymentStore = defineStore('payment', {
  state: () => ({ isLoading: false, payments: [] as IPaymentData[] }),
  actions: {
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setPayments(data: IPaymentData[]) {
      this.payments = data;
    },
    async savePayment(payload: IPaymentData) {
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
    async updatePayment(payload: IPaymentData) {
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

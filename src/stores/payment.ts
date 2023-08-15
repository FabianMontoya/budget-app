import { deletePayment, getPayments, savePayment, updatePayment } from '@/services/payment.service';
import type { ISavePaymentPayload, IUpdatePaymentPayload } from '@/services/types/payment';
import { log } from '@/utils/logger';
import { defineStore } from 'pinia';
import type { IPaymentData, IPaymentStore } from './types/payments';

export const usePaymentStore = defineStore('payment', {
	state: (): IPaymentStore => ({
		isLoading: false,
		payments: []
	}),
	actions: {
		setIsLoading(isLoading: boolean) {
			this.isLoading = isLoading;
		},
		setPayments(data: IPaymentData[]) {
			this.payments = data;
		},
		async savePayment(payload: ISavePaymentPayload) {
			try {
				this.setIsLoading(true);
				await savePayment(payload);
			} catch (error) {
				log.error('error: ', error);
			} finally {
				this.setIsLoading(false);
			}
		},
		async deletePayment(id: number) {
			try {
				this.setIsLoading(true);
				await deletePayment(id);
			} catch (error) {
				log.error('error: ', error);
			} finally {
				this.setIsLoading(false);
			}
		},
		async updatePayment(payload: IUpdatePaymentPayload) {
			try {
				this.setIsLoading(true);
				await updatePayment(payload);
			} catch (error) {
				log.error('error: ', error);
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
				log.error('error: ', error);
			} finally {
				this.setIsLoading(false);
			}
		}
	}
});

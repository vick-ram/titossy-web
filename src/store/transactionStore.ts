import { defineStore } from "pinia";
import { ApiResponse, CustomerTransaction } from "../models/constants";
import { get } from "../boot";

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        customerPayments: [] as CustomerTransaction[],
        successMessage: '',
        errorMessage: ''
    }),
    actions: {
        async getAllCustomerTransactions() { 
            try {
                const response = await get<ApiResponse<CustomerTransaction[]>>('/payment/customer');
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.customerPayments = response.data.data;
                    }
                }
                if (response.data.status === 'error') {
                    throw new Error(response.data.error);
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.errorMessage = error.message;
                } else {
                    this.errorMessage = String(error);
                }
            }
        }
    }
})
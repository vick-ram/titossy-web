import { defineStore } from "pinia";
import { ApiResponse, CustomerTransaction, SupplierTransaction } from "../models/constants";
import { get } from "../boot";

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        customerPayments: [] as CustomerTransaction[],
        supplierPayments: [] as SupplierTransaction[],
        successMessage: '',
        errorMessage: ''
    }),
    getters: {
        recentCustomerTransactions: (state) => {
            return state.customerPayments.slice(-5)
        },
        recentSupplierTransactions: (state) => {
            return state.supplierPayments.slice(-5)
        },
    },
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
        },
        async getAllSupplierTransactions() {
            try {
                const response = await get<ApiResponse<SupplierTransaction[]>>('/payment/supplier')
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.supplierPayments = response.data.data
                    }
                }
                if (response.data.status === 'error') {
                    throw new Error(response.data.error)
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.errorMessage = error.message
                } else {
                    this.errorMessage = String(error)
                }
            }
        }
    }
})
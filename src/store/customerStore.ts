import { defineStore } from 'pinia'
import {post, get, patch, put} from '../boot'
import { ApiResponse, Customer } from '../models/constants'

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customer: {} as Customer,
        customers: [] as Customer[],
        errorMessages: '',
        successMessage: '',
        customerData: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
        },
        customerLoginData: {
            email: '',
            password: ''
        }
    }),
    actions: {
        async create() {
            try {
                const res = await post<ApiResponse<Customer>>('/customer/auth/sign_up', this.customerData)
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.customer = res.data.data
                        this.successMessage = String(res.data.message)
                    }
                }

                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessages = String(error)
            }
        },

        async getAll() {
            try {
                const res = await get<ApiResponse<Customer[]>>('/customer')
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.customers = res.data.data
                    }
                }

                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) { 
                this.errorMessages = String(error)
            }
        },
        
        async getOne(id: string) { 
            try {
                const res = await get<ApiResponse<Customer>>(`/customer/${id}`)
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.customer = res.data.data
                    }
                }

                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessages = String(error)
            }
        },

        async update(id: string) {
            try {
                const res = await put<ApiResponse<null>>(`/customer/${id}`, this.customerData)
                if (res.data.status === 'success') {
                    if (res.data.message) {
                        this.successMessage = res.data.message
                    }
                    this.getAll()
                }

                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessages = String(error)
            }
        },

        async updateStatus(id: string, status: string) {
            try {
                const res = await patch<ApiResponse<null>>(`/customer/${id}`, {status: status})
                if (res.data.status === 'success') {
                    if (res.data.message) {
                        this.successMessage = res.data.message
                    }
                }

                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessages = String(error)
            }
        },
    }
})
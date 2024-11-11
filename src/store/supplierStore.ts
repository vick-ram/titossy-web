import { defineStore } from 'pinia'
import {post, get, del, patch} from '../boot'
import { ApiResponse, Supplier } from '../models/constants'

export const useSupplierStore = defineStore('supplier', {
    state: () => ({
        supplier: {} as Supplier,
        suppliers: [] as Supplier[],
        errorMessages: '',
        successMessage: '',
        suplierData: {
            firstName: '',
            lastName: '',
            company: '',
            phone: '',
            address: '',
            email: '',
            password: '',
        },
        supplierLoginData: {
            email: '',
            password: ''
        }
    }),
    actions: {
        async create() {
            try {
                const res = await post<ApiResponse<Supplier>>('/supplier/auth/sign_up', this.suplierData)
            if (res.data.status === 'success') { 
                if (res.data.data) {
                    this.supplier = res.data.data
                }
                this.successMessage = String(res.data.message)
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
                const res = await get<ApiResponse<Supplier[]>>('/supplier')
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.suppliers = res.data.data
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
            const res = await get(`/supplier/${id}`)
            if (res.data.status === 'success') {
                this.supplier = res.data.data
            }
            this.errorMessages = String(res.data.error)
        },

        async update(id: string) {
            const res = await post(`/supplier/${id}`, this.suplierData)
            if (res.data.status === 'success') {
                this.successMessage = res.data.message
                this.getOne(id)
            }
            this.errorMessages = String(res.data.error)
        },

        async updateStatus(id: string, status: string) {
            try {
                const res = await patch<ApiResponse<null>>(`/supplier/${id}`, { status: status })
                if (res.data.status === 'success') {
                    if (res.data.message) {
                        this.successMessage = res.data.message
                    }
                }
                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.errorMessages = error.message
                } else {
                    this.errorMessages = String(error)
                }
            }
        },

        async delete(id: string) {
            try {
                const res = await del<ApiResponse<null>>(`/supplier/${id}`)
                if (res.data.status === 'success') {
                    if (res.data.message) {
                        this.successMessage = res.data.message
                    }
                }

                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (e) {
                if (e instanceof Error) {
                    this.errorMessages = e.message
                } else {
                    this.errorMessages = String(e)
                }
            }
        }
    }
})
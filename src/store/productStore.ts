import { get } from '../boot'
import { defineStore } from 'pinia'
import { ApiResponse, Product } from '../models/constants'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
        errorMessage: ''
    }),
    getters: {
        getTotalProducts(state) {
            return state.products.length
        }
    },
    actions: {
        async getAll() {
            try {
                const response = await get<ApiResponse<Product[]>>('/product')
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.products = response.data.data
                    }
                } else if (response.data.status === 'error') {
                    if (response.data.error) {
                        throw new Error(response.data.error)
                    }
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
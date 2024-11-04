import { get } from '../boot'
import { defineStore } from 'pinia'
import { Product } from '../models/constants'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[]
    }),
    actions: {
        async getAll() {
            const res = await get('/product')
            if (res.data.status === 'success') {
                this.products = res.data.data
                console.log(res.data)
            }
        }
    }
})
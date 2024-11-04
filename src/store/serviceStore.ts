import { defineStore } from "pinia";
import { Addon, ApiResponse, Service } from "../models/constants";
import { get } from "../boot";

export const useServiceStore = defineStore('service', {
    state: () => ({
        services: [] as Service[],
        addons: [] as Addon[],
        errorMessage: ''
    }),

    actions: {
        async getAllServices() {
            try {
                const response = await get<ApiResponse<Service[]>>('/service')
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.services = response.data.data
                    }
                }
                if (response.data.status === 'error') {
                    if (response.data.error) {
                        throw new Error(response.data.error)
                    }
                }
            } catch (e) {
                this.errorMessage = String(e)
            }
        },
        async getAllAddons(id: string) {
            try {
                const response = await get<ApiResponse<Addon[]>>(`service/${id}/addon`)
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.addons = response.data.data
                        console.log(this.addons)
                    }
                }
                if (response.data.status === 'error') {
                    if (response.data.error) {
                        throw new Error(response.data.error)
                    }
                }
            } catch (e) {
                this.errorMessage = String(e)
            }
        },
    }
})
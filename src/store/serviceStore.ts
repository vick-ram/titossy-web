import { defineStore } from "pinia";
import { Addon, ApiResponse, Service } from "../models/constants";
import { del, get } from "../boot";

export const useServiceStore = defineStore('service', {
    state: () => ({
        services: [] as Service[],
        addons: [] as Addon[],
        errorMessage: '',
        successMessage: ''
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

        async deleteService(serviceId: string) {
            try {
                const response = await del<ApiResponse<null>>(`/service/${serviceId}`)
                if (response.data.status === 'success') {
                    if (response.data.message) {
                        this.successMessage = response.data.message
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
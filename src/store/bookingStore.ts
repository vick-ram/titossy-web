import { defineStore } from "pinia";
import { ApiResponse, Booking } from "../models/constants";
import { get } from "../boot";

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: [] as Booking[],
        successMessage: '',
        errorMessage: ''
    }),
    getters: {
        totalBookings(state) {
            return state.bookings.length
        }
    },
    actions: {
        async getAllBookings() { 
            try {
                const response = await get<ApiResponse<Booking[]>>('/booking');
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.bookings = response.data.data;
                    }
                    this.successMessage = response.data.message || '';
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
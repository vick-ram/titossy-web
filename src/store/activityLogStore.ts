import { defineStore } from "pinia";
import { ActivityLog, ApiResponse, Notification } from "../models/constants";
import { get, patch } from "../boot";

export const useActivityLogStore = defineStore("activityLog", {
    state: () => ({
        activityLogs: [] as ActivityLog[],
        notifications: [] as Notification[],
        successMessage: "",
        errorMessage: "",
    }),

    actions: {
        async getAll() {
            try {
                const res = await get<ApiResponse<ActivityLog[]>>("/activities/logs");
                if (res.data.status === "success") {
                    if (res.data.data) {
                        this.activityLogs = res.data.data;
                        console.log(this.activityLogs);
                    }
                }
                if (res.data.status === "error") {
                    throw new Error(res.data.error);
                }
            } catch (error) { 
                this.errorMessage = String(error);
            }
        },
        async getAllNotifications() {
            try {
                const response = await get<ApiResponse<Notification[]>>('/activities/notifications')
                if (response.data.status === 'success') {
                    if (response.data.data) {
                        this.notifications = response.data.data
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
        },
        async markNotificationAsRead(id: string) {
            try {
                const response = await patch<ApiResponse<null>>(`/activities/notifications/${id}`, null)
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
});
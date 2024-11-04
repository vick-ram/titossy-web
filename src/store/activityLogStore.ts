import { defineStore } from "pinia";
import { ActivityLog, ApiResponse } from "../models/constants";
import { get } from "../boot";

export const useActivityLogStore = defineStore("activityLog", {
    state: () => ({
        activityLogs: [] as ActivityLog[],
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
        }
    }
});
import { get } from "../boot";
import { defineStore } from "pinia";
import { ApiResponse, MetricsData } from "../models/constants";


export const useMetricStore = defineStore("metric", {
  state: () => ({
    loading: false,
    metricsData: {} as MetricsData,
    errorMessage: "",
  }),
  getters: {
    getTotalMetrics(state) {
      return Object.keys(state.metricsData).length;
    },
  },
  actions: {
    async fetchMetrics() {
      this.loading = true;
      try {
        const response = await get<ApiResponse<MetricsData>>("/metrics");
        console.log("Metrics response:", response.data);
        if (response.data.status === "success") {
          if (response.data.data) {
            this.metricsData = response.data.data;
          }
        } else if (response.data.status === "error") {
          if (response.data.error) {
            throw new Error(response.data.error);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
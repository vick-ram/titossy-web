import { defineStore } from "pinia";
import { PurchaseOrder, ApiResponse } from "../models/constants";
import { get } from "../boot";

export const usePurchaseOrderStore = defineStore("purchaseOrder", {
  state: () => ({
    loading: false,
    error: null as string | null,
    successMessage: null as string | null,
    purchaseOrders: [] as PurchaseOrder[],
    selectedPurchaseOrder: null as any | null,
  }),
  actions: {
    async fetchPurchaseOrders() {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await get<ApiResponse<PurchaseOrder[]>>("/order");
        if (response.data.status === "success") {
          this.purchaseOrders = response.data.data || [];
          this.successMessage =
            response.data.message || "Purchase orders fetched successfully.";
        } else if (response.data.status === "error") {
          throw new Error(
            response.data.error || "Failed to fetch purchase orders."
          );
        }
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

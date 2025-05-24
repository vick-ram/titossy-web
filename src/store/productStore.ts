import { get, post } from "../boot";
import { defineStore } from "pinia";
import { ApiResponse, Product } from "../models/constants";

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    products: [] as Product[],
    successMessage: "",
    errorMessage: "",
    inventoryProductData: {
      name: "",
      description: "",
      unitPrice: "",
      image: null as File | null,
      stock: "",
      reorderLevel: "",
    },
  }),
  getters: {
    getTotalProducts(state) {
      return state.products.length;
    },
  },
  actions: {
    async getAll() {
      this.loading = true;
      try {
        const response = await get<ApiResponse<Product[]>>("/product");
        if (response.data.status === "success") {
          if (response.data.data) {
            this.products = response.data.data;
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
    async createInventoryProduct(formData: FormData) {
      this.loading = true;
      try {
        formData.append("name", this.inventoryProductData.name);
        formData.append("description", this.inventoryProductData.description);
        formData.append("price", this.inventoryProductData.unitPrice);
        if (this.inventoryProductData.image) {
          formData.append("image", this.inventoryProductData.image);
        }
        formData.append("stock", this.inventoryProductData.stock);
        formData.append(
          "reorder_level",
          this.inventoryProductData.reorderLevel
        );

        const response = await post<ApiResponse<Product>>(
          "/product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status === "success") {
            this.successMessage = response.data.message || "Product created successfully.";
          if (response.data.data) {
            this.products.push(response.data.data);
          } else {
            throw new Error("Product creation failed, no data returned.");
          }
        }

        if (response.data.status === "error") {
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
      }
    },
  },
});

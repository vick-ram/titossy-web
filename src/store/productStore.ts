import { get, post, del } from "../boot";
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
      supplierId: "",
    },
  }),
  getters: {
    getTotalProducts(state) {
      return state.products.length;
    },
    clearForm(state) {
      state.inventoryProductData = {
        name: "",
        description: "",
        unitPrice: "",
        image: null,
        stock: "",
        reorderLevel: "",
        supplierId: "",
      };
      state.successMessage = "";
      state.errorMessage = "";
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
        formData.append("reorderLevel", this.inventoryProductData.reorderLevel);
        formData.append("supplier_id", this.inventoryProductData.supplierId);

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
          this.successMessage =
            response.data.message || "Product created successfully.";
          if (response.data.data) {
            this.products.push(response.data.data);
            // refresh data
            await this.getAll();
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
      } finally {
        this.loading = false;
      }
    },
    async deleteProduct(productId: string) {
      this.loading = true;
      try {
        const response = await del<ApiResponse<null>>(`/product/${productId}`);
        if (response.data.status === "success") {
          this.successMessage =
            response.data.message || "Product deleted successfully.";
          // Refresh the products list after deletion
          await this.getAll();
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

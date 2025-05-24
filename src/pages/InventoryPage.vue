<template>
  <ElevatedCard class="mt-5">
    <div
      class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
    >
      <div>
        <button
          @click="toggleDrawer"
          type="button"
          class="bg-blue-700 hover:bg-blue-800 text-white ocus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
        </button>
      </div>
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          v-model="query"
          type="text"
          id="table-search"
          class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </div>
    <div class="w-full overflow-x-auto rounded-lg shadow-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">name</th>
            <th scope="col" class="px-6 py-3">description</th>
            <th scope="col" class="px-6 py-3">price</th>
            <th scope="col" class="px-6 py-3">image</th>
            <th scope="col" class="px-6 py-3">stock</th>
            <th scope="col" class="px-6 py-3">reorderLevel</th>
            <th scope="col" class="px-6 py-3">sku</th>
            <th scope="col" class="px-6 py-3">created_at</th>
            <th scope="col" class="px-6 py-3">updated_at</th>
            <th scope="col" class="px-6 py-3">action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.productId"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">
              {{ productStore.products.indexOf(product) + 1 }}
            </td>
            <td class="px-6 py-4">{{ product.productId }}</td>
            <td class="px-6 py-4">{{ product.name }}</td>
            <td class="px-6 py-4">{{ product.description }}</td>
            <td class="px-6 py-4">{{ product.unitPrice }}</td>
            <td v-if="product.image" class="border px-6 py-4">
              <img
                :src="product.image"
                alt="product image"
                class="w-10 h-10 object-cover"
              />
            </td>
            <td class="px-6 py-4">{{ product.stock }}</td>
            <td class="px-6 py-4">{{ product.reorderLevel }}</td>
            <td class="px-6 py-4">{{ product.sku }}</td>
            <td class="px-6 py-4">{{ formatDateTime(product.createdAt) }}</td>
            <td class="px-6 py-4">{{ formatDateTime(product.updatedAt) }}</td>
            <td
              class="px-6 py-4 flex flex-row items-center justify-center gap-2"
            >
              <span
                class="material-symbols-outlined cursor-pointer text-blue-600"
                >visibility</span
              >
              <span
                class="material-symbols-outlined cursor-pointer text-red-500"
                >delete</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span
        class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
        >Showing
        <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of
        <span class="font-semibold text-gray-900 dark:text-white">{{
          productStore.products.length
        }}</span></span
      >
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Previous</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </ElevatedCard>

  <!-- Right Drawer -->
  <RightDrawer :drawer-open="isDrawerOpen" @toggle="toggleDrawer">
    <form @submit.prevent="createProduct">
      <div class="mb-3">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Product Name</label
        >
        <input
          v-model="productStore.inventoryProductData.name"
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter product name"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          v-model="productStore.inventoryProductData.description"
          id="description"
          rows="4"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter product description"
        ></textarea>
      </div>

      <div class="mb-3">
        <label
          for="price"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Price</label
        >
        <input
          v-model="productStore.inventoryProductData.unitPrice"
          type="number"
          id="price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter product price"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="image"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Image URL</label
        >
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="onImageChange"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter product image URL"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="stock"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Stock</label
        >
        <input
          v-model="productStore.inventoryProductData.stock"
          type="number"
          id="stock"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter product stock"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="reorderLevel"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Reorder Level</label
        >
        <input
          v-model="productStore.inventoryProductData.reorderLevel"
          type="number"
          id="reorderLevel"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter reorder level"
          required
        />
      </div>
      <LoadingButton label="Submit" :loading="productStore.loading" />
    </form>
  </RightDrawer>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useProductStore } from "../store/productStore";
import { formatDateTime } from "../utils/dateFormatter";
import { genericFilter } from "../utils/genericFilter";
import ElevatedCard from "../components/ElevatedCard.vue";
import RightDrawer from "../components/RightDrawer.vue";
import LoadingButton from "../components/LoadingButton.vue";
import { useToastStore } from "../store/toastStore";

const productStore = useProductStore();
const toastStore = useToastStore();
const query = ref("");
const isDrawerOpen = ref(false);

const formData = new FormData();

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    productStore.inventoryProductData.image = target.files[0];
  } else {
    productStore.inventoryProductData.image = null;
  }
};

const createProduct = async () => {
  await productStore.createInventoryProduct(formData);
  if (productStore.successMessage) {
    isDrawerOpen.value = false;
    toastStore.showToast(productStore.successMessage, "success");
  }

    if (productStore.errorMessage) {
        toastStore.showToast(productStore.errorMessage, "error");
    }
};

const filteredProducts = computed(() => {
  return genericFilter(productStore.products, query.value, [
    "name",
    "description",
    "sku",
  ]);
});
onMounted(async () => {
  await productStore.getAll();
});
</script>

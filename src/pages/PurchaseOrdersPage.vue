<!-- PurchaseOrderTable.vue -->
<template>
  <ElevatedCard class="mt-5">
    <div
      class="flex flex-row sm:flex-row flex-wrap space-x-4 sm:space-y-0 items-center justify-end pb-4"
    >
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
            v-model="searchQuery"
            type="text"
            id="table-search"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div></div>
    <div class="w-full overflow-x-auto shadow-md rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-6 py-3">Order ID</th>
            <th scope="col" class="p-6 py-3">Finance</th>
            <th scope="col" class="p-6 py-3">Supplier</th>
            <th scope="col" class="p-6 py-3">expected date</th>
            <th scope="col" class="p-6 py-3">created_at</th>
            <th scope="col" class="p-6 py-3">updated_at</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredPurchaseOrders"
            :key="order.purchaseOrderId"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="p-2 border">{{ order.purchaseOrderId }}</td>
            <td class="p-2 border">{{ order.employee }}</td>
            <td class="p-2 border">{{ order.supplier }}</td>
            <td class="p-2 border">{{ formatDate(order.expectedDate) }}</td>
            <td class="p-2 border">{{ formatDateTime(order.createdAt) }}</td>
            <td class="p-2 border">{{ formatDateTime(order.updatedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </ElevatedCard>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import type { PurchaseOrder, PurchaseOrderItem } from "../models/constants";
import { usePurchaseOrderStore } from "../store/purchase-order-store";
import ElevatedCard from "../components/ElevatedCard.vue";
import { formatDateTime, formatDate } from "../utils/dateFormatter";
import { genericFilter } from "../utils/genericFilter";

const purchaseOrderStore = usePurchaseOrderStore();
const searchQuery = ref("");

const orders = ref<PurchaseOrder[]>([]);

const filteredPurchaseOrders = computed(() => {
    return genericFilter(purchaseOrderStore.purchaseOrders, searchQuery.value, [
        "purchaseOrderId",
        "employee",
        "supplier",
        "expectedDate",
        "createdAt",
        "updatedAt"
    ])
})

const expandedOrders = ref<Set<string>>(new Set());

function toggle(orderId: string) {
  if (expandedOrders.value.has(orderId)) {
    expandedOrders.value.delete(orderId);
  } else {
    expandedOrders.value.add(orderId);
  }
}

onMounted(async () => {
  await purchaseOrderStore.fetchPurchaseOrders();

  orders.value = purchaseOrderStore.purchaseOrders;
});
</script>

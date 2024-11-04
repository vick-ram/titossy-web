<template>
<div class="w-full mt-4">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
            <button @click="$router.push({name: 'supplier_create'})" type="button" class="bg-blue-700 hover:bg-blue-800 text-white ocus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input v-model="searchText" type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for supplier">
        </div>
    </div>
    <div class="w-full overflow-x-auto rounded-lg shadow-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">#</th>
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="px-6 py-3">fullName</th>
                <th scope="col" class="px-6 py-3">company</th>
                <th scope="col" class="px-6 py-3">phone</th>
                <th scope="col" class="px-6 py-3">address</th>
                <th scope="col" class="px-6 py-3">email</th>
                <th scope="col" class="px-6 py-3">status</th>
                <th scope="col" class="px-6 py-3">create_at</th>
                <th scope="col" class="px-6 py-3">updated_at</th>
                <th scope="col" class="px-6 py-3">action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="supplier in filteredSuppliers" :key="supplier.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hoveur:bg-gray-600">
                <td class="px-6 py-4">{{ supplierStore.suppliers.indexOf(supplier) + 1 }}</td>
                <td class="px-6 py-4">{{ supplier.id }}</td>
                <td class="px-6 py-4">{{ supplier.fullName }}</td>
                <td class="px-6 py-4">{{ supplier.company }}</td>
                <td class="px-6 py-4">{{ supplier.phone }}</td>
                <td class="px-6 py-4">{{ supplier.address }}</td>
                <td class="px-6 py-4">{{ supplier.email }}</td>
                <td class="px-6 py-4">{{ supplier.status }}</td>
                <td class="px-6 py-4">{{ formatDateTime(supplier.createdAt) }}</td>
                <td class="px-6 py-4">{{ formatDateTime(supplier.updatedAt) }}</td>
                <td class="px-6 py-4 flex flex-row items-center justify-center gap-2">
                    <span class="material-symbols-outlined cursor-pointer text-blue-600">visibility</span>
                    <span class="material-symbols-outlined cursor-pointer text-red-500">delete</span>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ supplierStore.suppliers.length }}</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script setup lang="ts">
import { Ref, ref, computed, onMounted } from 'vue';
import {genericFilter} from '../utils/genericFilter';
import {useSupplierStore} from '../store/supplierStore'
import { formatDateTime } from '../utils/dateFormatter';

const supplierStore = useSupplierStore()
const searchText = ref('')

const filteredSuppliers = computed(() => {
  return genericFilter(supplierStore.suppliers, searchText.value, ['fullName', 'company', 'phone', 'email'])
})

onMounted(async () => {
    await supplierStore.getAll()
})
</script>
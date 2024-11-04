<template>
    <ElevatedCard>
        <div class="w-full mt-2">
        <form class="flex flex-col sm:grid sm:grid-cols-2 w-full mx-auto">
            <div class="mb-5 sm:mx-3">
                <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input v-model="customerStore.customerData.firstName" type="firstName" id="firstName" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="John" required />
            </div>
            <div class="mb-5 sm:mx-3">
                <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input type="lastName" id="lastName" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Doe" required />
            </div>
            <div class="mb-5 sm:mx-3">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input v-model="customerStore.customerData.lastName" type="text" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0712345678" required />
            </div>
            <div class="mb-5 sm:mx-3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="customerStore.customerData.email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="example@gmail.com" required />
            </div>
            <div class="mb-5 sm:mx-3">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="customerStore.customerData.password" type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder=".*********" required />
            </div>
            <div class="sm:mx-3 col-span-2">
                <button @click="createCustomer" type="button" class="w-1/2 bg-blue-700 text-white hover:bg-blue-800 py-4 rounded-lg">Create New Customer</button>
            </div>
        </form>
    </div>
    </ElevatedCard>
</template>

<script setup lang="ts">
import ElevatedCard from '../components/ElevatedCard.vue';
import { useCustomerStore } from '../store/customerStore'
import {useRouter} from 'vue-router'

const customerStore = useCustomerStore()
const router = useRouter()

const createCustomer = async () => {
    await customerStore.create()
    router.push({name: 'customer'})
}

</script>

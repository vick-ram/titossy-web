<template>
    <ElevatedCard class="mt-5">
        <div class="w-full flex flex-row justify-end">
            <!-- Search input -->
            <input
                v-model="search"
                type="text"
                class="w-1/3 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search bookings..."
            />
        </div>
        <!-- Table -->
         <div class="w-full overflow-x-auto shadow-md rounded-lg">
        <table class="w-full mt-4 bg-white dark:bg-gray-800 rounded-lg">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="text-left rtl:text-right">
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">#</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">ID</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">customer</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">Time</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">frequency</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">instructions</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">address</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">amount(kes)</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">paid</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">status</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">created-at</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">updated-at</th>
                    <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="booking in filteredBookings" :key="booking.bookingId" class="border-b">
                    <td class="px-4 py-2">{{ bookingStore.bookings.indexOf(booking) + 1 }}</td>
                    <td class="px-4 py-2">{{ booking.bookingId }}</td>
                    <td class="px-4 py-2">{{ booking.customer }}</td>
                    <td class="px-4 py-2">{{ booking.bookingDateTime }}</td>
                    <td class="px-4 py-2">{{ booking.frequency }}</td>
                    <td class="px-4 py-2">{{ booking.additionalInstructions }}</td>
                    <td class="px-4 py-2">{{ booking.address }}</td>
                    <td class="px-4 py-2">{{ booking.totalAmount }}</td>
                    <td class="px-4 py-2">{{ booking.paid }}</td>
                    <td class="px-4 py-2">{{ booking.bookingStatus }}</td>
                    <td class="px-4 py-2">{{ formatDateTime(booking.createdAt) }}</td>
                    <td class="px-4 py-2">{{ formatDateTime(booking.updatedAt) }}</td>
                    <td class="px-4 py-2">
                        <button class="text-blue-500">Edit</button>
                        <button class="text-red-500">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </ElevatedCard>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {useBookingStore} from '../store/bookingStore'
import { genericFilter } from '../utils/genericFilter';
import { formatDateTime } from '../utils/dateFormatter';
import ElevatedCard from '../components/ElevatedCard.vue';

const bookingStore = useBookingStore()
const search = ref('');

const filteredBookings = computed(() => {
    return genericFilter(bookingStore.bookings, search.value, ['bookingId', 'address', 'paid', 'frequency', 'customer', 'bookingStatus', 'bookingDateTime'])
})

onMounted(async () => {
    await bookingStore.getAllBookings()
})
</script>
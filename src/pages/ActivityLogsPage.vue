<template>
    <ElevatedCard class="mt-5">
        <div class="w-full flex flex-row justify-end px-2 mb-4">
            <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input v-model="query" type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
        </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">#</th>
                    <th scope="col" class="px-6 py-3">ID</th>
                    <th scope="col" class="px-6 py-3">userid</th>
                    <th scope="col" class="px-6 py-3">time</th>
                    <th scope="col" class="px-6 py-3">event-type</th>
                    <th scope="col" class="px-6 py-3">activity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in paginatedLogs" :key="activity.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hoveur:bg-gray-600">
                    <td class="px-6 py-4">
                        {{ activityLogStore.activityLogs.indexOf(activity) + 1 }}
                    </td>
                    <td class="px-6 py-4">{{ activity.id }}</td>
                    <td class="px-6 py-4">{{ activity.userId }}</td>
                    <td class="px-6 py-4">{{ formatDateTime(activity.timestamp) }}</td>
                    <td class="px-6 py-4">{{ activity.eventType }}</td>
                    <td class="px-6 py-4">{{ activity.eventData }}</td>
                </tr>
            </tbody>
        </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span class="font-semibold text-gray-900 dark:text-white">{{ startIndex }}-{{ endIndex }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ totalActivities }}</span>
        </span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <!-- Previous Button -->
            <li>
                <a
                    href="#"
                    @click.prevent="goToPage(currentPage - 1)"
                    :class="{
                        'text-gray-500 bg-white': currentPage > 1,
                        'text-gray-300 bg-gray-100': currentPage <= 1
                    }"
                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    :disabled="currentPage <= 1"
                >Previous</a>
            </li>

            <!-- Dynamic Page Numbers -->
            <li v-for="page in pages" :key="page">
                <a
                    href="#"
                    @click.prevent="goToPage(page)"
                    :class="{
                        'text-gray-900 bg-white': page === currentPage,
                        'text-gray-500 bg-white': page !== currentPage
                    }"
                    class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {{ page }}
                </a>
            </li>

            <!-- Next Button -->
            <li>
                <a
                    href="#"
                    @click.prevent="goToPage(currentPage + 1)"
                    :class="{
                        'text-gray-500 bg-white': currentPage < totalPages,
                        'text-gray-300 bg-gray-100': currentPage >= totalPages
                    }"
                    class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    :disabled="currentPage >= totalPages"
                >Next</a>
            </li>
        </ul>
    </nav>
    </ElevatedCard>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useActivityLogStore } from '../store/activityLogStore';
import { formatDateTime } from '../utils/dateFormatter';
import { genericFilter } from '../utils/genericFilter';
import { paginate } from '../utils/pagination';
import ElevatedCard from '../components/ElevatedCard.vue';

const activityLogStore = useActivityLogStore();
const isLoading = ref(false)
const query = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)


const filteredActivityLogs = computed(() => {
    return genericFilter(activityLogStore.activityLogs, query.value, ['id', 'userId', 'timestamp', 'eventType', 'eventData'])
})

const paginatedLogs = computed(() => {
    return paginate(filteredActivityLogs.value, currentPage.value, itemsPerPage.value)
})

const totalActivities = computed(() => activityLogStore.activityLogs.length)
const totalPages = computed(() => Math.ceil(activityLogStore.activityLogs.length / itemsPerPage.value))

const pages = computed(() => {
    const numberOfPages = totalPages.value
    const visiblePages = [];

    for (let i = 1; i <= numberOfPages; i++) {
        visiblePages.push(i)
    }

    return visiblePages;
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalActivities.value));

onMounted(async () => {
    isLoading.value = true
    await activityLogStore.getAll()
    isLoading.value = false
})

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}
</script>
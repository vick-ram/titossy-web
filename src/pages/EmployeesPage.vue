<template>
<ElevatedCard class="mt-5">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
            <button @click="$router.push({name: 'employee_create'})" type="button" class="bg-blue-700 hover:bg-blue-800 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
        </div>
        <div class="flex flex-row items-center gap-2">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input v-model="searchQuery" type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
        </div>
        <button @click="exportToCSV" type="button" class="bg-green-500 hover:bg-green-600 text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Export</button>
        </div>
    </div>
    <div class="w-full overflow-x-auto shadow-md rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">#</th>
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="px-6 py-3">username</th>
                <th scope="col" class="px-6 py-3">fullName</th>
                <th scope="col" class="px-6 py-3">gender</th>
                <th scope="col" class="px-6 py-3">email</th>
                <th scope="col" class="px-6 py-3">phone</th>
                <th scope="col" class="px-6 py-3">role</th>
                <th scope="col" class="px-6 py-3">status</th>
                <th scope="col" class="px-6 py-3">create_at</th>
                <th scope="col" class="px-6 py-3">updated_at</th>
                <th scope="col" class="px-6 py-3">action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">{{ employeeStore.employees.indexOf(employee) + 1 }}</td>
                <td class="px-6 py-4">{{ employee.id }}</td>
                <td class="px-6 py-4">{{ employee.username }}</td>
                <td class="px-6 py-4">{{ employee.fullName }}</td>
                <td class="px-6 py-4">{{ employee.gender }}</td>
                <td class="px-6 py-4">{{ employee.email }}</td>
                <td class="px-6 py-4">{{ employee.phone }}</td>
                <td class="px-6 py-4">{{ employee.role }}</td>
                <td class="px-6 py-4">
                    <span class="text-green-400 font-medium">{{ employee.approvalStatus }}</span>
                </td>
                <td class="px-6 py-4">
                    {{ formatDateTime(employee.createdAt) }}
                </td>
                <td class="px-6 py-4">
                    {{ formatDateTime(employee.updatedAt) }}
                </td>
                <td class="px-6 py-4 flex flex-row items-center justify-center gap-2">
                    <span @click="$router.push({name: 'employee_details', params: {id: employee.id}})" class="material-symbols-outlined cursor-pointer text-blue-600">visibility</span>
                    <span @click="deleteEmployee(employee.id)" class="material-symbols-outlined cursor-pointer text-red-500">delete</span>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ employeeStore.employees.length }}</span></span>
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
</ElevatedCard>

</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {useEmployeeStore} from '../store/employeeStore'
import { genericFilter } from '../utils/genericFilter';
import { formatDateTime } from '../utils/dateFormatter';
import { Employee } from '../models/constants';
import { useToastStore } from '../store/toastStore'
import ElevatedCard from '../components/ElevatedCard.vue';

const employeeStore = useEmployeeStore()
const searchQuery = ref('');
const toastStore = useToastStore()

const filteredEmployees = computed(() => {
    return genericFilter(employeeStore.employees, searchQuery.value, ['id', 'fullName', 'role', 'approvalStatus', 'email', 'phone'])
})

const deleteEmployee = async (id: string) => {
    confirm('Are you sure u ant to delete this employee?')
    await employeeStore.delete(id)
    if (employeeStore.successMessage) {
        employeeStore.employees = employeeStore.employees.filter((employee: Employee) => employee.id !== id)
        employeeStore.getAll()
        toastStore.showToast(employeeStore.successMessage, 'success')
    }

    if (employeeStore.errorMessage) {
        toastStore.showToast(employeeStore.errorMessage, 'error')
    }
}

const exportToCSV = () => {
    const employees = employeeStore.employees

    const headers = ['ID', 'Full Name', 'Phone', 'Gender', 'Role', 'Email', 'Status', 'Created At', 'Updated At']

    const rows = employees.map((employee) => {
        return [
            employee.id,
            employee.fullName,
            employee.phone,
            employee.gender,
            employee.role,
            employee.email,
            employee.approvalStatus,
            formatDateTime(employee.createdAt),
            formatDateTime(employee.updatedAt)
        ]
    })

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'employee.csv'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

onMounted(async () => {
  await employeeStore.getAll()
})
</script>

<style scoped>
/* Custom table styling */
table {
  border-spacing: 0;
}
th, td {
  text-align: left;
}
</style>

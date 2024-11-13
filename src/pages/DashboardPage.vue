<template>
    <div class="flex flex-col md:grid md:grid-cols-12 md:gap-4">
        <!-- Other Cards (Spanning 8 columns) -->
        <div class="col-span-8 md:col-span-8 mt-6 md:grid md:grid-cols-3 gap-2">
            <!-- Cards' grid setup here -->
             <ElevatedCard class="relative p-6">
                    <div 
                        class="size-16 bg-slate-700 flex justify-center items-center absolute rounded-lg dark:bg-slate-300"
                        style="top: 15px; left: 15px;"
                    >
                        <span class="material-symbols-outlined text-white dark:text-slate-600">print</span>
                    </div>
                    <div class="content">
                        <p class="text-base text-gray-600 dark:text-gray-300">Bookings</p>
                        <h4 class="text-2xl text-gray-800 dark:text-gray-100 font-medium">281</h4>
                    </div>
                    <hr style="
                        width: 100%;
                        border: 0.5px solid #eee;
                        margin: 10px 0;
                    ">
                    <p style="
                        font-size: 18px;
                        color: #888;
                    ">
                    <span class="metric">+55% </span>than last week</p>
                </ElevatedCard>
                <ElevatedCard class="relative p-6">
                    <div 
                        class="size-16 bg-blue-500 flex justify-center items-center absolute rounded-lg dark:bg-blue-300"
                        style="top: 15px; left: 15px;"
                    >
                        <span class="material-symbols-outlined text-white dark:text-slate-600">group</span>
                    </div>
                    <div class="content">
                        <p class="text-base text-gray-600 dark:text-gray-300">Users</p>
                        <h4 class="text-2xl text-gray-800 dark:text-gray-100 font-medium">{{ totalUsers }}</h4>
                    </div>
                    <hr style="
                        width: 100%;
                        border: 0.5px solid #eee;
                        margin: 10px 0;
                    ">
                    <p style="
                        font-size: 18px;
                        color: #888;
                    ">
                    <span class="metric">+55% </span>than last week</p>
                </ElevatedCard>
                <ElevatedCard class="relative p-6">
                    <div 
                        class="size-16 bg-green-500 flex justify-center items-center absolute rounded-lg dark:bg-green-300"
                        style="top: 15px; left: 15px;"
                    >
                        <span class="material-symbols-outlined text-white dark:text-slate-600">attach_money</span>
                    </div>
                    <div class="content">
                        <p class="text-base text-gray-600 dark:text-gray-300">Revenue</p>
                        <h4 class="text-2xl text-gray-800 dark:text-gray-100 font-medium">10,000</h4>
                    </div>
                    <hr style="
                        width: 100%;
                        border: 0.5px solid #eee;
                        margin: 10px 0;
                    ">
                    <p style="
                        font-size: 18px;
                        color: #888;
                    ">
                    <span class="metric">+55% </span>than last week</p>
                </ElevatedCard>
                <ElevatedCard class="relative p-6">
                    <div 
                        class="size-16 bg-purple-500 flex justify-center items-center absolute rounded-lg dark:bg-purple-300"
                        style="top: 15px; left: 15px;"
                    >
                        <span class="material-symbols-outlined text-white dark:text-slate-600">inventory</span>
                    </div>
                    <div class="content">
                        <p class="text-base text-gray-600 dark:text-gray-300">Products</p>
                        <h4 class="text-2xl text-gray-800 dark:text-gray-100 font-medium">{{ totalProducts }}</h4>
                    </div>
                    <hr style="
                        width: 100%;
                        border: 0.5px solid #eee;
                        margin: 10px 0;
                    ">
                    <p style="
                        font-size: 18px;
                        color: #888;
                    ">
                    <span class="metric">+55% </span>than last week</p>
                </ElevatedCard>
                <ElevatedCard class="relative p-6">
                    <div 
                        class="size-16 bg-yellow-500 flex justify-center items-center absolute rounded-lg dark:bg-yellow-300"
                        style="top: 15px; left: 15px;"
                    >
                        <span class="material-symbols-outlined text-white dark:text-slate-600">calendar_month</span>
                    </div>
                    <div class="content">
                        <p class="text-base text-gray-600 dark:text-gray-300">Services</p>
                        <h4 class="text-2xl text-gray-800 dark:text-gray-100 font-medium">{{ serviceStore.services.length }}</h4>
                    </div>
                    <hr style="
                        width: 100%;
                        border: 0.5px solid #eee;
                        margin: 10px 0;
                    ">
                    <p style="
                        font-size: 18px;
                        color: #888;
                    ">
                    <span class="metric">+55% </span>than last week</p>
                </ElevatedCard>
                <ElevatedCard class="relative p-6">
                    <div 
                        class="size-16 bg-teal-500 flex justify-center items-center absolute rounded-lg dark:bg-teal-300"
                        style="top: 15px; left: 15px;"
                    >
                        <span class="material-symbols-outlined text-white dark:text-slate-600">print</span>
                    </div>
                    <div class="content">
                        <p class="text-base text-gray-600 dark:text-gray-300">Addons</p>
                        <h4 class="text-2xl text-gray-800 dark:text-gray-100 font-medium">{{ serviceStore.addons.length }}</h4>
                    </div>
                    <hr style="
                        width: 100%;
                        border: 0.5px solid #eee;
                        margin: 10px 0;
                    ">
                    <p style="
                        font-size: 18px;
                        color: #888;
                    ">
                    <span class="metric">+55% </span>than last week</p>
                </ElevatedCard>
        </div>

        <!-- Donut Chart Card (Spanning 4 columns) -->
        <div class="col-span-4 mt-6 flex justify-center items-center">
            <ElevatedCard class="py-9">
                <h4 class="text-gray-600 font-semibold dark:text-slate-100">Inventory Analytics</h4>
                <div class="py-6" id="donut-chart"></div>
                <apexchart width="110%" type="donut" :options="chartOptions" :series="series"></apexchart>
            </ElevatedCard>
        </div>
    </div>

    
    <ElevatedCard class="mt-6">
    <h4 class="mb-5 text-gray-900 font-bold text-base">Customer Recent Transactions</h4>
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">id</th>
                    <th scope="col" class="px-6 py-3">bookingid</th>
                    <th scope="col" class="px-6 py-3">amount</th>
                    <th scope="col" class="px-6 py-3">method</th>
                    <th scope="col" class="px-6 py-3">phone</th>
                    <th scope="col" class="px-6 py-3">transaction code</th>
                    <th scope="col" class="px-6 py-3">status</th>
                    <th scope="col" class="px-6 py-3">paid on</th>
                    <th scope="col" class="px-6 py-3">updated at</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in recentCustPayments" :key="transaction.paymentId"class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4">{{ transaction.paymentId }}</td>
                    <td class="px-6 py-4">{{ transaction.bookingId }}</td>
                    <td class="px-6 py-4">{{ transaction.amount }}</td>
                    <td class="px-6 py-4">{{ transaction.paymentMethod }}</td>
                    <td class="px-6 py-4">{{ transaction.phoneNumber }}</td>
                    <td class="px-6 py-4">{{ transaction.transactionCode }}</td>
                    <td class="px-6 py-4">{{ transaction.paymentStatus }}</td>
                    <td class="px-6 py-4">{{ formatDateTime(transaction.createdAt) }}</td>
                    <td class="px-6 py-4">{{ formatDateTime(transaction.updatedAt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </ElevatedCard>
    
    <ElevatedCard class="mt-6">
    <h4 class="mb-5 text-gray-600 font-bold text-base">Supplier Recent Transactions</h4>
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">id</th>
                    <th scope="col" class="px -6 py-3">employee</th>
                    <th scope="col" class="px-6 py-3">orderid</th>
                    <th scope="col" class="px-6 py-3">supplier</th>
                    <th scope="col" class="px-6 py-3">paid on</th>
                    <th scope="col" class="px-6 py-3">amount</th>
                    <th scope="col" class="px-6 py-3">method</th>
                    <th scope="col" class="px-6 py-3">reference</th>
                    <th scope="col" class="px-6 py-3">status</th>
                    <th scope="col" class="px-6 py-3">updated at</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="recentSupPayments.length !== 0" v-for="transaction in recentSupPayments" :key="transaction.paymentId"class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4">{{ transaction.paymentId }}</td>
                    <td class="px-6 py-4">{{ transaction.employee }}</td>
                    <td class="px-6 py-4">{{ transaction.orderId }}</td>
                    <td class="px-6 py-4">{{ transaction.suplier }}</td>
                    <td class="px-6 py-4">{{ formatDateTime(transaction.paymentDate) }}</td>
                    <td class="px-6 py-4">{{ transaction.amount }}</td>
                    <td class="px-6 py-4">{{ transaction.method }}</td>
                    <td class="px-6 py-4">{{ transaction.paymentReference }}</td>
                    <td class="px-6 py-4">{{ transaction.status }}</td>
                    <td class="px-6 py-4">{{ formatDateTime(transaction.updatedAt) }}</td>
                </tr>
                <tr v-else>
                    <td class="col-span-10 text-center py-4">No recent transactions</td>
                </tr>
            </tbody>
        </table>
    </div>
    </ElevatedCard>

</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ElevatedCard from '../components/ElevatedCard.vue';
import { useProductStore } from '../store/productStore'
import {useCustomerStore} from '../store/customerStore'
import {useSupplierStore} from '../store/supplierStore'
import { useEmployeeStore } from '../store/employeeStore'
import { useServiceStore } from '../store/serviceStore'
import { useTransactionStore } from '../store/transactionStore'
import { formatDateTime } from '../utils/dateFormatter';

const serviceStore = useServiceStore()
const productStore = useProductStore()
const customerStore = useCustomerStore()
const supplierStore = useSupplierStore()
const employeeStore = useEmployeeStore()
const transactionStore = useTransactionStore()

const recentCustPayments = computed(() => transactionStore.recentCustomerTransactions)
const recentSupPayments = computed(() => transactionStore.recentSupplierTransactions)

console.log('Recent Customer Payments', recentCustPayments.value)


const totalUsers = computed(() => {
    let customerTotal: number = 0
    let supplierTotal: number = 0
    let employeeTotal: number = 0

    if (customerStore.customers) {
        customerTotal = customerStore.customers.length
    }
    if (employeeStore.employees) {
        employeeTotal = employeeStore.employees.length
    }
    if (supplierStore.suppliers) {
        supplierTotal = supplierStore.suppliers.length
    }

    return (customerTotal + supplierTotal + employeeTotal)
})

onMounted(async () => {
    await customerStore.getAll()
    await supplierStore.getAll()
    await employeeStore.getAll()
    await productStore.getAll()
    await serviceStore.getAllServices()
    await transactionStore.getAllCustomerTransactions()
    await transactionStore.getAllSupplierTransactions()
})


const totalProducts = productStore.products.length
const productsArray = productStore.products.map(product => product.name)

const series = computed(() => productStore.products.map(product => product.stock))

const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const colors = productsArray.map(() => randomColor())

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    width: '100%',
  },
  labels: productsArray,
  colors: colors,
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    labels: {
      colors: '#D3D3D3',
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            color: '#D3D3D3',
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '16px',
            color: '#D3D3D3',
            formatter() {
              return `${totalProducts}`;
            },
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '16px',
            color: '#D3D3D3',
            formatter: () => `${totalProducts}`,
          },
        },
      },
    },
  },
}));

</script>

<style scoped>
.chart-container {
  width: 100%;
  height: auto;
}
.metric {
    font-weight: 900;
    color: rgb(2, 150, 2);
}

.content {
    margin-left: auto;
    text-align: right;
}

</style>

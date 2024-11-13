<template>
    <div class="w-full mt-4">
        <ElevatedCard class="w-full overflow-x-auto">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Transactions</h2>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input v-model="query" type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
                </div>
            </div>

            <table class="w-full mt-4 bg-white dark:bg-gray-800 rounded-lg">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="text-left rtl:text-right">
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">#</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">ID</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">bookingid</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">amount(kes)</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">method</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">phone</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">code</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">status</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">createdat</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">updatedat</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in filteredTransactions" :key="transaction.paymentId" class="border-b">
                        <td class="px-4 py-2">{{ transactionStore.customerPayments.indexOf(transaction) + 1 }}</td>
                        <td class="px-4 py-2">{{ transaction.paymentId }}</td>
                        <td class="px-4 py-2">{{ transaction.bookingId }}</td>
                        <td class="px-4 py-2">{{ transaction.amount }}</td>
                        <td class="px-4 py-2">{{ transaction.paymentMethod }}</td>  
                        <td class="px-4 py-2">{{ transaction.phoneNumber }}</td>
                        <td class="px-4 py-2">{{ transaction.transactionCode }}</td>
                        <td class="px-4 py-2">{{ transaction.paymentStatus }}</td>
                        <td class="px-4 py-2">{{ formatDateTime(transaction.createdAt) }}</td>
                        <td class="px-4 py-2">{{ formatDateTime(transaction.updatedAt) }}</td>
                        <td class="px-4 py-2">
                            <span class="material-symbols-outlined cursor-pointer" @click="generateReceipt(transaction)">print</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ElevatedCard>
    </div>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import ElevatedCard from '../components/ElevatedCard.vue';
import {useTransactionStore } from '../store/transactionStore'
import { computed, onMounted, ref } from 'vue';
import LogoImage from '../assets/images/titossy-logo.png'
import { formatDateTime } from '../utils/dateFormatter';
import { CustomerTransaction } from '../models/constants';
import { genericFilter } from '../utils/genericFilter';

const transactionStore = useTransactionStore()
const query = ref('')

const filteredTransactions = computed(() => {
    return genericFilter(transactionStore.customerPayments, query.value, ['paymentId', 'bookingId', 'amount', 'paymentMethod', 'phoneNumber', 'transactionCode', 'paymentStatus', 'createdAt', 'updatedAt'])
})

const generateReceipt = (transaction: CustomerTransaction) => {
    const pdf = new jsPDF()

    const imgWidth = 50
    const imgHeight = 50
    const imgX = (pdf.internal.pageSize.width / 2) - (imgWidth / 2)
    const imgY = 10

    pdf.addImage(LogoImage, 'PNG', imgX, imgY, imgWidth, imgHeight)

    const detailY = imgY + imgHeight + 15;

    pdf.setFontSize(12)
    const details = [
        { label: 'Payment ID', value: transaction.paymentId },
        { label: 'Booking ID', value: transaction.bookingId },
        { label: 'Amount', value: transaction.amount },
        { label: 'Payment Method', value: transaction.paymentMethod },
        { label: 'Phone Number', value: transaction.phoneNumber },
        { label: 'Transaction Code', value: transaction.transactionCode },
        { label: 'Payment Status', value: transaction.paymentStatus },
        { label: 'Date', value: formatDateTime(transaction.createdAt) }
    ]

    details.forEach((detail, index) => {
        const yPosition = detailY + (index * 8)
        pdf.text(detail.label + ':', 20, yPosition)
        pdf.text(detail.value, pdf.internal.pageSize.width - 20, yPosition, { align: 'right' })
    })

    const tableStartY = detailY + (details.length * 8) + 10;

    const tableBody = transactionStore.customerPayments.flatMap((transaction) => {
        return transaction.bookingItems.map((item) => {
            return [
                item.service ? item.service : item.serviceAddOn || '',
                item.quantity || 0,
                item.subtotal || 0
            ]
        })
    })
    autoTable(pdf,{
        head: [['Service', 'Quantity', 'Subtotal']],
        body: tableBody,
        startY: tableStartY,
        theme: 'striped',
        styles: { halign: 'center' },
        headStyles: { fillColor: [41, 128, 185] },
        foot: [['', '', 'Total', transactionStore.customerPayments.map(tr => tr.amount)]],
        footStyles: { fillColor: [189, 195, 199] }
    })

    pdf.text('Thank you for your patronage', 105, pdf.internal.pageSize.height - 20, { align: 'center' })

    pdf.save(`${transaction.paymentId}.pdf`)

}


onMounted(async () => {
    await transactionStore.getAllCustomerTransactions()
})
</script>
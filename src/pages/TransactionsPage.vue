<template>
    <div class="w-full mt-4">
        <ElevatedCard class="w-full overflow-x-auto">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Transactions</h2>
                <button
                    @click="generateReceipt"
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white -rotate-45"
                >
                    <span class="material-symbols-outlined">print</span>
                </button>
            </div>

            <table class="w-full mt-4 bg-white dark:bg-gray-800 rounded-lg">
                <thead>
                    <tr class="text-left rtl:text-right">
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">#</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">ID</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">bookingid</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">amount</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">method</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">phone</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">code</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">status</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">created-at</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">updated-at</th>
                        <th class="px-4 py-2 bg-gray-100 dark:bg-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactionStore.customerPayments" :key="transaction.paymentId">
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
                            <button class="text-blue-500">Edit</button>
                            <button class="text-red-500">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ElevatedCard>
    </div>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
import autoTable, {} from 'jspdf-autotable'
import ElevatedCard from '../components/ElevatedCard.vue';
import {useTransactionStore } from '../store/transactionStore'
import { onMounted } from 'vue';
import LogoImage from '../assets/images/titossy-logo.png'
import { formatDateTime } from '../utils/dateFormatter';

const transactionStore = useTransactionStore()

const generateReceipt = () => {
    const pdf = new jsPDF()

    const imgWidth = 50
    const imgHeight = 20
    const imgX = (pdf.internal.pageSize.width / 2) - (imgWidth / 2)
    const imgY = 10

    pdf.addImage(LogoImage, 'PNG', imgX, imgY, imgWidth, imgHeight)

    pdf.setFontSize(16)
    pdf.text('Titossy Cleaning Services', 105, 40, { align: 'center' })

    // const tableBody = transactionStore.customerPayments.map((transaction) => {
    //     transaction.bookingItems.map((item) => {
    //         return [
    //             item.service ? item.service : item.serviceAddOn,
    //             item.quantity,
    //             item.subtotal
    //         ]
    //     })
    // })
    autoTable(pdf,{
        head: [['Service', 'Quantity', 'Subtotal']],
        //body: tableBody,
        startY: imgY + imgHeight + 40,
        theme: 'striped',
        styles: { halign: 'center' },
        headStyles: { fillColor: [41, 128, 185] },
        foot: [['', '', 'Total', transactionStore.customerPayments.map(tr => tr.amount)]],
        footStyles: { fillColor: [189, 195, 199] }
    })

    pdf.text('Thank you for your patronage', 105, pdf.internal.pageSize.height - 20, { align: 'center' })

    pdf.save('receipt.pdf')

}


onMounted(async () => {
    await transactionStore.getAllCustomerTransactions()
})
</script>
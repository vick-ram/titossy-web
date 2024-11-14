<template>
    <!-- Main container for two-column layout -->
    <div class="flex h-full items-start gap-2">
        
        <!-- Left section for listing users -->
            <ElevatedCard class="w-1/3 p-4 mt-5">
                <!-- Displaying card for each supplier; clicking navigates to chat view -->
                <div 
                    @click="selectSupplier(supplier)"
                    v-for="supplier in supplierStore.suppliers"
                    :key="supplier.id" 
                    class="flex items-center justify-between mb-4 cursor-pointer">
                    <div class="flex items-center gap-3">
                        <img
                            class="w-12 h-12 rounded-full"
                            src="../assets/images/avatar.jpg"
                            alt="Supplier avatar"
                        />
                        <div class="flex flex-col">
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">
                                {{ supplier.fullName }}
                            </p>
                            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                {{ supplier.email }}
                            </p>
                        </div>
                    </div>
                </div>
            </ElevatedCard>
        
        <!-- Right section for the chat view -->
         <ElevatedCard class="w-2/3 mt-5 p-4">
            <div v-if="selectedSupplier">
                <p class="text-lg font-bold mb-2">Chat with {{ selectedSupplier?.fullName }}</p>
                <ChatComponent v-if="selectedSupplier" :supplier="selectedSupplier" />
            </div>
            <div v-else>
                <p class="text-gray-500">Select a supplier to view the chat</p>
            </div>
         </ElevatedCard>

    </div>
</template>

<script setup lang="ts">
import { ref ,onMounted, Ref } from 'vue';
import ElevatedCard from '../components/ElevatedCard.vue';
import { useSupplierStore } from '../store/supplierStore';
import ChatComponent from '../components/ChatComponent.vue';
import { Supplier } from '../models/constants';

const supplierStore = useSupplierStore();
const selectedSupplier: Ref<Supplier | null> = ref(null);

const selectSupplier = (supplier: Supplier) => {
    selectedSupplier.value = supplier;
}

onMounted(async () => {
    await supplierStore.getAll();
});
</script>


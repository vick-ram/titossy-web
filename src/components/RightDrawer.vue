<template>
    <transition name="slide">
        <div v-if="props.drawerOpen" class="fixed inset-0 flex justify-end z-50">
            <div @click="$emit('toggle')" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

            <!-- Drawer content -->
            <div class="relative z-50 w-1/3 h-full bg-white shadow-lg overflow-auto p-4">
                <button @click="$emit('toggle')" class="text-gray-500 hover:text-gray-700">
                    <span class="material-symbols-outlined">close</span>
                </button>
                <slot/>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">

const props = defineProps < {
    drawerOpen: boolean
}>()
const emit = defineEmits(['toggle'])

</script>
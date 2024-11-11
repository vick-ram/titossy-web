<template>
    <Teleport to="body">
        <div v-if="visible"
        :class="[
            'fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-md transition-opacity duration-300 ease-in-out',
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]"
        :style="{opacity: visible ? 1 : 0}"
        >
        <p>{{ message }}</p>
    </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from 'vue';
import { useToastStore } from '../store/toastStore';

const toastStore = useToastStore()

const message = computed(() => toastStore.toast.message)
const type = computed(() => toastStore.toast.type)
const visible = ref(false)

let timeout: number | undefined

const show = () => {
    visible.value = true
    clearTimeout(timeout)
    timeout = setTimeout(() => (visible.value = false), 3000)
}

watch([message, type], () => {
    if (message.value) show()
})

onBeforeUnmount(() => {
    clearTimeout(timeout)
})
</script>
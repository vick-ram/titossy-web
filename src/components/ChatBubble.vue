<template>
  <div
    :class="[
      'max-w-xs p-3 m-2 rounded-lg',
      isSender ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
    ]"
  >
    <p>{{ message }}</p>
    <span class="text-xs opacity-70">{{ formatDateTime(timestamp) }}</span>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from '../utils/dateFormatter';

defineProps<{
  message: string;
  timestamp: string;
  isSender?: boolean;
}>();
</script>


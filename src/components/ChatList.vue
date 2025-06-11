<template>
  <div class="w-1/3 border-r h-full overflow-y-auto p-4 bg-gray-100">
    <h2 class="text-xl font-semibold mb-4">Chats</h2>
    <ul>
      <li
        v-for="chat in chats"
        :key="chat.id"
        :class="{ 'bg-blue-100': chat.id === selectedChat?.id }"
        class="p-3 rounded-lg mb-2 cursor-pointer hover:bg-blue-50"
        @click="$emit('selectChat', chat)"
      >
        <div class="font-medium">{{ chat.name }}</div>
        <div class="text-xs text-gray-500">{{ chat.role }}</div>
      </li>
      
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from "../models/constants";


defineProps({
  chats: {
    type: Array as () => Chat[],
    required: true,
  },
  selectedChat: {
    type: Object as () => Chat | null,
    default: null,
  },
});
</script>

<style scoped>
/* Styles for the chat list */
</style>

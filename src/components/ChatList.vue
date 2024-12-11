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
        {{ chat.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  props: {
    chats: Array,
    selectedChat: Object,
  },
};
</script>

<style scoped>
/* Styles for the chat list */
</style>

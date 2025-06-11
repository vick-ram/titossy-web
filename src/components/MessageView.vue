<template>
  <div class="flex-1 flex flex-col h-full p-4">
    <!-- Chat Title -->
    <div class="border-b pb-2 mb-4 text-lg font-semibold">{{ chatTitle }}</div>
    <div class="flex flex-col p-4 space-y-2 overflow-y-auto h-96 bg-gray-100">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message.message"
        :timestamp="message.timestamp"
        :isSender="message.sender === currentUserId"
      />
    </div>

    <!-- Message Input Area -->
    <div class="flex items-center border-t pt-2">
      <input
        v-model="newMessage"
        @keyup.enter="send"
        type="text"
        placeholder="Type a message"
        class="flex-1 p-2 border rounded-lg mr-2"
      />
      <button @click="send" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChatBubble from "./ChatBubble.vue";
import type { Message } from "../models/constants";

defineProps<{
  messages: Message[];
  chatTitle: string;
  currentUserId?: string;
}>();

const emit = defineEmits(["sendMessage"]);

const newMessage = ref("");
const send = () => {
  if (newMessage.value.trim()) {
    emit("sendMessage", newMessage.value.trim());
    newMessage.value = "";
  }
};
</script>

<style scoped>
/* Styles for the message view */
</style>

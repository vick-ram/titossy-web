<template>
  <div class="flex-1 flex flex-col h-full p-4">
    <!-- Chat Title -->
    <div class="border-b pb-2 mb-4 text-lg font-semibold">{{ chatTitle }}</div>

    <!-- Messages Display Area -->
    <!-- <div class="flex-1 overflow-y-auto mb-4 space-y-3">
        <div
            v-for="(message, index) in messages"
            :key="index"
             class="text-sm text-gray-900 dark:text-white">
                {{ message.text }}
        </div>
    </div> -->
    <div class="flex flex-col p-4 space-y-2 overflow-y-auto h-96 bg-gray-100">
        <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message.text"
        :timestamp="message.timestamp"
        :isSender="message.isSender"
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

<script>
import ChatBubble from './ChatBubble.vue';
export default {
    components: {
        ChatBubble,
    },
  name: 'MessageView',
  props: {
    messages: Array,
    chatTitle: String,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    send() {
      if (this.newMessage.trim()) {
        this.$emit('sendMessage', this.newMessage.trim());
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
/* Styles for the message view */
</style>

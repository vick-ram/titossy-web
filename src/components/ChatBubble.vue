<template>
  <div
    :class="[
      'max-w-xs p-3 m-2 rounded-lg',
      isSender ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
    ]"
  >
    <p>{{ message }}</p>
    <span class="text-xs opacity-70">{{ timestamp }}</span>
  </div>
</template>

<script>
export default {
  name: "ChatBubble",
  props: {
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    },
    isSender: {
      type: Boolean,
      default: false
    }
  }
};
</script>


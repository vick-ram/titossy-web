<template>
  <div
    v-if="isOpen"
    class="fixed z-50 flex items-center justify-center p-4"
    @click.self="closeDialog"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
      <div class="text-gray-700">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

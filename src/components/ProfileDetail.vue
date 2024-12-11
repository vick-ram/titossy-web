<template>
  <div class="flex flex-col">
    <span class="text-gray-500">{{ props.label }}</span>
    <span class="text-gray-800 font-semibold">{{ props.value }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-5xl font-bold text-gray-800 mb-4">
      Oops! Page Not Found
    </h1>
    <p class="text-lg text-gray-600">
      The page you're looking for couldn't be found.
    </p>
    <button @click="goBack" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go Back
    </button>
  </div>
</template>

<script setup lang="ts">
const goBack = () => window.history.back()
</script>

<style scoped>
body {
  background-color: #f0f0f0;
  font-family: sans-serif;
}
</style>
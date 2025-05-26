<template>
  <div :class="[isDesktop() || isTablet() ? 'flex' : 'block', 'h-screen']">
    <!-- Sidebar - Mobile: off-canvas, Desktop: always visible -->
    <aside
      :class="[
        'fixed inset-y-0 z-20 transform bg-white text-white shadow-lg transition-transform duration-300 dark:bg-gray-900',
        {
          'left-0 translate-x-0 w-64':
            isSidebarOpen && (isDesktop() || isTablet()),
          'left-0 -translate-x-full w-64':
            !isSidebarOpen && (isDesktop() || isTablet()),
          'left-0 translate-x-0 w-40': isSidebarOpen && isMobile(),
          'left-0 -translate-x-full w-40': !isSidebarOpen && isMobile(),
        },
      ]"
    >
      <Sidebar @close="handleSidebarClose" />
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div
      v-if="isMobile() && isSidebarOpen"
      class="fixed inset-0 z-10 bg-black bg-opacity-50"
      @click="toggleSidebar"
    />

    <!-- Main Content Area -->
    <div
      :class="[
        'relative flex-1 overflow-y-auto scrollbar-thin bg-white transition-all duration-300 dark:bg-black',
        {
          'ml-0':
            (isMobile() && !isSidebarOpen) ||
            ((isDesktop() || isTablet()) && !isSidebarOpen),
          'ml-40': isMobile() && isSidebarOpen,
          'ml-64': (isDesktop() || isTablet()) && isSidebarOpen,
        },
      ]"
    >
      <!-- Header -->
      <header
        class="fixed top-0 z-10 bg-white p-4 shadow-md dark:bg-gray-900"
        :class="{
          'left-0 right-0': isMobile() || !isSidebarOpen,
          'left-64 right-0': (isDesktop() || isTablet()) && isSidebarOpen,
        }"
      >
        <UserProfileCard
          :is-mobile="isMobile"
          @menu-clicked="toggleSidebar"
          @theme-changed="handleDarkModeToggle"
        />
      </header>

      <!-- Main Content -->
      <main
        class="h-screen mt-5 bg-gray-200 p-6 pt-20 dark:bg-gray-700"
        :class="{
          'ml-0': true,
        }"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import UserProfileCard from "../components/UserProfileCard.vue";
import { useBreakpoints } from "../utils/breakpoints";

const { isMobile, isTablet, isDesktop } = useBreakpoints();

const darkmode = ref(false);
const isSidebarOpen = ref(true);

const handleDarkModeToggle = (isDarkMode: boolean) => {
  darkmode.value = isDarkMode;
  toggleHtmlDarkClass();
};

const toggleHtmlDarkClass = () => {
  if (darkmode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Autoclose sidebar on mobile when route changes
const handleSidebarClose = () => {
  if (isMobile()) {
    isSidebarOpen.value = false;
  }
};

watchEffect(() => {
  toggleHtmlDarkClass();
});

watchEffect(() => {
  if (isMobile()) {
    document.body.style.overflow = isSidebarOpen.value ? "hidden" : "auto";
  } else {
    document.body.style.overflow = "auto";
  }
});

onMounted(() => {
  if (isMobile()) {
    isSidebarOpen.value = false;
  }
});
</script>

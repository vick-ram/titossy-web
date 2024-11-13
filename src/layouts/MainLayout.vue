<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <aside
            :class="[ 
                'w-0 sm:w-64 bg-white text-white flex-shrink-0 shadow-lg dark:bg-gray-900 z-20 transition-transform duration-300', 
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full' 
            ]"
            class="fixed inset-y-0 transform"
        >
            <Sidebar />
        </aside>

        <!-- Main Content Area -->
        <div
            :class="[ 
                'flex-1 relative bg-white dark:bg-black overflow-auto transition-all duration-300', 
                isSidebarOpen ? 'ml-64' : 'ml-0' 
            ]"
        >
            <!-- Header with UserProfileCard taking full width -->
            <header 
                class="fixed top-0 right-0 left-0 p-4 z-10 bg-white dark:bg-gray-900 shadow-md"
                :class="isSidebarOpen ? 'left-64' : 'left-0'"
            >
                <UserProfileCard @menu-clicked="toggleSidebar" @theme-changed="handleDarkModeToggle" />
            </header>

            <!-- Main Content with margin to avoid overlap with header -->
            <main class="mt-5 pt-20 p-6 bg-gray-200 dark:bg-gray-700">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import UserProfileCard from '../components/UserProfileCard.vue';

const darkmode = ref(false);

const handleDarkModeToggle = (isDarkMode: boolean) => {
  darkmode.value = isDarkMode;
  toggleHtmlDarkClass();
};

const toggleHtmlDarkClass = () => {
  if (darkmode.value) {
      document.documentElement.classList.add('dark');
  } else {
      document.documentElement.classList.remove('dark');
  }
};
const isSidebarOpen = ref(true);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

watchEffect(() => {
  toggleHtmlDarkClass();
});
</script>



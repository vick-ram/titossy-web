<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-center mb-4 px-4">
      <RouterLink to="/">
        <img
          src="../assets/images/titossy-logo.png"
          alt="titossy logo"
          class="w-36 h-auto"
        />
      </RouterLink>
    </div>
    <nav
      class="flex-1 flex flex-col overflow-y-auto scrollbar-thin space-y-3 short-scrollbar"
    >
      <RouterLink
        to="/"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center space-x-2"
        :class="{
          'bg-blue-500 text-white': $route.path === '/',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/',
        }"
      >
        <span class="material-symbols-outlined">dashboard</span>
        <span class="font-semibold">Dashboard</span>
      </RouterLink>

      <div>
        <button
          @click="toggleUsersDropdown"
          class="w-full text-left py-2.5 px-4 rounded transition duration-200 flex justify-between items-center"
          :class="{
            'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300': true,
          }"
        >
          <span class="flex items-center">
            <span class="material-symbols-outlined mr-2">group</span>
            <span class="font-semibold">Users</span>
          </span>
          <span class="material-symbols-outlined">
            {{
              isUsersDropdownOpen
                ? "keyboard_arrow_down"
                : "keyboard_arrow_right"
            }}
          </span>
        </button>

        <div
          v-if="isUsersDropdownOpen"
          class="pl-6 space-y-2 py-2 transition-all duration-200 ease-in-out"
        >
          <RouterLink
            to="/customers"
            class="py-2.5 px-4 rounded transition duration-200 flex items-center"
            :class="{
              'bg-blue-500 text-white': $route.path === '/customers',
              'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
                $route.path !== '/customers',
            }"
          >
            <span class="material-symbols-outlined mr-2">people</span>
            <span class="font-semibold">Customers</span>
          </RouterLink>

          <RouterLink
            to="/employees"
            class="py-2.5 px-4 rounded transition duration-200 flex items-center"
            :class="{
              'bg-blue-500 text-white': $route.path === '/employees',
              'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
                $route.path !== '/employees',
            }"
          >
            <span class="material-symbols-outlined mr-2">badge</span>
            <span class="font-semibold">Employees</span>
          </RouterLink>

          <RouterLink
            to="/suppliers"
            class="py-2.5 px-4 rounded transition duration-200 flex items-center"
            :class="{
              'bg-blue-500 text-white': $route.path === '/suppliers',
              'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
                $route.path !== '/suppliers',
            }"
          >
            <span class="material-symbols-outlined mr-2">local_shipping</span>
            <span class="font-semibold">Suppliers</span>
          </RouterLink>
        </div>
      </div>

      <RouterLink
        to="/service"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center"
        :class="{
          'bg-blue-500 text-white': $route.path === '/service',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/service',
        }"
      >
        <span class="material-symbols-outlined mr-2">cleaning_bucket</span>
        <span class="font-semibold">Services</span>
      </RouterLink>

      <RouterLink
        to="/inventory"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center"
        :class="{
          'bg-blue-500 text-white': $route.path === '/inventory',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/inventory',
        }"
      >
        <span class="material-symbols-outlined mr-2">inventory_2</span>
        <span class="font-semibold">Inventory</span>
      </RouterLink>

      <RouterLink
        to="/bookings"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center"
        :class="{
          'bg-blue-500 text-white': $route.path === '/bookings',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/bookings',
        }"
      >
        <span class="material-symbols-outlined mr-2">calendar_month</span>
        <span class="font-semibold">Bookings</span>
      </RouterLink>

      <RouterLink
        to="/transactions"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center"
        :class="{
          'bg-blue-500 text-white': $route.path === '/transactions',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/transactions',
        }"
      >
        <span class="material-symbols-outlined">attach_money</span>
        <span class="font-semibold">Transactions</span>
      </RouterLink>

      <!-- Purchase orders page -->
      <RouterLink
        to="/purchase-orders"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center"
        :class="{
          'bg-blue-500 text-white': $route.path === '/purchase-orders',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/purchase-orders',
        }"
      >
        <span class="material-symbols-outlined mr-2">shopping_cart</span>
        <span class="font-semibold">Purchase Orders</span>
      </RouterLink>

      <RouterLink
        to="/activity-logs"
        class="py-2.5 px-4 rounded transition duration-200 flex items-center"
        :class="{
          'bg-blue-500 text-white': $route.path === '/activity-logs',
          'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-400 text-gray-500 dark:text-gray-300':
            $route.path !== '/activity-logs',
        }"
      >
        <span class="material-symbols-outlined mr-2">event</span>
        <span class="font-semibold">Activity Logs</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isUsersDropdownOpen = ref(false);
const toggleUsersDropdown = () =>
  (isUsersDropdownOpen.value = !isUsersDropdownOpen.value);
</script>

<style scoped>
.short-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.short-scrollbar::-webkit-scrollbar-thumb {
  background: #a0aec0;
  border-radius: 8px;
}
.short-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>

<template>
  <ElevatedCard>
    <div class="w-full flex justify-between items-center relative">
      <div class="flex items-center space-x-4">
        <button
          @click="$emit('menu-clicked')"
          class="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center w-10 h-10"
        >
          <span class="material-symbols-outlined text-gray-900 dark:text-white">menu</span>
        </button>
        <button
          @click="$router.push({name: 'messages'})"
          class="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center w-10 h-10"
        >
          <span class="material-symbols-outlined text-gray-900 dark:text-white">mail</span>
        </button>
      </div>
    
      <div class="flex items-center space-x-4">
         <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" 
            class="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" 
            type="button">
      
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
            </svg>

            <div class="absolute flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900">
                {{ notifications.length }}
            </div>
        </button>
        <div id="dropdownNotification" class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
          <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Notifications
          </div>
          <div class="divide-y divide-gray-100 dark:divide-gray-700">
            <a @click="markNotificationAsRead(notification.id)" v-for="notification in displayedNotifications" href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div class="flex-shrink-0">
                <img class="rounded-full w-11 h-11" src="../assets//images//avatar.jpg" alt="Jese image">
                <div class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                  <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                    <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z"/>
                  </svg>
                </div>
              </div>
              <div class="w-full ps-3">
                  <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{{ notification.message }}</div>
                  <div class="text-xs text-blue-600 dark:text-blue-500">{{ formatTimeAgo(notification.createdAt) }}</div>
              </div>
            </a>
          </div>
          <a @click="toggleNotificationsView" href="#" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
            <div class="inline-flex items-center ">
              <svg class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
              </svg>
                {{ showAllNotifications ? 'Show Less' : 'View All' }}
            </div>
          </a>
        </div>

        <button
          @click="toggleDarkMode"
          class="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center w-10 h-10"
        >
          <span v-if="isDarkMode" class="material-symbols-outlined text-gray-900 dark:text-white">
            dark_mode
          </span>
          <span v-else class="material-symbols-outlined text-gray-900 dark:text-white">
            light_mode
          </span>
        </button>
        <img
          class="w-10 h-10 rounded-full cursor-pointer"
          src="../assets/images/avatar.jpg"
          alt="Profile Picture"
          @click="toggleProfileModal"
        />
      </div>
      
      <div
        v-if="isModalVisible"
        ref="modalRef"
        class="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 w-48"
      >
      <div class="flex items-center space-x-4">
        <button
          class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          @click="goToProfile"
        >
        <span class="material-symbols-outlined mr-2 text-gray-900 bg-gray-200 rounded-full p-2 dark:text-white">person</span>
        <span class="flex flex-col">
          <p class="dark:text-white">{{ employeeStore.employee.fullName }}</p>
          <p class="text-gray-300 text-sm">{{ employeeStore.employee.role }}</p>
        </span>
      </button>
        
      </div>
      <hr>
        <button
          class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          @click="goToProfile"
        >
          <span class="material-symbols-outlined mr-2 dark:text-white">person</span>
          <span class="dark:text-white">My Profile</span>
        </button>
        <hr>
        <button
          class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          @click="logout"
        >
          <span class="material-symbols-outlined mr-2 dark:text-white">logout</span>
          <span class="dark:text-white">Logout</span>
          
        </button>
      </div>
    </div>
  </ElevatedCard>
</template>

<script setup lang="ts">

import { computed, onMounted, onUnmounted, Ref, ref } from 'vue';
import ElevatedCard from './ElevatedCard.vue';
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '../store/employeeStore'
import {jwtDecode} from 'jwt-decode'
import { useActivityLogStore } from '../store/activityLogStore'
import { useToastStore } from '../store/toastStore'
import {Notification} from '../models/constants'
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { initFlowbite } from 'flowbite'
import { onClickOutside } from '@vueuse/core'

const isDarkMode = ref(false);
const isModalVisible = ref(false);
const emit = defineEmits(['theme-changed', 'menu-clicked'])
const router = useRouter()
const employeeStore = useEmployeeStore()
const activityLogStore = useActivityLogStore()
const toastStore = useToastStore()

const notifications: Ref<Notification[]> = ref([])
const showAllNotifications = ref(false)
const modalRef = ref()

const decodedToken = jwtDecode(String(localStorage.getItem('token')))
const userId = decodedToken.sub

const closeModal = () => {
  isModalVisible.value = false
}

onClickOutside(modalRef, closeModal)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  emit('theme-changed', isDarkMode.value)
}

const toggleProfileModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const goToProfile = () => {
  router.push({ name: 'profile', params: { id: employeeStore.employee.id } });
  isModalVisible.value = false;
}

const logout = () => {
  try {
    employeeStore.signout()
    router.push({name: 'sign-in'})
    console.log("User logged out");
    isModalVisible.value = false;
  } catch (error) {
    console.log(String(error))
  }
}

let eventSource: EventSource
const environment = import.meta.env.VITE_ENVIRONMENT

const url = environment === 'production'
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_API_URL_LOCAL

const fetchUnreadNotifications = () => {
  eventSource = new EventSource(`${url}/activities/notifications`)
  eventSource.onmessage = (event) => {
    let notificationsResponse = JSON.parse(event.data)
    handleIncomingNotifications(notificationsResponse)
  }
}

const handleIncomingNotifications = (newNotifications: Notification[]) => {
  newNotifications.forEach((notif) => {
    const existingIndex = notifications.value.findIndex(
      (n) => n.id === notif.id
    )
    if (existingIndex !== -1) {
      notifications.value[existingIndex] = notif
    } else {
      notifications.value.push(notif)
    }
  })
}

const displayedNotifications = computed(() => {
  return showAllNotifications.value ? notifications.value : notifications.value.slice(0, 4)
})

const toggleNotificationsView = () => {
  showAllNotifications.value = !showAllNotifications.value
}

const markNotificationAsRead = async (id: string) => {
  await activityLogStore.markNotificationAsRead(id)
  if (activityLogStore.successMessage) {
    setTimeout(() => {
      toastStore.showToast(activityLogStore.successMessage, 'success')
    }, 5000)
    notifications.value = notifications.value.filter(notification => notification.id !== id)
    fetchUnreadNotifications()
  }
  if (activityLogStore.errorMessage) {
    setTimeout(() => {
      toastStore.showToast(activityLogStore.errorMessage, 'error')
    }, 5000)
  }
}

onMounted(async () => {
  await employeeStore.getOne(String(userId))
    fetchUnreadNotifications()
    initFlowbite();
})
onUnmounted(() => {
  eventSource.close();
  })
</script>

<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <!-- Profile Header -->
    <div class="flex items-center bg-white shadow-lg p-6 rounded-lg">
      <img
        src="../assets/images/avatar.jpg"
        alt="Profile Picture"
        class="w-24 h-24 rounded-full mr-6 border"
      />
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ admin.fullName }}</h2>
        <p class="text-gray-600">{{ admin.role }}</p>
        <p class="text-gray-500">Joined: {{ formatDateTime(admin.createdAt) }}</p>
      </div>
    </div>

    <!-- Profile Details Section -->
    <div class="bg-white shadow-lg mt-6 p-6 rounded-lg">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileDetail label="Email" :value="admin.email" />
        <ProfileDetail label="Phone" :value="admin.phone || 'N/A'" />
        <ProfileDetail label="Location" value="'N/A'" />
      </div>
    </div>

    <!-- Account Information Section -->
    <div class="bg-white shadow-lg mt-6 p-6 rounded-lg">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Account Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileDetail label="Role" :value="admin.role" />
        <ProfileDetail label="Status" value="Active" />
        <ProfileDetail label="Last Login" :value="'Not Available'" />
      </div>
    </div>

    <!-- Actions Section -->
    <div class="bg-white shadow-lg mt-6 p-6 rounded-lg flex justify-between">
      <button @click="editProfile" class="btn-primary">Edit Profile</button>
      <button @click="changePassword" class="btn-secondary">Change Password</button>
      <button @click="manageSettings" class="btn-danger">Manage Settings</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProfileDetail from '../components/ProfileDetail.vue';
import {useEmployeeStore} from '../store/employeeStore'
import {useRoute} from 'vue-router'
import { formatDateTime } from '../utils/dateFormatter';

const employeeStore = useEmployeeStore()
const router = useRoute()
const userId = router.params.id
const admin = employeeStore.employee

const editProfile = () => {
  console.log('Edit Profile')
}

const changePassword = () => {
  console.log('Change Password')
}

const manageSettings = () => {
  console.log('Manage Settings')
}

onMounted(async () => {
    await employeeStore.getOne(String(userId))
})

</script>

<style scoped>
.container {
  margin-top: 2rem;
}
.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700;
}
.btn-secondary {
  @apply bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700;
}
.btn-danger {
  @apply bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700;
}
</style>

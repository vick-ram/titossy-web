<template>
    <ElevatedCard class="mt-5">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
            <button  @click="toggleDrawer" type="button" class="bg-blue-700 hover:bg-blue-800 text-white ocus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input v-model="query" type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
        </div>
    </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">#</th>
                    <th scope="col" class="px-6 py-3">ID</th>
                    <th scope="col" class="px-6 py-3">service-ID</th>
                    <th scope="col" class="px-6 py-3">name</th>
                    <th scope="col" class="px-6 py-3">description</th>
                    <th scope="col" class="px-6 py-3">price</th>
                    <th scope="col" class="px-6 py-3">image</th>
                    <th scope="col" class="px-6 py-3">created_at</th>
                    <th scope="col" class="px-6 py-3">updated_at</th>
                    <th scope="col" class="px-6 py-3">action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="serviceStore.addons" v-for="addon in filteredAddons" :key="addon.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">{{ serviceStore.addons.indexOf(addon) + 1 }}</td>
                    <td class="px-6 py-4">{{ addon.id }}</td>
                    <td class="px-6 py-4">{{ addon.serviceId }}</td>
                    <td class="px-6 py-4">{{ addon.name }}</td>
                    <td class="px-6 py-4">{{ addon.description }}</td>
                    <td class="px-6 py-4">{{ addon.price }}</td>
                    <td v-if="addon.imageUrl" class="px-6 py-4">
                        <img :src="addon.imageUrl" alt="service image" class="w-10 h-10 object-cover">
                    </td>
                    <td class="px-6 py-4">{{ formatDateTime(addon.createdAt) }}</td>
                    <td class="px-6 py-4">{{ formatDateTime(addon.updatedAt) }}</td>
                    <td class="px-6 py-4 flex flex-row items-center justify-center gap-2">
                        <span class="material-symbols-outlined cursor-pointer text-blue-600">visibility</span>
                        <span class="material-symbols-outlined cursor-pointer text-red-500">delete</span>
                    </td>
                </tr>
                <tr v-else>{{ serviceStore.errorMessage }}</tr>
        </tbody>
        </table>
        </div>
    </ElevatedCard>
        <RightDrawer :drawerOpen="isDrawerOpen" @toggle="toggleDrawer">
            <div class="flex justify-center">
                <h5 class="mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Enter Service Addon Data</h5>
            </div>
            <form @submit.prevent="createAddon" class="mb-6">
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service name</label>
                            <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Home Cleaning" required />
                        </div>
                        <div class="mb-6">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="text" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000.00" required />
                        </div>
                        
                        <div class="flex items-center justify-center w-full">
                            <label v-if="!addonData.imageUrl" for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" @change="onFileSelect" />
                            </label>

                            <div
                                v-else
                                @click="removeImage"
                                class="relative w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-cover bg-center"
                                :style="{ backgroundImage: `url(${addonData.imageUrl})` }"
                                >
                                <span class="absolute top-2 right-2 text-gray-500 bg-gray-100 rounded-full p-1 cursor-pointer">X</span>
                            </div>
                        </div> 

                        <div class="mb-6">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Service Description.."></textarea>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Create Service Addon</button>
                    </form>
        </RightDrawer>

</template>``

<script setup lang="ts">
import { formatDateTime } from '../utils/dateFormatter'
import { computed, onMounted, ref } from 'vue'
import { genericFilter } from '../utils/genericFilter'
import { useServiceStore } from '../store/serviceStore'
import { useRoute } from 'vue-router'
import RightDrawer from '../components/RightDrawer.vue'
import { post } from '../boot'
import { Addon, ApiResponse } from '../models/constants'
import { useToastStore } from '../store/toastStore'
import ElevatedCard from '../components/ElevatedCard.vue'


const serviceStore = useServiceStore()
const route = useRoute()
const toastStore = useToastStore()
const query = ref('')
const isDrawerOpen = ref(false)

const serviceId = String(route.params.id)
const filteredAddons = computed(() => {
    return genericFilter(serviceStore.addons, query.value, ['id', 'serviceId', 'name', 'description'])
})

const addonData = ref<{
    name: string,
    description: string,
    price: string,
    imageUrl: string,
    imageFile: File| null
}>({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    imageFile: null
})

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
}

const onFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    if (file) {
        const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload an image of type SVG, PNG, JPG, or GIF')
            return
        }
        addonData.value.imageUrl = URL.createObjectURL(file)
        addonData.value.imageFile = file

    }
}
const removeImage = () => {
  URL.revokeObjectURL(addonData.value.imageUrl)
  addonData.value.imageUrl = ''
}

const createAddon = async () => {
    const formData = new FormData()

    formData.append('name', addonData.value.name)
    formData.append('description', addonData.value.description)
    formData.append('price', addonData.value.price)

    if (addonData.value.imageFile) {
        formData.append('imageUrl', addonData.value.imageFile)
    }

    try {
        const response = await post<ApiResponse<Addon>>(`/service/${serviceId}/addon`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.data.status === 'success') {
            toastStore.showToast(String(response.data.message), 'success')
        }
        if (response.data.status === 'error') {
            throw new Error(String(response.data.error))
        }
    } catch (e) {
        toastStore.showToast(String(e), 'error')
    } finally {
        isDrawerOpen.value = !isDrawerOpen.value
    }
}

onMounted(async () => {
    await serviceStore.getAllAddons(serviceId)
})

</script>

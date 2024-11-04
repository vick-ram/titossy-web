<template>
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Change Password</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</div>
</template>

<script setup lang="ts">
// import { jwtDecode } from 'jwt-decode'
// import { JwtPayload } from '../models/constants'
// import { patch } from '../boot'
// import {ref} from 'vue'
// import { AxiosError, AxiosResponse } from 'axios';

// const token = String(localStorage.getItem('token'))
// const decodedToken = jwtDecode<JwtPayload>(token)
// const email = decodedToken.email
// const successMessage = ref('')
// const errorMessage = ref('')

// const changePasswordData = {
//     email: email,
//     oldPassword: '',
//     newPassword: '',
// }

// patch('/employee/forgot-password', changePasswordData)
//     .then((res: AxiosResponse) => {
//         if (res.data.success === true) {
//             successMessage.value = res.data.message
//         }
//         if (res.data.success === false) {
//             throw new Error(res.data.message)
//         }
//     })
//     .catch((e: AxiosError) => {
//         errorMessage.value = e.message
//     })
</script>
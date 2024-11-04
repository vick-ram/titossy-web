<template>
    <div>
        <h1>User details page</h1>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import {useEmployeeStore} from '../store/employeeStore'

const route = useRoute()
const employeeStore = useEmployeeStore()

console.log(employeeStore.employee)
onMounted(async () => {
    await employeeStore.getOne(route.params.id as string)
})
</script>
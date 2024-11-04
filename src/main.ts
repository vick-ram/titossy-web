import { createApp } from 'vue'
import router from './router';
import './style.css'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts';
import { createPinia } from 'pinia'
import 'flowbite'


const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(VueApexCharts)
    .mount('#app')

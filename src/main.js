// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosInstance from './services/axios'
import Vue3Toastify from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.config.globalProperties.$axios = axiosInstance

app.use(router)

app.use(Vue3Toastify, {
  autoClose: 3000,
})

app.mount('#app')

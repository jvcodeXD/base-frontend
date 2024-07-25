import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if (usuario) {
        next('/')
      } else {
        next()
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  if (to.matched.some((record) => record.meta.RequiereLogin)) {
    if (!usuario) {
      next('/login')
    } else {
      const rol = usuario.rol
      if (
        to.matched.some(
          (record) => record.meta.tipos && !record.meta.tipos.includes(rol)
        )
      ) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router

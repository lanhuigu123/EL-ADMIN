import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../layout/indexView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/system/dept',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue')
      },
      {
        path: 'system/user',
        name: 'User',
        component: () => import('../views/system/user/index.vue')
      },
      {
        path: 'system/role',
        name: 'Role',
        component: () => import('../views/system/role/index.vue')
      },
      {
        path: 'system/menu',
        name: 'Menu',
        component: () => import('../views/system/menu/index.vue')
      },
      {
        path: 'system/dept',
        name: 'Dept',
        component: () => import('../views/system/dept/index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/commen/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

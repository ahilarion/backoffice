import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'  // Assurez-vous que le chemin est correct
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('@/views/UsersView.vue')
        },
        {
          path: '/users/:id',
          name: 'User',
          component: () => import('@/views/UserView.vue')
        },
        {
          path: 'roles',
          name: 'Roles',
          component: () => import('@/views/RolesView.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/Settings/SettingsView.vue'),
          children: [
            {
              path: '',
              name: 'AccountSettings',
              component: () => import('@/views/Settings/AccountSettingsView.vue')
            }
          ]
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/NotFoundView.vue')
        }
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/LoginView.vue')
        }
      ]
    }
  ]
})

let authChecked = false
async function checkInitialAuth() {
  if (!authChecked) {
    const authStore = useAuthStore()
    await authStore.checkAuth()
    authChecked = true
  }
}

router.beforeEach(async (to, from, next) => {
  await checkInitialAuth()

  const authStore = useAuthStore()

  if (to.name === 'Login' && authStore.isAuthenticated) {
      next({ name: 'Dashboard' })
  } else

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
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
          component: () => import('@/views/Users/UsersView.vue')
        },
        {
          path: '/users/:id',
          name: 'User',
          component: () => import('@/views/Users/UserView.vue')
        },
        {
          path: 'roles',
          name: 'Roles',
          component: () => import('@/views/Roles/RolesView.vue')
        },
        {
          path: 'roles/:id',
          name: 'Role',
          component: () => import('@/views/Roles/RoleView.vue')
        },
        {
          path: 'articles',
          name: 'Articles',
          component: () => import('@/views/Articles/ArticlesView.vue')
        },
        {
          path: 'articles/create',
          name: 'CreateArticle',
          component: () => import('@/views/Articles/ArticleCreateView.vue')
        },
        {
          path: 'articles/:id',
          name: 'EditArticle',
          component: () => import('@/views/Articles/ArticleEditView.vue')
        },
        {
          path: 'slides',
          name: 'Slides',
          component: () => import('@/views/SlidesView.vue')
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
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/stores/auth";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";

const props = defineProps<{
  isNavigationOpen: boolean
}>();

const emit = defineEmits<{
  (e: 'toggleNavigation'): void
}>();

const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const toggleNavigation = () => {
  emit('toggleNavigation');
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

const logout = () => {
  authStore.logout().then(() => {
    router.push('/login')
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="top-0 z-30 h-16 sticky w-full flex items-center justify-between lg:justify-end px-4 lg:px-8 bg-transparent">
    <div class="h-full w-full top-0 left-0 absolute bg-base-100 lg:bg-base-200 bg-opacity-60 lg:bg-opacity-80 backdrop-blur-sm -z-10"></div>
    <span class="h-[1px] w-full lg:w-[calc(100%-4rem)] absolute bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2"></span>

    <button class="lg:hidden z-30" @click="toggleNavigation">
      <Bars3Icon class="h-8 w-8 text-gray-400" />
    </button>

    <div ref="dropdownRef" class="relative">
      <div class="flex items-center gap-4">
        <span class="w-[1px] h-8 bg-gray-200"></span>
        <button @click="toggleDropdown" class="flex items-center gap-2">
          <img src="@/assets/profile.png" alt="profile" class="h-10 w-10 rounded-full" />
          <span class="text-sm font-medium text-gray-600">{{ user?.first_name }} {{ user?.last_name }}</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" class="h-3 w-3 text-gray-400 lg:mt-1" />
        </button>
      </div>

      <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 -translate-y-2"
      >
        <div v-if="isDropdownOpen"
             class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1" role="menu">
            <div class="px-4 py-2 text-sm flex flex-col gap-1">
              <p class="font-medium">{{ user?.first_name }} {{ user?.last_name }}</p>
              <p class="italic text-xs text-gray-500">{{ $t('common.roles.admin') }}</p>
            </div>

            <div class="border-t border-gray-200"></div>

            <router-link to="/settings" class="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100" role="menuitem">
              {{ $t('header.settings') }}
            </router-link>

            <p @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
              {{ $t('header.logout') }}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>

</style>
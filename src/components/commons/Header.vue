<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  isNavigationOpen: boolean
}>();

const emit = defineEmits<{
  (e: 'toggleNavigation'): void
}>();

const toggleNavigation = () => {
  emit('toggleNavigation');
};
</script>

<template>
  <div class="top-0 z-10 h-16 sticky w-full flex items-center justify-between lg:justify-end px-4 lg:px-8 bg-transparent">
    <div class="h-full w-full top-0 left-0 absolute bg-base-100 lg:bg-base-200 bg-opacity-80 backdrop-blur-sm -z-10"></div>
    <span class="h-[1px] w-full lg:w-[calc(100%-4rem)] absolute bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2"></span>
    <button
        class="lg:hidden z-30"
        @click="toggleNavigation"
    >
      <Bars3Icon class="h-8 w-8 text-gray-400" />
    </button>

    <div>
      <img src="@/assets/profile.png" alt="profile" class="h-10 w-10 rounded-full" />
    </div>
  </div>
</template>

<style scoped>

</style>
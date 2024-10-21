<script setup lang="ts">
import { ref } from 'vue';
import Navigation from "@/components/navigation/Navigation.vue";
import Header from "@/components/commons/Header.vue";

const isNavigationOpen = ref(false);

const toggleNavigation = () => {
  isNavigationOpen.value = !isNavigationOpen.value;
};
</script>

<template>
  <div class="relative default-layout flex h-screen bg-base-200 overflow-hidden">
    <Navigation v-model:isOpen="isNavigationOpen" />
    <main class="relative flex-1 overflow-y-auto overflow-x-hidden">
      <Header :isNavigationOpen="isNavigationOpen" @toggleNavigation="toggleNavigation" />
      <div class="px-4 py-8 lg:px-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
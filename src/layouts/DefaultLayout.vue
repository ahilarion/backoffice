<script setup lang="ts">
import Navigation from "@/components/navigation/Navigation.vue";
import Header from "@/components/commons/Header.vue";
</script>

<template>
  <div class="relative default-layout flex h-screen bg-base-200 overflow-hidden">
    <Navigation />
    <main class="relative flex-1 px-8 overflow-y-auto">
      <Header />
      <div class="py-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
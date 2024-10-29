<script setup lang="ts">

import NavigationItem from "@/components/navigation/NavigationItem.vue";
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-3xl font-semibold">{{ $t('pages.settings.title') }}</h1>
    </div>
    <div class="relative flex flex-col lg:flex-row bg-base-100 rounded-lg shadow-sm">
      <div class="w-full lg:w-60 lg:min-h-full border-b lg:border-b-0 lg:border-r flex flex-col gap-4 p-4">
        <NavigationItem to="/settings" label="My Account" :icon="['far' ,'user']" />
      </div>
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
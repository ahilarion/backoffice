<script setup lang="ts">

import NavigationItem from "@/components/navigation/NavigationItem.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-8">
    <button @click="router.go(-1)" class="flex items-center gap-2 text-base text-gray-500 hover:text-gray-700">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      <span>{{ $t('common.actions.back') }}</span>
    </button>
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-3xl font-semibold">{{ $t('pages.settings.title') }}</h1>
    </div>
    <div class="relative flex flex-col lg:flex-row bg-base-100 rounded-lg shadow-sm">
      <div class="w-full lg:w-60 lg:min-h-full border-b lg:border-b-0 lg:border-r flex flex-col gap-4 p-4">
        <NavigationItem to="/settings" :label="$t('pages.settings.myAccount.title')" :icon="['fas' ,'user']" />
      </div>
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
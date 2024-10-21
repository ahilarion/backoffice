<script setup lang="ts">
import RouterButton from "@/components/commons/RouterButton.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <img src="@/assets/404.png" alt="404" class="h-96 w-96" />
    <h1>{{ $t('pages.404.text') }}</h1>
    <RouterButton :label="$t('components.BackToDashboardButton.label')" to="/" />
  </div>
</template>

<style scoped>

</style>
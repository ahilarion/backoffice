<script setup lang="ts">
import RouterButton from "@/components/commons/RouterButton.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 text-center">
    <img src="@/assets/404.png" alt="404" class="h-96 w-96" />
    <h1>{{ $t('errors.404') }}</h1>
    <RouterButton :label="$t('actions.back')" to="/" />
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div>
    <h1 class="uppercase text-xs text-gray-400 font-semibold p-2 mb-2">{{ props.title }}</h1>
    <div class="flex flex-col gap-2">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
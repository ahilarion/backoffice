<script setup lang="ts">
const props = defineProps<{
  isLast?: boolean
}>()
</script>

<template>
  <tr class="border-b border-gray-100" :class="{ 'border-none': props.isLast }">
    <slot></slot>
  </tr>
</template>

<style scoped>

</style>
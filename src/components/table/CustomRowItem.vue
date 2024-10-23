<script setup lang="ts">

</script>

<template>
  <td class="px-4 py-3 text-sm text-gray-600 whitespace-nowrap min-w-fit fade-in">
      <slot></slot>
  </td>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
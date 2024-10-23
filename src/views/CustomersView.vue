<script setup lang="ts">
import { ref } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";

const search = ref<string>('');
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-semibold">Customers</h1>
      <SearchInput v-model="search" />
    </div>
  </div>
</template>

<style scoped>

</style>
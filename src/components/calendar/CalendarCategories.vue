<script setup lang="ts">
import { CATEGORIES } from "@/utils/calendar";
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 pb-4 md:pb-6">
    <div class="flex gap-1.5 md:gap-2 items-center overflow-x-auto max-w-full pb-2 md:pb-0 hide-scrollbar">
      <div
          v-for="category in CATEGORIES"
          :key="category.name"
          class="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-white shadow-sm border flex items-center gap-1.5 md:gap-2 text-xs md:text-sm whitespace-nowrap"
      >
        <div
            class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
            :style="{ backgroundColor: category.color }"
        />
        {{ category.name }}
      </div>

      <button class="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-white shadow-sm border text-xs md:text-sm text-blue-600 whitespace-nowrap">
        +Add New
      </button>
    </div>
  </div>
</template>
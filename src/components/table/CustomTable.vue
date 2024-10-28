<script setup lang="ts">
import Loading from "@/components/icons/Loading.vue";

const props = defineProps<{
  title: string,
  count?: number,
  loading?: boolean
}>()
</script>

<template>
  <div class="flex flex-col rounded-lg bg-base-100 shadow-sm">
    <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
      <h2 class="text-md font-medium">{{ props.title }}</h2>
      <p class="text-md font-semibold text-gray-400">{{ props.count }}</p>
    </div>
    <div class="overflow-x-auto w-full flex no-scrollbar">
      <table class="flex-1">
        <thead class="bg-gray-50 border-b border-gray-100">
          <slot name="header"></slot>
        </thead>
        <tbody>
          <tr v-if="props.loading" class="h-96">
            <td class="text-center align-middle w-full" :colspan="5">
              <Loading class="w-6 h-6 text-gray-500 mx-auto" />
            </td>
          </tr>
          <tr v-else-if="!props.loading && count === 0" class="h-96">
            <td class="text-center align-middle w-full" :colspan="5">
              <p class="text-gray-500">No data available</p>
            </td>
          </tr>
          <slot name="body" v-else></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
<script setup lang="ts">
import Loading from "@/components/icons/Loading.vue";

const props = defineProps<{
  loading: boolean,
  label: string
}>()
</script>

<template>
  <div>
    <button type="submit"
            class="flex items-center justify-center cursor-pointer text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 hover:ring-2 hover:ring-offset-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-default bg-black text-white hover:bg-gray-800 focus:ring-gray-800 disabled:hover:bg-black"
            :disabled="props.loading">
      <Loading v-if="props.loading"/>
      <span v-else class="whitespace-nowrap">{{ props.label }}</span>
    </button>
  </div>
</template>

<style scoped>

</style>
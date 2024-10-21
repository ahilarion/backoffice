<script setup lang="ts">
import Loading from "@/components/icons/Loading.vue";

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div>
    <button type="submit"
            class="flex items-center justify-center w-20 bg-black hover:bg-gray-800 text-white cursor-pointer text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-black disabled:cursor-default"
            :disabled="props.loading">
      <Loading v-if="props.loading"/>
      <span v-else>{{ $t('components.loginButton.label') }}</span>
    </button>
  </div>
</template>

<style scoped>

</style>
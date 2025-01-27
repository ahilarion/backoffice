<script setup lang="ts">
import Loading from "@/components/icons/Loading.vue";

const props = defineProps<{
  loading?: boolean,
  label: string,
  white?: boolean,
  red?: boolean
}>()

const emit = defineEmits<{
  action: []
}>()

const onClick = () => {
  emit('action')
}
</script>

<template>
  <button type="button"
          @click="onClick"
          :class="[
            'flex items-center justify-center cursor-pointer text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 hover:ring-2 hover:ring-offset-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
            white
              ? 'bg-white text-black border border-gray-300 hover:bg-gray-50 focus:ring-gray-300 disabled:hover:bg-white'
              : 'bg-black text-white hover:bg-gray-800 focus:ring-gray-800 disabled:hover:bg-black',
            red
              ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-600 disabled:hover:bg-red-500'
              : ''
          ]"
          :disabled="props.loading">
    <Loading v-if="props.loading"/>
    <span v-else>{{ props.label }}</span>
  </button>
</template>

<style scoped>

</style>
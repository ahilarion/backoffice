<script setup lang="ts">
import Loading from "@/components/icons/Loading.vue";

const props = defineProps<{
  loading?: boolean,
  label: string,
  white?: boolean
}>()

const emit = defineEmits<{
  action: []
}>()

const onClick = () => {
  emit('action')
}
</script>

<template>
  <button type="submit"
          @click="onClick"
          :class="[
            'flex items-center justify-center cursor-pointer text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-default',
            white
              ? 'bg-white text-black border border-gray-300 hover:bg-gray-50 focus:ring-gray-300 disabled:hover:bg-white'
              : 'bg-black text-white hover:bg-gray-800 focus:ring-gray-800 disabled:hover:bg-black'
          ]"
          :disabled="props.loading">
    <Loading v-if="props.loading"/>
    <span v-else>{{ props.label }}</span>
  </button>
</template>

<style scoped>

</style>
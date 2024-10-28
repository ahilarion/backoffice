<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number,
  perPage: number,
  currentPage: number,
}>()

const emit = defineEmits<{
  prev: [],
  next: []
}>()

const startIndex = computed(() => ((props.currentPage - 1) * props.perPage) + 1)
const endIndex = computed(() => Math.min(startIndex.value + props.perPage - 1, props.total))

const handlePrev = () => {
  emit('prev')
}

const handleNext = () => {
  emit('next')
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <span class="text-sm text-gray-500">
        {{ $t('common.pagination.showing.start') }}
        <span class="font-medium text-gray-800">{{ startIndex }}</span>
        {{ $t('common.pagination.showing.to') }}
        <span class="font-medium text-gray-800">{{ endIndex }}</span>
        {{ $t('common.pagination.showing.of') }}
        <span class="font-medium text-gray-800">{{ props.total }}</span>
        {{ $t('common.pagination.showing.entries') }}
      </span>
    </div>
    <div class="space-x-2">
      <button
          @click="handlePrev"
          :disabled="props.currentPage === 1"
          class="px-4 py-2 text-sm font-medium bg-base-100 text-gray-800 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent disabled:opacity-50 disabled:cursor-default hover:bg-gray-50"
      >
        {{ $t('common.pagination.previous') }}
      </button>
      <button
          @click="handleNext"
          :disabled="endIndex >= props.total"
          class="px-4 py-2 text-sm font-medium text-gray-800 bg-base-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent disabled:opacity-50 disabled:cursor-default hover:bg-gray-50"
      >
        {{ $t('common.pagination.next') }}
      </button>
    </div>
  </div>
</template>
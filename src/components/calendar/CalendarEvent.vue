<script setup lang="ts">
import { getEventColor, formatTime, type Event } from "@/utils/calendar";

interface Props {
  event: Event;
  isCompact?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div v-if="isCompact" class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: getEventColor(event.category) }" />
  <div
      v-else
      class="px-1.5 py-1 rounded text-xs hover:bg-opacity-30 transition-colors cursor-pointer group"
      :style="{
      backgroundColor: getEventColor(event.category) + '33',
      borderLeft: `2px solid ${getEventColor(event.category)}`
    }"
  >
    <div class="font-medium truncate">{{ event.title }}</div>
    <div class="text-[10px] text-gray-600 truncate">
      {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
    </div>
  </div>
</template>
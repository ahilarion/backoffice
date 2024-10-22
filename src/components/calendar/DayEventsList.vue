<script setup lang="ts">
import { getFormattedEvents, type Event } from '@/utils/calendar';
import CalendarEvent from './CalendarEvent.vue';

interface Props {
  events?: Event[];
  isCompact?: boolean;
}

const props = defineProps<Props>();

const { visibleEvents, overflow } = getFormattedEvents(props.events);
</script>

<template>
  <div class="flex flex-col gap-1 overflow-hidden">
    <!-- Mobile View -->
    <div v-if="isCompact" class="flex gap-0.5 flex-wrap items-center">
      <CalendarEvent
          v-for="event in visibleEvents"
          :key="event.id"
          :event="event"
          is-compact
      />
      <span
          v-if="overflow > 0"
          class="text-[10px] text-gray-500 ml-1"
      >
        +{{ overflow }}
      </span>
    </div>

    <!-- Desktop View -->
    <div v-else class="flex flex-col gap-1">
      <CalendarEvent
          v-for="event in visibleEvents"
          :key="event.id"
          :event="event"
      />

      <div
          v-if="overflow > 0"
          class="text-xs text-gray-500 px-1.5 py-0.5"
      >
        <span class="font-medium">
          + {{ overflow }} other{{ overflow > 1 ? 's' : '' }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import {
  formatTime,
  formatDate,
  getEventColor,
  sortEventsByStartTime,
  type Event
} from "@/utils/calendar";

interface DayDetails {
  date: Date;
  events: Event[];
}

// State
const isOpen = ref(false);
const selectedDay = ref<DayDetails | null>(null);

// Computed
const formattedDate = computed(() => {
  if (!selectedDay.value?.date) return '';
  return formatDate(selectedDay.value.date);
});

const sortedEvents = computed(() => {
  if (!selectedDay.value?.events) return [];
  return sortEventsByStartTime(selectedDay.value.events);
});

// Methods
const showDayDetails = (dayDetails: DayDetails) => {
  selectedDay.value = dayDetails;
  isOpen.value = true;
};

const closeDayDetails = () => {
  isOpen.value = false;
  // Reset selected day after animation completes
  setTimeout(() => {
    selectedDay.value = null;
  }, 300);
};

defineExpose({
  showDayDetails
});
</script>

<template>
  <!-- Overlay -->
  <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-25 z-40"
      @click="closeDayDetails"
  />

  <!-- Aside Panel -->
  <aside
      class="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <!-- Header -->
    <header class="p-4 border-b flex justify-between items-center">
      <h2 class="text-lg font-semibold">{{ formattedDate }}</h2>
      <button
          @click="closeDayDetails"
          class="p-2 hover:bg-gray-100 rounded-full"
      >
        <font-awesome-icon
            :icon="['fas', 'times']"
            class="h-5 w-5 text-gray-500"
        />
      </button>
    </header>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <template v-if="sortedEvents.length">
        <div v-for="event in sortedEvents" :key="event.id" class="mb-4">
          <div
              class="p-4 rounded-lg border"
              :style="{
              borderLeftWidth: '4px',
              borderLeftColor: getEventColor(event.category)
            }"
          >
            <div class="font-semibold mb-1">{{ event.title }}</div>
            <div class="text-sm text-gray-600 mb-2">
              {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
            </div>
            <div class="text-sm text-gray-700">{{ event.description }}</div>
            <div
                class="mt-2 text-xs inline-block px-2 py-1 rounded-full"
                :style="{
                backgroundColor: getEventColor(event.category) + '15',
                color: getEventColor(event.category)
              }"
            >
              {{ event.category }}
            </div>
          </div>
        </div>
      </template>

      <div v-else class="text-center text-gray-500 mt-8">
        No events scheduled for this day
      </div>
    </div>

    <!-- Footer -->
    <footer class="p-4 border-t">
      <button
          class="w-full bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800 transition-colors"
      >
        Add New Event
      </button>
    </footer>
  </aside>
</template>
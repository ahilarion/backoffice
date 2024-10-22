<script setup lang="ts">
import { ref, computed } from "vue";
import DayDetails from "@/components/calendar/DayDetails.vue";
import {
  WEEK_DAYS,
  CATEGORIES,
  getDaysInMonth,
  getFirstDayOfMonth,
  getPreviousMonthDays,
  getCurrentMonthDays,
  getNextMonthDays,
  getFormattedEvents,
  getEventColor,
  formatTime,
  type Event,
  type DayItem
} from "@/utils/calendar";

// Refs
const selectedDate = ref(new Date());
const dayDetailsRef = ref<InstanceType<typeof DayDetails> | null>(null);

// Sample events data
const events = ref<Event[]>([
  {
    "id": 1,
    "title": "Weekly Team Sync",
    "start": "2024-10-01T09:00:00",
    "end": "2024-10-01T10:30:00",
    "description": "Regular team status update and planning",
    "category": "Meetings"
  },
  {
    "id": 2,
    "title": "Dentist Appointment",
    "start": "2024-10-02T14:00:00",
    "end": "2024-10-02T15:00:00",
    "description": "Annual checkup",
    "category": "Personal"
  },
  {
    "id": 3,
    "title": "Project Alpha Deadline",
    "start": "2024-10-04T17:00:00",
    "end": "2024-10-04T18:00:00",
    "description": "Final submission for Project Alpha",
    "category": "Deadlines"
  },
  {
    "id": 4,
    "title": "Client Presentation",
    "start": "2024-10-07T11:00:00",
    "end": "2024-10-07T12:30:00",
    "description": "Present Q4 strategy to client",
    "category": "Meetings"
  },
  {
    "id": 5,
    "title": "Gym Session",
    "start": "2024-10-08T07:00:00",
    "end": "2024-10-08T08:30:00",
    "description": "Personal training",
    "category": "Personal"
  }
]);

// Computed
const currentMonth = computed(() => ({
  full: selectedDate.value.toLocaleString('default', { month: 'long' }),
  short: selectedDate.value.toLocaleString('default', { month: 'short' })
}));

const currentYear = computed(() => selectedDate.value.getFullYear());

const days = computed<DayItem[]>(() => {
  const currentMonthIndex = selectedDate.value.getMonth();
  const year = selectedDate.value.getFullYear();

  const firstDay = getFirstDayOfMonth(year, currentMonthIndex);
  const daysInMonth = getDaysInMonth(year, currentMonthIndex);
  const totalDays = firstDay + daysInMonth;
  const totalCells = Math.ceil(totalDays / 7) * 7;

  const previousDays = getPreviousMonthDays(year, currentMonthIndex, firstDay, events.value);
  const currentDays = getCurrentMonthDays(year, currentMonthIndex, daysInMonth, events.value);
  const nextDays = getNextMonthDays(
      totalCells,
      previousDays.length + currentDays.length,
      year,
      currentMonthIndex,
      events.value
  );

  return [...previousDays, ...currentDays, ...nextDays];
});

// Actions
const changeMonth = (increment: number) => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() + increment);
  selectedDate.value = newDate;
};

const nextMonth = () => changeMonth(1);
const prevMonth = () => changeMonth(-1);

const handleDayClick = (item: DayItem) => {
  if (!item.isOutside && dayDetailsRef.value) {
    dayDetailsRef.value.showDayDetails({
      date: item.date!,
      events: item.events || []
    });
  }
};
</script>

<template>
  <div class="flex flex-col">
    <!-- Header Section -->
    <div class="flex flex-col gap-4">
      <header class="flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">
          <span class="hidden md:inline">{{ currentMonth.full }}</span>
          <span class="md:hidden">{{ currentMonth.short }}</span>
          {{ currentYear }}
        </h1>

        <div class="flex items-center gap-2">
          <button
              v-for="(action, key) in { prev: prevMonth, next: nextMonth }"
              :key="key"
              @click="action"
              class="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-lg bg-base-100 hover:bg-gray-100 border"
          >
            <font-awesome-icon
                :icon="['fas', `chevron-${key === 'prev' ? 'left' : 'right'}`]"
                class="h-3 w-3 md:h-4 md:w-4"
            />
          </button>

          <button class="h-8 md:h-9 px-3 md:px-4 bg-gray-900 text-white text-xs md:text-sm rounded-lg hover:bg-gray-800 flex items-center justify-center">
            Create Event
          </button>
        </div>
      </header>

      <!-- Categories Section -->
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
    </div>

    <!-- Calendar Grid -->
    <div class="rounded-lg overflow-hidden shadow-sm bg-white">
      <!-- Week Days Header -->
      <div class="grid grid-cols-7 border-b">
        <div
            v-for="day in WEEK_DAYS"
            :key="day.full"
            class="p-1.5 md:p-4 text-[10px] md:text-sm font-medium text-gray-600 text-center"
        >
          <span class="hidden md:inline">{{ day.full }}</span>
          <span class="md:hidden">{{ day.short }}</span>
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7">
        <div
            v-for="(item, index) in days"
            :key="index"
            class="relative bg-white border-r border-b last:border-r-0"
        >
          <!-- Day Cell Content -->
          <div
              class="min-h-[60px] md:min-h-[200px] p-1 md:p-2 flex flex-col cursor-pointer"
              :class="{
              'bg-opacity-50': item.isOutside,
              'bg-blue-50': item.isToday && !item.isOutside
            }"
              @click="handleDayClick(item)"
          >
            <!-- Day Number -->
            <span
                class="text-xs md:text-base mb-1"
                :class="{
                'text-gray-400': item.isOutside,
                'font-semibold text-blue-600': item.isToday && !item.isOutside
              }"
            >
              {{ item.day }}
            </span>

            <!-- Events -->
            <div v-if="!item.isOutside" class="flex flex-col gap-1 overflow-hidden">
              <!-- Mobile: Dots with overflow -->
              <div class="md:hidden">
                <div class="flex gap-0.5 flex-wrap items-center">
                  <div
                      v-for="event in getFormattedEvents(item.events).visibleEvents"
                      :key="event.id"
                      class="w-1.5 h-1.5 rounded-full"
                      :style="{ backgroundColor: getEventColor(event.category) }"
                  />
                  <span
                      v-if="getFormattedEvents(item.events).overflow > 0"
                      class="text-[10px] text-gray-500 ml-1"
                  >
                    +{{ getFormattedEvents(item.events).overflow }}
                  </span>
                </div>
              </div>

              <!-- Desktop: Event rectangles with overflow -->
              <div class="hidden md:flex md:flex-col gap-1">
                <div
                    v-for="event in getFormattedEvents(item.events).visibleEvents"
                    :key="event.id"
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

                <!-- Overflow indicator -->
                <div
                    v-if="getFormattedEvents(item.events).overflow > 0"
                    class="text-xs text-gray-500 px-1.5 py-0.5"
                >
                  <span class="font-medium">
                    + {{ getFormattedEvents(item.events).overflow }} other{{ getFormattedEvents(item.events).overflow > 1 ? 's' : '' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Outside Day Overlay -->
          <div
              v-if="item.isOutside"
              class="absolute inset-0 bg-gray-50 bg-opacity-50"
              style="background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px);"
          />
        </div>
      </div>
    </div>

    <!-- Day Details Side Panel -->
    <DayDetails ref="dayDetailsRef" />
  </div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
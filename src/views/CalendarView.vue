<script setup lang="ts">
import { ref, computed } from "vue";
import DayDetails from "@/components/calendar/DayDetails.vue";
import CalendarHeader from "@/components/calendar/CalendarHeader.vue";
import CalendarCategories from "@/components/calendar/CalendarCategories.vue";
import DayEventsList from "@/components/calendar/DayEventsList.vue";
import {
  WEEK_DAYS,
  getDaysInMonth,
  getFirstDayOfMonth,
  getPreviousMonthDays,
  getCurrentMonthDays,
  getNextMonthDays,
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

// Methods
const changeMonth = (increment: number) => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() + increment);
  selectedDate.value = newDate;
};

const nextMonth = () => changeMonth(1);
const prevMonth = () => changeMonth(-1);

const handleDayClick = (item: DayItem) => {
  if (!item.isOutside && dayDetailsRef.value && item.date) {
    dayDetailsRef.value.showDayDetails({
      date: item.date,
      events: item.events || []
    });
  }
};
</script>

<template>
  <div class="flex flex-col">
    <!-- Header Section -->
    <div class="flex flex-col gap-4">
      <CalendarHeader
          :selected-date="selectedDate"
          @next-month="nextMonth"
          @prev-month="prevMonth"
      />

      <CalendarCategories />
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
            <DayEventsList
                v-if="!item.isOutside"
                :events="item.events"
                :is-compact="true"
            />
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
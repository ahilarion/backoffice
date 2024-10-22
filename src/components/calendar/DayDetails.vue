<script setup lang="ts">

import { ref, computed } from "vue";

import DayDetailsEvent from "@/components/calendar/DayDetailsEvent.vue";

import {

  formatDate,

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

  <!-- Overlay with Transition -->

  <Transition name="fade">

    <div

        v-show="isOpen"

        class="fixed inset-0 bg-black bg-opacity-25 z-40"

        @click="closeDayDetails"

    />

  </Transition>



  <!-- Aside Panel -->

  <aside

      class="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col"

      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"

  >

    <!-- Header -->

    <header class="p-4 border-b">

      <!-- Mobile Header -->

      <div class="sm:hidden flex items-center justify-between">

        <button

            @click="closeDayDetails"

            class="p-2 hover:bg-gray-100 rounded-full transition-colors"

        >

          <font-awesome-icon

              :icon="['fas', 'times']"

              class="h-5 w-5 text-gray-500"

          />

        </button>

        <h2 class="text-lg font-semibold">{{ formattedDate }}</h2>

        <div class="w-9"></div> <!-- Spacer for centering -->

      </div>



      <!-- Desktop Header -->

      <div class="hidden sm:flex justify-between items-center">

        <h2 class="text-lg font-semibold">{{ formattedDate }}</h2>

        <button

            @click="closeDayDetails"

            class="p-2 hover:bg-gray-100 rounded-full transition-colors"

        >

          <font-awesome-icon

              :icon="['fas', 'times']"

              class="h-5 w-5 text-gray-500"

          />

        </button>

      </div>

    </header>



    <!-- Content -->

    <div class="flex-1 overflow-y-auto p-4">

      <template v-if="sortedEvents.length">

        <div v-for="event in sortedEvents" :key="event.id" class="mb-4">

          <DayDetailsEvent :event="event" />

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



<style scoped>

.fade-enter-active,

.fade-leave-active {

  transition: opacity 0.3s ease;

}



.fade-enter-from,

.fade-leave-to {

  opacity: 0;

}

</style>
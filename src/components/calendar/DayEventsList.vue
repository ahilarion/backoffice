<script setup lang="ts">

import { computed } from 'vue';

import CalendarEvent from "@/components/calendar/CalendarEvent.vue";

import { getFormattedEvents, type Event } from '@/utils/calendar';



interface Props {

  events?: Event[];

}



const props = withDefaults(defineProps<Props>(), {

  events: () => []

});



const eventsList = computed(() => {

  return props.events || [];

});



const { visibleEvents, overflow } = computed(() =>

    getFormattedEvents(eventsList.value)

).value;



const hasEvents = computed(() => eventsList.value.length > 0);

</script>



<template>

  <div v-if="hasEvents" class="flex flex-col gap-1 overflow-hidden">

    <!-- Mobile View -->

    <div class="md:hidden">

      <div class="flex gap-0.5 flex-wrap items-center">

        <CalendarEvent

            v-for="event in visibleEvents"

            :key="event.id"

            :event="event"

            :is-mobile="true"

        />

        <span

            v-if="overflow > 0"

            class="text-[10px] text-gray-500 ml-1"

        >

          +{{ overflow }}

        </span>

      </div>

    </div>



    <!-- Desktop View -->

    <div class="hidden md:flex md:flex-col gap-1">

      <CalendarEvent

          v-for="event in visibleEvents"

          :key="event.id"

          :event="event"

          :is-mobile="false"

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
<script setup lang="ts">

import { getEventColor, formatTime, type Event } from "@/utils/calendar";



defineProps<{

  event: Event;

}>();

</script>



<template>

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

</template>
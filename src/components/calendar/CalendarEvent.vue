<script setup lang="ts">

import { getEventColor, formatTime, type Event } from "@/utils/calendar";



interface Props {

  event: Event;

  isMobile?: boolean;

}



const props = withDefaults(defineProps<Props>(), {

  isMobile: false

});

</script>



<template>

  <!-- Mobile Dot View -->

  <div

      v-if="isMobile"

      class="w-1.5 h-1.5 rounded-full"

      :style="{ backgroundColor: getEventColor(event.category) }"

  />



  <!-- Desktop Rectangle View -->

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
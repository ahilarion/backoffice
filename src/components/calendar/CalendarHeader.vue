<script setup lang="ts">

import { computed } from 'vue';



interface Props {

  selectedDate: Date;

}



const props = defineProps<Props>();

const emit = defineEmits(['next-month', 'prev-month']);



const currentMonth = computed(() => ({

  full: props.selectedDate.toLocaleString('default', { month: 'long' }),

  short: props.selectedDate.toLocaleString('default', { month: 'short' })

}));



const currentYear = computed(() => props.selectedDate.getFullYear());

</script>



<template>

  <header class="flex justify-between items-center">

    <h1 class="text-xl md:text-2xl font-bold text-gray-900">

      <span class="hidden md:inline">{{ currentMonth.full }}</span>

      <span class="md:hidden">{{ currentMonth.short }}</span>

      {{ currentYear }}

    </h1>



    <div class="flex items-center gap-2">

      <button

          v-for="(action, key) in { prev: 'prev-month', next: 'next-month' }"

          :key="key"

          @click="emit(action)"

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

</template>
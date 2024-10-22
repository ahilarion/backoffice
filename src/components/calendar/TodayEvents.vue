<!-- TodayEvents.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import type { Event } from '@/utils/calendar';

const props = defineProps<{
  events: Event[]
}>();

const todayEvents = computed(() => {
  const today = new Date();
  return props.events.filter(event => {
    const eventDate = new Date(event.start);
    return (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
    );
  });
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
    <h2 class="text-lg font-semibold text-gray-800 mb-3">Événements aujourd'hui</h2>

    <div v-if="todayEvents.length === 0" class="text-gray-500 text-sm">
      Aucun événement prévu aujourd'hui
    </div>

    <div v-else class="space-y-2">
      <div
          v-for="event in todayEvents"
          :key="event.id"
          class="flex items-start p-2 rounded-md hover:bg-gray-50"
      >
        <!-- Heure -->
        <div class="w-20 text-sm text-gray-600">
          {{ new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
        </div>

        <!-- Détails de l'événement -->
        <div class="flex-1">
          <div class="font-medium text-gray-900">{{ event.title }}</div>
          <div class="text-sm text-gray-500">{{ event.description }}</div>
        </div>

        <!-- Badge catégorie -->
        <div class="ml-2">
          <span class="px-2 py-1 text-xs rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': event.category === 'Meetings',
                  'bg-green-100 text-green-800': event.category === 'Personal',
                  'bg-red-100 text-red-800': event.category === 'Deadlines'
                }">
            {{ event.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
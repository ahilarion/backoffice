<script setup lang="ts">
import RouterButton from "@/components/commons/RouterButton.vue";
import { ref, computed } from "vue";

// Utiliser une date de référence pour le mois sélectionné
const selectedDate = ref(new Date());
const currentMonth = computed(() =>
    selectedDate.value.toLocaleString('default', { month: 'long' })
);
const currentYear = computed(() => selectedDate.value.getFullYear());
const currentView = ref('Month');

const categories = [
  { name: 'Acme Inc.', color: '#3B82F6' },
  { name: 'Life & Family', color: '#10B981' },
  { name: 'Reservations', color: '#6366F1' },
  { name: 'Events', color: '#EF4444' },
  { name: 'Misc', color: '#F59E0B' }
];

const views = ['Month', 'Week', 'Day'];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  let firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
};

const days = computed(() => {
  const currentMonthIndex = selectedDate.value.getMonth();
  const currentYear = selectedDate.value.getFullYear();

  const daysArray = [];
  const firstDay = getFirstDayOfMonth(currentYear, currentMonthIndex);
  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);

  // Calculer le nombre total de cellules nécessaires
  const totalDays = firstDay + daysInMonth;
  const totalCells = Math.ceil(totalDays / 7) * 7; // Arrondir au multiple de 7 supérieur

  // Ajouter les cellules du mois précédent
  if (firstDay > 0) {
    const previousMonthDays = getDaysInMonth(
        currentMonthIndex === 0 ? currentYear - 1 : currentYear,
        currentMonthIndex === 0 ? 11 : currentMonthIndex - 1
    );

    for (let i = 0; i < firstDay; i++) {
      const day = previousMonthDays - firstDay + i + 1;
      daysArray.push({ day, isOutside: true });
    }
  }

  // Ajouter les jours du mois courant
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, isOutside: false });
  }

  // Ajouter les cellules du mois suivant
  const remainingCells = totalCells - daysArray.length;
  for (let i = 1; i <= remainingCells; i++) {
    daysArray.push({ day: i, isOutside: true });
  }

  return daysArray;
});

const nextMonth = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  selectedDate.value = newDate;
};

const prevMonth = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  selectedDate.value = newDate;
};

const weekDays = [
  { full: 'Monday', short: 'Mon' },
  { full: 'Tuesday', short: 'Tue' },
  { full: 'Wednesday', short: 'Wed' },
  { full: 'Thursday', short: 'Thu' },
  { full: 'Friday', short: 'Fri' },
  { full: 'Saturday', short: 'Sat' },
  { full: 'Sunday', short: 'Sun' }
];
</script>

<template>
  <div class="flex flex-col">
    <!-- Header principal -->
    <div class="flex flex-col gap-4">
      <!-- Ligne du titre -->
      <div class="flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">{{ currentMonth }} {{ currentYear }}</h1>
        <div class="flex items-center gap-2">
          <button class="p-2 rounded-lg hover:bg-gray-100 border" @click="prevMonth">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button class="p-2 rounded-lg hover:bg-gray-100 border" @click="nextMonth">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button class="px-3 py-1.5 md:px-4 md:py-2 bg-gray-900 text-white text-sm md:text-base rounded-lg hover:bg-gray-800">
            Create Event
          </button>
        </div>
      </div>

      <!-- Ligne des filtres -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 pb-6">
        <!-- Categories avec scroll horizontal sur mobile -->
        <div class="flex gap-2 items-center overflow-x-auto max-w-full pb-2 md:pb-0 hide-scrollbar">
          <div v-for="category in categories"
               :key="category.name"
               class="px-2 md:px-3 py-1.5 rounded-full bg-white shadow-sm border flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
            <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: category.color }"></div>
            {{ category.name }}
          </div>
          <button class="px-2 md:px-3 py-1.5 rounded-full bg-white shadow-sm border text-xs md:text-sm text-blue-600 whitespace-nowrap">
            +Add New
          </button>
        </div>

        <!-- View selector -->
        <div class="flex rounded-lg border bg-white overflow-hidden">
          <button v-for="view in views"
                  :key="view"
                  class="px-3 md:px-4 py-1.5 text-xs md:text-sm"
                  :class="{'bg-white': currentView !== view, 'bg-gray-100': currentView === view}"
                  @click="currentView = view">
            {{ view }}
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="rounded-lg overflow-hidden shadow-sm">
      <!-- Grid pour l'en-tête -->
      <div class="grid grid-cols-7 bg-white">
        <div v-for="day in weekDays"
             :key="day.full"
             class="p-2 md:p-4 text-xs md:text-sm text-gray-600 text-center">
          <span class="hidden md:inline">{{ day.full }}</span>
          <span class="md:hidden">{{ day.short }}</span>
        </div>
      </div>

      <!-- Grid pour les jours -->
      <div class="grid grid-cols-7 bg-white border-t">
        <div v-for="(item, index) in days"
             :key="index"
             class="aspect-square p-2 md:p-4 relative bg-white border-r border-b last:border-r-0">
          <span v-if="!item.isOutside" class="text-sm md:text-base">{{ item.day }}</span>
          <div v-if="item.isOutside"
               class="absolute inset-0 bg-[#F7F9FC] bg-opacity-50"
               style="background-image: repeating-linear-gradient(45deg, #F7F9FC, #F7F9FC 2px, transparent 2px, transparent 6px);">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Cache la barre de défilement tout en gardant la fonctionnalité */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
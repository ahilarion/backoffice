<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  label: string;
  modelValue: string | number;
  options: { value: string | number; label: string }[];
  required?: boolean;
  placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const id = `select-${Math.random().toString(36).substr(2, 9)}`;
const isOpen = ref(false);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const selectedLabel = computed(() => {
  const option = props.options.find(opt => opt.value === value.value);
  return option ? option.label : props.placeholder || 'Select an option';
});

const selectOption = (optionValue: string | number) => {
  value.value = optionValue;
  isOpen.value = false;
};

const closeDropdown = (event: Event) => {
  if (!(event.target as HTMLElement).closest('.select-container')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div class="select-container">
    <label :for="id" class="block text-sm text-gray-700 font-medium capitalize">
      {{ props.label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative mt-1">
      <button
          :id="id"
          type="button"
          class="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm bg-white"
          @click="isOpen = !isOpen"
      >
        <span class="block truncate">{{ selectedLabel }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>

      <div v-if="isOpen" class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <div
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option.value)"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
            :class="{'bg-gray-100': option.value === value}"
        >
          {{ option.label }}
          <span v-if="option.value === value" class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
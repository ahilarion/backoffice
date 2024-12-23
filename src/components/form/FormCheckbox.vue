<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  modelValue: boolean;
  required?: boolean;
}>()

const emit = defineEmits(["update:modelValue"]);

const id = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

const value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="flex items-center justify-between">
    <label :for="id" class="text-sm text-gray-700 font-medium cursor-pointer">
      {{ props.label }}
    </label>

    <input
      type="checkbox"
      :id="id"
      :name="id"
      v-model="value"
      :required="props.required"
      class="h-4 w-4 text-gray-600 rounded border-gray-300 focus:ring-gray-400 focus:border-gray-400"
    />
  </div>
</template>

<style scoped>
/* Additional styling for checkbox focus ring or hover interactions */
</style>
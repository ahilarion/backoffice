<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string,
  type: string,
  modelValue: string | number,
  required?: boolean,
  maxLength?: number,
  minLength?: number
}>()

const emit = defineEmits(['update:modelValue'])

const id = `input-${Math.random().toString(36).substr(2, 9)}`

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <label :for="id"
           class="block text-sm text-gray-700 font-medium capitalize">
      {{ props.label }}
    </label>
    <input
        :type="props.type"
        :id="id"
        :name="id"
        v-model="value"
        :required="props.required"
        :maxLength="props.maxLength ?? 255"
        :minLength="props.minLength"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm">
  </div>
</template>

<style scoped>

</style>
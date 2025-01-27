<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'

const props = defineProps<{
  label: string,
  type: string,
  modelValue: string | number,
  required?: boolean,
  maxLength?: number,
  minLength?: number,
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const id = `input-${Math.random().toString(36).substr(2, 9)}`
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Fonction pour ajuster la hauteur du textarea
const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

// Watch sur la valeur pour ajuster la hauteur
watch(() => value.value, () => {
  nextTick(() => {
    adjustHeight()
  })
})
</script>

<template>
  <div>
    <label :for="id"
           class="block text-sm text-gray-700 font-medium capitalize">
      {{ props.label }}
    </label>
    <input
        v-if="props.type !== 'textarea'"
        :type="props.type"
        :id="id"
        :name="id"
        v-model="value"
        :required="props.required"
        :maxLength="props.maxLength ?? 255"
        :minLength="props.minLength"
        :placeholder="props.placeholder"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm">
    <textarea
        v-else
        ref="textareaRef"
        :id="id"
        :name="id"
        v-model="value"
        :required="props.required"
        :maxLength="props.maxLength ?? 255"
        :minLength="props.minLength"
        :placeholder="props.placeholder"
        @input="adjustHeight"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm"></textarea>
  </div>
</template>

<style scoped>
textarea {
  min-height: 38px; /* Hauteur minimale correspondant à une ligne */
  resize: none; /* Désactive le resize manuel */
}
</style>
<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="relative">
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    <input
        :value="modelValue"
        @input="onInput"
        type="text"
        maxlength="64"
        class="w-full pl-10 pr-4 py-2 text-sm bg-base-100 font-medium text-gray-800 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
        placeholder="Search..."
    />
  </div>
</template>
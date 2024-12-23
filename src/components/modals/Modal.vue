<script setup lang="ts">
import { defineEmits, ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
    <div v-if="visible" class="fixed inset-0 z-50 m-4">
      <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>

      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
        </div>
        <slot />
      </div>
    </div>
</template>
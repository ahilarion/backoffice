<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

const props = defineProps<{
  to: string;
  icon?: [string, string];
  label: string;
}>();

const isActive = computed(() => {
  return props.to === router.path;
});
</script>

<template>
  <router-link
    :to="props.to"
    class="flex items-center px-4 py-2 gap-3 text-sm font-medium hover:bg-primary hover:bg-opacity-10 rounded-md transition-all"
    :class="{ 'bg-primary bg-opacity-10': isActive }"
  >
    <font-awesome-icon :icon="icon" class="w-4 h-4 text-gray-400" :class="{ 'text-primary': isActive }" />
    <span>{{ props.label }}</span>
  </router-link>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { computed } from "vue";
import * as Icons from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

const router = useRoute();

const props = defineProps<{
  to: string;
  icon?: keyof typeof Icons;
  label: string;
}>();

const isActive = computed(() => {
  return props.to === router.path;
});

const IconComponent = computed(() => {
  return Icons[props.icon!];
});
</script>

<template>
  <router-link
    :to="props.to"
    class="flex items-center px-4 py-2 gap-3 text-sm font-medium hover:bg-primary hover:bg-opacity-10 rounded-md transition-all"
    :class="{ 'bg-primary bg-opacity-10': isActive }"
  >
    <component
      :is="IconComponent"
      class="w-4 h-4 font-bold stroke-[0.16rem] text-gray-400"
      :class="{ 'text-primary': isActive }"
    />
    <span>{{ props.label }}</span>
  </router-link>
</template>

<style scoped>

</style>
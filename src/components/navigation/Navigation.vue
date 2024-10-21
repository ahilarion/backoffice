<script setup lang="ts">
import Logo from "@/components/icons/Logo.vue";
import NavigationCategory from "@/components/navigation/NavigationCategory.vue";
import NavigationItem from "@/components/navigation/NavigationItem.vue";

const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>();

const closeNavigation = () => {
  emit('update:isOpen', false);
};
</script>

<template>
  <div>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
        :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }"
        @click="closeNavigation"
    ></div>

    <nav
        :class="[
        'fixed z-30 rounded-r-2xl h-screen w-64 bg-base-100 shadow-sm p-4 flex flex-col gap-8 transition-transform',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'lg:relative lg:translate-x-0'
      ]"
    >
      <Logo class="ml-2"/>
      <NavigationCategory title="Pages">
        <NavigationItem to="/" icon="HomeIcon" label="Dashboard" />
        <NavigationItem to="/404" icon="HomeIcon" label="404" />
      </NavigationCategory>
    </nav>
  </div>
</template>

<style scoped>

</style>
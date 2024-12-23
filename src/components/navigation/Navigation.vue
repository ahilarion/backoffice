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
    <Transition name="fade">
      <div
          v-show="isOpen"
          class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden h-[120vh] w-full -top-20"
          @click="closeNavigation"
      ></div>
    </Transition>

    <nav
        :class="[
        'fixed z-30 rounded-r-2xl h-screen w-64 bg-base-100 shadow-sm p-4 flex flex-col gap-8 transition-transform',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'lg:relative lg:translate-x-0'
      ]"
    >
      <Logo class="ml-2"/>
      <NavigationCategory title="Pages">
        <NavigationItem to="/" :icon="['fas' ,'chart-line']" :label="$t('navigation.dashboard')" />
        <NavigationItem to="/articles" :icon="['fas' ,'newspaper']" :label="$t('navigation.articles')" />
        <NavigationItem to="/slides" :icon="['fas' ,'images']" :label="$t('navigation.slides')" />
        <NavigationItem to="/products" :icon="['fas' ,'cart-shopping']" :label="$t('navigation.products')" />
      </NavigationCategory>
      <NavigationCategory title="Admin">
        <NavigationItem to="/users" :icon="['fas' ,'user']" :label="$t('navigation.users')" />
        <NavigationItem to="/roles" :icon="['fas' ,'person']" :label="$t('navigation.roles')" />
        <NavigationItem to="/permissions" :icon="['fas' ,'pen-nib']" :label="$t('navigation.permissions')" />
      </NavigationCategory>
    </nav>
  </div>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
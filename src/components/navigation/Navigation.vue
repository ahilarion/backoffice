<script setup lang="ts">

import Logo from "@/components/icons/Logo.vue";
import NavigationCategory from "@/components/navigation/NavigationCategory.vue";
import NavigationItem from "@/components/navigation/NavigationItem.vue";
</script>

<template>
  <nav class="h-screen w-64 rounded-r-2xl bg-base-100 shadow-sm p-4 flex flex-col gap-8">
    <Logo class="ml-2"/>
    <NavigationCategory :title="'pages'">
      <NavigationItem to="/" icon="HomeIcon" label="Dashboard" />
      <NavigationItem to="/zeaeazeaze" icon="HomeIcon" label="404" />
    </NavigationCategory>
  </nav>
</template>

<style scoped>

</style>
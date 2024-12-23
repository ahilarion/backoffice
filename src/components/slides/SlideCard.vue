<script setup lang="ts">
const props = defineProps<{
  slide: {
    image_url: string,
    title: string,
    text: string
  }
}>();
</script>

<template>
  <div class="relative flex rounded-lg bg-base-100 shadow-sm hover:cursor-pointer hover:brightness-75 transition-all duration-300">
    <img :src="slide.image_url" alt="banner" class="absolute top-0 left-0 w-full h-96 object-cover rounded-lg z-10" />
    <div class="h-96 w-full flex z-20 flex-col justify-center items-start gap-4 p-8 bg-black bg-opacity-10 rounded-lg">
      <h2 class="font-canveat text-2xl sm:text-4xl text-[#FD5006] whitespace-nowrap">
        {{ slide.title }}
      </h2>
      <p class="font-montserrat text-white text-xl sm:text-2xl font-bold text-center md:text-left">
        {{ slide.text }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
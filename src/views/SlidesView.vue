<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import { useRouter } from "vue-router";
import {useSlidesStore} from "@/stores/slides";
import SlideCard from "@/components/slides/SlideCard.vue";
import SlideCreationForm from "@/components/form/SlideCreationForm.vue";
import Modal from "@/components/modals/Modal.vue";
import SlideEditionForm from "@/components/form/SlideEditionForm.vue";

const router = useRouter();
const slidesStore = useSlidesStore();
const slides = computed(() => slidesStore.slides);
const isSlideCreationModalOpen = ref(false);
const isSlideEditionModalOpen = ref(false);

const openSlideCreationModal = () => {
  isSlideCreationModalOpen.value = true;
}

const closeSlideCreationModal = () => {
  isSlideCreationModalOpen.value = false;
}

const openSlideEditionModal = () => {
  isSlideEditionModalOpen.value = true;
}

const closeSlideEditionModal = () => {
  isSlideEditionModalOpen.value = false;
}

const handleClick = (id: string) => {
  slidesStore.fetchSlide(id).then(() => {
    openSlideEditionModal();
  })
}

onMounted(async () => {
  await slidesStore.fetchSlides()
})

</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.slides.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <ActionButton @action="openSlideCreationModal" :label="$t('common.actions.add')" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <SlideCard v-for="slide in slides" :key="slide.id" :slide="slide" @click="handleClick(slide.id)" />
      </div>
    </div>
  </div>
  <Modal v-bind:visible="isSlideCreationModalOpen" v-on:close="closeSlideCreationModal" :title="$t('modals.slideCreate.title')">
    <SlideCreationForm @close="closeSlideCreationModal" />
  </Modal>
  <Modal v-bind:visible="isSlideEditionModalOpen" v-on:close="closeSlideEditionModal" :title="$t('modals.slideEdit.title')">
    <SlideEditionForm
        v-if="slidesStore.slide"
        @close="closeSlideEditionModal"
        :slide="slidesStore.slide" />
  </Modal>
</template>

<style scoped>

</style>
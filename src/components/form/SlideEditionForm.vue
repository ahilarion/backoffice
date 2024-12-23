<script setup lang="ts">
import {ref, defineEmits, computed, onMounted} from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useSlidesStore } from "@/stores/slides";
import { useRouter } from "vue-router";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import ActionButton from "@/components/commons/ActionButton.vue";

const slidesStore = useSlidesStore();

const props = defineProps<{
  slide: {
    id: string
    title: string
    text: string
    image_url: string
    redirect_url: string
    order: number
  }
}>();

const router = useRouter();
const slideTitle = ref("");
const slideText = ref("");
const slideImageURL = ref("");
const slideRedirectURL = ref("");
const slideOrder = ref(0);

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  await slidesStore.updateSlide(props.slide.id, {
    title: slideTitle.value.trim(),
    text: slideText.value.trim(),
    image_url: slideImageURL.value.trim(),
    redirect_url: slideRedirectURL.value.trim(),
    order: slideOrder.value
  }).then(() => {
    emit("close");
    router.push('/slides');
  })
};

const handleDelete = async () => {
  await slidesStore.deleteSlide(props.slide.id).then(() => {
    emit("close");
    router.push('/slides');
  })
};

const checkIfValidImage = computed(() => {
  return slideRedirectURL.value.match(/\.(jpeg|jpg|gif|png)$/) != null;
});

onMounted(() => {
  slideTitle.value = props.slide.title;
  slideText.value = props.slide.text;
  slideImageURL.value = props.slide.image_url;
  slideRedirectURL.value = props.slide.redirect_url;
  slideOrder.value = props.slide.order;
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormInput
          :label="$t('modals.slideEdit.form.title')"
          v-model="slideTitle"
          required
          max="64"
          :placeholder="$t('modals.slideEdit.form.titlePlaceholder')"
          type="text"
      />

      <FormInput
          :label="$t('modals.slideEdit.form.text')"
          v-model="slideText"
          required
          max="64"
          :placeholder="$t('modals.slideEdit.form.textPlaceholder')"
          type="text"
      />

      <FormInput
          :label="$t('modals.slideEdit.form.image')"
          v-model="slideImageURL"
          required
          max="255"
          :placeholder="$t('modals.slideEdit.form.imagePlaceholder')"
          type="text"
      />

      <div v-if="checkIfValidImage" class="flex justify-center">
        <img :src="slideImageURL" alt="Thumbnail" class="w-1/2" />
      </div>

      <FormInput
          :label="$t('modals.slideEdit.form.redirectUrl')"
          v-model="slideRedirectURL"
          required
          max="255"
          :placeholder="$t('modals.slideEdit.form.redirectUrlPlaceholder')"
          type="text"
      />

      <FormInput
          :label="$t('modals.slideEdit.form.order')"
          v-model="slideOrder"
          required
          max="255"
          min="0"
          :placeholder="$t('modals.slideEdit.form.orderPlaceholder')"
          type="number"
          @input="slideOrder = parseInt($event.target.value)"
      />

      <!-- Error message -->
      <transition name="error-transition">
        <div v-if="slidesStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.slides.slideCannotBeCreated') }}</span>
          </p>
        </div>
      </transition>

      <div class="flex justify-start gap-4">
        <FormSubmitButton
            :label="$t('modals.slideEdit.form.submit')"
            :loading="slidesStore.loading"
        />
        <ActionButton label="Supprimer" @click="handleDelete" red />
      </div>
    </form>
  </div>
</template>

<style scoped>
.error-transition-enter-active,
.error-transition-leave-active {
  @apply transition-all ease-in-out duration-300;
}
.error-transition-enter-from,
.error-transition-leave-to {
  @apply p-0 opacity-0 max-h-0 overflow-hidden;
}
.error-transition-enter-to,
.error-transition-leave-from {
  @apply p-2 opacity-100 max-h-20;
}
</style>
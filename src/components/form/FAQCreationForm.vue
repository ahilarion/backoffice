<script setup lang="ts">
import { ref, defineEmits } from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useFAQStore } from "@/stores/faq";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const FAQStore = useFAQStore();

const FAQQuestion = ref<string>("");
const FAQAnswer = ref<string>("");
const formError = ref<string | null>(null);

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  formError.value = null;

  if (!FAQQuestion.value.trim()) {
    formError.value = "Question is required";
    return;
  }

  if (!FAQAnswer.value.trim()) {
    formError.value = "Answer is required";
    return;
  }

  await FAQStore.createFAQ({
    question: FAQQuestion.value,
    answer: FAQAnswer.value
  }).then(() => {
    FAQStore.fetchFAQ(FAQStore.pagination.currentPage);
    emit("close");
  })
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormInput
        :label="$t('modals.FAQCreate.form.question')"
        v-model="FAQQuestion"
        required
        max="64"
        :placeholder="$t('modals.FAQCreate.form.questionPlaceholder')"
        type="text"
      />

      <FormInput
        :label="$t('modals.FAQCreate.form.answer')"
        v-model="FAQAnswer"
        required
        :placeholder="$t('modals.FAQCreate.form.answerPlaceholder')"
        type="textarea"
      />
      
      <!-- Error message -->
      <transition name="error-transition">
        <div v-if="FAQStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.unexpected') }}</span>
          </p>
        </div>
      </transition>

      <!-- Submit button -->
      <FormSubmitButton
        :label="$t('modals.FAQCreate.form.submit')"
        :loading="FAQStore.loading"
      />
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
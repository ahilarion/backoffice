<script setup lang="ts">
import {ref, defineEmits, computed, onMounted} from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useFAQStore } from "@/stores/faq";
import { useRouter } from "vue-router";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import ActionButton from "@/components/commons/ActionButton.vue";

const FAQStore = useFAQStore();

const router = useRouter();
const faqItem = computed(() => FAQStore.faqItem);
const faqQuestion = ref("");
const faqAnswer = ref("");

const errorEmptyFAQ = ref(false);

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  if(!faqQuestion.value.trim() || !faqAnswer.value.trim()) {
    errorEmptyFAQ.value = true;
    return;
  }

  if (!faqItem.value?.id) {
    return;
  }

  await FAQStore.updateFAQ(faqItem.value.id, {
    question: faqQuestion.value,
    answer: faqAnswer.value
  }).then(() => {
    FAQStore.fetchFAQ(FAQStore.pagination.currentPage)
    emit("close");
    router.push('/faq');
  })
};

const handleDelete = async () => {
  if (!faqItem.value?.id) {
    return;
  }

  await FAQStore.deleteFAQ(faqItem.value.id).then(() => {
    FAQStore.fetchFAQ(FAQStore.pagination.currentPage)
    emit("close");
    router.push('/faq');
  })
};

onMounted(() => {
  faqQuestion.value = faqItem.value?.question ?? "";
  faqAnswer.value = faqItem.value?.answer ?? "";
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormInput
          :label="$t('modals.FAQEdit.form.question')"
          v-model="faqQuestion"
          required
          max="64"
          :placeholder="$t('modals.FAQEdit.form.questionPlaceholder')"
          type="text"
      />

      <FormInput
          :label="$t('modals.FAQEdit.form.answer')"
          v-model="faqAnswer"
          required
          :placeholder="$t('modals.FAQEdit.form.answerPlaceholder')"
          type="textarea"
          :max-length="500"
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

      <div class="flex justify-start gap-4">
        <!-- Submit button -->
        <FormSubmitButton
            :label="$t('modals.FAQEdit.form.submit')"
            :loading="FAQStore.loading"
        />
        <ActionButton
            :label="$t('common.actions.delete')"
            @click="handleDelete"
            :loading="FAQStore.loading"
            red
        />
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
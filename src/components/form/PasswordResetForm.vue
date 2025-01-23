<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useUsersStore } from "@/stores/users";
import {XMarkIcon} from "@heroicons/vue/24/solid";

const usersStore = useUsersStore();

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  await usersStore.requestPasswordReset(
    usersStore.user?.id as string
  ).then(() => {
    emit("close");
  });
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <p class="text-sm text-gray-500">{{ $t('modals.passwordReset.description') }}</p>
      <transition name="error-transition">
        <div v-if="usersStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.unexpected') }}</span>
          </p>
        </div>
      </transition>
      <FormSubmitButton
        :label="$t('modals.passwordReset.submit')"
        :loading="usersStore.loading"
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
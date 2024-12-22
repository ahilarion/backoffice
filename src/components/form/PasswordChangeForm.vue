<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useUsersStore } from "@/stores/users";
import { useAuthStore } from "@/stores/auth";
import {XMarkIcon} from "@heroicons/vue/24/solid";

const authStore = useAuthStore();
const usersStore = useUsersStore();
const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const user = computed(() => authStore.user);
const passwordDoesNotMatch = ref(false);

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  if (newPassword.value !== confirmNewPassword.value) {
    passwordDoesNotMatch.value = true;
    return;
  }

  await usersStore.changePassword(
      user.value?.id ?? "",
      currentPassword.value,
      newPassword.value,
      confirmNewPassword.value
  ).then(() => {
    emit("close");
  });
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormInput
        :label="$t('modals.passwordChange.form.currentPassword')"
        type="password"
        v-model="currentPassword"
        required
        :placeholder="$t('modals.passwordChange.form.currentPasswordPlaceholder')"
      />
      <FormInput
        :label="$t('modals.passwordChange.form.newPassword')"
        type="password"
        v-model="newPassword"
        required
        :placeholder="$t('modals.passwordChange.form.newPasswordPlaceholder')"
      />
      <FormInput
        :label="$t('modals.passwordChange.form.confirmPassword')"
        type="password"
        v-model="confirmNewPassword"
        required
        :placeholder="$t('modals.passwordChange.form.confirmPasswordPlaceholder')"
      />
      <transition name="error-transition">
        <div v-if="passwordDoesNotMatch" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.users.passwordDoesNotMatch') }}</span>
          </p>
        </div>
      </transition>
      <transition name="error-transition">
        <div v-if="usersStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.users.currentPasswordIncorrect') }}</span>
          </p>
        </div>
      </transition>
      <FormSubmitButton
        :label="$t('modals.passwordChange.form.submit')"
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
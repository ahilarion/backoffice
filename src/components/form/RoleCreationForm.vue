<script setup lang="ts">
import { ref, defineEmits } from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useRolesStore } from "@/stores/roles";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const rolesStore = useRolesStore();

const roleName = ref("");
const formError = ref<string | null>(null);

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  formError.value = null;

  if (!roleName.value.trim()) {
    formError.value = "Role name is required.";
    return;
  }

  await rolesStore.createRole({
    name: roleName.value.trim().toLowerCase(),
  }).then(() => {
    emit("close");
  })
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormInput
        :label="$t('modals.roleCreate.form.name')"
        v-model="roleName"
        required
        max="64"
        :placeholder="$t('modals.roleCreate.form.namePlaceholder')"
        type="text"
      />
      
      <!-- Error message -->
      <transition name="error-transition">
        <div v-if="rolesStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.roles.roleAlreadyExists') }}</span>
          </p>
        </div>
      </transition>

      <!-- Submit button -->
      <FormSubmitButton
        :label="$t('modals.roleCreate.form.submit')"
        :loading="rolesStore.loading"
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
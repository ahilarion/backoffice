<script setup lang="ts">
import {defineEmits, computed, ref} from "vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useRolesStore} from "@/stores/roles";
import { useRouter } from "vue-router";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import ActionButton from "@/components/commons/ActionButton.vue";

const rolesStore = useRolesStore();

const router = useRouter();
const roleId = ref(router.currentRoute.value.params.id as string);
const props = defineProps<{
  roleName: string;
  selectedPermissions: string[];
}>();

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  await rolesStore.updateRole(roleId.value, {
    name: props.roleName,
    permissions: props.selectedPermissions,
  }).then(() => {
    emit("close");
  })
};

</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <transition name="error-transition">
        <div v-if="rolesStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.articles.articleCannotBeDeleted') }}</span>
          </p>
        </div>
      </transition>

      <div class="flex justify-start gap-4">
        <ActionButton :label="$t('common.actions.cancel')" white @click="emit('close')" />

        <FormSubmitButton
            :label="$t('modals.roleEdit.submit')"
            :loading="rolesStore.loading"
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
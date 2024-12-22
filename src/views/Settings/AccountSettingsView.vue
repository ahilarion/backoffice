<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import FormDropdown from "@/components/form/FormDropdown.vue";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users";
import { useI18n } from 'vue-i18n';
import Modal from "@/components/modals/Modal.vue";
import PasswordChangeForm from "@/components/form/PasswordChangeForm.vue";

const { locale, t } = useI18n();
const authStore = useAuthStore();
const usersStore = useUsersStore();
const options = [
  { value: 'en', label: t('languages.english') },
  { value: 'fr', label: t('languages.french') },
];

const user = computed(() => authStore.user);
const firstName = ref(user?.value?.first_name || '');
const lastName = ref(user?.value?.last_name || '');
const email = ref(user?.value?.email || '');
const user_locale = ref(user?.value?.locale || 'fr');
const isPasswordModalVisible = ref(false);

const handlePasswordChange = () => {
  isPasswordModalVisible.value = true;
};

const handleSave = () => {
  usersStore.updateUser(user?.value?.id ?? '',{
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    locale: user_locale.value,
  }).then(() => {
    locale.value = user_locale.value;
    localStorage.setItem('language', user_locale.value);
    useAuthStore().me();
  });
}
</script>

<template>
  <div class="h-full w-full p-4 flex flex-col gap-4">
    <h1 class="text-2xl font-semibold">{{ $t('pages.settings.myAccount.title') }}</h1>
    <form @submit.prevent="handleSave" class="flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row w-full gap-4">
        <div class="w-full">
          <FormInput :label="$t('pages.settings.myAccount.form.firstName')" type="text" v-model="firstName" required placeholder="Enter your first name"/>
        </div>
        <div class="w-full">
          <FormInput :label="$t('pages.settings.myAccount.form.lastName')" type="text" v-model="lastName" required placeholder="Enter your last name" />
        </div>
      </div>
      <FormInput :label="$t('pages.settings.myAccount.form.email')" type="email" v-model="email" required placeholder="Enter your email" />
      <ActionButton :label="$t('pages.settings.myAccount.form.changePassword')" @click="handlePasswordChange" white id="change-password" />
      <FormDropdown :label="$t('pages.settings.myAccount.form.language')" :options="options" v-model="user_locale" />
      <FormSubmitButton :loading="authStore.loading" :label="$t('pages.settings.myAccount.form.submit')" />
    </form>
  </div>
  <Modal
      v-if="isPasswordModalVisible"
      :title="$t('modals.passwordChange.title')"
      :visible="isPasswordModalVisible"
      @close="isPasswordModalVisible = false"
  >
    <PasswordChangeForm @close="isPasswordModalVisible = false" />
  </Modal>
</template>
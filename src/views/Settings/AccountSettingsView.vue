<script setup lang="ts">
import { ref } from 'vue';
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import FormDropdown from "@/components/form/FormDropdown.vue";

const options = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
];

const currentLanguage = ref(localStorage.getItem('language') || 'en');
const locale = ref(currentLanguage.value);

const handleLanguageChange = (newValue: string) => {
  locale.value = newValue;
  currentLanguage.value = newValue;
  localStorage.setItem('language', newValue);
};
</script>

<template>
  <div class="h-full w-full p-4 flex flex-col gap-4">
    <h1 class="text-2xl font-semibold">{{ $t('pages.settings.myAccount.title') }}</h1>
    <form @submit.prevent="handleSave" class="flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row w-full gap-4">
        <div class="w-full">
          <FormInput :label="$t('pages.settings.myAccount.form.firstName')" type="text" v-model="firstName" required placeholder="Enter your first name" />
        </div>
        <div class="w-full">
          <FormInput :label="$t('pages.settings.myAccount.form.lastName')" type="text" v-model="lastName" required placeholder="Enter your last name" />
        </div>
      </div>
      <FormInput :label="$t('pages.settings.myAccount.form.email')" type="email" v-model="email" required placeholder="Enter your email" />
      <ActionButton label="Change password" @click="handlePasswordChange" white id="change-password" />
      <FormDropdown label="Language" :options="options" v-model="locale" @change="handleLanguageChange" />
      <FormSubmitButton :loading="loading" :label="$t('pages.settings.myAccount.form.submit')" />
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import FormDropdown from "@/components/form/FormDropdown.vue";
import { useAuthStore } from "@/stores/auth";
import { useUsersStore } from "@/stores/users";
import { useI18n } from 'vue-i18n';
import Modal from "@/components/modals/Modal.vue";
import PasswordChangeForm from "@/components/form/PasswordChangeForm.vue";
import ImageCropForm from "@/components/form/ImageCropForm.vue";

const { locale, t } = useI18n();
const authStore = useAuthStore();
const usersStore = useUsersStore();
const options = [
  { value: 'en', label: t('languages.english') },
  { value: 'fr', label: t('languages.french') },
];

const user = computed(() => authStore.user);
const firstName = ref(user.value?.first_name || '');
const lastName = ref(user.value?.last_name || '');
const email = ref(user.value?.email || '');
const user_locale = ref(user.value?.locale || 'fr');
const isPasswordModalVisible = ref(false);
const isImageCropModalVisible = ref(false);
const profileImage = ref(user.value?.profile_picture || '');
const selectedImageFile = ref<File | null>(null);

const handlePasswordChange = () => {
  isPasswordModalVisible.value = true;
};

const handleSave = () => {
  usersStore
      .updateUser(user.value?.id ?? '', {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        locale: user_locale.value,
      }, selectedImageFile.value).then(() => {
        locale.value = user_locale.value;
        authStore.me();
      });
};

const handleCrop = (croppedImage: string) => {
  profileImage.value = croppedImage;
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    const file = target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      selectedImageFile.value = file;
      isImageCropModalVisible.value = true;
    } else {
      alert('File size exceeds 2MB');
    }
  }
};

</script>

<template>
  <div class="h-full w-full p-4 flex flex-col gap-4">
    <h1 class="text-2xl font-semibold">{{ $t('pages.settings.myAccount.title') }}</h1>
    <form @submit.prevent="handleSave" class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-4 w-full items-center justify-between">
        <div class="flex items-center justify-center gap-6 w-full md:w-72">
          <div class="relative">
            <img v-if="profileImage" :src="profileImage" alt="profile" class="rounded-full w-28 h-28 shadow-md" />
            <img v-else src="@/assets/profile.png" alt="profile" class="rounded-full w-28 h-28 shadow-md" />
            <label for="file-upload" class="top-0 left-0 absolute h-full w-full flex items-center justify-center cursor-pointer bg-black bg-opacity-20 rounded-full opacity-0 hover:opacity-100 transition-all">
              <font-awesome-icon :icon="['fas', 'pencil']" />
            </label>
            <input id="file-upload" type="file" @change="handleFileChange" accept="image/*" class="hidden" />
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-4 w-full">
          <div class="w-full">
            <FormInput :label="$t('pages.settings.myAccount.form.firstName')" type="text" v-model="firstName" required placeholder="Enter your first name"/>
          </div>
          <div class="w-full">
            <FormInput :label="$t('pages.settings.myAccount.form.lastName')" type="text" v-model="lastName" required placeholder="Enter your last name" />
          </div>
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
  <Modal
      v-if="isImageCropModalVisible"
      :title="$t('common.actions.crop')"
      :visible="isImageCropModalVisible"
      @close="isImageCropModalVisible = false"
  >
    <ImageCropForm :image-file="selectedImageFile" @close="isImageCropModalVisible = false" @crop="handleCrop" />
  </Modal>
</template>
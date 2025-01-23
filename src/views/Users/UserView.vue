<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { useRolesStore } from '@/stores/roles';
import { useI18n } from 'vue-i18n';
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import Modal from "@/components/modals/Modal.vue";
import ImageCropForm from "@/components/form/ImageCropForm.vue";
import FormDropdown from "@/components/form/FormDropdown.vue";
import defaultProfileImage from '@/assets/profile.png';
import PasswordResetForm from "@/components/form/PasswordResetForm.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const usersStore = useUsersStore();
const rolesStore = useRolesStore();
const userId = route.params.id as string;

const user = computed(() => usersStore.user);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const profileImage = ref(defaultProfileImage);
const isPasswordResetModalVisible = ref(false);
const isImageCropModalVisible = ref(false);
const selectedImageFile = ref<File | null>(null);
const selectedRole = ref('');
const userLocale = ref('fr');

const options = [
  { value: 'en', label: t('languages.english') },
  { value: 'fr', label: t('languages.french') },
];

const handlePasswordReset = () => {
  isPasswordResetModalVisible.value = true;
};

const handleSave = () => {
  usersStore.updateUser(userId, {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    locale: userLocale.value,
  }, selectedImageFile.value as File).then(() => {
    usersStore.changeUserRole(userId, selectedRole.value);
    router.push('/users');
  });
};

const handleCrop = (croppedImage: string) => {
  profileImage.value = croppedImage;

  const byteString = atob(croppedImage.split(',')[1]);
  const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  selectedImageFile.value = new File([ab], 'cropped.png', { type: mimeString });
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

onMounted(async () => {
  await usersStore.fetchUser(userId);
  await rolesStore.fetchRoles();
  firstName.value = user.value?.first_name || '';
  lastName.value = user.value?.last_name || '';
  email.value = user.value?.email || '';
  profileImage.value = user.value?.profile_picture || defaultProfileImage;
  selectedRole.value = user.value?.role || '';
  userLocale.value = user.value?.locale || 'fr';
});
</script>

<template>
  <div class="flex flex-col rounded-lg bg-base-100 shadow-sm">
    <img src="../../assets/auth-background.jpg" alt="banner" class="rounded-t-lg object-cover h-48 w-full" />
    <div class="relative h-16">
      <img :src="profileImage" alt="profile" class="h-36 w-36 rounded-full absolute top-0 left-10 transform -translate-y-1/2" />
      <label for="file-upload" class="absolute top-0 left-10 h-36 w-36 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 rounded-full opacity-0 hover:opacity-100 transition-all text-white transform -translate-y-1/2">
        <font-awesome-icon :icon="['fas', 'pencil']" />
      </label>
      <input id="file-upload" type="file" @change="handleFileChange" accept="image/*" class="hidden" />
    </div>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">{{ $t('pages.user.title') }}</h1>
      <form @submit.prevent="handleSave" class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput :label="$t('pages.user.form.firstName')" type="text" v-model="firstName" required placeholder="Enter your first name"/>
          <FormInput :label="$t('pages.user.form.lastName')" type="text" v-model="lastName" required placeholder="Enter your last name" />
        </div>
        <FormInput :label="$t('pages.user.form.email')" type="email" v-model="email" required placeholder="Enter your email" />
        <FormDropdown :label="$t('pages.user.form.roles')" v-model="selectedRole" :options="rolesStore.roles.map(role => ({ value: role.name, label: $t(`common.roles.${role.name}`) }))" required />
        <FormDropdown :label="$t('pages.user.form.language')" v-model="userLocale" :options="options" required />
        <ActionButton :label="$t('pages.user.form.resetPassword')" @click="handlePasswordReset" white id="change-password" />
        <FormSubmitButton :loading="usersStore.loading" :label="$t('pages.settings.myAccount.form.submit')" />
      </form>
    </div>
  </div>
  <Modal
      v-if="isPasswordResetModalVisible"
      :title="$t('modals.passwordReset.title')"
      :visible="isPasswordResetModalVisible"
      @close="isPasswordResetModalVisible = false"
  >
    <PasswordResetForm @close="isPasswordResetModalVisible = false" />
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
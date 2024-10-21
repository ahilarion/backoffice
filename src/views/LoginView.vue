<script setup lang="ts">
import { ref } from 'vue';
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import Logo from "@/components/icons/Logo.vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);

const login = (email: string, password: string) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    authStore.login(email, password);
    router.push('/');
  }, 2000);
}
</script>

<template>
  <div class="w-full flex">
    <div class="w-full lg:w-1/2 h-screen flex items-center justify-center">
      <router-link to="/" class="absolute top-4 left-8">
        <Logo class="w-16 h-16" />
      </router-link>
      <div class="w-96 p-6">
        <h1 class="text-3xl font-bold mb-6">{{ $t('pages.login.title') }}</h1>
        <form @submit.prevent="login(email, password)" class="space-y-6">
          <FormInput :label="$t('pages.login.email')" type="email" v-model="email" required />
          <FormInput :label="$t('pages.login.password')" type="password" v-model="password" required />
          <transition name="error-transition">
            <div v-if="loading" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
              <p>
                <XMarkIcon class="h-5 w-5 inline-block text-error" />
                <span class="text-sm text-error">{{ $t('pages.login.credentialsError') }}</span>
              </p>
            </div>
          </transition>
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600 cursor-pointer hover:underline">
              {{ $t('pages.login.forgotPassword') }}
            </p>
            <FormSubmitButton :loading="loading" />
          </div>
        </form>
      </div>
    </div>
    <img src="@/assets/auth-background.jpg" alt="Auth background" class="w-1/2 h-screen object-cover hidden lg:block" />
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
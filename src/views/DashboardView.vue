<script setup lang="ts">
import { ref, onMounted } from "vue";
import Loading from "@/components/icons/Loading.vue";

const services = ref([
  { name: "Backoffice", status: "stopped", isLoading: false },
  { name: "Website", status: "stopped", isLoading: false },
  { name: "API", status: "stopped", isLoading: false },
]);

const checkServiceStatus = async (serviceName: string) => {
  const service = services.value.find((s) => s.name === serviceName);
  if (!service) return;

  service.isLoading = true;
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/status/${serviceName.toLowerCase()}`);
    service.status = response.ok ? "running" : "stopped";
  } catch {
    service.status = "stopped";
  }
  service.isLoading = false;
};

onMounted(() => {
  services.value.forEach((service) => checkServiceStatus(service.name));
  setInterval(() => {
    services.value.forEach((service) => checkServiceStatus(service.name));
  }, 60000); // Actualiser toutes les 60 secondes
});
</script>

<template>
  <div class="flex flex-col gap-8 min-h-screen">
    <header class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">{{ $t('pages.dashboard.title') }}</h1>
    </header>

    <section class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
          v-for="(service, index) in services"
          :key="index"
          class="p-6 bg-white rounded-lg shadow-sm"
      >
        <h2 class="text-xl font-semibold text-gray-800">{{ service.name }}</h2>
        <p class="mt-4 text-gray-700 flex items-center gap-2">
          Status:
          <span
              :class="[
               'px-2 py-1 rounded-md text-sm font-medium w-32 h-8 flex items-center justify-center',
               service.status === 'running'
                 ? 'bg-green-100 text-green-800'
                 : 'bg-red-100 text-red-800',
               service.isLoading ? 'bg-orange-100 text-orange-800' : ''
             ]"
          >
            <span v-if="service.isLoading">
              <Loading />
            </span>
            <span v-else>{{ $t(`pages.dashboard.status.${service.status}`) }}</span>
          </span>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Aucun style personnalisé, tout est en Tailwind */
</style>

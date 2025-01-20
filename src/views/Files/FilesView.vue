<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";

interface File {
  id: number;
  url: string;
  name: string;
}

const files = ref<File[]>([
  { id: 1, url: "/images/file1.jpg", name: "Vacances été 2023" },
  { id: 2, url: "/images/file2.jpg", name: "Rapport Q4" },
  { id: 3, url: "/images/file3.jpg", name: "Présentation client" },
  { id: 4, url: "/files/file4.pdf", name: "Design mockup" },
  { id: 5, url: "/files/file5.docx", name: "Documentation API" },
  { id: 6, url: "/images/file6.jpg", name: "Photos événement" },
  { id: 7, url: "/files/file7.xlsx", name: "Graphiques 2024" },
  { id: 8, url: "/files/file8.txt", name: "Logo final" },
  { id: 9, url: "/images/file9.jpg", name: "Maquette site" },
  { id: 10, url: "/files/file10.zip", name: "Planning 2024" },
  { id: 11, url: "/files/file11.pptx", name: "Budget prévisionnel" },
  { id: 12, url: "/files/file12.csv", name: "Organigramme" },
  { id: 13, url: "/files/file13.mp4", name: "Brief créatif" },
  { id: 14, url: "/files/file14.json", name: "Analyse données" },
  { id: 15, url: "/images/file15.jpg", name: "Template email" },
  { id: 16, url: "/files/file16.js", name: "Proposition commerciale" },
  { id: 17, url: "/images/file17.jpg", name: "Guide utilisateur" },
  { id: 18, url: "/files/file18.html", name: "Roadmap produit" }
]);

const search = ref<string>('');
const copiedFile = ref<number | null>(null);

const currentPage = computed(() => 10);
const total = computed(() => 10);
const perPage = computed(() => 10);

const handlePrev = async () => {
  // Logic to go to the previous page
};

const handleNext = async () => {
  // Logic to go to the next page
};

const handleRowClick = (e: MouseEvent, uuid: string) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    // Logic to handle row click
  }
};

const copyLink = async (fileId: number) => {
  try {
    const file = files.value.find(f => f.id === fileId);
    if (file) {
      const fullUrl = new URL(file.url, window.location.origin).toString();
      await navigator.clipboard.writeText(fullUrl);
      copiedFile.value = fileId;
      setTimeout(() => {
        copiedFile.value = null;
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
};

const getFileIcon = (extension: string) => {
  const iconsMap: Record<string, { icon: string, color: string }> = {
    jpg: { icon: 'file-image', color: 'text-blue-500' },
    jpeg: { icon: 'file-image', color: 'text-blue-500' },
    png: { icon: 'file-image', color: 'text-blue-500' },
    gif: { icon: 'file-image', color: 'text-blue-500' },
    webp: { icon: 'file-image', color: 'text-blue-500' },
    bmp: { icon: 'file-image', color: 'text-blue-500' },
    svg: { icon: 'file-image', color: 'text-blue-500' },
    pdf: { icon: 'file-pdf', color: 'text-red-500' },
    doc: { icon: 'file-word', color: 'text-blue-700' },
    docx: { icon: 'file-word', color: 'text-blue-700' },
    xls: { icon: 'file-excel', color: 'text-green-500' },
    xlsx: { icon: 'file-excel', color: 'text-green-500' },
    csv: { icon: 'file-excel', color: 'text-green-500' },
    txt: { icon: 'file-alt', color: 'text-gray-500' },
    zip: { icon: 'file-archive', color: 'text-yellow-500' },
    ppt: { icon: 'file-powerpoint', color: 'text-orange-500' },
    pptx: { icon: 'file-powerpoint', color: 'text-orange-500' },
    mp4: { icon: 'file-video', color: 'text-purple-500' },
    json: { icon: 'file-code', color: 'text-gray-700' },
    js: { icon: 'file-code', color: 'text-gray-700' },
    html: { icon: 'file-code', color: 'text-gray-700' },
    default: { icon: 'file', color: 'text-gray-400' }
  };
  return iconsMap[extension.toLowerCase()] || iconsMap.default;
};

onMounted(async () => {
  // Logic to mount the component
});

watch(search, (value) => {
  // Logic to watch search changes
});
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.files.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
          <ActionButton @action="" :label="$t('common.actions.add')" />
        </div>
      </div>

      <div class="flex flex-col rounded-lg bg-base-100 shadow-sm">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <h2 class="text-md font-medium">Tous les fichiers</h2>
          <p class="text-md font-semibold text-gray-400">{{ files.length }}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 p-4">
          <div
              v-for="file in files"
              :key="file.id"
              class="relative flex items-center justify-center w-full h-52 border rounded-lg overflow-hidden group"
          >
            <img
                v-if="isImage(file.url)"
                :src="file.url"
                :alt="file.name"
                class="absolute inset-0 w-full h-full object-cover"
                @error="file.url = getFileIcon(file.url).icon"
            />
            <font-awesome-icon
                v-else
                :icon="['fas', getFileIcon(file.url.split('.').pop() || '').icon]"
                :class="getFileIcon(file.url.split('.').pop() || '').color"
                class="absolute inset-0 w-1/2 h-1/2 m-auto"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-white text-center px-2">{{ file.name }}</p>
              <button
                  class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-200 rounded-lg shadow-md transition-colors"
                  @click.prevent="copyLink(file.id)"
              >
                <font-awesome-icon
                    v-if="copiedFile === file.id"
                    :icon="['fas', 'check']"
                    class="text-green-500 animate-check"
                />
                <font-awesome-icon
                    v-else
                    :icon="['fas', 'link']"
                    class="text-gray-600"
                />
                <span
                    class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300"
                >
                  {{ copiedFile === file.id ? 'Lien copié !' : 'Copier le lien' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CustomPagination
        :current-page="currentPage"
        :total="total"
        :per-page="perPage"
        @prev="handlePrev"
        @next="handleNext"
    />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

@keyframes check-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-check {
  animation: check-spin 0.5s ease-out;
}
</style>

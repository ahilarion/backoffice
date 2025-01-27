<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomTable from "@/components/table/CustomTable.vue";
import CustomRow from "@/components/table/CustomRow.vue";
import CustomRowItem from "@/components/table/CustomRowItem.vue";
import { useFAQStore } from "@/stores/faq";
import CustomHeaderItem from "@/components/table/CustomHeaderItem.vue";
import CustomHeader from "@/components/table/CustomHeader.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";
import { useRouter } from "vue-router";
import FAQCreationForm from "@/components/form/FAQCreationForm.vue";
import Modal from "@/components/modals/Modal.vue";

const router = useRouter();
const FAQStore = useFAQStore();
const search = ref<string>('');
const FAQ = computed(() => FAQStore.faq);
const isFaqCreationModalOpen = ref(false);

const currentPage = computed(() => FAQStore.pagination.currentPage);
const total = computed(() => FAQStore.pagination.total);
const perPage = computed(() => FAQStore.pagination.perPage);

const handlePrev = async () => {
  if (currentPage.value > 1) {
    await FAQStore.fetchFAQ(currentPage.value - 1);
  }
}

const handleNext = async () => {
  if (currentPage.value < FAQStore.pagination.totalPages) {
    await FAQStore.fetchFAQ(currentPage.value + 1);
  }
}

const handleRowClick = (e: MouseEvent, uuid: string) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    FAQStore.fetchFAQItem(uuid).then(() => {

    });
  }
}

const closeFaqCreationModal = () => {
  isFaqCreationModalOpen.value = false;
}

const openPermissionModal = () => {
  isFaqCreationModalOpen.value = true;
}

onMounted(async () => {
  await FAQStore.fetchFAQ(1);
})

watch(search, (value) => {
  FAQStore.fetchFAQ(1);
})
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.FAQ.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
          <ActionButton @action="openPermissionModal" :label="$t('common.actions.add')" />
        </div>
      </div>

      <CustomTable :title="$t('pages.FAQ.list.title')" :count="total" :loading="FAQStore.loading && isFaqCreationModalOpen">        <template #header>
        <CustomHeader>
          <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.FAQ.list.columns.question') }}</CustomHeaderItem>
          <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.FAQ.list.columns.createdAt') }}</CustomHeaderItem>
        </CustomHeader>
      </template>

        <template #body>
          <CustomRow
              v-for="FAQItem in FAQ"
              :key="FAQItem.id"
              class="cursor-pointer transition-all"
              :is-last="FAQItem === FAQ[FAQ.length - 1]"
              @click="handleRowClick($event, FAQItem.id)"
          >
            <CustomRowItem>{{ FAQItem.question }}</CustomRowItem>
            <CustomRowItem>{{ FAQItem.created_at }}</CustomRowItem>
          </CustomRow>
        </template>
      </CustomTable>
    </div>

    <CustomPagination
        :current-page="currentPage"
        :total="total"
        :per-page="perPage"
        @prev="handlePrev"
        @next="handleNext"
    />
  </div>
  <Modal v-bind:visible="isFaqCreationModalOpen" v-on:close="closeFaqCreationModal" :title="$t('modals.FAQCreate.title')">
    <FAQCreationForm @close="closeFaqCreationModal" />
  </Modal>
</template>

<style scoped>

</style>
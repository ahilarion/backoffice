<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomTable from "@/components/table/CustomTable.vue";
import CustomRow from "@/components/table/CustomRow.vue";
import CustomRowItem from "@/components/table/CustomRowItem.vue";
import { useArticlesStore } from "@/stores/articles";
import CustomHeaderItem from "@/components/table/CustomHeaderItem.vue";
import CustomHeader from "@/components/table/CustomHeader.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const articlesStore = useArticlesStore();
const search = ref<string>('');
const articles = computed(() => articlesStore.articles);

// Pagination computed properties
const currentPage = computed(() => articlesStore.pagination.currentPage);
const total = computed(() => articlesStore.pagination.total);
const perPage = computed(() => articlesStore.pagination.perPage);

const handlePrev = async () => {
  if (currentPage.value > 1) {
    await articlesStore.fetchArticles(currentPage.value - 1);
  }
}

const handleNext = async () => {
  if (currentPage.value < articlesStore.pagination.totalPages) {
    await articlesStore.fetchArticles(currentPage.value + 1);
  }
}

const handleRowClick = (e: MouseEvent, uuid: string) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    articlesStore.fetchArticle(uuid).then(() => {
      router.push(`/articles/${uuid}`);
    });
  }
}

const handleCreateAction = () => {
  router.push('/articles/create');
}

onMounted(async () => {
  await articlesStore.fetchArticles(1);
})

watch(search, (value) => {
  if (value) {
    console.log(value);
  } else {
    articlesStore.fetchArticles(1);
  }
})
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.articles.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
          <ActionButton @action="handleCreateAction" :label="$t('common.actions.create')" />
        </div>
      </div>

      <CustomTable :title="$t('pages.articles.list.title')" :count="total" :loading="articlesStore.loading">
        <template #header>
          <CustomHeader>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.articles.list.columns.title') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.articles.list.columns.slug') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.articles.list.columns.creationDate') }}</CustomHeaderItem>
          </CustomHeader>
        </template>

        <template #body>
          <CustomRow
              v-for="article in articles"
              :key="article.id"
              class="cursor-pointer hover:bg-gray-50 transition-all"
              :is-last="article === articles[articles.length - 1]"
              @click="handleRowClick($event, article.id)"
          >
            <CustomRowItem>{{ article.title }}</CustomRowItem>
            <CustomRowItem>{{ article.slug }}</CustomRowItem>
            <CustomRowItem>{{ article.created_at }}</CustomRowItem>
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
</template>

<style scoped>

</style>
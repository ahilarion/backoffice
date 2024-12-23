<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import Editor from "@tinymce/tinymce-vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import Modal from "@/components/modals/Modal.vue";
import ArticleCreationForm from "@/components/form/ArticleCreationForm.vue";
import { useArticlesStore } from "@/stores/articles";
import { useRouter } from "vue-router";
import ArticleDeletionForm from "@/components/form/ArticleDeletionForm.vue";
import ArticleEditionForm from "@/components/form/ArticleEditionForm.vue";

const articlesStore = useArticlesStore();
const savedEditorContent = computed(() => articlesStore.article?.content);
const editorContent = ref( '');
const isArticleEditionModalOpen = ref(false);
const isArticleDeletionModalOpen = ref(false);

const router = useRouter();

const articleId = ref(router.currentRoute.value.params.id as string);

const closeArticleEditionModal = () => {
  isArticleEditionModalOpen.value = false;
}

const openArticleEditionModal = () => {
  isArticleEditionModalOpen.value = true;
}

const openArticleDeletionModal = () => {
  isArticleDeletionModalOpen.value = true;
}

const closeArticleDeletionModal = () => {
  isArticleDeletionModalOpen.value = false;
}

onMounted(async () => {
  if (articleId.value && articlesStore.article === null) {
    await articlesStore.fetchArticle(articleId.value);
  }

  editorContent.value = savedEditorContent.value ?? '';
})

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-3xl font-semibold">{{ $t('pages.articles.create.title') }}</h1>
      <div class="flex flex-wrap gap-4">
        <ActionButton @action="openArticleDeletionModal" :label="$t('common.actions.delete')" red/>
        <ActionButton @action="openArticleEditionModal" :label="$t('common.actions.save')" />
      </div>
    </div>
    <Editor
        api-key="nv2xr3nlmsh4pzunsp7t5cl2b3qan3fyc7enmpg5x2llqowg"
        class="min-h-[calc(100vh-180px)]"
        v-model="editorContent"
        :init="{
            plugins: 'lists link image table code wordcount',
            language: 'fr_FR',
          }"
    />
  </div>
  <Modal v-bind:visible="isArticleEditionModalOpen" v-on:close="closeArticleEditionModal" :title="$t('modals.articleEdit.title')">
    <ArticleEditionForm @close="closeArticleEditionModal" :article-content="editorContent" />
  </Modal>
  <Modal v-bind:visible="isArticleDeletionModalOpen" v-on:close="closeArticleDeletionModal" :title="$t('modals.articleDelete.title')">
    <ArticleDeletionForm @close="closeArticleDeletionModal" />
  </Modal>

</template>

<style scoped>

</style>
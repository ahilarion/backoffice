<script setup lang="ts">
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import Modal from "@/components/modals/Modal.vue";
import ArticleCreationForm from "@/components/form/ArticleCreationForm.vue";

const editorContent = ref('');
const isArticleCreationModalOpen = ref(false);

const closeArticleCreationModal = () => {
  isArticleCreationModalOpen.value = false;
}

const openArticleCreationModal = () => {
  isArticleCreationModalOpen.value = true;
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-3xl font-semibold">{{ $t('pages.articles.create.title') }}</h1>
      <div class="flex flex-wrap gap-4">
        <ActionButton @action="openArticleCreationModal" :label="$t('common.actions.create')" />
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
  <Modal v-bind:visible="isArticleCreationModalOpen" v-on:close="closeArticleCreationModal" :title="$t('modals.articleCreate.title')">
    <ArticleCreationForm @close="closeArticleCreationModal" :article-content="editorContent" />
  </Modal>
</template>

<style scoped>

</style>
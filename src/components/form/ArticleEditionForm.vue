<script setup lang="ts">
import {ref, defineEmits, computed, onMounted} from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useArticlesStore } from "@/stores/articles";
import { useRouter } from "vue-router";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import FormCheckbox from "@/components/form/FormCheckbox.vue";

const props = defineProps<{
  articleContent: string;
}>();

const articlesStore = useArticlesStore();

const router = useRouter();
const articleId = ref(router.currentRoute.value.params.id as string);
const article = computed(() => articlesStore.article);
const articleTitle = ref("");
const articleShortDescription = ref("");
const articleThumbnail = ref("");
const publishArticle = ref(false);

const errorEmptyArticle = ref(false);

const emit = defineEmits(["close"]);

const handleSubmit = async () => {
  if(props.articleContent.length === 0) {
    errorEmptyArticle.value = true;
    return;
  }

  await articlesStore.updateArticle(articleId.value, {
    title: articleTitle.value.trim(),
    short_description: articleShortDescription.value.trim(),
    thumbnail: articleThumbnail.value.trim(),
    content: props.articleContent,
    is_published: publishArticle.value
  }).then(() => {
    emit("close");
    router.push('/articles');
  })
};

const checkIfValidImage = computed(() => {
  return articleThumbnail.value.match(/\.(jpeg|jpg|gif|png)$/) != null;
});

onMounted(() => {
  articleTitle.value = article.value?.title ?? "";
  articleShortDescription.value = article.value?.short_description ?? "";
  articleThumbnail.value = article.value?.thumbnail ?? "";
  publishArticle.value = !!article.value?.is_published;
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormInput
        :label="$t('modals.articleEdit.form.title')"
        v-model="articleTitle"
        required
        max="64"
        :placeholder="$t('modals.articleEdit.form.titlePlaceholder')"
        type="text"
      />

      <FormInput
        :label="$t('modals.articleEdit.form.thumbnail')"
        v-model="articleThumbnail"
        required
        max="255"
        :placeholder="$t('modals.articleEdit.form.thumbnailPlaceholder')"
        type="text"
      />

      <div v-if="checkIfValidImage" class="flex justify-center">
        <img :src="articleThumbnail" alt="Thumbnail" class="w-1/2" />
      </div>

      <FormInput
          :label="$t('modals.articleEdit.form.shortDescription')"
          v-model="articleShortDescription"
          required
          max="255"
          :placeholder="$t('modals.articleEdit.form.shortDescriptionPlaceholder')"
          type="textarea"
      />

      <FormCheckbox
          :label="$t('modals.articleEdit.form.publish')"
          v-model="publishArticle"
      />

      <!-- Error message -->
      <transition name="error-transition">
        <div v-if="articlesStore.$state.error" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.roles.roleAlreadyExists') }}</span>
          </p>
        </div>
      </transition>

      <transition name="error-transition">
        <div v-if="errorEmptyArticle" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ $t('errors.articles.articleIsEmpty') }}</span>
          </p>
        </div>
      </transition>

      <!-- Submit button -->
      <FormSubmitButton
        :label="$t('modals.articleEdit.form.submit')"
        :loading="articlesStore.loading"
      />
    </form>
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
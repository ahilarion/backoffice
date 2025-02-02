<script setup lang="ts">
import { ref, defineEmits, watch, onMounted, computed } from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { useProductsStore } from "@/stores/products";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import ActionButton from "@/components/commons/ActionButton.vue";

const productsStore = useProductsStore();

const product = computed(() => productsStore.product);
const currentStep = ref(1);
const name = ref("");
const brand = ref("");
const type = ref("");
const model = ref("");
const dimensions = ref("");
const weight = ref("");
const certifications = ref("");
const thumbnail_url = ref("");
const formError = ref<string | null>(null);
const imagePreview = ref<string | null>(null);

const emit = defineEmits(["close"]);

const nextStep = () => {
  currentStep.value++;
};

const previousStep = () => {
  currentStep.value--;
};

const handleSubmit = async () => {
  formError.value = null;

  if (!name.value.trim() || !brand.value.trim() || !type.value.trim()) {
    formError.value = "Name, brand, and type are required.";
    return;
  }

  await productsStore.updateProduct(product.value?.id as string, {
    name: name.value.trim(),
    brand: brand.value.trim(),
    type: type.value.trim(),
    model: model.value.trim(),
    dimensions: dimensions.value.trim(),
    weight: weight.value.trim(),
    certifications: certifications.value.trim(),
    thumbnail_url: thumbnail_url.value.trim(),
  }).then(() => {
    productsStore.fetchProducts(productsStore.pagination.currentPage);
    emit("close");
  }).catch((error) => {
    formError.value = error.message;
  });
};

const deleteProduct = async () => {
  if (product.value) {
    await productsStore.deleteProduct(product.value.id).then(() => {
      productsStore.fetchProducts(productsStore.pagination.currentPage);
      emit("close");
    }).catch((error) => {
      formError.value = error.message;
    });
  }
};

onMounted(() => {
  if(product.value) {
    name.value = product.value.name;
    brand.value = product.value.brand;
    type.value = product.value.type;
    model.value = product.value.model;
    dimensions.value = product.value.dimensions;
    weight.value = product.value.weight;
    certifications.value = product.value.certifications;
    thumbnail_url.value = product.value.thumbnail_url;
  }
});

watch(thumbnail_url, (newUrl) => {
  if (newUrl) {
    imagePreview.value = newUrl;
  } else {
    imagePreview.value = null;
  }
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div v-if="currentStep === 1" class="flex flex-col gap-4">
        <FormInput
            :label="$t('modals.productEdit.form.name')"
            v-model="name"
            required
            max="64"
            :placeholder="$t('modals.productEdit.form.namePlaceholder')"
            type="text"
        />
        <FormInput
            :label="$t('modals.productEdit.form.brand')"
            v-model="brand"
            required
            max="64"
            :placeholder="$t('modals.productEdit.form.brandPlaceholder')"
            type="text"
        />
        <FormInput
            :label="$t('modals.productEdit.form.type')"
            v-model="type"
            required
            max="64"
            :placeholder="$t('modals.productEdit.form.typePlaceholder')"
            type="text"
        />
        <div class="flex gap-4">
          <ActionButton red :label="$t('common.actions.delete')" @click="deleteProduct" />
          <ActionButton :label="$t('common.pagination.next')" @click="nextStep" />
        </div>
      </div>

      <div v-if="currentStep === 2" class="flex flex-col gap-4">
        <FormInput
            :label="$t('modals.productEdit.form.model')"
            v-model="model"
            max="64"
            :placeholder="$t('modals.productEdit.form.modelPlaceholder')"
            type="text"
        />
        <FormInput
            :label="$t('modals.productEdit.form.dimensions')"
            v-model="dimensions"
            max="64"
            :placeholder="$t('modals.productEdit.form.dimensionsPlaceholder')"
            type="text"
        />
        <FormInput
            :label="$t('modals.productEdit.form.weight')"
            v-model="weight"
            max="64"
            :placeholder="$t('modals.productEdit.form.weightPlaceholder')"
            type="text"
        />
        <FormInput
            :label="$t('modals.productEdit.form.certification')"
            v-model="certifications"
            max="64"
            :placeholder="$t('modals.productEdit.form.certificationPlaceholder')"
            type="text"
        />
        <div class="flex gap-4">
          <ActionButton :label="$t('common.pagination.previous')" @click="previousStep" white />
          <ActionButton :label="$t('common.pagination.next')" @click="nextStep" />
        </div>
      </div>

      <div v-if="currentStep === 3" class="flex flex-col gap-4">
        <FormInput
            :label="$t('modals.productEdit.form.thumbnailUrl')"
            v-model="thumbnail_url"
            max="256"
            :placeholder="$t('modals.productEdit.form.thumbnailUrlPlaceholder')"
            type="text"
        />
        <div v-if="imagePreview" class="mt-4">
          <img :src="imagePreview" alt="Thumbnail Preview" class="max-w-full h-auto rounded-md" />
        </div>
        <div class="flex gap-4">
          <ActionButton :label="$t('common.pagination.previous')" @click="previousStep" white />
          <FormSubmitButton
              :label="$t('modals.productEdit.form.submit')"
              :loading="productsStore.loading"
          />
        </div>
      </div>

      <!-- Error message -->
      <transition name="error-transition">
        <div v-if="formError" class="bg-error p-2 rounded-md bg-opacity-10 overflow-hidden">
          <p>
            <XMarkIcon class="h-5 w-5 inline-block text-error" />
            <span class="text-sm text-error">{{ formError }}</span>
          </p>
        </div>
      </transition>
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
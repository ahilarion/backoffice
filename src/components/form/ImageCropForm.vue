<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import ActionButton from "@/components/commons/ActionButton.vue";

const emit = defineEmits(['close', 'crop']);
const props = defineProps<{ imageFile: File | null }>();
const cropper = ref<Cropper | null>(null);

const loadImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imageElement = document.getElementById('image-to-crop') as HTMLImageElement;
    imageElement.src = e.target?.result as string;
    if (cropper.value) {
      cropper.value.destroy();
    }
    cropper.value = new Cropper(imageElement, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      cropBoxResizable: false,
      cropBoxMovable: false,
      dragMode: 'move',
      center: true,
      background: false,
      zoomable: true, // Permet de zoomer si nécessaire
      scalable: true, // Permet de redimensionner l'image
    });
  };
  reader.readAsDataURL(file);
};

watch(() => props.imageFile, (newFile) => {
  if (newFile) {
    loadImage(newFile);
  }
});

const handleCrop = () => {
  if (cropper.value) {
    const canvas = cropper.value.getCroppedCanvas({
      width: 256,
      height: 256,
    });
    emit('crop', canvas.toDataURL('image/png'));
    cropper.value.destroy();
    cropper.value = null;
    emit('close');
  }
};

onMounted(() => {
  if (props.imageFile) {
    loadImage(props.imageFile);
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 items-start rounded-lg max-w-xl mx-auto">
    <div class="size-[400px] relative rounded-lg overflow-hidden">
      <img
          id="image-to-crop"
          class="absolute inset-0 object-contain w-full h-full"
          alt="Image to crop"
      />
    </div>
    <ActionButton
        :label="$t('common.actions.crop')"
        @click="handleCrop"
    />
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomTable from "@/components/table/CustomTable.vue";
import CustomRow from "@/components/table/CustomRow.vue";
import CustomRowItem from "@/components/table/CustomRowItem.vue";
import { usePermissionsStore } from "@/stores/permissions";
import CustomHeaderItem from "@/components/table/CustomHeaderItem.vue";
import CustomHeader from "@/components/table/CustomHeader.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";
import { useRouter } from "vue-router";
import PermissionCreationForm from "@/components/form/PermissionCreationForm.vue";
import Modal from "@/components/modals/Modal.vue";

const router = useRouter();
const permissionsStore = usePermissionsStore();
const search = ref<string>('');
const permissions = computed(() => permissionsStore.permissions);
const isPermissionModalOpen = ref(false);

const currentPage = computed(() => permissionsStore.pagination.currentPage);
const total = computed(() => permissionsStore.pagination.total);
const perPage = computed(() => permissionsStore.pagination.perPage);

const handlePrev = async () => {
  if (currentPage.value > 1) {
    await permissionsStore.fetchPermissions(currentPage.value - 1);
  }
}

const handleNext = async () => {
  if (currentPage.value < permissionsStore.pagination.totalPages) {
    await permissionsStore.fetchPermissions(currentPage.value + 1);
  }
}

const handleRowClick = (e: MouseEvent, uuid: string) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    permissionsStore.fetchPermission(uuid).then(() => {

    });
  }
}

const closePermissionModal = () => {
  isPermissionModalOpen.value = false;
}

const openPermissionModal = () => {
  isPermissionModalOpen.value = true;
}

onMounted(async () => {
  await permissionsStore.fetchPermissions(1);
})

watch(search, (value) => {
  permissionsStore.fetchPermissions(1, value);
})
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.permissions.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
          <ActionButton @action="openPermissionModal" :label="$t('common.actions.add')" />
        </div>
      </div>

      <CustomTable :title="$t('pages.permissions.list.title')" :count="total" :loading="permissionsStore.loading && isPermissionModalOpen">        <template #header>
          <CustomHeader>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.permissions.list.columns.id') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.permissions.list.columns.name') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.permissions.list.columns.createdAt') }}</CustomHeaderItem>
          </CustomHeader>
        </template>

        <template #body>
          <CustomRow
              v-for="permission in permissions"
              :key="permission.id"
              class="cursor-pointer transition-all"
              :is-last="permission === permissions[permissions.length - 1]"
              @click="handleRowClick($event, permission.id)"
          >
            <CustomRowItem>{{ permission.id }}</CustomRowItem>
            <CustomRowItem>{{ permission.name }}</CustomRowItem>
            <CustomRowItem>{{ permission.created_at }}</CustomRowItem>
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
  <Modal v-bind:visible="isPermissionModalOpen" v-on:close="closePermissionModal" :title="$t('modals.permissionCreate.title')">
    <PermissionCreationForm @close="closePermissionModal" />
  </Modal>
</template>

<style scoped>

</style>
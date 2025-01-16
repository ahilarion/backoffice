<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomTable from "@/components/table/CustomTable.vue";
import CustomRow from "@/components/table/CustomRow.vue";
import CustomRowItem from "@/components/table/CustomRowItem.vue";
import { useRolesStore } from "@/stores/roles";
import CustomHeaderItem from "@/components/table/CustomHeaderItem.vue";
import CustomHeader from "@/components/table/CustomHeader.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";
import { useRouter } from "vue-router";
import RoleCreationForm from "@/components/form/RoleCreationForm.vue";
import Modal from "@/components/modals/Modal.vue";

const router = useRouter();
const rolesStore = useRolesStore();
const search = ref<string>('');
const roles = computed(() => rolesStore.roles);
const isRoleModalOpen = ref(false);

const currentPage = computed(() => rolesStore.pagination.currentPage);
const total = computed(() => rolesStore.pagination.total);
const perPage = computed(() => rolesStore.pagination.perPage);

const handlePrev = async () => {
  if (currentPage.value > 1) {
    await rolesStore.fetchRoles(currentPage.value - 1);
  }
}

const handleNext = async () => {
  if (currentPage.value < rolesStore.pagination.totalPages) {
    await rolesStore.fetchRoles(currentPage.value + 1);
  }
}

const handleRowClick = (e: MouseEvent, uuid: string) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    rolesStore.fetchRole(uuid).then(() => {
      router.push(`/roles/${uuid}`);
    });
  }
}

const closeRoleModal = () => {
  isRoleModalOpen.value = false;
}

const openRoleModal = () => {
  isRoleModalOpen.value = true;
}

onMounted(async () => {
  await rolesStore.fetchRoles(1);
})

watch(search, (value) => {
  if (value) {
    console.log(value);
  } else {
    rolesStore.fetchRoles(1);
  }
})
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.roles.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
          <ActionButton @action="openRoleModal" :label="$t('common.actions.add')" />
        </div>
      </div>

      <CustomTable :title="$t('pages.users.list.title')" :count="total" :loading="rolesStore.loading && isRoleEditModalOpen">
        <template #header>
          <CustomHeader>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">ID</CustomHeaderItem>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">Name</CustomHeaderItem>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">Created at</CustomHeaderItem>
          </CustomHeader>
        </template>

        <template #body>
          <CustomRow
              v-for="role in roles"
              :key="role.id"
              class="cursor-pointer hover:bg-gray-50 transition-all"
              :is-last="role === roles[roles.length - 1]"
              @click="handleRowClick($event, role.id)"
          >
            <CustomRowItem>{{ role.id }}</CustomRowItem>
            <CustomRowItem>{{ role.name }}</CustomRowItem>
            <CustomRowItem>{{ role.created_at }}</CustomRowItem>
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
  <Modal v-bind:visible="isRoleModalOpen" v-on:close="closeRoleModal" :title="$t('modals.roleCreate.title')">
    <RoleCreationForm @close="closeRoleModal" />
  </Modal>
</template>

<style scoped>

</style>
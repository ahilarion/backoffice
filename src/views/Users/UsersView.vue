<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomTable from "@/components/table/CustomTable.vue";
import CustomRow from "@/components/table/CustomRow.vue";
import CustomRowItem from "@/components/table/CustomRowItem.vue";
import { useUsersStore } from "@/stores/users";
import CustomHeaderItem from "@/components/table/CustomHeaderItem.vue";
import CustomHeader from "@/components/table/CustomHeader.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsersStore();
const search = ref<string>('');
const users = computed(() => usersStore.users);

// Pagination computed properties
const currentPage = computed(() => usersStore.pagination.currentPage);
const total = computed(() => usersStore.pagination.total);
const perPage = computed(() => usersStore.pagination.perPage);

const handleAction = () => {
  console.log('Action clicked');
}

const handlePrev = async () => {
  if (currentPage.value > 1) {
    await usersStore.fetchUsers(currentPage.value - 1);
  }
}

const handleNext = async () => {
  if (currentPage.value < usersStore.pagination.totalPages) {
    await usersStore.fetchUsers(currentPage.value + 1);
  }
}

const handleRowClick = (e: MouseEvent, uuid: string) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    router.push(`/users/${uuid}`);
  }
}

// Function to determine styling based on role
const getRoleClass = (roles: string[]) => {
  if (roles.includes("admin")) {
    return "bg-red-100 text-red-800";
  } else if (roles.includes("user")) {
    return "bg-green-100 text-green-800";
  }
  return "bg-gray-100 text-gray-800"; // Default class for other roles
}

onMounted(async () => {
  await usersStore.fetchUsers(1);
})

watch(search, (value) => {
  if (value) {
    console.log(value);
  } else {
    usersStore.fetchUsers(1);
  }
})
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">{{ $t('pages.users.title') }}</h1>
        <div class="flex flex-wrap gap-4">
          <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
          <ActionButton @action="handleAction" :label="$t('common.actions.add')" />
        </div>
      </div>

      <CustomTable :title="$t('pages.users.list.title')" :count="total" :loading="usersStore.loading">
        <template #header>
          <CustomHeader>
            <CustomHeaderItem class="w-3/12 min-w-[200px]">
              {{ $t('pages.users.list.columns.name') }}
            </CustomHeaderItem>
            <CustomHeaderItem class="w-4/12 min-w-[200px]">
              {{ $t('pages.users.list.columns.email') }}
            </CustomHeaderItem>
            <CustomHeaderItem class="w-1/12">
              {{ $t('pages.users.list.columns.roles') }}
            </CustomHeaderItem>
          </CustomHeader>
        </template>

        <template #body>
          <CustomRow
              v-for="user in users"
              :key="user.id"
              class="cursor-pointer transition-all"
              :is-last="user === users[users.length - 1]"
              @click="handleRowClick($event, user.id)"
          >
            <CustomRowItem class="text-gray-800 font-medium flex items-center gap-2">
              <img
                  v-if="user.profile_picture"
                  :src="user.profile_picture"
                  alt="avatar"
                  class="w-8 h-8 rounded-full"
              />
              <img
                  v-else
                  src="../../assets/profile.png"
                  alt="avatar"
                  class="w-8 h-8 rounded-full"
              />
              {{ user.first_name }} {{ user.last_name }}
            </CustomRowItem>
            <CustomRowItem>
              <a
                  :href="`mailto:${user.email}`"
                  class="text-blue-500 hover:underline"
              >
                {{ user.email }}
              </a>
            </CustomRowItem>
            <CustomRowItem>
              <span
                  :class="getRoleClass(user.roles as string[])"
                  class="px-2 py-1 rounded-full"
              >
                {{ user.roles?.join(', ') }}
              </span>
            </CustomRowItem>
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
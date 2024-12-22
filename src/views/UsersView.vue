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
            <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.users.list.columns.name') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-4/12 min-w-[200px]">{{ $t('pages.users.list.columns.email') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-1/12">{{ $t('pages.users.list.columns.orders') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-2/12">{{ $t('pages.users.list.columns.lastOrder') }}</CustomHeaderItem>
            <CustomHeaderItem class="w-2/12">{{ $t('pages.users.list.columns.totalSpent') }}</CustomHeaderItem>
          </CustomHeader>
        </template>

        <template #body>
          <CustomRow
              v-for="user in users"
              :key="user.id"
              class="cursor-pointer hover:bg-gray-50 transition-all"
              :is-last="user === users[users.length - 1]"
              @click="handleRowClick($event, user.id)"
          >
            <CustomRowItem class="text-gray-800 font-medium flex items-center gap-2">
              <img src="@/assets/profile.png"
                   alt="avatar"
                   class="w-8 h-8 rounded-full"
              />
              {{ user.first_name }} {{ user.last_name }}
            </CustomRowItem>
            <CustomRowItem>
              <a :href="`mailto:${user.email}`" class="text-blue-500 hover:underline">{{ user.email }}</a>
            </CustomRowItem>
            <CustomRowItem>10</CustomRowItem>
            <CustomRowItem>
              <router-link :to="`/orders/${user.id}`" class="text-blue-500 hover:underline">
                #1554
              </router-link>
            </CustomRowItem>
            <CustomRowItem class="text-green-500 font-medium">${{ Math.floor(Math.random() * 999) }}</CustomRowItem>
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
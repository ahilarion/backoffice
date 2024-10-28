<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { watch } from "vue";
import SearchInput from "@/components/commons/SearchInput.vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import CustomTable from "@/components/table/CustomTable.vue";
import CustomRow from "@/components/table/CustomRow.vue";
import CustomRowItem from "@/components/table/CustomRowItem.vue";
import { useCustomerStore } from "@/stores/customer";
import CustomHeaderItem from "@/components/table/CustomHeaderItem.vue";
import CustomHeader from "@/components/table/CustomHeader.vue";
import CustomPagination from "@/components/table/CustomPagination.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const customerStore = useCustomerStore();
const search = ref<string>('');
const customers = ref<any[]>([]);
const currentPage = ref<number>(1);
const perPage = 12;
const total = 100;

const handleAction = () => {
  console.log('Action clicked');
}

const handlePrev = () => {
  currentPage.value -= 1;
}

const handleNext = () => {
  currentPage.value += 1;
}

const handleRowClick = (e: MouseEvent, uuid) => {
  if ((e.target as HTMLElement).tagName !== 'A') {
    router.push(`/customers/${uuid}`);
  }
}

onMounted(() => {
  customerStore.fetchCustomers().then((data) => {
    customers.value = customerStore.customers;
  });
})

watch(search, (value) => {
  if (value) {
    console.log(value);
  } else {
    console.log('Search cleared');
  }
})

</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-3xl font-semibold">{{ $t('pages.customers.title') }}</h1>
      <div class="flex flex-wrap gap-4">
        <SearchInput v-model="search" :placeholder="$t('common.actions.search')" />
        <ActionButton @action="handleAction" :label="$t('common.actions.add')" />
      </div>
    </div>
    <CustomTable :title="$t('pages.customers.list.title')" :count="customers.length" :loading="customerStore.loading">
      <template #header>
        <CustomHeader>
          <CustomHeaderItem class="w-3/12 min-w-[200px]">{{ $t('pages.customers.list.columns.name') }}</CustomHeaderItem>
          <CustomHeaderItem class="w-4/12 min-w-[200px]">{{ $t('pages.customers.list.columns.email') }}</CustomHeaderItem>
          <CustomHeaderItem class="w-1/12">{{ $t('pages.customers.list.columns.orders') }}</CustomHeaderItem>
          <CustomHeaderItem class="w-2/12">{{ $t('pages.customers.list.columns.lastOrder') }}</CustomHeaderItem>
          <CustomHeaderItem class="w-2/12">{{ $t('pages.customers.list.columns.totalSpent') }}</CustomHeaderItem>
        </CustomHeader>
      </template>
      <template #body>
        <CustomRow class="cursor-pointer hover:bg-gray-50 transition-all"
                   v-for="customer in customers" :key="customer.name" :is-last="customer === customers[customers.length - 1]" @click="handleRowClick($event, customer.login.uuid)">
          <CustomRowItem class="text-gray-800 font-medium flex items-center gap-2">
            <img :src="customer.picture.thumbnail" alt="avatar" class="w-8 h-8 rounded-full" />
            {{ customer.name.first }} {{ customer.name.last }}
          </CustomRowItem>
          <CustomRowItem>
            <a :href="`mailto:${customer.email}`" class="text-blue-500 hover:underline">{{ customer.email }}</a>
          </CustomRowItem>
          <CustomRowItem>{{ customer.dob.age }}</CustomRowItem>
          <CustomRowItem>
            <router-link :to="`/orders/${customer.login.uuid}`" class="text-blue-500 hover:underline">
              #{{ Math.floor(Math.random() * 99999) }}
            </router-link>
          </CustomRowItem>
          <CustomRowItem class="text-green-500 font-medium">${{ Math.floor(Math.random() * 999) }}</CustomRowItem>
        </CustomRow>
      </template>
    </CustomTable>
    <CustomPagination @prev="handlePrev" @next="handleNext" :current-page="currentPage" :total="total" :per-page="perPage" />
  </div>
</template>

<style scoped>

</style>
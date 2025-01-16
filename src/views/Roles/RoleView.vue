<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import ActionButton from "@/components/commons/ActionButton.vue";
import Loading from "@/components/icons/Loading.vue";
import { useRolesStore } from "@/stores/roles";
import { usePermissionsStore } from "@/stores/permissions";
import { useRouter } from "vue-router";
import FormInput from "@/components/form/FormInput.vue";
import Modal from "@/components/modals/Modal.vue";
import RoleEditionForm from "@/components/form/RoleEditionForm.vue";
import RoleDeletionForm from "@/components/form/RoleDeletionForm.vue";

const router = useRouter();
const rolesStore = useRolesStore();
const permissionsStore = usePermissionsStore();

const role = computed(() => rolesStore.role);
const permissions = computed(() => permissionsStore.permissions);
const roleID = <string>router.currentRoute.value.params.id;
const roleName = ref<string>(""); // Stocke le nom modifiable
const selectedPermissions = ref<string[]>([]); // Permissions sélectionnées

const sortedPermissions = computed(() => {
  const groupedPermissions: Record<string, string[]> = {};
  permissions.value.forEach(permission => {
    const [category, ...rest] = permission.name.split('.');
    if (!groupedPermissions[category]) {
      groupedPermissions[category] = [];
    }
    groupedPermissions[category].push(rest.join('.'));
  });
  return groupedPermissions;
});

const isLoading = ref(false);

const isRoleEditionModalOpen = ref(false);
const isRoleDeletionModalOpen = ref(false);

const closeRoleEditionModal = () => {
  isRoleEditionModalOpen.value = false;
};

const openRoleEditionModal = () => {
  isRoleEditionModalOpen.value = true;
};

const closeRoleDeletionModal = () => {
  isRoleDeletionModalOpen.value = false;
};

const openRoleDeletionModal = () => {
  isRoleDeletionModalOpen.value = true;
};

onMounted(async () => {
  isLoading.value = true;
  try {
    if (role.value === null) {
      await rolesStore.fetchRole(roleID);
    }

    if (permissions.value.length === 0) {
      await permissionsStore.fetchAllPermissions();
    }

    roleName.value = role.value?.name || "";
    selectedPermissions.value = role.value?.permissions || [];
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col justify-between gap-8 min-h-[calc(100vh-128px)]">
    <div v-if="isLoading" class="w-full min-h-screen flex justify-center items-center">
      <Loading />
    </div>
    <div v-else>
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h1 class="text-3xl font-semibold">{{ $t('pages.role.title') }}</h1>
          <div class="flex flex-wrap gap-4">
            <ActionButton @action="router.push('/roles')" white :label="$t('common.actions.back')" />
            <ActionButton @action="openRoleDeletionModal" :label="$t('common.actions.delete')" red />
            <ActionButton @action="openRoleEditionModal" :label="$t('common.actions.save')" />
          </div>
        </div>

        <div class="flex flex-col rounded-lg bg-base-100 shadow-sm">
          <form class="flex flex-col gap-4 p-4">
            <FormInput
                v-model="roleName"
                label="Name"
                placeholder="Enter role name"
                type="text"
                required
            />

            <label for="permissions" class="block text-sm text-gray-700 font-medium capitalize">
              Permissions
            </label>

            <div class="flex flex-wrap gap-12">
              <div
                  v-for="(perms, category) in sortedPermissions"
                  :key="category"
                  class="flex flex-col gap-4"
              >
                <h3 class="font-semibold text-lg border-b border-gray-200 pb-2">{{ category }}</h3>
                <div v-for="perm in perms" :key="perm" class="flex items-center gap-2">
                  <input
                      type="checkbox"
                      :id="`${category}.${perm}`"
                      :value="`${category}.${perm}`"
                      v-model="selectedPermissions"
                  />
                  <label :for="`${category}.${perm}`" class="ml-2 text-sm">
                    {{ perm }}
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <Modal v-bind:visible="isRoleEditionModalOpen" v-on:close="closeRoleEditionModal" :title="$t('modals.roleEdit.title')">
    <RoleEditionForm @close="closeRoleEditionModal" :role-name="roleName" :selected-permissions="selectedPermissions" />
  </Modal>
  <Modal v-bind:visible="isRoleDeletionModalOpen" v-on:close="closeRoleDeletionModal" :title="$t('modals.roleDelete.title')">
    <RoleDeletionForm @close="closeRoleDeletionModal"/>
  </Modal>
</template>

<style scoped>
/* Amélioration de la présentation des catégories */
h3 {
  color: #4b5563; /* Couleur grise pour le titre */
}
label {
  color: #374151; /* Texte légèrement plus sombre */
}
</style>
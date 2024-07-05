<template>
  <PageHeader :show-back-btn="true" back-link="adminSettingRoleList" page-title='Create Role'
              :bread-crumbs="[
      {
        url: 'adminSettingRoleList',
        name:'Role'
      }
]"/>

  <RoleForm :loading="loading" @on-submit="onSubmit" :endTask="endTask" />

</template>



<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import RoleForm from "@/components/forms/RoleForm.vue";
import { toRef } from "vue";
import {useRoles} from "@/stores/roles"
import { storeToRefs } from "pinia";



const roleStore = useRoles()
const {loading, endTask} = storeToRefs(roleStore)


 async function onSubmit(values: any) {
  const refss = toRef(values)
  await roleStore.createRole(refss.value)
}


</script>
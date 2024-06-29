<template>
  <PageHeader :show-back-btn="true" back-link="adminSettingRoleList" page-title='Create Role'
              :bread-crumbs="[
      {
        url: 'adminSettingRoleList',
        name:'Role'
      }
]"/>

  <RoleForm :form="form"  :loading="false" @on-submit="onSubmit"/>

</template>
<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import RoleForm from "@/components/forms/RoleForm.vue";
import {useForm} from "vee-validate";




const form = useForm({

})





const onSubmit = form.handleSubmit(async (values:any) => {
 console.log('submit', values)
})



</script>
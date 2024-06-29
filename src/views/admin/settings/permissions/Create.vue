<template>
  <PageHeader :show-back-btn="true" back-link="adminSettingPermissionList" page-title='Create Permission'
              :bread-crumbs="[
      {
        url: 'adminSettingPermissionList',
        name:'Permissions'
      }
]"/>
  <PermissionForm :form="form" :loading="loading" @on-submit="onSubmit" />
</template>


<script setup lang="ts">
  import PermissionForm from "@/components/forms/PermissionForm.vue";
  import {useForm} from "vee-validate";
  import PageHeader from "@/components/PageHeader.vue";
  import {usePermissionStore} from "@/stores/permissions.ts"
  import {storeToRefs} from "pinia";
  import {formHandleSchema} from "@/validation/permissions.ts";
  import { toTypedSchema } from '@vee-validate/zod';

  const form = useForm({
    initialValues:{
      name: '',
      methods:[]
    },
    validationSchema: toTypedSchema(formHandleSchema),
  })
  const store = usePermissionStore()
  const {loading} = storeToRefs(store)

  const onSubmit = form.handleSubmit(async (values:any) => {
      await store.createNewPermission(values);
      form.handleReset()
  })
</script>
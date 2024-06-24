<template>
  <PageHeader :show-back-btn="true" back-link="adminBrands" page-title='Create Brand'
              :bread-crumbs="[
      {
        url: 'adminBrands',
        name:'Brands'
      }
]"/>
    <BrandForm :loading="loading"  @submit="onSubmit" :form="form" />

</template>

<script setup lang="ts">
import { useBrandStore } from '@/stores/brand'
import { storeToRefs } from 'pinia'
const brandStore = useBrandStore()
const { loading } = storeToRefs(brandStore)

import BrandForm from  "@/components/forms/BrandForm.vue"

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import PageHeader from "@/components/PageHeader.vue";



const formSchema = toTypedSchema(z.object({
  name: z.string().min(5, {message: "Name at least 5 char"}).max(50),
  description:z.string().optional()
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values:any) => {
  await brandStore.createNewBrand(values);
  form.resetForm()
})



</script>
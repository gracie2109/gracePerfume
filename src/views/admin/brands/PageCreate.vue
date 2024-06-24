<template>
  <div>
    <BrandForm :loading="loading"  @submit="onSubmit" :form="form" />
  </div>
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
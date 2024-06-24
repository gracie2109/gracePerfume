<template>
  <BrandForm :form="form" :loading="loading"  />
  {{form}}
  {{detailBrand}}
</template>

<script setup lang="ts">
import { useBrandStore } from '@/stores/brand'
import { storeToRefs } from 'pinia'
import BrandForm from "@/components/forms/BrandForm.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
const brandStore = useBrandStore()
const { loading, detailBrand } = storeToRefs(brandStore)

const route = useRoute()
const formSchema = toTypedSchema(z.object({
  name: z.string().min(5, {message: "Name at least 5 char"}).max(50),
  description:z.string().optional()
}))


const form = useForm({
  validationSchema: formSchema,
  initialValues: detailBrand.value || {},
})


onMounted(() => {
  brandStore.getDetailBrand(String(route.params.id))
})

</script>
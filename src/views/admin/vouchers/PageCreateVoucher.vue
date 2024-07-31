<template>
  <PageHeader :show-back-btn="true" back-link="vouchers" page-title='Create Vouchers'
              :bread-crumbs="[
      {
        url: 'vouchers',
        name:'Vouchers'
      }
]"/>

  <VoucherForm :form="form" :description="description" @on-submit="onSubmit" :loading="loading"/>



</template>

<script lang="ts" setup>

import PageHeader from "@/components/PageHeader.vue";
import VoucherForm from "@/components/forms/VoucherForm.vue";
import {useForm} from "vee-validate";
import {ref} from "vue";
import {useVouchersStore} from "@/stores/vouchers"
import {storeToRefs} from "pinia";
import {toTypedSchema} from "@vee-validate/zod";
import {voucherValidation} from "@/validation/voucher.ts";


const description = ref<string>("")
const store = useVouchersStore()
const {loading} = storeToRefs(store);

const form = useForm({
  validationSchema: toTypedSchema(voucherValidation),

  initialValues: {
    description:'',
    type:'product_discount',
    minPrice:null,
    quantity: 0,
    number_of_usage: "1",
    name:'',
    code:'',
    startDate: '',
    endDate:null,
    product_apply: [],
    discount_by:undefined
  },
});


const onSubmit = form.handleSubmit(async (values) => {
   await store.createVoucher({...values, usage:0, code:values.code.toUpperCase()})
})
</script>
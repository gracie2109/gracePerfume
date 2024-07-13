<template>
  <div class="space-y-8">
    <div id="payment_method_shipping">
      <h4 class="font-semibold text-xl">Payment Shipping Method</h4>
      <template v-for=" i in basePaymentMethods" :key="i.name">
        <div class="flex items-center space-x-2 my-1.5 border w-72 p-2 rounded-md">
          <input v-model="form.payment"
                 :value="i.name"
                 class="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                 name="payment"
                 type="radio"
                 :id="i.name"
          >
          <div class="w-11 h-11 ">
            <img :src="i.img" alt="" class="w-full h-full object-contain inline-block relative border p-1 rounded-lg">

          </div>
          <Label :for="i.name" class="font-semibold">{{ i.name }}</Label>
        </div>
      </template>

    </div>
      <div v-if="openBank" class="w-full h-full">
        <div class="border border-slate-200 rounded-sm p-2 w-[300px] h-[300px]">
          <img :src="baseBanks[0]['bankQr']" alt="" class="w-full h-full object-cover">
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import {inject, type Ref, ref, watchEffect} from "vue"
import {ICheckout} from "@/types/checkout.ts";
import {Label} from '@/components/ui/label'
import {baseBanks, basePaymentMethods} from '@/lib/constant'
const form = inject("form") as Ref<ICheckout>;
const openBank = ref(false);

watchEffect(() => {
  const {payment} = form.value;
  if (payment === 'TRANSFER') {
    openBank.value = true
  }else{
    openBank.value = false
  }
})


</script>
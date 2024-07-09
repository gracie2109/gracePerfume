<template>
  formModel::: {{formModel}}
  <div>
    <div id="payment_method_shipping">
        <h4 class="font-semibold text-xl">Payment Shipping Method</h4>
        <RadioGroup :default-value="basePaymentMethods[0]['name']" >
         <template v-for=" i in basePaymentMethods" :key="i.name">
           <div class="flex items-center space-x-2 my-1.5 border w-72 p-2 rounded-md">
             <RadioGroupItem :id="i.name" :value="i.name" />
             <img :src="i.img" alt="" class="w-9 h-9 object-cover inline-block relative">
             <Label :for="i.name">{{i.name}}</Label>
           </div>
         </template>
        </RadioGroup>

    </div>


    <div id="payment_method">


    </div>
  </div>
</template>

<script lang="ts" setup>
  import {inject, type Ref , ref} from "vue"
  import {ICheckout} from "@/types/checkout.ts";
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
  import { Label } from '@/components/ui/label'
  import {basePaymentMethods, baseBanks} from '@/lib/constant'



    const form = inject("form") as Ref<ICheckout>;
  const formModel = ref<{
    payment_methods: string,
    transfer_banks:string | null
  }>();


  const handleChoose = (methods:string) => {
    console.log('handleChoose',methods )
  }
</script>
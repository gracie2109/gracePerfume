<template>
  <div v-if="form" class="space-y-4  px-5">
    <div>
      <Label>User name</Label>
      <Input v-model="form.userName"  type="text"/>
    </div>
    <div>
      <Label>Phone number</Label>
      <Input v-model="form.phoneNumber" type="tel"/>
    </div>
    <ProvinceAddress :form="form.shipping_address" />

  </div>
</template>


<script lang="ts" setup>
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import ProvinceAddress from "@/components/ProvinceAddress.vue";


import {inject, onMounted, type Ref} from "vue"
import {ICheckout} from "@/types/checkout.ts";
import {useCurrentUser} from "vuefire";

const form = inject('form') as Ref<ICheckout>;

const user = useCurrentUser() as any;


onMounted(() => {
  if(user && form){
    form.value.userName = user.value.displayName;
    form.value.phoneNumber = user.value.phoneNumber

  }
})


</script>
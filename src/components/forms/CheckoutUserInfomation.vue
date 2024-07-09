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
    <div>
      <Label>Address</Label>
      <Input v-model="form.shipping_address.address" type="text"/>
    </div>
    <div class="grid grid-cols-2 items-center justify-between gap-3 w-full">
      <div>
        <Label>Province</Label>
        <Input v-model="form.shipping_address.province" type="text"/>
      </div>
      <div>
        <Label>Ward</Label>
        <Input v-model="form.shipping_address.ward" type="text"/>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
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
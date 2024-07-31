<template>
  <div v-if="form" class="space-y-4  px-5">
    <div class="my-4" v-if="userAddress">
      <Label>Choose exist address</Label>
      <Select
          v-model:model-value="tempSelected"
          @update:modelValue=" (v) => form.shipping_address.available_id = v"
      >
        <SelectTrigger >
          <SelectValue placeholder="Select a address" />
        </SelectTrigger>
        <SelectContent>
            <template v-for="i in userAddress" :key="i.id" v-if="userAddress">
               <SelectItem :value="i.id" >
                     {{i.name}} ({{ `${i.province.ProvinceName}, ${i.district.DistrictName}, ${i.ward.WardName},${i.address}`}} )
               </SelectItem>
            </template>
            <div v-else>
              NOT FOUND
            </div>
        </SelectContent>
      </Select>

    </div>
    <ProvinceAddress :form="form.shipping_address" />
    <div>
      <Label>User name</Label>
      <Input v-model="form.userName"  type="text"/>
    </div>
    <div>
      <Label>Phone number</Label>
      <Input v-model="form.phoneNumber" type="tel"/>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import ProvinceAddress from "@/components/ProvinceAddress.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {inject, ref, type Ref, toRaw, watchEffect} from "vue"
import {ICheckout} from "@/types/checkout.ts";
import {useCurrentUser} from "vuefire";
import {useUserStore} from "@/stores/user.ts";
import {storeToRefs} from "pinia";
import {computedAsync} from "@vueuse/core";

const form = inject('form') as Ref<ICheckout>;

const user = useCurrentUser() as any;

const tempSelected = ref('')

const useStore = useUserStore();
const {userAddress} = storeToRefs(useStore)


computedAsync(async () => {
  await useStore.getCurrentUserAdress();
  if(user){
    form.value.userName = form.value.userName ||  user.value.displayName;
    form.value.phoneNumber = form.value.phoneNumber || user.value.phoneNumber
  }
})

watchEffect(() => {
  if(form.value.shipping_address.available_id && userAddress.value){
    const {shipping_address} = form.value
    const selected = toRaw(userAddress.value.find((i) => i.id === form.value.shipping_address.available_id))

    if(selected){
      tempSelected.value = form.value.shipping_address.available_id.toString() || selected.id.toString();

      shipping_address.available_id = form.value.shipping_address.available_id.toString() || selected.id.toString()
      shipping_address.address = form.value.shipping_address.address || selected.address
      //@ts-ignore
      shipping_address.province.ProvinceID = selected['province']['ProvinceID'].toString();
      shipping_address.province.ProvinceName =  selected['province']['ProvinceName'];

      //@ts-ignore
      shipping_address.district.DistrictID = selected['district']['DistrictID'].toString();
      shipping_address.district.DistrictName = selected['district']['DistrictName'];

      // //ward
      shipping_address.ward.WardCode =selected['ward']['WardCode'];
      shipping_address.ward.WardName =selected['ward']['WardName'];
    }



  }
})
</script>
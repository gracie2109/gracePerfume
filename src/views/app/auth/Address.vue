<template>
  <div class="space-y-8">
    <Dialog  v-model:open="open"   >
      <DialogTrigger as-child >
        <Button variant="outline"  @update:open="(v) => {
          if(!loading) open = v
         }">
          <PlusCircle class="w-4 h-4 mr-2" /> New Address
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] md:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
          <DialogDescription>
            Your address will be ready to use
          </DialogDescription>
        </DialogHeader>
       <div>
        <UserAddressForm @handle-submit="handleSubmit" :formModel="formModel"
                         :loading="loading" :errors="errors"
        />
       </div>
      </DialogContent>
    </Dialog>
    <div class="flex items-start gap-6">
      <Card class="w-[380px]" v-for="i in userAddress" :key="i.id" v-if="userAddress" >
        <CardHeader>
            <div  class="flex items-start justify-between">
              <CardTitle>{{i.name}}</CardTitle>
              <CustomAlerDialog title="Delete this address" ok-text="Delete" trigger-text="Delete" @on-confirm="confirm(i.id)"/>
            </div>
        </CardHeader>
        <CardContent class="leading-7">
          <p><b class="pr-2">Province:</b>{{i.province.name}}</p>
          <p><b class="pr-2">District:</b>{{i.district.name}}</p>
          <p><b class="pr-2">Ward:</b>{{i.ward.name}}</p>
          <p><b class="pr-2">Address:</b>{{i.address}}</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Card, CardContent, CardTitle, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { PlusCircle} from "lucide-vue-next";
import {onMounted, ref} from "vue"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {UserAddress} from "@/types/location.ts";
import {initAddress} from "@/types/checkout.ts";
import {useUserStore} from "@/stores/user.ts";
import UserAddressForm from "@/components/forms/UserAddressForm.vue";
import CustomAlerDialog from "@/components/ui/CustomAlerDialog.vue";

import {storeToRefs} from "pinia";

const open = ref(false)
const formModel = ref<Omit<UserAddress, 'id'>>({
  ...initAddress,
  name:''
});

const userStore = useUserStore();
const {errors, loading, userAddress} = storeToRefs(userStore);

const handleSubmit = async () => {
  if(formModel.value){
      await userStore.createUserLocation(formModel.value);
      open.value = false
  }
}

const confirm = async (id:string) => {
  await userStore.deleteAddress(id.toString())
}

onMounted(async () => {
  await userStore.getCurrentUserAdress()
})
</script>
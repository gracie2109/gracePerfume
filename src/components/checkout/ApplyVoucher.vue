<template>
  <Transition mode="out-in" name="fade">
    <div v-if="errors">
      <Alert variant="destructive">
        <AlertTitle>
          {{ errors }}
        </AlertTitle>
      </Alert>
    </div>
  </Transition>
  <div class="grid gap-3">
    <Input v-model="code" class="h-[50px]" placeholder="enter code"/>
    <Button :disabled="loading" size="sm" variant="customPrimary" @click="checkVoucher">
      <ReloadIcon v-if="loading" class="w-4 h-4"/>
      Apply
    </Button>
  </div>
</template>

<script lang="ts" setup>
import {inject, type Ref, ref, Transition} from 'vue';
import {ICheckout} from "@/types/checkout.ts";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useVouchersStore} from "@/stores/vouchers";
import {useCart} from "@/stores/cart.ts";
import {ReloadIcon} from '@radix-icons/vue'

import {storeToRefs} from "pinia";
import {Alert, AlertTitle} from "@/components/ui/alert";
import {useCurrentUser} from "vuefire";

const currentUser = useCurrentUser()

const voucherStore = useVouchersStore()
const code = ref();

const form = inject("form") as Ref<ICheckout>;
const cartStore = useCart();

const {totalPrice, cart} = storeToRefs(cartStore);
const {loading, errors} = storeToRefs(voucherStore);


function updateFormData(totalPrice: any, data: any) {
  const newData = voucherStore.calcDiscountValue(totalPrice, data);
  if (newData) {
    form.value.salePrice = newData.discountValue;
    form.value.totalPrice = newData.newData;
  }
}


const checkVoucher = async () => {
  if (currentUser.value) {
    const data = await voucherStore.checkApplyVoucher(totalPrice.value, code.value.toUpperCase(), currentUser.value?.uid, cart) as any;

    if (data.voucher && data.voucherUsedItem) {
      form.value.voucher.code = data.voucher.code;
      form.value.voucher.id = data.voucher.id;
      form.value.usedVoucherObj = {...data.voucherUsedItem}
      updateFormData(totalPrice.value, data.voucher);
    }

  }
}


</script>
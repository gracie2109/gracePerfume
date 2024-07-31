<template>
  <Transition mode="out-in" name="fade">
    <div v-if="errors || getDataErrors">
      <Alert variant="destructive">
        <AlertTitle>
          <span v-if="errors"> {{ errors }}</span>
          <span v-else>{{getDataErrors}}</span>
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
import {voucherConditionValue} from "@/lib/constant.ts";
import { watchDebounced } from '@vueuse/core'




const currentUser = useCurrentUser()

const voucherStore = useVouchersStore()
const code = ref();

const form = inject("form") as Ref<ICheckout>;
const currentOrderPrice = inject('currentOrderPrice')as Ref<number>;
const cartStore = useCart();

const {totalPrice} = storeToRefs(cartStore);
const {loading, errors} = storeToRefs(voucherStore);
const getDataErrors = ref('')


function updateFormData(totalPrice: any, data: any) {
  const newData = voucherStore.calcDiscountValue(totalPrice, data);
  if (newData) {
    form.value.salePrice = newData.discountValue;
    form.value.totalPrice = newData.newData;

  }
}

const reset = () => {
  form.value.voucher.code = '';
  form.value.voucher.id = '';
  form.value.shipping_fee.totalFee = 40000
  form.value.usedVoucherObj = null;
  form.value.salePrice = 0;
  form.value.totalPrice = currentOrderPrice.value;
  getDataErrors.value = ''
}

const checkVoucher = async () => {
  if (currentUser.value) {
    const data = await voucherStore.checkApplyVoucher(totalPrice.value, code.value.toUpperCase(), currentUser.value?.uid) as any;
    console.log('data', data)
    if (data && data.voucher && data.voucherUsedItem) {
      form.value.voucher.code = data.voucher.code;
      form.value.voucher.id = data.voucher.id;
      form.value.usedVoucherObj = {...data.voucherUsedItem}
      if(data.voucher.type === voucherConditionValue.FREE_SHIPPING){
          form.value.shipping_fee.totalFee = data.voucher.discount_by?.maxValue || 40000
      }
      updateFormData(totalPrice.value, data.voucher);
    }else{
      reset();
      getDataErrors.value = "Something went wrong"
    }

  }
}

watchDebounced(() => code.value,() => {
  reset()
}, { debounce: 1000, maxWait: 5000 })

</script>
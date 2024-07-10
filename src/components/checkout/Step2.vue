<template>
  <div class="space-y-8">
    <div id="payment_method_shipping">
      <h4 class="font-semibold text-xl">Payment Shipping Method</h4>
      <template v-for=" i in basePaymentMethods" :key="i.name">
        <div class="flex items-center space-x-2 my-1.5 border w-72 p-2 rounded-md">
          <input v-model="form.payment"

                 :value="i.name" class="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" name="payment"
                 type="radio">
          <div class="w-11 h-11 ">
            <img :src="i.img" alt="" class="w-full h-full object-contain inline-block relative border p-1 rounded-lg">

          </div>
          <Label :for="i.name" class="font-semibold">{{ i.name }}</Label>
        </div>
      </template>

    </div>

    <transition>
      <div id="payment_method" v-if="openBank" class="space-y-3">
        <h4 class="font-semibold text-md">Choose bank</h4>

              <div v-for="i in  baseBanks" :key="i.id" class="flex items-center gap-3">
                <input v-model="form.transfer_banks" :value="i.id" class="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" name="transfer_banks"
                       type="radio">
               <div class="w-11 h-11">
                 <img :src="i.bankLogo" alt="" class="w-full h-full object-contain inline-block relative border p-1 rounded-lg">
               </div>
                <Label :for="i.id" class="font-semibold">{{ i.name }}</Label>
              </div>
      </div>
    </transition>


    <div id="modal">
      <Dialog :open="!!selectedBank"  @change:close="closeModal()">

        <DialogContent class="sm:max-w-md w-full min-w-96 max-h-[90vh] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Scan QR to payment</DialogTitle>
            <DialogDescription>
                {{form.transfer_banks}}
            </DialogDescription>
          </DialogHeader>
         <div class="w-full h-[70vh] ">
           <img v-if="selectedBank"  :src="selectedBank" alt="" class="w-full h-full object-cover inline-block relative">
           <div v-else>Something went wrong</div>
         </div>
          <DialogClose as-child>
            <Button type="button" variant="secondary"  @click="closeModal()">
              Close
            </Button>
          </DialogClose>

        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {inject, type Ref, ref, watchEffect} from "vue"
import {ICheckout} from "@/types/checkout.ts";
import {Label} from '@/components/ui/label'
import {basePaymentMethods, baseBanks} from '@/lib/constant'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
    DialogClose
} from '@/components/ui/dialog'

const form = inject("form") as Ref<ICheckout>;
const openBank = ref(false);
const selectedBank = ref<string | null>(null)


function closeModal () {
  form.value.transfer_banks = null;
  openBank.value = false;
  selectedBank.value = null;
}


watchEffect(() => {
  const {payment, transfer_banks} = form.value;
  if (payment === 'TRANSFER') {
    openBank.value = true
  }

  if(transfer_banks) {
    const selected = baseBanks.find((i ) => i.id === transfer_banks);
    selectedBank.value = selected?.bankQr
  }
})


</script>
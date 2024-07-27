<script setup lang="ts">
import {CreditCard, Truck } from 'lucide-vue-next'
import {computed, onUnmounted, provide, reactive, ref, watchEffect} from 'vue'
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Step1 from "@/components/checkout/Step1.vue";
import Step2 from "@/components/checkout/Step2.vue";
import AppLogo from "@/components/AppLogo.vue";
import {useRouter} from "vue-router";
import {ICheckout, initialCheckoutValue} from "@/types/checkout.ts";
import {Button} from "@/components/ui/button";
import { ShoppingCart } from 'lucide-vue-next';

import {
  AlertDialog,
  AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {toast} from "vue-sonner";
import {useCheckout} from "@/stores/order.ts";
import {useCart} from "@/stores/cart.ts";
import {storeToRefs} from "pinia";

const steps = reactive([
  {
    step:1,
    title: 'Information',
    description: 'Set your preferred shipping method',
    icon: Truck,

  },
  {
    step: 2,
    title: 'Payment',
    description: 'Add any payment information you have',
    icon: CreditCard,
  }]
);
const router = useRouter();

const stepper = ref(steps[0].step);

const showConfirmTransfer = ref(false);
const checkoutStore = useCheckout();
const cartStore = useCart();
const {totalPrice} = storeToRefs(cartStore)
let timeout: ReturnType<typeof setTimeout>;

const form = ref<ICheckout>(initialCheckoutValue);

const currentOrderPrice = computed(() => {
  return +totalPrice.value + +form.value.shipping_fee.totalFee
})
watchEffect(() => {
  form.value.totalPrice = currentOrderPrice.value;
})

function nextStep() {
  stepper.value = steps[1].step;
  
}
function back() {
  stepper.value = steps[0].step
}

function rejectOrder() {
  showConfirmTransfer.value = false;
  toast.info('You have cancelled order');
}

function redirectToCart () {
  router.push({ name: 'cart' });
}

async function confirmAndCreateOrder() {
  await checkoutStore.createPayment({ ...form.value }).then(() => {
    showConfirmTransfer.value = false;
    timeout = setTimeout(() => {
      router.push({ name: 'home' });
      cartStore.clearCart();
    }, 2000);
  });
}

async function submit() {

  if(form.value.payment ==="TRANSFER"){
    showConfirmTransfer.value = true;
  }else{
    await confirmAndCreateOrder()
  }
}


provide('form', form);


onUnmounted(() => {
  clearTimeout(timeout);
});


</script>

<template>
  <div class="mt-5 grid">
    <div class="space-y-3 pl-6 ">
      <AppLogo/>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">
              Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>


        </BreadcrumbList>
      </Breadcrumb>
    </div>
    ::: {{form}}
     <div>
       <Stepper v-model:model-value="stepper" :default-value="steps[0].step">
         <StepperItem
             key="cart"
             class="basis-1/4"
              :step="0"
         >
           <StepperTrigger @click="redirectToCart">
             <StepperIndicator>
              <ShoppingCart class="w-4 h-4"/>
             </StepperIndicator>
             <div class="flex flex-col">
               <StepperTitle>
                    Cart
               </StepperTitle>
               <StepperDescription>
                 Check your cart
               </StepperDescription>
             </div>
           </StepperTrigger>
           <StepperSeparator />
         </StepperItem>
         <StepperItem
             v-for="item in steps"
             :key="item.step"
             class="basis-1/4"
             :step="item.step"
         >
           <StepperTrigger>
             <StepperIndicator>
               <component :is="item.icon" class="w-4 h-4" />
             </StepperIndicator>
             <div class="flex flex-col">
               <StepperTitle>
                 {{ item.title }}
               </StepperTitle>
               <StepperDescription>
                 {{ item.description }}
               </StepperDescription>
             </div>
           </StepperTrigger>
           <StepperSeparator
               v-if="item.step !== steps[steps.length - 1].step"
           />
         </StepperItem>


       </Stepper>
       <keep-alive>
         <div class="grid">

           <div v-if="stepper === steps[0].step">
             <Step1  @next-step="nextStep"/>

           </div>
           <div v-if="stepper === steps[1].step">
             <Step2 />
              <div class="flex gap-3 items-center">
                <Button variant="outline" type="button" @click="back">Back</Button>
                <Button type="button" @click="submit">Submit</Button>
              </div>
           </div>
         </div>
       </keep-alive>
     </div>


    <div>
      <AlertDialog :open="showConfirmTransfer">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span v-if="form.payment === 'TRANSFER'">Complete banking </span>
              <span v-else>Are you sure wanna to create order</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="rejectOrder">Cancel</AlertDialogCancel>
            <AlertDialogAction @click="confirmAndCreateOrder">Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
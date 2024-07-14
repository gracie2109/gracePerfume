<script lang="ts" setup>
import Step1 from "@/components/checkout/Step1.vue";
import Step2 from "@/components/checkout/Step2.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useStepper } from '@vueuse/core'
import { Button } from "@/components/ui/button";

import {onUnmounted, provide, reactive, ref} from 'vue';
import clsx from "clsx";
import AppLogo from '@/components/AppLogo.vue'
import { ICheckout, initialCheckoutValue } from "@/types/checkout.ts";
import { basePaymentMethods } from '@/lib/constant'
import { useCheckout } from '@/stores/order.ts';
import { useCart } from "@/stores/cart.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const form = ref<ICheckout>(initialCheckoutValue);
const checkoutStore = useCheckout();
const cartStore = useCart();
const current = reactive(Step1)
let timeout: ReturnType<typeof setTimeout>;

const showAlert = ref<string | null>(null);
const showConfirmTranfer = ref(false);
const router = useRouter();

const stepper = useStepper({
  'user-information': {
    title: 'User information',
    isValid: () => form.value.shipping_address.address && form.value.phoneNumber,

  },
  'payment': {
    title: 'Payment',
    isValid: () => basePaymentMethods.map((i) => i.name).includes(form.value.payment),
  },
});

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
      .fill(null)
      .some((_, i) => !stepper.at(i)?.isValid());
}

function clearAlert() {
  showAlert.value = null;
}

function nextStep() {
  if (allStepsBeforeAreValid(1)) {
    stepper.goToNext();
    clearAlert();
  } else {
    showAlert.value = "Fill all fields first!!";
  }
}

async function confirmAndCreateOrder() {
  await checkoutStore.createPayment({ ...form.value }).then(() => {
    showConfirmTranfer.value = false;
    timeout = setTimeout(() => {
      router.push({ name: 'home' });
      cartStore.clearCart();
    }, 2000);
  });
}

function rejectOrder() {
  showConfirmTranfer.value = false;
  toast.info('You have cancelled order');
}

function submit() {
  if (stepper.current.value.isValid()) stepper.goToNext();
  if (stepper.isLast) {
    showConfirmTranfer.value = true;
  }
}

onUnmounted(() => {
  clearTimeout(timeout);
});

provide('form', form);
</script>

<template>
  <div class="mt-5">
    <div class="space-y-3 pl-6">
      <AppLogo/>
      {{form}}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">
              Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>

            <template v-for="(step, id, i) in stepper.steps.value" :key="id">
              <BreadcrumbItem v-model="current" >
                <BreadcrumbPage :class="clsx({
                  'text-red-600': stepper.current.value.title === step.title
                })"
                                @click="() => {
                  if(allStepsBeforeAreValid(i) && !stepper.isBefore(id)){
                    stepper.goTo(id);
                    clearAlert();
                  }
                }"

                >{{ step.title }}
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator v-if="i !== 1"/>
            </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="flex flex-col justify-center gap-2 mt-2">
      <div>
        <keep-alive>
          <div :key="stepper.current.value.title">
            <Step1 v-show="stepper.isCurrent('user-information')" :alert="showAlert" @next-step="nextStep"/>
            <Step2 v-show="stepper.isCurrent('payment')"/>
          </div>
        </keep-alive>



      </div>
      <div>
        <AlertDialog :open="showConfirmTranfer">
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

        <Button v-if="stepper.isLast.value && form.payment" :disabled="!stepper.current.value.isValid()" type="button"
                @click.prevent="submit">
          Submit
        </Button>
        <Button v-if="stepper.isLast.value" type="button"
                @click.prevent="stepper.goToPrevious()">
          Back
        </Button>
      </div>
    </div>
  </div>
</template>

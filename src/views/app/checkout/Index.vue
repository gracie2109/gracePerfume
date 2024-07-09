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
import {useStepper} from '@vueuse/core'
import {provide, ref, type Ref} from 'vue';
import clsx from "clsx";
import AppLogo from '@/components/AppLogo.vue'
import {ICheckout} from "@/types/checkout.ts";


const form: Ref<ICheckout> = ref({
  shipping_address: {
    available_id: "",
    address: "",
    province: "",
    ward: ""
  },
  phoneNumber: "",
  userName: "",
  payment: 'credit-card' as 'paypal' | 'credit-card',
})

const showAlert = ref<string | null>(null)
const stepper = useStepper({
  'user-information': {
    title: 'User information',
    isValid: () => form.value.shipping_address.address && form.value.phoneNumber,
  },
  'payment': {
    title: 'Payment',
    isValid: () => ['credit-card', 'paypal'].includes(form.value.payment),
  },

})

function submit() {
  if (stepper.current.value.isValid())
    stepper.goToNext()
}

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
      .fill(null)
      .some((_, i) => !stepper.at(i)?.isValid())
}

function clearAlert() {
  showAlert.value = null
}

function nextStep() {
  if (allStepsBeforeAreValid(1) && !stepper.isBefore('payment')) {
    stepper.goToNext();
    clearAlert()
  } else {
    showAlert.value = "Fill all fields first!!"
  }

}


provide('form', form)
</script>

<template>
  <div class="mt-5">
    <div class="space-y-3 pl-6">
      <AppLogo/>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">
              Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <template v-for="(step, id, i) in stepper.steps.value" :key="id">
            <BreadcrumbItem>
              <BreadcrumbPage :class="clsx({
                'text-red-600': stepper.current.value.title === step.title
              })" @click="() => {
                if(allStepsBeforeAreValid(i) && !stepper.isBefore(id)){
                  stepper.goTo(id);
                  clearAlert()
                }
              }">{{ step.title }}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="i !== 1"/>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <form class="" @submit.prevent="submit">
      <div class="flex flex-col justify-center gap-2 mt-2">
        <div>


          <div v-if="stepper.isCurrent('user-information')">
            <Step1 :alert="showAlert" @next-step="nextStep"/>
          </div>

          <div v-if="stepper.isCurrent('payment')">
            <Step2/>
          </div>


        </div>

        <div>

          <button v-if="stepper.isLast.value" :disabled="!stepper.current.value.isValid()">
            Submit
          </button>
        </div>
      </div>
    </form>

    <div class="flex flex-col gap-4 mt-12">
      <div class="w-full px-4 py-2 rounded border border-red-600 space-y-2 overflow-auto h-full">
        <span class="font-bold">Form</span>
        <pre v-text="form"/>
      </div>

    </div>
  </div>
</template>
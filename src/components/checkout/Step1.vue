<template>
  <div v-if="user" class="grid grid-cols-3 gap-3 h-full w-full justify-between px-3 py-5 ">
    <div class="col-span-2 mt-5 space-y-8">

      <UserAvatar />
      <CheckoutUserInfomation />
     </div>
    <div id="review_cat" class="col-span-1 space-y-8 mt-8  ">

      <PreviewCartItem/>
      <div class="space-y-4 mt-5">
        <Separator/>
        <div class="grid grid-cols-2  gap-2 justify-between w-full ">
          <p>Temp price: </p>
          <p class="text-end">{{ formatPrice(totalPrice) }}</p>
          <p>Shipping fee: </p>
          <p class="text-end">_</p>
        </div>
        <Separator/>
        <div class="flex  gap-2 justify-between items-center w-full">
          <p class="text-md">Total price</p>
          <p class="text-2xl font-semibold">{{ formatPrice(totalPrice) }}</p>
        </div>
      </div>

        <div v-if="props.alert" class="max-w-screen-sm">
          <transition>
            <Alert variant="destructive">
              <Beer className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {{props.alert }}
              </AlertDescription>
            </Alert>
          </transition>
      </div>
      <div>
        <Button class="w-full" @click="emit('nextStep')">Continue</Button>
      </div>
    </div>
  </div>

  <div v-else class="container grid h-full w-full">
    <router-link :to="'/auth/login'">You need to login first</router-link>
  </div>
</template>

<script lang="ts" setup>
import {useCurrentUser} from 'vuefire';
import CheckoutUserInfomation from "@/components/forms/CheckoutUserInfomation.vue";
import PreviewCartItem from "@/components/card/cart-item/PreviewCartItem.vue";
import {formatPrice} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator";
import {storeToRefs} from "pinia";
import {useCart} from "@/stores/cart.ts";
import {Button} from "@/components/ui/button"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

import {Beer} from "lucide-vue-next";
import UserAvatar from "@/components/base/avatar/UserAvatar.vue";

const cartStore = useCart();
const user = useCurrentUser();
const {totalPrice} = storeToRefs(cartStore);

const emit = defineEmits(['nextStep']);
const props = defineProps<{
  alert: string | null
}>()
</script>
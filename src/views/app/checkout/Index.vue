<template>
 <div class="grid grid-cols-3 gap-3 h-full w-full justify-between px-3 py-5 " v-if="user">
   <div id="infomation" class="col-span-2 mt-5">
      <AppLogo />
      <div class="mt-5 space-y-8">
        <h3 class="font-semibold text-2xl mt-8">Checkout infomation</h3>
        <div class="flex gap-3 items-center">
          <img :src="user?.photoURL || fallbackImg" alt="user photo" class="w-12 h-12 rounded-full inline-block">
          <div>
            <small>@{{user.displayName}}</small>
            <p>{{user.email}}</p>
          </div>
        </div>
        <div class="mt-3">
          <CheckoutUserInfomation />
        </div>
      </div>
   </div>
   <div id="review_cat" class="col-span-1 space-y-8 mt-8  ">

     <PreviewCartItem v-if="cart">
       <template v-slot:desc>
          <div class="space-y-4">
            <Separator />
            <div class="grid grid-cols-2  gap-2 justify-between w-full ">
              <p >Temp price: </p>
              <p class="text-end">{{formatPrice(totalPrice)}}</p>
              <p >Shipping fee: </p>
              <p class="text-end">_</p>
            </div>
            <Separator />
            <div class="flex  gap-2 justify-between items-center w-full">
              <p class="text-md">Total price</p>
              <p class="text-2xl font-semibold">{{formatPrice(totalPrice)}}</p>
            </div>
          </div>
       </template>
     </PreviewCartItem>
   </div>
 </div>

  <div v-else class="container grid h-full w-full">
    <router-link :to="'/auth/login'">You need to login first</router-link>
  </div>
</template>

<script setup lang="ts">
import {useCurrentUser} from 'vuefire';
import fallbackImg from "@/assets/images/fallback.jpg";
import CheckoutUserInfomation from "@/components/forms/CheckoutUserInfomation.vue";
import PreviewCartItem from "@/components/card/cart-item/PreviewCartItem.vue";
import AppLogo from "@/components/AppLogo.vue";
import {formatPrice} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator";
import {storeToRefs} from "pinia";
import {useCart} from "@/stores/cart.ts";

const cartStore = useCart();
const user = useCurrentUser();
const {totalPrice, cart} = storeToRefs(cartStore);

</script>
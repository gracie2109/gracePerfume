<template>
  <Sheet class="min-h-screen overflow-y-auto !p-6" :open='open'>
    <SheetTrigger @click="open = !open" >
      <div class="relative">
        <ShoppingCart :size="24" class="relative z-[10]" stroke-width="1.5"/>
        <span
            class="absolute text-[12px] font-semibold  -top-1 z-[12] bg-slate-200 w-4 h-4 text-red-600 rounded-full">12</span>

      </div>
    </SheetTrigger>
    <SheetContent>
     <SheetHeader class="absolute top-3 font-semibold text-sm hover:underline hover:cursor-pointer"
     @click.prevent="() => {
       $router.push('/cart');
       open=false
     }"
     >Your cart (10) </SheetHeader>
      <div class="relative top-5  h-screen overflow-y-auto">
        <div v-for="i in 2">
          <CartItem :key="i" />
        </div>
      </div>
      <div class=" bg-white sticky bottom-0 right-0 h-14 hidden_padding  border-t-2">
        <div class="flex items-center justify-between h-full  ">
          <div class="flex gap-x-2">
            <b>Total Price:</b>
            <p>{{ formatPrice(123000) }}</p>
          </div>

          <Button>
            <router-link :to="$router.resolve('checkout')" class="flex gap-x-2 items-center">
              Checkout<ChevronsRight class="w-4 h-4"/> </router-link>
          </Button>

        </div>
      </div>
    </SheetContent>

  </Sheet>
</template>
<script setup lang="ts">
import {ChevronsRight, ShoppingCart} from "lucide-vue-next";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import CartItem from "@/components/card/CartItem.vue";
import {formatPrice} from "../../lib/utils.ts";
import {ref} from "vue";
const open = ref(false)
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 3.5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: orangered;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f1f1f1;
}
</style>
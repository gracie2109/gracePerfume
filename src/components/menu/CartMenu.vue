<template>
  <Sheet class="min-h-screen overflow-y-auto !p-6" >
    <SheetTrigger>
      <div class="relative">
        <svg class="relative z-[10]" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path d="M15.95 6H19.7V17.875C19.7 18.7344 19.3875 19.4635 18.7625 20.0625C18.1635 20.6875 17.4344 21 16.575 21H5.325C4.46563 21 3.72344 20.6875 3.09844 20.0625C2.49948 19.4635 2.2 18.7344 2.2 17.875V6H5.95C5.95 4.61979 6.43177 3.44792 7.39531 2.48438C8.3849 1.49479 9.56979 1 10.95 1C12.3302 1 13.5021 1.49479 14.4656 2.48438C15.4552 3.44792 15.95 4.61979 15.95 6ZM13.1375 3.8125C12.5385 3.1875 11.8094 2.875 10.95 2.875C10.0906 2.875 9.34844 3.1875 8.72344 3.8125C8.12448 4.41146 7.825 5.14062 7.825 6H14.075C14.075 5.14062 13.7625 4.41146 13.1375 3.8125ZM17.825 17.875V7.875H15.95V9.4375C15.95 9.69792 15.8589 9.91927 15.6766 10.1016C15.4943 10.2839 15.2729 10.375 15.0125 10.375C14.7521 10.375 14.5307 10.2839 14.3484 10.1016C14.1661 9.91927 14.075 9.69792 14.075 9.4375V7.875H7.825V9.4375C7.825 9.69792 7.73385 9.91927 7.55156 10.1016C7.36927 10.2839 7.14792 10.375 6.8875 10.375C6.62708 10.375 6.40573 10.2839 6.22344 10.1016C6.04115 9.91927 5.95 9.69792 5.95 9.4375V7.875H4.075V17.875C4.075 18.2135 4.19219 18.5 4.42656 18.7344C4.68698 18.9948 4.98646 19.125 5.325 19.125H16.575C16.9135 19.125 17.2 18.9948 17.4344 18.7344C17.6948 18.5 17.825 18.2135 17.825 17.875Z"></path></svg>
        <span
            class="absolute text-[10px] font-semibold  -top-1 z-[12] bg-red-500 text-white w-4 h-4  rounded-full">12</span>
      </div>
    </SheetTrigger>
    <SheetContent>
     <SheetHeader class="absolute top-3 font-semibold text-sm hover:underline hover:cursor-pointer"
     @click="() => {
       $router.push('/cart');
       closeSheet()
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
import {ChevronsRight} from "lucide-vue-next";
import {Sheet, SheetContent, SheetHeader, SheetTrigger, } from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import CartItem from "@/components/card/CartItem.vue";
import {formatPrice} from "@/lib/utils.ts";
import {ref} from "vue";
const open = ref(false);

function closeSheet () {
  open.value = !open.value
}



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
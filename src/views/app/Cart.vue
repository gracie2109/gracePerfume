<template>
  <div class="relative top-0 ">
    <div class="h-10  rounded-lg mb-3 ml-5 w-[220px] flex items-center justify-between px-3">
      <p class="scroll-m-20 text-[18px] font-semibold tracking-tight pl-2">Cart</p>
      <small> You have <span v-if="cart" class="mr-2">{{ cartLength }}</span>  <span class="mr-2" v-else>0</span>items in cart  </small>
    </div>
    <div class=" relative  flex  gap-8 px-5" >
      <div class="flex-1 rounded-lg  p-2 ">
       <ScrollArea class="h-full max-h-[70vh] h-[70vh] p-5">
         <div class="cart_content container">
           <div v-if="cart">
             <div  v-for="(i, j) in cart" >
               <CartItem :key="j" :data="i" :show-btn-del="true" />
             </div>
           </div>
            <div v-else class="container w-full h-full grid place-items-center">
              <img :src="cartEmptyImg" alt="">
              <Button size="xl"  @click="$router.push({name: 'home'}) ">Shopping now</Button>
            </div>
         </div>
       </ScrollArea>
      </div>

      <div class="w-96  rounded-lg p-5 ">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
         Cart Infomation
        </h4>
        <Separator orientation="horizontal"  />

        <div class="flex items-center justify-between mt-8 my-3  h-12 rounded-lg px-4">
         <div>
           <b class="pr-6">Total Price:</b>
           <span v-if="cart">{{formatPrice(totalPrice)}}</span>
           <span v-else>0 đ</span>
         </div>
        </div>
       <div class=" rounded-lg px-4">
          <ul class="list-disc p-4 space-y-4 text-sm ">
            <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
            <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
          </ul>
       </div>
        <div class="my-8">
          <Button
                  :disabled="!cart"
                  class="w-full bg-custom-primary p-5 hover:bg-custom-primary/85"
                  @click="() => { $router.push('/checkout')  }">Checkout</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import CartItem from '@/components/card/cart-item/CartItem.vue';
import {useCart} from "@/stores/cart"
import {storeToRefs} from "pinia";
import cartEmptyImg from '@/assets/images/cart_banner_image.webp'
import {formatPrice} from "@/lib/utils.ts";
import {onMounted, watchEffect} from "vue";
const cartStore = useCart();
const {totalPrice, cart,cartLength} = storeToRefs(cartStore);

onMounted(() => {
  cartStore.calcTotalPrice();
})
// watchEffect(() => {
//   cartStore.getCart();
// })

</script>

<style scoped>
.cart_content {
  width: 100%;
  position: relative;

}


</style>
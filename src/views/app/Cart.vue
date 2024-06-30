<template>
  <div class="relative top-32 ">
    <div class="h-10 bg-cara-secondary rounded-lg mb-3 ml-5 w-[220px] flex items-center justify-between px-3">
      <p class="scroll-m-20 text-[18px] font-semibold tracking-tight pl-2">Cart</p>
      <small> You have 5 items in cart  </small>
    </div>
    <div class=" relative  flex  gap-8 px-5">
      <div class="flex-1 rounded-lg  p-2 bg-cara-secondary">
       <ScrollArea class="h-full max-h-[70vh] h-[70vh]">
         <div class="cart_content ">

           <div class=" bg-[#2d364a] p-2 rounded-md my-3" v-for="i in 12" :key="i">
             <div class="flex items-start gap-x-4 h-full">
               <div id="media" class="w-[78px] relative">
                 <img :src="cartItemRaw.image" alt="" class="w-full h-full object-cover rounded-lg relative">
                 <div class="absolute -top-1 -right-1  w-4 h-4 bg-red-500 text-white rounded-full
                          before:content-['x'] before:w-full before:h-full before:grid before:place-items-center
                          before:relative before:-top-[3px] before:text-sm cursor-pointer"
                      @click="removeItem"
                 />
               </div>

               <div class=" flex w-full justify-between h-full">
                 <div class="space-y-3 grid justify-around h-full">
                   <p>{{ cartItemRaw.name }}</p>
                   <p class="text-sm text-muted-foreground">
                     {{ cartItemRaw.quantity }} x <span class="font-semibold">{{ formatPrice(cartItemRaw.price) }}</span>
                   </p>
                 </div>
                 <div class="space-y-3 grid justify-end h-full">
                   <div>{{ formatPrice(cartItemRaw.price) }}</div>
                   <div>
                     <NumberField id="price" :default-value="cartItemRaw.quantity" :min="1" class="w-[calc(100%-4rem)]">
                       <NumberFieldContent>
                         <NumberFieldDecrement/>
                         <NumberFieldInput/>
                         <NumberFieldIncrement/>
                       </NumberFieldContent>
                     </NumberField>
                   </div>
                 </div>
               </div>
             </div>
           </div>

         </div>
       </ScrollArea>
      </div>

      <div class="w-96  rounded-lg p-5 bg-cara-secondary">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
         Cart Infomation
        </h4>
        <Separator orientation="horizontal"  />

        <div class="flex items-center justify-between mt-8 my-3 bg-cara-border h-12 rounded-lg px-4">
         <div>
           <b class="pr-6">Total Price:</b><span>{{formatPrice(cartItemRaw.price)}}</span>
         </div>
        </div>
       <div class="bg-cara-border  rounded-lg px-4">
          <ul class="list-disc p-4 space-y-4 text-sm ">
            <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
            <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
          </ul>
       </div>
        <div class="my-8">
          <Button class="w-full bg-custom-primary p-5 hover:bg-custom-primary/85" @click="() => {
            $router.push('/checkout')
          }">Checkout</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';
import {Button} from "@/components/ui/button"
import {formatPrice} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator"
const cartItemRaw = {
  id: '123',
  name: 'Creed Absolu Aventus Creed Absolu Aventus',
  image: 'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277',
  media: [
    'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/nar-vetiver-musc.jpg?v=1704809896337',
    'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277'
  ],
  price: 123000,
  quantity: 10,
  variant: 'Chiết 10ml'
}

const removeItem = () => {
  console.log("remove")
}
</script>

<style scoped>
.cart_content {
  width: 100%;
  position: relative;

}


</style>
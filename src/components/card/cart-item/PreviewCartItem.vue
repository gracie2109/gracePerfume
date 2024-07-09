<template>
  <div class="w-full">

    <div class="relative grid gap-y-3 my-3" v-for="(i, ii) in cart" :key="ii" v-if="cart">
      <div class="relative my-3" v-if="i.variant" v-for="(j, jj) in i.variant" :key="jj">
        <div class="flex gap-3 items-center">
          <div>
            <div  class="relative w-16 h-16">
              <img :src="i.image" alt="" class="w-full h-full object-cover rounded-md relative" />
            </div>
            <div class="absolute -top-1 -left-2 bg-custom-primary w-5 h-5 rounded-full text-[10px] text-white">
              <div class="h-full grid place-items-center"> {{j.quantity}} </div>
            </div>
          </div>
          <div class="flex gap-3 items-center justify-between w-full">
            <div>
              <p>{{i.name || 'product name'}}</p>
              <small>{{j.id || 'product variant name'}}</small>
            </div>
            <div class="grid gap-x-3">
              <div class="text-end">
                {{formatPrice(j.quantity * j.price)}}
              </div>
              <div>
                <slot name="control"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex gap-3 items-center">
          <div>
           <div class="relative w-16 h-16">
             <img :src="i.image" alt="" class="w-full h-full object-cover rounded-md relative" />
           </div>
            <div class="absolute -top-1 -left-2 bg-custom-primary w-5 h-5 rounded-full text-[10px] text-white">
              <div class="h-full grid place-items-center"> {{i.quantity}} </div>
            </div>
          </div>
          <div class="flex gap-3 items-center justify-between w-full">
            <div>
              <p>{{i.name || 'product name'}}</p>
            </div>
            <div>
              <div class="text-end">
                {{formatPrice(i.quantity * i.price)}}
              </div>
              <div>
                <slot name="control"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
  import {useCart} from "@/stores/cart.ts"
  import {storeToRefs} from "pinia";
  import {formatPrice} from "@/lib/utils.ts";
  import {onMounted} from "vue";
  const cartStore = useCart();
  const {cart} = storeToRefs(cartStore);
  onMounted(() => {
    cartStore.calcTotalPrice();
  });

</script>
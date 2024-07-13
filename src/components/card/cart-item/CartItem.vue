<template>
  <div class=" rounded-sm grid space-y-3 ">

    <div v-for="(j, jj) in prop.data.variant" v-if="prop.data.variant" :key="jj"
         class="h-24 border  rounded-lg mt-5">
      <div class="flex items-start gap-3 h-full">

        <div class="w-[20%]  h-full relative" if="media">
         <div class="w-full h-full max-w-[50px]">
           <img :src="prop.data.image" alt="image of" class="w-full h-full relative object-cover max-w-[50px] max-h-[50px]">
         </div>
          <div v-if="prop.showBtnDel"
               class="cursor-pointer absolute -top-1 -left-2 bg-custom-primary w-6 h-6 rounded-full text-white text-sm"
               @click="deleteItemInCart(prop.data.id,j.id)">
            <div class="grid h-full place-items-center">x</div>
          </div>
        </div>
        <div id="content_variant" class="flex-1 h-full flex justify-between items-center pr-4">
          <div>
            <div>
              <p v-if="prop.data.name">{{ truncateText(prop.data.name, 50) }}</p>
            </div>
            <div>
              <small v-if="j.id">{{ truncateText(j.id, 50) }}</small>

            </div>
          </div>
          <div id="action">
            <p class="text-sm text-end">{{ formatPrice(j.price * j.quantity) }}</p>
            <div class="max-w-32">
              <NumberField id="price" :default-value="j.quantity" :min="0">
                <NumberFieldContent>
                  <NumberFieldDecrement @click="decrement(prop.data.id,j.id)"/>
                  <NumberFieldInput :disabled="true"/>
                  <NumberFieldIncrement @click="increment(prop.data.id,j.id)"/>
                </NumberFieldContent>
              </NumberField>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>

      <div id="media" class="h-24  px-2 rounded-lg mt-5 w-full">
        <div class="flex items-start gap-3 h-full w-full">

          <div class="w-[20%] h-full relative " >
            <div class="w-full h-full max-w-[100px] max-h-[100px]">
              <img :src="prop.data.image " alt="image of" class="w-full h-full relative object-cover aspect-square ">
            </div>
            <div
                v-if="prop.showBtnDel"
                class="cursor-pointer absolute -top-1 -left-2 bg-custom-primary w-4 h-4 rounded-full text-white text-sm
                  before:content-['x'] before:w-full before:h-full before:grid before:place-items-center  before:absolute before:-top-[4px]
"
                @click="deleteItemInCart(prop.data.id,null)">
            </div>
          </div>
          <div  class="flex-1 h-full flex justify-between items-center pr-4">
            <div>
              <div>
                <p v-if="prop.data.name">{{ truncateText(prop.data.name, 50) }}</p>
              </div>

            </div>
            <div id="action">
              <p class="text-sm text-end">{{ formatPrice(prop.data.price * prop.data.quantity) }}</p>
              <div class="max-w-32">
                <NumberField id="price" :default-value="prop.data.quantity" :min="0">
                  <NumberFieldContent>
                    <NumberFieldDecrement @click="decrement(prop.data.id,null)"/>
                    <NumberFieldInput :disabled="true"/>
                    <NumberFieldIncrement @click="increment(prop.data.id,null)"/>
                  </NumberFieldContent>
                </NumberField>
              </div>
            </div>
          </div>
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
import {formatPrice, truncateText} from "@/lib/utils.ts";
import {useCart} from "@/stores/cart.ts";

const prop = defineProps<{
  data: any,
  showBtnDel: boolean
}>();

const cartStore = useCart();

const decrement = (productId: string, variantId: string | null) => {
  cartStore.decrementCartItem(productId, variantId)
}

const increment = (productId: string, variantId: string | null) => {
  cartStore.incrementCartItem(productId, variantId)
}

const deleteItemInCart = (productId: string, variantId: string | null) => {
  cartStore.deleteItemInCart(productId, variantId)
}

</script>

<style scoped>
input[role='spinbutton'] {
  height: 2rem;
}
</style>
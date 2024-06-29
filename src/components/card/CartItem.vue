<template>

    <div class="h-24 border rounded-sm my-3" >
      <div class="flex items-start gap-3 h-full">
        <div id="media"  class="w-[20%] h-full"><img :src="cartItemRaw.image" alt=""
                                                     class="w-ful h-full object-cover"></div>
        <div class="flex-1 p-2 h-full text-sm ">
          <div class="flex flex-col gap-y-1">
            <p class="font-semibold truncate text-sm text-ellipsis overflow-hidden">{{truncateText(cartItemRaw.name,25)}}</p>
            <p >{{cartItemRaw.variant}}</p>
            <div class="flex h-[calc(100%-2em)] items-center ">

              <div>
                <NumberField id="price" :default-value="cartItemRaw.quantity"  :min="1" class="w-[calc(100%-4rem)]">
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
              </div>
              <div>{{formatPrice(cartItemRaw.price)}}</div>
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
import {formatPrice, truncateText} from "@/lib/utils";
  const cartItemRaw =
    {
      id: '123',
      name:   'Creed Absolu Aventus Creed Absolu Aventus',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277',
      media:[
          'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/nar-vetiver-musc.jpg?v=1704809896337',
          'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277'
      ],
      price: 123000,
      quantity:10,
      variant:'Chiết 10ml'
    }

</script>

<style scoped>
input[role='spinbutton']{
  height: 2rem;
}
</style>
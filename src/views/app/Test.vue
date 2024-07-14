<template>
  <button @click="sendEmail">Send </button>
</template>


<script lang="ts" setup>
  import emailjs from '@emailjs/browser';
  import {useCart} from "@/stores/cart.ts";
  import {storeToRefs} from "pinia"
  import {toRaw} from "vue";
  import {formatPrice} from '@/lib/utils'

  const store = useCart();
  const {cart, cartLength, totalPrice,totalItems} = storeToRefs(store);


   function parseProduct (){
      let product = [] as any[];

      if(cart.value &&  cart.value.length > 0){
        for (let prd of cart.value){
          if(prd.variant){
            for(let v of prd.variant){
              const newData = {
                name: `${prd.name}/${v.id}`,
                price: formatPrice(+v.price),
                quantity: +v.quantity,
                image: prd.image,
              }
                product = [...product, toRaw(newData)]
            }
          }else{
            product = [...product,toRaw({
              ...prd,
              price: formatPrice(+prd.price),
            })]
          }
        }
      }
      return product
  }
  const prd = parseProduct();


  function sendEmail() {
    const data = {
      name:'dhhhhhhhhhhhhhhhhhh',
      email:'trinhbaminhphut@gmail.com\n',
      product:prd,
      quantity: cartLength.value,
      price: formatPrice(totalPrice.value),
      totalItems:totalItems.value
    }

    emailjs.send(import.meta.env.VITE_APP_EMAIL_SEVICE_ID,import.meta.env.VITE_APP_EMAIL_SEND_USER_ORDER, {...data},{
      publicKey: 'evORyAftpWeR2IHqF',
    })
        .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
        );
  }

</script>
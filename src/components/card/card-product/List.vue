<template>
  <div class="relative group">
    <RouterLink :to="`/product/this-is-slug`">
      <img
          class="block relative h-[20rem] w-full cursor-pointer rounded-lg object-cover drop-shadow-2xl transition-opacity hover:opacity-70 relative"
          src="https://image.tmdb.org/t/p/w342/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg"
          alt="title"
          role="link"
      />

    </RouterLink>
    <div class="ribbon" v-if="!hasSale"><span>30%</span></div>
    <div class="absolute group hidden bottom-0 w-full p-5 group-hover:block bg-white/30 backdrop-blur-sm rounded-sm">

      <div class="container flex gap-3 items-center justify-between">

          <ShoppingCart class="w-6 h-6 cursor-pointer"  />
          <Heart  class="w-6 h-6 cursor-pointer"  />

      </div>
    </div>
  </div>



  <div>

  </div>


   <div class="space-y-3 my-3">
     <p class="text-[10px] text-muted-foreground text-center">
       NARCISO RODRIGUEZ</p>
     <p class="text-center">Galloway EDP</p>
   </div>
    <div class="price flex justify-between items-center px-5" v-if="!hasSale">
      <div class="text-destructive line-through">
        {{formatPrice(salePrice)}}
      </div>
      <span>{{formatPrice(250000)}}</span>
    </div>

    <div v-else class="text-center">{{formatPrice(250000)}}</div>


</template>

<script lang="ts" setup>
  import {formatPrice} from "@/lib/utils.ts";
  import { ShoppingCart, Heart } from 'lucide-vue-next';




  import {computed} from "vue";
  const salePrice = computed(() => 300000);
  const hasSale = computed(() => false)
</script>


<style scoped>

.ribbon {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.ribbon {
  --f: .5em; /* control the folded part*/
  --r: .8em; /* control the ribbon shape */

  position: absolute;
  right: 10px;
  top: calc(-1*var(--f));
  padding: .2em;
  background: #BF4D28;
  border-left: var(--f) solid #0005;
  border-bottom: var(--r) solid #0000;
  clip-path: polygon(var(--f) 0,100% 0,100% calc(100% - var(--r)),calc(50% + var(--f)/2) 100%, var(--f) calc(100% - var(--r)),var(--f) var(--f),0 var(--f));
}

.ribbon > span{
  font-size: 18px
}
</style>

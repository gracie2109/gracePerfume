<template>
  <RouterLink :to="`/product/${props.data.slug}`">
    <div class="relative" @click="$router.resolve({name:'productDetail', params:{id: props.data.slug}})">
      <div class="w-full  rounded-lg h-full relative">
        <div class="p-2 h-64 rounded-xl space-y-2 relative">
          <div class="w-full h-full max-h-[90%] ">
            <img
                :src="props.data.images[0]"
                alt="title"
                class="cursor-pointer w-full h-full rounded-lg object-cover transition-opacity hover:opacity-70 relative aspect-video"
                role="link"
            />
          </div>
          <div>
            <h6 class="font-semibold capitalize">{{ truncateText(props.data.name, 40) }}</h6>
            <div>
              <div v-if="hasSale" class="flex items-center justify-between">
                <p class="text-red-600 font-semibold">{{ formatPrice(props.data.price) }}</p>
                <p class="line-through">{{ formatPrice(props.data.cost) }}</p>
              </div>
              <div v-else>
                <p>{{ formatPrice(props.data.price) }}</p>
              </div>

            </div>
          </div>
        </div>
        <div v-if="hasSale" class="absolute w-full -top-2 ribbon text-white bg-red-600">
          <span class="text-sm">Off {{ calcSalePercentage(props.data.price, props.data.cost) }}%</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import {calcSalePercentage, formatPrice, truncateText} from "@/lib/utils.ts";

import {computed} from "vue";

const hasSale = computed(() => {
  if (props.data.cost) return true;
  else return false
});

const props = defineProps<{
  data: any
}>()

console.log('props', props.data)
</script>


<style scoped>

/* HTML: <div class="ribbon">Your text content</div> */

.ribbon {
  --r: .8em;
  border-block: .5em solid #0000;
  padding-inline: .5em calc(var(--r) + .25em);
  clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%, 100% calc(100% - .25em), calc(100% - var(--r)) 50%, 100% .25em);
  background: radial-gradient(.2em 50% at left, #000a, #0000) border-box,
  red padding-box;
  width: fit-content;
}
</style>

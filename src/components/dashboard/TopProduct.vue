<template>
  <div v-if="props.loading">
    <Loading />
  </div>
  <div v-else-if="props.data && props.data.length > 0" class="flex gap-4">
    <div  v-for="(i, j) in props.data" :key="j" class="border w-36 ">
      <div class=" w-25 h-25 rounded-lg mx-auto">
        <img :src="i.image" alt="" class="aspect-square w-full rounded-lg  h-full p-1 object-cover">
      </div>
      <div class="text-center">
        <div id="dashboard_price" class="h-[50px]">
          <div v-if="i.name.includes('/')">
            <p class="font-semibold">{{truncateText(i.name.split('/')[0],20)}}</p>
            <p class="text-muted-foreground text-sm">{{truncateText(i.name.split('/')[1],20)}}ml</p>
          </div>
          <p v-else>{{truncateText(i.name,20)}}</p>
        </div>
          <p  v-if="props.type ==='topSale'">{{formatPrice(i.price)}}</p>
          <div v-else>
            <p class="text-sm text-muted-foreground">{{i.quantity}} x {{formatPrice(i.price)}}</p>
            <p>{{formatPrice(i.price * i.quantity)}}</p>
          </div>
      </div>
    </div>
  </div>
  <div v-else class="h-20 pt-3 text-left">
    Not record
  </div>


</template>
<script setup lang="ts">
import {formatPrice, truncateText} from "@/lib/utils.ts";
import Loading from "@/components/loading.vue"

const props = defineProps<{
  data:any,
  type: 'topSale' | 'topRevenue',
  loading: boolean
}>();



</script>
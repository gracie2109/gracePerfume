
<template>



  <div class="grid grid-cols-3 gap-3" >
    <CardMiniToday :data="formatPrice(response.totalPrice)" title="Total sale price" :loading="loading" >
      <template slot="icon">
        <Airplay />
      </template>
    </CardMiniToday>
    <CardMiniToday :data="response.totalQuantity" title="Total sale quantity" :loading="loading" >
      <template slot="icon">
        <Airplay  />
      </template>
    </CardMiniToday>
    <CardMiniToday :data="formatPrice(response.totalPrice)" title="Revenue" :loading="loading">
      <template slot="icon">
        <Airplay />
      </template>
    </CardMiniToday>
  </div>

    <div class="grid grid-cols-2 gap-3 justify-between">
      <div class="space-y-3">
        <h3 class="font-semibold  text-medium">Top Sale</h3>
        <TopProduct :data="response.topSale.slice(0,5)" type="topSale" :loading="loading" />
      </div>
      <div  class="space-y-3">
        <h3 class="font-semibold  text-medium">Top Revenue</h3>
        <TopProduct :data="response.topRevenue.slice(0,5)" type="topRevenue" :loading="loading" />
      </div>
    </div>
</template>


<script setup lang="ts">
import {onMounted, onUnmounted, reactive, watchEffect} from 'vue'
import {formatPrice} from "@/lib/utils"
import {useProfit} from "@/stores/profit.ts";
import {Airplay} from "lucide-vue-next"
import {storeToRefs} from "pinia";
import CardMiniToday from "@/components/dashboard/CardMiniToday.vue";
import TopProduct from "@/components/dashboard/TopProduct.vue";
import {format} from "date-fns";

const initial = {
  topRevenue:[],
  topSale:[],
  totalPrice:0,
  totalQuantity:0,
  revenue:0
}



const response = reactive<{
  topRevenue:any[],
  topSale:any[],
  totalPrice:number,
  totalQuantity:number,
  revenue:number
}>({...initial});

const store = useProfit();
const {loading} = storeToRefs(store)
const props = defineProps<{
  form: any
}>()

const reset = () => {
  return Object.assign(response, {...initial})
}



watchEffect(async () => {
  reset()
  const {today} = props.form.values;
  if(today){
    const res = await store.getRevenueByDate(today);
    Object.assign(response, res)
  }
})

onMounted(async () => {
  const today = format(new Date().toISOString(), "yyyy-MM-dd");
  const res = await store.getRevenueByDate(today);
  Object.assign(response, res)
})

onUnmounted(() => {
  reset()
})
</script>
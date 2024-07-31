
<template>
    <div class="flex justify-between items-center">
     <h1 class="font-bold text-2xl">Dashboard</h1>
<!--      <CustomRangeDatePicker :value="rangeDate" />-->
      <CustomDatePicker :form="form" name="today"  label=""  :default-value="td.add({day: 2})" />
    </div>
  {{form.values}}
<div>
<div class="space-y-4">
  <div>
     totalSalePruce: {{formatPrice(response.totalPrice)}}
  </div>
  <div>
    revenue: {{formatPrice(response.revenue)}}
  </div>
  <div>
    today product quantity sale: {{response.totalQuantity}}
  </div>


  Best sale product today:
  <div v-if="response.topSale" class="flex gap-4">
    <div  v-for="(i, j) in response.topSale.slice(0,5)" :key="j" class="border w-36 ">
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
        <p>{{formatPrice(i.price)}}</p>
      </div>
    </div>
  </div>


   topRevenue today:
  <div v-if="response.topRevenue" class="flex gap-4">
    <div  v-for="(i, j) in response.topSale.slice(0,5)" :key="j" class="border w-36 ">
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
        <p class="text-sm text-muted-foreground">{{i.quantity}} x {{formatPrice(i.price)}}</p>
        <p>{{formatPrice(i.price * i.quantity)}}</p>
      </div>
    </div>


  </div>
</div>


</div>

</template>


<script setup lang="ts">
import {inject, type Ref, ref, onMounted, reactive, watch, onBeforeMount, watchEffect} from 'vue'
// import CustomRangeDatePicker from "@/components/ui/CustomRangeDatePicker.vue";
import CustomDatePicker from "@/components/ui/CustomCalender.vue"
// import {CalendarDate} from "@internationalized/date";
// import type {DateRange} from "radix-vue";
import TabsDashboard from "@/components/dashboard/TabsDashboard.vue";
import {useForm} from "vee-validate";
import {useProfit} from "@/stores/profit"
import {format} from "date-fns";
import {Card, CardContent, CardTitle, CardHeader, CardFooter, CardDescription} from "@/components/ui/card"
import {formatPrice, truncateText} from "@/lib/utils"
 const td = inject("today") as any;
const response = reactive<{
  topRevenue:any[],
  topSale:any[],
  totalPrice:number,
  totalQuantity:number,
  revenue:number
}>({
  topRevenue:[],
  topSale:[],
  totalPrice:0,
  totalQuantity:0,
  revenue:0
});



// const rangeDate = ref({
//   start: new CalendarDate(td.year, td.month, td.day),
//   end: new CalendarDate(td.year, td.month, td.day).add({ days: 10 }),
// }) as Ref<DateRange>;

const form = useForm()
const store = useProfit();

onMounted(async () => {
  const today = format(new Date().toISOString(), "yyyy-MM-dd");
  const res = await store.getRevenueByDate(today);
  Object.assign(response, res);


  const range = await store.getRevenueByRangeDate({
    start: '2024-07-30',
    end: '2024-07-31'
  });
  // console.log('range', range)

})

const reset = () => {
  return Object.assign(response, {
    topRevenue:[],
    topSale:[],
    totalPrice:0,
    totalQuantity:0
  })
}

watchEffect(async () => {
  reset()
  const {today} = form.values;
  if(today){
    const res = await store.getRevenueByDate(today);
    Object.assign(response, res)
  }
})



</script>
<template>
  <div v-if="loading">
    <Loading/>
  </div>

  <div v-else class="h-full  w-full border border-red-600 p-2">
    <div v-if="dataChart && serial">
      <CustomChart :data="dataChart"
                   :series="serial"
                   subtitle="Revenue weekly"
                   title="Revenue"

      />
    </div>

  </div>

</template>


<script lang="ts" setup>
import {computed, onMounted, toRaw, onUnmounted, watchEffect} from "vue";
import {useProfit} from "@/stores/profit.ts"
import {storeToRefs} from "pinia";
import Loading from "@/components/loading.vue";
import CustomChart from "@/components/CustomChart.vue";

const props = defineProps<{
  value: any
}>()

const store = useProfit();
const {loading, resultRangeDate} = storeToRefs(store);

const dataChart = computed(() => {
  if(toRaw(resultRangeDate.value)){
    return toRaw(resultRangeDate.value).map((i) => {
      return {
        day: i.day,
        revenue: i.revenue,
        totalQuantity: i.totalQuantity,
        totalPrice: i.totalPrice
      }
    })
  }
});

  const serial = computed(() => {
    if(resultRangeDate.value){
      return [
        {
          type: "bar",
          xKey: "day",
          yKey: "revenue",
          yName: "Revenue",
        },
        {
          type: "bar",
          xKey: "day",
          yKey: "totalQuantity",
          yName: "Total Quantity",
        },
        {
          type: "bar",
          xKey: "day",
          yKey: "totalPrice",
          yName: "Total Price",
        },
      ]
    }
  });


  onMounted(async () => {
    if (props.value) {
       await store.getRevenueByRangeDate({
        start: props.value.start?.toString(),
        end: props.value.end?.toString()
      });
    }
  });



watchEffect(async () => {
  if (props.value) {
    await store.getRevenueByRangeDate({
      start: props.value.start?.toString(),
      end: props.value.end?.toString()
    });
  }
})



</script>
<template>
  <div v-if="loading">
    <Loading/>
  </div>

  <div v-else class="h-full  w-full border  p-2">
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
import {computed, onMounted, toRaw, watchEffect} from "vue";
import {useProfit} from "@/stores/profit.ts"
import {storeToRefs} from "pinia";
import Loading from "@/components/loading.vue";
import CustomChart from "@/components/CustomChart.vue";
import { convertToSentenceCaseCharacter} from "@/lib/utils.ts";

const props = defineProps<{
  value: any
}>()

const store = useProfit();
const {loadingRange:loading, resultRangeDate} = storeToRefs(store);

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
    if(resultRangeDate.value &&  dataChart.value && dataChart.value.length > 0) {
      return Object.keys(dataChart.value[0]).map((j) => {
          return {
            type: "bar",
            xKey: "day",
            yKey: j,
            yName: convertToSentenceCaseCharacter(j).toUpperCase()
          }
      })
    }
  })


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
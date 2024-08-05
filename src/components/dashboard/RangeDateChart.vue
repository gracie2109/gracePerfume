<template>
  <div v-if="loading">
    <Loading/>
  </div>

  <div v-else class="h-full  w-full border border-red-600 p-2">
    <CustomChart />

  </div>


</template>


<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref} from "vue";
import {useProfit} from "@/stores/profit.ts"
import {storeToRefs} from "pinia";
import Loading from "@/components/loading.vue";
import CustomChart from "@/components/CustomChart.vue";




const props = defineProps<{
  value: any
}>()

const store = useProfit();
const {loading} = storeToRefs(store)
const response = ref();




onMounted(async () => {
  if (props.value) {
    const data = await store.getRevenueByRangeDate({
      start: props.value.start?.toString(),
      end: props.value.end?.toString()
    });

    response.value = data;
    // dataset2.value = data.map((index:any, item:any) => {
    //   return {
    //     name: item.id,
    //     value: 12,
    //     color: color[index]
    //   }
    // })
  }

})


onBeforeUnmount(() => {
  response.value = []

})


</script>
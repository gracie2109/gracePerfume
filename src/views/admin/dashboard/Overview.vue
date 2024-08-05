<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-3xl">Dashboard</h1>
     <div class="flex items-center gap-4">
       <CustomDatePicker  :form="form" label="" name="today"/>
       <RangeDateCustom
           :value="rangeDate"
       />
     </div>
    </div>
   <div class="space-y-12">
     <div class="space-y-4">
       <h1 class="font-bold text-2xl">Today Report</h1>
       <MiniTodayChart :form="form"/>
     </div>
     <div class="space-y-4">
       <h1 class="font-bold text-2xl">Weekly Report ({{rangeDate.start}} to {{rangeDate.end}}) </h1>
       <RangeDateChart :value="rangeDate"/>
     </div>
   </div>
  </div>
</template>


<script lang="ts" setup>
import {inject, ref} from 'vue'
import CustomDatePicker from "@/components/ui/CustomCalender.vue";
import {useForm} from "vee-validate";
import MiniTodayChart from "@/components/dashboard/MiniTodayChart.vue";
import RangeDateCustom from "@/components/ui/CustomRangeDatePicker.vue"
import {type DateRangeValueType} from "@/types"
import RangeDateChart from "@/components/dashboard/RangeDateChart.vue";
import {CalendarDate} from "@internationalized/date";


const today = inject('today') as  CalendarDate

const form = useForm({
  initialValues:{
    today: today.toString()
  }
});

const rangeDate = ref<DateRangeValueType>({
  start: today.subtract({days: 7}),
  end: today
});

</script>
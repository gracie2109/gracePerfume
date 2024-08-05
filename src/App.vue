<template>
  <router-view v-slot="{ Component }">
  <transition  name="fade" mode="out-in">
    <UseWindowSize >
    <component :is="Component" />
    </UseWindowSize>
  </transition>
</router-view>
  <TailwindIndicator />
<Toaster position="top-right" rich-colors :duration="1000" />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import TailwindIndicator from "@/components/TailwindIndicator.vue";
import {DateFormatter, getLocalTimeZone, today,CalendarDate} from "@internationalized/date";
import { provide} from "vue";


const timezone = getLocalTimeZone();
const df = new DateFormatter('vi-VN', {
  dateStyle:'medium'
})
let td =  today(timezone) as CalendarDate;
provide('timezone',timezone);
provide('df',df);
provide('today',td)

</script>
<template>
  <router-view v-slot="{ Component }">
  <transition  name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
  <TailwindIndicator />
<Toaster position="top-right" rich-colors :duration="1000" />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import TailwindIndicator from "@/components/TailwindIndicator.vue";
import {DateFormatter, getLocalTimeZone, today} from "@internationalized/date";
import { provide} from "vue";


const timezone = getLocalTimeZone();
const df = new DateFormatter('vi-VN', {
  dateStyle: 'long',
})
let td =  today(timezone);
provide('timezone',timezone);
provide('df',df);
provide('today',td)

</script>
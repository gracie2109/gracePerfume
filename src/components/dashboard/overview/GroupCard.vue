<template>


</template>


<script setup lang="ts">
import {Card, CardDescription,  CardFooter,CardHeader,CardTitle,CardContent} from "@/components/ui/card"
import {reactive} from 'vue'
import { DollarSign } from 'lucide-vue-next';

const data = reactive([
  {
    value:452310,
    percent: '20.1%',
    icon: DollarSign
  },
  {
    value:2350,
    percent: '180.1%'
  },
  {
    value:12234,
    percent: '19%'
  },
  {
    value:573,
    percent: '201%'
  }

])







</script>
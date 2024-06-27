<template>

   <div class="flex gap-8">
     <div class="flex flex-col space-y-3 w-[250px]  " v-for="(_,j) in Array(props.quantity)" :key="j">
       <Skeleton class="h-[20rem] w-full rounded-xl bg-gray-600" />
       <div class="space-y-2">
         <Skeleton class="h-4  bg-gray-600" />
         <Skeleton class="h-7 w-full bg-gray-600" />
       </div>
     </div>

   </div>

</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps<{
  quantity: number
}>()
</script>
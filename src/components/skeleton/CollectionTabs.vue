



<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
  const props = defineProps<{
    quantity:number
  }>()
</script>

<template>
    <div class="container my-8 ">
      <div class="tabs flex gap-12 items-center justify-center">
        <div v-for="j in props.quantity" :key="j">
          <Skeleton class="w-12 h-4  bg-gray-600" />
        </div>
      </div>
    </div>

</template>
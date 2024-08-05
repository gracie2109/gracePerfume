<template>

  <Card class="w-auto ">
    <CardHeader>
      <CardTitle  class="flex justify-between">
        <div>{{props.title}}</div>
       <slot name="header"></slot>

      </CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else>
       <span v-if="props.data">{{props.data}}</span>
        <span v-else>Not found</span>
      </div>
    </CardContent>
  </Card>

</template>
<script setup lang="ts">
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Loading from "@/components/loading.vue";

const props = defineProps<{
  loading:boolean,
  data: string |  number | undefined,
  title:string
}>()
</script>
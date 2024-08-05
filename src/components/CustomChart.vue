<template>

 <div v-if="$props.data">
   <ag-charts
      :options="
          {
            title:$props.title,
             subtitle:$props.subtitle,
             data: $props.data,
             series:$props.series
          }
      "
   />
 </div>
</template>


<script lang="ts" >
import { AgCharts } from "ag-charts-vue3";

export default {
  name: 'CustomChart',
  components: { AgCharts },
  props:[ 'title', 'subtitle', 'data', 'series'],
}

</script>
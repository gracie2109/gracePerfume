<template>

  <div v-html="props.data.description">

  </div>
</template>

<script setup lang="ts">
  console.log('comp1');

  const props = defineProps<{
    data:any
  }>()
</script>
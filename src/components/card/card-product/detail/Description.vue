<template>

  <div v-html="props.data.description">

  </div>
</template>

<script setup lang="ts">

  const props = defineProps<{
    data:any
  }>()
</script>
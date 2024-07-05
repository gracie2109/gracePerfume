<template>
  Cart ProductDetail:
  {{prop.data}}
</template>

<script lang="ts" setup>
  const prop = defineProps<{
    data: any
  }>()

</script>
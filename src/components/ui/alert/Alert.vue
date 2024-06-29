<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
  size?:AlertVariants['size']
}>()
</script>

<template>
  <div :class="cn(alertVariants({ variant, size }), props.class)" role="alert">
    <slot />
  </div>
</template>

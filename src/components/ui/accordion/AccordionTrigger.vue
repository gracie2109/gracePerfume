<script setup lang="ts">
import {type HTMLAttributes, computed, ref} from 'vue'
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue'
import {  PlusIcon, MinusIcon} from '@radix-icons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const open = ref(false);

const handleClick = () => {
  open.value = !open.value
}

</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
        @click="handleClick"
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline ' +
           '[&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">

          <PlusIcon v-if="!open"
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
          />
          <MinusIcon v-else  class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

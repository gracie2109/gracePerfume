<template>
  <Accordion type="single" class="w-full" collapsible >
    <AccordionItem v-for="(item, idx) in listFaq" :key="idx" :value="item.q">
      <AccordionTrigger>{{ item.q }}</AccordionTrigger>
      <AccordionContent>
        <div v-html="item.a"></div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script lang="ts" setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {listFaq} from "@/lib/constant.ts"
</script>
<script setup lang="ts">

import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
// import {type DateRangeValueType} from "@/types"
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils.ts'
import {inject} from "vue"

const df = inject('df') as  DateFormatter
const props = defineProps<{
  value:any
}>()

function updateStart(value:any) {
 if(props.value && value){
   props.value.start = value.start;
   props.value.end = value.end
 }
}



</script>

<template>

  <Popover v-if="props.value">
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !props.value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="props.value.start">
          <template v-if="props.value.end">
            {{ df.format(props.value.start.toDate(getLocalTimeZone())) }} - {{ df.format(props.value.end.toDate(getLocalTimeZone())) }}



          </template>

          <template v-else>
            {{ df.format(props.value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="props.value"
                     initial-focus
                     :number-of-months="2"
                     weekday-format="short"
                     @update:modelValue="(value) => {
                        updateStart(value)
                     }"


      />
    </PopoverContent>
  </Popover>
</template>
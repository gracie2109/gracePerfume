<template>
  <FormField :name="props.name">
    <FormItem class="flex flex-col">
      <FormLabel>{{ props.label }}</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
                :class="cn(
                  'w-[240px] ps-3 text-start font-normal',
                  !value2 && 'text-muted-foreground',
                )"
                class="border p-2 rounded-lg w-[280px] flex items-center" variant="outline"
            >
              <span>{{ value2 ? df.format(toDate(value2)) : "Pick a date" }}</span>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50"/>
            </Button>
            <input hidden>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
              v-model="value2"
              v-model:placeholder="placeholder2"
              :min-value="props.minDate"
              calendar-label="Date of birth"
              initial-focus
              :default-value="props.defaultValue"
              :default-placeholder="props.defaultValue"
              @update:model-value="(v) => {
                if (v) {
                  props.form.setFieldValue(props.name, v.toString())
                }
                else {
                   props.form.setFieldValue(props.name, undefined)
                }
              }"
          />
        </PopoverContent>
      </Popover>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
<script setup lang="ts">
import {cn} from "@/lib/utils.ts";
import {DateFormatter, parseDate} from "@internationalized/date";
import {toDate} from "radix-vue/date";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "@radix-icons/vue";
import {Calendar} from "@/components/ui/calendar";
import {computed, inject, ref} from "vue";


const props = defineProps<{
  name: string;
  form:any;
  minDate?:any;
  maxDate?:any;
  defaultValue?:any,
  label:string
}>();


const value2 = computed({
  get: () => props.form.values[props.name]? parseDate(props.form.values[props.name], ) : undefined,
  set: val => val,
})


const placeholder2 = ref()
const df = inject('df') as  DateFormatter

</script>
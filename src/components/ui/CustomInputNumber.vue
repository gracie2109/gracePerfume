<template>
  <FormField :name="props.name">
    <FormItem>
      <FormLabel>{{ props.label}}</FormLabel>
      <NumberField
          :format-options="newOption"
          :min="props.min"
          :max="props.max"

          class="gap-2"
          @update:model-value="(v) => {
            if (v) props.form.setFieldValue(props.name, v)
            else props.form.setFieldValue(props.name, undefined)

          }"
      >
        <NumberFieldContent>
          <NumberFieldDecrement/>
          <FormControl>
            <NumberFieldInput/>
          </FormControl>
          <NumberFieldIncrement/>
        </NumberFieldContent>
      </NumberField>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field";
import {computed} from "vue";

type Props = {
  label:String,
  option?: "currency" | "disable" | "decimal" | "percentage",
  min: Number,
  max: Number,
  name:String,
  form:any
}
const props = defineProps<Props>();

const newOption = computed(() => {
  if(props.option === "currency") {
    return  {
      style: 'currency',
      currency: 'vnd',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    }
  }
  if(!props.option) return {};

})
</script>
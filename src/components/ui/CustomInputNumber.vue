<template>
  <FormField :name="props.name" >
    <FormItem>
      <FormLabel>{{ props.label}}</FormLabel>
      <!-- currency -->
        <template v-if="props.option">
          <NumberField
              v-if="props.option === 'currency'"
              :disabled="disabled"
              :format-options="{
              style: 'currency',
              currency: 'vnd',
              currencyDisplay: 'code',
              currencySign: 'accounting',
            }"
              :min="props.min"
              :max="props.max"
              class="gap-2"
              @update:model-value="(v) => {
           if (v) props.form.setFieldValue(String(props.name), v)
            else props.form.setFieldValue(String(props.name), undefined)

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

          <!-- percentage -->
          <NumberField
              v-if="props.option ==='percentage'"
              :disabled="disabled"
              :format-options="{
              style: 'percent',
            }"
              :step="props.step"
              class="gap-2"
              @update:model-value="(v) => {
           if (v) props.form.setFieldValue(String(props.name), v)
            else props.form.setFieldValue(String(props.name), undefined)

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

          <!-- decimal -->
          <NumberField
              v-if="props.option === 'decimal'"
              :disabled="disabled"
              :format-options="{
            signDisplay: 'exceptZero',
            minimumFractionDigits: 1,
          }"
              class="gap-2"
              @update:model-value="(v) => {
           if (v) props.form.setFieldValue(String(props.name), v)
            else props.form.setFieldValue(String(props.name), undefined)

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
        </template>
        <template v-else>
          <NumberField
              :disabled="disabled"
              class="gap-2"
              @update:model-value="(v) => {
             if (v) props.form.setFieldValue(String(props.name), v)
            else props.form.setFieldValue(String(props.name), undefined)

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
        </template>
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
import {FormContext, GenericObject} from "vee-validate";

type Props = {
  label:string,
  option?: "currency"  | "decimal" | "percentage",
  min?: number,
  max?: number,
  name:string,
  form: FormContext<GenericObject, GenericObject>,
  disabled?:boolean,
  step?:number
}
const props = defineProps<Props>();

</script>
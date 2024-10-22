<template>
  This is setting app form
  
  <div>
    <Form>
      <form action="">
        <input type="text">
      </form>
    </Form>
  </div>
</template>


<script lang="ts" setup>
  import {Form} from "@/components/ui/form";
  import {FormContext, GenericObject} from "vee-validate";


  const props = defineProps<{
    form: FormContext<GenericObject, GenericObject>,
    formModel: any
  }>()
</script>
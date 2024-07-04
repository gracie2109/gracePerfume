<template>
  <div>
    form:::{{props.form.values}}
  </div>
  <form  class="space-y-4" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Collection Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none"
              v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="media">
      <FormItem>
        <FormLabel>Media</FormLabel>
        <FormControl>
          <Input  v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"  :disabled="props.loading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="props.loading"/>
      Submit
    </Button>
  </form>
</template>

<script lang="ts" setup>

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-vue-next";

const props = defineProps<{
  form :any,
  loading:boolean
}>();

const emit = defineEmits(['handleSubmit']);


const onSubmit = async() => {
  await emit('handleSubmit')
}
</script>
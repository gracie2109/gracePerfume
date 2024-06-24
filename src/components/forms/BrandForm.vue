<template>
  <div>
    <form @submit.prevent="emit('onSubmit')" class="space-y-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
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
      <Button type="submit" :disabled="props.loading">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="props.loading"/>
        Submit
      </Button>
    </form>

  </div>
</template>
<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Loader2} from "lucide-vue-next";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
const emit = defineEmits(['onSubmit']);
const props = defineProps<{
  loading:Boolean,
  form:any
}>()



</script>
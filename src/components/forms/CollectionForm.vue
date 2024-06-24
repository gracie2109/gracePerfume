<template>
  <div>
    {{collections}}
  </div>
  <form  class="space-y-4" @submit.prevent="handleSubmit">
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

    <Button type="submit"  :disabled="loading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading"/>
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
import {useForm} from "vee-validate";
import {useCollectionsStore} from "@/stores/collections.ts"
import {storeToRefs} from "pinia";
const collectionStore = useCollectionsStore();
const {collections, loading} = storeToRefs(collectionStore)
const form = useForm();

const handleSubmit = form.handleSubmit(async(values:any) => {
  await collectionStore.createNewCollection(values)
      .then(() => form.resetForm())
})


</script>
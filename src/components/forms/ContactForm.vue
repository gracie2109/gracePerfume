<template>

  <form action="" @submit.prevent="handleSubmit">
    <div class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email" class="">Email</Label>
        <Input
            id="email"
            v-model.trim="contactModel.email"
            type="email"
            placeholder="m@example.com"
            required
        />
      </div>
      <div class="grid gap-2">
        <Label for="email" class="">Content</Label>
        <Textarea
            id="email"
            v-model.trim="contactModel.content"
            type="email"
            placeholder="m@example.com"
            required
        />
      </div>

      <Button
          type="submit"
          class="w-full bg-custom-accent"
          :disabled="isLoading"
      >
        <LoaderIcon v-if="isLoading" class="mr-1.5 animate-spin" :size="18" />
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </Button>
    </div>

  </form>
</template>

<script setup lang="ts">
import {LoaderIcon} from "lucide-vue-next";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
const contactModel = ref({
  email: '',
  content:''
})
const isLoading = ref<boolean>(false)

function handleSubmit() {

  }
</script>
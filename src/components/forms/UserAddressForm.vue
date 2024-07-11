<template>
  <form @submit.prevent="emit('handleSubmit')">
    <div class="space-y-2">
      <Label>Address Name</Label>
      <Input placeholder="enter address name" v-model="props.formModel.name" />
    </div>

    <ProvinceAddress :form="props.formModel"  />

    <Button class="mt-5" type="submit" :disabled="props.loading" >
      <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="props.loading"/>
      Submit
    </Button>
  </form>
</template>

<script lang="ts" setup>
import ProvinceAddress  from "@/components/ProvinceAddress.vue"
import { UserAddress} from "@/types/location.ts";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import { ReloadIcon } from '@radix-icons/vue';
import {TErrors} from "@/types";


const emit = defineEmits(['handleSubmit']);
const props = defineProps<{
  formModel: Omit<UserAddress, 'id'>,
  loading: boolean,
  errors:TErrors
}>()
</script>
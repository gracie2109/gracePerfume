<template>
  <div class="flex gap-3  items-center justify-between ">
      <div class="w-full max-w-[500px]">
        <Input  v-model="props.searchModel" placeholder="Enter Voucher Name, code..." class="w-full"/>
      </div>
      <div class="gap-y-3  flex gap-x-8">
        <Label>Filter by:</Label>
        <RadioGroup v-model:model-value="props.filterStatus" :default-value="voucherFilter[0]" :orientation="'vertical'" class="flex gap-x-3">
          <div class="flex items-center space-x-2" v-for="i in voucherFilter" :key="i">
            <RadioGroupItem :id="i" :value="i" />
            <Label :for="i" class="capitalize">{{i}}</Label>
          </div>
        </RadioGroup>
      </div>
  </div>

</template>

<script lang="ts" setup>
  import {Input} from "@/components/ui/input";
  import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
  import { Label } from '@/components/ui/label';

  import {voucherFilter} from "@/lib/constant.ts";

  const props = defineProps<{
    searchModel: string,
    filterStatus: string
  }>()
</script>
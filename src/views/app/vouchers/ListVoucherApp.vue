<template>
 <div class="space-y-8 container">
    <div>
      <div class="flex gap-3  items-center justify-between ">
        <div class="w-full max-w-[500px]">
          <Input  v-model="searchModel" placeholder="Enter Voucher Name, code..." class="w-full"/>
        </div>
        <div class="gap-y-3  flex gap-x-8">
          <Label>Filter by:</Label>
          <RadioGroup v-model:model-value="filterStatus" :default-value="voucherFilter[0]" :orientation="'vertical'" class="flex gap-x-3">
            <div class="flex items-center space-x-2" v-for="i in voucherFilter" :key="i">
              <RadioGroupItem :id="i" :value="i" />
              <Label :for="i" class="capitalize">{{i}}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
   <div class="mt-7">
     <div v-if="pending">
       <Loading  />
     </div>
     <div v-if="vouchers" class="grid grid-cols-3 gap-6">
       <div v-for="(i, j) in vouchers" :key="j" class="mb-2" v-if="vouchers">
         <VoucherList :data="i" />
       </div>
     </div>
   </div>
 </div>
</template>

<script lang="ts" setup>
import {useVouchersStore} from "@/stores/vouchers";
import {storeToRefs} from "pinia";
import {ref, watchEffect} from "vue";
import {refDebounced} from "@vueuse/core";
import {voucherFilter} from "@/lib/constant.ts";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import VoucherList from "@/components/card/card-voucher/List.vue";

const voucherStore = useVouchersStore();
const {vouchers, pending} = storeToRefs(voucherStore)


const searchModel = ref<string>("");
const debouncedSearch = refDebounced(searchModel, 1000)
const filterStatus = ref<string>(voucherFilter[0]);


watchEffect(() => {

})
</script>
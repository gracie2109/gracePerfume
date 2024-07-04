<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import CustomAlerDialog from "@/components/ui/CustomAlerDialog.vue";

interface DataTableRowActionsProps {
  row: Row<any>
}
const props = defineProps<DataTableRowActionsProps>();

import {useBrandStore} from "@/stores/brand.ts";
import {Button} from "@/components/ui/button";
import {Edit} from "lucide-vue-next";
import {useRouter} from "vue-router";

const brandStore = useBrandStore();

const handleCancle  = ()  => {

}
const handleConfirm  = async()  => {
  await brandStore.deleteBrand(props.row.original.id.toString())
}
const router = useRouter()


</script>

<template>
    <div class="flex items-center gap-3">
      <CustomAlerDialog
          :title="`Delete item ${props.row.original.name}` "
          trigger-text="Delete"
          @on-cancel="handleCancle"
          @on-confirm="handleConfirm"
      />
      <Button @click="() => {
       router.push(`/admin/brands/edit/${props.row.original.id}`)
     }" size="icon">
        <Edit class="w-4 h-4"/>
      </Button>

    </div>
</template>
<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import CustomAlerDialog from "@/components/ui/CustomAlerDialog.vue";

interface DataTableRowActionsProps {
  row: Row<any>
}
const props = defineProps<DataTableRowActionsProps>();

import {useBrandStore} from "@/stores/brand.ts";

const brandStore = useBrandStore();

const handleCancle  = ()  => {

}
const handleConfirm  = async()  => {
  await brandStore.deleteBrand(props.row.original.id.toString())
}


</script>

<template>
    <CustomAlerDialog
        :title="`Delete item ${props.row.original.name}` "
        trigger-text="Delete"
        @on-cancel="handleCancle"
        @on-confirm="handleConfirm"
    />
</template>
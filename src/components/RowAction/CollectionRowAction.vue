<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import CustomAlerDialog from "@/components/ui/CustomAlerDialog.vue";
import {Edit} from "lucide-vue-next";
import {Button} from "@/components/ui/button"

interface DataTableRowActionsProps {
  row: Row<any>
}
const props = defineProps<DataTableRowActionsProps>();

import {useCollectionsStore} from "@/stores/collections.ts";
import {useRouter} from "vue-router";

const store = useCollectionsStore();
const router = useRouter()

const handleConfirm  = async()  => {
  await store.deleteCollection(String(props.row.original.id))
}

</script>

<template>
   <div class="flex items-center gap-3">
     <CustomAlerDialog
         :title="`Delete item ${props.row.original.name}` "
         trigger-text="Delete"
         @on-confirm="handleConfirm"
     />

     <Button @click="() => {
       router.push(`/admin/collections/${props.row.original.id}`)
     }" size="icon">
       <Edit class="w-4 h-4"/>
     </Button>
   </div>
</template>
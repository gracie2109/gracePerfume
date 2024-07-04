<template>
  <PageHeader :show-back-btn="false" page-title='Collections'  page-desc="Show all products collections" />
  <DataTable :data="collections" :columns="column"
    :create-new-link="'/admin/collections/create'"
    :searchable-columns="[
        {
          title:'Name',
          id: 'name'
        }
    ]"
  />
</template>

<script setup lang="ts">
import {useCollectionsStore} from "@/stores/collections.ts"
import PageHeader from "@/components/PageHeader.vue";
import {storeToRefs} from "pinia";
import type {ColumnDef} from "@tanstack/vue-table";
import {h, reactive} from "vue";
import {Checkbox} from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import CollectionRowAction from "@/components/RowAction/CollectionRowAction.vue";

const store = useCollectionsStore();
const {collections} = storeToRefs(store)


const column: ColumnDef<any>[] = reactive([
  {
    id: 'select',
    header: ({table}) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({row}) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
      'class': 'translate-y-0.5'
    }),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Name'}),

    cell: ({row}) => {
      return h('span', {class: 'max-w-[500px] truncate font-medium'}, row.getValue('name'))
    },
  },
  {
    accessorKey: 'description',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Name'}),

    cell: ({row}) => {
      return h('span', {class: 'max-w-[500px] truncate font-medium'}, row.getValue('description'))
    },
  },
  {
    id: 'actions',
    cell: ({row}) => h(CollectionRowAction, {row}),
  },
])


</script>
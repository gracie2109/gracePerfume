<template>
  <PageHeader  :show-back-btn="false"   page-desc="Show all brands" page-title='Brands' />
  <DataTable
      :columns="newColumn"
      :data="brands"
      :searchableColumns="[
          {
            title: 'Brand name',
            id: 'name'
          }
      ]"
  />
</template>

<script lang="ts" setup>
import {useBrandStore} from "@/stores/brand.ts";
import {storeToRefs} from "pinia";
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type {ColumnDef} from "@tanstack/vue-table";

import {h, reactive} from "vue";
import {Checkbox} from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import BrandRowAction from "@/components/RowAction/BrandRowAction.vue";
import PageHeader from "@/components/PageHeader.vue";

const newColumn: ColumnDef<any>[] = reactive([
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
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Description'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('description'))
    },
  },
  {
    id: 'actions',
    cell: ({row}) => h(BrandRowAction, {row}),
  },
])

const brandStore = useBrandStore()
const {brands} = storeToRefs(brandStore)
</script>
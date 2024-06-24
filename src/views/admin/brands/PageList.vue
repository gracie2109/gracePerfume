<template>
  <div class="my-8  space-y-3">
    <b>Using tanstack table</b>
    <DataTable :data="brands" :columns="newColumn" />
  </div>

  <div class=" space-y-3">
      <b>Using normal table</b>
    <Table>

      <template v-if="brands.length">
        <TableHeader>
          <TableRow>
            <TableHead v-for="(i, j) in Object.keys(brands[0])" :key="j">{{ i }}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(i, j) in brands" :key="j">
            <template v-for="(m) in Object.keys(brands[0])"  :key="m">
              <TableCell>{{i[m]}}</TableCell>
            </template>
            <TableCell>
              <Button variant="destructive" @click="() => handleDelete(i.id)"><Trash class="w-4 h-4"/></Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </template>
      <template v-else>
          No result
      </template>
    </Table>
  </div>
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
import {TableHeader, Table, TableBody, TableCell, TableHead, TableRow} from "@/components/ui/table";
import {Button} from '@/components/ui/button'
import {Trash} from "lucide-vue-next"
const newColumn:ColumnDef<any>[] = reactive([
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Title' }),

    cell: ({ row }) => {
      return   h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('name'))
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Description' }),
    cell: ({ row }) => {
      return   h('span', {}, row.getValue('description'))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(BrandRowAction, { row }),
  },
])

const brandStore = useBrandStore()
const { brands  } = storeToRefs(brandStore);
const handleDelete = async (id:string) => {
  await brandStore.deleteBrand(id)
}
</script>
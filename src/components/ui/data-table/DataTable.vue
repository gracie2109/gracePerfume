<script lang="ts" setup>
import type {ColumnDef, ColumnFiltersState, SortingState, VisibilityState,} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import {ref, watchEffect} from 'vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import {valueUpdater} from '@/lib/utils'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {DataTableSearchableColumn, DataTableFilterableColumn} from "@/types";

interface DataTableProps {
  columns: ColumnDef<any, any>[]
  data: any[],
  searchableColumns?: DataTableSearchableColumn<any>[],
  filterableColumns?:DataTableFilterableColumn<any>[],
  createNewLink?:string
}

const props = defineProps<DataTableProps>()
const data = ref(props.data);

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})


const table = useVueTable({
  get data() {
    return data.value
  },
  get columns() {
    return props.columns
  },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
  enableRowSelection: true,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFilteredRowModel: getFilteredRowModel(),


})
const rerender = () => {
  data.value = [...props.data]
}

watchEffect(() => {
  return rerender()
})



</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar
              :table="table"
              :searchableColumns="props.searchableColumns"
              :filterableColumns="props.filterableColumns"
              :createNewLink="props.createNewLink"
    />
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :props="header.getContext()"
                          :render="header.column.columnDef.header"/>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="w-full">

          <template v-if="table.getRowModel().rows?.length">
            <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
                :colspan="columns.length"
                class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
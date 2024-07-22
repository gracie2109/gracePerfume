<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import { X } from 'lucide-vue-next';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {DataTableSearchableColumn, DataTableFilterableColumn} from "@/types";

interface DataTableToolbarProps {
  table: Table<any>,
  searchableColumns?: DataTableSearchableColumn<any[]>[],
  filterableColumns?:DataTableFilterableColumn<any[]>[],
  createNewLink?:string,
  showViewOption?:boolean
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">

     <template v-if="props.searchableColumns">
       <Input
           v-for="(i, ii) in props.searchableColumns"
           :key="ii"
           :placeholder="`Filter ${i.title}`"
           :model-value="(table.getColumn(String(i.id))?.getFilterValue() as string) ?? ''"
           class="h-8 w-[150px] lg:w-[250px]"
           @input="table.getColumn(String(i.id))?.setFilterValue($event.target.value)"
       />
     </template>

      <Button
          v-if="isFiltered"
          variant="ghost"
          class="h-8 px-2 lg:px-3"
          @click="table.resetColumnFilters()"
      >
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table"  :createNewLink="props.createNewLink" v-if="props.showViewOption || !props.showViewOption" />
  </div>
</template>
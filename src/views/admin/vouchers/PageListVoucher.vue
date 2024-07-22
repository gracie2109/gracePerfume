<template>
  <PageHeader
      :show-back-btn="false"
      page-desc="Show all vouchers"
      page-title='Vouchers' />
    <div v-if="vouchers">
    <DataTable
        :data="vouchers"
        :columns="columns"
        :createNewLink="'/admin/vouchers/create'"
        :searchableColumns="[
          {
            title: 'voucher name',
            id: 'name'
          },
           {
            title: 'Code',
            id: 'code'
          }
      ]"
    />

  </div>
  <div v-if="pending">
    <Loading />
  </div>
  <div v-if="error">
    {{error}}
  </div>
</template>

<script lang='ts' setup>

import PageHeader from "@/components/PageHeader.vue";
import {useVouchersStore} from "@/stores/vouchers";
import {storeToRefs} from "pinia";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import {h, reactive} from "vue";
import Loading from "@/components/loading.vue";
import type {ColumnDef} from "@tanstack/vue-table";
import {Checkbox} from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
const store = useVouchersStore();
const {vouchers,  pending, error} = storeToRefs(store);

const columns: ColumnDef<any>[] = reactive([
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
    accessorKey: 'code',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Code'}),

    cell: ({row}) => {
      return h('span', {class: 'max-w-[500px] truncate font-medium'}, row.getValue('code'))
    },
  },
  {
    accessorKey: 'quantity',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'quantity'}),

    cell: ({row}) => {
      return h('span', {}, row.getValue('quantity'))
    },
  },
  {
    accessorKey: 'usage',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'usage'}),

    cell: ({row}) => {
      return h('span', {}, row.getValue('usage'))
    },
  },
  {
    accessorKey: 'number_of_usage',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'number_of_usage'}),

    cell: ({row}) => {
      return h('span', {}, row.getValue('number_of_usage'))
    },
  },
  {
    accessorKey: 'startDate',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'startDate'}),

    cell: ({row}) => {
      return h('span', {}, row.getValue('startDate'))
    },
  },
  {
    accessorKey: 'endDate',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'endDate'}),

    cell: ({row}) => {
      const endDate = (row.getValue('startDate') || 'Unlimited') as string
      return h('span', {}, endDate)
    },
  },


])






</script>
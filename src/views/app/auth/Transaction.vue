<template>
  <div class="h-screen">
    <div v-if="loading" class="h-full">
        Loading....
    </div>
    <div v-if="currentUserOrder">
      <h4 class="font-semibold">All Your Order</h4>
      <DataTable
          :columns="newColumn"
          :data="currentUserOrder"
      /></div>
  </div>
</template>
<script setup lang="ts">
import {useCheckout} from "@/stores/checkout";
import {h, onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import type {ColumnDef} from "@tanstack/vue-table";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import {format } from "date-fns";
import {formatPrice} from "@/lib/utils.ts";
import {useRouter} from "vue-router";

const router = useRouter()
const store = useCheckout();
const {currentUserOrder, loading} = storeToRefs(store);

onMounted(async () => {
  await store.getCurrentUserOrder()
});

const newColumn: ColumnDef<any>[] = reactive([
  {
    id: 'action',
    header: () => h('span', {}, '#'),

    cell: () => {return h('p',{}, '')}
  },
  {
    accessorKey: 'orderCode',
    header: () => h('span', {}, 'Order Code'),

    cell: ({row}) => {
      return h('p', {class: 'hover:text-red-600 cursor-pointer font-medium', onClick:() =>
          router.push({name: 'transactionsDetail', params: {id: row.original.id}})
        }, row.getValue('orderCode'))
    },
  },
  {
    accessorKey: 'orderDate',
    header: () => h('span', {}, 'Order Date'),

    cell: ({row}) => {
      const newDate = format(row.getValue('orderDate'),"dd-MM-yyyy HH:mm:ss");
      return h('span', {class: 'max-w-[500px] truncate font-medium'}, newDate)
    },
  },
  {
    accessorKey: 'status',
    header: ({column}) => h(DataTableColumnHeader, {column, title: ' Status'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('status'))
    },
  },
  {
    accessorKey: 'fulfillmentStatus',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Fulfillment Status'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('fulfillmentStatus'))
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Payment Status'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('paymentStatus'))
    },
  },
  {
    accessorKey: 'price',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Total Price'}),
    cell: ({row}) => {
      const price = formatPrice(row.getValue('price'))
      return h('span', {}, price)
    },
  },
  {
    accessorKey: 'totalItem',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Total Item'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('totalItem'))
    },
  },

])
</script>
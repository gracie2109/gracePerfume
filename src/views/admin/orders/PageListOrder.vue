<template>
  <div>
    <PageHeader :show-back-btn="false" page-desc="Show all orders" page-title='Orders'/>
    pending:::{{pending}}
    error:::{{error}}
    <div v-if="allOrder">
      <DataTable
          :columns="newColumn"
          :data="allOrder"
          :searchableColumns="[
              {
                title: 'User Name',
                id: 'userName',
              },
               {
                title: 'order Code',
                id: 'orderCode',
              }
          ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useCheckout} from "@/stores/order";
import PageHeader from "@/components/PageHeader.vue";
import {storeToRefs} from "pinia";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import {ColumnDef} from "@tanstack/vue-table";
import {h, reactive} from "vue";
import {format} from "date-fns";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import {formatPrice} from "@/lib/utils.ts";
import {useRouter} from "vue-router";
const store = useCheckout();
const {allOrder, pending, error} = storeToRefs(store);
const router = useRouter();


const newColumn: ColumnDef<any>[] = reactive([
  {
    accessorKey: 'orderCode',
    header: () => h('span', {}, 'Order Code'),

    cell: ({row}) => {
      return h('p', {class: 'hover:text-red-600 cursor-pointer font-medium', onClick:() =>
            router.push({name: 'ordersDetail', params: {id: row.original.id}})
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
    accessorKey: 'totalQuantity',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Total Quantity'}),
    cell: ({row}) => {
      const data = `${row.getValue('totalQuantity')} (${row.original.totalItem} items)`
      return h('span', {}, data)
    },
  },
  {
    accessorKey: 'userName',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'User'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('userName'))
    },
  },

])

</script>

import {ColumnDef} from "@tanstack/vue-table";
import {reactive,h} from "vue";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import {formatPrice} from "@/lib/utils.ts";
import {format} from "date-fns";
import {useRouter} from "vue-router";


const router = useRouter();
export const newColumn: ColumnDef<any>[] = reactive([
  {
    accessorKey: 'orderCode',
    header: () => h('span', {}, 'Order Code'),

    cell: ({row}) => {
      return h('p', {class: 'hover:text-red-600 cursor-pointer font-medium', onClick:() =>
            router.push({name: 'orderDetail', params: {id: row.original.id}})
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
  {
    accessorKey: 'userName',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'User'}),
    cell: ({row}) => {
      return h('span', {}, row.getValue('userName'))
    },
  },

])
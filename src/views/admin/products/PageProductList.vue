<template>
  <PageHeader :show-back-btn="false" page-title='Products'  page-desc="Show all products"/>


  <DataTable :data="products" :columns="column"
             :create-new-link="'/admin/products/create'"
             :searchable-columns="[
            {
              title:'Name',
              id: 'name'
            }
    ]"
  />
</template>
<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import {useProductStore} from '@/stores/products.ts';
import {storeToRefs} from "pinia";
import type {ColumnDef} from "@tanstack/vue-table";
import {h, reactive} from "vue";
import {Checkbox} from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import ProductRowAction from "@/components/RowAction/ProductRowAction.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import fallbackImage from '@/assets/images/fallback.jpg'
const store = useProductStore();
const {products} =storeToRefs(store);


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
    accessorKey: 'images',
    header: () => h('div', {}, 'Images'),
    cell: ({row}) => {
      const images = row.getValue('images') as string[];
      if (images && images.length > 0)  return h('img', {class: 'w-10 h-10 object-cover', src: images[0], alt: 'Image'});
      else return h('img', {class: 'w-10 h-10 object-cover', src: fallbackImage, alt: 'Image'});
    },
  },
  {
    accessorKey: 'name',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Name'}),
    cell: ({row}) => {
      return h('span', {class: 'max-w-[500px] truncate font-medium'}, row.getValue('name'))
    },
  },

  {
    id: 'actions',
    cell: ({row}) => h(ProductRowAction, {row}),
  },
])



</script>
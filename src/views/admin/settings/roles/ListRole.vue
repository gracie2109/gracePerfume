<template>
  <PageHeader :show-back-btn="false" page-title="List Role" />


   <DataTable
       v-if="roles"
       :columns="column"
       :data="roles"
       :createNewLink="'/admin/settings/roles/create'"
       :searchableColumns="[
      {
        title: 'Role name',
        id: 'name',
      },
    ]"
   />
  {{roles}}
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import {useRoles} from "@/stores/roles.ts";
import {storeToRefs} from "pinia";
import {h, onMounted, reactive} from 'vue'
import type {ColumnDef} from "@tanstack/vue-table";
import {Checkbox} from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue"
import BrandRowAction from "@/components/RowAction/BrandRowAction.vue";
const roleStore = useRoles();
 const {roles} = storeToRefs(roleStore);



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
  // {
  //   accessorKey: 'permission',
  //   header: ({column}) => h(DataTableColumnHeader, {column, title: 'Permission'}),
  //
  //   cell: ({row}) => {
  //     const name = (row.getValue('permission') as any)?.map((i:any) => i.name);
  //     // const renderName = name.length <= 1 ? name : `${name} + ${name.length} other`;
  //     // console.log('renderName', renderName);
  //     return h('span', {class: 'max-w-[500px] truncate font-medium'}, name)
  //   },
  // },
  {
    id: 'actions',
    cell: ({row}) => h(BrandRowAction, {row}),
  },
])

onMounted(async() => {
  await roleStore.fetchPermissionsDetail2()
});
</script>

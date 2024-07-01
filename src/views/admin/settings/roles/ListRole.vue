<template>
  <PageHeader :show-back-btn="false" page-title="List Role" />
  <router-link :to="$router.resolve({ name: 'adminSettingRoleCreate' })"
    >Create role</router-link
  >
  <!-- <DataTable
    :columns="columns"
    :data="roleRef"
    :searchableColumns="[
      {
        title: 'Role name',
        id: 'name',
      },
    ]"
  /> -->

</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import { h, onMounted, reactive, toRaw,ref } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useRoles } from "@/stores/roles";
import { ColumnDef } from "@tanstack/vue-table";
import { storeToRefs } from "pinia";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import BrandRowAction from "@/components/RowAction/BrandRowAction.vue";
import { useCollection, useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";

const roleStore = useRoles();
const roles = ref<any[] | null>(null)
const roleRef = toRaw(roles)
const columns: ColumnDef<any>[] = reactive([
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),

    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("name")
      );
    },
  },
  {
    accessorKey: "permissions",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Permisions" }),
    cell: ({ row }) => {
  
      return h("span", {},  row.getValue("name"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => h(BrandRowAction, { row }),
  },
]);

const db = useFirestore();

 function getAllRoles (){
  const roles = useCollection(collection(db, "roles"));
  const permissions = useCollection(collection(db, 'permissions'))
}
onMounted( () => {
   getAllRoles()
})
</script>

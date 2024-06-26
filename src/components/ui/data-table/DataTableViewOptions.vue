<script lang="ts" setup>
import type {Table} from '@tanstack/vue-table'
import {computed} from 'vue'
import {PlusCircle, Settings2, Trash} from 'lucide-vue-next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<any>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
    .filter(
        column =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide(),
    ))

const rowSelected = computed(() => {
  return (props.table.getIsSomeRowsSelected() || props.table.getIsAllRowsSelected())
})

const selectedLength = computed(() => {
  return props.table.getSelectedRowModel().rows.length
})

</script>

<template>
  <div class="flex gap-3 items-center">
    <AlertDialog v-if="rowSelected">
      <AlertDialogTrigger><Button size="sm" variant="destructive"><Trash class="w-4 h-4 mr-2" />Delete</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {{selectedLength }} item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <Button size="sm" variant="outline" @click="$router.push('/admin/brands/create')">
      <PlusCircle class="mr-2 h-4 w-4" />
      Create
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
            class="ml-auto hidden h-8 lg:flex"
            size="sm"
            variant="outline"
        >
          <Settings2 class="mr-2 h-4 w-4"/>
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[150px]">
        <DropdownMenuLabel>Show column</DropdownMenuLabel>
        <DropdownMenuSeparator/>

        <DropdownMenuCheckboxItem
            v-for="column in columns"
            :key="column.id"
            :checked="column.getIsVisible()"
            class="capitalize"
            @update:checked="(value) => column.toggleVisibility(!!value)"
        >
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
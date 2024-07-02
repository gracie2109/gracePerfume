<template>
  <PageHeader :page-title="'List Permissions'" :page-desc="'Manager all permissions'" />

  <div class="w-full flex justify-end" @click="() => {
    $router.push('/admin/settings/permissions/create')
  }">
    <Button variant="outline">
      <PlusCircle class="w-4 h-4 mr-2" />
      Create
    </Button>
  </div>

  <div class="relative">
    <Table class="relative z-20" :class="clsx({ 'opacity-50': loading })">
      <TableHeader>
        <TableRow>
          <TableHead class="w-[120px]">Indentity</TableHead>
          <TableHead>Methods</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        <template v-for="(i, ii) in indentity" :key="ii">
          <TableRow>
            <TableCell @click="handleOpen(i)" class="flex items-center w-[120px] ">
              <ChevronDown class="w-4 h-4 mr-2" :class="clsx({'rotate-180':openKeys.includes(i)})"/>{{ i }}
            </TableCell>
            <template v-for="(j, jj) in dataConvert.data" :key="jj">
              <template v-for="(k, kk) in Object.keys(j)" :key="kk">
                <template v-if="k === i" >
                  <template v-for="(m, mm) in j[Object.keys(j).toString()]" :key="mm">
                    <TableCell v-if="m">{{ m['name'].split('.').at(-1) }}</TableCell>
                  </template>
                </template>
              </template>
            </template>
          </TableRow>
          <transition name="fade" mode="out-in">
            <div v-if="openKeys.includes(i)" >
              <Table class="py-5 pl-6 bg-slate-100 w-full mt-3">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <template v-for="(j, jj) in dataConvert.data" :key="jj">
                    <template v-for="(k, kk) in Object.keys(j)" :key="kk">
                      <template v-if="k === i">
                        <TableRow v-for="(m, mm) in j[Object.keys(j).toString()]" :key="mm">
                          <template v-if="m !== null">
                            <TableCell>{{ m['name'] }}</TableCell>
                            <TableCell>
                              <div class="flex items-center gap-x-3">
                                <CustomAlerDialog :title="`Delete ${m.name}`" trigger-text="Delete" @on-confirm="deleteItem(m)" />
                              </div>
                            </TableCell>
                          </template>
                        </TableRow>
                      </template>
                    </template>
                  </template>
                </TableBody>
              </Table>
            </div>
          </transition>
        </template>

      </TableBody>
    </Table>

    <div class="absolute top-0  w-full h-full  opacity-0 z-10 text-red-600" :class="clsx({ 'opacity-100': loading })">
      <Loading />
    </div>
  </div>

</template>


<script lang="ts" setup>
import { usePermissionStore } from "@/stores/permissions";
import { storeToRefs } from "pinia";
import PageHeader from "@/components/PageHeader.vue";
import {computed, ref} from "vue";
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from "@/components/ui/table"
import { groupByPermissions } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { PlusCircle,ChevronDown   } from "lucide-vue-next"
import CustomAlerDialog from "@/components/ui/CustomAlerDialog.vue"
import { clsx } from "clsx";
import Loading from "@/components/loading.vue"

const perStore = usePermissionStore();
const { permissions, loading } = storeToRefs(perStore);
const openKeys = ref<string[]>([]);


type Response = {
  data: any[],
  methods: string[]
}

const newPer = computed(() => {
  if (permissions.value) {
    return permissions.value.map((i) => {
      return {
        ...i,
        id: i.id
      } as any
    })
  }
  else return []
})
const indentity = computed(() => [...new Set(newPer.value.map((i) => i?.indentity))])

const dataConvert = computed(() => {
  const data = groupByPermissions(newPer.value)
  return data as Response
});

const handleOpen = (key: string) => {
  if (!openKeys.value?.includes(key)) openKeys.value = [...openKeys.value, key]
  else {
    const filter = openKeys.value.filter((i) => i !== key);
    openKeys.value = filter
  }
}

const deleteItem = async (item: any) => {

  await perStore.deletePermissions(item.id)
}


</script>
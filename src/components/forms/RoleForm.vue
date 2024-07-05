<template>
  <form class="space-y-6 grid" @submit.prevent="handleSubmit">
      <div>
        <FormLabel> Role Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Cashier..." v-model="newRoles.name" name="name"/>
        </FormControl>
        <span v-if="nameError">{{ nameError }}</span>
      </div>
  
      <p>Choose Methods</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div class="space-x-2">
                <label for="checkall">Check All</label>
                <Checkbox
                  id="checkall"
                  type="checkbox"
                  @update:checked="handleSelectAll"
                  :checked="selectAll"
                />
              </div>
            </TableHead>
            <TableHead v-for="(i, j) in modifyPermissions.methods" :key="j">
              <div class="grid text-left">
                <label :for="i">{{ i }}</label>
                <Checkbox
                  type="checkbox"
                  :id="i"
                  @update:checked="(e) => chooseMethods(e, i)"
                  :checked="checkedMethods.includes(i) ? true : false"
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody v-if="modifyPermissions.data">
          <template v-for="(i) in modifyPermissions.data" :key="`tpl-${i}`">
            <TableRow  >
              <TableCell>
                {{ Object.keys(i).toString() }}
              </TableCell>
              <template v-for="(j, jj) in i[Object.keys(i).toString()]">
                <template v-if="j">
                  <TableCell :key="jj">
                    <Checkbox
                      :data-name="j['name']"
                      :data-method="j['name'].split('.')[2]"
                      :id="j['name']"
                      :data-value="JSON.stringify(j)"
                      :checked=" newRoles.permissions.some((o) => o.id === j['id'])"
                      @update:checked="(e) => handleSingleChange(e, j)"
                    />
                  </TableCell>
                </template>
                <template v-else>
                  <TableCell :key="jj"> </TableCell>
                </template>
              </template>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    <Button type="submit" class="mt-8 w-40" :disabled="props.loading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="props.loading" />
      <span v-if="props.loading">Loading </span>
      <span v-else>Submit</span>
    </Button>
  </form>
</template>

<script lang="ts" setup>
import {  useField } from "vee-validate";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { usePermissionStore } from "@/stores/permissions";
import { storeToRefs } from "pinia";
import { computed, ref, toRef, watchEffect } from "vue";
import {
  groupByPermissions,
  getUniquePermissions,
  matchingTwoObject,
  getQuantityOfPermission,
  reduceData,
} from "@/lib/utils";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { watch } from "vue";

const permissionStore = usePermissionStore();
const { permissions } = storeToRefs(permissionStore);

type Response = {
  methods: string[];
  data: any[];
};
const nameError = computed(() => {
  const { errorMessage } = useField('name');
  return errorMessage
});

const modifyPermissions = computed(() => {
  if (permissions.value) {
    const newPermissions = permissions.value.map((i) => {
      return {
        ...i,
        id: i.id,
      };
    });
    const data = groupByPermissions(newPermissions) as Response;
    return data;
  } else return { methods: [], data: [] };
});
const checkedMethods = ref<string[]>([]);
const newRoles= ref<{ name: string; permissions: any[] }>({
  name: "",
  permissions: [],
});

const selectAll = ref(false);


function chooseMethods(e: boolean, m: string) {
  const inputs = document.querySelectorAll(`button[data-method='${m}']`);
  const data = [] as any[];

  inputs.forEach((e) => {
    const value = e.getAttribute("data-value") as any;
    data.push(JSON.parse(value));
  });
  if (e) {
    newRoles.value.permissions = newRoles.value.permissions
      ? [...newRoles.value.permissions, ...data].flatMap((i) => i)
      : [...data];
    checkedMethods.value = [...checkedMethods.value, m];
  } else {
    const filterMethods = checkedMethods.value.filter((i) => i !== m);
    checkedMethods.value = filterMethods;
    const clearPer = getUniquePermissions(data, newRoles.value.permissions);
    newRoles.value.permissions = clearPer;
  }
}

function handleSingleChange(e: boolean, m: any) {
  if (e) {
    newRoles.value.permissions = [...newRoles.value.permissions, m];
  } else {
    const filterSingle = newRoles.value.permissions?.filter(
      (i: any) => i?.id !== m?.id
    );
    newRoles.value.permissions = filterSingle;
  }
}

const handleSelectAll = (e: any) => {
  if (e) {
    selectAll.value = true;
    newRoles.value.permissions = [...permissions.value];
    checkedMethods.value = [...modifyPermissions.value.methods];
  } else {
    selectAll.value = false;
    newRoles.value.permissions = [];
    checkedMethods.value = [];
  }
};

const props = defineProps<{
  // form: FormContext<GenericObject, GenericObject>;
  loading: boolean;
  endTask:boolean
}>();

watchEffect(() => {
  if (newRoles.value.permissions.length === permissions.value.length) {
    selectAll.value = true;
  } else {
    selectAll.value = false;
  }
  const recordInPermission = getQuantityOfPermission(newRoles.value.permissions);
  const count = reduceData(
    permissions.value.flatMap((i) => i.name.split(".")?.at(-1))
  );
  const data = matchingTwoObject(recordInPermission, count);
  if (data) checkedMethods.value = data;

});

const emit = defineEmits(["onSubmit"]);

function handleSubmit() {
 emit('onSubmit',toRef(newRoles))
}

watch(() => props.endTask, () => {
  if(props.endTask) {
    newRoles.value.name = "";
    newRoles.value.permissions = []
  }
})


</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>

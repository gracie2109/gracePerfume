<template>
  <form @submit.prevent="submitHandle"  class="space-y-6 grid">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem v-auto-animate>
          <FormLabel> Role Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Cashier..." v-bind="componentField"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>


    <Table>

      <TableHeader>
        <TableRow>
          <TableHead class=""></TableHead>
          <TableHead v-for="(i, j) in baseMethods" :key="j">
            <div class="grid text-left">
              <label :for="i">{{i}}</label>
              <Checkbox :id="i"
                  @click.prevent="getByMethods(i)"/>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-for="(i) in modifyPermissions" >
          <TableRow>
            <TableCell>
              {{ Object.keys(i).toString() }}
            </TableCell>
            <template v-for="(j) in i[Object.keys(i).toString()]">
                <template v-if="j">
                  <TableCell>
                    <Checkbox
                      :data-name="j['name']"
                      :data-method="j['name'].split('.')[2]"
                      :id="j['name']"
                      :data-value="JSON.stringify(j)"
                    />
                    <small>{{j['name'].split('.')[2]}}</small>
                  </TableCell>
                </template>
              <template v-else>
                <TableCell> </TableCell>
              </template>
            </template>
          </TableRow>
        </template>


      </TableBody>
    </Table>


    <Button type="submit" class="mt-8 w-40" :disabled="props.loading">
        <Loader2  class="w-4 h-4 mr-2 animate-spin" v-if="props.loading"/>
        <span v-if="props.loading">Loading  </span>
        <span v-else>Submit</span>
    </Button>
  </form>

  {{modifyPermissions}}
</template>


<script lang="ts" setup>
import {FormControl, FormItem, FormLabel, FormMessage, FormField} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {FormContext, GenericObject} from "vee-validate";
import {Button} from "@/components/ui/button"
import {Loader2} from "lucide-vue-next";
import {usePermissionStore} from "@/stores/permissions";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {groupByPermissions} from "@/lib/utils.ts";
import {baseMethods} from "@/lib/constant.ts"
import {TableHead, TableHeader,TableRow,TableCell, TableBody, Table} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";

const permissionStore = usePermissionStore();
const {permissions} = storeToRefs(permissionStore)

const modifyPermissions = computed( () => {
  if(permissions.value){
    const newPermissions = permissions.value.map((i) => {
      return {
        ...i,
        id: i.id
      }
    });
    console.log("newPermissions", newPermissions)
    const data = groupByPermissions(newPermissions);
    return data
  }
  else return []
})



function getByMethods(i:string) {

  const nodes = document.querySelectorAll(`button[data-method='${i}']`);

  const data = [] as any[];
  nodes.forEach((e) => {
    const value = e.getAttribute("data-value") as any;
    data.push(JSON.parse(value))
  })
  // const data = [] as any[];

  console.log('data', data);

}

























const props = defineProps<{
  form: FormContext<GenericObject, GenericObject>,
  loading: boolean
}>();

















const emit = defineEmits(['onSubmit']);



const submitHandle = async() => {  await emit('onSubmit')};



</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
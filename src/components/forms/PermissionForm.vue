<template>
  <form @submit.prevent="submitHandle"  class="space-y-6 grid">
    <div class="mb-8">
      <Alert size="small">
      <TriangleAlert class="h-4 w-4" />
      <AlertTitle>Permissions follow by rule:</AlertTitle>
      <AlertDescription>
         PERMISSION.INDENTITY_NAME.METHOD
      </AlertDescription>
    </Alert>
    </div>
      <FormField v-slot="{ componentField }" name="name">
        <FormItem v-auto-animate>
          <FormLabel> Indentity Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="users, products...." v-bind="componentField"/>
          </FormControl>
          <FormDescription>Not support Vietnam tone</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="methods">
        <FormItem >
          <div class="mb-4">
            <FormLabel class="text-base">
              Methods
            </FormLabel>
          </div>

           <div class="flex  gap-3 " >
            <FormField v-for="item in baseMethods" v-slot="{ value, handleChange }" :key="item" type="checkbox" :value="item" :unchecked-value="false" name="methods">
              <FormItem class="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                      :checked="value.includes(item) || value"
                      @update:checked="handleChange"
                  />
                </FormControl>
                <FormLabel class="font-normal">
                  {{ item }}
                </FormLabel>
              </FormItem>
            </FormField>
          </div>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="text-sm border rounded-sm p-3" v-if="allPermission">
          <p class="text-red-600 font-semibold">Preview:</p>
          <ol v-for="(i, j) in allPermission" :key="j">
           <li> {{i}}</li>
          </ol>
      </div>

    <Button type="submit" class="mt-8 w-40" :disabled="props.loading">
        <Loader2  class="w-4 h-4 mr-2 animate-spin" v-if="props.loading"/>
        <span v-if="props.loading">Loading  </span>
        <span v-else>Submit</span>
    </Button>

  </form>
</template>


<script lang="ts" setup>
import {FormControl, FormItem, FormLabel, FormMessage, FormField, FormDescription} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {FormContext, GenericObject} from "vee-validate";
import {Button} from "@/components/ui/button"
import {Loader2} from "lucide-vue-next";
import {Alert,AlertDescription, AlertTitle} from "@/components/ui/alert"
import {baseMethods} from "@/lib/constant.ts";
import { TriangleAlert } from 'lucide-vue-next';
import { Checkbox } from '@/components/ui/checkbox';
import {ref, watch} from "vue";
import {usePermissionStore} from "@/stores/permissions.ts"


const props = defineProps<{
  form: FormContext<GenericObject, GenericObject>,
  loading: boolean
}>();

const allPermission = ref<string[] | null>(null)

const emit = defineEmits(['onSubmit']);
const store = usePermissionStore()


const submitHandle = async() => {  await emit('onSubmit')};

watch(props.form.values, () => {
  const {name, methods} = props.form.values;
  if(name && methods.length> 0) allPermission.value = store.modifyData({name, methods})
  else allPermission.value = null
})




</script>
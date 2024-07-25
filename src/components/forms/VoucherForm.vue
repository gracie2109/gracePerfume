<template>

  <form class="space-y-8" @submit.prevent="emits('onSubmit')">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="code">
      <FormItem>
        <FormLabel>Code</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="type" type="radio">
      <FormItem class="space-y-3">
        <FormLabel>Choose condition</FormLabel>

        <FormControl>
          <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
          >
            <FormItem class="flex items-center space-y-0 gap-x-3">
              <div class="flex gap-3">
                <div v-for="(i, j) in voucherCondition" :key="j" class="border p-4 rounded-lg">
                  <FormItem class="flex gap-3 items-center">
                    <FormControl>
                      <RadioGroupItem :id="i.value" :value="i.value"/>
                    </FormControl>
                    <FormLabel :for="i.value">{{ i.name }}</FormLabel>
                  </FormItem>
                  <small class="ml-7 inline-block">{{ i.desc }}</small>
                </div>
              </div>
            </FormItem>

          </RadioGroup>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <div class="space-y-3">
      <FormField v-slot="{ componentField }" name="discount_by.type" type="radio">
        <FormItem class="space-y-3 w-full">
          <FormLabel>Discount By</FormLabel>
          <FormControl>
            <RadioGroup
                class="flex flex-col space-y-1"
                v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3 w-72">
                <div class="flex gap-3">
                  <div v-for="(i, j) in discount_by" :key="j" class="border p-4 rounded-lg">
                    <FormItem class="flex gap-3 items-center w-[280px]">
                      <FormControl>
                        <RadioGroupItem :id="i" :value="i"/>
                      </FormControl>
                      <FormLabel :for="i">{{ i }}</FormLabel>
                    </FormItem>
                    <small class="ml-7 inline-block">{{ i }}</small>
                  </div>
                </div>
              </FormItem>

            </RadioGroup>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>

      <div class="grid grid-cols-2 gap-3 items-start">
        <CustomInputNumber
            :form="props.form"
            :min="discountBy.type == discount_by[0] ? 1 : 1000"
            :name="'discount_by.value'"
            :option="discountBy.type == discount_by[0] ? 'percentage' : 'currency'"
            label="Discount  (percentage or cash)"
        />


        <CustomInputNumber
            :form="props.form"
            :min="1000"
            :option="'currency'"
            label="Maximum Discount Cash"
            name="discount_by.maxValue"
        />
      </div>
    </div>

    <div class="w-[280px]">
      <CustomInputNumber
          v-if="type !== 'product_discount'"
          :form="props.form"
          :min='10000'
          :name="'minPrice'"
          label="Minimum order price to apply"
          option="currency"
      />

    </div>
    <div class="w-[280px]">
      <CustomInputNumber
          :form="props.form"
          :min='1'
          :name="'quantity'"
          label="Quantity Voucher"
      />
    </div>


    <FormField v-slot="{ componentField }" name="number_of_usage" type="radio">
      <FormItem class="space-y-3 w-full">
        <FormLabel>Number of usage</FormLabel>
        <FormControl>
          <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
          >
            <FormItem class="flex items-center space-y-0 gap-x-3 w-72">
              <div class="flex gap-3">
                <div v-for="(i, j) in number_of_usage" :key="j" class="border p-4 rounded-lg">
                  <FormItem class="flex gap-3 items-center w-[280px]">
                    <FormControl>
                      <RadioGroupItem :id="i.value" :value="i.value"/>
                    </FormControl>
                    <FormLabel :for="i.value">{{ i.name }}</FormLabel>
                  </FormItem>
                  <small class="ml-7 inline-block">{{ i.name }}</small>
                </div>
              </div>
            </FormItem>

          </RadioGroup>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-3">
      <CustomCalender :form="props.form" label="StartDate" name="startDate"/>
      <CustomCalender :form="props.form" label="endDate" name="endDate"/>
    </div>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <QuillEditor v-model:content="props.description"
                       content-type="html"
                       theme="snow"
                       v-bind="componentField"
                       @update:content="(e:any) => {
                          props.form.setFieldValue('description', e);
                       }"
          />
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>



    <div v-if="type === 'product_discount' && newProduct">
      <Dialog v-model:open="openDialog">
        <DialogTrigger as-child>
          <Button variant="outline">
            Choose product <span v-if="selectedProduct">({{ selectedProduct.length }} items)</span>
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
          <DialogHeader class="p-6 pb-0">
            <DialogTitle> Choose product <span v-if="newProduct">({{ selectedProduct.length }}/ {{ newProduct.length }} items)</span>
            </DialogTitle>
            <DialogDescription>
              Choose product to discount
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex flex-col justify-between h-[300dvh] ">
              <div v-if="newProduct">

                <DataTable :columns="column" :data="newProduct"
                           :searchable-columns="[
                                    {
                                      title:'Name',
                                      id: 'name'
                                    }
                           ]"
                           :show-pagination="false"
                           :show-view-option="false"
                />
              </div>
              <div v-else>
                NOT FOUND PRODUCTS
              </div>


            </div>
          </div>

          <DialogFooter class="p-6 pt-0 flex items-center">
            <Button type="submit" @click="saveProduct">
              Save changes
            </Button>
            <Button type="submit" variant="destructive" @click="cancel">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <Button :disabled='props.loading'>
      <ReloadIcon v-if="props.loading" class="w-4 h-4 mr-2 animate-spin"/>
      Submit
    </Button>
  </form>
</template>

<script lang="ts" setup>

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {discount_by, number_of_usage, voucherCondition} from "@/lib/constant"
import CustomInputNumber from "@/components/ui/CustomInputNumber.vue";
import CustomCalender from '@/components/ui/CustomCalender.vue';
import {FormContext, GenericObject} from "vee-validate";
import {ReloadIcon} from '@radix-icons/vue'
import {Button} from '@/components/ui/button'
import {computed, h, reactive, ref, watchEffect} from "vue";
import {useProductStore} from "@/stores/products"
import {storeToRefs} from "pinia";
import {modifyVariantProduct} from "@/lib/utils.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type {ColumnDef} from "@tanstack/vue-table";
import {Checkbox} from "@/components/ui/checkbox";
import fallbackImage from "@/assets/images/fallback.jpg";
import DataTableColumnHeader from "@/components/ui/data-table/DataTableColumnHeader.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import {isAfter} from "date-fns";

const props = defineProps<{
  form: FormContext<GenericObject, GenericObject>,
  description: string,
  loading: boolean
}>();


const type = computed(() => props.form.values.type);
const discountBy = computed(() => props.form.values.discount_by)
const emits = defineEmits(['onSubmit']);
const productStore = useProductStore();
const {products} = storeToRefs(productStore);
const selectedProduct = ref<string[]>([]);
const openDialog = ref(false);

const column: ColumnDef<any>[] = reactive([
  {
    id: 'select',
    header: ({table}) => h(Checkbox, {
      'checked': (table.getIsAllPageRowsSelected() || (newProduct.value && selectedProduct.value.length === newProduct.value.length)) || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => {
        table.toggleAllPageRowsSelected(!!value);
        if (newProduct.value && newProduct.value.length > 0) selectedProduct.value = value ? [...newProduct.value.map((i) => i.uid)] : [];
      },
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({row}) => h(Checkbox, {
      'checked': row.getIsSelected() || selectedProduct.value.includes(row.original.uid),
      'onUpdate:checked': (value) => {
        row.toggleSelected(!!value);
        if (value) {
          selectedProduct.value = selectedProduct.value.length > 0 ? [...selectedProduct.value, row.original.uid] : [row.original.uid]
        } else {
          selectedProduct.value = selectedProduct.value.filter((i) => i !== row.original.uid)
        }
      },
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
      if (images && images.length > 0) return h('img', {class: 'w-10 h-10 object-cover', src: images[0], alt: 'Image'});
      else return h('img', {'class': 'w-10 h-10 object-cover', src: fallbackImage, alt: 'Image', lazy: true});
    },
  },
  {
    accessorKey: 'name',
    header: ({column}) => h(DataTableColumnHeader, {column, title: 'Name'}),
    cell: ({row}) => {
      return h('span', {class: ' truncate font-medium'}, row.getValue('name'))
    },
  },
])

const newProduct = computed(() => {
  if (products.value && products.value.length > 0) {
    return modifyVariantProduct(products.value)
  }
});

const saveProduct = () => {
  props.form.setFieldValue('product_apply', selectedProduct.value);
  openDialog.value = false;
}
const cancel = () => {
  openDialog.value = false;
  selectedProduct.value = []
}

watchEffect(() => {
  const {endDate, startDate, discount_by} = props.form.values
  const check = isAfter(startDate, endDate);
  if (check) {
    props.form.setFieldError('endDate', "EndDate must before StartDate");
  }

  if (discount_by.type === 'percent' && (discount_by.value < 0 || discount_by.value > 100)) {
    props.form.setFieldError('discount_by.type', 'Percent around 1 - 100%')
  }
})
</script>

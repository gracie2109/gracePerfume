<template>

  <form class="space-y-4" @submit="onSubmit">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hoodie.." type="text" v-bind="componentField"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
          <Textarea
              class="resize-none"
              placeholder="Tell us a little bit about yourself"
              v-bind="componentField"
          />
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
           <CustomInputNumber :min="1" :form="form"  :name="'price'" :label="'Price'" />
          </CardContent>

        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent class="space-y-8">
            <div class="flex gap-3 ">
              <div>
                <CustomInputNumber
                    :form="form"
                    :name="'price'"
                    :label="'Price'"
                    :min="100"
                    :option="'currency'"
                />
              </div>
              <div>
                <CustomInputNumber
                    :form="form"
                    :name="'cost'"
                    :label="'Cost'"
                    :min="10"
                    :option="'currency'"
                />
              </div>
            </div>
            <div class="flex gap-3 ">
              <div>
                <CustomInputNumber
                    :form="form"
                    :name="'cost_per_item'"
                    :label="'Cost per item'"
                    :min="10"
                    :option="'currency'"
                />
              </div>
              <div>
                <FormField v-slot="{ componentField }" data-disabled name="profit" :model-value="profit">
                  <FormItem>
                    <FormLabel> Profit</FormLabel>
                    <FormControl>
                      <Input  placeholder="----" type="text" v-bind="componentField" readonly/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>
              </div>
              <div>

                <FormField v-slot="{ componentField }" name="profit_margin" :model-value="`${profit}%`">
                  <FormItem>
                    <FormLabel>Profit margin</FormLabel>
                    <FormControl>
                      <Input placeholder="----" type="text" v-bind="componentField" readonly />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variant</CardTitle>
          </CardHeader>
          <CardContent>

            <div class="p-3">
              <FieldArray v-slot="{ fields, push, remove }" name="variants">

                <div v-for="(field, index) in fields" :key="`variants-${field.key}`"
                     class="flex gap-3 mb-3 items-center">
                  <FormField v-slot="{ componentField }" :name="`variants[${index}].unit`">
                    <FormItem>
                      <FormLabel v-if="index===0">Unit</FormLabel>
                      <div class="relative flex items-center">
                        <FormControl>
                          <Input placeholder="enter unit" type="text" v-bind="componentField"/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" :name="`variants[${index}].price`">
                    <FormItem>
                      <FormLabel v-if="index===0">Price</FormLabel>
                      <div class="relative flex items-center">
                        <FormControl>
                          <Input placeholder="enter price" type="text" v-bind="componentField"/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" :name="`variants[${index}].quantity`">
                    <FormItem>
                      <FormLabel v-if="index===0">Quantity</FormLabel>
                      <div class="relative flex items-center">
                        <FormControl>
                          <Input placeholder="enter price" type="text" v-bind="componentField"/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  </FormField>

                  <div :class="clsx({'pt-8': index === 0})">
                    <Button size="icon" variant="link" @click="remove(index)">
                      <XIcon class="w-4 h-4"/>
                    </Button>
                  </div>
                </div>

                <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    @click="() => {
                   push({ unit: '',  price: 0, quantity: 0 })
                }"
                >
                  <PlusCircle class="w-4 h-4 mr-2"/>
                  Add Variant
                </Button>
              </FieldArray>
            </div>
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1">
        <Card>
          <CardHeader></CardHeader>
            <CardContent class='space-y-8'>
              <FormField v-slot="{ value, handleChange }" name="status">
                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div class="space-y-0.5">
                    <FormLabel class="text-base">
                      Status
                    </FormLabel>

                  </div>
                  <FormControl>
                    <Switch
                        :checked="value"
                        @update:checked="handleChange"
                    />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="brand">
                <FormItem>
                  <FormLabel>Brands</FormLabel>

                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brands"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>

                        <template v-if="brands.length > 0">
                          <SelectItem v-for="(i,ii) in brands" :key="ii" :value="i.id">
                            {{ i.name }}
                          </SelectItem>
                        </template>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <div class="space-y-3">
                <label class="font-semibold text-sm my-3">Collection</label>
                <TagsInput :model-value="modelValue" class="px-0 gap-0 w-80">
                  <div class="flex gap-2 flex-wrap items-center px-3">
                    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                      <TagsInputItemText/>
                      <TagsInputItemDelete/>
                    </TagsInputItem>
                  </div>


                  <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full">
                    <ComboboxAnchor as-child>
                      <ComboboxInput as-child placeholder="Framework...">
                        <TagsInputInput :class="modelValue.length > 0 ? 'mt-2' : ''" class="w-full px-3"
                                        @keydown.enter.prevent/>
                      </ComboboxInput>
                    </ComboboxAnchor>

                    <ComboboxPortal>
                      <CommandList
                          class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                          position="popper"
                      >
                        <CommandEmpty/>
                        <CommandGroup>
                          <template v-if="filteredFrameworks">
                            <CommandItem
                                v-for="(framework, j) in filteredFrameworks" :key="j" :value="framework.name"
                                @select.prevent="(ev) => {
                        if (typeof ev.detail.value === 'string') {
                          searchTerm = ''
                          modelValue.push(ev.detail.value);
                        }

                        if (filteredFrameworks.length === 0) {
                          open = false
                        }
                      }"
                            >
                              {{ framework.name }}
                            </CommandItem>
                          </template>

                        </CommandGroup>
                      </CommandList>
                    </ComboboxPortal>
                  </ComboboxRoot>
                </TagsInput>
              </div>
            </CardContent>

        </Card>

      </div>
    </div>
    <div class="">
      <Button type="submit">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin"/>
        Submit
      </Button>
    </div>
  </form>
  {{form.values}}

  {{profit}}
</template>


<script lang="ts" setup>
import {Button} from "@/components/ui/button";
import {Loader2, PlusCircle, XIcon} from "lucide-vue-next";

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {computed, ref, toRefs} from 'vue'

import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import { Switch } from '@/components/ui/switch'

import {FieldArray, useForm} from 'vee-validate';
import {useBrandStore} from "@/stores/brand.ts";
import CustomInputNumber from "@/components/ui/CustomInputNumber.vue";
import {storeToRefs} from "pinia";
import clsx from "clsx"
import {useCollectionsStore} from "@/stores/collections.ts"
import {ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot} from 'radix-vue'
import {CommandEmpty, CommandGroup, CommandItem, CommandList} from '@/components/ui/command'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import {profitAndMarginAlg} from "@/lib/utils.ts"



const loading = ref(false);
const brandStore = useBrandStore();
const {brands} = storeToRefs(brandStore)

const collectionStore = useCollectionsStore();
const {collections} = storeToRefs(collectionStore)


const modelValue = ref<string[]>([]);

const open = ref(false)
const searchTerm = ref('')

const filteredFrameworks = computed(() =>
    collections.value.filter((i: any) => !modelValue.value.includes(i.name))
)


const form = useForm()
const profit = computed(() => {
  return  profitAndMarginAlg(form.values['price'], form.values['cost'], form.values['cost_per_item'])
})

const onSubmit = form.handleSubmit((values) => {
  const newCollection = toRefs(modelValue)
  const payload = {...values, collections: newCollection}
  console.log("submit", payload)
})
</script>
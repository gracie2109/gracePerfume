<template>

  <keep-alive>
    <div>
      {{ form.values['quantity'] }}
      <div v-if="errors.message">
        <transition mode="out-in" name="fade">
          <Alert variant="destructive">
            <AlertCircle class="w-4 h-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {{ errors.message }}
            </AlertDescription>
          </Alert>
        </transition>

      </div>
      <form class="space-y-4" @submit="onSubmit">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
              </CardHeader>
              <CardContent class="space-y-6">
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
                      <QuillEditor v-model:content="description"
                                   content-type="html"
                                   theme="snow"
                                   v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="quantity">
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="..." type="text" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>
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
                        :label="'Price'"
                        :min="100"
                        :name="'price'"
                        :option="'currency'"
                    />
                  </div>
                  <div>
                    <CustomInputNumber
                        :form="form"
                        :label="'Cost'"
                        :min="10"
                        :name="'cost'"
                        :option="'currency'"
                    />
                  </div>
                </div>
                <div class="flex gap-3 ">
                  <div>
                    <CustomInputNumber
                        :form="form"
                        :label="'Cost per item'"
                        :min="10"
                        :name="'cost_per_item'"
                        :option="'currency'"
                    />
                  </div>
                  <div>
                    <FormField v-slot="{ componentField }" :model-value="profit" data-disabled name="profit">
                      <FormItem>
                        <FormLabel> Profit</FormLabel>
                        <FormControl>
                          <Input placeholder="----" readonly type="text" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    </FormField>
                  </div>
                  <div>

                    <FormField v-slot="{ componentField }" :model-value="`${profit}%`" name="profit_margin">
                      <FormItem>
                        <FormLabel>Profit margin</FormLabel>
                        <FormControl>
                          <Input placeholder="----" readonly type="text" v-bind="componentField"/>
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
                          <div class="relative flex items-start">
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
                            if(!fields.length){
                              push({ unit: '',  price: 0, quantity: 0 })
                            }else{
                                  const newData = toRaw(fields) as any
                                  const checkUnit = newData.every((i:any) =>(( i.value.value.unit) as string).length > 0);
                                  const checkQuantity = newData.every((i:any) => (i.value.value.quantity) as number > 1);
                                  const checkPrice = newData.every((i:any) => (i.value.value.price) as number > 1000 && (i.value.value.price) as number<= 10000000);
                                  if(checkUnit && checkQuantity && checkPrice) push({ unit: '',  price: 0, quantity: 0 })
                                }
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
          <div class="col-span-1 space-y-6">
            <Card>
              <CardHeader>Media</CardHeader>
              <CardContent>
                <FormField v-slot="{ componentField }" name="images">
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Upload :folder-name="'product'" :limit="3" v-bind="componentField" @set-images="setImages"/>

                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>


              </CardContent>
            </Card>
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
    </div>
  </keep-alive>


</template>


<script lang="ts" setup>
import {Button} from "@/components/ui/button";
import {AlertCircle, Loader2, PlusCircle, XIcon} from "lucide-vue-next";
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {computed, ref, toRaw} from 'vue';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Switch} from '@/components/ui/switch'

import {FieldArray, useForm} from 'vee-validate';
import {useBrandStore} from "@/stores/brand.ts";
import {useProductStore} from "@/stores/products";
import CustomInputNumber from "@/components/ui/CustomInputNumber.vue";
import {storeToRefs} from "pinia";
import clsx from "clsx";
import {profitAndMarginAlg, removeVietnameseTones} from "@/lib/utils.ts"
import Upload from "@/components/Upload.vue"
import {productValidation} from "@/validation/products.ts"
import {toTypedSchema} from "@vee-validate/zod";

const brandStore = useBrandStore();
const productStore = useProductStore();
const {brands} = storeToRefs(brandStore)
const {loading, errors} = storeToRefs(productStore);
const description = ref<string>("")


const form = useForm({
  validationSchema: toTypedSchema(productValidation),
  keepValuesOnUnmount: true
})
const profit = computed(() => {
  if (form.values['price'] && form.values['cost'] && form.values['cost_per_item']) {
    return profitAndMarginAlg(form.values['price'], form.values['cost'], form.values['cost_per_item'])
  } else return 0
})


const setImages = (images: any[]) => {
  form.setFieldValue('images', images)
}


const onSubmit = form.handleSubmit(async (values) => {

  const payload = {...values, slug: removeVietnameseTones(values.name), description: description.value};
  console.log('onSubmit', payload)
  await productStore.createNewProducts(payload)

})


</script>
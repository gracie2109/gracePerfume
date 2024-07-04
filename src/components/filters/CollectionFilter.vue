<template>
  <div class="space-y-8">
    <h3 class="text-2xl font-semibold capitalize">Filter</h3>
    <div>

     <div :class="clsx('p-5 text-muted-foreground text-sm space-y-5',{
      'hidden':!props.fieldsChange.length,
      'block':props.fieldsChange.length
      })">
       <div class="grid space-y-3 "  >
         <div class="flex gap-3 items-start" v-for="(i, ii) in props.fieldsChange" :key="ii">
           <button @click="deleteFilter(i)">X</button>
           <div class="flex flex-wrap items-start gap-2">
             <b>{{ i }}: </b>
             <template v-if="i && props.filterModel[i]" >
               <div v-if="i === 'price'" class="text-black" >
                 {{ formatPrice(props.filterModel['price']['min']) }} - {{formatPrice(props.filterModel['price']['max']) }}
               </div>
               <div v-if="i === 'brands' || i === 'attributes'">
                 <div v-if="props.filterModel[i].length <= 3"> {{ props.filterModel[i].toString() }}</div>
                 <div v-else> {{props.filterModel[i].slice(0,3).toString()}} + ...more</div>
               </div>
             </template>
           </div>
         </div>
       </div>
       <button @click="deleteAll" class="cursor-pointer">
         X Delete All
       </button>
     </div>
      <Accordion type="multiple" collapsible >
        <AccordionItem v-if="mode !== 'brand'" value="brands">
          <AccordionTrigger class="font-semibold text-md hover:no-underline">Brands</AccordionTrigger>
          <AccordionContent>

           <div class="grid gap-3" v-if="brands">

             <template v-for="(i, ii) in brands" :key="ii">
             <div class="flex gap-2">
               <input  type="checkbox" :id="i.name" :value="i.name" v-model="props.filterModel.brands"
                       @change="handleChange('brands')"
                       class="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
               />
               <label :for="i.name">{{ i.name }}</label>
             </div>
             </template>

           </div>

          </AccordionContent>
        </AccordionItem>
        <AccordionItem v-if="mode !== 'collection'" value="collections">
          <AccordionTrigger class="font-semibold text-md hover:no-underline">Collections</AccordionTrigger>
          <AccordionContent>
            <div class="flex  gap-3 w-full flex-wrap" >

              <template v-for="(i, ii) in collections" :key="ii">
                <div class="flex gap-2">
                  <input  type="checkbox" :id="i.id" :value="i.id" v-model="props.filterModel.collections"
                          @change="handleChange('collections')"
                          class="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label :for="i.id">{{ i.name }}</label>
                </div>
              </template>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger class="font-semibold text-md hover:no-underline">Price</AccordionTrigger>
          <AccordionContent>
        <div class="px-2 my-12">
          <CustomMinMaxSlider    :min="0"
                                 :max="3000000"
                                 v-model:min-value="props.filterModel.price.min "
                                 v-model:max-value="props.filterModel.price.max"
                                 @change="handleChange('price')"
          />
        </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="attribute">
          <AccordionTrigger class="font-semibold text-md hover:no-underline">Attribute</AccordionTrigger>
          <AccordionContent>
            <div class="flex  gap-3 w-full flex-wrap" >

              <template v-for="(i, ii) in baseAttribute" :key="ii">
                <div class="flex gap-2">
                  <input  type="checkbox" :id="i" :value="i" v-model="props.filterModel.attributes"
                          @change="handleChange('attributes')"
                          class="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label :for="i">{{ i }}</label>
                </div>
              </template>

            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

    </div>
  </div>


</template>


<script setup lang="ts">
  import {useBrandStore} from "@/stores/brand";
  import {useCollectionsStore} from "@/stores/collections"
  import {storeToRefs} from "pinia";
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
  import CustomMinMaxSlider from "@/components/CustomMinMaxSlider.vue"
  import {Label} from "@/components/ui/label";
  import {baseAttribute} from '@/lib/constant.ts';
  import {formatPrice} from "@/lib/utils.ts";
  import {clsx} from "clsx";

  const brandStore = useBrandStore();
  const collectionStore = useCollectionsStore();

  const props = defineProps<{
    filterModel:any,
    initVal:any,
    fieldsChange: string[],
    mode:string
  }>()

  const emit = defineEmits(['deleteFilter','reset','changeFields'])
  const {brands} = storeToRefs(brandStore);
  const {collections} = storeToRefs(collectionStore);


  const handleChange = (fieldName: string) => {
    emit('changeFields', fieldName)
  }

  const deleteFilter = (field:string) => {
    emit('deleteFilter', field);
  }
  const deleteAll = () => {
    emit('reset');
  }


</script>

<style scoped>

</style>
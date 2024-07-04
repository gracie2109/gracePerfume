<template>
   <div class="container space-y-12">
      <div id="header">
        <h3 class="text-lg font-semibold capitalize">
          {{ mode }}
        </h3>
        <ScrollArea class=" rounded-md w-full whitespace-nowrap">
          <div class="flex py-4 space-x-4 w-max">

         <template v-if="mode === 'brand'">
           <div v-for="brand in brands" :key="brand.id">
             <figure class="shrink-0">
               <div class="overflow-hidden rounded-md w-20 h-20 ">
                 <RouterLink :to="`${mode}/${brand.name}`">
                   <img
                       :src="fallbackImage"
                       :alt="`Photo of ${brand.name}`"
                       class="aspect-[3/4] w-20 h-20  object-cover rounded-full"
                   >
                 </RouterLink>
               </div>
               <figcaption class="pt-2 text-xs text-muted-foreground text-center">
                 <RouterLink :to="`${mode}/${brand.name}`">{{brand.name }}</RouterLink>
               </figcaption>
             </figure>
           </div>
         </template>

          <template v-else>
            <div v-for="collection in collections" :key="collection.id">
              <figure class="shrink-0">
                <div class="overflow-hidden rounded-md w-20 h-20 ">
                  <RouterLink :to="`${mode}/${collection.name}`">
                    <img
                        :src="fallbackImage"
                        :alt="`Photo of ${collection.name}`"
                        class="aspect-[3/4] w-20 h-20  object-cover rounded-full"
                    >
                  </RouterLink>
                </div>
                <figcaption class="pt-2 text-xs text-muted-foreground text-center">
                  <RouterLink :to="`${mode}/${collection.name}`">{{collection.name }}</RouterLink>
                </figcaption>
              </figure>
            </div>
          </template>




          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

     <div id="content">
       List product of {{mode}}
     </div>




   </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import {ref, onMounted } from "vue"
  import {useBrandStore} from "@/stores/brand.ts";
  import {useCollectionsStore} from "@/stores/collections.ts";
  import {storeToRefs} from "pinia";
  import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"


  import fallbackImage from  "@/assets/images/fallback.jpg";




  const route = useRoute();

  const mode = ref<string>('')
  const brandStore = useBrandStore();
  const collectionStore = useCollectionsStore();

  const {brands} = storeToRefs(brandStore);
  const {collections} = storeToRefs(collectionStore)


  onMounted(() => {
    if(route.name === "collections") mode.value ='collection';
    else mode.value='brand'
  })

</script>
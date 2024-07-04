<template>

  <div class="grid xl:grid-cols-3  xl:gap-5 sm:gap-3 w-full container relative">
      <div id="left" class="relative h-screen xl:col-span-1 ">
        <div class="absolute w-full h-full  p-3 overflow-y-auto ">
          <CollectionFilter :filterModel="filterModel"
                            :initVal="initVal"
                            :fieldsChange="changeFields"
                            :mode="mode"
                            @delete-filter="deleFilter"
                            @reset="reset"
                            @change-fields="handleChange"
          />
        </div>
      </div>

      <div class="xl:col-span-2 relative">
        <div class="md:absolute sm:relative  w-full h-full  p-3 overflow-y-auto ">
         <div class="sort_header flex items-center justify-between">
           <div class="flex-1 flex items-center gap-x-5">
             <div class="text-xl font-semibold capitalize">Product List</div>
             <div><b>56</b> product</div>
           </div>
           <div class="flex gap-5 items-center">
             <p>Sort By</p>
             <div>
               <Select v-model="filterModel.sort" :default-value="baseFilter[0]['value']">
                 <SelectTrigger class="w-[180px]" >
                   <SelectValue placeholder="Default"/>
                 </SelectTrigger>
                 <SelectContent>
                   <SelectGroup>
                     <SelectItem :value="i.value" v-for="(i,ii) in baseFilter" :key="ii" >
                       {{i.name}}
                     </SelectItem>
                   </SelectGroup>
                 </SelectContent>
               </Select>
             </div>
           </div>
         </div>

          <div class="sort_content">
           <div>
             changeFields:::{{changeFields}}
           </div>
            <div>
              filterModel:::{{filterModel}}
            </div>
            <div>
              mode::: {{mode}}
            </div>
          </div>
        </div>
      </div>
  </div>
</template>



<script setup lang="ts">
  import CollectionFilter from "@/components/filters/CollectionFilter.vue";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import {Ref, ref, onUnmounted, watchEffect, onMounted} from "vue";
  import {baseFilter} from "@/lib/constant"
  import {useRoute} from "vue-router";
  import {arraysEqual} from "@/lib/utils.ts";


  const filterModel:Ref<any> = ref({
    brands: [],
    price: {
      min:0,
      max:3000000
    },
    attributes:[],
    collections:[],
    sort:baseFilter[0]['value']
  })
  const initVal:Ref<any> = ref( {
    brands: [],
    price: {
      min:0,
      max:3000000
    },
    attributes:[],
    collections:[],
    sort:''
  })

  const mode = ref<string>('')
  const route = useRoute();
  const changeFields = ref<string[]>([]);
  let timeout: ReturnType<typeof setTimeout>


  const deleFilter = (field:string) => {
    if(field === "price"){
     filterModel.value.price.min = initVal.value.price.min;
      filterModel.value.price.max = initVal.value.price.max;
    }else {
      filterModel.value[field] = [...initVal.value[field]];
    }
    changeFields.value = changeFields.value.filter((i) => i!== field)
  }

  const reset = () => {
    filterModel.value ={...initVal.value};
    changeFields.value=[]
  }

  const handleChange = (fieldName: string) => {
    const changes = arraysEqual(initVal.value, filterModel.value);
    if(!changes) {
      const data = [...new Set([...changeFields.value, fieldName])] as string[];
      changeFields.value = data
    }else  changeFields.value = []

  }



watchEffect( () => {
  if(changeFields.value.length > 0){
      const queryPrice = `&min=${filterModel.value.price.min}&max=${filterModel.value.price.max}`;
      const querySort=`&sort=${filterModel.value.sort}`;

      timeout = setTimeout(() => {
          console.log(`${route.fullPath}?${queryPrice}&${querySort}`);
        },3000)
  }
});


onMounted(() => {
  if(route.name === 'collectionDetail') mode.value = 'collection'
  else mode.value='brand'
})
onUnmounted(() => {
  clearTimeout(timeout);
  reset();
  changeFields.value=[];
})

</script>


<style scoped>
::-webkit-scrollbar {
  width: 10px;

}

::-webkit-scrollbar-track {
  background:  #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 25px;
  height: 3px
}

</style>
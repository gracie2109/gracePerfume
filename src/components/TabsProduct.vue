<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';
import ProductDetail from '@/components/card/card-product/detail/Description.vue';
import Reviews from '@/components/card/card-product/detail/Review.vue'
import Terms from '@/components/Term.vue';
import FAQ from '@/components/FAQ.vue'

const tabsList = ['Product Detail', 'Reviews', 'Terms of service', 'FAQ'];
const props = defineProps<{
  data:any
}>()
</script>

<template>
  <TabsRoot
      class="flex flex-col w-full w-full"
      :default-value="tabsList[0]"
  >
    <TabsList
        class="relative shrink-0 flex border-b  "
        aria-label="Manage your account"
    >
      <TabsIndicator class="absolute px-8 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full duration-300">
        <div class="bg-custom-primary w-full h-full" />
      </TabsIndicator>
      <TabsTrigger v-for="(i, ii) in tabsList" :key="ii"
          class="bg-white h-[45px] cursor-pointer flex-1 flex items-center justify-center text-[15px] leading-none select-none  rounded-tl-md  hover:text-grass11 data-[state=active]:text-grass11 outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
          :value="i"
        >
        {{i}}
      </TabsTrigger>
    </TabsList>
    <TabsContent class="grow p-5 bg-white rounded-b-md outline-none " :value="tabsList[0]">
     <ProductDetail :data="props.data"/>
    </TabsContent>
    <TabsContent class="grow p-5 bg-white rounded-b-md outline-none"   :value="tabsList[1]">
      <Reviews />
    </TabsContent>
    <TabsContent class="grow p-5 bg-white rounded-b-md outline-none" :value="tabsList[2]">
      <Terms />
    </TabsContent>
     <TabsContent class="grow p-5 bg-white rounded-b-md outline-none"  :value="tabsList[3]">
       <FAQ />
    </TabsContent>


  </TabsRoot>
</template>
<template>

    <div class="w-full text-center">
      <h2 class="scroll-m-20  pb-2 text-4xl font-semibold tracking-tight  first:mt-0 capitalize">
        Collections
      </h2>
    </div>

    <div class="container my-6">
      <div class="tabs flex gap-12 items-center justify-center">
        <template v-if="collections.length > 0">
          <div v-for="(i, ii) in collections" :key="ii" class="cursor-pointer" @click="changeTab(i.id)">
        <div :class="clsx({
              'border-b-4   w-full border-cara-blue h-full ':(i.id === initTabs)
            })"
              class="capitalize font-semibold text-xl "

        >
            {{ i.name }}
        </div>
          </div>
        </template>
        <template v-else>
          <SkeletonCollectionTabs :quantity="5"/>
        </template>

      </div>
    </div>

    <div id="tabs_content" class="flex pt-8 flex-wrap items-center justify-between gap-3 container">
      <div v-for="(i, j) in products" :key="j" class="w-60" v-if="products.length">
        <CardProductList :data="i"/>
      </div>
      <div v-else>
        <SkeletonCard :quantity="5"/>
      </div>
    </div>
    <div class="container mt-8 grid place-items-center">
      <router-link to="/" class="text-custom-primary font-semibold flex items-center gap-3  hover:text-custom-accent ">View More <ChevronsRight /></router-link>
    </div>

</template>

<script lang="ts" setup>
import {useCollectionsStore} from '@/stores/collections';
import {useProductStore} from '@/stores/products'
import {storeToRefs} from 'pinia'
import {clsx} from "clsx"
import {ref, watchEffect} from "vue";
import CardProductList from "@/components/card/card-product/List.vue"
import SkeletonCard from "@/components/skeleton/CardSkeleton.vue"
import SkeletonCollectionTabs from "@/components/skeleton/CollectionTabs.vue"
import {ChevronsRight} from "lucide-vue-next"
const collectionStore = useCollectionsStore();
const productStore = useProductStore();
const {collections} = storeToRefs(collectionStore);
const {products} = storeToRefs(productStore);
const initTabs = ref<string | null>(null)

function changeTab(index: string) {
  initTabs.value = index
}


watchEffect(() => {
  if (collections.value && collections.value.length > 0) {
    const id = collections?.value[0]?.id
    initTabs.value = id
  }
})

</script>
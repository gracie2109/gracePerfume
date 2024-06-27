<template>
  <div class="w-full text-center">
    <h2 class="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight  first:mt-0 capitalize">
      Collections
    </h2>
  </div>

  <div class="container my-8">
    <div class="tabs flex gap-12 items-center justify-center">
      <template v-if="collections.length > 0">
        <div v-for="(i, ii) in collections" :key="ii" class="cursor-pointer" @click="changeTab(i.id)">
        <span :class="clsx({
              'border-b-2 border-custom-accent ':(i.id === initTabs)
            })"
              class="capitalize font-semibold "

        >{{ i.name }}</span>
        </div>
      </template>
      <template v-else>
        <SkeletonCollectionTabs :quantity="5"/>
      </template>

    </div>
  </div>

  <div id="tabs_content" class="flex flex-wrap items-center justify-between gap-3 container">
    <div v-for="(i, j) in Array(5)" :key="j" class="w-60" v-if="collections.length">
      <CardProductList :data="i"/>
    </div>
    <div v-else>
      <SkeletonCard :quantity="5"/>
    </div>
  </div>


</template>

<script lang="ts" setup>
import {useCollectionsStore} from '@/stores/collections'
import {storeToRefs} from 'pinia'
import {clsx} from "clsx"
import {ref, watchEffect} from "vue";
import CardProductList from "@/components/card/card-product/List.vue"
import SkeletonCard from "@/components/skeleton/CardSkeleton.vue"
import SkeletonCollectionTabs from "@/components/skeleton/CollectionTabs.vue"

const collectionStore = useCollectionsStore();
const {collections} = storeToRefs(collectionStore);
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
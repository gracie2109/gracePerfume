<template>
  <ul :class="[`flex relative ${navLinksClass}`] ">
    <MenuLink v-for="link in links" :key="link.text" :link="link"/>
    <!--collections-->
    <DropdownMenu>
      <DropdownMenuTrigger class="flex gap-2 items-center">
        Collections
        <ChevronDown/>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-40 ">

        <template v-if="collections">

          <DropdownMenuItem v-for="(i,j) in collections" :key="j">
            <router-link :to="`/collections/${i.name}`" class="capitalize cursor-pointer">{{ i.name }}</router-link>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>

    <!--brands-->
    <div class="relative">
      <div class="brands relative flex gap-2" @click.stop="handleOpen" >
        <p>Brands</p>
        <ChevronDown :class="clsx({  'rotate-[180deg] transition all duration-200': openBrands})"/>
      </div>
      <div v-if='openBrands'
           class="absolute -left-[40rem] top-10  bg-white  min-h-12  will-change-auto w-[80vw]  rounded-lg ">
        <div class="flex gap-3 p-2 ">
          <div class="flex items-center">
            <input id="all" class="hidden" name="brand" type="radio" value="all" @change="changeBrand('all')">
            <label :class="clsx({'active': !currentBrands || currentBrands=== 'all'})" class=" label_custom" for="all">All</label>
          </div>
          <div v-for="(i, j) in alphabet" :key="j" class="flex items-center">
            <input :id="i" :value="i" class="hidden" name="brand" type="radio" @change="changeBrand(i)"

            >
            <label :class="clsx({'active': i === currentBrands})" :for="i"
                   class=" label_custom"
            >
              {{ i }}
            </label>
          </div>
        </div>


        <div class="relative list_brands w-full min-h-24" v-on-click-outside.bubble="dropdownHandler">
          <div v-if="currentBrands === 'all'" class="grid grid-cols-5">
            <div v-for="(i, j) in newBrands" :key="j" class=" ">
              <router-link :to="`collection/${i}`" class="hover:text-custom-primary">{{ i }}</router-link>
            </div>
          </div>
          <div v-else class="grid grid-cols-5">

            <div v-for="(i, j) in listBrandByChar" :key="j" class=" ">
              <router-link :to="`collection/${i}`" class="hover:text-custom-primary">{{ i }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ul>

</template>

<script lang="ts" setup>
import {computed, ref, inject} from "vue";
import MenuLink from "./Link.vue";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu';

import {ChevronDown} from "lucide-vue-next";
import {useCollectionsStore} from '@/stores/collections.ts';
// import {useBrandStore} from '@/stores/brand.ts';
import {storeToRefs} from "pinia";
import {clsx} from "clsx"
import {getAllAlphabet, getBrandsByCharacter, groupBrands} from "@/lib/utils.ts";
import {cloneBrands} from "@/lib/constant.ts";
import type { OnClickOutsideHandler } from '@vueuse/core'


const collectionStore = useCollectionsStore();
const {collections} = storeToRefs(collectionStore)
// const brandStore = useBrandStore();

// const {brands} = storeToRefs(brandStore);

// console.log(brands.value)
const newBrands = computed(() => groupBrands(cloneBrands))
const alphabet = getAllAlphabet();
const openBrands = ref<boolean>(false)

const currentBrands = ref('all')
const listBrandByChar = ref([])

function handleOpen() {
  openBrands.value = !openBrands.value
}

function changeBrand(brand: string) {
  currentBrands.value = brand;
  listBrandByChar.value = getBrandsByCharacter(cloneBrands, brand)
}

const dropdownHandler: OnClickOutsideHandler = () => {
  openBrands.value = false;
  listBrandByChar.value=[]
}





const props = withDefaults(
    defineProps<{
      type?: string
    }>(),
    {
      type: 'mobile'
    }
)

const links = ref([
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'About Us',
    url: '/about-us'
  },
  {
    text: 'Contact',
    url: '/contact'
  },
])


const navLinksClass = computed<string>(() => {
  return props.type === 'mobile'
      ? 'flex-col space-y-6 h-screen px-8 py-28 landscape:justify-around'
      : 'items-center gap-x-8 xl:gap-x-14'
})
</script>

<style scoped>
.label_custom {
  border: 1px solid slategrey;
  padding: 1px 6px;
  border-radius: 5px;
  width: 30px;
  text-align: center;
  color: black;
  cursor: pointer
}

.active {
  background-color: red;
  color: white;
  border: none;
  outline: none
}

.list_brands {
  color: black;
  margin-top: 12px;
  padding: 5px
}
</style>
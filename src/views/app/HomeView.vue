<!--<script lang="ts" setup>-->
<!--import { useFirebaseStorage, useStorageFile, useCurrentUser } from 'vuefire'-->
<!--import { ref as storageRef } from 'firebase/storage'-->
<!--import {computed, ref, watch} from "vue";-->
<!--import {useFileDialog} from "@vueuse/core";-->
<!--import {PlusCircle} from "lucide-vue-next"-->
<!--import Loading  from '@/components/loading.vue';-->

<!--const filename = ref<string[]>()-->
<!--const { files, open } = useFileDialog({-->
<!--  accept: 'image/*',-->
<!--})-->
<!--const preview = ref<string[] | null>(null);-->
<!--const imageResult = ref([])-->


<!--const user = useCurrentUser()-->

<!--const storage = useFirebaseStorage()-->
<!--const storageBucket = () =>-->
<!--    storageRef(storage, '/' + (user.value?.uid || ''))-->
<!--const storageSource = computed(() =>-->
<!--    filename.value ? storageRef(storageBucket(), filename.value?.map((_, j) => j.name)) : null-->
<!--)-->

<!--const {-->
<!--  upload,-->
<!--  url,-->
<!--  metadata,-->
<!--} = useStorageFile(storageSource)-->


<!--watch(-->
<!--    () => files.value,-->
<!--     () => {-->
<!--      const data = files.value?.item(0);-->
<!--      console.log("dataitem", files.value)-->
<!--      if(data){-->
<!--        //@ts-ignore-->
<!--        for (const i of files.value) {-->

<!--          preview.value = [...URL.createObjectURL(i)];-->
<!--          filename.value = i.name-->
<!--          setTimeout(() => {-->
<!--            upload(i);-->
<!--            preview.value = null;-->
<!--            if(url)  {-->
<!--              //@ts-ignore-->
<!--              imageResult.value = ([...imageResult.value, url])-->
<!--            }-->
<!--          },1000)-->
<!--        }-->

<!--      }-->
<!--    }-->
<!--)-->

<!--const handleDelete = () => {-->
<!--  preview.value = null;-->

<!--}-->

<!--const imageLength = ref(3)-->

<!--</script>-->


<!--<template>-->
<!--  <h2>imageResult:::{{ imageResult }}</h2>-->


<!--    <div class="flex gap-3">-->
<!--      <div class=" w-20 h-20 border-2 border-dashed border-primary rounded-lg relative" v-for="(i, j) in new Array(imageLength)" :key="j">-->
<!--        <div v-if="!preview && !metadata && !url" class="grid place-items-center w-full h-full cursor-pointer"-->
<!--             @click="open({ accept: 'image/*', multiple: true })"-->
<!--        >-->
<!--          <PlusCircle class="w-4 h-4" />-->
<!--        </div>-->
<!--        <div class="w-full h-full p-1.5" v-else-if="preview && !metadata && !url">-->
<!--          <div class="relative w-full h-full">-->
<!--            <img :src="preview[i]" alt="" class="w-full h-full object-cover relative">-->
<!--            <div class="absolute top-0 h-full w-full bg-black/30 grid place-items-center text-white">-->
<!--              <Loading />-->
<!--            </div>-->

<!--          </div>-->
<!--        </div>-->
<!--        <div class="w-full h-full p-1.5" v-else>-->
<!--          <div class="relative w-full h-full">-->
<!--            <img :src="url[i]" alt="" class="w-full h-full object-cover relative">-->

<!--          </div>-->
<!--          <div @click="handleDelete"  class="cursor-pointer absolute -right-2 -top-1 w-5 h-5 grid place-items-center bg-amber-700 rounded-full text-white  "> <span class="relative bottom-1 ">x</span>  </div>-->
<!--        </div>-->


<!--      </div>-->
<!--    </div>-->


<!--&lt;!&ndash;  <div v-if="error">&ndash;&gt;-->
<!--&lt;!&ndash;    {{error}}&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;  <div v-else-if="progress != null">&ndash;&gt;-->
<!--&lt;!&ndash;    <div>Progress {{ progress * 100 }}%</div>&ndash;&gt;-->
<!--&lt;!&ndash;    <progress max="1" :value="progress">{{ progress * 100 }}%</progress>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->

<!--&lt;!&ndash;  <p v-else>Select a picture to delete.</p>&ndash;&gt;-->
<!--&lt;!&ndash;  <button @click="deleteObject(storageSource!)" :disabled="!storageSource">&ndash;&gt;-->
<!--&lt;!&ndash;    Delete the picture&ndash;&gt;-->
<!--&lt;!&ndash;  </button>&ndash;&gt;-->


<!--</template>-->

<!--<style scoped>-->
<!--.progress-bar {-->
<!--  max-width: 60px;-->
<!--  width: 60px;-->
<!--  border-radius: 50%;-->

<!--}-->

<!--.progress-bar::before {-->
<!--  color: black;-->
<!--  font-size: 10px;-->
<!--}-->
<!--</style>-->

<template>
  <div class="relative space-y-12 ">
    <div class="w-full overflow-hidden relative ">
      <Carousel
          :plugin="[plugin]"
          :showButton="false"
          class="relative h-full w-screen"
          @mouseenter="plugin.stop"
          @mouseleave="[plugin.reset(), plugin.play()];"
      >
        <CarouselContent class="w-full h-full">
          <CarouselItem v-for="(i,j) in carouselImages" :key="j">
            <img :alt="i" :src="i" class="w-full max-h-[700px]  overflow-hidden object-cover  ">
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
   <div class="inner_page">
     <div class="section">  <AppCollections/>  </div>
     <div class="section">  <HeroSection />   </div> </div>

  </div>
</template>

<script lang="ts" setup>
import {carouselImages} from "@/lib/constant.ts"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay';
import AppCollections from "@/components/AppCollections.vue";
import HeroSection from "@/components/HeroSection.vue";
import {provide, ref} from "vue";

const plugin = Autoplay({
  delay: 5000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,

})
const name = ref('hello')
provide('test', name.value);






</script>

<style scoped>
  .section{
    position: relative;
    padding: 4rem;
    top: 1rem
  }

  .inner_page{
    background-image: url("/src/assets/images/background.svg");
    position: relative;
    top: -3rem
  }
</style>
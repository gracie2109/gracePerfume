<script lang="ts" setup>
import {useFileDialog} from '@vueuse/core';
import {getDownloadURL, getStorage, ref as fireStorageRef, uploadBytesResumable,deleteObject} from "firebase/storage";
import {PlusCircle, Trash } from "lucide-vue-next"
import {ref} from "vue";
import Loading from "@/components/loading.vue";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-icons/vue'

const storage = getStorage();
const { open,  onChange} = useFileDialog();


const props = defineProps<{
  folderName: string,
  limit:number
}>()

const errors = ref<string | null>(null);

const images = ref<string[]>([]);
const emit = defineEmits(['setImages']);


const newFiles = ref();
const progress = ref<boolean>(false);

onChange(async (files: any) => {
  newFiles.value = [...files];
  if(files.length > props.limit) {
    errors.value =`Upload max ${props.limit} item!`
  }

  for (let file of newFiles.value.slice(0, props.limit)) {
    await uploadFile(file)
  }
})

const uploadFile = async (file: any) => {
  const storageRef = fireStorageRef(storage, `${props.folderName}/` + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed',
      (snapshot: any) => {
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            progress.value = true;
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          images.value = [...images.value,downloadURL];
          emit('setImages',  images.value);
        });
        progress.value = false
      }
  )
}

const handleDelete = (image:any) => {
  const path = decodeURIComponent(image.split("o/")[1].split("?")[0]);
  const desertRef = fireStorageRef(storage, path);
  deleteObject(desertRef).then(() => {
    const newData = images.value.filter((i) => i!== image);
      images.value = newData
    emit('setImages', newData);
  }).catch((error:any) => {
      errors.value = error
  });
}


</script>

<template>
  <div v-if="errors">
    <Alert variant="destructive">
      <ExclamationTriangleIcon class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {{errors}}
      </AlertDescription>
    </Alert>

  </div>
 <div class="flex gap-3 ">

   <div v-for="(i,j) in limit" :key="j" class=" rounded-lg border border-custom-primary border-dashed relative w-20 h-20"
        @click="() => { if( !images[i-1]){  open()  } }">
     <div  class="relative grid place-items-center w-full h-full" >
       <template v-if="!images[i-1]">
         <template v-if="!progress">
           <PlusCircle class="w-4 h-4" color="orange"/>
         </template>
         <template v-else>
           <Loading />
         </template>
       </template>
       <div class="relative w-full h-full" v-else>
         <div id="media" class="relative w-full h-full">
           <img :src="images[i-1]"  alt="" class="w-full h-full object-cover"/>
         </div>
         <div class="absolute bottom-0 backdrop-blur-sm bg-white/30 w-full py-1 px-1">
            <div class="flex items-center justify-between">
              <div @click="handleDelete(images[i-1])"> <Trash class="w-4 h-4  cursor-pointer" color="white" type="button"    /></div>
            </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
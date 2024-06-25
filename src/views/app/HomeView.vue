<template>
  <div>
   <RouterLink :to="$router.resolve({name: 'adminBrands'})">Manager Brand</RouterLink>

    <div class="w-20 h-20 max-w-20 max-h-20 rounded-sm">
      <div class="flex items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full border border-orange-500 border-dashed  rounded-md cursor-pointer  hover:bg-gray-100">
          <div class="grid place-items-center h-20 max-h-20">
            <PlusCircle class="w-3 h-3 text-orange-500" />
            <Input id="dropzone-file" type="file" class="hidden"   @change="uploadFile($event)" multiple    accept="image/*"/>
          </div>
        </label>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {Input} from "@/components/ui/input";
import {PlusCircle} from "lucide-vue-next"

const uploadFile = ($event: Event) => {
  const files = ($event.target as HTMLInputElement).files;
  console.log("event", files);
}



</script>
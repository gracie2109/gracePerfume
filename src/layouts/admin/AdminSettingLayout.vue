<template>
  <div class="grid grid-cols-5 gap-3 h-screen">
    <div class="cols-span-1 border-r relative rounded-md -top-10 z-20">
      <div class="absolute top-0">
          <div class="p-2">
              <div  v-for="(i, j) in navigation.settingNav" :key="j">
                  <router-link :to="$router.resolve({name: String(i.name)})"
                    :active-class="clsx('text-red-600')"
                    class="font-semibold my-2 inline-block capitalize"
                     :class="clsx({
                      'text-red-500': route.path?.includes(i.path),
                     })"
                  >
                    {{i.path}}
                  </router-link>
              </div>
          </div>
      </div>
    </div>
    <div class="col-span-4">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {navigation} from "@/composables/app-config.ts";
  import clsx from 'clsx';
  import {useRoute} from "vue-router";
  const route = useRoute();
</script>
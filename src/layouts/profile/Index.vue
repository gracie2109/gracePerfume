<template>
  <div class="container space-y-8">

    <Transition mode="out-in">

      <div class="w-full flex gap-x-8 items-center  max-w-screen-sm">
        <router-link v-for="i in navigation.profileNav" :key="i.name" :to="i.path"

                     active-class=" text-custom-primary/80 border-b border-red-600"
                     class="font-semibold capitalize  inline-block w-1/3  text-center py-1.5 "
        >
          {{ i.name }}
        </router-link>
      </div>
    </Transition>


    <keep-alive>

      <router-view v-if="user"></router-view>
      <div v-else class="space-y-6 pt-16 w-full grid place-items-center border rounded-lg p-9 ">
        <p>Please login first</p>
        <Button>
          <router-link :to="$router.resolve({name: 'login'})">Login</router-link>
        </Button>
      </div>
    </keep-alive>
  </div>
</template>


<script lang="ts" setup>
import {navigation} from "@/composables/app-config.ts";
import {useCurrentUser} from "vuefire";
import {Button} from "@/components/ui/button"
import {provide} from "vue"
const user = useCurrentUser();
provide('user', user)
</script>

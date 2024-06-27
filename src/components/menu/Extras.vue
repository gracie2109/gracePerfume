<template>
  <div class="flex items-center gap-x-2 md:gap-x-4">
    <button type="button" class="flex items-center gap-x-2">
      <Search :size="20" stroke-width="1.5" />
      <p class="hidden md:block">Search</p>
    </button>
    <Separator orientation="vertical" class="hidden !h-5 lg:block" />
    <template v-if="user">
      <BaseAvatar />
    </template>
    <template v-else>
      <router-link :to="$router.resolve({name: 'login'})">Login</router-link>
    </template>
    <MenuButton @toggle-menu="emit('toggleMenu')" />
  </div>
</template>

<script setup lang="ts">
import BaseAvatar from "@/components/base/avatar/Avatar.vue";
import MenuButton from "@/components/menu/Button.vue";
import { Separator } from '@/components/ui/separator'

import {Search} from "lucide-vue-next"
import {useCurrentUser} from "vuefire";
const emit = defineEmits(['toggleMenu']);

const user = useCurrentUser()


</script>
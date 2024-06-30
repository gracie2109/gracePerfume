<template>
  <div class="flex items-center gap-x-2 md:gap-x-4 will-change-auto">
    <CartMenu />
    <button class="flex items-center gap-x-2" type="button">
      <Search :size="20" stroke-width="1.5"/>
    </button>

    <Separator class="hidden !h-5 lg:block" orientation="vertical"/>
    <template v-if="user">
      <BaseAvatar/>
    </template>
    <template v-else>
      <router-link :to="$router.resolve({name: 'login'})">Login</router-link>
    </template>
    <MenuButton @toggle-menu="emit('toggleMenu')"/>
  </div>
</template>

<script lang="ts" setup>
import BaseAvatar from "@/components/base/avatar/Avatar.vue";
import MenuButton from "@/components/menu/Button.vue";
import {Separator} from '@/components/ui/separator';
import {Search } from "lucide-vue-next"
import {useCurrentUser} from "vuefire";
import CartMenu from "@/components/menu/CartMenu.vue";
const emit = defineEmits(['toggleMenu']);

const user = useCurrentUser()
</script>


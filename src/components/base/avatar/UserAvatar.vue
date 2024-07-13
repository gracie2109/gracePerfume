<template>
  <div>
    <div class="mt-5 space-y-8" v-if="user">
      <div class="flex gap-3 items-center">
        <img :src="user?.photoURL || fallbackImg" alt="user photo" class="w-12 h-12 rounded-full inline-block">
        <div>
          <small>@{{ user.displayName }}</small>
          <p>{{ user.email }}</p>
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts" setup>
import {useCurrentUser} from "vuefire";
import fallbackImg from "@/assets/images/fallback.jpg";

const user = useCurrentUser();

</script>
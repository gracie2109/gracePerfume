<template>
  <footer class="self-end py-8">
    <BaseContainer>
      <div class="flex items-center justify-center gap-x-1 text-custom-foreground">
        <Copyright :size="18" />
        <p class="text-sm sm:text-lg">
          2024&nbsp;
          <router-link to="/" class="font-medium tracking-tighter text-custom-primary sm:text-xl">
            Grace
          </router-link>
          . All rights reserved.
        </p>
      </div>
    </BaseContainer>
  </footer>
</template>

<script setup>
import BaseContainer from "@/components/base/container/Index.vue";
import {Copyright} from "lucide-vue-next";

</script>
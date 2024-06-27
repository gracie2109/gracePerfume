<template>
  <div
      class="custom-bg-img relative grid place-content-center bg-contain bg-fixed bg-center  xs:h-screen sm:px-0"
  >
    <div class="absolute inset-0 w-full bg-custom-bg/70"></div>
    <AppLogo class="z-10 mx-auto mb-5" />
    <router-view></router-view>

  </div>
</template>
<script setup lang="ts">
import AppLogo from "@/components/AppLogo.vue";
</script>
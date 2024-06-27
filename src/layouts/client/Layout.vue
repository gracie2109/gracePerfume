<template>
  <div class="client_body min-h-screen">
    <AppHeader />

    <main class="relative">
      <router-view></router-view>
    </main>



   <AppFooter />
  </div>
</template>
<script setup lang="ts">
import AppHeader  from "./AppHeader.vue"
import AppFooter from "./AppFooter.vue";
</script>
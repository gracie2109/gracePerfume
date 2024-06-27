<template>
  <div class="client_body min-h-screen">
    <AppHeader />

    <main class="relative">
      <router-view></router-view>
    </main>



    <div>
      This is fooyer
    </div>
  </div>
</template>
<script setup lang="ts">
import AppHeader  from "./AppHeader.vue"
</script>
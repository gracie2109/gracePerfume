<template>
  <div class="client_body min-h-screen ">
    <AppHeader />

    <main :class="clsx('relative',{ 'top-24': route.name !== 'home'     })">
        <router-view></router-view>
    </main>

  </div>
</template>
<script setup lang="ts">
import AppHeader  from "./AppHeader.vue";
import {useRoute} from 'vue-router';
import {clsx} from 'clsx'
const route = useRoute();
</script>
<template>
  <router-view v-slot="{ Component }">
  <transition  name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
<Toaster position="top-right" rich-colors  />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';

</script>
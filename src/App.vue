<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
  <Toaster position="top-right" rich-colors  />
</template>
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';

</script>
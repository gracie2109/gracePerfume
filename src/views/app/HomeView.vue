

<template>

  <div class="relative space-y-12 ">
    <div class="w-full overflow-hidden relative ">
      <div class="relative">
          <HomeCarousel />
        <div  class="absolute -bottom-2 inset-0 w-full bg-gradient-to-t from-custom-bg from-0% to-transparent transition-opacity duration-200 z-[2] opacity-0.2 "></div>
      </div>
    </div>
    <div class="inner_page">
     <div class="section">  <AppCollections/>  </div>
     <div class="section">  <HeroSection />   </div> </div>

  </div>
</template>

<script lang="ts" setup>
import HomeCarousel from "@/components/HomeCarousel.vue"
import AppCollections from "@/components/AppCollections.vue";
import HeroSection from "@/components/HeroSection.vue";
import {useCurrentUser} from "vuefire";
const currentUser = useCurrentUser();
</script>

<style scoped>
  .section{
    position: relative;
    padding: 4rem;
    top: 1rem
  }

  .inner_page{
    position: relative;
    top: -3rem
  }
</style>
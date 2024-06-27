<template>
  <RouterLink
      to="/"
      class="flex items-center gap-2"
  >
    <img
        :src="image"
        alt="Logo"
        class=" w-12  z-[999] text-white"
    >
    <span
        class="text-2xl font-semibold tracking-tighter text-custom-primary sm:text-3xl"
    >grace</span>
  </RouterLink>
</template>

<script setup>
  import {computed} from "vue";
  import appLogo from "/src/assets/images/perfume2.png";
  const image = computed(() => appLogo)
</script>
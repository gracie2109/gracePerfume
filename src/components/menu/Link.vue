<template>
  <li class="text-xl lg:text-base">
    <router-link
        :to="link.url"
        class="transition-colors hover:text-custom-primary "
        active-class="text-custom-primary font-medium"
    >
      {{ link.text }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
defineProps({
  link: {
    type: Object,
    required: true
  }
})
</script>
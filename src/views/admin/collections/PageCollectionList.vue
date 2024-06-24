<template>
  <PageHeader :show-back-btn="false" page-title='Collections'  page-desc="Show all products collections" />
  <router-link :to="$router.resolve({name: 'adminCollectionCreate'})">Create collection</router-link>


</template>

<script setup lang="ts">

import PageHeader from "@/components/PageHeader.vue";
</script>
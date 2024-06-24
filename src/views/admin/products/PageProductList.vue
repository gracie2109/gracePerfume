<template>
  <PageHeader :show-back-btn="false" page-title='Products'  page-desc="Show all products"/>
  <router-link :to="$router.resolve({name: 'adminProductCreate'})">Create Variants</router-link>
</template>
<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
</script>
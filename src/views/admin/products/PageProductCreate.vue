<template>
  <PageHeader :show-back-btn="true" back-link="adminProducts" page-title='Create Products'
    :bread-crumbs="[
      {
        url: 'adminProducts',
        name:'Products'
      }
]"/>
  <ProductForm  />
</template>

<script lang="ts" setup>
import ProductForm from "@/components/forms/ProductForm.vue";
import PageHeader from "@/components/PageHeader.vue";
</script>
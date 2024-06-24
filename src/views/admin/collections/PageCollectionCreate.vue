<template>
  <PageHeader :show-back-btn="true" back-link="adminCollections" page-title='Create Products'
              :bread-crumbs="[
      {
        url: 'adminCollections',
        name:'Collections'
      }
]"/>
  <CollectionForm />
</template>

<script lang="ts" setup>
  import CollectionForm from "@/components/forms/CollectionForm.vue"
  import PageHeader from "@/components/PageHeader.vue";
</script>
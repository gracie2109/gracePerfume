<template>
  <PageHeader :show-back-btn="true" :back-link="'adminCollections'" page-title='Create Products'
              :bread-crumbs="[
      {
        url: 'adminCollections',
        name:'Collections'
      }
]"/>
  <CollectionForm  :form="form" :loading="loading" @handle-submit="handleSubmit"   />
</template>

<script lang="ts" setup>
  import CollectionForm from "@/components/forms/CollectionForm.vue"
  import PageHeader from "@/components/PageHeader.vue";

  import {useForm} from "vee-validate";
  import {useCollectionsStore} from "@/stores/collections.ts"
  import {storeToRefs} from "pinia";
  const collectionStore = useCollectionsStore();

  const form = useForm();
  const {loading} = storeToRefs(collectionStore)


  const handleSubmit = form.handleSubmit(async(values:any) => {
    await collectionStore.createNewCollection(values)
        .then(() => form.resetForm())
  })




</script>
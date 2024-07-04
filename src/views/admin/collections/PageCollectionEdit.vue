<template>
  <PageHeader
      :show-back-btn="true"
      page-title='Collections Detail'
      page-desc="Edit collection"
      :back-link="'adminCollections'"
      :bread-crumbs="[
          {
            url: 'adminCollections',
            name:'Collections'
          }
      ]"
  />

<CollectionForm  :form="form" :loading="loading" />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import {useForm} from "vee-validate"
import CollectionForm from "@/components/forms/CollectionForm.vue"
import {storeToRefs} from "pinia";
import {useCollectionsStore} from "@/stores/collections.ts"
import {onBeforeUnmount, onMounted} from "vue";
import {useRoute} from "vue-router";

const collectionStore = useCollectionsStore();
const {loading, detail} = storeToRefs(collectionStore)
const route = useRoute();

const form = useForm({
  initialValues: detail.value?.value || {}
});


onMounted(async() => {
  await collectionStore.getDetailCollection(String(route.params.id))
})

onBeforeUnmount(() => collectionStore.resetDetail())
</script>
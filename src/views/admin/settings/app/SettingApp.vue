<template>
  <PageHeader :page-title="'Setting App'" :page-desc="'Manager your store'" />

    <SettingAppForm :form="form"  :formModel="formModel" />

</template>


<script setup   lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import SettingAppForm from "@/components/forms/SettingAppForm.vue";
import {useForm} from "vee-validate";
import {ref} from "vue";


const form = useForm();

const formModel  = ref();






</script>
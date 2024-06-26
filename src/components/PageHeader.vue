<template>
  <Breadcrumb>
    <BreadcrumbList>

      <BreadcrumbItem>
        <BreadcrumbLink>
          <router-link :to="$router.resolve({name: firstItem.url})" >{{firstItem.name}}</router-link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />

      <BreadcrumbItem v-if="props.breadCrumbs"  v-for="(i, j) in props.breadCrumbs" :key="j" >
        <BreadcrumbLink>
          <router-link :to="$router.resolve({name: String(i.url)})" >{{i.name}}</router-link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="props.breadCrumbs" />

      <BreadcrumbItem>
        <BreadcrumbPage>{{props.pageTitle}}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <div class="flex justify-between items-center my-6" >
    <div>
      <div class="text-2xl font-semibold">
        {{ props.pageTitle }}
      </div>
      <p class="text-sm text-muted-foreground">
        {{ props.pageDesc }}
      </p>
    </div>
    <div v-if="props.showBackBtn">
      <router-link :to="$router.resolve({name: props.backLink})">Back</router-link>
    </div>
  </div>
  <div class="relative p-2">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useRoute} from "vue-router";
import {computed} from "vue";
  const props = defineProps({
    showBackBtn: Boolean,
    backLink: String,
    pageTitle:String,
    pageDesc:String,
    breadCrumbs:Array<{name: String, url: String}>
  });
const router = useRoute();

const firstItem = computed(() => {
  if(router.path.includes('admin')) {  return {  name: 'Dashboard',   url: 'admin' } }
  else return {name:'Home', url: 'home'}
})


</script>
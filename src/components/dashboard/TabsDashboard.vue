<template>
  <div>
    <button v-for="tab in tabs" :key="tab" @click="component = tab" class="mx-6">
      {{tab}}
    </button>
   <div>
     <keep-alive>
       <component :is="component" />
     </keep-alive>
   </div>
  </div>
</template>
<script >
import Overview from "@/components/dashboard/overview/GroupCard.vue";
import Analytics from "@/components/dashboard/overview/GroupCard2.vue"
import Reports from "@/components/dashboard/overview/GroupCard3.vue";


export default {
  components: { Overview, Analytics ,Reports},
  data () {
    return {
      tabs: ["Overview", "Analytics","Reports"],
      component: "Overview"
    }
  }
}
</script>
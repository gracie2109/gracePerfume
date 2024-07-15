<template>
  <PageHeader
      :back-link="'adminCollections'"
      :bread-crumbs="[
          {
            url: 'orders',
            name:'Orders'
          }
      ]"
      :show-back-btn="true"
      page-desc="Edit collection"
      page-title='Order Detail'
  />
<div class="space-y-6"  v-if="detailOrder">
  <div id="order_controller">
   <div class="grid grid-cols-2 gap-3">
     <div class="space-y-0.5">
       <h4 class="font-semibold mb-2">Payment Infomation</h4>
       <div> <b>Methods:</b> <span>{{detailOrder.value.payment}}</span>   </div>
       <div> <b>User transfer:</b> <span>{{detailOrder.value.user_confirm_transfer}}</span>   </div>
       <div> <b>Admin confirm user transfer success:</b>
         <span>{{detailOrder.value.admin_confirm_transfer || 'Not confirm'}}</span>
       </div>
       <div> <b>Fulfillment Status:</b> <span>{{detailOrder.value.fulfillmentStatus}}</span>   </div>
       <div v-if="detailOrder.value.user_confirm_transfer && detailOrder.value.payment === 'TRANSFER'
        && detailOrder.value.status !== 'CANCELLED'
        " class="flex items-center gap-x-6">
         <b>Confirm user tranfer success:</b>
         <CustomAlerDialog
             :disable-default-icon="true"
             :title="'Confirm transfer success'"
             :trigger-text="'Confirm transfer success'"
             :description="'Check banking history before change status'"
             :variant="'customPrimary'"
             :ok-text="'Confirm'"
         >
           <template v-slot:icon>
             <ToggleRight class="w-4 h-4" />
           </template>
         </CustomAlerDialog>
       </div>

       <div class="flex items-center gap-x-6">
         <div><b>Status: </b> {{detailOrder.value.status}}</div>

       </div>
     </div>

     <div v-if="detailOrder.value.cancelDate !== null">
       <h4 class="font-semibold mb-2">Cancelled</h4>
        <div>
          <b>Cancelled Date: {{format(detailOrder.value.cancelDate, "dd-MM-yyyy HH:mm:ss")}}</b>
        </div>
       <div>
         <b>Cancelled reason: {{detailOrder.value.cancelReason}}</b>
       </div>
     </div>
   </div>
  </div>
  <div id='order_product_list' class="w-full">
    <h4 class="font-semibold mb-2">Order Products</h4>
    <div v-for="(i, ii) in detailOrder.value.product" v-if="detailOrder" :key="ii" class="border max-w-screen-sm">

      <div v-if="i.variant && i.variant.length > 0" class="w-full grid">
        <div v-for="(k, kk) in i.variant" :key="kk" class="w-full flex items-center gap-y-3 border">
          <div class="w-20 h-20">
            <img :alt="i.name" :src="i.image" class="w-full h-full object-cover aspect-square">
          </div>
          <div class="pl-2">
            <p class="font-semibold">{{ i.name }}</p>
            <small>{{ k.id }}</small>
            <p>{{ +k.quantity }} x {{ formatPrice(+k.price) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="w-full flex items-center gap-3">
        <div class="w-20 h-20">
          <img :alt="i.name" :src="i.image" class="w-full h-full object-cover aspect-square">
        </div>
        <div class="grid">
          <p class="font-semibold">{{ i.name }}</p>
          <p>{{ +i.quantity }} x {{ formatPrice(+i.price) }}</p>
        </div>
      </div>
    </div>
    <Separator class="my-3"/>
    <div class="grid gap-y-2">
      <div>Total items: {{detailOrder.value.totalItem}}</div>
      <div> Total quantity: <span>{{detailOrder.value.totalQuantity}}</span>   </div>
    </div>
  </div>

  <Separator class="my-3"/>
  <div id="order_infomation" class="grid grid-cols-2 gap-3">
      <div>
        <h4 class="font-semibold mb-2 ">User shipment</h4>

        <div><b>Phone number</b>: {{detailOrder.value.phoneNumber}}</div>
        <div><b>Username</b>: {{detailOrder.value.userName}}</div>
        <div><b>User Id</b>:
          <router-link :to="`/admin/users/${detailOrder.value.userId}}`" class="underline"> User info</router-link>
        </div>
      </div>
    <div>
      <h4 class="font-semibold mb-2 ">Payment Address</h4>

    <p>
      {{detailOrder.value.shipping_address.province.ProvinceName}},
     {{detailOrder.value.shipping_address.district.DistrictName}},
      {{detailOrder.value.shipping_address.ward.WardName}},
    </p>
      <p>{{detailOrder.value.shipping_address.address}}</p>

    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import {useCheckout} from "@/stores/order"
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {formatPrice} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator"
import CustomAlerDialog from "@/components/ui/CustomAlerDialog.vue"
import { ToggleRight } from 'lucide-vue-next';
import {format} from "date-fns";


const store = useCheckout();
const detailOrder = ref<any | null>(null)
const route = useRoute();

console.log('detaui', detailOrder.value)


onMounted(async () => {
  const response = await store.getDetailOrder(String(route.params.id));
  detailOrder.value = response.data;
})
</script>
<template>
  <div v-if="!detail">
    NOT FOUND
  </div>
  <div v-else>
    <PageHeader :bread-crumbs="[
                     {
                       name: 'List order',
                       url:'transactions'
                     }
                 ]" :page-desc="`#order: ${detail.orderCode}`"
                :show-back-btn="false"
                page-title='Order Detail'
    />
    <div class="grid grid-cols-3 gap-6 ">
      <div id="left_tracsition_detail" class="leading-7 col-span-2">
        <h4><b>Order:</b> {{ detail.orderCode }}</h4>
        <small>{{ format(detail.orderDate, "dd-MM-yyyy HH:mm:ss") }}</small>

        <div>
          <div class="my-4">
            <Alert variant="destructive" v-if="detail.status === 'CANCELLED' && detail.cancelDate !== null" >
              <AlertTitle>Order cancelled at {{ format(detail.cancelDate, "dd-MM-yyyy HH:mm:ss") }}</AlertTitle>
              <AlertDescription>
                Reason :{{detail.cancelReason}}
              </AlertDescription>
            </Alert>
          </div>
          <Table>
            <TableHeader>
              <TableHead> Product name</TableHead>
              <TableHead> Product image</TableHead>

              <TableHead> Price</TableHead>
              <TableHead> Quantity</TableHead>
              <TableHead> Total</TableHead>
            </TableHeader>
            <TableBody>
              <TableRow v-for="i in detail.product" :key="i.id">
                <TableCell>{{ i.name }}</TableCell>
                <TableCell>
                  <img :src="i.image || fallbackImage" alt="" class="w-12 h-12 object-cover aspect-square">
                </TableCell>

                <TableCell>{{ formatPrice(i.price) }}</TableCell>
                <TableCell>{{ i.quantity }}</TableCell>
                <TableCell>{{ formatPrice(i.price * i.quantity) }}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead :row="3">Total price</TableHead>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{{ formatPrice(detail.price) }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      </div>

      <div id="right_show_info" class="leading-7 space-y-4 col-span-1">
        <h4 class="font-medium">Order Address</h4>
        <div id="order_address">
          <p>{{ detail.phoneNumber || 'Not found phone' }}</p>
          <span>
              {{ detail.shipping_address.province.ProvinceName }},
              {{ detail.shipping_address.district.DistrictName }},
               {{ detail.shipping_address.ward.WardName }}
            </span>
          <p>{{ detail.address }}</p>
        </div>
        <div id="order_address" class="leading-7 ">
          <h4 class="font-medium">Order status</h4>
          <p><b>Fulfillment status: </b>{{ detail.fulfillmentStatus }}</p>
          <p><b>Payment status: </b>{{ detail.paymentStatus }}</p>
          <p><b>Order status: </b>{{ detail.status }}</p>

          <p>{{ detail.address }}</p>
        </div>
        <div v-if="detail.fulfillmentStatus === 'not fulfilled' && detail.cancelDate === null">

          <Dialog  v-model="openDialog" @update:open="(v) => openDialog= v">
            <DialogTrigger>
              <Button variant="destructive">Cancel Order </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure cancel this order</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div>
                <Select v-model='cancelModel.reason'>
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>

                      <SelectItem :value="i" v-for="i in sampleCancelReason" :key="i">
                        {{ i }}
                      </SelectItem>
                  </SelectContent>
                </Select>


                <div v-if="cancelModel.reason === 'Other'" class="my-4">
                    <Textarea placeholder="Write the reason " v-model="cancelModel.otherReason" />
                </div>
              </div>
              <DialogFooter>
                <Button @click="cancelOrder" :disable="loading">
                  <ReloadIcon class="w-4 h-4 mr-2 animate-spin"  v-if="loading"/>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {useCheckout} from "@/stores/order.ts";
import {computed, onMounted, ref, watch,} from "vue";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import PageHeader from "@/components/PageHeader.vue";
import {format} from "date-fns";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import fallbackImage from '@/assets/images/fallback.jpg'
import {formatPrice} from "@/lib/utils.ts";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {Button} from "@/components/ui/button";
import {sampleCancelReason} from "@/lib/constant"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Textarea} from "@/components/ui/textarea";
import { ReloadIcon } from '@radix-icons/vue'




const store = useCheckout();
const {currentUserOrder, loading} = storeToRefs(store);

const route = useRoute();
const cancelModel = ref({
    reason:'',
    otherReason: ''
});
const openDialog = ref(false)
const detail = computed(() => {
  if (currentUserOrder.value) {
    let selected = currentUserOrder.value.find((i) => i.id === route.params.id.toString());
    return selected ? selected : null
  } else {
    return null
  }
})

async function cancelOrder () {
  const reason = cancelModel.value.reason === 'Other' ? cancelModel.value.otherReason : cancelModel.value.reason
  await store.updateOrder(route.params.id.toString(),{
    status: 'CANCELLED',
    cancelDate: new Date().toISOString(),
    cancelReason: reason
  });
  openDialog.value = false

}

onMounted(async () => {
  await store.getCurrentUserOrder();
});

watch(() => cancelModel.value.reason, () => {
    if(cancelModel.value.reason !== "Other"){
      cancelModel.value.otherReason = ''
    }
})

</script>
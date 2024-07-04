<template>
  <div class="container">
    <div class="grid grid-cols-3 gap-3 h-full">
      <div id="left" class="col-span-1">
      </div>
      <div id="right"  class=" col-span-2 grid grid-cols-3 gap-6 relative">
            <div id="detail" class="col-span-2 space-y-8 relative">
              <div class="space-y-2">
                <h1 class="scroll-m-20 text-xl font-semibold tracking-tight">
                  {{product.name}}
                </h1>
                <p  class="text-sm">
                  <b>Status: </b> <span>{{product.status}}</span>
                </p>
              </div>

              <div id="detail_price" class="bg-[#fafafa] py-3 w-full flex items-center gap-3">
                <p class="text-base font-semibold">Price:</p>
                <div v-if="product.sale_price" class="container flex items-center  gap-x-6">
                  <p class="text-custom-red text-xl font-semibold">{{formatPrice(product.sale_price)}}</p>
                  <p class="line-through text-muted-foreground text-base ">{{formatPrice(product.price)}}</p>
                  <div class="rounded-lg">
                    <div class="bg-custom-red text-white px-1.5 rounded-lg py-1 flex items-center">
                      <ThunderIcon />
                      <span class="text-[10px]">-{{product.sale_percent}}</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class=" text-xl font-semibold ">{{formatPrice(product.price)}}</p>
                </div>
              </div>

              <div id="detail_variant" v-if="product.variant" class="relative py-3 w-full flex items-center gap-3">
                <p class="text-base font-semibold grid gap-y-3">Variants:</p>
                <template v-for="(i, ii) in product.variant" :key="ii">
                  <template v-if="i.quantity >0">
                    <div class="border  px-2 py-1 rounded-lg cursor-pointer font-semibold"
                         :class="clsx({
                          'border border-custom-primary ': detailModel.variant?.includes(i.name)
                       })"
                         @click="chooseVariant(i.name)">
                      {{i.name}}
                    </div>
                  </template>
                  <template v-else>
                    <div class="border  px-2 py-1 rounded-lg relative text-[#dcdcdc] font-semibold bg-[#fafafa] ">
                      {{i.name}}
                    </div>
                  </template>
                </template>
              </div>

              <div id="button_action" class="flex items-center gap-3 w-">
                <Button class="w-full text-custom-red border-custom-red" variant="outline" size="xl">Add To Cart</Button>
                <Button class="w-full" variant="destructive" size="xl" @click="$router.push('/cart')">Buy Now</Button>
              </div>

            </div>
            <div id="coupon" class="col-span-1 ">
              <div v-for="(i, j) in vouchers" :key="j" class="mb-2">
                <VoucherList :data="i" />
              </div>
            </div>
          </div>
    </div>

    <div>
      <div class="col-span-12" id="tabs_infomation">
        <ProductTabs />
      </div>
    </div>
  </div>

</template>






<script lang="ts"  setup>
import {ref} from "vue";
import {clsx} from "clsx"
import {Button} from "@/components/ui/button"
import ThunderIcon from "@/components/ThunderIcon.vue"
import VoucherList from '@/components/card/card-voucher/List.vue'
import ProductTabs from '@/components/TabsProduct.vue'

const detailModel = ref({
  variant: ''
})

const chooseVariant = (id:string) => {
  detailModel.value.variant = id
}

import {formatPrice} from "@/lib/utils"
const product =ref(
    {
      id: '123',
      name:   'Creed Absolu Aventus ',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277',
      media:[
        'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/nar-vetiver-musc.jpg?v=1704809896337',
        'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277'
      ],
      price: 123000,
      quantity:10,
      variant:[
        {
          id:'vr1',
          name: 'Chiết 10ml',
          price: 150000,
          quantity:10
        },
        {
          id:'vr2',
          name: 'Chiết 35ml',
          price: 250000,
          quantity:10
        },
        {
          id:'vr3',
          name: 'full box 75ml',
          price: 350000,
          quantity:0
        }
      ],
      status: 'Còn hàng',
      sale_price: 100000,
      sale_percent: '10%'
    });


  const vouchers = [
    {
      id: 'code 1',
      name: 'Miễn phí vận chuyển\n',
      condition:'Đơn hàng từ 300k',
      code:'A87TYRT55H',
      end_date:'10/12/2022',
      type:'freeship',
      desc:'<ol><li>Dành cho đơn hàng từ 300k</li><li>Mỗi khách hàng được sử dụng tối đa 1 lần.</li><li>Sao chép mã và nhập mã khuyến mãi ở trang thanh toán</li></ol>'
    },
    {
      id: 'code 2',
      name: 'Giảm 20%',
      condition:'Đơn hàng từ 200k\n' +
          '\n',
      code:'QH5G8J0YC',
      end_date:'05/12/2022',
      type:'coupon',
      desc:'<ol><li>Dành cho đơn hàng từ 200k</li><li>Mỗi khách hàng được sử dụng tối đa 1 lần.</li><li>Sao chép mã và nhập mã khuyến mãi ở trang thanh toán</li></ol>'
    },
    {
      id: 'code 3',
      name: 'Giảm 50k\n',
      condition:'Đơn hàng từ 500k\n' +
          '\n',
      code:'FT45YUO8H',
      end_date:'10/12/2022',
      desc:'<ul><li>Dành cho đơn hàng từ 500k</li><li>Mỗi khách hàng được sử dụng tối đa 1 lần.</li><li>Sao chép mã và nhập mã khuyến mãi ở trang thanh toán</li></ul>',
      type:'cash'
    }
  ]
const product2 =ref(
    {
      id: '123',
      name:   'Creed Absolu Aventus 2',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277',
      media:[
        'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/nar-vetiver-musc.jpg?v=1704809896337',
        'https://bizweb.dktcdn.net/thumb/large/100/494/147/products/33-d4b70a3f-ad40-4ea4-83cb-371d4debee90.png?v=1714745473277'
      ],
      price: 123000,
      quantity:10,
      variant:[],
      status: 'Còn hàng'
    })
</script>


<style scoped>
.disable_variant{
  position: relative;
}

</style>
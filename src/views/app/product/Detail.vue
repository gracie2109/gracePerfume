<template>
  <div class="container">
    <div class="grid grid-cols-3 gap-3 h-full">
      <div id="left" class="col-span-1">
        <ThumbCarouselProduct :data="product"/>
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
                  <p class="text-custom-red text-xl font-semibold">
                    <span>{{formatPrice(variant_price)}}</span>
                  </p>
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
                <template v-for="i  in product.variant" :key="i.id">
                  <template v-if="i.quantity >0">
                    <div class="border  px-2 py-1 rounded-lg cursor-pointer text-sm font-semibold"
                         :class="clsx({
                          'border border-custom-primary ': detailModel.variant?.includes(i.id)
                       })"
                         @click="chooseVariant(i.id)">
                      {{i.name}}
                    </div>
                  </template>
                  <template v-else>
                    <div class="border  px-2 py-1 rounded-lg relative text-[#dcdcdc] text-sm font-semibold bg-[#fafafa] ">
                      {{i.name}}
                    </div>
                  </template>
                </template>
              </div>
              <div id="quantity" >
                <NumberField
                    id="quantity"
                    :default-value="1"
                    :min="1"
                    class="flex gap-x-8 items-center"
                    v-model="detailModel.quantity"
                >
                  <Label for="quantity" class="font-semibold">Quantity:</Label>
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>


              </div>

              <div id="button_action" class="flex items-center gap-3 w-">
                <Button class="w-full text-custom-red border-custom-red" variant="outline" size="xl" :disabled="errors.status"
                  @click="handleAddToCart"
                  >Add To Cart</Button>
                <Button class="w-full" variant="destructive" size="xl" :disabled="errors.status" @click="$router.push('/cart')">Buy Now</Button>
              </div>

            </div>
            <div id="coupon" class="col-span-1 ">
              <div v-for="(i, j) in vouchers" :key="j" class="mb-2">
                <VoucherList :data="i" />
              </div>
            </div>
          </div>
    </div>
    <div class="my-12">
      <div class="col-span-12" id="tabs_infomation">
        <ProductTabs />
      </div>
    </div>
  </div>

</template>






<script lang="ts"  setup>
import {computed, ref, watch, markRaw, h} from "vue";
import {clsx} from "clsx"
import {Button} from "@/components/ui/button"
import ThunderIcon from "@/components/ThunderIcon.vue"
import VoucherList from '@/components/card/card-voucher/List.vue'
import ProductTabs from '@/components/TabsProduct.vue'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';
import ThumbCarouselProduct from "@/components/card/card-product/detail/ThumbCarousel.vue";
import {useCart} from "@/stores/cart"
import {formatPrice, truncateText} from "@/lib/utils";
import {toast} from "vue-sonner";


const cartStore = useCart();
const variant_price = ref<number>(0)

const errors = ref<{status:boolean, mess:string}>({
  status: true,
  mess:''
})

const detailModel = ref<{ variant: string | null | undefined,  quantity: number}>({
  variant:'',
  quantity: 1
})

const checkVariant = computed(() => {
  if(product.value.variant.some((i) => i.quantity > 0))  return true
  else return false
})
const chooseVariant = (id:string) => {
  detailModel.value.variant = id
}


const handleAddToCart = () => {
  cartStore.addToCart({
    product: product,
    quantity: Number(detailModel.value.quantity),
    variant_id: String(detailModel.value.variant),
  });

  const AddPrd =  h('div', { class: 'flex items-start justify-between w-full gap-4' }, [
        h('img', {
          src: product.value.image,
          alt: '',
          class: 'w-10 h-10'
        }),
      h('div', {class:'grid gap-y-2'},[
        h('p', {}, truncateText(product.value.name, 40)),
        h('p', {}, 'has been added')
      ])
      ]);
  toast.success(markRaw(AddPrd));

  clearModel()
}

const clearModel = () => {
  detailModel.value.quantity = 1;
}

watch(() => detailModel.value.variant,() => {
  if(checkVariant && !detailModel.value.variant) errors.value.status = true;
  else errors.value.status = false;


  const variantSelected = product.value.variant.find((i) => i.id === detailModel.value.variant)
  variantSelected ? variant_price.value = Number(variantSelected?.price) : product.value.variant[0]['price']
})




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

</script>


<style scoped>
.disable_variant{
  position: relative;
}

</style>
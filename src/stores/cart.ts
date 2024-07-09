import {ref, type Ref, toRaw} from 'vue'
import { defineStore } from 'pinia';
import {getTotalVariantLength} from "@/lib/utils.ts";

type CartAdd = {
    product: any,
    quantity: number,
    variant_id: string | null

}

export const useCart = defineStore('cart',  () => {
    const cart:Ref<any[] | null> = ref(JSON.parse(localStorage.getItem('cart') as string));
    const totalPrice:Ref<any> = ref(0);
    const loading:Ref<boolean> = ref(false);
    const cartLength:Ref<number> = ref(0);

    function clearCart() {
        cart.value = null;
        localStorage.removeItem('cart')
    }

    function uploadStorage () {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    }

    function getCart ()  {
        const data = JSON.parse(localStorage.getItem('cart') as string);

        if(data?.length === 0)  cart.value = null
        else cart.value = data;
        getCartLength()
    }

    function getCartLength () {
        const dt = getTotalVariantLength(cart.value) ;
        cartLength.value = +dt;
    }

    function calcTotalPrice () {
        getCart();
        if(cart.value){
            const data = cart.value.reduce((total:any, item:any) => {
                if(item.variant && item.variant.length >0){
                    return total + item.variant.reduce((variantTotal:any, variant:any) => {
                        return variantTotal + variant.quantity * variant.price;

                    },0)
                }else {
                    return total + item.quantity * item.price;
                }
            },0);
            totalPrice.value = data
        }
    }
    function addToCart(payload:CartAdd) {
        getCart()
        if(!cart.value || cart.value.length === 0){
            if(payload.variant_id) {
                const data = {
                    id: payload.product.value.id,
                    image: payload.product.value.images[0],
                    status: payload.product.value.status,
                    name: payload.product.value.name,
                    variants: payload.product.value.variants,
                    variant:[
                        {
                            id: payload.variant_id,
                            quantity: payload.quantity,
                            price: payload.product.value.variants.find((i:any) => i.unit === payload.variant_id).price
                        }
                    ]

                }
                cart.value = [data]
            }else{
                const dataSpecific = {
                    id: payload.product.value.id,
                    image: payload.product.value.images[0],
                    name: payload.product.value.name,
                    status: payload.product.value.status,
                    quantity: payload.quantity,
                    price: payload.product.value.price,
                }
                cart.value = [dataSpecific]
            }
        }
        else{
            const existPrd = cart.value.find((i) => i.id === payload.product.value.id);
            if(existPrd){
                if(existPrd.variant && existPrd.variant.length >0){
                    const checkVariant = existPrd.variant.find((i:any) => i.id === payload.variant_id);
                    if(checkVariant){
                        checkVariant.quantity = Number(checkVariant.quantity) + Number(payload.quantity)
                    }else{
                        existPrd.variant = [...existPrd.variant,{id: payload.variant_id, quantity: +payload.quantity, price: payload.product.value.variants.find((i:any) => i.unit === payload.variant_id).price}]
                    }
                }else{
                    existPrd.quantity  = Number(existPrd.quantity) + Number(payload.quantity)
                }
            }else{
                if(payload.variant_id){
                    const uploadData  = [...cart.value, {
                        id: payload.product.value.id,
                        image:payload.product.value.images[0],
                        status: payload.product.value.status,
                        variants: payload.product.value.variants,
                        name: payload.product.value.name,
                        variant:[
                            {
                                id: payload.variant_id,
                                quantity: payload.quantity,
                                price: payload.product.value.variants.find((i:any) => i.unit === payload.variant_id).price
                            }
                        ]
                    }]
                    cart.value =uploadData;
                }
                else{
                    const uploadSpecific = [...cart.value, {
                        id: payload.product.value.id,
                        quantity: payload.quantity,
                        status: payload.product.value.status,
                        price: payload.product.value.price,
                        image:payload.product.value.images[0],
                        name: payload.product.value.name,
                    }];
                    cart.value = uploadSpecific
                }
            }
        }
        uploadStorage();
        getCart()
    }

    function decrementCartItem(productId:string, variant_id:string | null) {
        getCart();
        const rawCart = toRaw(cart.value);
        const selectedPrd = rawCart && rawCart.find((i) => i.id === String(productId));
        if(variant_id!== null && selectedPrd){
            if(selectedPrd.variant && selectedPrd.variant.length >0){
                const variantSelected = selectedPrd.variant.find((i:any) => i.id === variant_id);
                if(variantSelected){
                    if(variantSelected.quantity > 1 ){
                        variantSelected.quantity = variantSelected.quantity - 1;
                    }
                }
            }
        }
        else{
            if(selectedPrd.quantity > 1){
                selectedPrd.quantity = selectedPrd.quantity - 1;
            }
        }
        uploadStorage();
        getCart()

    }

    function incrementCartItem(productId:string, variant_id:string | null) {
        getCart();
        const rawCart = toRaw(cart.value)
        const selectedPrd = rawCart && rawCart.find((i) => i.id === String(productId));
        if(variant_id!== null && selectedPrd){
            if(selectedPrd.variant && selectedPrd.variant.length >0){
                const variantSelected = selectedPrd.variant.find((i:any) => i.id === variant_id);
                if(variantSelected){
                        variantSelected.quantity = variantSelected.quantity + 1;
                }
            }
        }
        else{
                selectedPrd.quantity = selectedPrd.quantity - 1;
        }
        uploadStorage();
        getCart()

    }

    function deleteItemInCart(productId:string, variant_id:string | null){
        getCart();
        const rawCart = toRaw(cart.value);
        const selectedPrd = rawCart &&  rawCart.find((i) => i.id === String(productId));
        if(variant_id!== null && selectedPrd){
            if(selectedPrd.variant && selectedPrd.variant.length >0){
                const data = selectedPrd.variant.filter((i:any) => i.id !== variant_id);
                selectedPrd.variant = data;
                if(selectedPrd.variant.length === 0) {
                    const deleteSelected = cart.value && cart.value.filter((i) => i.id !== String(productId));
                    cart.value = deleteSelected
                }
            }
        }
        else{
            const data = rawCart && rawCart.filter((i:any) => i.id !== String(productId));
            cart.value = data
        }
        uploadStorage();
        getCart()
    }

    return {cart, totalPrice,loading,cartLength,clearCart,addToCart, getCart, calcTotalPrice,decrementCartItem,incrementCartItem,deleteItemInCart}
})
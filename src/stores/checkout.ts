import {defineStore, storeToRefs} from 'pinia';
import {generateId} from "@/lib/utils.ts";
import {useCart} from "@/stores/cart.ts";
import {useProductStore} from "@/stores/products";

export const useCheckout = defineStore('checkout', () => {
    const cartStore = useCart();
    const prdStore = useProductStore();


    const {cart} = storeToRefs(cartStore);


    function createOrderId() {
        const id = generateId();
        const prefix = 'NO_';
        return `${prefix}${id}`;
    }

    async function checkIntegrityProduct() {
        const data = await prdStore.getListProducts()
        let errors: any = []
        let response: any = [];
        let selectedArr: any[] = []
        if ((!data || !cart.value || cart.value.length === 0)) {
            console.error('product or cart empty!!!')
        } else {
            const mapProduct = new Map();
            data.forEach(product => mapProduct.set(product.id, product));
            for (let prd of cart.value) {
                const selected = mapProduct.get(prd.id);
                selectedArr = [...selectedArr, selected];
            }
            if (selectedArr.length > 0) {
                for (let prd of cart.value) {
                    for (let selected of selectedArr) {

                        if (selected.variants.length > 0) {
                            let messageVariants: any[] = [];
                            let responseVariants: any[] = [];

                            for (let selectedVariant of selected.variants) {
                                for (let prdVariantItem of prd.variant) {
                                    const currentVariantQuanty = +selectedVariant.quantity - +selectedVariant.sale_quantity;
                                    const checkPrice = +prdVariantItem.price - +selectedVariant.price;
                                    let vrErr = {
                                        price: checkPrice > 0 ? `Price current has change: ${selectedVariant.price}` : null,
                                        quantity: currentVariantQuanty < prd.quantity ? `Quantity enable:${currentVariantQuanty}` : null
                                    }

                                    if (currentVariantQuanty < prd.quantity || checkPrice > 0) {
                                        messageVariants = messageVariants.length > 0 ? [...messageVariants, {id: prdVariantItem.id, ...vrErr}] : [{id: prdVariantItem.id, ...vrErr}];
                                    } else {
                                        responseVariants = responseVariants.length > 0 ? [...responseVariants, {
                                            ...prdVariantItem,
                                            integrityPrice: prd.quantity * prdVariantItem.price
                                        }] : [{
                                            ...prdVariantItem,
                                            integrityPrice: prd.quantity * prdVariantItem.price
                                        }]
                                    }
                                }
                            }
                            errors.push(messageVariants);
                            response.push(responseVariants);
                            return {errors: errors, response: response}
                        } else {
                            const currentQuantity = +selected.quantity - +selected.sale_quantity;
                            const currentPrice = +selected.price - +prd.price;
                            let message = {
                                price: currentPrice > 0 ? `Price current has changed:${selected.price}` : null,
                                quantity: currentQuantity < prd.quantity ? `Quantity enable: ${selected.price}` : null,
                            }
                            if (currentQuantity < prd.quantity || currentPrice > 0) {
                                errors = errors.length > 0 ? [...errors, {...message, id: prd.id}] : [{
                                    ...message,
                                    id: prd.id
                                }]
                            } else {
                                response = response.length > 0 ? [...response, {
                                    ...prd,
                                    integrityPrice: prd.quantity * selected.price
                                }] : [{...prd, integrityPrice: prd.quantity * selected.price}];
                            }
                        }

                        return {errors: errors, response: response}

                    }

                }
            }

        }
    }

    function createPayment() {
        const orderId = createOrderId();
        const checkIntegrity = checkIntegrityProduct();
        console.log("checkIntegrity", checkIntegrity)
        return orderId
    }


    return {createPayment, checkIntegrityProduct}

})

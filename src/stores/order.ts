import {defineStore, storeToRefs} from 'pinia';
import {formatPrice, getListFirebase} from "@/lib/utils.ts";
import {useCart} from "@/stores/cart.ts";
import {useProductStore} from "@/stores/products";
import {ICheckout} from "@/types/checkout.ts";
import {ref, type Ref, toRaw} from "vue";
import {useCollection, useCurrentUser, useDocument, useFirestore} from "vuefire";
import {addDoc, collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {toast} from "vue-sonner";
import {uid} from 'uid';
import emailjs from '@emailjs/browser';
import {useVouchersStore} from "@/stores/vouchers.ts";
import {useProfit} from "@/stores/profit.ts";

export const useCheckout = defineStore('checkout', () => {
    const cartStore = useCart();
    const voucherStore = useVouchersStore();
    const prdStore = useProductStore();
    const profitStore = useProfit();
    const loading: Ref<boolean> = ref(false);
    const detailOrder: Ref<any | null> = ref(null);

    const {cart, totalPrice, cartLength, totalItems} = storeToRefs(cartStore);
    const currentUser = useCurrentUser();
    const currentUserOrder: Ref<any[] | null> = ref(null)
    const db = useFirestore();
    const {data: allOrder, pending, error} = useCollection(collection(db, 'orders'));

    function createOrderId() {
        const id = uid();
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

    function parseProduct() {
        let product = [] as any[];

        if (cart.value && cart.value.length > 0) {
            for (let prd of cart.value) {
                if (prd.variant) {
                    for (let v of prd.variant) {
                        const newData = {
                            name: `${prd.name}/${v.id}`,
                            price: formatPrice(+v.price),
                            quantity: +v.quantity,
                            image: prd.image,
                            uid: prd.uid
                        }
                        product = [...product, toRaw(newData)]
                    }
                } else {
                    product = [...product, toRaw({
                        ...prd,
                        price: formatPrice(+prd.price),
                        uid: prd.uid
                    })]
                }
            }
        }
        return product
    }

    async function createPayment(orderInfo: ICheckout) {

        try {
            loading.value = true;
            const orderId = createOrderId();
            const voucher = orderInfo.voucher?.id.length > 1 ? orderInfo.voucher.id : null
            const voucherUsageId = orderInfo.usedVoucherObj ? orderInfo.usedVoucherObj.id : null
            const payload = {
                ...orderInfo,
                product: cart.value,
                orderCode: orderId,
                price: totalPrice.value,
                totalItem: totalItems.value,
                totalQuantity: cartLength.value,
                orderDate: new Date().toISOString(),
                cancelDate: null,
                cancelReason: null,
                paymentStatus: "PENDING",
                fulfillmentStatus: "not fulfilled",
                status: "PENDING",
                userId: currentUser.value?.uid,
                user_confirm_transfer: true,
                admin_confirm_transfer: null,
                voucher: voucher,
                voucherUsageId: voucherUsageId
            }

            const emailProduct = parseProduct();
            const order = await addDoc(collection(db, 'orders'), payload)

            if (orderInfo.voucher.id && currentUser.value?.uid && orderInfo.usedVoucherObj.id) {

                await Promise.all([
                    await voucherStore.updateVoucherQuantity(orderInfo.voucher.id),
                    await voucherStore.assignUserUseVoucher(orderInfo.usedVoucherObj.id, currentUser.value?.uid)
                ])
            }


            if (order) {
                await Promise.all([
                    await emailjs.send(import.meta.env.VITE_APP_EMAIL_SEVICE_ID, import.meta.env.VITE_APP_EMAIL_SEND_USER_ORDER, {
                        ...payload,
                        product: emailProduct,
                        name: payload.userName,
                        email: currentUser.value?.email,
                        orderId: order.id,
                        totalPrice: formatPrice(payload.totalPrice),
                    }, {
                        publicKey: 'evORyAftpWeR2IHqF',
                    }),
                    await profitStore.createProfitCollection(toRaw(payload.product))
                ])

                toast.success('Create Order success fully');
                cartStore.clearCart();
            }

        } catch (error) {
            console.log('error', error);
            toast.error('Payment fail')
        } finally {
            loading.value = false
        }
    }

    async function getCurrentUserOrder() {
        try {
            loading.value = true;
            const allOrder = await getListFirebase('orders');
            if (allOrder && currentUser.value) {
                const order = allOrder.filter((i) => i.userId === (currentUser.value)?.uid) || [];
                currentUserOrder.value = order
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false;
        }
    }


    async function updateOrder(orderId: string, data: any) {


        try {
            loading.value = true;
            const brandDoc = await doc(getFirestore(), "orders", orderId);
            const detail = await useDocument(brandDoc);
            if (detail) {
                await updateDoc(doc(getFirestore(), "orders", orderId), {...data}).then(() => {
                    toast.success('Update Order successfully!!!')
                })
            }

        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }


    }

    async function getDetailOrder(orderId: string) {
        const detail = await useDocument(await doc(getFirestore(), 'orders', orderId));
        console.log('detaik', detail)
        return detail
    }


    return {
        createPayment,
        detailOrder,
        currentUserOrder,
        checkIntegrityProduct,
        getDetailOrder,
        getCurrentUserOrder,
        loading,
        updateOrder,
        allOrder,
        pending,
        error
    }

})

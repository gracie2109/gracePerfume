import {ref, type Ref} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import {checkItemExistence, getDetailData} from '@/lib/utils';
import {toast} from 'vue-sonner'
import {differenceInDays} from "date-fns"
import {addDoc, collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {useCollection, useDocument, useFirestore} from "vuefire";
import {voucherConditionValue} from "@/lib/constant.ts";
import {useCart} from "@/stores/cart.ts";

export const useVouchersStore = defineStore('vouchers', () => {
    const cartStore = useCart()

    const loading: Ref<boolean> = ref(false);

    const db = useFirestore()
    const errors: Ref<string> = ref('');

    const {data: vouchers, pending, error} = useCollection(collection(db, 'vouchers'))
    const {cart} = storeToRefs(cartStore)
    const cartMap = new Map();



    async function createVoucherUsage(payload: any) {
        try {
            loading.value = true;
            await addDoc(collection(db, 'voucherUsage'), payload);
            toast.success('Create voucher successfully')
        } catch (error) {
            console.log('err', error)
        } finally {
            loading.value = false;
        }
    }

    async function createVoucher(payload: any) {
        try {
            loading.value = true;
            const existName = await checkItemExistence('vouchers', 'name', payload.name);
            const existCode = await checkItemExistence('vouchers', 'code', payload.code);

            if (existCode || existName) {
                toast.error('Name or code is already exist')
            } else {
                await addDoc(collection(db, 'vouchers'), {...payload, status: 'active'})
                    .then(async (data) => {
                        await createVoucherUsage({
                            voucher_id: data.id,
                            users: [],

                        })
                    })

                toast.success('Create voucher successfully')
            }
        } catch (e) {
            console.log('e', e)
        } finally {
            loading.value = false
        }

    }

    async function searchVoucher(searchTerm: string, status: string) {
        try {
            loading.value = true;
            console.log('searchTerm', searchTerm, status)
        } catch (error) {
            console.log('err', error)
        } finally {
            loading.value = false
        }
    }

    async function getVoucherUsageByVoucherId(voucherId: string) {
        try {
            loading.value = true;
            const voucherUsage = await getDetailData('voucherUsage', 'voucher_id', voucherId);

            if (voucherUsage) {
                const data = {
                    ...voucherUsage.docs[0].data(),
                    id: voucherUsage.docs[0].id
                } as any;
                return data
            } else return

        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }
    }

    function checkUserUsedVoucher(detailUsedVoucher: any, userId: string) {
        try {
            loading.value = true;
            const check = detailUsedVoucher.users && detailUsedVoucher.users?.find((i: string) => i === userId);
            return check
        } catch (err) {
            console.log('checkUserUsedVoucher_err', err)
        } finally {
            loading.value = false
        }
    }

    async function checkUserCanApplyVoucher(detailVoucher: any, userId: string) {
        try {
            loading.value = true;
            const voucherUsage = await getVoucherUsageByVoucherId(detailVoucher.id);

            if (detailVoucher.number_of_usage === 1) {
                const checkUsed = checkUserUsedVoucher(voucherUsage, userId); //undefined <=> user un-used
                if (!checkUsed) return voucherUsage;
                else return errors.value = 'User has used this voucher'
            } else return voucherUsage

        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }
    }

     function checkProductCanApply(detailVoucher:any) {
        try{
            loading.value = true;
            let result:boolean = false
            if(cart.value){
                for(let i of cart.value){
                    if(i.variant){
                        for(let j of i.variant) {
                            cartMap.set(j.uid,j.uid)
                        }
                    }else{
                        cartMap.set(i.uid, i.uid)
                    }
                }

                for(let k of detailVoucher.product_apply){
                    result = (cartMap.has(k))
                }

            }
            if(result) return detailVoucher
            else return errors.value = 'Cart Product can access this voucher'
        }catch(err){
            console.log('err', err)
        }finally {
            loading.value = false
        }
    }

    async function checkApplyVoucher(price: number, orderCode: string, userId: string) {
        try {
            loading.value = true;
            const detail = await getDetailData('vouchers', 'code', orderCode);
            if (!detail.empty) {
                const detailValue = {
                    ...detail.docs[0].data(),
                    id: detail.docs[0].id
                } as any;


                const checkActiveQuantity = +detailValue.quantity - +detailValue.usage;
                const compareOrderWithMinPrice = price - +detailValue.minPrice;
                const canAccess = await checkUserCanApplyVoucher(detailValue, userId);


                if (checkActiveQuantity <= 0) return errors.value = 'Voucher quantity is full';
                if (compareOrderWithMinPrice < 0) return errors.value = 'The minimum order price has not been reached';
                if (!canAccess) return errors.value = 'You has been use this voucher';

                if (detailValue.endDate) {
                    const checkExpireDate = differenceInDays(new Date(detailValue.endDate), new Date());
                   if(detailValue.type !== voucherConditionValue.PRODUCT_DISCOUNT){
                       if ((checkExpireDate && checkActiveQuantity && compareOrderWithMinPrice) > 0 && canAccess) {
                           errors.value = ''
                           return {
                               voucher: detailValue,
                               voucherUsedItem: canAccess
                           }
                       }
                   }else{
                       const productAccess =  checkProductCanApply(detailValue);

                       if ((checkExpireDate && checkActiveQuantity && compareOrderWithMinPrice) > 0 && canAccess && productAccess) {
                           errors.value = ''
                           return {
                               voucher: detailValue,
                               voucherUsedItem: canAccess
                           }
                       }
                   }
                } else {
                    if ((checkActiveQuantity && compareOrderWithMinPrice) > 0 && canAccess) {
                        errors.value = ''
                        return {
                            voucher: detailValue,
                            voucherUsedItem: canAccess
                        }
                    }
                }
            } else {
                errors.value = 'Not found voucher'
                return
            }
        } catch (e) {
            console.log('errors', e)
        } finally {
            loading.value = false
        }
    }

    function calcByDiscountTypeTotalOrderPrice(type: 'percent' | 'cash', oldPrice: number, target: any) {
        let newPrice: number = (type === 'percent') ? (oldPrice * (+target.value) / 100) : (oldPrice - +target.value);
        if (newPrice > +target.maxValue) return {
            newData: oldPrice - +target.maxValue,
            discountValue: newPrice
        }
        else return {
            newData: oldPrice - +newPrice,
            discountValue: newPrice
        }
    }

    function calcByDiscountTypeFreeship (oldPrice: number, tagret:any) {
        const newPrice = oldPrice - +tagret.maxValue
        return {
            newData: newPrice,
            discountValue: newPrice
        }
    }


    function calcDiscountValue(totalPrice: number, voucherDetail: any) {

        if (!(voucherDetail || totalPrice)) return;
        if(voucherDetail.type === voucherConditionValue.FREE_SHIPPING){
            if (voucherDetail.discount_by.type === 'percent') return calcByDiscountTypeTotalOrderPrice('percent', +totalPrice, voucherDetail.discount_by)
            else return calcByDiscountTypeTotalOrderPrice('cash', +totalPrice, voucherDetail.discount_by);
        }else{
             return calcByDiscountTypeFreeship(+totalPrice, voucherDetail.discount_by)
        }
    }

    async function updateVoucherQuantity(id: string) {
        try {

            loading.value = true;
            const brandDoc = await doc(getFirestore(), "vouchers", id);
            const detail = await useDocument(brandDoc);
            if(detail.value){
                return await updateDoc(doc(getFirestore(), "vouchers", id), {
                    usage: +detail.value.usage + 1
                })
            }

        } catch (e) {
            console.log('e', e)
        } finally {
            loading.value = false
        }
    }

    async function assignUserUseVoucher (id:string, userId:string) {
        try {
            loading.value = true;
            const brandDoc = await doc(getFirestore(), "voucherUsage", id);
            const detail = await useDocument(brandDoc);
            console.log('assignUserUseVoucher', detail)
            if(detail.value){
               return await updateDoc(doc(getFirestore(), "voucherUsage", id), {
                    users:  [...new Set([...detail.value.users, userId])]
                })
            }
        } catch (e) {
            console.log('e', e)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        vouchers,
        pending,
        errors,
        error,
        createVoucher,
        searchVoucher,
        updateVoucherQuantity,
        checkApplyVoucher,
        calcDiscountValue,
        assignUserUseVoucher
    }
})
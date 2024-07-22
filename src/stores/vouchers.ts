import {ref, type Ref} from 'vue'
import {defineStore} from 'pinia'
import {checkItemExistence} from '@/lib/utils';
import { toast } from 'vue-sonner'

import {addDoc, collection, query, where} from "firebase/firestore";
import {useCollection, useFirestore} from "vuefire";


export const useVouchersStore = defineStore('vouchers', () => {
    const loading: Ref<boolean> = ref(false);

    const db = useFirestore()


    const {data:vouchers, pending, error} =  useCollection(collection(db, 'vouchers'))
    async function createVoucherUsage (payload: any) {
        try{
            loading.value = true;
            await addDoc(collection(db, 'voucherUsage'), payload);
            toast.success('Create voucher successfully')
        }catch(error){
            console.log('err', error)
        }finally{
            loading.value = false;
        }
    }
    async function createVoucher(payload: any) {
        try {
            loading.value = true;
            const existName = await checkItemExistence('vouchers', 'name', payload.name);
            const existCode = await checkItemExistence('vouchers', 'code', payload.code);

            if(existCode || existName){
                toast.error('Name or code is already exist')
            }else{
                await addDoc(collection(db, 'vouchers'), payload)
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

    async function searchVoucher(searchTerm: string, status:string) {
        try{
            loading.value = true;
        }catch(error){
            console.log('err', error)
        }
        finally {
            loading.value = false
        }
    }


    return {loading, vouchers,pending, error, createVoucher, searchVoucher}
})
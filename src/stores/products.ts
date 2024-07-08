import { ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import {collection, addDoc} from 'firebase/firestore'
import {useCollection,useFirestore,} from 'vuefire'
import {checkItemExistence, getDetailData} from '@/lib/utils';
import { toast } from 'vue-sonner';
import {useBrandStore} from "@/stores/brand.ts";


export const useProductStore = defineStore('products',  () => {
    const db = useFirestore()
    const products =  useCollection(collection(db, 'products'))
    const loading:Ref<boolean> = ref(false)
    const errors:Ref<{message: String, code: String}> = ref({message: "", code: ""})
    const detailProduct:Ref<any | null> = ref(null)

    const brandStore = useBrandStore()


    const createNewProducts = async (value:any) => {

        try{
            loading.value = true;
            console.log('paylad', value)
            const exist = await checkItemExistence('products','name', value.name);
            if(!exist){
                await addDoc(collection(db, 'products'), value);
                toast.success('products has been created')
            }else{
                toast.error("Item is already exist")
            }

        }
        catch(error){
            console.log("error", error);
            errors.value.message = "Failed to add new brand";
            toast.error("Failed to add new brand")
        }
        finally {
            loading.value = false;
        }
    }


    const getListProducts = async () => {

    }


    const getDetailProduct = async (slug: string) => {
        const data = await getDetailData('products', 'slug', slug);

        const rawData = {
            ...data.docs[0].data(),
            id:  data.docs[0].id
        } as any
        if(rawData && String(rawData.brand)){
            const brand= await brandStore.getDetailBrand(rawData.brand);
            const newData = {
                ...rawData,
                brandInfo: brand,

            }
            return detailProduct.value = newData
        }else{
            return detailProduct.value = rawData
        }
    }

    return { products, loading, errors,detailProduct,  createNewProducts, getListProducts, getDetailProduct}
})
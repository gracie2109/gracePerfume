import { ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import {collection, addDoc, doc, getFirestore, updateDoc} from 'firebase/firestore'
import {useCollection, useDocument, useFirestore,} from 'vuefire'
import {checkItemExistence, getDetailData, getListFirebase} from '@/lib/utils';
import { toast } from 'vue-sonner';
import {useBrandStore} from "@/stores/brand.ts";
import { uid } from 'uid';



export const useProductStore = defineStore('products',  () => {
    const db = useFirestore()
    const products =  useCollection(collection(db, 'products'));

    const loading:Ref<boolean> = ref(false)
    const errors:Ref<{message: String, code: String}> = ref({message: "", code: ""})
    const detailProduct:Ref<any | null> = ref(null)

    const brandStore = useBrandStore()


    const createNewProducts = async (value:any) => {

        try{
            loading.value = true;
            const exist = await checkItemExistence('products','name', value.name);
            if(!exist){
                let newVariant = [] as any[]
                if(value.variants && value.variants.length > 0){
                    for(let i of value.variants){
                        const payload = {
                            ...i,
                            parent_uid:uid(),
                            uid: `${value.uid}/unit/${uid()}`,
                        }
                        newVariant =[...newVariant, payload]
                    }

                }
                const payload = {
                    ...value,
                    variants:newVariant,

                }
                await addDoc(collection(db, 'products'), payload)

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
      try{
          loading.value = true;
          return  await  getListFirebase('products')
      }catch(error){
          console.log('fetch fail')
      }finally {
          loading.value = false
      }
    }
    const updateProduct = async (id: string, payload: any) => {
        try{
            loading.value = true;
            const brandDoc = await doc(getFirestore(), "products", id);
            const detail = await useDocument(brandDoc);
            if(detail){
                await updateDoc(doc(getFirestore(), "products", id), {...payload})
            }
        }catch(e) {
            console.log('e', e)
        }finally{
            loading.value = false
        }
    }

    const getDetailProduct = async (slug: string) => {
        const data = await getDetailData('products', 'slug', slug);

        const rawData = {
            ...data.docs[0].data(),
            id:  data.docs[0].id
        } as any;
        if(rawData && rawData?.brand && rawData?.brand.length > 1){
            const brand= await brandStore.getDetailBrand(rawData?.brand);
            const newData = {
                ...rawData,
                brandInfo: brand,

            }
            return detailProduct.value = newData
        }else{
            return detailProduct.value = rawData
        }

    }

    return { products, loading, errors,detailProduct,  createNewProducts, getListProducts, getDetailProduct,updateProduct}
})
import { ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import { collection, addDoc,deleteDoc,doc } from 'firebase/firestore'
import { useCollection, useDocument, useFirestore,  } from 'vuefire'
import { checkItemExistence } from '@/lib/utils';
import { toast } from 'vue-sonner'
import {getFirestore} from "@firebase/firestore";
export type IBrands = {
    name: string;
    description: string | undefined;
    id: string
}





export const useBrandStore = defineStore('brand',  () => {
    const db = useFirestore()
    const brands =  useCollection(collection(db, 'brands'))
    const loading:Ref<boolean> = ref(false)
    const errors:Ref<{message: String, code: String}> = ref({message: "", code: ""})

    const detailBrand:Ref<any | undefined> = ref(undefined)


    const createNewBrand = async (value: Omit<IBrands, "id">) => {
        try{
            loading.value = true;
            const exist = await checkItemExistence('brands','name', value.name);
            if(!exist){
                await addDoc(collection(db, 'brands'), value);
                toast.success('Brand has been created')
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

    const deleteBrand = async (id: string | string[]) => {
        try {
            loading.value = true;
            if (Array.isArray(id)) {
                const deletePromises = id.map(async (brandId) => {
                    await deleteDoc(doc(db, 'brands', brandId))
                });
                await Promise.all(deletePromises)
                    .then(() => toast.success('Delete success'))

            } else {
                await deleteDoc(doc(db, 'brands', id))
                    .then(() => toast.success('Delete success'))
            }

        } catch (e) {
            console.log("error", e);
        } finally {
            loading.value = false;
        }
    };

    const getDetailBrand = async (id: string) => {
        const brandDoc = await doc(getFirestore(), 'brands', id)
        const detail = await useDocument(brandDoc)
       return detailBrand.value = detail
    }




    const resetForm = () => {
        // formRef.value.resetFields();
    };
    return { brands,  createNewBrand, errors, loading, resetForm, deleteBrand,detailBrand, getDetailBrand}
})

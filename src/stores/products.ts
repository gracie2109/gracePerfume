import { ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { useCollection, useFirestore,  } from 'vuefire'
import { checkItemExistence } from '@/lib/utils';
import { toast } from 'vue-sonner'
export type IBrands = {
    name: string;
    description: string | undefined;
    id: string
}


export const useProductStore = defineStore('products',  () => {
    const db = useFirestore()
    const products =  useCollection(collection(db, 'products'))
    const loading:Ref<boolean> = ref(false)
    const errors:Ref<{message: String, code: String}> = ref({message: "", code: ""})




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
        products.value = []
    }



    return { products, loading, errors, createNewProducts, getListProducts}
})
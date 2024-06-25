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





export const useCollectionsStore = defineStore('collection',  () => {
    const db = useFirestore()
    const collections =  useCollection(collection(db, 'collections'))
    const loading:Ref<boolean> = ref(false)
    const errors:Ref<{message: String, code: String}> = ref({message: "", code: ""})


    const createNewCollection = async (value: Omit<IBrands, "id">) => {
        try{
            loading.value = true;
            const exist = await checkItemExistence('collections','name', value.name);
            if(!exist){
                await addDoc(collection(db, 'collections'), value);
                toast.success('collections has been created')
            }else{
                toast.error("Item is already exist")
            }

        }
        catch(error){
            console.log("error", error);
            errors.value.message = "Failed to add new collections";
             toast.error("Failed to add new collections")
        }
        finally {
            loading.value = false;
        }
    }




    const resetForm = () => {

    };
    return { collections,  createNewCollection, errors, loading, resetForm}
})

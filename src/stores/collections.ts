import { ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import {collection, addDoc, doc, deleteDoc} from 'firebase/firestore'
import {useCollection, useDocument, useFirestore,} from 'vuefire'
import { checkItemExistence } from '@/lib/utils';
import { toast } from 'vue-sonner'
import {getFirestore} from "@firebase/firestore";
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
    const detail:Ref<any | undefined> = ref(undefined)

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


    const getDetailCollection = async (id: string) => {
        const brandDoc = await doc(getFirestore(), 'collections', id)
        const dt = await useDocument(brandDoc)
        return detail.value = dt;
    }

    const resetForm = () => {

    };


    const deleteCollection = async(id:string) => {
        try {
            loading.value = true;
            await deleteDoc(doc(db, 'collections', id))
                .then(() => toast.success('Delete success'))
        } catch (e) {
            console.log("error", e);
        } finally {
            loading.value = false;
        }
    }
    const resetDetail = () => {
        detail.value = undefined
    }
    return { collections, errors, loading, detail,resetDetail, createNewCollection, getDetailCollection,resetForm,deleteCollection}
})

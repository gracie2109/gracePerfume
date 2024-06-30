import { ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { useCollection, useFirestore,  } from 'vuefire'
import { checkItemExistence } from '@/lib/utils';
import { toast } from 'vue-sonner';
export type IPermissionsHandle = {
    name: string;
    methods: string[];
}

export type IPermissions = {
    name: string;
    methods: string[];
    id:string
}




export const usePermissionStore = defineStore('permission',  () => {
    const db = useFirestore()
    const loading:Ref<boolean> = ref(false)
    const errors:Ref<{message: String, code: String}> = ref({message: "", code: ""})
    const permissions =  useCollection(collection(db, 'permissions'))


    function modifyData (values: IPermissionsHandle) {
       const result:string[] =[];
       const {name, methods} = values;
       if(name && methods){
           for (const method of methods) {
               result.push(`PERMISSION.${name.toUpperCase()}.${method.toUpperCase()}`);
           }
       }
     return result
   }


    const createNewPermission = async (value: IPermissionsHandle) => {
        try{
            loading.value = true;
             const exist = await checkItemExistence('permissions','indentity', value.name.toUpperCase());

            if(!exist){
                const newData = modifyData(value);
                await Promise.all(
                    newData.map(async (i) => {
                        await addDoc(collection(db, 'permissions'), {
                            name:i,
                            indentity:i.split('.')[1]
                        });
                    })
                );
                toast.success('Permission has been created')
            }else{
                toast.error("Item is already exist")
            }
        }
        catch(error){
            console.log("error", error);
            errors.value.message = "Failed to create permission";
            toast.error("Failed to create permission")
        }
        finally {
            loading.value = false;
        }
    }

    return { permissions, loading, createNewPermission, modifyData}
})

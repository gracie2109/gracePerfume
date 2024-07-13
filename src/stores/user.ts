import {defineStore} from "pinia";
import {useCurrentUser, useFirestore} from "vuefire";
import {UserAddress} from "@/types/location.ts";
import {type Ref, ref} from "vue";
import {TErrors} from "@/types";
import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {checkItemExistence, getDetailData} from "@/lib/utils.ts";
import {toast} from "vue-sonner";

export const useUserStore = defineStore('user', () => {
    const currentUser = useCurrentUser();
    const userAddress: Ref<UserAddress[] | null> = ref(null)
    const loading: Ref<boolean> = ref(false);
    const db = useFirestore();

    const errors: Ref<TErrors> = ref({
        message: '',
        code: null
    });


    async function createUserLocation(payload: Omit<UserAddress, 'id'>) {
        try {
            loading.value = true;
            if (!currentUser.value) {
                errors.value.message = 'Login first!!'
            }
            const exist = await checkItemExistence("address", "name", payload.name);
            if (!exist) {
                await addDoc(collection(db, "address"), {
                    ...payload,
                    userId: currentUser.value?.uid
                })
                .then(async () => await getCurrentUserAdress())
                toast.success("Address already exist")
            } else {
                toast.error("Address already exist")
            }

        } catch (e) {
            console.log('err', e)
        } finally {
            loading.value = false
        }
    }

    async function getCurrentUserAdress() {
        try {
            loading.value = true;
            if (!currentUser.value) {
                errors.value.message = 'Login first!!'
            } else {
                const data = await getDetailData('address', 'userId', String(currentUser.value?.uid));
                const newData = data.docs.map((i) => {
                    return {
                        ...i.data(),
                        id: i.id
                    }
                }) as UserAddress[]
                return userAddress.value = newData ? newData : null
            }
        } catch (e) {
            console.log('err', e)
        } finally {
            loading.value = false
        }
    }

    const deleteAddress = async (id: string) => {
        try {
            loading.value = true;

            await deleteDoc(doc(db, 'address', id))
                .then(() => toast.success('Delete success'))
                .then(async () => await getCurrentUserAdress())


        } catch (e) {
            console.log("error", e);
        } finally {
            loading.value = false;
        }
    };

    return {createUserLocation, loading, errors, userAddress, getCurrentUserAdress, deleteAddress}
})
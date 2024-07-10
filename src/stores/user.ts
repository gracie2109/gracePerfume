import {defineStore} from "pinia";
import {useCurrentUser} from "vuefire";
import {type IAddress} from "@/types/location.ts";
import {type Ref, ref} from "vue";
import {TErrors} from "@/types";

export const useUserStore = defineStore('user',  () => {
    const currentUser = useCurrentUser();
    const errors: Ref<TErrors> = ref({
        message: '',
        code: null
    });



   async function createUserLocation (payload: IAddress) {
        console.log('payload', payload);
        if(!currentUser.value){
            errors.value.message = 'Login first!!'
        }

    }


    return {createUserLocation}
})
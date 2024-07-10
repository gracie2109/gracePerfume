import {defineStore} from "pinia";
import {type Ref, ref} from "vue";
import {TErrors} from "@/types";

export const useLocationStore = defineStore('location',  () => {

    const errors: Ref<TErrors> = ref({
        message: '',
        code: null
    });



  return {errors}
})
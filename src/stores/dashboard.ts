import {defineStore} from "pinia";
import {type Ref, ref} from "vue";
export const useDashboard = defineStore('dashboard', () => {
    const loading:Ref<boolean> = ref(false)



    async function getRevenueByRangeDate(rangeDate:{start:any, end:any})  {

        try{
            if(!rangeDate) return;
            loading.value = true
        }catch (e) {
            console.log('e', e)
        }finally {
            loading.value = false
        }


    }

    async function getRevenueByData(date:any) {
        try{
            if(!date) return
            loading.value = true;




        }catch (e) {
            console.log('e', e)
        }finally {
            loading.value = false
        }
    }

    return {
        loading,
        getRevenueByRangeDate,
        getRevenueByData
    }
})
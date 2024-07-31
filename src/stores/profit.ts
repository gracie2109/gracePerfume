import {defineStore, storeToRefs} from "pinia";
import {ref, Ref} from "vue";
import {setDoc, doc, query, collection, where, getDocs} from "firebase/firestore";
import {useFirestore} from "vuefire";
import {format} from "date-fns";
import {getFirestore, getDoc} from "@firebase/firestore";
import {useProductStore} from "@/stores/products.ts";

export const useProfit = defineStore('profit', () => {
    const loading: Ref<boolean> = ref(false);
    const db = useFirestore();
    const today = format(new Date().toISOString(), "yyyy-MM-dd");
    const db2 = getFirestore()
    const productStore = useProductStore();
    const {products} = storeToRefs(productStore);


    function getRevenue (data: {profit: number, unit: string, variant_unit?:string, quantity:number}[]) {
        let revenue = 0;
            data.map((i) => {
                if(i.variant_unit) {
                    const profitVariant = (i.profit / +i.unit) * +i.variant_unit * i.quantity;
                    revenue = revenue + profitVariant
                }else{
                    revenue += i.profit * i.quantity
                }
            })
        return revenue
    }

    function MapProduct() {
        const productMap = new Map()
        if(products.value){
            products.value.map((prd) => {
                if(prd.variants && prd.variants.length > 0){
                    prd.variants.map((variant:any) => {
                        productMap.set(variant.uid,{
                            profit:prd.profit,
                            unit: prd.unit,
                            variant_unit: variant.unit,
                        })
                    })
                }else{
                    productMap.set(prd.uid, {
                        profit:prd.profit,
                        unit: prd.unit,
                    })
                }
            });
        }
        return productMap
    }

    function getAndSetQuantityFromMap (payload:any) {
        const productMap = MapProduct();

        const dataKeys = Object.keys(payload).map((i) =>  {
            return {...payload[i],uid:i }
        }) as any[];

        let res = [] as any[]
        for(let i of dataKeys){
            const test = productMap.get(i.uid);
            res = [...res, {...test,quantity: i.quantity}]
        }

        return res
    }

    function calcRevenue(payload:any){
        const res = getAndSetQuantityFromMap(payload);
        if(res && res.length > 0){
           const revenue = getRevenue(res);
           return revenue
        }

    }

    function parseProfitData(collectionName: 'profit' | 'profit_temp', payload: any) {
        let cvData: any;
        payload.map((i: any) => {
            if (i.variant) {
                i.variant.map((j: any) => {
                    cvData = {
                        ...cvData,
                        [j.uid]: {
                            price: collectionName === 'profit_temp' ? j.price : 0,
                            quantity: j.quantity,
                            image: i.image,
                            name: `${i.name}/${j.id}`
                        }
                    }
                })
            } else {
                cvData = {
                    ...cvData,
                    [i.uid]: {
                        price: collectionName === 'profit_temp' ? i.price : 0,
                        quantity: i.quantity,
                        image: i.image,
                        name: i.name
                    }
                }
            }
        });
        return cvData
    }

    async function createProfitCollection(payload: any) {
        try {

            loading.value = true;
            const profit = parseProfitData('profit', payload);
            const profitTemp = parseProfitData('profit_temp', payload);
            return await Promise.all([
                await setDoc(doc(db, "profit", today), profit),
                await setDoc(doc(db, "profitTemp", today), profitTemp)
            ])
        } catch
            (e) {
            console.log('e', e)
        } finally {
            loading.value = false
        }
    }

    async function updateProfit(payload: any) {
        try {
            loading.value = true;
            console.log('payload', payload)
        } catch (e) {
            console.log('error', e)
        } finally {
            loading.value = false
        }
    }


    async function getRevenueByRangeDate(rangeDate:{start:any, end:any})  {

        try{
            if(!rangeDate) return;
            loading.value = true;
            const profitCollection = collection(db, 'profitTemp');

            const q = query(profitCollection,
                where('__name__', '>=', rangeDate.start),
                where('__name__', '<=', rangeDate.end));

            const querySnapshot = await getDocs(q);
            const results = [] as any[];

            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });




            return results;
        }catch (e) {
            console.log('e', e)
        }finally {
            loading.value = false
        }


    }

    type Product = {
        [key: string]: any;
    };

    function findTopTierByDay(products: Product, field: string): Product[] {
        const sortedProducts = Object.values(products).sort((a, b) => b[field] - a[field]);

        return sortedProducts;
    }

    function getTopQuantityAndPrice (products: Product) {
        let totalPrice = 0;
        let totalQuantity = 0;
        for (const product of Object.values(products)) {
            totalQuantity =totalQuantity + product.quantity;
            totalPrice =totalPrice +(product.price * product.quantity);
        }
        const revenue = calcRevenue(products);

        return {
            totalQuantity: totalQuantity,
            totalPrice: totalPrice,
            revenue:revenue
        }
    }

    async function getRevenueByDate(date:any) {
        try{
            if(!date) return
            loading.value = true;
            const data = ( await getDoc(doc(db2, "profitTemp", date))).data();

            if(data){
                const maxPrice = findTopTierByDay(data, 'price')
                const maxQuantity = findTopTierByDay(data, 'quantity');
                const topTier = getTopQuantityAndPrice(data)
                return {
                    ...topTier,
                    topSale: maxQuantity,
                    topRevenue: maxPrice
                }
            }

             return data

        }catch (e) {
            console.log('e', e)
        }finally {
            loading.value = false
        }
    }




    return {
        createProfitCollection,
        updateProfit,
        getRevenueByRangeDate,
        getRevenueByDate

    }
})

import {IGHNShippingPayload} from "@/types/shipment.ts";


const token = import.meta.env.VITE_APP_GHN_TOKEN;
const shopId = import.meta.env.VITE_APP_GHN_SHOP_ID;

export async function calcShippingFee ({shippingInfo, storeInfo, orderInfo}: IGHNShippingPayload) {
    try{
        const url = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
        const controller = new AbortController();
        const signal = controller.signal;
        const response =  (await (await fetch(url, {
            method: 'GET',
            //@ts-ignore
            headers: {
                "Content-Type": "application/json",
                "Token": token,
                "ShopId": shopId,
                "from_district_id": storeInfo.districtId,
                "from_ward_code": storeInfo.wardCode,
                "service_id":53320,
                "service_type_id":null,
                "to_district_id":shippingInfo.districtId,
                "to_ward_code":shippingInfo.wardCode,
                "height":orderInfo.height,
                "length":orderInfo.length,
                "weight":orderInfo.weight,
                "width":orderInfo.width,
                "insurance_value":orderInfo.insurance_value,
                "cod_failed_amount":30000,
                "coupon": null
            },signal
        })).json()).data;
        console.log('response', response)


    }
    catch(err:any){
        console.log(new Error(err))
    }
}
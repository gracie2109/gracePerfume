import {GHNDistrict, GHNProvince, GHNWard} from "@/types/location.ts";

const token = import.meta.env.VITE_APP_GHN_TOKEN;

export async function getProvince() {
    try {
        const url = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province';

        const controller = new AbortController();
        const signal = controller.signal;

        const response =  (await (await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": token
            },signal
        })).json()).data;
        const responseMap = response.map((i:any) => {
            return {
                ...i,
                ProvinceID: String(i.ProvinceID)
            }
        })
        return responseMap ? responseMap as GHNProvince[] : null

    } catch (e:any) {
        console.log(new Error(e))
    }
}

export async function getDistrict(provinceId: number | string) {

    try {
        if (!provinceId) return null;

        else{
            const url = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district';

            const controller = new AbortController();
            const signal = controller.signal;

            const response =  (await (await fetch(url, {
                method: 'GET',
                //@ts-ignore
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                    "province_id":+provinceId,
                },signal
            })).json()).data;
            const responseMap = response.map((i:any) => {
                return {
                    ...i,
                    DistrictID: String(i.DistrictID)
                }
            })
            return responseMap ? responseMap as GHNDistrict[] : null
        }

    } catch (e:any) {
        console.log(new Error(e))
    }
}


export async function getWard(districtId: number | string) {

    try {
        if (!districtId) return null;

        else{
            const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`;

            const controller = new AbortController();
            const signal = controller.signal;

            const response =  (await (await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },signal
            })).json()).data;

            return response ? response as GHNWard[] : null
        }

    } catch (e:any) {
        console.log(new Error(e))
    }
}

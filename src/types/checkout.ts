import {IAddress} from "@/types/location.ts";
import {basePaymentMethods} from "@/lib/constant.ts";

export interface IShippingAddress extends IAddress {
    available_id: string | null,
}

type PaymentMethod = typeof basePaymentMethods[number]['name'];

export type ICheckout = {
    shipping_address:IShippingAddress,
    phoneNumber: string,
    userName: string,
    payment: PaymentMethod,
    user_confirm_transfer: string | null
}

export const initAddress:IAddress = {
    address: '',
    ward: {  WardName: '', WardCode: 0  },
    district:{  DistrictName: '', DistrictID: 0  },
    province:{  ProvinceName: '', ProvinceID: 0  },
}

export const initialCheckoutValue:ICheckout = {
    shipping_address:{
        ...initAddress,
        available_id:null,
    },
    phoneNumber: '',
    user_confirm_transfer: null,
    payment: basePaymentMethods[0]['name'],
    userName:''
}
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
    transfer_banks: string | null
}


export const initialCheckoutValue:ICheckout = {
    shipping_address:{
        available_id:null,
        address: '',
        ward: {  name: '', code: 0  },
        district:{  name: '', code: 0  },
        province:{  name: '', code: 0  },
    },
    phoneNumber: '',
    transfer_banks: null,
    payment: basePaymentMethods[0]['name'],
    userName:''
}
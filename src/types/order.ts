import {ICheckout} from "@/types/checkout.ts";

export interface IProductCartRegular {
    quantity: number | string,
    name: string,
    image:string,
    price: string | number,
    id:string
}
export interface IProductVariant {
    name: string,
    image: string,
    id:string,
    variant:{
        quantity: string | number,
        id:string,
        price:string | number
    }[]
}
export interface IOrder extends ICheckout{
    product:any,
    fulfillmentStatus:string,
    paymentStatus:string,
    cancelDate:null | Date,
    orderDate: Date,
    admin_confirm_transfer: null | string,
    totalItem:number,
    orderCode:string,
    status:string,
    phoneNumber:string,
    price:string
}
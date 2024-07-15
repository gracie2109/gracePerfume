import {ICheckout} from "@/types/checkout.ts";

// const data  = {
//     "price": 972000,
//     "fulfillmentStatus": "not fulfilled",
//     "paymentStatus": "PENDING",
//     "userName": "thaotp trinh",
//     "cancelDate": null,
//     "orderDate": "2024-07-14T16:41:18.712Z",
//     "admin_confirm_transfer": null,
//     "cancelReason": null,
//     "shipping_address": {
//         "province": {
//             "ProvinceName": "Phú Yên",
//             "ProvinceID": "260"
//         },
//         "ward": {
//             "WardName": "Xã Quang Vinh",
//             "WardCode": "60507"
//         },
//         "address": "Yên Nghĩa, Hà Đông",
//         "available_id": "ruIwiXByRSbN0PbWUy1t",
//         "district": {
//             "DistrictID": "3305",
//             "DistrictName": "Huyện Trà Lĩnh"
//         }
//     },
//     "userId": "FmBLjjEdUpNQx1NDjaftMnpMl0K2",
//     "totalItem": 8,
//     "payment": "TRANSFER",
//     "user_confirm_transfer": true,
//     "product": [
//         {
//             "name": "prodct 1",
//             "status": true,
//             "image": "https://firebasestorage.googleapis.com/v0/b/netflix-react-70f52.appspot.com/o/product%2Fgallery-4.jpg?alt=media&token=11799c8b-92eb-4905-81a6-7114fb8bad28",
//             "id": "M9qCT6W5Srvl13ruOxOE",
//             "variant": [
//                 {
//                     "quantity": 2,
//                     "price": "120000",
//                     "id": "20ml"
//                 },
//                 {
//                     "quantity": 2,
//                     "id": "10ml",
//                     "price": "120000"
//                 }
//             ]
//         },
//         {
//             "quantity": 4,
//             "name": "cat",
//             "image": "https://firebasestorage.googleapis.com/v0/b/netflix-react-70f52.appspot.com/o/product%2Fhero3.jpg?alt=media&token=5af323d9-83ea-4a7d-be17-2a5a05e62256",
//             "price": 123000,
//             "id": "sNzMj8yWPFYEAAzgzIVp"
//         }
//     ],
//     "orderCode": "NO_d0e37927a7e",
//     "status": "PENDING",
//     "phoneNumber": ""
// }

interface IProductCartRegular {
    quantity: number | string,
    name: string,
    image:string,
    price: string | number,
    id:string
}
interface IProductVariant {
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
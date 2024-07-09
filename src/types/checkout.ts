

export type ICheckout = {
    shipping_address: {
        available_id: string,
        address: string,
        ward: string,
        province: string,
    },
    phoneNumber: string,
    userName: string,
    payment: string
}
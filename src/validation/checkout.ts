import * as z from 'zod';


const shippingAddress = z.object({
    shipping_address: z.object({
        address: z.string().min(2, {message: 'Please enter a valid shipping address.'}),
        ward: z.object({
            WardName: z.string().min(2, {message: 'Please enter a valid ward.'}),
            WardCode: z.string().min(2, {message: 'Please enter a valid ward.'}),
        }),
        district: z.object({
            DistrictName: z.string().min(2, {message: 'Please enter a valid ward.'}),
            DistrictID: z.string().min(2, {message: 'Please enter a valid ward.'}),
        }),
        province: z.object({
            ProvinceName: z.string().min(2, {message: 'Please enter a valid ward.'}),
            DistrictID: z.string().min(2, {message: 'Please enter a valid ward.'}),
        }),
        available_id: z.string().min(2, {message: 'Please enter a valid ward.'}).optional().transform(value => value || null),
    })
})

const paymentInfomation = z.object({
    phoneNumber: z.string().min(2, {message: 'Please enter a phoneNumber.'}).optional().transform(value => value || null),
    user_confirm_transfer: z.string().min(2, {message: 'Please enter a user_confirm_transfer.'}).optional().transform(value => value || null),
    payment: z.string().min(2, {message: 'Enter payment '}),
    userName: z.string().min(2, {message: 'Please enter a valid userName.'}),
});

const voucherValid = z.object({
    voucher: z.object({
        id: z.string().min(2, {message: 'Please enter a id voucher.'}).optional().transform(value => value || null),
        code: z.string().min(2, {message: 'Please enter a code.'}).optional().transform(value => value || null),
    }).optional().transform(value => value || null),
})

const shippingFee = z.object({
    fee: z.number(),
    totalFee: z.number()
})

export const voucherValidation = z.object({
    salePrice: z.number(),
    totalPrice: z.number(),
    usedVoucherObj: z.any().optional().transform(value => value || null),
})
    .merge(shippingAddress)
    .merge(paymentInfomation)
    .merge(voucherValid)
    .merge(shippingFee)

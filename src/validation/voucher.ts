import {z} from "zod";


export const voucherValidation = z.object({
    name: z.string().min(2, {message: "Product name must at least 2 character"}),
    description: z.string().min(5, {message: "Description must at least 5 character",}).optional().transform(value => value || null),
    type: z.string().min(2, {message: "Type required"}),
    code: z.string().min(2, {message: "Code must at least 2 character"}),
    startDate: z.string().min(2, {message: "startDate is required"}),
    endDate: z.string()
        .nullable()
        .transform((value: any) => value ?? NaN),
    minPrice: z.number().min(1)
        .nullable()
        .transform((value: any) => value ?? NaN),
    number_of_usage: z.string().min(1, {message: "Quantity usage required"}),
    product_apply: z.array(z.string()).optional().transform(value => value || null),
    quantity: z.number().min(1),
    discount_by: z.object({
        type: z.string().min(1, {message: "Choose the discount type"}).optional().transform(value => value || null),
        value: z.number().optional().transform(value => value || null),
        maxValue: z.number().optional().transform(value => value || null)
    }).optional().transform(value => value || null),
})
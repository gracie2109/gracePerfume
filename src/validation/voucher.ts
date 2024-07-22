import {z} from "zod";
export const voucherValidation = z.object({
    name: z.string().min(2, {  message: "Product name must at least 2 character"  }),
    description: z.string().min(5, {message: "Description must at least 5 character", }).optional().transform(value => value || null),
    type: z.string()
})
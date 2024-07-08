import {z} from "zod";


export const productValidation = z.object({
    name: z.string().min(2, {  message: "Product name must at least 2 character"  }),
    description: z.string().min(5, {message: "Description must at least 5 character", }),
    price: z.coerce.number() // Force it to be a number
        .int() // Make sure it's an integer
        .gte(10000, {message: "Min Price is 10.000d"}) // Greater than or equal to the smallest 5 digit int
        .lte(10000000,{message: "Max Price is 10.000.000d"}),
    cost: z.coerce.number(),
    cost_per_item: z.coerce.number().optional(),
    variants: z.array(z.object({
        unit: z.string().min(2, {message: "Variant name is required"}),
        price: z.coerce.number()
            .int()
            .gte(10000, {message: "Min Price is 10.000d"}) // Greater than or equal to the smallest 5 digit int
            .lte(10000000,{message: "Max Price is 10.000.000d"}),
        quantity: z.coerce.number().min(1, {message: "Quantity must more than 1 item"}),
    })).optional(),
    images:z.array(z.any()).refine(value => value.some(item => item), {}),
    quantity:  z.coerce.number(),
})
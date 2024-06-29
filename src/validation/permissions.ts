
import * as z from 'zod'


export const formHandleSchema = z.object({
    name: z.string().min(2).max(50),
    methods: z.array(z.string()).refine(value => value.some(item => item), {
        message: 'You have to select at least one item.',
    }),
})
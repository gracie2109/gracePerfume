import * as z from 'zod';


export const settingAppSchema = z.object({
   name: z.string().min(2, {message: "App must have at least 2 character"}),

})

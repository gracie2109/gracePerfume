import {z} from "zod";



export const passWordAndConfirmSchema = z.object({
    password: z
        .string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
        ),
    confirmPassword: z.string(),
});
export const passWordCheck = (v: any, ctx: any) => {
    if (v.password !== v.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
};
export const emailSchema = z.object({
    email: z
        .string()
        .email({message: "Invalid email address"})
        .refine((email) => email.endsWith("@gmail.com"), {
            message: "Email need end with @gmail.com",
        }),
});

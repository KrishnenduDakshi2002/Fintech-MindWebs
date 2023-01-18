import {z} from 'zod';

export const LoginValidation = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string()
})
export const SignUpValidation = z.object({
    name: z.string(),
    email: z.string().email({message:'Invalid email address'}),
    password: z.string()
})
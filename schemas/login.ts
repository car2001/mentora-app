import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email({message: "El campo email está vacío o no es válido"}),
  password: z
    .string({message: "El campo contraseña está vacío"})
    .min(1, {message: "El campo contraseña está vacío"})
})

export type SignInSchema = z.infer<typeof signInSchema>;

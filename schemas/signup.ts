import { z } from "zod";

export const signUpSchema = z.object({
    nombre: z
        .string({message: "El campo nombre está vacío"})
        .min(1, {message: "El campo nombres está vacío"}),
    apellidos: z
        .string({message: "El campo apellidos está vacío"})
        .min(1, {message: "El campo apellidos está vacío"}),
    email: z
        .email({ message: "Debe ingresar un email válido" }),
    password: z
        .string({ message: "El campo contraseña está vacío" })
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    passwordConfirm: z
        .string({ message: "El campo confirme su contraseña está vacío" })
        .min(8, { message: "Confirmar contraseña debe tener al menos 8 caracteres" }),
    rol: z.enum(["estudiante", "mentor"], {
        message: "Debe seleccionar un rol"
    }),
})

export type SignUpSchema = z.infer<typeof signUpSchema>;

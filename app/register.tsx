import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/Input";
import { ThemedView } from "@/components/ThemedView";
import { signUpSchema, SignUpSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import roleService from "@/services/role";
import userService from "@/services/user";
import Toast from 'react-native-toast-message';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function Register() {

    const router = useRouter();
    const [roles, setRoles] = useState([]);

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange"
    });

    const loadRole = async () => {
        const roles = await roleService.getAllRoles();
        console.log("Roles:", roles);
        setRoles(roles);
    }

    const onSubmit = (data: SignUpSchema) => {
        console.log("Formulario enviado", data);
        // Aquí envías los datos a tu backend
        userService.create({
            nombre: data.nombre,
            apellido: data.apellidos,
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm, // Asegúrate de que el backend espera este campo
            rol_id: data.rol === "estudiante" ? 1 : 2, // Asegúrate de que el backend espera el rol como string
        }).then(() => {
            Toast.show({
                type: 'success',
                text1: 'Registro exitoso',
                text2: 'Tu cuenta ha sido creada correctamente 🎉',
            });
            router.push("/");
        }).catch((error) => {
            console.error("Error al crear usuario:", error.response?.data.message || error.message);
            Toast.show({
                type: 'error',
                text1: 'Error al registrar',
                text2: error.response?.data.message ||  error.message || 'Hubo un problema al crear tu cuenta',
            });
        });
    };

    useEffect(() => {
        loadRole();
    }, []);

    return (
        <SafeAreaView style={ROOT_STYLE} className="bg-[#fff] dark:bg-[#151718]">
            <KeyboardAvoidingView
                style={ROOT_STYLE}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    className="mx-auto max-w-xl flex-1 justify-between px-4 py-2 md:px-8 md:py-4">
                    {/* ✅ Logo Mentora PS */}
                    <ThemedView className="2xl:pt-12 items-center">
                        <Image
                            source={require("@/assets/images/logo.png")}
                            style={{
                                width: 200,
                                height: 100,
                                resizeMode: "contain",
                            }}
                        />
                    </ThemedView>

                    <ThemedView className="pt-2 items-center">
                        <Text className="text-3xl font-black text-center text-blue-700 dark:text-blue-400">
                            Crear una Cuenta
                        </Text>
                        <Text className="text-base mt-2 text-center text-gray-500 dark:text-gray-300">
                            Únete como estudiante o mentor - juntos impulsamos la educación.
                        </Text>
                    </ThemedView>

                    <ThemedView>
                        {/* 🔘 Selector de Rol con Controller */}
                        <View className="w-full mt-4">
                            <Text className="mb-2 font-semibold text-center text-gray-500 dark:text-gray-300">Selecciona un rol:</Text>
                            <Controller
                                control={control}
                                name="rol"
                                render={({ field: { onChange, value } }) => (
                                    <View className="flex-row justify-center flex-wrap gap-2 md:gap-4">
                                        {roles.map((role: any) => (
                                            <TouchableOpacity
                                                key={role.id}
                                                onPress={() => onChange(role.nombre)} // Guardamos el nombre del rol
                                                className={`px-4 py-2 rounded-full border ${value === role.nombre ? "bg-blue-600 border-blue-600" : "border-gray-400"
                                                    }`}
                                            >
                                                <Text
                                                    className={`${value === role.nombre ? "text-white" : "text-gray-600 dark:text-gray-300"
                                                        } font-semibold`}
                                                >
                                                    {role.nombre.charAt(0).toUpperCase() + role.nombre.slice(1)}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            />
                            {!!errors?.rol && (
                                <Text className="text-red-500 text-xs mt-1 text-center">
                                    {errors.rol.message}
                                </Text>
                            )}
                        </View>

                        {/* 📝 Campos del formulario */}
                        <ThemedView className="mt-4 flex flex-col md:flex-row md:flex-wrap md:justify-between gap-2 md:gap-4">
                            <View className="w-full md:w-[48%]">
                                <Controller
                                    control={control}
                                    name="nombre"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            placeholder="Nombres"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {!!errors?.nombre && (
                                    <View className="mt-1 mr-4">
                                        <Text className="text-red-500 text-xs">
                                            {errors?.nombre.message}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            {/* Apellidos */}
                            <View className="w-full md:w-[48%]">
                                <Controller
                                    control={control}
                                    name="apellidos"
                                    render={({ field: { onChange, value } }) => (
                                        <Input placeholder="Apellidos" value={value} onChangeText={onChange} />
                                    )}
                                />
                                {!!errors?.apellidos && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.apellidos.message}
                                    </Text>
                                )}
                            </View>

                            {/* Email */}
                            <View className="w-full md:w-[48%]">
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            placeholder="Correo Electrónico"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {!!errors?.email && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </Text>
                                )}
                            </View>

                            {/* Contraseña */}
                            <View className="w-full md:w-[48%]">
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            placeholder="Contraseña"
                                            secureTextEntry
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {!!errors?.password && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </Text>
                                )}
                            </View>

                            {/* Confirmar contraseña */}
                            <View className="w-full md:w-[48%]">
                                <Controller
                                    control={control}
                                    name="passwordConfirm"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            placeholder="Confirmar Contraseña"
                                            secureTextEntry
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {!!errors?.passwordConfirm && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.passwordConfirm.message}
                                    </Text>
                                )}
                            </View>
                        </ThemedView>


                        {/* Botón de enviar */}
                        <TouchableOpacity
                            className="mt-6 bg-blue-600 p-3 rounded-md"
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text className="text-center text-white font-semibold">Registrarse</Text>
                        </TouchableOpacity>

                        {/* Enlace para volver al login */}
                        <TouchableOpacity className="mt-4 md:mt-6" onPress={() => router.push("/")}>
                            <Text className="text-sm text-center text-blue-600 font-semibold">
                                Ya tengo una cuenta
                            </Text>
                        </TouchableOpacity>
                    </ThemedView>
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

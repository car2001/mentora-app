import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    ViewStyle
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/Input";
import { ThemedView } from "@/components/ThemedView";
import { signInSchema, SignInSchema } from "@/schemas/login";
import loginService from "@/services/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from 'react-native-toast-message';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function Index() {

    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: "onChange"
    });

    const onSubmit = (data: SignInSchema) => {
        loginService.login(data)
            .then(response => {
                Toast.show({
                    type: 'success',
                    text1: 'Inicio de sesión exitoso',
                    text2: '¡Bienvenido!',
                    position: 'top',
                });

                router.push("/home");
            })
            .catch(error => {
                console.error("Error al iniciar sesión:", error);

                Toast.show({
                    type: 'error',
                    text1: 'Error al iniciar sesión',
                    text2: 'Verifica tus credenciales',
                    position: 'top',
                });
            });

        console.log("Datos de inicio de sesión:", data);
    };

    return (
        <SafeAreaView style={ROOT_STYLE} className="bg-[#fff] dark:bg-[#151718]">
            <KeyboardAvoidingView
                style={ROOT_STYLE}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    className="mx-auto max-w-xl flex-1 justify-between gap-4 px-8 py-4">
                    {/* ✅ Logo Mentora PS */}
                    <ThemedView className="pt-12 items-center">
                        <Image
                            source={require("@/assets/images/logo.png")}
                            style={{
                                width: 250,
                                height: 100,
                                resizeMode: "contain",
                            }}
                        />
                    </ThemedView>

                    <ThemedView className=" items-center">
                        <Text className="text-3xl font-black text-center text-blue-700 dark:text-blue-400">
                            Inicio de Sesión
                        </Text>
                        <Text className="text-base mt-2 text-center text-gray-500 dark:text-gray-300">
                            Bienvenido de vuelta! Ingresa tus credenciales
                        </Text>
                    </ThemedView>

                    <ThemedView>
                        <ThemedView className="w-full md:w-[48%]">
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Correo Electrónico"
                                        className="mt-6"
                                        value={value}
                                        onChangeText={onChange}
                                        keyboardType="email-address"
                                    />
                                )}
                            />
                            {!!errors?.email && (
                                <ThemedView className="mt-1 mr-4">
                                    <Text className="text-red-500 text-xs">
                                        {errors?.email.message}
                                    </Text>
                                </ThemedView>
                            )}
                        </ThemedView>
                        <ThemedView className="w-full md:w-[48%]">
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Contraseña"
                                        className="mt-6"
                                        value={value}
                                        onChangeText={onChange}
                                        secureTextEntry={true}
                                    />
                                )}
                            />
                            {!!errors?.password && (
                                <ThemedView className="mt-1 mr-4">
                                    <Text className="text-red-500 text-xs">
                                        {errors?.password.message}
                                    </Text>
                                </ThemedView>
                            )}
                        </ThemedView>

                        {/* Forgot password */}
                        <TouchableOpacity className="mt-2 self-end">
                            <Text className="text-sm text-blue-700 dark:text-blue-400 font-medium">Olvido su contraseña?</Text>
                        </TouchableOpacity>

                        {/* Login button */}
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            // onPress={() => router.push("/home")}
                            className="mt-6 bg-blue-600 rounded-full py-3 active:bg-blue-700">
                            <Text className="text-center text-white font-semibold text-base">
                                Ingresar
                            </Text>
                        </TouchableOpacity>

                        {/* Create account */}
                        <TouchableOpacity className="mt-8" onPress={() => router.push("/register")}>
                            <Text className="text-sm text-center text-blue-600 font-semibold">
                                Crear una nueva cuenta
                            </Text>
                        </TouchableOpacity>
                    </ThemedView>
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

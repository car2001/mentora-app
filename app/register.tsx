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
import { useRouter } from "expo-router";
import { useState } from "react";

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function Register() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"estudiante" | "mentor" | null>(null);

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
                        {/* 🔘 Selector de Rol */}
                         <View className="flex-row justify-center gap-2 md:gap-4 mt-4">
                            <TouchableOpacity
                                onPress={() => setSelectedRole("estudiante")}
                                className={`px-4 py-2 rounded-full border ${selectedRole === "estudiante"
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-400"
                                    }`}
                            >
                                <Text
                                    className={`${selectedRole === "estudiante"
                                        ? "text-white"
                                        : "text-gray-600 dark:text-gray-300"
                                        } font-semibold`}
                                >
                                    Estudiante
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setSelectedRole("mentor")}
                                className={`px-4 py-2 rounded-full border ${selectedRole === "mentor"
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-400"
                                    }`}
                            >
                                <Text
                                    className={`${selectedRole === "mentor"
                                        ? "text-white"
                                        : "text-gray-600 dark:text-gray-300"
                                        } font-semibold`}
                                >
                                    Mentor
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* 📝 Campos del formulario */}
                        <ThemedView className="mt-4 flex flex-col md:flex-row md:flex-wrap md:justify-between gap-2 md:gap-4">
                            <View className="w-full md:w-[48%]">
                                <Input placeholder="Nombres" />
                            </View>
                            <View className="w-full md:w-[48%]">
                                <Input placeholder="Apellidos" />
                            </View>
                            <View className="w-full md:w-[48%]">
                                <Input placeholder="Correo Electrónico" keyboardType="email-address" />
                            </View>
                            <View className="w-full md:w-[48%]">
                                <Input placeholder="Contraseña" secureTextEntry />
                            </View>
                            <View className="w-full md:w-[48%]">
                                <Input placeholder="Confirmar Contraseña" secureTextEntry />
                            </View>
                        </ThemedView>


                        {/* Botón de Registro */}
                        <TouchableOpacity className="mt-4 md:mt-6 bg-blue-600 rounded-full py-3 active:bg-blue-700">
                            <Text className="text-center text-white font-semibold text-base">
                                Registrarse
                            </Text>
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

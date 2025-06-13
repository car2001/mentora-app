import { useRouter } from "expo-router";
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

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function Index() {

    const router = useRouter();

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
                        <Input
                            className="mt-6"
                            placeholder="Correo Electrónico"
                            keyboardType="email-address"
                        />
                        <Input
                            placeholder="Contraseña"
                            secureTextEntry={true}
                        />

                        {/* Forgot password */}
                        <TouchableOpacity className="mt-2 self-end">
                            <Text className="text-sm text-blue-700 dark:text-blue-400 font-medium">Olvido su contraseña?</Text>
                        </TouchableOpacity>

                        {/* Login button */}
                        <TouchableOpacity 
                            onPress={()=> router.push("/home")}
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

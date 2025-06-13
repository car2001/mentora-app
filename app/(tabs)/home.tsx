import Input from "@/components/Input";
import { ThemedView } from "@/components/ThemedView";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

const posts = [
  {
    id: "1",
    name: "Guillber Mendez",
    title: "Software Engineer | Fullstack Web Dev",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    content:
      "🧑‍🏫 Me encanta enseñar programación con Node.js. Si estás comenzando y quieres entender cómo crear APIs con Express, ¡aquí estoy para ayudarte!",
    image:
      "https://storage.googleapis.com/chat-assets/7d271b0d-b246-4d11-9efe-fdca59d2bc0a.png",
  },
  {
    id: "2",
    name: "Ana Torres",
    title: "Profesora de Matemática - Preuniversitaria",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    content:
      "📢 ¡Inscripciones abiertas! Curso intensivo de **Razonamiento Matemático** para exámenes de admisión. Incluye teoría, práctica y simulacros 🧠📚",
    image: "https://storage.googleapis.com/chat-assets/matematica-course.jpg",
  },
  {
    id: "3",
    name: "Luis Campos",
    title: "Estudiante de 5to de secundaria",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    content:
      "Hola comunidad 🙌, ¿alguien me puede ayudar con este problema de física sobre MRUV? No entiendo cómo usar las fórmulas para calcular el tiempo 😥⚡",
  },
  {
    id: "4",
    name: "Claudia Salazar",
    title: "Bióloga y Docente Universitaria",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    content:
      "🧬 ¿Te cuesta entender Genética o Biología Celular? Estoy dictando clases personalizadas por Zoom. ¡Escríbeme para más información!",
    image: "https://storage.googleapis.com/chat-assets/biologia-clases.jpg",
  },
  {
    id: "5",
    name: "Carlos Huamán",
    title: "Aspirante a Medicina - Postulante UNSA",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    content:
      "¿Alguien tiene recomendaciones para repasar temas de química orgánica? Estoy a un mes del examen de admisión y necesito enfocarme mejor 😓🧪",
  },
  {
    id: "6",
    name: "María Velásquez",
    title: "Profesora de Física y Química",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    content:
      "🚀 Curso completo de Física para escolares: Cinemática, Dinámica, Electricidad y más. Ideal para reforzar o prepararse para la universidad. ¡Inscríbete ya!",
    image: "https://storage.googleapis.com/chat-assets/fisica-clases.jpg",
  },
  {
    id: "7",
    name: "Diego Rojas",
    title: "Estudiante de Academia",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    content:
      "Estoy confundido con los temas de biología del sistema nervioso. ¿Alguien que me explique de manera sencilla cómo funciona el impulso nervioso? 🙏🧠",
  },
];

const LeftSidebar = () => (
  <View style={{ padding: 8 }}>
    <Text className="text-lg font-semibold mb-4">Sugerencias</Text>
    <Text>Usuario A</Text>
    <Text>Usuario B</Text>
  </View>
);

const RightSidebar = () => (
  <View style={{ padding: 8 }}>
    <Text className="text-lg font-semibold mb-4 text-white">Tendencias</Text>
    <Text style={{ color: "#06b6d4" }}>#ReactNative</Text>
    <Text style={{ color: "#06b6d4" }}>#MentoraRed</Text>
  </View>
);

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const router = useRouter()

  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";
  const subTextColor = isDarkMode ? "#aaa" : "#555";
  const bgColor = isDarkMode ? "#1b1f23" : "#f0f2f5";
  const cardColor = isDarkMode ? "#24292f" : "white";

  const showLeftSidebar = width >= 1024;
  const showRightSidebar = width >= 768;

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    router.navigate("/")
  };

  const renderPostCard = ({ item }: any) => (
    <ThemedView
      style={{ backgroundColor: cardColor, padding: 10, marginVertical: 8 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ color: subTextColor, fontSize: 14 }}>{item.title}</Text>
        </View>
      </View>

      <Text style={{ color: textColor, fontSize: 15, lineHeight: 22, marginBottom: 12 }}>
        {item.content}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8 }}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons name="heart-outline" size={18} color={subTextColor} />
          <Text style={{ color: subTextColor, fontSize: 14 }}>Reaccionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Feather name="message-circle" size={18} color={subTextColor} />
          <Text style={{ color: subTextColor, fontSize: 14 }}>Comentar</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <ThemedView style={{ padding: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Input
            placeholder="Buscar en MentoraRed..."
            placeholderTextColor="#e0e0e0"
            className="flex-1 text-white px-3 py-1.5 rounded-full text-sm"
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Entypo name="dots-three-vertical" size={20} color="#868383" />
          </TouchableOpacity>
        </ThemedView>

        {/* Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: cardColor,
                padding: 20,
                borderRadius: 10,
                width: 250,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16, color: textColor }}>
                ¿Deseas cerrar sesión?
              </Text>
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  paddingVertical: 10,
                  backgroundColor: "#ef4444",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                  Cerrar sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: subTextColor, textAlign: "center" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Main Layout */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* Left Sidebar */}
          {showLeftSidebar && (
            <View style={{ width: 200, padding: 10 }}>
              <LeftSidebar />
            </View>
          )}

          {/* Feed */}
          <View style={{ flex: 1, padding: 10 }}>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={renderPostCard}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* Right Sidebar */}
          {showRightSidebar && (
            <View style={{ width: 180, padding: 10 }}>
              <RightSidebar />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

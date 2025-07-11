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
  ScrollView,
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
    createdAt: "2025-07-10T18:30:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "2",
    name: "Ana Torres",
    title: "Profesora de Matemática - Preuniversitaria",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    content:
      "📢 ¡Inscripciones abiertas! Curso intensivo de **Razonamiento Matemático** para exámenes de admisión. Incluye teoría, práctica y simulacros 🧠📚",
    image: "https://storage.googleapis.com/chat-assets/matematica-course.jpg",
    createdAt: "2025-07-10T19:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "3",
    name: "Luis Campos",
    title: "Estudiante de 5to de secundaria",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    content:
      "Hola comunidad 🙌, ¿alguien me puede ayudar con este problema de física sobre MRUV? No entiendo cómo usar las fórmulas para calcular el tiempo 😥⚡",
    createdAt: "2025-07-10T20:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "4",
    name: "Claudia Salazar",
    title: "Bióloga y Docente Universitaria",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    content:
      "🧬 ¿Te cuesta entender Genética o Biología Celular? Estoy dictando clases personalizadas por Zoom. ¡Escríbeme para más información!",
    image: "https://storage.googleapis.com/chat-assets/biologia-clases.jpg",
    createdAt: "2025-07-10T21:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "5",
    name: "Carlos Huamán",
    title: "Aspirante a Medicina - Postulante UNSA",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    content:
      "¿Alguien tiene recomendaciones para repasar temas de química orgánica? Estoy a un mes del examen de admisión y necesito enfocarme mejor 😓🧪",
    createdAt: "2025-07-10T22:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "6",
    name: "María Velásquez",
    title: "Profesora de Física y Química",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    content:
      "🚀 Curso completo de Física para escolares: Cinemática, Dinámica, Electricidad y más. Ideal para reforzar o prepararse para la universidad. ¡Inscríbete ya!",
    image: "https://storage.googleapis.com/chat-assets/fisica-clases.jpg",
    createdAt: "2025-07-10T23:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "7",
    name: "Diego Rojas",
    title: "Estudiante de Academia",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    content:
      "Estoy confundido con los temas de biología del sistema nervioso. ¿Alguien que me explique de manera sencilla cómo funciona el impulso nervioso? 🙏🧠",
    createdAt: "2025-07-11T00:00:00Z",
    likes: 0,
    comments: [],
  },
  // Más posts para pruebas de búsqueda
  {
    id: "8",
    name: "Sofía Mendoza",
    title: "Mentora de Química",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "¿Quieres aprender química orgánica desde cero? ¡Únete a mis clases personalizadas!",
    createdAt: "2025-07-11T01:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "9",
    name: "Pedro Alarcón",
    title: "Profesor de Historia Universal",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content:
      "Hoy hablaremos sobre la Revolución Francesa y su impacto en el mundo moderno.",
    createdAt: "2025-07-11T02:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "10",
    name: "Lucía Ramírez",
    title: "Estudiante de Medicina",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    content:
      "¿Alguien tiene apuntes de anatomía? Estoy buscando material para repasar para el examen final.",
    createdAt: "2025-07-11T03:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "11",
    name: "Javier Paredes",
    title: "Mentor de Programación Python",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    content:
      "¿Te gustaría aprender a programar en Python? Tengo cupos para clases grupales y personalizadas.",
    createdAt: "2025-07-11T04:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "12",
    name: "Andrea López",
    title: "Profesora de Literatura",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    content:
      "Recomiendo leer 'Cien años de soledad' para quienes quieren mejorar su comprensión lectora.",
    createdAt: "2025-07-11T05:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "13",
    name: "Miguel Torres",
    title: "Estudiante de Ingeniería",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    content:
      "¿Alguien puede ayudarme con ejercicios de cálculo diferencial?",
    createdAt: "2025-07-11T06:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "14",
    name: "Valeria Quispe",
    title: "Mentora de Inglés",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    content:
      "Clases de inglés conversacional todos los sábados. ¡Reserva tu cupo!",
    createdAt: "2025-07-11T07:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "15",
    name: "Oscar Fernández",
    title: "Profesor de Filosofía",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    content:
      "Debatiremos sobre ética y moral en la sociedad actual. ¡Participa!",
    createdAt: "2025-07-11T08:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "16",
    name: "Camila Rojas",
    title: "Estudiante de Derecho",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    content:
      "¿Quién tiene resúmenes de derecho penal? Los agradecería mucho.",
    createdAt: "2025-07-11T09:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "17",
    name: "Fernando Gutiérrez",
    title: "Mentor de Matemática",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    content:
      "Preparación para exámenes de admisión en matemáticas. Clases online y presenciales.",
    createdAt: "2025-07-11T10:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "18",
    name: "Patricia Salinas",
    title: "Profesora de Biología",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    content:
      "¿Te interesa la biología molecular? Tengo material exclusivo para mis alumnos.",
    createdAt: "2025-07-11T11:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "19",
    name: "Alonso Vera",
    title: "Estudiante de Arquitectura",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    content:
      "¿Alguien recomienda software para modelado 3D fácil de usar?",
    createdAt: "2025-07-11T12:00:00Z",
    likes: 0,
    comments: [],
  },
  {
    id: "20",
    name: "Gabriela Ruiz",
    title: "Mentora de Francés",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    content:
      "Clases de francés para principiantes y avanzados. ¡Inscríbete hoy!",
    createdAt: "2025-07-11T13:00:00Z",
    likes: 0,
    comments: [],
  },
];

const LeftSidebar = ({ onShowCourses, onShowNewPost, onGoToClasses }: any) => (
  <View style={{ padding: 8, backgroundColor: '#23272e', borderRadius: 14, marginBottom: 12 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 18, letterSpacing: 0.5 }}>Accesos rápidos</Text>
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8, backgroundColor: '#1e293b', gap: 8 }}
      activeOpacity={0.85}
      onPress={onShowCourses}
    >
      <Text style={{ fontSize: 18 }}>📘</Text>
      <Text style={{ color: '#3b82f6', fontWeight: '600', fontSize: 15 }}>Mis cursos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8, backgroundColor: '#1e293b', gap: 8 }}
      activeOpacity={0.85}
      onPress={onShowNewPost}
    >
      <Text style={{ fontSize: 18 }}>➕</Text>
      <Text style={{ color: '#3b82f6', fontWeight: '600', fontSize: 15 }}>Nueva publicación</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8, backgroundColor: '#1e293b', gap: 8 }}
      activeOpacity={0.85}
      onPress={onGoToClasses}
    >
      <Text style={{ fontSize: 18 }}>📅</Text>
      <Text style={{ color: '#3b82f6', fontWeight: '600', fontSize: 15 }}>Clases programadas</Text>
    </TouchableOpacity>
  </View>
);

const RightSidebar = () => {
  const anuncios = [
    {
      id: "a1",
      titulo: "Clases de Matemática",
      descripcion: "Refuerza tus conocimientos con clases personalizadas online.",
    },
    {
      id: "a2",
      titulo: "Curso de Física Preuniversitaria",
      descripcion: "Incluye simulacros, teoría y problemas resueltos.",
    },
    {
      id: "a3",
      titulo: "Taller de Escritura Académica",
      descripcion: "Aprende a redactar ensayos, informes y más con técnicas profesionales.",
    },
  ];

  return (
    <ScrollView style={{ padding: 8 }} showsHorizontalScrollIndicator={false}>
      <Text className="text-lg font-semibold mb-4 text-white">Anuncios</Text>

      {anuncios.map((anuncio) => (
        <View
          key={anuncio.id}
          style={{
            backgroundColor: "#2d2d2d",
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginBottom: 6 }}>
            {anuncio.titulo}
          </Text>
          <Text style={{ color: "#ccc", fontSize: 13, marginBottom: 10 }}>
            {anuncio.descripcion}
          </Text>
          <TouchableOpacity style={{ alignSelf: "flex-start", backgroundColor: "#06b6d4", borderRadius: 6 }}>
            <Text style={{ color: "white", fontSize: 13, paddingVertical: 4, paddingHorizontal: 10 }}>
              Ver más
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const mockCourses = [
  { id: 'c1', name: 'Matemática Preuniversitaria', teacher: 'Ana Torres' },
  { id: 'c2', name: 'Física General', teacher: 'María Velásquez' },
  { id: 'c3', name: 'Literatura Latinoamericana', teacher: 'Andrea López' },
  { id: 'c4', name: 'Inglés Conversacional', teacher: 'Valeria Quispe' },
];


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";
  const subTextColor = isDarkMode ? "#aaa" : "#555";
  const bgColor = isDarkMode ? "#1b1f23" : "#f0f2f5";
  const cardColor = isDarkMode ? "#24292f" : "white";

  const showLeftSidebar = width >= 1024;
  const showRightSidebar = width >= 768;

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ name: '', title: '', content: '' });
  const [allPosts, setAllPosts] = useState(posts);
  const [commentModal, setCommentModal] = useState({ visible: false, postId: null });
  const [commentText, setCommentText] = useState("");

  const handleLogout = () => {
    setModalVisible(false);
    router.navigate("/");
  };

  // Filtrar posts por nombre de profesor o contenido
  const filteredPosts = allPosts.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    // Si es hoy, mostrar solo la hora
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return `hoy, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }
    // Si es ayer
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `ayer, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }
    // Si es este año
    if (date.getFullYear() === now.getFullYear()) {
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }
    // Otro año
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  }

  const handleLike = (postId: string) => {
    setAllPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
  };

  const handleComment = (postId: string) => {
    setCommentModal({ visible: true, postId });
    setCommentText("");
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    setAllPosts((prev) =>
      prev.map((p) =>
        p.id === commentModal.postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now().toString(),
                  text: commentText,
                  author: "Tú",
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : p
      )
    );
    setCommentModal({ visible: false, postId: null });
    setCommentText("");
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
        <View style={{ marginLeft: 'auto' }}>
          <Text style={{ color: subTextColor, fontSize: 12 }}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>

      <Text style={{ color: textColor, fontSize: 15, lineHeight: 22, marginBottom: 12 }}>
        {item.content}
      </Text>

      {/* Comentarios */}
      {item.comments && item.comments.length > 0 && (
        <View style={{ marginBottom: 8, backgroundColor: isDarkMode ? '#23272e' : '#f1f5f9', borderRadius: 8, padding: 8 }}>
          {item.comments.slice(-2).map((c: any) => (
            <View key={c.id} style={{ marginBottom: 4 }}>
              <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 13 }}>{c.author} <Text style={{ color: subTextColor, fontWeight: 'normal', fontSize: 12 }}>{formatDate(c.createdAt)}</Text></Text>
              <Text style={{ color: textColor, fontSize: 14 }}>{c.text}</Text>
            </View>
          ))}
          {item.comments.length > 2 && (
            <Text style={{ color: subTextColor, fontSize: 12 }}>...y {item.comments.length - 2} más</Text>
          )}
        </View>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8, marginTop: 2 }}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 4 }} onPress={() => handleLike(item.id)}>
          <Ionicons name="heart-outline" size={18} color={subTextColor} />
          <Text style={{ color: subTextColor, fontSize: 14 }}>Reaccionar{item.likes > 0 ? ` (${item.likes})` : ''}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 4 }} onPress={() => handleComment(item.id)}>
          <Feather name="message-circle" size={18} color={subTextColor} />
          <Text style={{ color: subTextColor, fontSize: 14 }}>Comentar{item.comments.length > 0 ? ` (${item.comments.length})` : ''}</Text>
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
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Entypo name="dots-three-vertical" size={20} color="#868383" />
          </TouchableOpacity>
        </ThemedView>

        {/* Modal Logout */}
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

        {/* Modal Cursos */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={showCoursesModal}
          onRequestClose={() => setShowCoursesModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e0f2fe', borderRadius: 18, padding: 28, minWidth: 340, maxWidth: 420, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0369a1', marginBottom: 18, textAlign: 'center' }}>Mis cursos</Text>
              {mockCourses.map((course) => (
                <View key={course.id} style={{ marginBottom: 14, padding: 14, borderRadius: 10, backgroundColor: '#bae6fd' }}>
                  <Text style={{ fontWeight: '700', color: '#0369a1', fontSize: 17 }}>{course.name}</Text>
                  <Text style={{ color: '#0ea5e9', fontSize: 15, marginTop: 2 }}>Profesor: {course.teacher}</Text>
                </View>
              ))}
              <TouchableOpacity onPress={() => setShowCoursesModal(false)} style={{ marginTop: 12, alignSelf: 'flex-end' }}>
                <Text style={{ color: '#0369a1', fontWeight: 'bold', fontSize: 16 }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Nueva Publicación */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={showNewPostModal}
          onRequestClose={() => setShowNewPostModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e0f2fe', borderRadius: 18, padding: 0, minWidth: 370, maxWidth: 480, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 }}>
              {/* Header estilo Twitter */}
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#bae6fd', padding: 16, paddingBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0369a1', flex: 1 }}>Crear publicación</Text>
                <TouchableOpacity onPress={() => setShowNewPostModal(false)}>
                  <Text style={{ color: '#0369a1', fontWeight: 'bold', fontSize: 18 }}>×</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 16, paddingTop: 10 }}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12, borderWidth: 2, borderColor: '#bae6fd' }} />
                <View style={{ flex: 1 }}>
                  <Input
                    placeholder="¿Qué quieres compartir?"
                    value={newPost.content}
                    onChangeText={val => setNewPost(p => ({ ...p, content: val }))}
                    multiline
                    style={{ minHeight: 80, backgroundColor: '#fff', borderRadius: 10, padding: 10, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#bae6fd', color: '#111' }}
                    placeholderTextColor="#888"
                  />
                  <Input
                    placeholder="Tu nombre"
                    value={newPost.name}
                    onChangeText={val => setNewPost(p => ({ ...p, name: val }))}
                    style={{ marginBottom: 8, backgroundColor: '#fff', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: '#bae6fd', color: '#111' }}
                    placeholderTextColor="#888"
                  />
                  <Input
                    placeholder="Título o especialidad"
                    value={newPost.title}
                    onChangeText={val => setNewPost(p => ({ ...p, title: val }))}
                    style={{ marginBottom: 8, backgroundColor: '#fff', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: '#bae6fd', color: '#111' }}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity
                    style={{ backgroundColor: '#3b82f6', borderRadius: 999, paddingVertical: 12, marginTop: 8, marginBottom: 4, alignItems: 'center', shadowColor: '#0ea5e9', shadowOpacity: 0.2, shadowRadius: 6, elevation: 2 }}
                    onPress={() => {
                      if (newPost.name && newPost.title && newPost.content) {
                        setAllPosts([
                          {
                            id: Date.now().toString(),
                            name: newPost.name,
                            title: newPost.title,
                            content: newPost.content,
                            avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
                            createdAt: new Date().toISOString(),
                            likes: 0,
                            comments: [],
                          },
                          ...allPosts,
                        ]);
                        setShowNewPostModal(false);
                        setNewPost({ name: '', title: '', content: '' });
                      }
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Publicar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal Comentario */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={commentModal.visible}
          onRequestClose={() => setCommentModal({ visible: false, postId: null })}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e0f2fe', borderRadius: 18, padding: 0, minWidth: 370, maxWidth: 480, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#bae6fd', padding: 16, paddingBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0369a1', flex: 1 }}>Comentar publicación</Text>
                <TouchableOpacity onPress={() => setCommentModal({ visible: false, postId: null })}>
                  <Text style={{ color: '#0369a1', fontWeight: 'bold', fontSize: 18 }}>×</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 16, paddingTop: 10 }}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/lego/2.jpg' }} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12, borderWidth: 2, borderColor: '#bae6fd' }} />
                <View style={{ flex: 1 }}>
                  <Input
                    placeholder="Escribe tu comentario..."
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    style={{ minHeight: 60, backgroundColor: '#fff', borderRadius: 10, padding: 10, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#bae6fd', color: '#111' }}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity
                    style={{ backgroundColor: '#3b82f6', borderRadius: 999, paddingVertical: 12, marginTop: 8, marginBottom: 4, alignItems: 'center', shadowColor: '#0ea5e9', shadowOpacity: 0.2, shadowRadius: 6, elevation: 2 }}
                    onPress={submitComment}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Comentar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Main Layout */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* Left Sidebar */}
          {showLeftSidebar && (
            <View style={{ width: 220, padding: 10 }}>
              <LeftSidebar
                onShowCourses={() => setShowCoursesModal(true)}
                onShowNewPost={() => setShowNewPostModal(true)}
                onGoToClasses={() => router.push('/(tabs)/class')}
              />
            </View>
          )}

          {/* Feed */}
          <View style={{ flex: 1, padding: 10 }}>
            <FlatList
              data={filteredPosts}
              keyExtractor={(item) => item.id}
              renderItem={renderPostCard}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text style={{ color: subTextColor, textAlign: 'center', marginTop: 40 }}>No se encontraron resultados.</Text>}
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

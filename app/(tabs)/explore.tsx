import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

type MessageItem = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
};

const messages: MessageItem[] = [
  {
    id: "1",
    name: "Guillber Mendez",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    lastMessage: "Hola, ¿cómo vas con el proyecto de física?",
    time: "10:45 AM",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Ana Torres",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    lastMessage: "Ya subí el archivo del curso!",
    time: "Ayer",
    unreadCount: 0,
  },
];

// Tarjeta individual de usuario
const MessageCard = ({
  item,
  isSelected,
  onPress,
  textColor,
  subTextColor,
  cardColor,
}: {
  item: MessageItem;
  isSelected: boolean;
  onPress: () => void;
  textColor: string;
  subTextColor: string;
  cardColor: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      backgroundColor: isSelected ? "#0a66c210" : cardColor,
      borderBottomColor: subTextColor + "33",
      borderBottomWidth: 1,
    }}
  >
    <Image
      source={{ uri: item.avatar }}
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
      }}
    />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "600", fontSize: 16, color: textColor }}>
        {item.name}
      </Text>
      <Text
        numberOfLines={1}
        style={{ fontSize: 14, color: subTextColor, marginTop: 2 }}
      >
        {item.lastMessage}
      </Text>
    </View>
    <View style={{ alignItems: "flex-end" }}>
      <Text style={{ fontSize: 12, color: subTextColor, marginBottom: 4 }}>
        {item.time}
      </Text>
      {item.unreadCount ? (
        <View
          style={{
            backgroundColor: "#0a66c2",
            borderRadius: 999,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            {item.unreadCount}
          </Text>
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

// Chat detail estilo Messenger
const ChatPanel = ({
  selectedUser,
  textColor,
  bgColor,
  cardColor,
}: {
  selectedUser: MessageItem;
  textColor: string;
  bgColor: string;
  cardColor: string;
}) => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    { id: 1, fromMe: false, text: "¡Hola! ¿Listo para la clase?", time: "10:40" },
    { id: 2, fromMe: true, text: "¡Hola profe! Sí, ya estoy conectado.", time: "10:41" },
    { id: 3, fromMe: false, text: "Perfecto, comenzamos en 5 minutos.", time: "10:42" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setChat((prev) => [
      ...prev,
      {
        id: Date.now(),
        fromMe: true,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    ]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      {/* Header tipo Messenger */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderBottomColor: cardColor + '33', backgroundColor: cardColor }}>
        <Image source={{ uri: selectedUser.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
        <Text style={{ color: textColor, fontSize: 18, fontWeight: "600", flex: 1 }}>{selectedUser.name}</Text>
        <TouchableOpacity style={{ backgroundColor: '#22c55e', borderRadius: 999, padding: 8, marginLeft: 8 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>📹</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, padding: 12 }} contentContainerStyle={{ paddingBottom: 16 }}>
        {chat.map((msg) => (
          <View
            key={msg.id}
            style={{
              alignSelf: msg.fromMe ? 'flex-end' : 'flex-start',
              backgroundColor: msg.fromMe ? '#2563eb' : cardColor,
              borderRadius: 18,
              marginBottom: 8,
              paddingVertical: 8,
              paddingHorizontal: 14,
              maxWidth: '80%',
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 2,
            }}
          >
            <Text style={{ color: msg.fromMe ? 'white' : textColor, fontSize: 15 }}>{msg.text}</Text>
            <Text style={{ color: msg.fromMe ? '#dbeafe' : '#888', fontSize: 11, alignSelf: 'flex-end', marginTop: 2 }}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", padding: 8, borderTopWidth: 1, borderTopColor: cardColor + '33', backgroundColor: cardColor }}>
        <TextInput
          placeholder="Escribe un mensaje"
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            backgroundColor: bgColor,
            paddingHorizontal: 12,
            paddingVertical: 8,
            color: textColor,
            borderRadius: 20,
            marginRight: 8,
          }}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{ backgroundColor: "#2563eb", borderRadius: 20, paddingHorizontal: 16, justifyContent: "center" }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";
  const subTextColor = isDarkMode ? "#aaa" : "#555";
  const bgColor = isDarkMode ? "#1b1f23" : "#f0f2f5";
  const cardColor = isDarkMode ? "#24292f" : "white";
  const { width } = useWindowDimensions();

  const [selectedId, setSelectedId] = useState<string | null>(messages[0].id);
  const [showChatMobile, setShowChatMobile] = useState(false);

  const selectedUser = messages.find((msg) => msg.id === selectedId)!;

  // Layout para web (ancho) y móvil (estrecho)
  if (width > 600) {
    // Web/tablet: lista y chat lado a lado
    return (
      <View style={{ flexDirection: "row", flex: 1, backgroundColor: bgColor }}>
        {/* Lista de mensajes */}
        <View style={{ width: 300, backgroundColor: bgColor }}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageCard
                item={item}
                isSelected={item.id === selectedId}
                onPress={() => setSelectedId(item.id)}
                textColor={textColor}
                subTextColor={subTextColor}
                cardColor={cardColor}
              />
            )}
          />
        </View>
        {/* Panel de chat */}
        <View style={{ flex: 1, borderLeftWidth: 1, borderColor: "#ccc" }}>
          <ChatPanel
            selectedUser={selectedUser}
            textColor={textColor}
            bgColor={bgColor}
            cardColor={cardColor}
          />
        </View>
      </View>
    );
  } else {
    // Móvil: lista o chat, no ambos
    return showChatMobile ? (
      <View style={{ flex: 1, backgroundColor: bgColor }}>
        {/* Header móvil para volver a la lista */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: cardColor, borderBottomWidth: 1, borderBottomColor: cardColor + '33' }}>
          <TouchableOpacity onPress={() => setShowChatMobile(false)} style={{ marginRight: 10 }}>
            <Text style={{ fontSize: 22, color: textColor }}>←</Text>
          </TouchableOpacity>
          <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 18 }}>Chat</Text>
        </View>
        <ChatPanel
          selectedUser={selectedUser}
          textColor={textColor}
          bgColor={bgColor}
          cardColor={cardColor}
        />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: bgColor }}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageCard
              item={item}
              isSelected={item.id === selectedId}
              onPress={() => {
                setSelectedId(item.id);
                setShowChatMobile(true);
              }}
              textColor={textColor}
              subTextColor={subTextColor}
              cardColor={cardColor}
            />
          )}
        />
      </View>
    );
  }
}

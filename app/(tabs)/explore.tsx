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

// Chat detail
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: cardColor }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <Image
          source={{ uri: selectedUser.avatar }}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10 }}
        />
        <Text style={{ color: textColor, fontSize: 18, fontWeight: "600" }}>
          {selectedUser.name}
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 12 }}>
        {/* Ejemplo de mensaje */}
        <Text style={{ color: textColor }}>👋 Hola, ¿cómo estás?</Text>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          padding: 8,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          backgroundColor: bgColor,
        }}
      >
        <TextInput
          placeholder="Escribe un mensaje"
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            backgroundColor: cardColor,
            paddingHorizontal: 12,
            paddingVertical: 8,
            color: textColor,
            borderRadius: 20,
            marginRight: 8,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            console.log("Enviar:", input);
            setInput("");
          }}
          style={{
            backgroundColor: "#0a66c2",
            borderRadius: 20,
            paddingHorizontal: 16,
            justifyContent: "center",
          }}
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

  const selectedUser = messages.find((msg) => msg.id === selectedId)!;

  return (
    <View style={{ flexDirection: "row", flex: 1, backgroundColor: bgColor }}>
      {/* Lista de mensajes */}
      <View style={{ width: width > 600 ? 300 : width, backgroundColor: bgColor }}>
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

      {/* Panel de chat solo si pantalla ancha */}
      {width > 600 && selectedUser && (
        <View style={{ flex: 1, borderLeftWidth: 1, borderColor: "#ccc" }}>
          <ChatPanel
            selectedUser={selectedUser}
            textColor={textColor}
            bgColor={bgColor}
            cardColor={cardColor}
          />
        </View>
      )}
    </View>
  );
}

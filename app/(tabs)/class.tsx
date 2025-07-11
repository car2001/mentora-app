import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from "react";
import { FlatList, Image, LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from "react-native";

// Componente de estrellas para calificar
const StarRating = ({ rating, onRate }: { rating: number, onRate: (r: number) => void }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => onRate(star)}>
        <Text style={{ fontSize: 24, color: star <= rating ? "#FFD700" : "#ccc" }}>
          ★
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Datos simulados
const scheduledClasses = [
  { id: "1", title: "Matemáticas - 12/07/2025 10:00", teacher: "Prof. García", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: "2", title: "Historia - 15/07/2025 14:00", teacher: "Prof. Smith", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
];

const pastClassesInit = [
  {
    id: "3",
    title: "Ciencias - 01/07/2025 09:00",
    teacher: "Prof. García",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 0,
    review: '',
    feedback: [
      { id: 1, author: "Tú", comment: "Muy buena clase, el profe explica claro.", rating: 5, date: "2025-07-01T10:00:00Z" },
      { id: 2, author: "Ana", comment: "Me gustó el repaso de ejercicios.", rating: 4, date: "2025-07-01T11:00:00Z" },
    ],
    progress: 100,
  },
  {
    id: "4",
    title: "Inglés - 05/07/2025 11:00",
    teacher: "Prof. Smith",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 0,
    review: '',
    feedback: [
      { id: 1, author: "Tú", comment: "Aprendí vocabulario nuevo.", rating: 4, date: "2025-07-05T12:00:00Z" },
    ],
    progress: 100,
  },
];

export default function ClassScreen() {
  // Estado para seguimiento académico
  const [showProgressPanel, setShowProgressPanel] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [reviewModal, setReviewModal] = useState({ visible: false, classId: null });
  const [reviewText, setReviewText] = useState("");
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const bgColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const [pastClasses, setPastClasses] = useState(pastClassesInit);
  const [showScheduled, setShowScheduled] = useState(true);
  const [showPast, setShowPast] = useState(true);

  const handleRate = (classId: string, rating: number) => {
    setPastClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId ? { ...cls, rating } : cls
      )
    );
    setReviewModal({ visible: true, classId });
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) return;
    setPastClasses((prev) =>
      prev.map((cls) =>
        cls.id === reviewModal.classId
          ? {
              ...cls,
              review: reviewText,
              feedback: [
                ...cls.feedback,
                {
                  id: Date.now(),
                  author: "Tú",
                  comment: reviewText,
                  rating: cls.rating,
                  date: new Date().toISOString(),
                },
              ],
            }
          : cls
      )
    );
    setReviewText("");
    setReviewModal({ visible: false, classId: null });
  };

  const toggleSection = (section: 'scheduled' | 'past') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (section === 'scheduled') setShowScheduled((v) => !v);
    else setShowPast((v) => !v);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: bgColor }}>
      {/* Panel de Seguimiento Académico */}
      <TouchableOpacity onPress={() => setShowProgressPanel((v) => !v)} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: textColor, flex: 1 }}>Seguimiento Académico</Text>
        <Text style={{ fontSize: 22, color: cardColor }}>{showProgressPanel ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showProgressPanel && (
        <View style={{ backgroundColor: cardColor + '22', borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 17, marginBottom: 8 }}>Historial de Clases</Text>
          {pastClasses.length === 0 ? (
            <Text style={{ color: textColor }}>No hay historial.</Text>
          ) : (
            pastClasses.map((cls) => (
              <TouchableOpacity key={cls.id} onPress={() => setSelectedClass(cls)} style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: cls.avatar }} style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10, borderWidth: 1, borderColor: cardColor }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: textColor, fontWeight: '600' }}>{cls.title}</Text>
                  <Text style={{ color: cardColor, fontSize: 13 }}>{cls.teacher}</Text>
                </View>
                <Text style={{ color: cardColor, fontSize: 13 }}>{cls.progress}%</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      {/* Modal Detalle de Clase y Feedback */}
      {selectedClass && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            activeOpacity={1}
            onPress={() => setSelectedClass(null)}
          />
          <View
            style={{
              backgroundColor: bgColor,
              borderRadius: 16,
              padding: 24,
              minWidth: 320,
              maxWidth: 400,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
              borderWidth: 1,
              borderColor: cardColor + '33',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: cardColor, marginBottom: 8 }}>{selectedClass.title}</Text>
            <Text style={{ color: cardColor, fontSize: 15, marginBottom: 8 }}>Profesor: {selectedClass.teacher}</Text>
            <Text style={{ color: textColor, fontWeight: 'bold', marginBottom: 6 }}>Feedback y Reseñas:</Text>
            {selectedClass.feedback.length === 0 ? (
              <Text style={{ color: textColor }}>Sin reseñas aún.</Text>
            ) : (
              <View style={{ maxHeight: 120 }}>
                {selectedClass.feedback.slice(-3).map((fb: any) => (
                  <View key={fb.id} style={{ marginBottom: 8, backgroundColor: cardColor + (bgColor === '#1b1f23' ? '33' : '11'), borderRadius: 8, padding: 8 }}>
                    <Text style={{ color: cardColor, fontWeight: 'bold', fontSize: 14 }}>{fb.author} <Text style={{ color: '#888', fontWeight: 'normal', fontSize: 12 }}>{new Date(fb.date).toLocaleDateString()}</Text></Text>
                    <Text style={{ color: textColor, fontSize: 14 }}>{fb.comment}</Text>
                    <Text style={{ color: '#FFD700', fontSize: 13 }}>{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</Text>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity onPress={() => setSelectedClass(null)} style={{ marginTop: 10, alignSelf: 'flex-end' }}>
              <Text style={{ color: cardColor, fontWeight: 'bold', fontSize: 16 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Panel Clases Programadas */}
      <TouchableOpacity onPress={() => toggleSection('scheduled')} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: textColor, flex: 1 }}>Clases Programadas</Text>
        <Text style={{ fontSize: 22, color: cardColor }}>{showScheduled ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showScheduled && (
        <FlatList
          data={scheduledClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: cardColor + '22', borderRadius: 12, marginBottom: 8 }}>
              <Image source={{ uri: item.avatar }} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12, borderWidth: 2, borderColor: cardColor }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, color: textColor, fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: cardColor, marginTop: 2 }}>{item.teacher}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // Navegar a la vista de mensajes (explore)
                  window.location.href = '/(tabs)/explore';
                }}
                style={{ marginLeft: 8, backgroundColor: '#2563eb', borderRadius: 999, padding: 10, flexDirection: 'row', alignItems: 'center' }}
                activeOpacity={0.85}
              >
                <Text style={{ color: 'white', fontSize: 16, marginRight: 4 }}>Unirse</Text>
                <Text style={{ fontSize: 18, color: 'white' }}>📞</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: textColor }}>No hay clases programadas.</Text>}
        />
      )}

      {/* Panel Clases Pasadas */}
      <TouchableOpacity onPress={() => toggleSection('past')} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: textColor, flex: 1 }}>Clases Pasadas</Text>
        <Text style={{ fontSize: 22, color: cardColor }}>{showPast ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showPast && (
        <FlatList
          data={pastClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: cardColor + '11', borderRadius: 12, marginBottom: 8 }}>
              <Image source={{ uri: item.avatar }} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12, borderWidth: 2, borderColor: cardColor }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, color: textColor, fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: cardColor, marginTop: 2 }}>{item.teacher}</Text>
                <StarRating rating={item.rating} onRate={(r) => handleRate(item.id, r)} />
                {item.review && (
                  <Text style={{ color: textColor, fontSize: 14, marginTop: 4 }}>Tu reseña: {item.review}</Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: textColor }}>No hay clases pasadas.</Text>}
        />
      )}

      {/* Modal para escribir reseña tras calificar */}
      {reviewModal.visible && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, minWidth: 320, maxWidth: 400, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: cardColor, marginBottom: 8 }}>¡Deja una reseña para el profesor!</Text>
            <Text style={{ color: textColor, fontSize: 15, marginBottom: 8 }}>¿Qué te pareció la clase?</Text>
            <View style={{ backgroundColor: '#f1f5f9', borderRadius: 8, padding: 8, marginBottom: 10 }}>
              <Text
                style={{ color: textColor, fontSize: 15 }}
                numberOfLines={4}
                >
                {reviewText.length === 0 ? 'Escribe tu opinión aquí...' : reviewText}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: cardColor, fontSize: 14, marginRight: 8 }}>Reseña:</Text>
              <View style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: 8 }}>
                <Text
                  style={{ color: textColor, fontSize: 15, padding: 6 }}
                  onPress={() => {}}
                  selectable
                  >
                  {reviewText}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: cardColor, fontSize: 14, marginRight: 8 }}>Editar:</Text>
              <View style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: 8 }}>
                <Text
                  style={{ color: textColor, fontSize: 15, padding: 6 }}
                  onPress={() => {}}
                  >
                  {/* Aquí podrías usar un TextInput si quieres edición en vivo */}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
              <TouchableOpacity onPress={() => setReviewModal({ visible: false, classId: null })}>
                <Text style={{ color: cardColor, fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitReview} style={{ backgroundColor: cardColor, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 18 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Mdatos = ({ route, navigation }) => {
  const { employee } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Barra superior mejorada */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons 
            name="arrow-left" 
            size={28} 
            color="#FFF" 
          />
        </TouchableOpacity>
        <Text style={styles.title}>Mis Datos</Text>
        <View style={styles.spacer} />
      </View>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>
        {employee ? (
          <>
            {/* Foto de perfil */}
            <Image 
              source={require("../../assets/LogoEmpleado.png")} 
              style={styles.profileImage}
              resizeMode="contain"
            />

            {/* Información personal */}
            <View style={styles.dataCard}>
              <Text style={styles.sectionTitle}>Información Personal</Text>
              
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="identifier" size={24} color="#1E88E5" />
                <Text style={styles.dataText}>Código: {employee.id}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="account" size={24} color="#1E88E5" />
                <Text style={styles.dataText}>Nombre: {employee.nombre} {employee.apellidos}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="phone" size={24} color="#1E88E5" />
                <Text style={styles.dataText}>Teléfono: {employee.telefono}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="briefcase" size={24} color="#1E88E5" />
                <Text style={styles.dataText}>Puesto: {employee.puesto}</Text>
              </View>
            </View>

            {/* Historial de asistencias */}
            <View style={styles.dataCard}>
              <Text style={styles.sectionTitle}>Últimas asistencias</Text>
              
              {employee.asistencias && employee.asistencias.length > 0 ? (
                employee.asistencias.slice(-5).reverse().map((item, index) => (
                  <View key={index} style={styles.attendanceRow}>
                    <MaterialCommunityIcons name="calendar-check" size={20} color="#4CAF50" />
                    <View style={styles.attendanceTextContainer}>
                      <Text style={styles.attendanceDate}>
                        {new Date(item).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </Text>
                      <Text style={styles.attendanceTime}>
                        {new Date(item).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No hay registros de asistencia</Text>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>No se encontraron datos del empleado</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  // Barra superior
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingTop: 56,
    paddingHorizontal: 15,
    elevation: 3,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 38, // Compensa el ancho del botón
  },
  // Contenido
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#1E88E5",
  },
  // Tarjetas de datos
  dataCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    color: "#1E88E5",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 8,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dataText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  // Asistencias
  attendanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  attendanceTextContainer: {
    marginLeft: 12,
  },
  attendanceDate: {
    fontSize: 14,
    color: "#333",
    fontWeight: '500',
  },
  attendanceTime: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  // Mensajes
  noDataText: {
    color: "#888",
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: "#F44336",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});

export default Mdatos;
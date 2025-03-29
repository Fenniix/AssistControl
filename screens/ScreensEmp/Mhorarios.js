import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Mhorarios = ({ navigation, route }) => {
  const { employeeCode } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Barra superior rediseñada */}
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
        <Text style={styles.title}>Mis horarios</Text>
        <View style={styles.spacer} />
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Horarios registrados</Text>
        
        {/* Ejemplo de horario - puedes reemplazar con datos dinámicos */}
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleRow}>
            <MaterialCommunityIcons name="calendar" size={24} color="#1E88E5" />
            <Text style={styles.scheduleText}>Lunes a Viernes</Text>
          </View>
          <View style={styles.scheduleRow}>
            <MaterialCommunityIcons name="clock" size={24} color="#1E88E5" />
            <Text style={styles.scheduleText}>08:00 AM - 05:00 PM</Text>
          </View>
        </View>

        {/* Espacio para más horarios */}
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleRow}>
            <MaterialCommunityIcons name="calendar-weekend" size={24} color="#FF9800" />
            <Text style={styles.scheduleText}>Sábados</Text>
          </View>
          <View style={styles.scheduleRow}>
            <MaterialCommunityIcons name="clock" size={24} color="#FF9800" />
            <Text style={styles.scheduleText}>09:00 AM - 01:00 PM</Text>
          </View>
        </View>
      </View>
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
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 28, // Igual al tamaño del icono para mantener equilibrio
  },
  // Contenido
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Tarjetas de horario
  scheduleCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  scheduleText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Mhorarios;
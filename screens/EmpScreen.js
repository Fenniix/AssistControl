import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useToast } from 'react-native-toast-message';

const EmpScreen = ({ navigation }) => {
  // Animaciones para cada botón
  const scaleValues = {
    confirmarA: useRef(new Animated.Value(1)).current,
    misHorarios: useRef(new Animated.Value(1)).current,
    misDatos: useRef(new Animated.Value(1)).current
  };

  // Estado para controlar el modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressIn = (button) => {
    Animated.spring(scaleValues[button], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (button) => {
    Animated.spring(scaleValues[button], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  // Función para mostrar/ocultar modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Función para confirmar asistencia con Toast
  const confirmarAsistencia = () => {
    toggleModal(); // Cierra el modal
    
    // Mostrar toast de confirmación
    Toast.show({
      type: 'success',
      text1: 'Asistencia registrada ✅',
      text2: `Hora: ${new Date().toLocaleTimeString()}`,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      props: {
        icon: 'success' // Icono integrado
      }
    });

    console.log("Asistencia confirmada a las", new Date().toLocaleTimeString());
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {/* Card Marcar Asistencia */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('confirmarA')}
            onPressOut={() => handlePressOut('confirmarA')}
            onPress={toggleModal}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.confirmarA }] }
            ]}>
              <Text style={styles.cardText}>Confirmar Asistencia</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Card mis horarios */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('misHorarios')}
            onPressOut={() => handlePressOut('misHorarios')}
            onPress={() => navigation.navigate("Mhorarios")}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.misHorarios }] }
            ]}>
              <Text style={styles.cardText}>Mis Horarios</Text>
            </Animated.View>
          </TouchableOpacity>
          {/* Card mis datos */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('misDatos')}
            onPressOut={() => handlePressOut('misDatos')}
            onPress={() => navigation.navigate("Mdatos")}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.misDatos }] }
            ]}>
              <Text style={styles.cardText}>Mis Datos</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de confirmación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <MaterialCommunityIcons 
              name="clock-check" 
              size={60} 
              color="#1E88E5" 
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Confirmar Asistencia</Text>
            <Text style={styles.modalText}>¿Estás seguro de registrar tu asistencia ahora?</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={toggleModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmarAsistencia}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 35,
    backgroundColor: "#1E88E5",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  logoutButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: "#000",
    fontWeight: "bold",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 280,
    height: 160,
    backgroundColor: "rgba(217, 217, 217, 0.58)",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: { width: 12, height: 17 },
    shadowOpacity: 0.22,
    shadowRadius: 51,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  cardText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  confirmButton: {
    backgroundColor: "#1E88E5",
  },
  cancelButtonText: {
    color: "#555",
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EmpScreen;
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Modal,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const EmpScreen = ({ route, navigation }) => {
  // 1. Estados y parámetros
  const { employeeCode } = route.params || {};
  const [employee, setEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 2. Animaciones para las cards
  const scaleValues = {
    confirmarA: useRef(new Animated.Value(1)).current,
    misHorarios: useRef(new Animated.Value(1)).current,
    misDatos: useRef(new Animated.Value(1)).current
  };

  // 3. Cargar datos del empleado
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const employeesJSON = await AsyncStorage.getItem('@employees');
        const employees = employeesJSON ? JSON.parse(employeesJSON) : [];
        const foundEmployee = employees.find(emp => emp.id === employeeCode);
        
        if (foundEmployee) {
          setEmployee(foundEmployee);
        } else {
          Alert.alert("Error", "Empleado no encontrado");
          navigation.navigate('Login');
        }
      } catch (error) {
        Alert.alert("Error", "Error al cargar datos");
      }
    };

    if (employeeCode) loadEmployeeData();
  }, [employeeCode]);

  // 4. Funciones esenciales
  const handleLogout = () => {
    navigation.navigate('Login');
  };

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

  const confirmarAsistencia = async () => {
    try {
      const employeesJSON = await AsyncStorage.getItem('@employees');
      const employees = employeesJSON ? JSON.parse(employeesJSON) : [];
      
      const updatedEmployees = employees.map(emp => {
        if (emp.id === employeeCode) {
          return {
            ...emp,
            asistencias: [...(emp.asistencias || []), new Date().toISOString()]
          };
        }
        return emp;
      });

      await AsyncStorage.setItem('@employees', JSON.stringify(updatedEmployees));
      setEmployee(updatedEmployees.find(e => e.id === employeeCode));
      
      setIsModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Asistencia registrada ✅',
        text2: `Hora: ${new Date().toLocaleTimeString()}`,
        position: 'bottom', // ← Esta es la clave
        bottomOffset: 25,   // Ajusta según necesites
        visibilityTime: 3000
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo registrar',
      });
    }
  };

  // 5. Navegación a otras pantallas
  const navigateToMisDatos = () => {
    navigation.navigate('Mdatos', { employee });
  };

  const navigateToHorarios = () => {
    navigation.navigate('Mhorarios', { employeeCode });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Image source={require("../assets/LogoEmpleado2.png")} style={styles.logo} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {/* Card Confirmar Asistencia */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('confirmarA')}
            onPressOut={() => handlePressOut('confirmarA')}
            onPress={() => setIsModalVisible(true)}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.confirmarA }] }
            ]}>
              <MaterialCommunityIcons name="calendar-check" size={40} color="#1E88E5" />
              <Text style={styles.cardText}>Confirmar Asistencia</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Card Mis Horarios */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('misHorarios')}
            onPressOut={() => handlePressOut('misHorarios')}
            onPress={navigateToHorarios}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.misHorarios }] }
            ]}>
              <MaterialCommunityIcons name="clock-outline" size={40} color="#1E88E5" />
              <Text style={styles.cardText}>Mis Horarios</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Card Mis Datos */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('misDatos')}
            onPressOut={() => handlePressOut('misDatos')}
            onPress={navigateToMisDatos}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.misDatos }] }
            ]}>
              <MaterialCommunityIcons name="account-details" size={40} color="#1E88E5" />
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
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <MaterialCommunityIcons name="clock-check" size={60} color="#1E88E5" />
            <Text style={styles.modalTitle}>Confirmar Asistencia</Text>
            <Text style={styles.modalText}>¿Estás seguro de registrar tu asistencia ahora?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
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

// Estilos (compatibles con tu diseño)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 44,
    backgroundColor: "#1E88E5",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logoutButton: {
    backgroundColor: "#FFF",
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
    marginTop: -20,
  },
  card: {
    width: 280,
    height: 160,
    backgroundColor: "#FFF",
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardText: {
    marginTop: 10,
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
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E88E5",
    marginVertical: 10,
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
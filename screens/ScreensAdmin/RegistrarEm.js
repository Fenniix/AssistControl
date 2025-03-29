import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegistrarEm = ({ navigation }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [puesto, setPuesto] = useState('');

  // Generar código único de empleado (EJ: "EMP-123")
  const generateEmployeeCode = () => {
    const randomNum = Math.floor(100 + Math.random() * 900); // Número de 3 dígitos
    return `EMP-${randomNum}`;
  };

  // Guardar empleado en AsyncStorage
  const handleRegister = async () => {
    if (!nombre || !apellidos || !telefono || !puesto) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const newEmployee = {
      id: generateEmployeeCode(),
      nombre,
      apellidos,
      telefono,
      puesto,
      asistencias: [] // Array para futuras asistencias
    };

    try {
      // Obtener empleados existentes
      const existingEmployees = await AsyncStorage.getItem('@employees');
      const employees = existingEmployees ? JSON.parse(existingEmployees) : [];

      // Agregar nuevo empleado
      employees.push(newEmployee);
      await AsyncStorage.setItem('@employees', JSON.stringify(employees));

      Alert.alert("Éxito", `Empleado registrado con código: ${newEmployee.id}`);
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el empleado");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        {/* Barra superior (igual que en LoginScreen) */}
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
          <Text style={styles.title}>Registrar empleado</Text>
          <View style={styles.spacer} />
        </View>

        {/* Contenido del formulario */}
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Image 
              source={require("../../assets/LogoEmpleado.png")} 
              style={styles.formImage}
              resizeMode="contain"
            />

            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Juan"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Pérez López"
              value={apellidos}
              onChangeText={setApellidos}
            />

            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 555-1234"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Puesto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Asistente"
              value={puesto}
              onChangeText={setPuesto}
            />

            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Registrar Empleado</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Reutiliza los mismos estilos de LoginScreen (ajustando lo necesario)
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#FFF" 
  },
  topBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 67,
    backgroundColor: "#1E88E5",
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  HomeButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginText: {
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: "10%",
    width: "auto",
    height: "auto",
  },
  formContainer: {
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  formImage: {
    width: "100%",
    height: 70,
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  registerButton: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default RegistrarEm;
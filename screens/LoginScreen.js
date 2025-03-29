import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [loginType, setLoginType] = useState('employee');
  const [employeeCode, setEmployeeCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const position = useRef(new Animated.Value(loginType === 'employee' ? 0 : 1)).current;

  const handleLoginType = (type) => {
    setLoginType(type);
    Animated.timing(position, {
      toValue: type === 'employee' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = async () => {
    if (loginType === 'admin') {
      navigation.navigate('Admin');
    } else {
      try {
        const employeesJSON = await AsyncStorage.getItem('@employees');
        const employees = employeesJSON ? JSON.parse(employeesJSON) : [];
        
        const employeeExists = employees.some(emp => emp.id === employeeCode.trim());
        
        if (employeeExists) {
          navigation.navigate('Emp', { 
            employeeCode: employeeCode.trim()
          });
        } else {
          Alert.alert("Error", "Código inválido");
        }
      } catch (error) {
        Alert.alert("Error", "Error al verificar el código");
      }
    }
  };

  const indicatorPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Barra superior modificada */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={(handleLogout)}
        >
          <MaterialCommunityIcons 
            name="arrow-left" 
            size={28} 
            color="#FFF" 
          />
        </TouchableOpacity>
        <Text style={styles.title}>Login</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          {/* Selector de tipo de login */}
          <View style={styles.selectorContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleLoginType('employee')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.optionText,
                loginType === 'employee' && styles.selectedOptionText
              ]}>
                Empleado
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleLoginType('admin')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.optionText,
                loginType === 'admin' && styles.selectedOptionText
              ]}>
                Administrador
              </Text>
            </TouchableOpacity>
            
            <Animated.View 
              style={[
                styles.indicator,
                { left: indicatorPosition }
              ]}
            />
          </View>

          {/* Formulario de login */}
          <View style={styles.formContainer}>
            {loginType === 'admin' ? (
              <>
                <Image 
                  source={require("../assets/LogoAdmin.png")} 
                  style={styles.formImage}
                  resizeMode="contain"
                />
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ejemplo@assistcontrol.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </>
            ) : (
              <>
                <Image 
                  source={require("../assets/LogoEmpleado.png")} 
                  style={styles.formImage}
                  resizeMode="contain"
                />
                <Text style={styles.label}>Código de empleado</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: EMP-123"
                  value={employeeCode}
                  onChangeText={setEmployeeCode}
                  autoCapitalize="characters"
                />
              </>
            )}
            
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#FFF" 
  },
  // Barra superior rediseñada
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingTop: 57,
    paddingHorizontal: 15,
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
  // Estilos existentes
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 3,
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: -10,
    height: 45,
    position: 'relative',
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFF',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    width: '50%',
    height: '115%',
    backgroundColor: '#1E88E5',
    borderRadius: 22,
    top: 0,
  },
  content: {
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: "20%",
    width: "auto",
    height: "50%",
  },
  formContainer: {
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 40,
  },
  formImage: {
    width: "100%",
    height: 70,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: -10,
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
  loginButton: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  loginButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
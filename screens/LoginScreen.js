import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [loginType, setLoginType] = useState('employee');
  const [employeeCode, setEmployeeCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const position = useRef(new Animated.Value(loginType === 'employee' ? 0 : 1)).current;

  const handleLoginType = (type) => {
    setLoginType(type);
    // Animación para el indicador
    Animated.timing(position, {
      toValue: type === 'employee' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = () => {
    if (loginType === 'admin') {
      console.log('Login admin:', email, password);
      navigation.navigate('Admin');
    } else {
      console.log('Login empleado:', employeeCode);
      navigation.navigate('Emp');
    }
  };

  // Posición del indicador
  const indicatorPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        {/* Barra superior */}
        <View style={styles.topBar}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />
          <TouchableOpacity style={styles.HomeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.loginText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
        {/*Barra de selección */}
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
              { 
                left: position.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '50%']
                })
              }
            ]}
          />
        </View>

        {/* Formulario de login */}
        <View style={styles.formContainer}>
          {loginType === 'admin' ? (
            <>
              {/* Imagen para administrador */}
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
              {/* Imagen para empleado */}
              <Image 
                source={require("../assets/LogoEmpleado.png")} 
                style={styles.formImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Código de empleado</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu código"
                value={employeeCode}
                onChangeText={setEmployeeCode}
                keyboardType="numeric"
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
  // Estilos de la barra superior
  topBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 35,
    backgroundColor: "#1E88E5",
  },
  // Estilos de los elementos de la barra superior
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
  // Estilos del selector de tipo de login
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
  // Estilos de las opciones del selector
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
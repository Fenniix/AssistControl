import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';

const AdminScreen = ({ navigation }) => {
  // Animaciones para cada botón
  const scaleValues = {
    registrar: useRef(new Animated.Value(1)).current,
    gestionar: useRef(new Animated.Value(1)).current,
    reportes: useRef(new Animated.Value(1)).current
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

  const handleLogout = () => {
    navigation.navigate('Home');
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

      {/* Contenido principal con scroll */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Contenedor de las cards */}
        <View style={styles.cardsContainer}>
          {/* Card Registrar Empleado */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('registrar')}
            onPressOut={() => handlePressOut('registrar')}
            onPress={() => navigation.navigate("RegistrarEm")}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.registrar }] }
            ]}>
              <Text style={styles.cardText}>Registrar empleado</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Card Gestionar Asistencias */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('gestionar')}
            onPressOut={() => handlePressOut('gestionar')}
            onPress={() => navigation.navigate("GesAsis")}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.gestionar }] }
            ]}>
              <Text style={styles.cardText}>Gestionar asistencias</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Card Reportes */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn('reportes')}
            onPressOut={() => handlePressOut('reportes')}
            onPress={() => navigation.navigate("Reportes")}
          >
            <Animated.View style={[
              styles.card,
              { transform: [{ scale: scaleValues.reportes }] }
            ]}>
              <Text style={styles.cardText}>Reportes</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: -50,
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
});

export default AdminScreen;
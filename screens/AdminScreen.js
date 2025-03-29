import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Barra superior con wrapper adicional */}
      <View style={{ backgroundColor: "#1E88E5" }}>
        <View style={styles.topBar}>
          <View style={styles.emptySpace} />
          <Text style={styles.title}>Administrador</Text>
          <TouchableOpacity onPress={handleLogout}>
            <View>
              <MaterialCommunityIcons name="logout" size={26} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido con wrappers adicionales */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {[
            { icon: 'account-plus', text: 'Registrar empleado', nav: 'RegistrarEm', key: 'registrar' },
            { icon: 'calendar-check', text: 'Gestionar asistencias', nav: 'GesAsis', key: 'gestionar' },
            { icon: 'chart-bar', text: 'Reportes', nav: 'Reportes', key: 'reportes' }
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.9}
              onPressIn={() => handlePressIn(item.key)}
              onPressOut={() => handlePressOut(item.key)}
              onPress={() => navigation.navigate(item.nav)}
            >
              <Animated.View style={[
                styles.card,
                { transform: [{ scale: scaleValues[item.key] }] }
              ]}>
                <View style={styles.cardContent}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={42} 
                    color="#1E88E5" 
                  />
                  <Text style={styles.cardText}>{item.text}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingTop: 66, // Reducido de 66
    paddingHorizontal: 20,
  },
  emptySpace: {
    width: 26,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1,
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
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    marginTop: 12,
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AdminScreen;
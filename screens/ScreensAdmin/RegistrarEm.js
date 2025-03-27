import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegistrarEm = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      {/* Barra superior con logo y botón */}
      <View style={styles.topBar}>
        <Image 
          source={require('../../assets/Logo.png')} 
          style={styles.logo} 
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido Proximo */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  backButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default RegistrarEm;
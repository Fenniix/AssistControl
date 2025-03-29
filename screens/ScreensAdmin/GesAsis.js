import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GesAsis = ({ navigation }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const employeesJSON = await AsyncStorage.getItem('@employees');
        const employees = employeesJSON ? JSON.parse(employeesJSON) : [];
        
        const allAttendances = employees.flatMap(employee => 
          (employee.asistencias || []).map(attendance => ({
            id: `${employee.id}-${attendance}`,
            employeeName: `${employee.nombre} ${employee.apellidos}`,
            employeeCode: employee.id,
            date: new Date(attendance)
          }))
          .sort((a, b) => b.date - a.date));

        setAttendanceData(allAttendances);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar las asistencias");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      {/* Barra superior consistente */}
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerTitle}>Gestión de Asistencias</Text>
        
        <View style={styles.headerSide} />
      </View>

      {/* Contenido principal */}
      {loading ? (
        <View style={styles.centered}>
          <Text>Cargando...</Text>
        </View>
      ) : attendanceData.length > 0 ? (
        <FlatList
          data={attendanceData}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="account" size={22} color="#1E88E5" />
                <Text style={styles.employeeName}>
                  {item.employeeName} • {item.employeeCode}
                </Text>
              </View>
              <View style={styles.cardBody}>
                <MaterialCommunityIcons name="clock" size={18} color="#4CAF50" />
                <Text style={styles.attendanceTime}>
                  {formatDate(item.date)}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.centered}>
          <MaterialCommunityIcons name="calendar-remove" size={50} color="#888" />
          <Text style={styles.emptyText}>No hay asistencias registradas</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  // Header estilo AdminScreen
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 15,
    paddingTop: 64,
    paddingHorizontal: 15
  },
  headerSide: {
    width: 28,
    alignItems: 'flex-start'
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  },
  // Contenido
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContent: {
    padding: 15
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  employeeName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  attendanceTime: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555'
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888'
  }
});

export default GesAsis;
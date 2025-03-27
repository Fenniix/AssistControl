import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

const HomeScreen = () => {
  const navigation = useNavigation(); 

  // Datos del carrusel
  const [carouselItems] = useState([
    { id: "1", image: require("../assets/imagen1.png"), title: "Ey muy" },
    { id: "2", image: require("../assets/imagen2.png"), title: "Buenas" },
    { id: "3", image: require("../assets/imagen3.png"), title: "A todos" },
  ]);

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % carouselItems.length;
        goToSlide(nextIndex);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay]);

  const renderItem = ({ item }) => (
    <View style={[styles.slide, isWeb && styles.webSlide]}>
      <Image source={item.image} style={styles.slideImage} />
      <Text style={styles.slideText}>{item.title}</Text>
    </View>
  );

  const handleScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = isWeb
      ? Math.floor(contentOffset / event.nativeEvent.layoutMeasurement.width)
      : Math.round(contentOffset / screenWidth);
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    if (flatListRef.current) {
      if (isWeb) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      } else {
        flatListRef.current.scrollToOffset({ offset: index * screenWidth, animated: true });
      }
      setCurrentIndex(index);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        {/* Barra superior */}
        <View style={styles.topBar}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />
           {/*Redirige a la pantalla de Login */}
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>  
            <Text style={styles.loginText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido con fondo blanco */}
        <View style={styles.content}>
          {/* Carrusel */}
          <View
            style={styles.carouselContainer}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <FlatList
              ref={flatListRef}
              data={carouselItems}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              keyExtractor={(item) => item.id}
              getItemLayout={(data, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
              {...(isWeb && {
                snapToInterval: screenWidth,
                decelerationRate: "fast",
                snapToAlignment: "center",
              })}
            />

            {/* Indicadores de página */}
            <View style={styles.indicators}>
              {carouselItems.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.indicator, currentIndex === index && styles.activeIndicator]}
                  onPress={() => goToSlide(index)}
                />
              ))}
            </View>
          </View>
          <Text style={styles.appName}>Bienvenido a AssistControl</Text>
          <Text style={styles.slogan}>"Facilidad y control en cada registro."</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E88E5",
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
  loginButton: {
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
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    paddingHorizontal: 0,
  },
  carouselContainer: {
    height: isWeb ? 300 : 200,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  slide: {
    width: screenWidth,
    height: "100%",
    position: "relative",
  },
  webSlide: {
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  slideText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    fontSize: isWeb ? 24 : 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
    cursor: isWeb ? "pointer" : undefined,
  },
  activeIndicator: {
    backgroundColor: "white",
    width: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20%",
    fontFamily: "Times New Roman",
    fontStyle: "italic",
  },
  slogan: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  "dependencies": {
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/native-stack": "^6.9.12",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "react-native-safe-area-context": "^4.7.2",
  "react-native-screens": "^3.25.0",
  "react-native-toast-message": "^2.1.5",
  "react-native-vector-icons": "^9.2.0"
  }
});

export default HomeScreen;

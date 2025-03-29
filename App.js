import React from "react";
import Toast from 'react-native-toast-message';
import Navigation from "./screens/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
};

export default App;
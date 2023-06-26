import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); 
  }, []);

  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <HomeScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

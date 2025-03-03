import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../app/HomeScreen';
// import HoroscopeScreen from '../screens/(tabs)/HoroscopeScreen';
// import AstrologyScreen from '../screens/AstrologyScreen.';
import CompatibilityScreen from '../app/CompatibilityScreen';
import { HoroscopeProvider } from '../context/HoroscopeContext';
import AstrologyScreen from '../app/AstrologyScreen.';
import { Stack } from "expo-router";

// const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <HoroscopeProvider>
      {/* <NavigationContainer> */}
        <Stack>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          
          <Stack.Screen name="Astrology" component={AstrologyScreen} />
          
          <Stack.Screen name="Compatibility" component={CompatibilityScreen} />
        </Stack>
      {/* </NavigationContainer> */}
    </HoroscopeProvider>
  );
}

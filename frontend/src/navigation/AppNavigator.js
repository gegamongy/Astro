import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HoroscopeScreen from '../screens/HoroscopeScreen';
import CompatibilityScreen from '../screens/CompatibilityScreen';
import { HoroscopeProvider } from '../context/HoroscopeContext';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <HoroscopeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          
          <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
          
          <Stack.Screen name="Compatibility" component={CompatibilityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HoroscopeProvider>
  );
}

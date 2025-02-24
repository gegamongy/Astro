import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Astrology App</Text>
      <Button title="Go to Horoscope" onPress={() => navigation.navigate('Horoscope')} />
      <Button title="Go to Compatibility" onPress={() => navigation.navigate('Compatibility')} />
    </View>
  );
}

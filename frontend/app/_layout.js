import { Stack } from "expo-router";
import { HoroscopeProvider } from "../context/HoroscopeContext";

export default function Layout() {
  return (
    <HoroscopeProvider>
      <Stack initialRouteName="(tabs)">
        {/* <Stack.Screen name="index" options={{ title: "Home" }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="CompatibilityScreen" options={{ title: "CompatibilityScreen" }} /> */}
      </Stack>
    </HoroscopeProvider>
  );
}

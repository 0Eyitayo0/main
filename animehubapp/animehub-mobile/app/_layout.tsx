import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Anime detail screen */}
      <Stack.Screen name="anime/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}

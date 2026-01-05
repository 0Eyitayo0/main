import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // 🎨 TAB BAR BACKGROUND
        tabBarStyle: {
          backgroundColor: "#38bdf8",
          borderTopColor: "#1e293b",
        },

        // 🎨 ICON + LABEL COLORS
        tabBarActiveTintColor: "#5d041fff",
        tabBarInactiveTintColor: "#1e293b", // muted gray

        // 🎨 LABEL STYLE
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "AnimeHub",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Saves",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

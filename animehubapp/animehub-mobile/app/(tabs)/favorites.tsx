import { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimeCard from "../components/AnimeCard";
import { loadWatchlist, saveWatchlist } from "../../lib/watchlist";


export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  // Runs EVERY time tab is focused
  useFocusEffect(
    useCallback(() => {
      loadWatchlist().then(setFavorites);
    }, [])
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No Saves Yet</Text>
      </SafeAreaView>
    );
  }

  function removeFromFavorites(anime: any) {
    const updated = favorites.filter(a => a.mal_id !== anime.mal_id);
    setFavorites(updated);
    saveWatchlist(updated);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saves</Text>
      

      <FlatList
        data={favorites}
        keyExtractor={item => item.mal_id.toString()}
        renderItem={({ item }) => (
          <AnimeCard
            anime={item}
            isSaved={true}
            onToggleSave={removeFromFavorites}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: -20,
  },
  title: {
    color: "#38bdf8",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  emptyText: {
    color: "tomato",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 350,
  },
});

import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then(res => res.json())
      .then(data => {
        setAnimeList(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={{ color: "white", marginTop: 10 }}>
          Loading anime...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AnimeHub</Text>

      <FlatList
        data={animeList}
        keyExtractor={item => item.mal_id.toString()}
        renderItem={({ item }) => (
          <Link href={`/anime/${item.mal_id}`} asChild>
            <Pressable style={styles.card}>
              <Image
                source={{ uri: item.images.jpg.image_url }}
                style={styles.image}
              />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.description}>
                {item.synopsis
                  ? item.synopsis.slice(0, 100) + "..."
                  : "No description available."}
              </Text>
            </Pressable>
          </Link>
        )}

      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 10,
  },
  title: {
    color: "#38bdf8",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  loading: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
});

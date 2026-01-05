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
import { loadWatchlist, saveWatchlist } from "../../lib/watchlist";
import { TextInput, Keyboard } from "react-native"
import AnimeCard from "../components/AnimeCard";
import { useRef } from "react";
import { ScrollView, Pressable } from "react-native";


const GENRES = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
];


export default function HomeScreen() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);


  async function fetchAnime(pageNumber: number) {
    try {
      let url = `https://api.jikan.moe/v4/anime?page=${pageNumber}`;

      if (selectedGenre) {
        url += `&genres=${selectedGenre}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (!json || !Array.isArray(json.data)) {
        console.warn("Invalid API response:", json);
        return;
      }

      setAnimeList(prev => {
        const combined = [...prev, ...json.data];
        const map = new Map<number, any>();

        for (const anime of combined) {
          map.set(anime.mal_id, anime);
        }

        return Array.from(map.values());
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingMore(false);
    }
  }


  async function searchAnime(query: string) {
    if (!query.trim()) return;

    try {
      setIsSearching(true);

      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=25`
      );

      const json = await res.json();

      if (!json || !Array.isArray(json.data)) {
        console.warn("Invalid search response:", json);
        return;
      }

      setAnimeList(
        Array.from(
          new Map(json.data.map((a: any) => [a.mal_id, a])).values()
        )
      );

    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnime(1);
  }, []);

  function loadMoreAnime() {
    if (loadingMore) return;
    if (isSearching) return; // NO pagination while searching

    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAnime(nextPage);
  }


  useEffect(() => {
    loadWatchlist().then(setWatchlist);
  }, []);

  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  useEffect(() => {
    // Reset and reload when genre changes
    setAnimeList([]);
    setPage(1);
    fetchAnime(1);
  }, [selectedGenre]);


  function toggleWatchlist(anime: any) {
    setWatchlist(prev => 
      prev.some(item => item.mal_id === anime.mal_id) ? prev.filter(item => item.mal_id !== anime.mal_id) : [...prev, anime]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AnimeHub</Text>
      
  <TextInput
    placeholder="Search anime..."
    placeholderTextColor="#1e293b"
    value={search}
    onChangeText={text => {
      setSearch(text);

      // Clear previous timer
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      // Empty search → browse mode
      if (text.trim().length === 0) {
        setIsSearching(false);
        setAnimeList([]);
        setPage(1);
        fetchAnime(1);
        return;
      }

      // Debounced search
      searchTimeout.current = setTimeout(() => {
        searchAnime(text);
      }, 400);
    }}
    style={styles.search}
  />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreBar}
      >
        <Pressable
          onPress={() => setSelectedGenre(null)}
          style={[
            styles.genreButton,
            selectedGenre === null && styles.genreButtonActive,
          ]}
        >
          <Text style={styles.genreText}>All</Text>
        </Pressable>

        {GENRES.map(genre => (
          <Pressable
            key={genre.id}
            onPress={() => setSelectedGenre(genre.id)}
            style={[
              styles.genreButton,
              selectedGenre === genre.id && styles.genreButtonActive,
            ]}
          >
            <Text style={styles.genreText}>{genre.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={animeList}
        keyExtractor={item => item.mal_id.toString()}
        renderItem={({ item }) => (
          <AnimeCard
            anime={item}
            isSaved={watchlist.some(a => a.mal_id === item.mal_id)}
            onToggleSave={toggleWatchlist}
          />
        )}
        onEndReached={loadMoreAnime}
        onEndReachedThreshold={0.5}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"

        //PERFORMANCE OPTIMIZATIONS
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}

        ListFooterComponent={
          loadingMore && !isSearching ? (
            <ActivityIndicator size="small" color="#38bdf8" />
          ) : null
        }
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
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 100,
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
  favoriteButton: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  favoriteText: {
    color: "#facc15",
    fontSize: 16,
  },
  search: {
    backgroundColor: "#38bdf8",
    color: "black",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  
  genreBar: {
    marginBottom: 10,
    paddingVertical: 10,
  },

  genreButton: {
    height: 36,                 // fixed height
    paddingHorizontal: 16,
    borderRadius: 10,           // height / 2 = perfect pill
    backgroundColor: "#1e293b",
    marginRight: 8,

    // vertical centering
    justifyContent: "center",
    alignItems: "center",
  },


  genreButtonActive: {
    backgroundColor: "#38bdf8",
  },

  genreText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
      lineHeight: 16,
  },

});

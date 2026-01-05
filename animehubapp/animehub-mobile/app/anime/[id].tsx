import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [anime, setAnime] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
        .then(res => res.json())
        .then(data => {
            setAnime(data.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#38bdf8" />
        </View>
        );
    }

    if (!anime) {
        return (
        <View style={styles.loading}>
            <Text style={{ color: "white" }}>Anime not found.</Text>
        </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
        {/* This enables the header + back button */}
            <Stack.Screen
            options={{
                title: anime.title,

                // Header background
                headerStyle: {
                backgroundColor: "#0f172a", // same as app background
                },

                // Title color
                headerTitleStyle: {
                color: "#38bdf8",
                fontWeight: "700",
                },

                // Back arrow color
                headerTintColor: "#38bdf8",

                // Back button text
                headerBackTitle: "Back",
                headerShadowVisible: false,
            }}
        />

        <ScrollView>
            <Image
            source={{ uri: anime.images.jpg.large_image_url }}
            style={styles.image}
            />

            <Text style={styles.title}>{anime.title}</Text>

            <Text style={styles.synopsis}>{anime.synopsis}</Text>

            <View style={styles.meta}>
            <Text style={styles.metaText}>⭐ Score: {anime.score}</Text>
            <Text style={styles.metaText}>🎬 Episodes: {anime.episodes}</Text>
            <Text style={styles.metaText}>📺 Status: {anime.status}</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 12,
    },
    image: {
        width: "100%",
        height: 500,
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        color: "#38bdf8",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    synopsis: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 16,
    },
    meta: {
        marginBottom: 20,
    },
    metaText: {
        color: "#cbd5f5",
        fontSize: 14,
        marginBottom: 4,
    },
    loading: {
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
    },
});

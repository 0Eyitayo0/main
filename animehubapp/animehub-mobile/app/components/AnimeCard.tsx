import { useRef, useEffect } from "react";
import {
    Text,
    StyleSheet,
    Image,
    Pressable,
    Animated,
} from "react-native";
import { Link } from "expo-router";

type Props = {
    anime: any;
    isSaved: boolean;
    onToggleSave: (anime: any) => void;
};

export default function AnimeCard({ anime, isSaved, onToggleSave }: Props) {
    const scale = useRef(new Animated.Value(1)).current;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
    Animated.timing(fade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
    }).start();
    }, []);

    return (
        <Link href={`/anime/${anime.mal_id}`} asChild>
            <Pressable
                onPressIn={() =>
                Animated.spring(scale, {
                    toValue: 0.97,
                    useNativeDriver: true,
                }).start()
                }
                onPressOut={() =>
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start()
                }
            >
                <Animated.View style={[styles.card, { transform: [{ scale }], opacity: fade, },]}>
                    <Image
                        source={{ uri: anime.images.jpg.image_url }}
                        style={styles.image}
                    />

                    <Text style={styles.cardTitle}>{anime.title}</Text>

                    <Text style={styles.description}>
                        {anime.synopsis
                        ? anime.synopsis.slice(0, 100) + "..."
                        : "No description available."}
                    </Text>

                    <Pressable
                        onPress={() => onToggleSave(anime)}
                        style={styles.favoriteButton}
                    >
                        <Text style={styles.favoriteText}>
                        {isSaved ? "★ Saved" : "☆ Save"}
                        </Text>
                    </Pressable>
                
                </Animated.View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1e293b",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#38bdf8",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardTitle: {
        color: "#38bdf8",
        fontSize: 19,
        fontWeight: "600",
        marginBottom: 6,
    },
    description: {
        color: "#e5e7eb",
        fontSize: 14,
        lineHeight: 21,
    },
    favoriteButton: {
        marginTop: 10,
    },
    favoriteText: {
        color: "#facc15",
        fontSize: 16,
    },
});

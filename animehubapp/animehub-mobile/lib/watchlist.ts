import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "ANIME_WATCHLIST";

export async function loadWatchlist() {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
}

export async function saveWatchlist(list: any[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
}
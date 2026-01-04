import AnimeCard from "../AnimeCard";

function Watchlist({ watchlist, addToWatchlist, setSelectedAnime }) {
    return (
        <div className="anime-grid">
        {watchlist.map(anime => (
            <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onSelect={setSelectedAnime}
            onFavorite={addToWatchlist}
            isFavorite={true}
            />
        ))}
        </div>
    );
}

export default Watchlist;

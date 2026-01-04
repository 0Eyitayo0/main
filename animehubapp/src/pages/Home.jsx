import AnimeCard from "../AnimeCard";

function Home({
    animeList,
    search,
    setSearch,
    watchlist,
    addToWatchlist,
    setSelectedAnime
}) {
    const filteredAnime = animeList.filter(anime => anime.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <input
                type="text"
                placeholder="Search anime..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="anime-grid">
                {filteredAnime.map(anime => (
                    <AnimeCard
                        key={anime.mal_id}
                        anime={anime}
                        onSelect={setSelectedAnime}
                        onFavorite={addToWatchlist}
                        isFavorite={watchlist.some(item => item.mal_id === anime.mal_id)}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;
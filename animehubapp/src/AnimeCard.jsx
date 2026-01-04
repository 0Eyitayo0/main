import { useNavigate } from "react-router-dom";

function AnimeCard({ anime, onFavorite, isFavorite }) {
    const navigate = useNavigate();

    return (
        <div className="anime-card">
        <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            onClick={() => navigate(`/anime/${anime.mal_id}`)}
        />

        <h3>{anime.title}</h3>

        <p>
            {anime.synopsis
            ? anime.synopsis.slice(0, 100) + "..."
            : "No description available."}
        </p>

        <button onClick={() => onFavorite(anime)}>
            {isFavorite ? "★ Remove" : "☆ Add to Watchlist"}
        </button>
        </div>
    );
}

export default AnimeCard;

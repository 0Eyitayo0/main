import { useParams, useNavigate } from "react-router-dom";

function AnimeDetail({ animeList }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const anime = animeList.find(a => a.mal_id === Number(id));

    if (!anime) return <p>Anime not found</p>;

    return (
        <div className="detail-view">
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        <h2>{anime.title}</h2>
        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        <p>{anime.synopsis}</p>

        <ul>
            <li><strong>Score:</strong> {anime.score}</li>
            <li><strong>Episodes:</strong> {anime.episodes}</li>
            <li><strong>Status:</strong> {anime.status}</li>
        </ul>
        </div>
    );
}

export default AnimeDetail;
